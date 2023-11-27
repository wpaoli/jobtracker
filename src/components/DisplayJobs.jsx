import React, { useState, useEffect } from "react";

import EditableCells from "./EditableCell";

const DisplayJobs = ({ jobs, onJobDelete, onEdit }) => {
  const [editMode, setEditMode] = useState({
    id: null,
    editRow: false,
  });

  const [ChangedRows, setChangedRows] = useState();
  useEffect(() => {
    setChangedRows(jobs.map((job) => ({ ...job })));
  }, [jobs]);

  // console.log(ChangedRows);

  const toggleEditMode = (item) => {
    setEditMode((prevEditMode) => ({
      id: item.job_id,
      editRow: !prevEditMode.editRow,
    }));
    // handleEntry();
    // console.log(item);
  };

  // console.log(editMode.id);

  const handleKeyboard = (e, job) => {
    if (e.key === "Enter") {
      handleEntry(e, job);
      toggleEditMode(job);
    }
  };

  const handleEntry = (e, job) => {
    // console.log(e, job);
    // toggleEditMode(job);
    setChangedRows((prevChangedRows) => {
      const updatedJobRows = prevChangedRows.map((obj) =>
        obj.job_id === job.job_id
          ? { ...obj, [e.target.name]: e.target.value }
          : obj
      );
      // Call onEdit with the updated job row
      onEdit(updatedJobRows.find((row) => job.job_id === row.job_id));
      // Return the updated job rows to update the state
      return updatedJobRows;
    });
  };

  return (
    <table className="">
      <thead>
        <tr>
          <th colSpan={2}>Actions</th>

          <th>Company</th>
          <th>Job Title</th>
          <th>Link to Job Posting</th>
          <th>Date Applied</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {ChangedRows &&
          ChangedRows.map((item) => (
            // <tr key={item.job_id} onKeyDown={(e) => handleKeyboard(e, item)}>

            <tr key={item.job_id}>
              <td>
                <button
                  className="close-button"
                  onClick={() => onJobDelete(item.job_id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode(item)}
                >
                  {editMode.editRow && item.job_id === editMode.id
                    ? "Save"
                    : "Edit"}
                </button>
              </td>
              {/* //FOR NOW going to duplicated this for every field but eventually pull this out to its own thing */}

              <>
                <EditableCells
                  job={item}
                  handleEntry={handleEntry}
                  handleKeyboard={handleKeyboard}
                  editMode={editMode}
                  toggleEditMode={toggleEditMode}
                ></EditableCells>
              </>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DisplayJobs;
