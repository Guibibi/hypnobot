<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const isFormValid = computed(
  () => email.value.trim() !== "" && password.value.trim() !== "",
);

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
  alert("An email to login was sent");
};

const signInWithPassword = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) errorMessage.value = error.message;
  await navigateTo("/home");
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
      <form class="mt-8 space-y-6" @submit.prevent="signInWithOtp">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-phone" class="sr-only"
              >Email or Phone Number</label
            >
            <input
              id="email-phone"
              v-model="email"
              name="email-phone"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email or Phone Number"
            />

            <div class="mt-4">
              <label for="email-phone" class="sr-only">Password</label>
              <input
                id="email-phone"
                v-model="password"
                name="passwprd"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Send Login Code
          </button>
          <BaseButton
            :disabled="!isFormValid"
            class="mt-4"
            text="Login"
            @click="signInWithPassword"
            >Login</BaseButton
          >
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>
