import { Node } from "./Node";

export class LinkedList<Type> {
  //#region Static Methods
  /**
   * Converts an array into a LinkedList.
   * Clears any existing nodes.
   * @param {Type[]} values - An array of values to populate the list.
   * @returns {LinkedList<Type>} The LinkedList instance (for chaining).
   */
  static fromArray<Type>(array: Type[]): LinkedList<Type> {
    if (!Array.isArray(array))
      throw new Error(`Type Mismatch: Expected an Array as target, but received: ${typeof array}`);

    const linkedList = new LinkedList<Type>();
    array?.forEach((item) => linkedList.append(item));
    return linkedList;
  }
  //#endregion

  //#region Private Fields
  private _head: Node<Type> | null = null;
  private _tail: Node<Type> | null = null;
  private _size: number = 0;
  //#endregion

  //#region Constructor
  /**
   * Creates a new empty LinkedList instance.
   */
  constructor() {}
  //#endregion

  //#region Public Getters
  /**
   * Returns the number of nodes in the LinkedList.
   * @returns {number} The current size of the list.
   */
  public get size(): number {
    return this._size;
  }
  //#endregion

  //#region Public Methods
  /**
   * Appends a new node with the given value to the end of the LinkedList.
   * @param value data to append.
   */
  append(value: Type): void {
    const node = this._createNode(value);

    this._size++;

    if (!this._head) this._head = node;
    if (!this._tail) {
      this._tail = node;
      return;
    }

    this._tail.next = node;
    this._tail = this._tail.next;
  }

  /**
   * Inserts a new node at the beginning of the LinkedList.
   * @param {Type} value - The value to be added at the head.
   */
  prepend(value: Type) {
    const node = this._createNode(value);
    node.next = this._head;
    this._head = node;
    this._size++;
  }

  /**
   * Inserts a new node at the specified index.
   * If index is -1 or greater than the current size, appends to the end.
   * @param index Position to insert at.
   * @param value Value to be inserted.
   */
  insert(value: Type, index: number = -1) {
    if (index === -1 || index >= this._size) {
      this.append(value);
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index < 0) return;

    const node = this._createNode(value);
    let previousNode: Node<Type> | null = this._head;
    let currentNode: Node<Type> | null = this._head?.next || null;

    for (let position = 1; position <= index; position++) {
      if (position === index) {
        node.next = currentNode;
        if (previousNode) previousNode.next = node;
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode?.next || null;
    }

    this._size++;
  }

  /**
   * Retrieves the node value at the specified index.
   * @param {number} index - The index to retrieve the value from.
   * @returns {Type | null} The value if found, otherwise null.
   * @throws {Error} If index is out of bounds.
   */
  get(index: number = -1): Node<Type> | null {
    if (index < 0 || index >= this._size)
      throw new Error(
        `Index out of bounds exception (Hint: Valid Indices are 0 to ${this._size - 1}, but received ${index})`
      );

    if (index === 0) return this._head;

    let currentNode = this._head;
    let position = 0;

    while (currentNode) {
      if (position === index) break;
      currentNode = currentNode.next;
      position++;
    }

    return currentNode;
  }

  /**
   * Updates the node's value at a given index.
   * @param {number} index - The index of the node to update.
   * @param {Type} target - The new value to assign.
   * @returns {boolean} True if the update was successful.
   * @throws {Error} If index is out of bounds.
   */
  update(target: Type | ((value: Type) => void), index: number = -1) {
    if (!this._size) throw new Error("Exception: Cannot perform update operation in empty LinkedList");

    if (index < 0 || index >= this._size)
      throw new Error(
        `Index out of bounds exception (Hint: Valid indices are 0 to ${this._size - 1}, but received ${index})`
      );

    let currentNode = this._head;
    let position = 0;

    while (currentNode) {
      if (position !== index) {
        position++;
        currentNode = currentNode.next;
        continue;
      }

      typeof target === "function"
        ? (target as (value: Type) => void)(currentNode.value)
        : (currentNode.value = target);

      break;
    }
  }

  /**
   * Removes and returns the first node of the LinkedList.
   * Returns null if the list is empty.
   */
  shift(): Node<Type> | null {
    let headNode = this._head;
    this._head = this._head?.next || null;
    if (this._size) this._size--;
    if (!this._head) this._tail = null;
    return headNode;
  }

  /**
   * Removes and returns the last node in the LinkedList.
   * Returns null if the list is empty.
   */
  pop(): Node<Type> | null {
    let previousNode: Node<Type> | null = null;
    let currentNode: Node<Type> | null = this._head;

    if (!currentNode) {
      this.clear();
      return null;
    }

    if (!currentNode.next) {
      this.clear();
      return currentNode;
    }

    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    if (previousNode) previousNode.next = null;
    this._tail = previousNode;
    if (this._size) this._size--;

    return currentNode;
  }

  /**
   * Clears the entire LinkedList.
   * Resets head, tail, and size to initial state.
   */
  clear() {
    this._head = this._tail = null;
    this._size = 0;
  }

  /**
   * Returns the index of the first occurrence of the specified value.
   * Returns -1 if the value is not found.
   * @param value Value to search for.
   */
  indexOf(value: Type): number;
  indexOf(predicate: (value: Type, index: number) => boolean): number;
  indexOf(target: Type | ((value: Type, index: number) => boolean)): number {
    let index = 0;
    let isMatch = false;

    this._iterateUntil((node: Type) => {
      isMatch =
        typeof target === "function"
          ? (target as (value: Type, index: number) => boolean)(node, index)
          : node === target;

      if (!isMatch) index++;
      return isMatch;
    });

    if (isMatch) return index;
    return -1;
  }

  /**
   * Creates a deep clone of the LinkedList.
   * Returns a new LinkedList instance with copied nodes and values.
   */
  clone(): LinkedList<Type> {
    const clone = new LinkedList<Type>();
    this._iterateToEnd((value: Type) => clone.append(structuredClone(value)));
    return clone;
  }

  /**
   * Reverses the LinkedList in-place.
   * Modifies the list such that the order of nodes is reversed.
   */
  reverse() {
    let currentNode: Node<Type> | null = this._head;

    if (!currentNode) return null;

    let previousNode: Node<Type> | null = null;
    let nextNode: Node<Type> | null = null;

    this._tail = this._head;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this._head = previousNode;
  }

  /**
   * Transforms each element in the LinkedList using the provided callback function.
   * Returns a new LinkedList of the same size with transformed values.
   * @param predicate Function that takes value and index, and returns a new value.
   */
  map(predicate: (data: Type, index: number) => Type): LinkedList<Type> {
    const linkedList: LinkedList<Type> = new LinkedList<Type>();
    this._iterateToEnd((data: Type, index: number) => linkedList.append(predicate(data, index)));
    return linkedList;
  }

  /**
   * Filters the LinkedList based on the provided predicate function.
   * Returns a new LinkedList containing only the values that satisfy the condition.
   * @param predicate Function that takes value and index, and returns a boolean.
   */
  filter(predicate: (data: Type, index: number) => boolean): LinkedList<Type> {
    const linkedList: LinkedList<Type> = new LinkedList<Type>();
    this._iterateToEnd((data: Type, index: number) => predicate(data, index) && linkedList.append(data));
    return linkedList;
  }

  /**
   * Finds the first node that satisfies the provided predicate function.
   * Returns the matched Node instance or null if no match is found.
   * @param predicate Function that takes value and index, and returns a boolean.
   */
  find(predicate: (data: Type, index: number) => boolean): Type | null {
    let match: Type | null = null;

    this._iterateUntil((data: Type, index: number) => {
      let isMatch = predicate(data, index);

      if (isMatch) {
        match = data;
        return true;
      }

      return false;
    });

    return match;
  }

  /**
   * Removes the first node that satisfies the provided predicate function.
   * @param predicate Function that takes value and index, and returns a boolean.
   */
  remove(predicate: (data: Type, index: number) => boolean): boolean {
    let previousNode = null;
    let currentNode = this._head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index++)) {
        if (previousNode) {
          previousNode.next = currentNode.next;
          if (!currentNode.next) this._tail = previousNode;
        } else {
          this._head = currentNode.next;
          if (!this._head) this._tail = null;
        }
        this._size--;
        return true;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return false;
  }

  /**
   * Removes all nodes that match the provided predicate.
   * @param {(data: Type, index: number) => boolean} predicate - Function to determine nodes to remove.
   * @returns {number} The number of nodes removed.
   */
  removeAll(predicate: (data: Type, index: number) => boolean): number {
    let previousNode: Node<Type> | null = null;
    let currentNode: Node<Type> | null = this._head;
    let index = 0;
    let removalCount = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index++)) {
        if (previousNode) previousNode.next = currentNode.next;
        else {
          this._head = currentNode.next;
          currentNode = this._head;
        }

        this._size--;
        removalCount++;
        continue;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return removalCount;
  }

  /**
   * Removes the node at the specified index.
   * Returns true if removal was successful.
   * @param indexToRemove Index of the node to remove.
   * @throws Error if index is out of bounds.
   */
  removeAt(indexToRemove: number): boolean {
    if (indexToRemove < 0 || indexToRemove >= this._size)
      throw new Error(
        `Index out of bounds exception (Hint: Valid Indices are 0 to ${
          this._size - 1
        }, but received ${indexToRemove}`
      );

    if (!indexToRemove && this._head) {
      this.shift();
      return true;
    }

    return this.remove((_, index) => indexToRemove === index);
  }
  //#endregion

  //#region Private Methods
  /**
   * Creates and returns a new Node with the specified value.
   * @param value Value to wrap inside a Node.
   * @private
   */
  private _createNode(value: Type): Node<Type> {
    return new Node<Type>(value);
  }

  /**
   * Iterates through the entire LinkedList and invokes the callback for each node.
   * @param callback Function called with value and index of each node.
   * @private
   */
  private _iterateToEnd(predicate: (value: Type, index: number) => void) {
    let currentNode: Node<Type> | null = this._head;
    let index = 0;
    while (currentNode) {
      predicate(currentNode.value, index++);
      currentNode = currentNode.next;
    }
  }

  /**
   * Iterates through the LinkedList until the callback returns true.
   * Stops iteration as soon as the condition is met.
   * @param callback Function called with value and index; return true to stop iteration.
   * @private
   */
  private _iterateUntil(predicate: (value: Type, index: number) => boolean) {
    let currentNode: Node<Type> | null = this._head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index)) break;
      currentNode = currentNode.next;
    }
  }
  //#endregion

  //#region Utilities
  /**
   * Returns true if the LinkedList has no nodes.
   */
  isEmpty() {
    return !this._head && !this._tail && !this.size;
  }

  /**
   * Logs a formatted string representation of the LinkedList.
   * Example format: [value1] -> [value2] -> [value3] -> null
   */
  prettyPrint() {
    this._iterateToEnd((value: Type) => {
      console.log();
      console.log(`Node: { next: Node, value: ${value} }`);
    });
  }

  /**
   * Logs each node's value in a single line using console.log.
   * Mainly for debugging or quick inspection.
   */
  print() {
    let outputString = "";

    this._iterateToEnd((value: Type) => {
      outputString += `${JSON.stringify(value)} -> `;
    });

    console.log(`${outputString} null`);
  }

  /**
   * Converts the LinkedList into a standard array.
   * Returns an array of node values in order.
   */
  toArray(): Array<Type> {
    let result: Array<Type> = [];
    this._iterateToEnd((value: Type) => result.push(value));
    return result;
  }

  /**
   * Returns the value at the head of the LinkedList without removing it.
   * @returns {Type | null} The head value, or null if the list is empty.
   */
  peekHead(): Type | null {
    return this._head?.value || null;
  }

  /**
   * Returns the value at the tail of the LinkedList without removing it.
   * @returns {Type | null} The tail value, or null if the list is empty.
   */
  peekTail(): Type | null {
    return this._tail?.value || null;
  }
  //#endregion

  //#region Iterator
  /**
   * Enables iteration over the LinkedList using `for...of` loops.
   * @returns {Iterator<Type>} An iterator over the list values.
   */
  *[Symbol.iterator](): Iterator<Type> {
    let currentNode = this._head;

    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }
  //#endregion
}
