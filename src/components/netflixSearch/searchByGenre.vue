<template>
  <div class="searchGenre">
    <div class="sharethis-inline-share-buttons"></div>
    <a-select
      v-model:value="store.state.searchQuery.genrelist"
      show-search
      placeholder="Select a Genre"
      class="searchGenreInput"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
      mode="multiple"
    >
      <a-select-option
        v-for="genre in store.state.filteredNetflixGenres"
        :key="genre.netflixid"
        :value="genre.netflixid"
        >{{ genre.genre }}</a-select-option
      >
    </a-select>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "../../store/store";
const store = useStore();

onMounted(() => {
  store.dispatch("getNetflixGenres");
  let shareScript = document.createElement('script')
        shareScript.setAttribute('src', 'https://platform-api.sharethis.com/js/sharethis.js#property=611e8ccfd821a600130aaf53&product=inline-share-buttons')
        document.head.appendChild(shareScript)
});

const handleSearch = (val: any) => {
  store.state.filteredNetflixGenres = store.state.netflixGenres.filter(
    (genre) => {
      return genre.genre.toLowerCase().includes(val.toLowerCase());
    }
  );
};
</script>
<style lang="scss">
.searchGenre {
  padding: 1rem;
  .searchGenreInput {
    width: 100%;
    max-width: 400px;
  }
}
</style>
