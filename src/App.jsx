import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import DisplayJobs from "./components/DisplayJobs";
import Modal from "./components/Modal";
import "./App.css";

/*
TODO:

- refactor out the API calls


*/
const App = () => {
  //Variable that holds the jobs and maintains the latest state of the list
  const [jobs, setJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Adds job to state management clent side, but the adding of a job to the DB happens in
  //JobForm.jsx, prolly want to move that at some point
  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
    handleCloseModal();
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
    <div class="container">
      <h1>My Job tracker</h1>
      <h2>A dumb learning project</h2>
      <p>
        I started getting pissed that I didnt know react or basic MySql db
        stuff, so I went too deep on this project. But its cool and Im glad I
        did it. This project:
      </p>
      <ul>
        <li>Has a node/express DB connection to a local MySQL table</li>
        <li>Uses react for all the front end</li>
        <li>
          I learned a ton doing this simple project, but it probably took WAY
          longer than it should have.
        </li>
      </ul>
      <br />
      <br />
      <br />
      <hr />
      <DisplayJobs jobs={jobs} onJobDelete={handleDelete} onEdit={editJob} />
      <button className="block" onClick={handleOpenModal}>
        Add Job
      </button>

      <div>
        <Modal isOpen={isModalOpen}>
          <JobForm onJobSubmit={addJob} />
          <button className="closeButton" onClick={handleCloseModal}>
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default App;
