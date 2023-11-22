import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FormInput from "./FormInput";
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
            <tr key={job.job_id}>
              <td>{job.company}</td>
              <td>{job.job_title}</td>
              <td>{job.job_posting}</td>
              <td>{job.date_applied}</td>
              <td>{job.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  //Going to try adding the Form here:

  const [values, setValues] = useState({
    company: "",
    job_title: "",
    job_posting: "",
    date_applied: "",
    notes: "",
  });
  const inputs = [
    {
      id: 1,
      name: "company",
      type: "text",
      placeholder: "Company",
      errorMessage: "You left Company Blank",
      label: "Company",
      required: false,
    },
    {
      id: 2,
      name: "job_title",
      type: "text",
      placeholder: "Job Title",
      errorMessage: "You at least need this one",
      label: "Job Title",
      required: true,
    },
    {
      id: 3,
      name: "job_posting",
      type: "text",
      placeholder: "Job Posting",
      errorMessage: "You at least need this one",
      label: "Job Posting",
      required: false,
    },
    {
      id: 4,
      name: "date_applied",
      type: "date",
      placeholder: "Date Applied",
      errorMessage: "",
      label: "Date Applied",
    },
    {
      id: 5,
      name: "notes",
      type: "text",
      placeholder: "Notes",
      errorMessage: "",
      label: "Notes",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", values);
    axios
      .post("http://localhost:3000/job", values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`There was an error posting the job: ${error}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <button>Submit</button>
    </form>
    // <JobsTable jobs={jobs} />
  );
};

export default App;
