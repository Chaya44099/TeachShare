using System.ComponentModel.DataAnnotations;

namespace TeachShare.Core.Entities
{
 
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(255)]
        public string? ProfilePicture { get; set; }

        [StringLength(150)]
        public string? School { get; set; }

        public string? TeachingSubjects { get; set; } // שינוי שם מ-Subjects ל-TeachingSubjects לבהירות

        public string? GradeLevels { get; set; }

        [StringLength(100)]
        public string? City { get; set; } // הוספת שדה עיר

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public DateTime LastLogin { get; set; }= DateTime.UtcNow;

        [StringLength(20)]
        public string AccountStatus { get; set; } = "active"; // שינוי מ-IsActive לסטטוס מורחב

        [StringLength(50)]
        public string Role { get; set; } = "teacher"; // ברירת מחדל - מורה

        public bool IsAdmin { get; set; } = false; // הוספת סימון למנהל מערכת

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        //[Key]
        //public int UserId { get; set; } // מספר מזהה ייחודי

        //[Required]
        //[StringLength(100)]
        //public string Username { get; set; } // שם משתמש

        //[Required]
        //[EmailAddress]
        //[StringLength(100)]
        //public string Email { get; set; } // כתובת דוא"ל (ייחודית)

        //[Required]
        //[StringLength(255)]
        //public string PasswordHash { get; set; } // גיבוב סיסמה

        //[Required]
        //[StringLength(100)]
        //public string FirstName { get; set; } // שם פרטי

        //[Required]
        //[StringLength(100)]
        //public string LastName { get; set; } // שם משפחה

        //[StringLength(255)]
        //public string ProfilePicture { get; set; } // נתיב לתמונת פרופיל

        //[StringLength(100)]
        //public string School { get; set; } // בית ספר

        //public string Subjects { get; set; } // תחומי הוראה

        //public string GradeLevels { get; set; } // שכבות גיל

        //public DateTime RegistrationDate { get; set; } = DateTime.UtcNow; // תאריך הרשמה

        //public DateTime LastLogin { get; set; } // תאריך התחברות אחרונה

        //public bool IsActive { get; set; } = true; // האם המשתמש פעיל

        //[StringLength(50)]
        //public string Role { get; set; } // תפקיד

        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

        //// קשרים
        public virtual ICollection<Material> Materials { get; set; } = new List<Material>();// חומרים שהמשתמש העלה
        public virtual ICollection<Rating> Ratings { get; set; } // דירוגים שהמשתמש נתן
        public virtual ICollection<Collection> Collections { get; set; } // אוספים של המשתמש
    }

}
