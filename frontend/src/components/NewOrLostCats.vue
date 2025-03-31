<template>
  <div class="mt-6 space-y-8">
    <!-- New Cats Section -->
    <div v-if="newCats.length > 0">
      <h3 class="text-xl font-semibold text-green-600">New Cats</h3>
      <div v-for="cat in newCats" :key="cat.id" class="p-4 bg-gray-100 rounded-lg shadow-md">
        <img 
          :src="`https://cataas.com/cat/${cat.id}`" 
          :alt="'Cat ' + cat.id" 
          class="w-24 h-24 rounded-md object-cover"
        />
        <p class="mt-2 text-gray-700">Tags: 
          <span 
            v-for="(tag, index) in cat.tags" 
            :key="index" 
            class="bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2">
            {{ tag }}
          </span>
        </p>
      </div>
    </div>

    <!-- Lost Cats Section -->
    <div v-if="removedCats.length > 0">
      <h3 class="text-xl font-semibold text-red-600">Lost Cats</h3>
      <div v-for="cat in removedCats" :key="cat.id" class="p-4 bg-gray-100 rounded-lg shadow-md">
        <img 
          :src="`https://cataas.com/cat/${cat.id}`" 
          :alt="'Cat ' + cat.id" 
          class="w-24 h-24 rounded-md object-cover"
        />
        <p class="mt-2 text-gray-700">Tags: 
          <span 
            v-for="(tag, index) in cat.tags" 
            :key="index" 
            class="bg-red-500 text-white px-2 py-1 rounded-full text-sm mr-2">
            {{ tag }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  newCats: {
    type: Array,
    required: true
  },
  removedCats: {
    type: Array,
    required: true
  }
});
</script>
