import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { searchTasks } from "../api";

interface Props {
  setTasks: (tasks: any[]) => void;
}

const TaskSearch: React.FC<Props> = ({ setTasks }) => {
  const [name, setName] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await searchTasks(name);
      setTasks(data);
    } catch (error) {
      message.error("Search failed.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <br></br>
      
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by name"
        className="w-full md:w-72 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <br></br>
      <br></br>
      <Button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
      >
        Search
      </Button>
      <br></br>
      <br></br>
      
    </div>
    
  );
};

export default TaskSearch;
