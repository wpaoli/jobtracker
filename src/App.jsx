import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import DisplayJobs from "./components/DisplayJobs";
import "./App.css";

const App = () => {
  //Variable that holds the jobs and maintains the latest state of the list
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };
  //API call to get jobs from the BE
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the job list: ${error}`)
      );
  });

  return (
    <>
      <DisplayJobs jobs={jobs} />
      <JobForm onJobSubmit={addJob} />
    </>
  );
};

export default App;
