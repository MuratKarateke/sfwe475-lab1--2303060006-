import { fetchTodo } from "./api";
import { createTask } from "./createTask";

async function main() {
  console.log("--- Fetching Todo ---");
  const todo = await fetchTodo(1);
  if (todo) {
    console.log("Fetched Task:", todo);
  }

  console.log("\n--- Creating Tasks (Validation Test) ---");
  const valid = { id: 1, title: "Read", done: false };
  const missingField = { id: 2, done: true };
  const wrongType = { id: 3, title: "Write", done: "yes" };

  for (const candidate of [valid, missingField, wrongType]) {
    const result = createTask(candidate);
    if (result.ok) {
      console.log("Success! Created task:", result.task.title);
    } else {
      console.log("Failed to create task. Errors:", result.error.fieldErrors);
    }
  }
}

main();