import React, { useState, useEffect } from "react";
import JobsTable from "./JobsTable";
import EnterJob from "./EnterJob";
import { Modal, Button } from "antd";

import axios from "axios";

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) =>
        console.error(`There was an error retrieving the job list: ${error}`)
      );
  }, []);

  const dataSource = jobs.map((job) => ({
    ...job,
    key: job.JobID,
  }));

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div>
      <JobsTable jobs={dataSource} />

      <Button type="primary" onClick={showModal}>
        Add Job
      </Button>
      <Modal
        title="Add New Job"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
        okButtonProps={{}}
      >
        <EnterJob onJobUpdate={addJob} />
      </Modal>
    </div>
  );
};

export default App;
