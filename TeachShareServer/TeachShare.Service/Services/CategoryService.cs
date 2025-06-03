using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;

namespace TeachShare.Service.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CategoryService(IRepositoryManager repository, IMapper mapper)
        {
            _repositoryManager = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync()
        {
            var categories = await _repositoryManager.CategoryRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetCategoryByIdAsync(int categoryId)
        {
            var category = await _repositoryManager.CategoryRepository.GetByIdAsync(categoryId);
            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task<CategoryDTO> CreateCategoryAsync(CategoryDTO category)
        {
            var categoryEntity = _mapper.Map<Category>(category);
            var categoryEntityAdded = await _repositoryManager.CategoryRepository.AddAsync(categoryEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<CategoryDTO>(categoryEntityAdded);
        }

        public async Task<CategoryDTO> UpdateCategoryAsync(CategoryDTO categoryDto)
        {
            var existingCategory = await _repositoryManager.CategoryRepository.GetByIdAsync(categoryDto.Id);
            if (existingCategory == null) throw new Exception("Category not found");

            var categoryEntity = _mapper.Map<Category>(categoryDto);
            await _repositoryManager.CategoryRepository.UpdateAsync(existingCategory.Id, categoryEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<CategoryDTO>(categoryEntity);
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId)
        {
            var category = await _repositoryManager.CategoryRepository.GetByIdAsync(categoryId);
            if (category != null)
            {
                await _repositoryManager.CategoryRepository.DeleteAsync(categoryId);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }
}
