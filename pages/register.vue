<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const isFormValid = computed(
  () =>
    email.value.trim() !== "" &&
    password.value.trim() !== "" &&
    password.value.trim() === confirmPassword.value.trim(),
);

const signUpWithPassword = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) errorMessage.value = error.message;
};
</script>
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
  >
    <div
      class="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg"
    >
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome to HypnoBot
        </h2>
        <p class="mt-2 text-sm text-gray-600">Enter your email to login</p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signUpWithPassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email or Phone Number</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />

            <div class="mt-4">
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div class="mt-4">
              <label for="confirm-password" class="sr-only"
                >Confirm Password</label
              >
              <input
                id="confirm-password"
                v-model="confirmPassword"
                name="confirm-password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>

        <div>
          <BaseButton
            :disabled="!isFormValid"
            class="mt-4"
            text="Login"
            @click="signUpWithPassword"
            >Login</BaseButton
          >
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>
