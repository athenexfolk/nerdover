using System.IO.Compression;
using System.Text.Json;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_nerdover.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeaturesController(FirestoreDb db, StorageClient storage) : ControllerBase
{
    private readonly FirestoreDb _db = db;
    private readonly StorageClient _storage = storage;

    [HttpGet("images")]
    public async Task<IActionResult> GetImages()
    {
        var objects = _storage.ListObjectsAsync("nerdoverbucket", "media/");

        List<string> urls = [];

        await foreach (var obj in objects)
        {
            if (!obj.Name.EndsWith('/'))
            {
                var publicUrl = $"https://storage.googleapis.com/nerdoverbucket/{obj.Name}";
                urls.Add(publicUrl);
            }
        }
        return Ok(urls);
    }

    [HttpPost("images")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {
        if (image is null)
            return BadRequest("No file uploaded.");

        var filename = $"media/{DateTime.UtcNow:yyyyMMddHHmmss}_{image.FileName}";

        using var memoryStream = new MemoryStream();
        await image.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        var uploadObjectOptions = new UploadObjectOptions
        {
            PredefinedAcl = PredefinedObjectAcl.PublicRead
        };

        await _storage.UploadObjectAsync("nerdoverbucket", filename, image.ContentType, memoryStream, uploadObjectOptions);

        return Ok($"https://storage.googleapis.com/nerdoverbucket/{filename}");
    }

    [HttpGet("export")]
    public async Task<IActionResult> ExportLessons()
    {
        // 1. Start stream
        var ms = new MemoryStream();
        // 2. Start zip operation
        using (var zipArchive = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
            // 3. Start collecting menu.json
            var cateSnapshot = await _db.Collection("category").GetSnapshotAsync();
            var categories = cateSnapshot.Where(doc => doc.Exists).Select(doc => doc.ToDictionary()).ToList();

            var lessSnapshot = await _db.Collection("lesson").GetSnapshotAsync();
            var lessons = lessSnapshot.Where(doc => doc.Exists).Select(doc => doc.ToDictionary()).ToList();

            var lessonsByCategories = lessons.Where(l => l.ContainsKey("categorySlug"))
                .GroupBy(l => l["categorySlug"].ToString()!)
                .ToDictionary(g => g.Key, g => g.Select(l => new
                {
                    slug = l["slug"].ToString(),
                    title = l["title"].ToString(),
                })
                .ToList());

            var menu = categories.Select(c => new
            {
                slug = c.TryGetValue("slug", out object? slug) ? slug.ToString() : "",
                name = c.TryGetValue("name", out object? name) ? name.ToString() : "",
                lessons = c["slug"].ToString() is not null && lessonsByCategories.ContainsKey(c["slug"].ToString()!)
                            ? lessonsByCategories[c["slug"].ToString()!]
                            : []
            }).ToList();
            {
                var jsonMenu = JsonSerializer.Serialize(menu);
                var zipEntry = zipArchive.CreateEntry($"api/menu.json", CompressionLevel.Optimal);
                using var entryStream = zipEntry.Open();
                using var sw = new StreamWriter(entryStream);
                await sw.WriteAsync(jsonMenu);
            }
            // 3. End collecting menu.json

            // 4. Start collecting content ([category].[lesson].json)

            foreach (var lesson in lessons)
            {
                if (lesson["contentUrl"] is null)
                {
                    return BadRequest();
                }

                using var httpClient = new HttpClient();
                try
                {
                    var contentString = await httpClient.GetStringAsync(lesson["contentUrl"].ToString());
                    lesson["content"] = contentString;
                }
                catch (Exception ex)
                {
                    lesson["content"] = $"Error fetching content: {ex.Message}";
                }

                var jsonContent = JsonSerializer.Serialize(lesson);

                var zipEntry = zipArchive.CreateEntry($"api/{lesson["categorySlug"]}.{lesson["slug"]}.json", CompressionLevel.Optimal);
                using var entryStream = zipEntry.Open();
                using var streamWriter = new StreamWriter(entryStream);
                await streamWriter.WriteAsync(jsonContent);
            }
            // 4. End collecting content ([category].[lesson].json)
        }

        ms.Seek(0, SeekOrigin.Begin);
        return File(ms, "application/zip", "export.zip");
    }
}