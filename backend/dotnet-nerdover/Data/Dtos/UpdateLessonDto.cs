using System.ComponentModel.DataAnnotations;

namespace dotnet_nerdover.Data.Dtos;

public class UpdateLessonDto
{
    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(500)]
    public string? CoverUrl { get; set; }
}