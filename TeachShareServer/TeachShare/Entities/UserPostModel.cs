using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TeachShare.Api.Entities
{
    public class UserPostModel
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(255, MinimumLength = 6)]
        public string? PasswordHash { get; set; } // זה מה שיגיע בטופס, יומר ל־PasswordHash בשרת

        [StringLength(50)]
        public string Role { get; set; } = "teacher";

        public bool IsActive { get; set; } = true;
    }
}
