using Microsoft.AspNetCore.Mvc;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeachShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDTO>>> GetAllRatings()
        {
            var ratings = await _ratingService.GetAllRatingsAsync();
            return Ok(ratings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDTO>> GetRatingById(int id)
        {
            var rating = await _ratingService.GetRatingByIdAsync(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        [HttpPost]
        public async Task<ActionResult<RatingDTO>> CreateRating(RatingDTO ratingDto)
        {
            var createdRating = await _ratingService.CreateRatingAsync(ratingDto);
            return CreatedAtAction(nameof(GetRatingById), new { id = createdRating.Id }, createdRating);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RatingDTO>> UpdateRating(int id, RatingDTO ratingDto)
        {
            if (id != ratingDto.Id)
            {
                return BadRequest("Rating ID mismatch");
            }

            var updatedRating = await _ratingService.UpdateRatingAsync(ratingDto);
            return Ok(updatedRating);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var result = await _ratingService.DeleteRatingAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}