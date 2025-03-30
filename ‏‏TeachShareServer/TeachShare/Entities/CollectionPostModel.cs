namespace TeachShare.Api.Entities
{
    public class CollectionPostModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int? ParentCollectionId { get; set; }
    }
}
