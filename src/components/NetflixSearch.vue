<template lang="">
  <div class="netflixSearch">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <div class="searchInput">
      <a-input
        class="mainSearchInput"
        v-model:value="store.state.searchQuery.query"
        placeholder="Search Movie Title"
        @keyup.enter="search"
        ref="searchInput"
      />
      <br />
      <a-select
      v-model:value="store.state.searchQuery.genrelist"
      show-search
      placeholder="Select a Genre"
      style="width: 200px"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
      mode="multiple"
    >
      <a-select-option v-for="genre in store.state.filteredNetflixGenres" :keys="genre.netflixid" :value="genre.netflixid">{{genre.genre}}</a-select-option>
    </a-select> 
     
    </div>

    <a-button type="primary" @click="search" class="searchBtn">Search</a-button>

    <p v-if="store.state.searchSpinner"><a-spin /></p>

    <section v-if="store.state.searchResult.length > 0" class="searchResults"> 
      
        <a-card class="result-box"  :title="`(${result.year}) ${result.title}`" v-for="result in store.state.searchResult" :key="result.id">
          <template #extra><a :href='`https://www.netflix.com/watch/${result.nfid}`' target="_blank"><font-awesome-icon icon="eye" /> Netflix</a></template>
          <div class="cardContent">
            <div class="cardContent-img">
              <img :src="result.img" />
            </div>
            <div class="cardContent-country">
              <template v-for="(country, index) in result.countries"  :key="index">
                <span class="countryTag"> {{country}} </span>  
              </template>
              <p>{{result.synopsis}}</p>
              <h5><strong><a :href="`https://www.imdb.com/title/${result.imdbid}`" target="_blank"><font-awesome-icon icon="external-link-square-alt" /> IMDB </a> rating: </strong> {{result.imdbrating}}</h5>
            </div>
          </div>
          
        </a-card>
    
    </section>
    
    <p v-if="store.state.noResult">There is no result for you query. Please try again. </p>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "../store/store";
const store = useStore();

const searchInput = ref<any>(null);

const handleSearch = (val: any) => {
  store.state.filteredNetflixGenres = store.state.netflixGenres.filter(genre => {
    return genre.genre.toLowerCase().includes(val.toLowerCase())
  })
};

const search = () => {
  store.dispatch("searchNetflix");
};

onMounted(() => {
    store.dispatch("getNetflixGenres");
    searchInput.value.focus();
});

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
  margin-top:4rem;
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
.cardContent{
  display:flex;
}
.cardContent-img{
  padding:0.5rem;
  img{
    border-radius:5px;
  }
}
.countryTag{
    font-size:0.7rem;
    padding:0.25rem;
    margin:0;
    display:inline-block;
    margin:3px;
    color:$white;
    background:$gray-dark;
    border-radius: 4px;
  }
.cardContent-country{
  width:100%;
  
  h4{
    margin-bottom:0.5rem;
  }
  h5{
    font-size:0.9rem;
    margin:0;
  }
  p{
    line-height:auto;
    padding:0.5rem;
    margin-bottom:0;
  }
}

</style>
