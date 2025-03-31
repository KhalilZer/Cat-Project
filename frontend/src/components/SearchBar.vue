<template>
  <div class="flex flex-col items-center p-6 rounded-lg max-w-md mx-auto">
    <!-- Title with "Check Stats" button -->
    <div class="flex items-center gap-4 mb-4">
      <h2 class="text-2xl font-bold text-gray-700">Search for a cat</h2>
      <button 
        @click="goToStats" 
        class="text-blue-500 hover:underline text-lg"
      >
        or Check the Stats
      </button>
    </div>

    <!-- Search Input -->
    <input
      v-model="searchQuery"
      @input="fetchSuggestions"
      placeholder="Search for a cat..."
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <!-- Suggestions List -->
    <ul v-if="suggestions.length" class="w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md">
      <li 
        v-for="tag in suggestions" 
        :key="tag" 
        @click="selectTag(tag)"
        class="p-2 cursor-pointer hover:bg-gray-200 transition"
      >
        {{ tag }}
      </li>
    </ul>

    <!-- Selected Tags -->
    <div v-if="selectedTags.length" class="flex flex-wrap gap-2 mt-4">
      <span v-for="(tag, index) in selectedTags" :key="index" class="flex items-center bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
        {{ tag }}
        <button @click="removeTag(index)" class="ml-2 text-red-600 hover:text-red-800">✖</button>
      </span>
    </div>

    <!-- Search Button -->
    <button @click="searchCats" class="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
      Search
    </button>
    
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Props for initial query
const props = defineProps<{ query?: string }>();
const emit = defineEmits(['search']);
const router = useRouter(); // Vue Router instance

const searchQuery = ref(props.query || '');
const suggestions = ref<string[]>([]);
const selectedTags = ref<string[]>([]);

// Watch for query changes and update search input
watch(() => props.query, (newQuery) => {
  if (newQuery !== searchQuery.value) {
    searchQuery.value = newQuery;
  }
});

// Fetch suggestions from API based on user input
const fetchSuggestions = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (searchQuery.value.length < 2) {
    suggestions.value = []; 
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/cats/match?string=${searchQuery.value}`);
    suggestions.value = response.data.matchingTags;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};

// Add a tag to the selected list
const selectTag = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
  }
  searchQuery.value = '';
  suggestions.value = [];
};

// Remove a tag from the selected list
const removeTag = (index: number) => {
  selectedTags.value.splice(index, 1);
};

// Trigger search with selected tags or input query
const searchCats = () => {
  const query = selectedTags.value.length ? selectedTags.value.join(',') : searchQuery.value;
  emit('search', query);
  searchQuery.value = '';
  suggestions.value = [];
};

// Redirect to the Stats page
const goToStats = () => {
  router.push('/stats');
};
</script>
