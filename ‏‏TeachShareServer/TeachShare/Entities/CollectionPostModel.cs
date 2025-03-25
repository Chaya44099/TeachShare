namespace TeachShare.Api.Entities
{
    public class CollectionPostModel
    {
        public int UserId { get; set; } // מזהה המשתמש
        public int? ParentCollectionId { get; set; }
        public string Name { get; set; } // שם התיקיה
        public string? Description { get; set; } // תיאור התיקיה
        public bool IsPublic { get; set; } // האם התיקיה גלוי לכולם
    }
}
