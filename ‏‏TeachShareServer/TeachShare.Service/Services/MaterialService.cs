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
    public class MaterialService : IMaterialService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public MaterialService(IRepositoryManager repository, IMapper mapper)
        {
            _repositoryManager = repository;
            _mapper = mapper;
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

        public async Task<MaterialDTO> CreateMaterialAsync(MaterialDTO material)
        {
            var materialEntity = _mapper.Map<Material>(material);
            var materialEntityAdded = await _repositoryManager.MaterialRepository.AddAsync(materialEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<MaterialDTO>(materialEntityAdded);
        }

        public async Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO materialDto)
        {
            var existingMaterial = await _repositoryManager.MaterialRepository.GetByIdAsync(materialDto.Id);
            if (existingMaterial == null) throw new Exception("Material not found");

            var materialEntity = _mapper.Map<Material>(materialDto);
            await _repositoryManager.MaterialRepository.UpdateAsync(existingMaterial.Id, materialEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<MaterialDTO>(materialEntity);
        }

        public async Task<bool> DeleteMaterialAsync(int materialId)
        {
            var material = await _repositoryManager.MaterialRepository.GetByIdAsync(materialId);
            if (material != null)
            {
                await _repositoryManager.MaterialRepository.DeleteAsync(materialId);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }


}
