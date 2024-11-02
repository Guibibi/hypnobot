import Queue from "~/server/utils/Queue";


interface Task { id: string, prompt: string }


export default defineNuxtPlugin((nuxtApp) => {
  const taskQueue = new Queue<Task>("taskQueue");

  return {
    provide: {
      queue: {
        enqueue: async (task: Task) => await taskQueue.enqueue(task),
        dequeue: async () => await taskQueue.dequeue(),
        peek: async () => await taskQueue.peek(),
        isEmpty: async () => await taskQueue.isEmpty(),
        size: async () => await taskQueue.size(),
      }
    },
  };
});
