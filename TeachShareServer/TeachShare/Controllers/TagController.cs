using Microsoft.AspNetCore.Mvc;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeachShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDTO>>> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TagDTO>> GetTagById(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpPost]
        public async Task<ActionResult<TagDTO>> CreateTag(TagDTO tagDto)
        {
            var createdTag = await _tagService.CreateTagAsync(tagDto);
            return CreatedAtAction(nameof(GetTagById), new { id = createdTag.Id }, createdTag);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TagDTO>> UpdateTag(int id, TagDTO tagDto)
        {
            if (id != tagDto.Id)
            {
                return BadRequest("Tag ID mismatch");
            }

            var updatedTag = await _tagService.UpdateTagAsync(tagDto);
            return Ok(updatedTag);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var result = await _tagService.DeleteTagAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}