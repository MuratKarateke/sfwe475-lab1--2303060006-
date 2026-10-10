import { TaskSchema, Task } from "./schemas";

export async function fetchTodo(id: number): Promise<Task | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
    if (!response.ok) {
      console.error(`Error: Server returned status ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Strand 4: Zod ile sınır doğrulaması (Boundary validation)
    const result = TaskSchema.safeParse(data);
    if (!result.success) {
      console.error("Data validation failed:", result.error.issues);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Network or fetch error:", error);
    return null;
  }
}