using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TeachShare.Core.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; } // מספר מזהה ייחודי
        public string Username { get; set; } // שם משתמש
        public string Email { get; set; } // כתובת דוא"ל
        public string FirstName { get; set; } // שם פרטי
        public string LastName { get; set; } // שם משפחה
        [JsonIgnore]
        public string PasswordHash { get; set; } // סיסמה
        public string ProfilePicture { get; set; } // נתיב לתמונת פרופיל
        public DateTime RegistrationDate { get; set; } // תאריך הרשמה
        public bool IsActive { get; set; } // האם המשתמש פעיל
        public string Role { get; set; } = "teacher"; // תפקיד
    }

    //public class User
    //{
    //    [Key]
    //    public int UserId { get; set; } // מזהה ייחודי של המשתמש (מפתח ראשי)

    //    [Required]
    //    [StringLength(50)]
    //    public string Username { get; set; } // שם המשתמש

    //    [Required]
    //    [EmailAddress]
    //    public string Email { get; set; } // כתובת הדוא"ל של המשתמש

    //    [Required]
    //    public string PasswordHash { get; set; } // סיסמת המשתמש (מוצפנת)

    //    public string FirstName { get; set; } // שם פרטי

    //    public string LastName { get; set; } // שם משפחה

    //    public string ProfilePicture { get; set; } // כתובת התמונה של המשתמש

    //    public string School { get; set; } // שם בית הספר של המשתמש

    //    public string Subjects { get; set; } // נושאים שהמשתמש מלמד

    //    public string GradeLevels { get; set; } // רמות כיתה שהמשתמש מלמד

    //    public DateTime RegistrationDate { get; set; } // תאריך ההרשמה של המשתמש

    //    public DateTime LastLogin { get; set; } // תאריך הכניסה האחרונה של המשתמש

    //    public bool IsActive { get; set; } // האם המשתמש פעיל

    //    public string Role { get; set; } // תפקיד המשתמש (למשל, מורה, תלמיד)

    //    public DateTime CreatedAt { get; set; } // תאריך יצירת הרשומה

    //    public DateTime UpdatedAt { get; set; } // תאריך עדכון הרשומה
    //}


}
