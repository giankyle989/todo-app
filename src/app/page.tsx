import TodoForms from "@/components/TodoForms";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="h-screen bg-neutral-800 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold text-white">TODO List</h1>
      <TodoForms />
      <TodoList/>
    </div>
  );
}
