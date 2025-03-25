using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;

namespace TeachShare.Data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DataContext _context;
       public IUserRepository UserRepository { get; }
        public IMetirialRepository MaterialRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public ITagRepository TagRepository { get; }
        public IRatingRepository RatingRepository { get; }
        public IColleltionRepository CollectionRepository { get; }
       // public ICollectionItemRepository CollectionItemRepository { get; }
        public RepositoryManager(DataContext context, IUserRepository userRepository,
        IMetirialRepository materialRepository,
        ICategoryRepository categoryRepository,
        ITagRepository tagRepository,
        IRatingRepository ratingRepository,
        IColleltionRepository collectionRepository
        //ICollectionItemRepository collectionItemRepository
            )
        {
            _context = context;
            UserRepository = userRepository;
            MaterialRepository = materialRepository;
            CategoryRepository = categoryRepository;
            TagRepository = tagRepository;
            RatingRepository = ratingRepository;
            CollectionRepository = collectionRepository;
            //CollectionItemRepository = collectionItemRepository;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
