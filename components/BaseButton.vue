<script setup lang="ts">
interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <button
    :type="props.type"
    :disabled="disabled"
    class="capitalize py-2 px-4 bg-accent text-white rounded-xl font-bold text-lg"
    @click="handleClick"
  >
    {{ props.text }}
  </button>
</template>
