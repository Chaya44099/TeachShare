using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Irepositories
{
    public interface IMetirialRepository : IRepositoryGeneric<Material>
    {

        Task<IEnumerable<Material>> GetMaterialsByFolderAsync(int folderId);
        Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId);
        //Task<IEnumerable<MaterialDTO>> GetMaterialsByCategoryAsync(int categoryId);
        // IMaterialRepository.cs
        Task<IEnumerable<Material>> FindAllAsync(Expression<Func<Material, bool>> predicate);
        Task<bool> SoftDeleteAsync(Material material);

    }
}
