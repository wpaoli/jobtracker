import { convertLegacyProps } from "antd/es/button";
import React, { useState, useEffect } from "react";

const DisplayJobs = ({ jobs, onJobDelete, onJobEdit }) => {
  const [isEditMode, setEditMode] = useState([]);

  useEffect(() => {
    setEditMode(jobs.map((job) => ({ id: job.job_id, editable: false })));
  }, [jobs]);

  // console.log(isEditMode);

  const handleEdit = (job) => {
    // isEditMode.map((item) => console.log(item.id === job.job_id, item.id));

    setEditMode((prevState) => {
      prevState.map((item) => console.log(item.id === job.job_id, item.id));
      // console.log(prevState);
    });

    console.log(isEditMode);

    // setEditMode(jobs.map((job) => ({ id: job.job_id, editable: false })));

    // console.log(...isEditMode);
    //I think I need to do the previous thing here?
    // setEditMode(
    //   (prevState) => {
    //     prevState.map((item) => console.log(item));
    //   }
    //   // { id: job.job_id, editable: true }
    // );
    // console.log(isEditMode);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
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
            <td>
              <button onClick={() => onJobDelete(job.job_id)}>Delete</button>
              <button onClick={() => onJobEdit(job.job_id)}>Edit</button>
            </td>

            <td>
              {/* If job.id matches the one in here or maybe doesnt match it */}
              {/* {console.log(
                "inTD",
                isEditMode.find((item) => item.id === job.job_id)
              )} */}
              {/* {console.log("inTD", isEditMode)} */}
              <span onClick={() => handleEdit(job)}>{job.company}</span>

              {/* {isEditMode.find((item) => item.id === job.job_id).editable ? (
                <input placeholder={job.company}></input>
              ) : (
                <span onClick={() => handleEdit(job)}>{job.company}</span>
              )} */}
            </td>
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

export default DisplayJobs;
