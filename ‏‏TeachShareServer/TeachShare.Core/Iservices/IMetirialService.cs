using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;

namespace TeachShare.Core.Iservices
{
    public interface IMaterialService
    {
        Task<MaterialDTO> GetMaterialByIdAsync(int materialId);
        Task<IEnumerable<MaterialDTO>> GetAllMaterialsAsync();
        Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material);
        Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO material);
        Task<bool> DeleteMaterialAsync(int materialId);
    }
}
