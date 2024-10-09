class Queue<T> {
  private storage = useStorage("data");
  private queueName: string;
  private headKey: string;
  private tailKey: string;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.headKey = `${this.queueName}:head`;
    this.tailKey = `${this.queueName}:tail`;
  }

  async getHead(): Promise<number> {
    return parseInt((await this.storage.getItem(this.headKey)) || "0");
  }

  async getTail(): Promise<number> {
    return parseInt((await this.storage.getItem(this.tailKey)) || "0");
  }

  async setHead(value: number): Promise<void> {
    await this.storage.setItem(this.headKey, value);
  }

  async setTail(value: number): Promise<void> {
    await this.storage.setItem(this.tailKey, value);
  }

  // Add an element into the stack
  async enqueue(element: T) {
    const tail = await this.getTail();
    const newTail = tail + 1;
    await this.storage.setItem(
      `${this.queueName}:job:${newTail}`,
      JSON.stringify(element),
    );
    await this.setTail(newTail);
  }

  // Return the first element
  async dequeue(): Promise<any | null> {
    const tail = await this.getTail();
    const head = await this.getHead();

    if (head === tail) {
      return null; // Queue is empty
    }

    const newHead = head + 1;
    const item = await this.storage.getItem(`${this.queueName}:job:${head}`);

    if (item) {
      await this.storage.removeItem(`${this.queueName}:job:${head}`);
      await this.setHead(newHead);
      return JSON.parse(item);
    }

    return null;
  }

  // Peek at the first item
  peek(): T | undefined {
    return undefined;
  }

  // Return if the queue is empty
  isEmpty(): boolean {}

  async size(): Promise<number> {
    const tail = await this.getTail();
    const head = await this.getHead();
    return tail - head;
  }
}

interface Job {
  timestamp: number;
  prompt: string;
}

let scriptQueue: Queue<Job>;

export default defineNitroPlugin((nitroApp) => {});
