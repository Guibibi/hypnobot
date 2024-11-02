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
  async dequeue(): Promise<T | undefined> {
    const tail = await this.getTail();
    const head = await this.getHead();

    if (head === tail) {
      return undefined; // Queue is empty
    }

    const newHead = head + 1;
    const item = await this.storage.getItem(`${this.queueName}:job:${head}`);

    if (item !== null && typeof item === "string") {
      await this.storage.removeItem(`${this.queueName}:job:${head}`);
      await this.setHead(newHead);
      return JSON.parse(item) as T;
    }

    return undefined;
  }

  // Peek at the first item
  async peek(): Promise<T | undefined> {
    const head = this.getHead();
    const tail = this.getTail();

    if (head === tail) {
      return undefined;
    }

    const item = this.storage.getItem(`${this.queueName}:job:${head}`);
    return item !== null && typeof item === "string" ? JSON.parse(item) : undefined;
  }

  // Return if the queue is empty
  async isEmpty(): Promise<boolean> {
    return await this.size() === 0;
  }

  async size(): Promise<number> {
    const tail = await this.getTail();
    const head = await this.getHead();
    return tail - head;
  }
}

export default Queue;
