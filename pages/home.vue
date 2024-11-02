<script setup lang="ts">
import { z } from "zod";
import { createScriptSchema } from "~/schemas/scripts";
import type { Database } from "~/types/database.types";
const scriptInput = ref("");
const client = useSupabaseClient<Database>();

const { data: scripts } = await useAsyncData("hypnosis_scripts", async () => {
  const { data } = await client
    .from("hypnosis_scripts")
    .select("title, generation_prompt, has_paid, status");

  return data;
});

const submitScript = async () => {
  const result = createScriptSchema.safeParse(scriptInput.value);
  if (result.success) {
    const response = await fetch("/api/scripts", {
      method: "POST",
      body: result.data,
      // ...
    });
    console.log(response);
  } else {
    alert(result.error);
  }
};
</script>

<!-- TODO: Add a list to show the past scripts. Highlight the ones that were paid -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <div
      class="max-w-2xl w-full space-y-8 m-10 p-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg mt-16">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Hypnosis Scripts
      </h1>

      <form @submit.prevent="submitScript" class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Create a New Hypnosis Script
        </h2>
        <textarea v-model="scriptInput" placeholder="I want a hypnosis about..."
          class="w-full resize-y h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-transparent" />
        <BaseButton type="submit"
          class="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
          Create my script!
        </BaseButton>
      </form>
    </div>
  </div>
</template>
