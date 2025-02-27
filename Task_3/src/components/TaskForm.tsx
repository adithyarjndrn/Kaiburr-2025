import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { createTask } from "../api";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TaskForm: React.FC<Props> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleCreate = async (values: any) => {
    console.log("Submitting Task:", values);

    try {
      await createTask(values);
      message.success("Task created!");
      onSuccess();
      onClose();
    } catch (error) {
      message.error("Task creation failed.");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      title="Create New Task"
      centered
      footer={[
        <Button key="cancel" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Create Task
        </Button>,
      ]}
      className="rounded-lg shadow-xl"
    >
      <Form
        form={form}
        onFinish={handleCreate}
        layout="vertical"
        className="p-4 space-y-4"
      >
        <Form.Item
          name="id"
          label="Task ID"
          rules={[{ required: true, message: "Task ID is required" }]}
          className="font-medium"
        >
          <Input placeholder="Enter Task ID" className="p-2 rounded-lg border-gray-300" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: "Task Name is required" }]}
          className="font-medium"
        >
          <Input placeholder="Enter Task Name" className="p-2 rounded-lg border-gray-300" />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true, message: "Owner is required" }]}
          className="font-medium"
        >
          <Input placeholder="Enter Owner Name" className="p-2 rounded-lg border-gray-300" />
        </Form.Item>

        <Form.Item
          name="command"
          label="Command"
          rules={[{ required: true, message: "Command is required" }]}
          className="font-medium"
        >
          <Input placeholder="Enter Shell Command" className="p-2 rounded-lg border-gray-300" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
