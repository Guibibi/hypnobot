<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const signOut = async () => {
  supabase.auth.signOut();
  await navigateTo("/");
};
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-50">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <NuxtLink class="flex flex-nowrap" to="/">
            <svg
              class="w-8 h-8 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
            <span
              class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              HypnoBot
            </span>
          </NuxtLink>
        </div>

        <!-- CTA Buttons -->
        <div class="flex items-center space-x-4">
          <div v-if="user" class="flex">
            <NuxtLink to="/home"><BaseButton>Dashboard</BaseButton></NuxtLink>
            <BaseButton class="ml-4" @click="signOut">Logout</BaseButton>
          </div>
          <div v-else>
            <NuxtLink
              to="/login"
              class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
