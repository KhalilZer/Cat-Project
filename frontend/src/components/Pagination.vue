<template>
  <div class="flex justify-center items-center mt-5 space-x-4">
    <!-- Previous Button -->
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1" 
      class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
    >
      Previous
    </button>

    <!-- Page Info -->
    <span class="text-lg font-semibold text-gray-700">
      Page {{ currentPage }}
    </span>

    <!-- Next Button -->
    <button 
      @click="nextPage" 
      :disabled="!hasNextPage" 
      class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define component props
const props = defineProps({
  currentPage: Number,
  hasNextPage: Boolean
});

// Define event emitter
const emit = defineEmits(['page-change']);

// Move to the next page if available
const nextPage = () => {
  if (props.hasNextPage) {
    emit('page-change', props.currentPage + 1);
  }
};

// Move to the previous page if not on the first page
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
};
</script>
