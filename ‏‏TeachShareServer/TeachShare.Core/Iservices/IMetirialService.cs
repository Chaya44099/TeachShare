using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using Microsoft.AspNetCore.Http;

namespace TeachShare.Core.Iservices
{
    public interface IMaterialService
    {
        //Task<MaterialDTO> GetMaterialByIdAsync(int materialId);
        //Task<IEnumerable<MaterialDTO>> GetAllMaterialsAsync();
        //Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material);
        //Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO material);
        //Task<bool> DeleteMaterialAsync(int materialId);
        ////Task<Material> SaveFileMetadataAsync(IFormFile file, int ownerId, int? folderId = null);
        ////Task<bool> UploadToS3Async(Stream fileStream, string s3Key, string contentType);
        ////Task<string> GeneratePresignedUrlAsync(string fileName, string contentType);
        ////Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId);

        Task<IEnumerable<MaterialDTO>> GetAllMaterialsAsync();
        Task<MaterialDTO> GetMaterialByIdAsync(int materialId);
        Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material);
        Task<bool> DeleteMaterialAsync(int materialId);
        Task<IEnumerable<MaterialDTO>> GetFilesByOwnerAsync(int userId);
        Task<IEnumerable<MaterialDTO>> GetMaterialsByFolderAsync(int folderId);
    }
}
