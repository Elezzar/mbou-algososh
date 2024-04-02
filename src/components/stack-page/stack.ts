export default class Stack<T> {
  private container: T[] = [];
  public push = (item: T) => this.container.push(item);
  public pop = (): T | undefined => this.container.pop();
  public clear = () => this.container = [];
  get elements(): T[] { return this.container; }
  get size(): number { return this.container.length; }
}