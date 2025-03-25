using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;

namespace TeachShare.Service.Services
{
    public class TagService : ITagService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TagService(IRepositoryManager repository, IMapper mapper)
        {
            _repositoryManager = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TagDTO>> GetAllTagsAsync()
        {
            var tags = await _repositoryManager.TagRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<TagDTO>>(tags);
        }

        public async Task<TagDTO> GetTagByIdAsync(int tagId)
        {
            var tag = await _repositoryManager.TagRepository.GetByIdAsync(tagId);
            return _mapper.Map<TagDTO>(tag);
        }

        public async Task<TagDTO> CreateTagAsync(TagDTO tag)
        {
            var tagEntity = _mapper.Map<Tag>(tag);
            var tagEntityAdded = await _repositoryManager.TagRepository.AddAsync(tagEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<TagDTO>(tagEntityAdded);
        }

        public async Task<TagDTO> UpdateTagAsync(TagDTO tagDto)
        {
            var existingTag = await _repositoryManager.TagRepository.GetByIdAsync(tagDto.Id);
            if (existingTag == null) throw new Exception("Tag not found");

            var tagEntity = _mapper.Map<Tag>(tagDto);
            await _repositoryManager.TagRepository.UpdateAsync(existingTag.Id, tagEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<TagDTO>(tagEntity);
        }

        public async Task<bool> DeleteTagAsync(int tagId)
        {
            var tag = await _repositoryManager.TagRepository.GetByIdAsync(tagId);
            if (tag != null)
            {
                await _repositoryManager.TagRepository.DeleteAsync(tagId);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }
}
