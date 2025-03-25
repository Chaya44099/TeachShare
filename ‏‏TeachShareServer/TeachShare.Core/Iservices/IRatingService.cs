using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;

namespace TeachShare.Core.Iservices
{
    public interface IRatingService
    {
        Task<RatingDTO> GetRatingByIdAsync(int ratingId);
        Task<IEnumerable<RatingDTO>> GetAllRatingsAsync();
        Task<RatingDTO> CreateRatingAsync(RatingDTO rating);
        Task<RatingDTO> UpdateRatingAsync(RatingDTO rating);
        Task<bool> DeleteRatingAsync(int ratingId);
    }
}
