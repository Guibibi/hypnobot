<template>
  <section
    class="py-24 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
  >
    <h2 class="text-4xl font-bold mb-16 text-center">What Our Users Say</h2>
    <div class="flex flex-wrap justify-center gap-12">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-filter backdrop-blur-lg max-w-sm"
      >
        <p class="italic mb-6 text-lg">"{{ testimonial.quote }}"</p>
        <div class="flex items-center">
          <img
            :src="testimonial.avatar"
            :alt="testimonial.name"
            class="w-16 h-16 rounded-full mr-4 border-2 border-white"
          />
          <div>
            <p class="font-semibold">{{ testimonial.name }}</p>
            <p class="text-sm text-indigo-200">{{ testimonial.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    quote:
      "HypnoAI has transformed my relaxation routine. The personalized sessions are incredibly effective!",
    name: "Sarah Johnson",
    title: "Yoga Instructor",
    avatar: "https://100k-faces.glitch.me/random-image",
  },
  {
    quote:
      "I was skeptical at first, but the AI-generated scripts are surprisingly insightful and helpful.",
    name: "Michael Chen",
    title: "Software Engineer",
    avatar: "https://100k-faces.glitch.me/random-image",
  },
  {
    quote:
      "The voice customization feature makes each session feel uniquely tailored to me. Highly recommend!",
    name: "Emma Rodriguez",
    title: "Wellness Coach",
    avatar: "https://100k-faces.glitch.me/random-image",
  },
];
</script>
