<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800 overflow-hidden"
  >
    <LandingHero />
    <LandingJourney />
    <LandingFeatures />
    <LandingReviews />

    <footer class="bg-indigo-900 text-white py-8 px-6 text-center">
      <p>&copy; 2024 HypnoAI. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});
</script>

<style>
.bg-grid-pattern {
  background-image: linear-gradient(
      to right,
      rgba(99, 102, 241, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

#mind-map {
  opacity: 0.2;
  transition: opacity 0.3s ease-in-out;
}

#mind-map:hover {
  opacity: 0.6;
}
</style>
