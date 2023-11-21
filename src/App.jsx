import React, { useState, useEffect } from "react";
import JobsTable from "./JobsTable";
import EnterJob from "./EnterJob";
import axios from "axios";

const App = () => {
  //List of jobs
  const [jobs, setJobs] = useState([]);

  //API call to get jobs from the BE
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) =>
        console.error(`There was an error retrieving the job list: ${error}`)
      );
  }, []);

  //Modifying the list of jobs to add a key for react
  const dataSource = jobs.map((job) => ({
    ...job,
    key: job.JobID,
  }));

  //Function to Update State of jobs, this gets fired from the 'onJobUpdate'
  //that comes back from from the EnterJob.jsx
  //Im still sorta unclear on how this actually works, which fucking pisses me off.
  //TODO: Create a super basic example of this function attribute stuff.

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
  const [form, setForm] = useState(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleOk = () => {
    console.log(form);
    if (form) {
      form.submit();
      console.log(form);
    }
  };

  return (
    <div>
      <JobsTable jobs={dataSource} />
      {console.log({ dataSource })}
      <Button type="primary" onClick={showModal}>
        Add Job
      </Button>
      <Modal
        title="Add New Job"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
        onOk={handleOk}
      >
        <EnterJob onJobUpdate={addJob} formInstance={setForm} />
      </Modal>
    </div>
  );
};

export default App;
