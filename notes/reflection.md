# Self-Check Reflection

**1. Why does await only pause the function it's inside, not the whole program?**
JavaScript runs on a single-threaded event loop. If `await` paused the entire program, the entire server would freeze for all users during a network request. Pausing just the local function allows the runtime to switch to other operations in the background.

**2. You gave fetchTodo a return type of Task in Strand 2 and TypeScript didn't complain. Why not?**
TypeScript checks types only at compile time and cannot inspect external network data. It assumes the developer's type annotations are truthful, so it accepted the `Promise<Task>` label without knowing the real API returns a different shape.

**3. What's the difference between schema.parse() and schema.safeParse(), and why did createTask use the second one?**
`schema.parse()` throws a fatal runtime exception if validation fails, which crashes the program if not caught in a try/catch block. `schema.safeParse()` returns a result object containing a `success` boolean instead of throwing, allowing `createTask` to handle errors gracefully and safely return the flattened issues.