<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
   <div class="flex justify-center items-center gap-3 mb-10">
     <h2 class="text-2xl font-semibold text-center ">📊 Statistics</h2>
     <button 
        @click="goToSearchPage" 
        class="text-blue-500 hover:underline text-lg"
      >
        or Make a new Search
      </button>
   </div>

    <div class="flex flex-wrap gap-6 justify-between">
      <!-- Popular searches -->
      <div class="flex-1 min-w-[300px]">
        <h3 class="text-xl font-medium mb-4">🔥 Popular Searches</h3>
       
        <ul class="space-y-2">
          <li 
            v-for="search in popularSearches" 
            :key="search.termSearched" 
            @click="relaunchSearch(search.termSearched)"
            class="cursor-pointer p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <span class="font-semibold text-gray-700">{{ search.termSearched }}</span>
            <span class="text-sm text-gray-500">({{ search.count }} times)</span>
          </li>
        </ul>
      </div>

      <!-- Most searched tags -->
      <div class="flex-1 min-w-[300px]">
        <h3 class="text-xl font-medium mb-4">🏷️ Trending Tags</h3>
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="tag in popularTags" 
            :key="tag.tag" 
            @click="relaunchSearch(tag.tag)"
            class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            #{{ tag.tag }} <span class="text-sm opacity-80">({{ tag.count }})</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Define the structure of search data
interface Search {
  termSearched: string;
  count: number;
}

// Define the structure of tag data
interface Tag {
  tag: string;
  count: number;
}

const router = useRouter();
const popularSearches = ref<Search[]>([]);
const popularTags = ref<Tag[]>([]);

// Fetch statistics from the backend API
const fetchStats = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const searchRes = await axios.get<Search[]>(`${API_BASE_URL}/popular`);
    const tagsRes = await axios.get<Tag[]>(`${API_BASE_URL}/popular-tags`); 
    popularSearches.value = searchRes.data;
    popularTags.value = tagsRes.data;
  } catch (error) {
    console.error("Error fetching statistics", error);
  }
};

// Navigate to the search page when clicking on a popular search
const relaunchSearch = (searchTerm: string) => {
  router.push({ name: "Home", query: { q: searchTerm } });
};

const goToSearchPage = () => {
  router.push('/');
};
// Fetch data when the component is mounted
onMounted(fetchStats);
</script>
