import { useEffect } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const { TextArea } = Input;

const EnterJob = ({ onJobUpdate, formInstance }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Pass the form instance back to the App component
    formInstance(form);
  }, [form, formInstance]);

  const onFinish = (values) => {
    axios
      .post("http://localhost:3000/job", values)
      .then((response) => {
        console.log(response);
        onJobUpdate(values);
      })
      .catch((error) => {
        console.error(`There was an error posting the job: ${error}`);
      });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Company"
        name="Company"
        rules={[
          {
            required: true,
            message: "You need to at least add the company name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Job Title"
        name="JobTitle"
        rules={[
          {
            required: false,
            //   message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Link to Job Posting"
        name="JobPosting"
        rules={[
          {
            required: false,
            //   message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date Applied"
        name="DateApplied"
        rules={[
          {
            required: false,
            //   message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Notes"
        name="Notes"
        rules={[
          {
            required: false,
            //   message: "Please input your password!",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EnterJob;
