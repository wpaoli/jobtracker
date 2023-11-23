import React, { useState, useEffect } from "react";

const DisplayJobs = ({ jobs, onJobDelete, onJobEdit }) => {
  const [jobRows, setJobRows] = useState([]);

  useEffect(() => {
    setJobRows(jobs.map((job) => ({ ...job, editable: false })));
  }, [jobs]);

  const handleEdit = (job) => {
    setJobRows(() => {
      return jobRows.map((obj) =>
        job.job_id === obj.job_id ? { ...obj, editable: true } : obj
      );
    });
  };
  // console.log("jobRows", jobRows);

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
        {jobRows.map((item) => (
          <tr key={item.job_id}>
            <td>
              <button onClick={() => onJobDelete(item.job_id)}>Delete</button>
              <button onClick={() => onJobEdit(item.job_id)}>Edit</button>
            </td>

            <td>
              {item.editable
                ? console.log("editable")
                : console.log("not editable")}

              {item.editable ? (
                <input placeholder={item.company}></input>
              ) : (
                <span onClick={() => handleEdit(item)}>{item.company}</span>
              )}

              {/* {isEditMode.find((item) => item.id === job.job_id).editable ? (
                <input placeholder={job.company}></input>
              ) : (
                <span onClick={() => handleEdit(job)}>{job.company}</span>
              )} */}
              {/* <span onClick={() => handleEdit(item)}>{item.company}</span> */}
            </td>
            <td>{item.job_title}</td>
            <td>{item.job_posting}</td>
            <td>{item.date_applied}</td>
            <td>{item.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayJobs;
