using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;

namespace TeachShare.Core.Iservices
{
    public interface ICollectionService
    {
        Task<CollectionDTO> GetCollectionByIdAsync(int collectionId);
        Task<IEnumerable<CollectionDTO>> GetAllCollectionsAsync();
        Task<CollectionDTO> CreateCollectionAsync(CollectionDTO collection);
        Task<CollectionDTO> UpdateCollectionAsync(CollectionDTO collection);
        Task<bool> DeleteCollectionAsync(int collectionId);
        Task<IEnumerable<CollectionDTO>> GetRootCollectionsAsync(int userId);

        Task<IEnumerable<CollectionDTO>> GetSubCollectionsAsync(int parentCollectionId);
    }
}
