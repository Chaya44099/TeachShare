using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Irepositories
{
    public interface IColleltionRepository: IRepositoryGeneric<Collection>
    {
        Task<IEnumerable<Collection>> GetRootCollectionsAsync(int userId);
        Task<IEnumerable<Collection>> GetSubCollectionsAsync(int parentId);
    }
}
