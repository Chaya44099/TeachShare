//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;
//using TeachShare.Core.DTOs;
//using TeachShare.Core.Entities;
//using TeachShare.Core.Irepositories;
//using TeachShare.Core.Iservices;
//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.Http;

//namespace TeachShare.Service.Services
//{
//    public class MaterialService : IMaterialService
//    {
//        private readonly IAmazonS3 _s3Client;
//        private readonly IRepositoryManager _repositoryManager;
//        private readonly IMapper _mapper;

//        public MaterialService(IRepositoryManager repository, IMapper mapper, IAmazonS3 s3Client)
//        {
//            _repositoryManager = repository;
//            _mapper = mapper;
//            _s3Client = s3Client;

//        }

//        public async Task<IEnumerable<MaterialDTO>> GetAllMaterialsAsync()
//        {
//            var materials = await _repositoryManager.MaterialRepository.GetAllAsync();
//             return _mapper.Map<IEnumerable<MaterialDTO>>(materials);
//        }

//        public async Task<MaterialDTO> GetMaterialByIdAsync(int materialId)
//        {
//            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(materialId);
//            return _mapper.Map<MaterialDTO>(material);
//        }

//        public async Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material)
//        {
//            var materialEntity = _mapper.Map<Material>(material);
//            var materialEntityAdded = await _repositoryManager.MaterialRepository.AddAsync(materialEntity);
//            await _repositoryManager.SaveAsync();
//            return _mapper.Map<MaterialDTO>(materialEntityAdded);
//        }

//        public async Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO materialDto)
//        {
//            var existingMaterial = await _repositoryManager.MaterialRepository.GetByIdAsync(materialDto.Id);
//            if (existingMaterial == null) throw new Exception("Material not found");

//            var materialEntity = _mapper.Map<Material>(materialDto);
//            await _repositoryManager.MaterialRepository.UpdateAsync(existingMaterial.Id, materialEntity);
//            await _repositoryManager.SaveAsync();
//            return _mapper.Map<MaterialDTO>(materialEntity);
//        }

//        //public async Task<bool> DeleteMaterialAsync(int materialId)
//        //{
//        //    var material = await _repositoryManager.MaterialRepository.GetByIdAsync(materialId);
//        //    if (material != null)
//        //    {
//        //        await _repositoryManager.MaterialRepository.DeleteAsync(materialId);
//        //        await _repositoryManager.SaveAsync();
//        //        return true;
//        //    }
//        //    return false;
//        //}

//        //public async Task<string> GeneratePresignedUrlAsync(string fileName, string contentType)
//        //{
//        //    var request = new GetPreSignedUrlRequest
//        //    {
//        //        BucketName = "teachshare.testpnoren",
//        //        Key = $"uploads/{Guid.NewGuid()}/{fileName}",
//        //        Verb = HttpVerb.PUT,
//        //        Expires = DateTime.UtcNow.AddMinutes(5),
//        //        ContentType = contentType
//        //    };

//        //    return _s3Client.GetPreSignedURL(request);
//        //}

//        //public async Task<Material> SaveFileMetadataAsync(IFormFile file, int ownerId, int? folderId = null)
//        //{
//        //    var s3Key = $"uploads/{Guid.NewGuid()}/{file.FileName}";

//        //    var fileEntity = new Material
//        //    {
//        //        FileName = file.FileName,
//        //        FileType = Path.GetExtension(file.FileName),
//        //        Size = file.Length,
//        //        S3Key = s3Key,
//        //        UserId = ownerId,
//        //        CollectionID = folderId,
//        //        IsDeleted = false
//        //    };

//        //    return await _repositoryManager.MaterialRepository.AddAsync(fileEntity);
//        //}
//        //public async Task<bool> UploadToS3Async(Stream fileStream, string s3Key, string contentType)
//        //{
//        //    var request = new PutObjectRequest
//        //    {
//        //        BucketName = "teachshare.testpnoren",
//        //        Key = s3Key,
//        //        InputStream = fileStream,
//        //        ContentType = contentType
//        //    };

//        //    var response = await _s3Client.PutObjectAsync(request);
//        //    return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
//        //}

//        public async Task<bool> DeleteMaterialAsync(int fileId)
//        {
//            var file = await _repositoryManager.MaterialRepository.GetByIdAsync(fileId);
//            if (file == null) return false;

//            // Delete from S3
//            var deleteRequest = new DeleteObjectRequest
//            {
//                BucketName = "your-bucket-name",
//                Key = file.S3Key
//            };
//            await _s3Client.DeleteObjectAsync(deleteRequest);

//            // Soft delete in database
//            return await _repositoryManager.MaterialRepository.DeleteAsync(fileId);
//        }
//        public async Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId)
//        {
//            var file = await _repositoryManager.MaterialRepository.GetFilesByOwnerAsync(userId);
//            return file;
//        }
//    }


//}
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;

namespace TeachShare.Service.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public MaterialService(IRepositoryManager repository, IMapper mapper, IAmazonS3 s3Client)
        {
            _repositoryManager = repository;
            _mapper = mapper;
            _s3Client = s3Client;
        }

        public async Task<IEnumerable<MaterialDTO>> GetAllMaterialsAsync()
        {
            var materials = await _repositoryManager.MaterialRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MaterialDTO>>(materials);
        }

        public async Task<MaterialDTO> GetMaterialByIdAsync(int materialId)
        {
            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(materialId);
            return _mapper.Map<MaterialDTO>(material);
        }

        public async Task<IEnumerable<MaterialDTO>> GetMaterialsByFolderAsync(int folderId)
        {
            var materials = await _repositoryManager.MaterialRepository.GetMaterialsByFolderAsync(folderId);
            return _mapper.Map<IEnumerable<MaterialDTO>>(materials);
        }

        public async Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material)
        {
            var materialEntity = _mapper.Map<Material>(material);
            materialEntity.CreatedDate = DateTime.UtcNow;
            materialEntity.IsDeleted = false;

            var materialEntityAdded = await _repositoryManager.MaterialRepository.AddAsync(materialEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<MaterialDTO>(materialEntityAdded);
        }

        public async Task<MaterialDTO> SoftDeleteFileAsync(int id)
        {
            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(id);
            if (material == null)
                return null;

            await _repositoryManager.MaterialRepository.SoftDeleteAsync(material);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<MaterialDTO>(material);
        }


        public async Task<IEnumerable<MaterialDTO>> GetFilesByOwnerAsync(int userId)
        {
            var files = await _repositoryManager.MaterialRepository.GetFilesByOwnerAsync(userId);
            return _mapper.Map<IEnumerable<MaterialDTO>>(files);
        }
        public async Task<MaterialDTO> ShareMaterialAsync(int id, ShareMaterialDTO dto)
        {
            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(id);
            if (material == null)
                throw new Exception("Material not found");

            material.IsPublic = dto.IsPublic;
            material.CategoryId = dto.CategoryId;
            material.ModifiedDate = DateTime.UtcNow;

            //await _repositoryManager.MaterialRepository.UpdateAsync(id, material);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<MaterialDTO>(material);
        }

        public async Task<IEnumerable<MaterialDTO>> GetMaterialsByCategoryAsync(int categoryId)
        {
            var materials = await _repositoryManager.MaterialRepository.FindAllAsync(m => m.CategoryId == categoryId && m.IsPublic && !m.IsDeleted);

            return _mapper.Map<IEnumerable<MaterialDTO>>(materials);
        }
        public async Task<Material?> RenameMaterialAsync(int id, string newName)
        {
            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(id);
            if (material == null)
                return null;

            material.Name = newName;
            await _repositoryManager.SaveAsync();
            return material;
        }

    }
}
