import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import { toast } from "react-toastify";

export interface Task {
  id: string;
  name: string;
  done: boolean;
}

export default function Dashboard() {

  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localData = window.localStorage.getItem("@tasks");

    return localData ? JSON.parse(localData) : [];
  });
  const [getTaskId, setTaskId] = useState<string>("");


  function handleAdd() {
    if (input === "") {
      toast.error("Enter a task name");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      name: input,
      done: false,
    };

    setTasks((state) => [...state, newTask]);
    toast.success("Task created");
    setInput("");
  }

  function handleFinished(id: string) {
    const isDone = tasks.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );

    setTasks(isDone);
    setInput("");
    setTaskId("");
  }

  function handleRemove(id: string) {
    const tasksFiltered = tasks.filter((item) => item.id !== id);
    setTasks(tasksFiltered);
    setInput("");
    setTaskId("");
    toast.success("Task deleted");
  }

  function handleEdit(id: string) {
    if (input === "") {
      toast.error("Enter a task name");
      return;
    }

    const task = tasks.map((task) => {
      if (task.id === id) {
        task.name = input;
      }
      return task;
    });

    setTasks(task);
    setInput("");
    setTaskId("");
    toast.success("You edit your task");
  }

  useEffect(() => {
    localStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const task = tasks.find((item) => item.id === getTaskId);
    if (task) {
      setInput(task.name);
      inputRef.current?.focus()
    }
  }, [getTaskId]);

  return (
    <>
      <div className="container">
        <input
          ref={inputRef}
          placeholder="Enter a task name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {getTaskId === "" ? (
          <div className="actions">
            <button onClick={handleAdd}>Add</button>
          </div>
        ) : (
          <div className="actions">
            <button onClick={() => handleEdit(getTaskId)}>Edit</button>
            <button onClick={() => handleRemove(getTaskId)}>Remove</button>
            <button onClick={() => handleFinished(getTaskId)}>Complete</button>
          </div>
        )}

        <Card tasks={tasks} setTaskId={setTaskId} />
      </div>
    </>
  );
}
