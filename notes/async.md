# Async and Validation Notes

**1. While `await fetch(...)` is waiting for a response, what is the rest of your program allowed to do?**
While waiting for the network response, the current function pauses, but the rest of the Node.js program (via the event loop) is free to continue running other code, handling other events, or processing other requests.

**2. Why did TypeScript stay silent, and at what point did the mismatch actually become visible?**
TypeScript is a compile-time tool; it strictly analyzes the code before it runs and blindly trusted our `Promise<Task>` claim. The mismatch only became visible at runtime when the code executed, reached out to the external API, and returned an object with a `completed` field instead of `done`.

**3. Error.issues explanation for failing cases:**
For the `missingField` candidate, Zod reports a "Required" error because the object is missing the mandatory `title` property. For the `wrongType` candidate, Zod reports "Expected boolean, received string" because the `done` field was provided as the string `"yes"` instead of a true/false value.

**4. Why is `unknown` the honest type for unvalidated data, and why not use `Task`?**
The `unknown` type is honest because data arriving from an external source (like a client request) genuinely has an unknown structure until verified. If we labeled the payload as `Task` immediately, we would be lying to the compiler (repeating the Strand 2 mistake) and bypassing TypeScript's safety net before validation even happens.