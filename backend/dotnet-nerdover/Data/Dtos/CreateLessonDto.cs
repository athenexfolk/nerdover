using System.ComponentModel.DataAnnotations;

namespace dotnet_nerdover.Data.Dtos;

public class CreateLessonDto
{
    [Required]
    [StringLength(255)]
    public required string Slug { get; set; }

    [Required]
    [StringLength(255)]
    public required string CategorySlug { get; set; }

    [Required]
    [StringLength(255)]
    public required string Title { get; set; }

    [StringLength(500)]
    public string? CoverUrl { get; set; }
}