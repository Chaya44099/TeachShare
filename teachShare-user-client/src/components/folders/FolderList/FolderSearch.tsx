import React from "react"
import { Search } from "lucide-react"
import { Input } from "../../../components/ui/input"

interface FolderSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const FolderSearch: React.FC<FolderSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="חיפוש תיקיות..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-9 text-right"
        dir="rtl"
      />
    </div>
  )
}