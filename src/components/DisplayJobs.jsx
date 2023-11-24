import React, { useState, useEffect } from "react";

const DisplayJobs = ({ jobs, onJobDelete, onEdit }) => {
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

  const handleKeyboard = (e, job) => {
    if (e.key === "Enter") {
      handleEntry(e, job);
    }
  };
  const handleEntry = (e, job) => {
    setJobRows((prevJobRows) => {
      const updatedJobRows = prevJobRows.map((obj) =>
        obj.job_id === job.job_id
          ? { ...obj, [e.target.name]: e.target.value, editable: false }
          : obj
      );

      // Call onEdit with the updated job row
      onEdit(updatedJobRows.find((row) => job.job_id === row.job_id));

      // Return the updated job rows to update the state
      return updatedJobRows;
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
            </td>

            <td>
              {item.editable ? (
                <input
                  name="company"
                  onBlur={(e) => handleEntry(e, item)}
                  onKeyDown={(e) => handleKeyboard(e, item)}
                  placeholder={item.company}
                ></input>
              ) : (
                <span onClick={() => handleEdit(item)}>{item.company}</span>
              )}
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
