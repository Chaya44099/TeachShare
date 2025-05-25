using AutoMapper;
using TeachShare.Api.Entities;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;

namespace TeachShare.Api
{
    public class MappingProfilePostModel:Profile
    {
        public MappingProfilePostModel()
        {
            CreateMap<UserDTO, UserPostModel>().ReverseMap();
            CreateMap<CollectionDTO, CollectionPostModel>().ReverseMap();
            CreateMap<CollectionDTO, CollectionPutModel>().ReverseMap();

            //CreateMap<Category, CategoryDTO>().ReverseMap();
            //CreateMap<Material, MaterialDTO>().ReverseMap();
            //CreateMap<Rating, RatingDTO>().ReverseMap();
            //CreateMap<Tag, TagDTO>().ReverseMap();
        }

    }
}
