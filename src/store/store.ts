// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import axios from "axios";
import {
  NetflixGenres,
  NetflixSearchResult,
  orderByEnum,
  VideoTypeEnum,
} from "../types/NetflixTypes.interface";
import { StoreState } from "../types/StoreTypes.interface";
import * as helpers from "../helpers/helpers";
import { RAPID_API_KEY, RAPID_API_HOST } from "../constants/keys";

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
  state: {
    count: 0,
    netflixGenres: [],
    filteredNetflixGenres: [],
    videoTypeChoices: Object.values(VideoTypeEnum),
    orderbyChoices: Object.values(orderByEnum),
    searchQuery: {
      videoType: VideoTypeEnum.ALL,
      limit: 100,
      audio: "",
      start_year: 1900,
      end_rating: 10,
      query: "",
      countrylist: [],
      orderby: orderByEnum.RATING,
      genrelist: [],
    },
    searchResult: [],
    noResult: false,
    searchSpinner: false,
  },
  mutations: {
    SET_NETFLIX_GENRES(state, payload: NetflixGenres[]) {
      state.netflixGenres = payload;
      state.filteredNetflixGenres = payload;
    },
    SET_SEARCH_RESULT(state, payload: NetflixSearchResult[]) {
      state.searchResult = payload;
    },
    CHANGE_NO_RESULT_STATUS(state, payload: boolean) {
      state.noResult = payload;
    },
    CHANGE_SEARCH_SPINNER_STATUS(state, payload: boolean) {
      state.searchSpinner = payload;
    },
  },
  actions: {
    searchNetflix(context) {
      context.state.searchSpinner = true;
      context.commit("CHANGE_SEARCH_SPINNER_STATUS", true);
      axios
        .request({
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/search",
          params: {
            ...context.state.searchQuery,
            genrelist: context.state.searchQuery.genrelist.join(","),
          },
          headers: {
            "x-rapidapi-key": RAPID_API_KEY,
            "x-rapidapi-host": RAPID_API_HOST,
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          context.commit("CHANGE_SEARCH_SPINNER_STATUS", false);
          let searchResult: NetflixSearchResult[];
          if (response.data.results) {
            searchResult = response.data.results;
            context.commit("CHANGE_NO_RESULT_STATUS", false);
          } else {
            searchResult = [];
            context.commit("CHANGE_NO_RESULT_STATUS", true);
          }
          context.commit(
            "SET_SEARCH_RESULT",
            addCountriesAndFixTitle(searchResult)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getNetflixGenres(context) {
      axios
        .request({
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/genres",
          headers: {
            "x-rapidapi-key": RAPID_API_KEY,
            "x-rapidapi-host": RAPID_API_HOST,
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          const netflixGenres: NetflixGenres[] = response.data.results;
          context.commit("SET_NETFLIX_GENRES", netflixGenres);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

// This function adds the property country and fix the title (replace &#39; by ')
function addCountriesAndFixTitle(
  data: NetflixSearchResult[]
): NetflixSearchResult[] {
  data.forEach((element) => {
    element.synopsis = helpers.replaceSpecialCharacters(
      "&#39;",
      element.synopsis
    );
    element.title = helpers.replaceSpecialCharacters("&#39;", element.title);
    element.countries = helpers.returnFilteredArrayFromString(
      element.clist,
      `,`,
      `"`,
      3
    );
  });
  return data;
}
