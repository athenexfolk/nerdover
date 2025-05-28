using System.ComponentModel.DataAnnotations;

namespace dotnet_nerdover.Data.Dtos;

public class UpdateCategoryDto
{

    [Required]
    [StringLength(255)]
    public required string Name { get; set; }
}