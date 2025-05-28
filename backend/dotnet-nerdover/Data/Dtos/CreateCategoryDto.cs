using System.ComponentModel.DataAnnotations;

namespace dotnet_nerdover.Data.Dtos;

public class CreateCategoryDto
{
    [Required]
    [StringLength(255)]
    public required string Slug { get; set; }

    [Required]
    [StringLength(255)]
    public required string Name { get; set; }
}