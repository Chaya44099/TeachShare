using System.ComponentModel.DataAnnotations;

namespace TeachShare.Api.Entities
{
    public class CategoryPostModel
    {
        
        
            [Required]
            [StringLength(100)]
            public string Name { get; set; }

            public string? Description { get; set; }

            public bool IsActive { get; set; } = true;
        

    }
}
