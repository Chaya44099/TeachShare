using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;

namespace TeachShare.Core.Iservices
{
    public interface ICategoryService
    {
        Task<CategoryDTO> GetCategoryByIdAsync(int categoryId);
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
        Task<CategoryDTO> CreateCategoryAsync(CategoryDTO category);
        Task<CategoryDTO> UpdateCategoryAsync(CategoryDTO category);
        Task<bool> DeleteCategoryAsync(int categoryId);
    }
}
