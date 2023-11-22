import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import DisplayJobs from "./components/DisplayJobs";
import "./App.css";

const App = () => {
  //List of jobs
  const [jobs, setJobs] = useState([]);

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
      <JobForm />
    </>
  );
};

export default App;
