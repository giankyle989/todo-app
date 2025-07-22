"use client";

import { useEffect, useState } from "react";
import { useTodoStore } from "@/app/store/todoStore";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TodoList() {
  const { todos, loadTodos, deleteTodo, editTodo } = useTodoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const startEdit = (id: string, value: string) => {
    setEditingId(id);
    setEditedValue(value);
  };

  const saveEdit = async () => {
    if (!editingId || !editedValue.trim()) return;
    await editTodo(editingId, editedValue.trim());
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedValue("");
  };

  return (
    <div className="p-4">
      <Table>
        <TableBody>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <TableRow key={todo.id}>
                <TableCell className="text-white w-full">
                  {editingId === todo.id ? (
                    <Input
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="bg-white text-black"
                      autoFocus
                    />
                  ) : (
                    <span>{`${index + 1}. ${todo.todo}`}</span>
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {editingId === todo.id ? (
                    <>
                      <Button
                        onClick={saveEdit}
                        size="sm"
                        className="bg-green-500 hover:bg-green-400 text-white"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEdit}
                        size="sm"
                        className="bg-gray-500 hover:bg-gray-400 text-white"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEdit(todo.id, todo.todo)}
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-400 text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteTodo(todo.id)}
                        size="sm"
                        className="bg-red-500 hover:bg-red-400 text-white"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-white text-center">
                No todos available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
