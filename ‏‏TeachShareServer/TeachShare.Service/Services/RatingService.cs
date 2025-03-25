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
    public class RatingService : IRatingService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public RatingService(IRepositoryManager repository, IMapper mapper)
        {
            _repositoryManager = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RatingDTO>> GetAllRatingsAsync()
        {
            var ratings = await _repositoryManager.RatingRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<RatingDTO>>(ratings);
        }

        public async Task<RatingDTO> GetRatingByIdAsync(int ratingId)
        {
            var rating = await _repositoryManager.RatingRepository.GetByIdAsync(ratingId);
            return _mapper.Map<RatingDTO>(rating);
        }

        public async Task<RatingDTO> CreateRatingAsync(RatingDTO rating)
        {
            var ratingEntity = _mapper.Map<Rating>(rating);
            var ratingEntityAdded = await _repositoryManager.RatingRepository.AddAsync(ratingEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<RatingDTO>(ratingEntityAdded);
        }

        public async Task<RatingDTO> UpdateRatingAsync(RatingDTO ratingDto)
        {
            var existingRating = await _repositoryManager.RatingRepository.GetByIdAsync(ratingDto.Id);
            if (existingRating == null) throw new Exception("Rating not found");

            var ratingEntity = _mapper.Map<Rating>(ratingDto);
            await _repositoryManager.RatingRepository.UpdateAsync(existingRating.Id, ratingEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<RatingDTO>(ratingEntity);
        }

        public async Task<bool> DeleteRatingAsync(int ratingId)
        {
            var rating = await _repositoryManager.RatingRepository.GetByIdAsync(ratingId);
            if (rating != null)
            {
                await _repositoryManager.RatingRepository.DeleteAsync(ratingId);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }


}
