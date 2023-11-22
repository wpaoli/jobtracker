import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const JobsTable = ({ jobs }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Link to Job Posting</th>
            <th>Date Applied</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.JobId}>
              <td>{job.Company}</td>
              <td>{job.JobTitle}</td>
              <td>{job.JobPosting}</td>
              <td>{job.DateApplied}</td>
              <td>{job.Notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <JobsTable jobs={jobs} />
    </>
  );
};

export default App;
