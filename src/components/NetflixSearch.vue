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
    </div>

    <a-button type="primary" @click="search" class="searchBtn">Search</a-button>

    <p v-if="store.state.searchSpinner"><a-spin /></p>

    <section v-if="store.state.searchResult.length > 0" class="searchResults"> 
      
        <a-card class="result-box"  :title="`(${result.year}) ${result.title}`" v-for="result in store.state.searchResult" :key="result.id">
          <template #extra><a :href='`https://www.netflix.com/watch/${result.nfid}`'  target="_blank">View</a></template>
          <div class="cardContent">
            <div class="cardContent-img">
              <img :src="result.img" />
            </div>
            <div class="cardContent-country">
              <h5><strong><a :href="`https://www.imdb.com/title/${result.imdbid}`" target="_blank">IMDB </a>rating:</strong> {{result.imdbrating}}</h5>
              <template v-for="(country, index) in result.countries"  :key="index">
                <p v-if="country.length > 3 && country != 'more'"> {{country}} </p>  
              </template>
              
             
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

const search = () => {
  store.dispatch("searchNetflix");
};

onMounted(() => {
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
.cardContent-country{
  width:100%;
  p{
    font-size:0.8rem;
    padding:4px;
    margin:0;
    display:inline-block;
    margin:3px;
    color:$white;
    background:$gray-dark;
    border-radius: 4px;
  }
  h4{
    margin-bottom:0.5rem;
  }
  h5{
    font-size:0.9rem;
    margin-top:0.5rem;
  }
}
</style>
