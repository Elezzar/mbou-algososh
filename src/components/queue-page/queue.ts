export default class Queue<T> {
  private container: (T)[] = [];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;
  private maxSize: number = 4;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.container = new Array(this.maxSize).fill(undefined);
  }
  
  getElements = () => {
    return this.container;
  };

  enqueue = (i: T) => {
    if (this.length >= this.maxSize) {
      throw new Error("Maximum length error");
    }
    this.container[this.tail % this.maxSize] = i;
    this.tail++;
    this.length++;
    console.log("+", this.length, this.head, this.tail, this.container);
  };

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const deletedItem = this.container[this.head % this.maxSize];
    delete this.container[this.head % this.maxSize];
    this.head++;
    this.length--;
    if (this.head >= this.maxSize){ 
      this.clear();
    }
    console.log("-", this.length, this.head, this.tail, this.container);
    return deletedItem;
  }

  clear(): void {
    this.container = new Array(this.maxSize).fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  elements = (): (T | undefined)[] => {
    return this.container.slice();
  }

  getLength = () => { return this.length; }

  getHead(): number {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.head;
  }

  getTail(): number {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.tail;
  }
}