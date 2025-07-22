"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTodoStore } from "@/app/store/todoStore";

export default function TodoForms() {
  const [todo, setTodo] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const loadTodos = useTodoStore((state) => state.loadTodos);

  useEffect(() => {
    loadTodos();
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo(todo);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 m-2">
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="bg-white"
      />
      <Button
        type="submit"
        onClick={() => {
          if (todo.trim()) {
            addTodo(todo.trim());
            setTodo("");
          }
        }}
        className="bg-sky-400 hover:bg-sky-300 hover:text-white"
      >
        Create
      </Button>
    </form>
  );
}
