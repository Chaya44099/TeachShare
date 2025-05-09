﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Core.Entities
{
    public class Collection
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public DateTime? DeletedDate { get; set; }

        public bool IsDeleted { get; set; }
        public int iconType { get; set; }


        //[Key]
        //public int CollectionId { get; set; } // מספר מזהה ייחודי

        //[Required]
        public int UserId { get; set; } // מזהה המשתמש

        //[Required]
        //[StringLength(100)]
        //public string Name { get; set; } // שם האוסף

        //public string Description { get; set; } // תיאור האוסף

        //public bool IsPublic { get; set; } = false; // האם האוסף גלוי לכולם

        //public DateTime CreatedDate { get; set; } = DateTime.UtcNow; // תאריך יצירה

        //public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה
        //public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון

        // קשרים
        public virtual User User { get; set; } // המשתמש שיצר את האוסף
        public int? ParentCollectionId { get; set; } // מפתח זר לאוסף ההורה
        public virtual Collection ParentCollection { get; set; } // אוסף ההורה

        public virtual ICollection<Collection> SubCollections { get; set; } //= new List<Collection>();
        
        public virtual ICollection<Material> Materials { get; set; }// = new List<Material>(); 
    }

}
