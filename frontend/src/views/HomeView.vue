<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="text-center max-w-4xl w-full">
      <h1 class="text-4xl font-bold text-gray-700 mb-4">Cat Search</h1>
      <p class="text-lg text-gray-500 mb-6">Enter a tag to see cat images!</p>
      
      <!-- SearchBar component -->
      <SearchBar @search="fetchCats" :query="lastQuery" />
        <!-- Show New or Lost Cats component -->
      
      
      <div v-if="loading" class="text-blue-600 text-xl mt-4">
        <span class="spinner"></span> Loading cats...
      </div>
      <div v-if="errorMessage" class="text-red-600 bg-red-100 p-4 rounded-lg mt-4">
        {{ errorMessage }}
      </div>
      
      <div v-if="cats.length > 0" class="mt-6">
        <h2 class="text-2xl text-gray-700 mb-4 ">Results:</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="cat in cats" :key="cat.id" class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img :src="cat.imageUrl" :alt="'Cat ' + cat.id" class="w-full h-40 object-cover" />
            <p class="text-sm text-gray-600 p-2">
              Tags: 
              <span 
                v-for="(tag, index) in cat.tags" 
                :key="index" 
                class="text-blue-600 inline-block m-1 rounded-full p-1 text-xs cursor-pointer hover:underline"
                @click="selectTag(tag)">
                {{ tag }}
              </span>
            </p>
          </div>
        </div>

        <!-- Pagination -->
        <Pagination 
          :currentPage="currentPage" 
          :hasNextPage="hasNextPage" 
          @page-change="fetchCats(lastQuery, $event)" 
        />

        <p class="mt-4 text-lg font-bold text-gray-600">Total results: {{ totalResults }}</p>
      </div>
      
      <div v-else-if="!loading" class="mt-4 text-gray-500 italic">
        No results found. Try another tag!
      </div>

      <div v-if="newCats !== null && removedCats !== null">
        <div v-if="newCats.length > 0 || removedCats.length > 0">
          <NewOrLostCats :newCats="newCats" :removedCats="removedCats" />
        </div>
          <p v-else class="bg-white shadow-md rounded-lg p-4 text-gray-500 text-lg font-bold text-center border border-gray-300"
          >
            There are no new or removed cats.
          </p>     
         </div>


    

    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import SearchBar from '../components/SearchBar.vue';
import Pagination from '../components/Pagination.vue';
import NewOrLostCats from '../components/NewOrLostCats.vue';  // Import NewOrLostCats component
import { useToast } from 'vue-toastification'; // Import Vue Toastification for notifications

const toast = useToast(); // Use Vue Toastification for notifications

const cats = ref([]);
const totalResults = ref(0);
const loading = ref(false);
const errorMessage = ref('');
const currentPage = ref(1);
const itemsPerPage = 4;
const route = useRoute();

let lastQuery = ref(route.query.q || "");
const catsPerPage = 4; // Number of items per page

const newCats = ref(null);
const removedCats = ref(null);

const fetchCats = async (query, page = 1) => {
  loading.value = true;
  errorMessage.value = '';
  lastQuery.value = query;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${API_BASE_URL}/cats/filter?tag=${query}&omit=${(page - 1) * catsPerPage}&total=${catsPerPage}`);
    
    // Get total length, filtered results, and new/removed cats
    const { totalLength, filteredCats, message, newCats: newCatsData, removedCats: removedCatsData } = response.data;

    // Update filtered cats
    cats.value = filteredCats.map(cat => ({
      id: cat.id,
      imageUrl: `https://cataas.com/cat/${cat.id}`,
      tags: cat.tags
    }));

   
    // Update total results for pagination
    totalResults.value = totalLength;


      // Update new and removed cats
      newCats.value = newCatsData;
      removedCats.value = removedCatsData;


    // Check if there is a next page
    hasNextPage.value = (page * catsPerPage) < totalLength;

    currentPage.value = page;

    // Show a notification with the server message
    /* if(page === 1) {
      if (message) {
        toast.success(message); // Show success message if the server returns one
       

      }
    } */
  } catch (error) {
    errorMessage.value = "Error loading cats.";
    toast.error('An error occurred during the search.');
  } finally {
    loading.value = false;
  }
};

const hasNextPage = ref(false);

// Handle tag selection
const selectTag = (tag) => {
  lastQuery.value = tag;
  fetchCats(tag, 1);
};

onMounted(() => {
  if (lastQuery.value) {
    fetchCats(lastQuery.value, 1);
  }
});
</script>



