using System.Text;
using dotnet_nerdover.Data.Dtos;
using dotnet_nerdover.Data.Entities;
using Google.Apis.Storage.v1.Data;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_nerdover.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LessonsController(FirestoreDb db, StorageClient storage) : ControllerBase
{
    private readonly FirestoreDb _db = db;
    private readonly StorageClient _storage = storage;

    [HttpGet]
    public async Task<IActionResult> GetLessons()
    {
        var snapshot = await _db.Collection("lesson").GetSnapshotAsync();
        return Ok(snapshot.Where(doc => doc.Exists).Select(doc => doc.ToDictionary()).ToList());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetLessonById(string id)
    {
        var docRef = _db.Collection("lesson").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        var lesson = snapshot.ToDictionary();

        if (lesson.TryGetValue("contentUrl", out var contentUrlObj) && contentUrlObj is string contentUrl)
        {
            using var httpClient = new HttpClient();
            try
            {
                var contentString = await httpClient.GetStringAsync(contentUrl);
                lesson["content"] = contentString;
            }
            catch (Exception ex)
            {
                lesson["content"] = $"Error fetching content: {ex.Message}";
            }
        }
        else
        {
            lesson["content"] = "No contentUrl provided.";
        }

        return Ok(lesson);
    }

    [HttpPost]
    public async Task<IActionResult> CreateLesson(CreateLessonDto dto)
    {
        var existingQuery = await _db.Collection("lesson")
            .WhereEqualTo("slug", dto.Slug)
            .Limit(1)
            .GetSnapshotAsync();

        if (existingQuery.Count > 0)
        {
            return Conflict();
        }

        existingQuery = await _db.Collection("category")
            .WhereEqualTo("slug", dto.CategorySlug)
            .Limit(1)
            .GetSnapshotAsync();

        if (!(existingQuery.Count > 0))
        {
            return NotFound();
        }

        using var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes($"# {dto.Title}"));

        var obj = await _storage.UploadObjectAsync("nerdoverbucket", $"content/{dto.CategorySlug}.{dto.Slug}.md", "text/markdown; charset=utf-8", memoryStream);

        obj.CacheControl = "no-cache";
        obj.Acl = [new ObjectAccessControl { Entity = "allUsers", Role = "READER" }];

        await _storage.UpdateObjectAsync(obj);

        var docRef = _db.Collection("lesson").Document();

        Lesson newLesson = new()
        {
            Id = docRef.Id,
            Slug = dto.Slug,
            Title = dto.Title,
            CategorySlug = dto.CategorySlug,
            CoverUrl = dto.CoverUrl,
            ContentUrl = $"https://storage.googleapis.com/nerdoverbucket/content/{dto.CategorySlug}.{dto.Slug}.md"
        };

        await docRef.SetAsync(newLesson);

        return CreatedAtAction(nameof(GetLessonById), new { id = docRef.Id }, newLesson);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLesson(string id, UpdateLessonDto dto)
    {
        var docRef = _db.Collection("lesson").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        Dictionary<string, object> updatedField = [];

        if (dto.Title is not null)
        {
            updatedField.Add("title", dto.Title);
        }

        if (dto.CoverUrl is not null)
        {
            updatedField.Add("coverUrl", dto.CoverUrl);
        }

        await docRef.UpdateAsync(updatedField);

        return NoContent();
    }

    [HttpPut("{id}/content")]
    public async Task<IActionResult> UpdateContent(string id, UpdateContentDto dto)
    {
        var docRef = _db.Collection("lesson").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        var lesson = snapshot.ToDictionary();

        if (lesson is null || lesson["slug"] is null || lesson["categorySlug"] is null)
        {
            return NotFound();
        }

        using var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(dto.Content));

        var obj = await _storage.UploadObjectAsync("nerdoverbucket", $"content/{lesson["categorySlug"]}.{lesson["slug"]}.md", "text/markdown; charset=utf-8", memoryStream);

        obj.CacheControl = "no-cache";
        obj.Acl = [new ObjectAccessControl { Entity = "allUsers", Role = "READER" }];

        await _storage.UpdateObjectAsync(obj);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLesson(string id)
    {
        var docRef = _db.Collection("lesson").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        await docRef.DeleteAsync();

        return NoContent();
    }
}