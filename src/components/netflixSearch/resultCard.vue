<template lang="">
  <a-card class="result-box"  :title="`(${result.year}) ${result.title}`">
    <template #extra><a :href='`https://www.netflix.com/watch/${result.nfid}`' target="_blank"><font-awesome-icon icon="eye" /> Netflix</a></template>
    <div class="cardContent">
      <div class="cardContent-img">
        <font-awesome-icon icon="film" v-if="result.vtype == 'movie'" />
        <font-awesome-icon icon="tv" v-else />
        <img :src="result.img" />
      </div>
      <div class="cardContent-country">
          <span class="countryTag" v-for="country in result.countries" :key="country"> {{country}} </span>  
        <p>{{result.synopsis}}</p>
        <h5><strong><a :href="`https://www.imdb.com/title/${result.imdbid}`" target="_blank"><font-awesome-icon icon="external-link-square-alt" /> IMDB </a> rating: </strong> {{result.imdbrating}}</h5>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  NetflixSearchResult,
} from "../../types/NetflixTypes.interface";
export default defineComponent({
  props: {
    result: {
      type: Object as PropType<NetflixSearchResult>,
      required: true
    }
  },
  })
</script>
<style lang="scss">
@import './../../assets/style/variables';
.cardContent{
  display:flex;
}
.cardContent-img{
  position:relative;
  padding:0.5rem;
  img{
    border-radius:5px;
  }
  svg{
    position: absolute;
    color: #fff;
    font-size: 2rem;
    top: 0.9rem;
    left: 0.9rem;
    background:$primary;
    padding: 0.5rem;
    border-radius: 5px;
  }
}
.countryTag{
    font-size:0.7rem;
    padding:0.25rem;
    margin:0;
    display:inline-block;
    margin:3px;
    color:$white;
    background:$dark;
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