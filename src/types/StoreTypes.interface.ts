import {
  NetflixGenres,
  NetflixSearchQuery,
  NetflixSearchResult,
} from "./NetflixTypes.interface";

export interface StoreState {
  count: number;
  netflixGenres: NetflixGenres[];
  filteredNetflixGenres: NetflixGenres[];
  videoTypeChoices: string[];
  orderbyChoices: string[];
  searchQuery: NetflixSearchQuery;
  searchResult: NetflixSearchResult[];
  noResult: boolean;
  searchSpinner: boolean;
}
