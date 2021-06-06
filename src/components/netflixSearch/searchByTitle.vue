<template>
  <div class="searchInput">
    <a-input
      class="mainSearchInput"
      v-model:value="store.state.searchQuery.query"
      placeholder="Search Movie Title"
      @keyup.enter="store.dispatch('searchNetflix')"
      ref="searchInput"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "../../store/store";
const store = useStore();
const searchInput = ref<any>(null);

onMounted(() => {
  searchInput.value.focus();
});
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
