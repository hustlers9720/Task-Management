import React, { useState, useEffect } from "react";
import Card from "./compoents/ui/card";
import Checkbox from "./compoents/ui/checkbox";
import Input from "./compoents/ui/input";
import Button from "./compoents/ui/button";
import CardContent from "./compoents/ui/cardContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const backendurl = "http://localhost:5000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${backendurl}/task/get`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await fetch(`${backendurl}/task/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTask,
        description: newDescription.trim() ? newDescription : "",
      }),
    });

    if (res.ok) {
      setNewTask("");
      setNewDescription("");
      fetchTasks();
      toast.success("Task Added Successfully");
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${backendurl}/task/delete/${id}`, { method: "DELETE" });
    fetchTasks();
    toast.error("Task Deleted");
  };

  const editTask = async (id) => {
    if (!editTitle.trim()) return;

    await fetch(`${backendurl}/task/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription.trim() ? editDescription : "",
      }),
    });

    setEditing(null);
    fetchTasks();
    toast.info("Task Updated Successfully");
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`${backendurl}/task/edit-completed/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 p-8 font-[Times New Roman] text-white">
      <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg">Your Task Manager</h1>

      <div className="max-w-xl mx-auto text-black bg-white p-6 shadow-lg rounded-xl mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task Title..."
          className="mb-5 border-gray-300"
        />
        <Input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Task Description (Optional)..."
          className="mb-4 mt-3 border-gray-300"
        />
        <Button className="w-full mt-5 bg-purple-600 hover:bg-purple-700 transition duration-300" onClick={addTask}>
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {tasks.map((task) => (
          <Card key={task._id} className="p-5 bg-white text-black shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
            <CardContent>
              <Checkbox checked={task.completed} onChange={() => toggleComplete(task._id, task.completed)} />
              <div className="flex-1">
                {editing === task._id ? (
                  <>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Edit title..." />
                    <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Edit description (optional)" />
                  </>
                ) : (
                  <>
                    <span className={`block text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</span>
                    {task.description && <p className="text-gray-600 text-sm">{task.description}</p>}
                  </>
                )}
              </div>
            </CardContent>
            <div className="flex justify-between mt-2">
              {editing === task._id ? (
                <Button size="sm" className="bg-green-500 hover:bg-green-600 transition" onClick={() => editTask(task._id)}>Save</Button>
              ) : (
                <>
                  <Button size="sm" variant="outline" className="hover:bg-gray-200 transition" onClick={() => { setEditing(task._id); setEditTitle(task.title); setEditDescription(task.description || ""); }}>
                    Edit
                  </Button>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 transition" onClick={() => deleteTask(task._id)}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add ToastContainer here */}
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </div>
  );
};

export default App;
