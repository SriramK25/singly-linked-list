# 🔗 iroh/linked-list

A powerful, flexible, and type-safe implementation of a singly linked list in TypeScript, featuring unique node identifiers, deep cloning, iterable support, and modern APIs like `map`, `filter`, and `fromArray`.

---

## 🚀 Features

- ✅ Fully type-safe with TypeScript
- 🧠 Built-in higher-order functions like `map`, `filter`, `reduce`
- 🔄 Iterable with `for...of` and spread operator support
- 🧬 Deep `clone()` of list or nodes
- 🪪 Unique ID generation using `crypto.randomUUID()`
- 🧹 Auto-cleaning with `clear()` and safe error boundaries
- 🔍 Includes helper methods: `peekHead`, `peekTail`, `isEmpty`, etc.
- 🧰 Friendly developer APIs and clear error messaging
- 🧼 Readable `prettyPrint()` and simple `toArray()`

---

## 📦 Installation

```bash
npm install @iroh/linked-list
# or
yarn add @iroh/linked-list
```

---

## 🧪 Usage

```ts
import { LinkedList } from "@iroh/linked-list";

const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);

list.map((x) => x * 2).print(); // Prints: 2 → 4 → 6
```

---

## 🧰 API Overview

### 📘 `LinkedList`

| Method                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `append(value)`        | Appends value to the end of the list                 |
| `prepend(value)`       | Prepends value to the beginning                      |
| `insert(index, value)` | Inserts value at index or appends if index invalid   |
| `removeAt(index)`      | Removes a node at the given index                    |
| `remove(callback)`     | Removes a node matching the callback                 |
| `removeAll(callback)`  | Removes all nodes matching callback                  |
| `get(index)`           | Gets the value at the given index                    |
| `update(index, value)` | Updates the node at index                            |
| `fromArray(arr)`       | Creates a linked list from an array                  |
| `toArray()`            | Converts list to array                               |
| `map(callback)`        | Returns new list with callback applied to all values |
| `filter(callback)`     | Returns new list with values matching callback       |
| `find(callback)`       | Finds first node matching callback                   |
| `indexOf(callback)`    | Returns index of node matching callback              |
| `isEmpty()`            | Returns true if list has no elements                 |
| `size()`               | Returns number of nodes in list                      |
| `shift()`              | Removes head and returns its value                   |
| `pop()`                | Removes tail and returns its value                   |
| `peekHead()`           | Returns head node or null                            |
| `peekTail()`           | Returns tail node or null                            |
| `reverse()`            | Reverses the list in place                           |
| `clone()`              | Returns deep clone of the list                       |
| `clear()`              | Empties the list completely                          |
| `[Symbol.iterator]()`  | Makes list iterable using `for..of` or spread        |
| `print()`              | Logs simple list as `1 → 2 → 3`                      |
| `prettyPrint()`        | Logs detailed list nodes with id and value           |

---

### 📘 `Node`

| Method         | Description                            |
| -------------- | -------------------------------------- |
| `clone()`      | Returns deep clone of the current node |
| `equals(node)` | Compares this node with another        |
| `isTail()`     | Checks if this node is the tail node   |

---

## 🧪 Testing

Include your own test framework (e.g. Vitest, Jest) to verify functionality.

### Example using Vitest

#### Install Vitest

```bash
npm install --save-dev vitest
```

```ts
import { LinkedList } from "@iroh/linked-list";
import { describe, it, expect } from "vitest";

describe("LinkedList", () => {
  it("appends values", () => {
    const list = new LinkedList<number>();
    list.append(1);
    list.append(2);
    expect(list.toArray()).toEqual([1, 2]);
  });
});
```

#### Run Tests

```bash
npx vitest run
```

## 📄 Type Declarations

If you're using VS Code or any IDE with TypeScript support, all methods are fully typed and include documentation for autocomplete.  
You can also refer to `LinkedList.d.ts` and `Node.d.ts` if exposed manually.

---

## 💡 Roadmap

- Add doubly linked list support
- Add `sort()` method
- Add circular linked list variant
- Add `.toJSON()` serialization
- Add browser devtools visualization tool

---

## 🧙 Author

**GG IROH**  
💼 Fullstack Developer  
🧠 DSA Enthusiast  
🧰 Focused on clean, reusable, testable code

---

## 🪪 License

**MIT © GG IROH**  
Use freely, credit respectfully. ❤️

---

## 🫱 Contributing

1. Fork the repo
2. Create a feature branch:

```bash
git checkout -b feature/my-feature
```
