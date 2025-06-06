﻿//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;
//using TeachShare.Core.DTOs;
//using TeachShare.Core.Irepositories;
//using TeachShare.Core.Iservices;
//using TeachShare.Core.Entities;

////namespace TeachShare.Service.Services
////{
////    public class CollectionService : ICollectionService
////    {
////        private readonly IRepositoryManager _repositoryManager;
////        private readonly IMapper _mapper;

////        public CollectionService(IRepositoryManager repository, IMapper mapper)
////        {
////            _repositoryManager = repository;
////            _mapper = mapper;
////        }

////        public async Task<IEnumerable<CollectionDTO>> GetAllCollectionsAsync()
////        {
////            var collections = await _repositoryManager.CollectionRepository.GetAllAsync();
////            return _mapper.Map<IEnumerable<CollectionDTO>>(collections);
////        }

////        public async Task<CollectionDTO> GetCollectionByIdAsync(int collectionId)
////        {
////            var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionId);
////            return _mapper.Map<CollectionDTO>(collection);
////        }

////        public async Task<CollectionDTO> CreateCollectionAsync(CollectionDTO collection)
////        {
////            var collectionEntity = _mapper.Map<Collection>(collection);
////            var collectionEntityAdded = await _repositoryManager.CollectionRepository.AddAsync(collectionEntity);
////            await _repositoryManager.SaveAsync();
////            return _mapper.Map<CollectionDTO>(collectionEntityAdded);
////        }

////        public async Task<CollectionDTO> UpdateCollectionAsync(CollectionDTO collectionDto)
////        {
////            var existingCollection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionDto.Id);
////            if (existingCollection == null) throw new Exception("Collection not found");

////            var collectionEntity = _mapper.Map<Collection>(collectionDto);
////            await _repositoryManager.CollectionRepository.UpdateAsync(existingCollection.Id, collectionEntity);
////            await _repositoryManager.SaveAsync();
////            return _mapper.Map<CollectionDTO>(collectionEntity);
////        }

////        public async Task<bool> DeleteCollectionAsync(int collectionId)
////        {
////            var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionId);
////            if (collection != null)
////            {
////                await _repositoryManager.CollectionRepository.DeleteAsync(collectionId);
////                await _repositoryManager.SaveAsync();
////                return true;
////            }
////            return false;
////        }
////    }

////}
//public class CollectionService : ICollectionService
//{
//    private readonly IRepositoryManager _repositoryManager;
//    private readonly IMapper _mapper;

//    public CollectionService(IRepositoryManager repository, IMapper mapper)
//    {
//        _repositoryManager = repository;
//        _mapper = mapper;
//    }

//    public async Task<IEnumerable<CollectionDTO>> GetAllCollectionsAsync()
//    {
//        var collections = await _repositoryManager.CollectionRepository.GetAllAsync();
//        return _mapper.Map<IEnumerable<CollectionDTO>>(collections);
//    }

//    public async Task<CollectionDTO> GetCollectionByIdAsync(int collectionId)
//    {
//        var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionId);
//        return _mapper.Map<CollectionDTO>(collection);
//    }

//    public async Task<IEnumerable<CollectionDTO>> GetRootCollectionsAsync(int userId)
//    {
//        var rootCollections = await _repositoryManager.CollectionRepository.GetRootCollectionsAsync(userId);
//        return _mapper.Map<IEnumerable<CollectionDTO>>(rootCollections);
//    }

//    public async Task<IEnumerable<CollectionDTO>> GetSubCollectionsAsync(int parentCollectionId)
//    {
//        var subCollections = await _repositoryManager.CollectionRepository.GetSubCollectionsAsync(parentCollectionId);
//        return _mapper.Map<IEnumerable<CollectionDTO>>(subCollections);
//    }

//    public async Task<CollectionDTO> CreateCollectionAsync(CollectionDTO collectionDto)
//    {
//        var collectionEntity = _mapper.Map<Collection>(collectionDto);

//        // אם יש ParentCollectionId, נוודא שיש תיקית שורש
//        if (collectionEntity.ParentCollectionId.HasValue)
//        {
//            var parentCollection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionEntity.ParentCollectionId.Value);
//            if (parentCollection == null)
//            {
//                throw new Exception("Parent collection not found");
//            }
//        }

//        var collectionEntityAdded = await _repositoryManager.CollectionRepository.AddAsync(collectionEntity);
//        await _repositoryManager.SaveAsync();
//        return _mapper.Map<CollectionDTO>(collectionEntityAdded);
//    }


//    public async Task<CollectionDTO> UpdateCollectionAsync(CollectionDTO collectionDto)
//    {
//        var existingCollection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionDto.Id);
//        if (existingCollection == null) throw new Exception("Collection not found");

//        var collectionEntity = _mapper.Map<Collection>(collectionDto);
//        await _repositoryManager.CollectionRepository.UpdateAsync(existingCollection.Id, collectionEntity);
//        await _repositoryManager.SaveAsync();
//        return _mapper.Map<CollectionDTO>(collectionEntity);
//    }

//    public async Task<bool> DeleteCollectionAsync(int collectionId)
//    {
//        var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionId);
//        if (collection != null)
//        {
//            await _repositoryManager.CollectionRepository.DeleteAsync(collectionId);
//            await _repositoryManager.SaveAsync();
//            return true;
//        }
//        return false;
//    }
//}
//using AutoMapper;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using TeachShare.Core.DTOs;
//using TeachShare.Core.Entities;
//using TeachShare.Core.Irepositories;
//using TeachShare.Core.Iservices;

//namespace TeachShare.Service.Services
//{
//    public class CollectionService : ICollectionService
//    {
//        private readonly IRepositoryManager _repositoryManager;
//        private readonly IMapper _mapper;

//        public CollectionService(IRepositoryManager repository, IMapper mapper)
//        {
//            _repositoryManager = repository;
//            _mapper = mapper;
//        }

//        public async Task<IEnumerable<CollectionDTO>> GetAllCollectionsAsync()
//        {
//            var collections = await _repositoryManager.CollectionRepository.GetAllAsync();
//            return _mapper.Map<IEnumerable<CollectionDTO>>(collections);
//        }

//        public async Task<CollectionDTO> GetCollectionByIdAsync(int collectionId)
//        {
//            var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(collectionId);
//            return _mapper.Map<CollectionDTO>(collection);
//        }

//        public async Task<CollectionDTO> CreateCollectionAsync(CollectionDTO collectionDto)
//        {
//            var collectionEntity = _mapper.Map<Collection>(collectionDto);
//            collectionEntity.CreatedDate = DateTime.UtcNow;
//            collectionEntity.IsDeleted = false;

//            var collectionEntityAdded = await _repositoryManager.CollectionRepository.AddAsync(collectionEntity);
//            await _repositoryManager.SaveAsync();
//            return _mapper.Map<CollectionDTO>(collectionEntityAdded);
//        }

//        public async Task<IEnumerable<CollectionDTO>> GetRootCollectionsAsync(int userId)
//        {
//            var rootCollections = await _repositoryManager.CollectionRepository.GetRootCollectionsAsync(userId);
//            return _mapper.Map<IEnumerable<CollectionDTO>>(rootCollections);
//        }

//        public async Task<IEnumerable<CollectionDTO>> GetSubCollectionsAsync(int parentId)
//        {
//            var subCollections = await _repositoryManager.CollectionRepository.GetSubCollectionsAsync(parentId);
//            return _mapper.Map<IEnumerable<CollectionDTO>>(subCollections);
//        }
//        public async Task<CollectionDTO?> UpdateCollectionAsync(CollectionDTO updateDto)
//        {
//            var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(updateDto.Id);
//            if (collection == null)
//                return null;

//            collection.Name = updateDto.Name;
//            collection.Description = updateDto.Description;
//            collection.iconType = updateDto.IconType;
//            collection.ModifiedDate = DateTime.UtcNow;

//            await _repositoryManager.SaveAsync();

//            return _mapper.Map<CollectionDTO>(collection);
//        }


//    }
//}
using AutoMapper;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;

public class CollectionService : ICollectionService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public CollectionService(IRepositoryManager repository, IMapper mapper)
    {
        _repositoryManager = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CollectionDTO>> GetAllCollectionsAsync()
    {
        var collections = await _repositoryManager.CollectionRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CollectionDTO>>(collections);
    }

    public async Task<CollectionDTO> GetCollectionByIdAsync(int id)
    {
        var collection = await _repositoryManager.CollectionRepository.GetByIdAsync(id);
        return _mapper.Map<CollectionDTO>(collection);
    }

    public async Task<CollectionDTO> CreateCollectionAsync(CollectionDTO dto)
    {
        var entity = _mapper.Map<Collection>(dto);
        entity.CreatedDate = DateTime.UtcNow;
        entity.IsDeleted = false;

        var added = await _repositoryManager.CollectionRepository.AddAsync(entity);
        await _repositoryManager.SaveAsync();
        return _mapper.Map<CollectionDTO>(added);
    }

    public async Task<IEnumerable<CollectionDTO>> GetRootCollectionsAsync(int userId)
    {
        var rootCollections = await _repositoryManager.CollectionRepository.GetRootCollectionsAsync(userId);
        return _mapper.Map<IEnumerable<CollectionDTO>>(rootCollections);
    }

    public async Task<IEnumerable<CollectionDTO>> GetSubCollectionsAsync(int parentId)
    {
        var subCollections = await _repositoryManager.CollectionRepository.GetSubCollectionsAsync(parentId);
        return _mapper.Map<IEnumerable<CollectionDTO>>(subCollections);
    }

    public async Task<CollectionDTO?> UpdateCollectionAsync(CollectionDTO dto)
    {
        var existing = await _repositoryManager.CollectionRepository.GetByIdAsync(dto.Id);
        if (existing == null)
            return null;

        existing.Name = dto.Name;
        existing.Description = dto.Description;
        existing.iconType = dto.IconType;
        existing.ModifiedDate = DateTime.UtcNow;

        await _repositoryManager.SaveAsync();
        return _mapper.Map<CollectionDTO>(existing);
    }

    public async Task<CollectionDTO> SoftDeleteCollectionAsync(int id)
    {
        var folder = await _repositoryManager.CollectionRepository.GetByIdAsync(id);
        if (folder == null)
            return null;

        await _repositoryManager.CollectionRepository.SoftDeleteRecursiveAsync(folder);
        await _repositoryManager.SaveAsync();
        return _mapper.Map<CollectionDTO>(folder);
    }
}