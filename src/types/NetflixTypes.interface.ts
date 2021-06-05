// Generated by https://quicktype.io

export interface NetflixGenres {
  genre: string;
  netflixid: number;
}

export enum VideoTypeEnum {
  MOVIE = "movie",
  SERIE = "serie",
  ALL = "",
}

export type NetflixVideoType =
  | VideoTypeEnum.MOVIE
  | VideoTypeEnum.SERIE
  | VideoTypeEnum.ALL;

export enum orderByEnum {
  DATE = "date",
  DATE_DESC = "dateDesc",
  RATING = "rating",
  TITLE = "title",
  TYPE = "type",
  RUNTIME = "runtime",
  YEAR = "filmyear",
  YEARDESC = "filmyearDesc",
}

export type OrderBy =
  | orderByEnum.DATE
  | orderByEnum.DATE_DESC
  | orderByEnum.RATING
  | orderByEnum.TITLE
  | orderByEnum.TYPE
  | orderByEnum.RUNTIME
  | orderByEnum.YEAR
  | orderByEnum.YEARDESC;

export interface NetflixSearchQuery {
  videoType: NetflixVideoType;
  limit: number;
  audio: string; //Language (default english)
  start_year: number;
  end_rating: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  query: string;
  countrylist: number[];
  orderby: OrderBy;
  genrelist: number[];
}

export interface NetflixSearchResult {
  id: number;
  title: string;
  img: string;
  vtype: string;
  nfid: number;
  synopsis: string;
  avgrating: number;
  year: number;
  runtime: number;
  imdbid: string;
  poster: string;
  imdbrating: number;
  top250: number;
  top250tv: number;
  clist: string;
  titledate: string;
  countries?: string[];
}