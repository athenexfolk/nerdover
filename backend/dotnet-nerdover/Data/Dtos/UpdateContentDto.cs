using System.ComponentModel.DataAnnotations;

namespace dotnet_nerdover.Data.Dtos;

public class UpdateContentDto
{
    [Required]
    public required string Content { get; set; }
}