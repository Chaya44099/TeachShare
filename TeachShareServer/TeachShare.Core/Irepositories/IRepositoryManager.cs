using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Irepositories
{
    public interface IRepositoryManager
    {
        IUserRepository UserRepository { get; }
        IMetirialRepository MaterialRepository { get; }
        ICategoryRepository CategoryRepository { get; }
       ITagRepository TagRepository { get; }
       IRatingRepository RatingRepository { get; }
       IColleltionRepository CollectionRepository { get; }
       // ICollectionItemRepository CollectionItemRepository { get; }
        Task SaveAsync(); // לשמור את השינויים במסד הנתונים
    }

}
