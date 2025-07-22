// src/store/todoStore.ts
import { create } from "zustand";
import { toast } from "sonner";

interface Todo {
  id: string;
  todo: string;
}

interface TodoStore {
  todos: Todo[];
  loadTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  editTodo: (id: string, newText: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  loadTodos: async () => {
    try {
      const res = await fetch("/api/todo");
      const data: Todo[] = await res.json();
      set({ todos: data });
    } catch (err) {
      toast.error("Failed to load todos");
      console.error(err);
    }
  },

  addTodo: async (text) => {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({ todo: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to save");

      const newTodo: Todo = await res.json();
      set((state) => ({ todos: [...state.todos, newTodo] }));
      toast.success("Todo added");
    } catch (err) {
      toast.error("Failed to add todo");
      console.error(err);
    }
  },

  editTodo: async (id, newText) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ todo: newText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to edit");

      const updated: Todo = await res.json();
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updated : t)),
      }));
      toast.success("Todo updated");
    } catch (err) {
      toast.error("Failed to update todo");
      console.error(err);
    }
  },

  deleteTodo: async (id) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
      toast.success("Todo deleted");
    } catch (err) {
      toast.error("Failed to delete todo");
      console.error(err);
    }
  },
}));
