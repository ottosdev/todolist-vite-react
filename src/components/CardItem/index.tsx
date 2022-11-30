import { Task } from "../../page/Dashboard";
import "./style.css";

type CardItemProps = {
  task: Task;
  setTaskId: (id: string) => void;
};

export default function CardItem({ task, setTaskId }: CardItemProps) {
  function handleClick(task: Task) {
    setTaskId(task.id);
  }

  console.log("DONE: " + task.done);

  return (
    <div className="card-item">
      <button
        className={`button-custom ${
          task.done === true ? "dark-gray" : "light-gray"
        }`}
        onClick={() => handleClick(task)}
      ></button>
      <span className={`${task.done === true ? "completed": ''}`}>
        {task.name}
      </span>
    </div>
  );
}
