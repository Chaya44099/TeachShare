using System.Text.Json.Serialization;

namespace TeachShare.Api.Entities
{
    public class UserPostModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
       
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public string ProfilePicture { get; set; }
        //public string School { get; set; }
        //public string TeachingSubjects { get; set; }
        //public string GradeLevels { get; set; }
        //public string City { get; set; }
        //public string AccountStatus { get; set; }
        //public string Role { get; set; }
        //public bool IsAdmin { get; set; }
        //public DateTime CreatedAt { get; set; }
        //public DateTime UpdatedAt { get; set; }
    }
}
