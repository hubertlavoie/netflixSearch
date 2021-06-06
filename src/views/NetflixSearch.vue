<template lang="">
  <div class="netflixSearch">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>

      <searchByTitle />
      <searchByGenre />

    <a-button type="primary" @click="store.dispatch('searchNetflix')" class="searchBtn">Search</a-button>

    <p v-if="store.state.searchSpinner"><a-spin /></p>

    <section v-if="store.state.searchResult.length > 0" class="searchResults"> 
      <template v-for="result in store.state.searchResult" :key="result.id"> 
        <resultCard :result="result" />
      </template>
    </section>
    
    <p v-if="store.state.noResult">There is no result for you query. Please try again. </p>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../store/store";
import resultCard from "../components/netflixSearch/resultCard.vue";
import searchByTitle from "../components/netflixSearch/searchByTitle.vue";
import searchByGenre from "../components/netflixSearch/searchByGenre.vue";
const store = useStore();

</script>

<style lang="scss">
@import './../assets/style/variables';
h1 {
  font-size: 4rem;
  span {
    font-size: 2rem;
  }
}
.logo {
  text-align: center;
  img {
    width: 100%;
    max-width: 600px;
  }
}
.searchInput {
  text-align: center;
  input {
    max-width: 1000px;
  }
}
.searchResults{
  margin-top:1rem;
  display: grid;
  grid-template-columns:100%;
}
@media (min-width: $breakpoint-md) {
  .searchResults{
  grid-template-columns:50% 50%;
  }
}
@media (min-width: $breakpoint-lg) {
  .searchResults{
  grid-template-columns:33% 33% 33%;
  }
}
@media (min-width: $breakpoint-xl) {
  .searchResults{
  grid-template-columns:25% 25% 25% 25%;
  } 
}

</style>
