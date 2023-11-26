import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import DisplayJobs from "./components/DisplayJobs";
import "./App.css";
/*
TODO:

- refactor out the API calls


*/
const App = () => {
  //Variable that holds the jobs and maintains the latest state of the list
  const [jobs, setJobs] = useState([]);

  //Adds job to state management clent side, but the adding of a job to the DB happens in
  //JobForm.jsx, prolly want to move that at some point
  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const editJob = (job) => {
    console.log(job);
    const jobId = job.job_id;
    // setJobs((prevJobs) => [...prevJobs, job]);
    axios
      .put(`http://localhost:3000/job/${jobId}`, job)
      .then(() => {})
      .catch((error) =>
        console.error(`There was an error updating the job: ${error}`)
      );
  };

  //API call to get jobs from the BE
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch(
        (error) =>
          console.error(`There was an error retrieving the job list: ${error}`)
        //TODO: Print out a message to the screen when this fails
      );
  }, []);

  const handleDelete = (jobId) => {
    axios
      .delete(`http://localhost:3000/job/${jobId}`)
      .then(() => {
        setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
      })
      .catch((error) =>
        console.error(`There was an error deleting the job: ${error}`)
      );
  };

  return (
    <>
      <DisplayJobs jobs={jobs} onJobDelete={handleDelete} onEdit={editJob} />
      <JobForm onJobSubmit={addJob} />
    </>
  );
};

export default App;
