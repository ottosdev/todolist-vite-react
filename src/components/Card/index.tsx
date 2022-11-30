import { useState } from "react";
import { Task } from "../../page/Dashboard";
import CardItem from "../CardItem";
import "./style.css";

interface CardProps {
  tasks: Task[];
  setTaskId: (id: string) => void;
}

export default function Card({ tasks, setTaskId }: CardProps) {
  const hasTasks = tasks.length <= 0;
  return (
    <div className="card-container">
      <h1>Tasks</h1>

      {hasTasks && (
        <div className="no-task">
          <h4>No tasks created</h4>
        </div>
      )}

      {tasks.map((task) => (
        <CardItem task={task} key={task.id} setTaskId={setTaskId} />
      ))}
    </div>
  );
}
