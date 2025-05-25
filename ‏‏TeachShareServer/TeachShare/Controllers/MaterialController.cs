using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;

namespace TeachShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        private readonly IAmazonS3 _s3Client;

        public MaterialController(IMaterialService materialService, IAmazonS3 s3Client)
        {
            _materialService = materialService;
            _s3Client = s3Client;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialDTO>>> GetAllMaterials()
        {
            var materials = await _materialService.GetAllMaterialsAsync();
            return Ok(materials);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialDTO>> GetMaterialById(int id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            return Ok(material);
        }
        [HttpGet("by-category/{id}")]
        public async Task<IActionResult> GetMaterialsByCategory(int id)
        {
            var materials = await _materialService.GetMaterialsByCategoryAsync(id);
            return Ok(materials);
        }

        [HttpGet("folder/{folderId}")]
        public async Task<ActionResult<IEnumerable<MaterialDTO>>> GetMaterialsByFolder(int folderId)
        {
            var materials = await _materialService.GetMaterialsByFolderAsync(folderId);
            return Ok(materials);
        }

        [HttpGet("presigned-url")]
        public ActionResult GetPresignedUrl( [FromQuery] string fileName, [FromQuery] string contentType)
        {
            try
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "myteacherbubket.testpnoren",
                    Key = fileName,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(50),
                    ContentType = contentType
                };

                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "שגיאה ביצירת כתובת", error = ex.Message });
            }
        }

        [HttpGet("download-url")]
        public ActionResult GetDownloadUrl([FromQuery] string fileName)
        {
            try
            {
                var fileKey = fileName;
                string contentType = GetContentType(Path.GetExtension(fileName));

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "myteacherbubket.testpnoren",
                    Key = fileKey,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    ResponseHeaderOverrides = new ResponseHeaderOverrides
                    {
                        ContentType = contentType,
                        // קידוד השם של הקובץ ל-UTF-8
                        ContentDisposition = "attachment; filename*=UTF-8''" + Uri.EscapeDataString(Path.GetFileName(fileName))
                    }
                };

                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "שגיאה ביצירת כתובת", error = ex.Message });
            }
        }

        [HttpGet("view-url")]
        public ActionResult GetViewUrl([FromQuery] string fileName)
        {
            try
            {
                var fileKey = fileName;
                string contentType = GetContentType(Path.GetExtension(fileName));

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "myteacherbubket.testpnoren",
                    Key = fileKey,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    ResponseHeaderOverrides = new ResponseHeaderOverrides
                    {
                        ContentType = contentType
                        // ללא ContentDisposition כדי שהדפדפן יציג את הקובץ במקום להוריד אותו
                    }
                };

                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "שגיאה ביצירת כתובת צפייה", error = ex.Message });
            }
        }

        // Helper method to get content type based on file extension
        private string GetContentType(string extension)
        {
            switch (extension.ToLower())
            {
                case ".pdf":
                    return "application/pdf";
                case ".docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case ".doc":
                    return "application/msword";
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case ".xls":
                    return "application/vnd.ms-excel";
                case ".txt":
                    return "text/plain";
                case ".png":
                    return "image/png";
                case ".jpg":
                    return "image/jpeg";
                case ".jpeg":
                    return "image/jpeg";
                case ".gif":
                    return "image/gif";
                case ".svg":
                    return "image/svg+xml";
                case ".webp":
                    return "image/webp";
                case ".mp3":
                    return "audio/mpeg"; // Content-Type for MP3 files
                case ".mp4":
                    return "video/mp4"; // Content-Type for MP4 files
                default:
                    return "application/octet-stream"; // Default binary stream
            }
        }


        [HttpPost("save-file-info")]
        public async Task<ActionResult<MaterialDTO>> SaveFileInfo([FromBody] MaterialDTO material)
        {
            if (material == null)
            {
                return BadRequest("Material data is required.");
            }

            var createdMaterial = await _materialService.CreateMaterialAsync(material);
            return Ok(createdMaterial);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<MaterialDTO>>> GetFilesByOwner(int userId)
        {
            var files = await _materialService.GetFilesByOwnerAsync(userId);
            return Ok(files);
        }
        [HttpPut("share/{id}")]
        public async Task<IActionResult> ShareFile(int id, [FromBody] ShareMaterialDTO dto)
        {
            try
            {
                var updatedMaterial = await _materialService.ShareMaterialAsync(id, dto);
                return Ok(updatedMaterial);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
        [HttpPut("rename/{id}")]
        public async Task<IActionResult> RenameMaterial(int id, [FromBody] string newName)
        {
            var updatedMaterial = await _materialService.RenameMaterialAsync(id, newName);
            if (updatedMaterial == null)
                return NotFound(new { message = "Material not found" });

            return Ok(updatedMaterial);
        }


        [HttpPut("delete/{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var deleted = await _materialService.SoftDeleteFileAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted); 
        }

    }
}