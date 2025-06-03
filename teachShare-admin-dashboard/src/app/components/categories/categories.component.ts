import { Component, signal, inject, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { LucideAngularModule } from "lucide-angular"
import { Subject, takeUntil } from "rxjs"
import { ApiService } from "../../services/api.service.service"
import type { Category } from "../../models/api.models"

interface CategoryFormData {
  name: string
  description: string
  isActive: boolean
}

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService)
  private destroy$ = new Subject<void>()

  categories = signal<Category[]>([])
  showCategoryModal = signal(false)
  showDeleteModal = signal(false)
  showWarningModal = signal(false)
  editingCategory = signal<Category | null>(null)
  categoryToDelete = signal<Category | null>(null)

  categoryFormData: CategoryFormData = {
    name: "",
    description: "",
    isActive: true,
  }

  warningMessage = signal("")

  ngOnInit() {
    this.loadCategories()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  loadCategories() {
    this.apiService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories.set(categories)
        },
        error: (error) => {
          console.error("Error loading categories:", error)
        },
      })
  }

  // Modal Management
  openCreateCategoryModal() {
    this.editingCategory.set(null)
    this.categoryFormData = {
      name: "",
      description: "",
      isActive: true,
    }
    this.showCategoryModal.set(true)
  }

  editCategory(category: Category) {
    this.editingCategory.set(category)
    this.categoryFormData = {
      name: category.name,
      description: category.description || "",
      isActive: category.isActive,
    }
    this.showCategoryModal.set(true)
  }

  closeCategoryModal() {
    this.showCategoryModal.set(false)
    this.editingCategory.set(null)
  }

  // Enhanced Delete Function - FIXED
  deleteCategory(categoryId: number) {
    const category = this.categories().find((c) => c.id === categoryId)
    if (!category) return

    // Set the category to delete FIRST
    this.categoryToDelete.set(category)

    // Check if category has files
    if (category.fileCount > 0) {
      this.warningMessage.set(
        `הקטגוריה "${category.name}" מכילה ${category.fileCount} קבצים. הקבצים לא יוצגו במרחב השיתוף אם תמחק את הקטגוריה. מומלץ להעביר את הקבצים לקטגוריה אחרת לפני המחיקה.`,
      )
      this.showWarningModal.set(true)
      return
    }

    // Show delete confirmation directly if no files
    this.showDeleteModal.set(true)
  }

  // Confirm delete after warning - FIXED
  proceedWithDelete() {
    // Close warning modal and show delete confirmation
    this.showWarningModal.set(false)
    this.showDeleteModal.set(true)
  }

  // Execute delete
  confirmDelete() {
    const category = this.categoryToDelete()
    if (!category) {
      console.error("No category selected for deletion")
      return
    }

    this.apiService
      .deleteCategory(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCategories()
          this.closeDeleteModal()
        },
        error: (error) => {
          console.error("Error deleting category:", error)
          this.closeDeleteModal()
        },
      })
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false)
    this.categoryToDelete.set(null)
  }

  closeWarningModal() {
    this.showWarningModal.set(false)
    this.categoryToDelete.set(null)
  }

  // Save Category
  saveCategory() {
    const editing = this.editingCategory()

    if (editing) {
      // Update existing category
      this.apiService
        .updateCategory(editing.id, this.categoryFormData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories()
            this.closeCategoryModal()
          },
          error: (error) => {
            console.error("Error updating category:", error)
          },
        })
    } else {
      // Create new category
      this.apiService
        .createCategory(this.categoryFormData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories()
            this.closeCategoryModal()
          },
          error: (error) => {
            console.error("Error creating category:", error)
          },
        })
    }
  }

  // Utility functions
  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  trackByCategoryId(index: number, category: Category): number {
    return category.id
  }
}
