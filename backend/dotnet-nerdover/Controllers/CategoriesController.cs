using dotnet_nerdover.Data.Dtos;
using dotnet_nerdover.Data.Entities;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_nerdover.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(FirestoreDb db) : ControllerBase
{
    private readonly FirestoreDb _db = db;

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var snapshot = await _db.Collection("category").GetSnapshotAsync();
        return Ok(snapshot.Where(doc => doc.Exists).Select(doc => doc.ToDictionary()).ToList());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(string id)
    {
        var docRef = _db.Collection("category").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        return Ok(snapshot.ToDictionary());
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryDto dto)
    {
        var existingQuery = await _db.Collection("category")
            .WhereEqualTo("slug", dto.Slug)
            .Limit(1)
            .GetSnapshotAsync();

        if (existingQuery.Count > 0)
        {
            return Conflict();
        }

        var docRef = _db.Collection("category").Document();

        Category newCategory = new()
        {
            Id = docRef.Id,
            Slug = dto.Slug,
            Name = dto.Name,
        };

        await docRef.SetAsync(newCategory);

        return CreatedAtAction(nameof(GetCategoryById), new { id = docRef.Id }, newCategory);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(string id, UpdateCategoryDto dto)
    {

        var docRef = _db.Collection("category").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        Dictionary<string, object> updatedField = [];

        if (dto.Name is not null)
        {
            updatedField.Add("name", dto.Name);
        }

        await docRef.UpdateAsync(updatedField);

        var updatedSnapshot = await docRef.GetSnapshotAsync();
        var updatedCategory = updatedSnapshot.ToDictionary();

        return Ok(updatedCategory);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(string id)
    {
        var docRef = _db.Collection("category").Document(id);
        var snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        await docRef.DeleteAsync();

        return NoContent();
    }
}