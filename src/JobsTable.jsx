import { Table } from "antd";

const columns = [
  {
    title: "Company",
    dataIndex: "Company",
    key: "Company",
  },
  {
    title: "JobPosting",
    dataIndex: "JobPosting",
    key: "JobPosting",
  },
  {
    title: "DateApplied",
    dataIndex: "DateApplied",
    key: "DateApplied",
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    key: "Notes",
  },
];

const JobsTable = ({ jobs }) => {
  return <Table dataSource={jobs} columns={columns} rowKey="key" />;
};

export default JobsTable;
