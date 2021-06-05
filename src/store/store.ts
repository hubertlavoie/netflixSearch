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

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
  state: {
    count: 0,
    netflixGenres: [],
    videoTypeChoices: Object.values(VideoTypeEnum),
    orderbyChoices: Object.values(orderByEnum),
    searchQuery: {
      videoType: VideoTypeEnum.ALL,
      limit: 100,
      audio: "",
      start_year: 1922,
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
    getNetflixGenres(context) {
      axios
        .request({
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/genres",
          headers: {
            "x-rapidapi-key":
              "3ba234ab63msh9b8dde24572d2a6p133c1fjsn134d27b9918d",
            "x-rapidapi-host": "unogsng.p.rapidapi.com",
            "accept-encoding": "*",
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
    searchNetflix(context) {
      context.state.searchSpinner = true;
      context.commit("CHANGE_SEARCH_SPINNER_STATUS", true);
      axios
        .request({
          method: "GET",
          url: "https://unogsng.p.rapidapi.com/search",
          params: {
            ...context.state.searchQuery,
          },
          headers: {
            "x-rapidapi-key":
              "3ba234ab63msh9b8dde24572d2a6p133c1fjsn134d27b9918d",
            "x-rapidapi-host": "unogsng.p.rapidapi.com",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          let searchResult: NetflixSearchResult[];
          context.commit("CHANGE_SEARCH_SPINNER_STATUS", false);
          if (response.data.results) {
            searchResult = response.data.results;
            context.commit("CHANGE_NO_RESULT_STATUS", false);
          } else {
            searchResult = [];
            context.commit("CHANGE_NO_RESULT_STATUS", true);
          }

          searchResult.forEach((result) => {
            result.title = result.title.replace(/&#39;/g, "'");
            const cleanCountryResult: string[] = [];
            let splitCountry = result.clist.split(",");
            splitCountry.forEach((element) => {
              cleanCountryResult.push(...element.split('"'));
            });
            result.countries = cleanCountryResult;
          });

          context.commit("SET_SEARCH_RESULT", searchResult);
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
