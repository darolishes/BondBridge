export interface FilterType {
  searchQuery: string;
  category: string;
  status: "all" | "active" | "completed";
  sortBy: "name" | "date" | "priority";
}
