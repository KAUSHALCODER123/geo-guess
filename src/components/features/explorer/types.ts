export type ViewMode = "grid" | "list";

export type SortOption =
  | "name_asc"
  | "name_desc"
  | "population_desc"
  | "population_asc"
  | "area_desc"
  | "area_asc";

export type LandlockedFilter = "all" | "landlocked" | "coastal";
export type UNMemberFilter = "all" | "member" | "non-member";

export interface ExplorerFilterState {
  searchQuery: string;
  region: string;
  subregion: string;
  minPopulation: number;
  maxPopulation: number;
  landlocked: LandlockedFilter;
  unMember: UNMemberFilter;
  sortBy: SortOption;
  viewMode: ViewMode;
}

export const DEFAULT_FILTER_STATE: ExplorerFilterState = {
  searchQuery: "",
  region: "all",
  subregion: "all",
  minPopulation: 0,
  maxPopulation: 1_500_000_000,
  landlocked: "all",
  unMember: "all",
  sortBy: "name_asc",
  viewMode: "grid",
};
