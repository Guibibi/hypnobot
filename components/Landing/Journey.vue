<template>
  <section class="py-24 px-4 bg-gray-900 text-white overflow-hidden relative">
    <h2 class="text-4xl font-bold mb-16 text-center">
      Journey Through Your Mind
    </h2>
    <div class="max-w-6xl mx-auto relative" style="height: 600px">
      <div id="mind-map" class="absolute inset-0 z-0"></div>
      <div
        class="relative z-10 flex flex-wrap items-center justify-center h-full"
      >
        <div
          v-for="(step, index) in howItWorks"
          :key="step.title"
          class="w-64 m-4 transition-all duration-500 ease-in-out hover:scale-105"
          :style="getPositionStyle(index)"
        >
          <div
            @mouseover="highlightStep(index)"
            @mouseout="resetHighlight"
            class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            :class="{ 'ring-4 ring-purple-500': highlightedStep === index }"
          >
            <h3 class="text-xl font-semibold mb-2 text-purple-300">
              {{ step.title }}
            </h3>
            <p class="text-sm text-gray-300">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as d3 from "d3";

const howItWorks = [
  {
    title: "Choose Your Focus",
    description: "Select your desired area of improvement or relaxation.",
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes your needs and preferences.",
  },
  {
    title: "Script Generation",
    description: "Unique hypnosis scripts are created just for you.",
  },
  {
    title: "Voice Customization",
    description: "Select or upload a voice that resonates with you.",
  },
  {
    title: "Immersive Experience",
    description: "Begin your personalized hypnosis journey.",
  },
];

const highlightedStep = ref(null);

const getPositionStyle = (index: number) => {
  const positions = [
    { top: "10%", left: "10%" },
    { top: "10%", right: "10%" },
    { top: "50%", left: "5%" },
    { bottom: "10%", left: "20%" },
    { bottom: "15%", right: "15%" },
  ];
  return positions[index % positions.length];
};

const highlightStep = (index) => {
  highlightedStep.value = index;
};

const resetHighlight = () => {
  highlightedStep.value = null;
};

onMounted(() => {
  const width = 800;
  const height = 600;
  const nodes = howItWorks.map((step, i) => ({
    id: i,
    radius: 5 + Math.random() * 15,
  }));
  const links = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.5) {
        links.push({ source: nodes[i], target: nodes[j] });
      }
    }
  }

  const svg = d3
    .select("#mind-map")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).distance(100))
    .force("charge", d3.forceManyBody().strength(-50))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#4b5563")
    .attr("stroke-opacity", 0.6);

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => d.radius)
    .attr("fill", "#9f7aea");

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });
});
</script>

<style scoped>
#mind-map {
  opacity: 0.2;
  transition: opacity 0.3s ease-in-out;
}

#mind-map:hover {
  opacity: 0.6;
}
</style>
