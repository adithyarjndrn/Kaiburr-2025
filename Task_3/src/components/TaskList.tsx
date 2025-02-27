import React from "react";
import { Table, Button, Collapse } from "antd";
import { deleteTask } from "../api";

interface TaskListProps {
  tasks: any[];
  loadTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loadTasks }) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <Table
        dataSource={tasks}
        rowKey="id"
        bordered
        className="rounded-lg overflow-hidden"
        pagination={{ pageSize: 5 }}
      >
        <Table.Column
          title="ID"
          dataIndex="id"
          key="id"
          className="text-gray-700"
        />
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          className="text-gray-900 font-medium"
        />
        <Table.Column
          title="Owner"
          dataIndex="owner"
          key="owner"
          className="text-gray-600"
        />
        <Table.Column
          title="Command"
          dataIndex="command"
          key="command"
          className="text-gray-600 font-mono"
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <Button
              onClick={() => handleDelete(record.id)}
              danger
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              Delete
            </Button>
          )}
        />
        <Table.Column
          title="Execution History"
          key="executionHistory"
          render={(_, record) => (
            <Collapse
              className="rounded-lg border border-gray-300 bg-gray-50"
              expandIconPosition="right"
            >
              {record.taskExecutions && record.taskExecutions.length > 0 ? (
                record.taskExecutions.map((execution: any, index: number) => (
                  <Collapse.Panel
                    header={`Execution #${index + 1}`}
                    key={index}
                    className="bg-white shadow-md p-3 rounded-lg"
                  >
                    <p className="text-gray-700">
                      <b>Start:</b> {execution.startTime}
                    </p>
                    <p className="text-gray-700">
                      <b>End:</b> {execution.endTime}
                    </p>
                    <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded-md">
                      <b>Output:</b> {execution.output}
                    </p>
                  </Collapse.Panel>
                ))
              ) : (
                <p className="text-gray-500 p-2">No execution history</p>
              )}
            </Collapse>
          )}
        />
      </Table>
    </div>
  );
};

export default TaskList;
           