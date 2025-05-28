using dotnet_nerdover.Data.Configs;
using Google.Cloud.Firestore;
using Microsoft.EntityFrameworkCore;

namespace dotnet_nerdover.Data.Entities;

[FirestoreData]
[EntityTypeConfiguration(typeof(LessonConfig))]
public class Lesson
{
    [FirestoreDocumentId]
    [FirestoreProperty("id")]
    public string Id { get; set; } = null!;

    [FirestoreProperty("slug")]
    public required string Slug { get; set; }

    [FirestoreProperty("categorySlug")]
    public required string CategorySlug { get; set; }

    [FirestoreProperty("title")]
    public required string Title { get; set; }

    [FirestoreProperty("contentUrl")]
    public required string ContentUrl { get; set; }

    [FirestoreProperty("coverUrl")]
    public string? CoverUrl { get; set; }

    [FirestoreProperty("content")]
    public string? Content { get; set; }
}