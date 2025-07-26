/**
 * Represents a node in a singly linked list.
 * Each node contains a value, a unique identifier, and a reference to the next node.
 *
 * @typeParam Type - The type of the value held in the node.
 */
export class Node<Type> {
  //#region Public Fields
  /**
   * A globally unique identifier for the node, generated using `crypto.randomUUID()`.
   */
  readonly id: string;

  /**
   * The data value stored in the node.
   */
  value: Type;

  /**
   * A reference to the next node in the linked list, or `null` if this is the tail node.
   */
  next: Node<Type> | null = null;
  //#endregion

  //#region Constructor
  /**
   * Creates a new node instance with the specified value.
   * Automatically assigns a unique ID and sets `next` to `null`.
   *
   * @param value - The data to store in the node.
   */
  constructor(value: Type) {
    this.id = this._generateId();
    this.value = value;
  }
  //#endregion

  //#region Public Methods
  /**
   * Creates a deep copy of the current node, including its value.
   *
   * @returns A new `Node` instance with a cloned value.
   */
  clone(): Node<Type> {
    return new Node(structuredClone(this.value));
  }

  /**
   * Compares the current node to another node for deep equality.
   * Returns `true` if all fields match, including value and structure.
   *
   * @param targetNode - The node to compare with.
   * @returns `true` if the nodes are deeply equal, `false` otherwise.
   */
  equals(targetNode: Node<Type> | null = null): boolean {
    if (!targetNode) return false;
    return JSON.stringify(this) === JSON.stringify(targetNode);
  }
  //#endregion

  //#region Private Methods
  /**
   * Generates a unique identifier using `crypto.randomUUID()`.
   *
   * @returns A UUID string to uniquely identify the node.
   * @internal
   */
  private _generateId(): string {
    return crypto.randomUUID();
  }
  //#endregion

  //#region Utilities
  /**
   * Checks if this node is the last node in the list (tail).
   *
   * @returns `true` if `next` is `null`, otherwise `false`.
   */
  isTail(): boolean {
    return !this.next;
  }
  //#endregion
}
