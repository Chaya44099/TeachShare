using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;

namespace TeachShare.Core.Iservices
{
    public interface ITagService
    {
        Task<TagDTO> GetTagByIdAsync(int tagId);
        Task<IEnumerable<TagDTO>> GetAllTagsAsync();
        Task<TagDTO> CreateTagAsync(TagDTO tag);
        Task<TagDTO> UpdateTagAsync(TagDTO tag);
        Task<bool> DeleteTagAsync(int tagId);
    }
}
