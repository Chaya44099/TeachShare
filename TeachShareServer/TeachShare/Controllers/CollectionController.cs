//using AutoMapper;
//using Microsoft.AspNetCore.Mvc;
//using TeachShare.Api.Entities;
//using TeachShare.Core.DTOs;
//using TeachShare.Core.Entities;
//using TeachShare.Core.Iservices;
//using TeachShare.Service.Services;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace TeachShare.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CollectionController : ControllerBase
//    {
//        private readonly ICollectionService _collectionService;
//        private readonly IMapper _mapper;

//        public CollectionController(ICollectionService collectionService,IMapper mapper)
//        {
//            _collectionService = collectionService;
//            _mapper = mapper;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetAllCollections()
//        {
//            var collections = await _collectionService.GetAllCollectionsAsync();
//            return Ok(collections);
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<CollectionDTO>> GetCollectionById(int id)
//        {
//            var collection = await _collectionService.GetCollectionByIdAsync(id);
//            if (collection == null)
//            {
//                return NotFound();
//            }
//            return Ok(collection);
//        }

//        [HttpPost]
//        public async Task<ActionResult<CollectionDTO>> CreateCollection([FromBody] CollectionPostModel collection)
//        {
//            if (collection == null)
//            { 
//               return BadRequest("User data is required."); // מחזיר קוד 400 עם הודעה
//            }
//            var collectionDto = _mapper.Map<CollectionDTO>(collection);
//            //string token = await _userService.RegisterAsync(userDto);
//            var createdCollection = await _collectionService.CreateCollectionAsync(collectionDto);
//            return CreatedAtAction(nameof(GetCollectionById), new { id = createdCollection.Id }, createdCollection);
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult<CollectionDTO>> UpdateCollection(int id, CollectionDTO collectionDto)
//        {
//            if (id != collectionDto.Id)
//            {
//                return BadRequest("Collection ID mismatch");
//            }

//            var updatedCollection = await _collectionService.UpdateCollectionAsync(collectionDto);
//            return Ok(updatedCollection);
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteCollection(int id)
//        {
//            var result = await _collectionService.DeleteCollectionAsync(id);
//            if (!result)
//            {
//                return NotFound();
//            }
//            return NoContent();
//        }
//        // קבלת תיקיות שורש של משתמש מסוים
//        [HttpGet("root/{userId}")]
//        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetRootCollections(int userId)
//        {
//            var rootCollections = await _collectionService.GetRootCollectionsAsync(userId);
//            return Ok(rootCollections);
//        }

//        // קבלת תתי-תיקיות של תיקיה מסוימת
//        [HttpGet("sub/{parentId}")]
//        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetSubCollections(int parentId)
//        {
//            var subCollections = await _collectionService.GetSubCollectionsAsync(parentId);
//            return Ok(subCollections);
//        }
//    }
//}
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TeachShare.Api.Entities;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;

namespace TeachShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly ICollectionService _collectionService;
        private readonly IMapper _mapper;

        public CollectionController(ICollectionService collectionService, IMapper mapper)
        {
            _collectionService = collectionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetAllCollections()
        {
            var collections = await _collectionService.GetAllCollectionsAsync();
            return Ok(collections);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionDTO>> GetCollectionById(int id)
        {
            var collection = await _collectionService.GetCollectionByIdAsync(id);
            if (collection == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        [HttpPost]
        public async Task<ActionResult<CollectionDTO>> CreateCollection([FromBody] CollectionPostModel collection)
        {
            if (collection == null)
            {
                return BadRequest("Collection data is required.");
            }
            var collectionDto = _mapper.Map<CollectionDTO>(collection);
            var createdCollection = await _collectionService.CreateCollectionAsync(collectionDto);
            return CreatedAtAction(nameof(GetCollectionById), new { id = createdCollection.Id }, createdCollection);
        }

        // קבלת תיקיות שורש של משתמש מסוים
        [HttpGet("root/{userId}")]
        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetRootCollections(int userId)
        {
            var rootCollections = await _collectionService.GetRootCollectionsAsync(userId);
            return Ok(rootCollections);
        }

        // קבלת תתי-תיקיות של תיקיה מסוימת
        [HttpGet("sub/{parentId}")]
        public async Task<ActionResult<IEnumerable<CollectionDTO>>> GetSubCollections(int parentId)
        {
            var subCollections = await _collectionService.GetSubCollectionsAsync(parentId);
            return Ok(subCollections);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<CollectionDTO>> UpdateCollection(int id, [FromBody] CollectionPutModel updateDto)
       {
            if (id != updateDto.Id)
                return BadRequest("ID mismatch");

            var collectionDto = _mapper.Map<CollectionDTO>(updateDto);
            var updatedCollection = await _collectionService.UpdateCollectionAsync(collectionDto);
            if (updatedCollection == null)
                return NotFound();

            return Ok(updatedCollection);
        }
        [HttpPut("delete/{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var deleted = await _collectionService.SoftDeleteCollectionAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted); // במקום NoContent
        }


    }
}