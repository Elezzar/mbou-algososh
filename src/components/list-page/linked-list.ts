class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;

  constructor(initialValues: T[] = []) {
    this.head = null;
    this.tail = null;

    for (const value of initialValues) {
      this.append(value);
    }
  }

  getLength(): number {
    let length = 0;
    let current = this.head;

    while (current) {
      length++;
      current = current.next;
    }

    return length;
  }

  prepend(value: T): void {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
  }

  append(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  deleteHead(): Node<T> | null {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }

  deleteTail(): Node<T> | null {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deletedTail;
  }

  getFirstNode(): Node<T> | null {
    return this.head;
  }

  getLastNode(): Node<T> | null {
    return this.tail;
  }

  getNodeByIndex(index: number): Node<T> | null {
    if (index < 0 || index >= this.getLength()) {
      return null;
    }

    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < index) {
      current = current.next;
      currentIndex++;
    }

    return current;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  addByIndex(value: T, index: number): void {
    if (index < 0 || index > this.getLength()) {
      throw new Error("Invalid index");
    }

    const newNode = new Node(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;

      if (!this.tail) {
        this.tail = newNode;
      }
    } else {
      const prev = this.getNodeByIndex(index - 1);
      newNode.next = prev!.next;
      prev!.next = newNode;

      if (!newNode.next) {
        this.tail = newNode;
      }
    }
  }

  deleteByIndex(index: number): void {
    if (index < 0 || index >= this.getLength()) {
      throw new Error("Invalid index");
    }

    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }
    } else {
      const prev = this.getNodeByIndex(index - 1);
      const current = prev!.next;

      if (prev) {
        prev.next = current!.next;
      }

      if (!current!.next) {
        this.tail = prev;
      }
    }
  }
}