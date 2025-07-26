import { LinkedList } from "../src/LinkedList";

describe("LinkedList - Primitive Values", () => {
  it("should handle numbers", () => {
    const list = new LinkedList<number>();
    expect(list.isEmpty()).toBe(true);
    list.append(1);
    list.append(2);
    list.prepend(0);
    expect(list.toArray()).toEqual([0, 1, 2]);
    expect(list.size).toBe(3);
    expect(list.get(1)?.value).toBe(1);
    list.update(10, 1);
    expect(list.get(1)?.value).toBe(10);
    expect(list.indexOf(10)).toBe(1);
    expect(list.find((v) => v === 10)).toBe(10);
    expect(list.remove((v) => v === 10)).toBe(true);
    expect(list.toArray()).toEqual([0, 2]);
    list.insert(5, 1);
    expect(list.toArray()).toEqual([0, 5, 2]);
    expect(list.pop()?.value).toBe(2);
    expect(list.shift()?.value).toBe(0);
    expect(list.size).toBe(1);
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });
});

describe("LinkedList - Array Values", () => {
  it("should handle arrays", () => {
    const list = new LinkedList<number[]>();
    list.append([1, 2]);
    list.append([3, 4]);
    list.prepend([0]);
    expect(list.toArray()).toEqual([[0], [1, 2], [3, 4]]);
    expect(list.size).toBe(3);
    expect(list.get(2)?.value).toEqual([3, 4]);
    list.update([9, 9], 1);
    expect(list.get(1)?.value).toEqual([9, 9]);
    expect(list.indexOf((v) => v[0] === 9)).toBe(1);
    expect(list.find((v) => v.includes(4))).toEqual([3, 4]);
    expect(list.remove((v) => v[0] === 9)).toBe(true);
    expect(list.toArray()).toEqual([[0], [3, 4]]);
    list.insert([5, 5], 1);
    expect(list.toArray()).toEqual([[0], [5, 5], [3, 4]]);
    expect(list.pop()?.value).toEqual([3, 4]);
    expect(list.shift()?.value).toEqual([0]);
    expect(list.size).toBe(1);
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });
});

describe("LinkedList - Nested Object Values", () => {
  it("should handle nested objects", () => {
    type Obj = { a: number; b: { c: string } };
    const list = new LinkedList<Obj>();
    list.append({ a: 1, b: { c: "x" } });
    list.append({ a: 2, b: { c: "y" } });
    list.prepend({ a: 0, b: { c: "z" } });
    expect(list.toArray()).toEqual([
      { a: 0, b: { c: "z" } },
      { a: 1, b: { c: "x" } },
      { a: 2, b: { c: "y" } },
    ]);
    expect(list.size).toBe(3);
    expect(list.get(2)?.value).toEqual({ a: 2, b: { c: "y" } });
    list.update({ a: 9, b: { c: "w" } }, 1);
    expect(list.get(1)?.value).toEqual({ a: 9, b: { c: "w" } });
    expect(list.indexOf((v) => v.a === 9)).toBe(1);
    expect(list.find((v) => v.b.c === "y")).toEqual({ a: 2, b: { c: "y" } });
    expect(list.remove((v) => v.a === 9)).toBe(true);
    expect(list.toArray()).toEqual([
      { a: 0, b: { c: "z" } },
      { a: 2, b: { c: "y" } },
    ]);
    list.insert({ a: 5, b: { c: "v" } }, 1);
    expect(list.toArray()).toEqual([
      { a: 0, b: { c: "z" } },
      { a: 5, b: { c: "v" } },
      { a: 2, b: { c: "y" } },
    ]);
    expect(list.pop()?.value).toEqual({ a: 2, b: { c: "y" } });
    expect(list.shift()?.value).toEqual({ a: 0, b: { c: "z" } });
    expect(list.size).toBe(1);
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });

  it("should handle real-world nested objects", () => {
    type Address = { street: string; city: string; zip: string };
    type User = {
      id: number;
      name: string;
      contact: {
        email: string;
        phone: string;
        address: Address;
      };
      roles: string[];
    };
    const users = new LinkedList<User>();
    users.append({
      id: 1,
      name: "Alice",
      contact: {
        email: "alice@example.com",
        phone: "1234567890",
        address: { street: "1st Ave", city: "Wonderland", zip: "11111" },
      },
      roles: ["admin", "user"],
    });
    users.append({
      id: 2,
      name: "Bob",
      contact: {
        email: "bob@example.com",
        phone: "0987654321",
        address: { street: "2nd St", city: "Builderland", zip: "22222" },
      },
      roles: ["user"],
    });
    users.prepend({
      id: 0,
      name: "Charlie",
      contact: {
        email: "charlie@example.com",
        phone: "5555555555",
        address: { street: "3rd Blvd", city: "Chocoland", zip: "33333" },
      },
      roles: ["guest"],
    });
    expect(users.size).toBe(3);
    expect(users.isEmpty()).toBe(false);
    expect(users.peekHead()).toEqual({
      id: 0,
      name: "Charlie",
      contact: {
        email: "charlie@example.com",
        phone: "5555555555",
        address: { street: "3rd Blvd", city: "Chocoland", zip: "33333" },
      },
      roles: ["guest"],
    });
    expect(users.peekTail()).toEqual({
      id: 2,
      name: "Bob",
      contact: {
        email: "bob@example.com",
        phone: "0987654321",
        address: { street: "2nd St", city: "Builderland", zip: "22222" },
      },
      roles: ["user"],
    });
    expect(Array.from(users).map((u) => u.name)).toEqual(["Charlie", "Alice", "Bob"]);
    expect(users.get(1)?.value.name).toBe("Alice");
    expect(users.get(2)?.value.contact.address.city).toBe("Builderland");
    users.update(
      {
        id: 1,
        name: "Alicia",
        contact: {
          email: "alicia@example.com",
          phone: "1234567890",
          address: { street: "1st Ave", city: "Wonderland", zip: "11111" },
        },
        roles: ["admin", "user"],
      },
      1
    );
    expect(users.get(1)?.value.name).toBe("Alicia");
    expect(users.indexOf((u) => u.name === "Alicia")).toBe(1);
    expect(users.find((u) => u.contact.address.zip === "33333")).toEqual({
      id: 0,
      name: "Charlie",
      contact: {
        email: "charlie@example.com",
        phone: "5555555555",
        address: { street: "3rd Blvd", city: "Chocoland", zip: "33333" },
      },
      roles: ["guest"],
    });
    expect(users.remove((u) => u.id === 2)).toBe(true);
    expect(users.size).toBe(2);
    expect(users.toArray().map((u) => u.name)).toEqual(["Charlie", "Alicia"]);
    users.insert(
      {
        id: 3,
        name: "Dave",
        contact: {
          email: "dave@example.com",
          phone: "7777777777",
          address: { street: "4th Rd", city: "Daveland", zip: "44444" },
        },
        roles: ["user"],
      },
      2
    );
    expect(users.size).toBe(3);
    expect(users.get(2)?.value.name).toBe("Dave");
    expect(users.pop()?.value.name).toBe("Dave");
    expect(users.size).toBe(2);
    expect(users.shift()?.value.name).toBe("Charlie");
    expect(users.size).toBe(1);
    users.append({
      id: 4,
      name: "Eve",
      contact: {
        email: "eve@example.com",
        phone: "8888888888",
        address: { street: "5th Ave", city: "Eveland", zip: "55555" },
      },
      roles: ["admin"],
    });
    expect(users.size).toBe(2);
    expect(users.clone().toArray()).toEqual(users.toArray());
    users.reverse();
    expect(users.toArray().map((u) => u.name)).toEqual(["Eve", "Alicia"]);
    const mapped = users.map((u) => ({ ...u, name: u.name.toUpperCase() }));
    expect(mapped.toArray().map((u) => u.name)).toEqual(["EVE", "ALICIA"]);
    const filtered = users.filter((u) => u.roles.includes("admin"));
    expect(filtered.toArray().map((u) => u.name)).toEqual(["Eve", "Alicia"]);
    users.append({
      id: 5,
      name: "Frank",
      contact: {
        email: "frank@example.com",
        phone: "9999999999",
        address: { street: "6th St", city: "Frankfurt", zip: "66666" },
      },
      roles: ["user"],
    });
    expect(users.removeAll((u) => u.roles.includes("user"))).toBe(1);
    expect(users.toArray().map((u) => u.name)).toEqual(["Eve", "Alicia"]);
    expect(users.removeAt(0)).toBe(true);
    expect(users.toArray().map((u) => u.name)).toEqual(["Alicia"]);
    users.clear();
    expect(users.isEmpty()).toBe(true);
  });
});
