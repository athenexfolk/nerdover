using dotnet_nerdover.Data.Configs;
using Google.Cloud.Firestore;
using Microsoft.EntityFrameworkCore;

namespace dotnet_nerdover.Data.Entities;

[FirestoreData]
[EntityTypeConfiguration(typeof(CategoryConfig))]
public class Category
{
    [FirestoreDocumentId]
    [FirestoreProperty("id")]
    public string Id { get; set; } = null!;

    [FirestoreProperty("slug")]
    public required string Slug { get; set; }

    [FirestoreProperty("name")]
    public required string Name { get; set; }
}