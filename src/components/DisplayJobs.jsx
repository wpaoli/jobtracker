import React, { useState, useEffect } from "react";

const DisplayJobs = ({ jobs, onJobDelete, onEdit }) => {
  const [editMode, setEditMode] = useState({
    id: null,
    editRow: false,
  });

  const [changedRows, setChangedRows] = useState();
  useEffect(() => {
    setChangedRows(jobs.map((job) => ({ ...job })));
  }, [jobs]);

  const toggleEditMode = (item) => {
    if (editMode.editRow) {
      handleEntry(item);
      console.log(item);
    }
    setEditMode((prevEditMode) => ({
      id: item.job_id,
      editRow: !prevEditMode.editRow,
    }));
    // handleEntry();
    // console.log(item);
  };

  // console.log(editMode.id);

  // const handleKeyboard = (e, job) => {
  //   //BAILING ON THIS FOR NOW, LETS TRY JUST A EDIT/SAVE
  //   if (e.key === "Enter") {
  //     handleEntry(e, job);
  //   }
  // };

  const pushChange = (e, id) => {
    console.log(e.target.attributes[0].value, e.target.value);
  };
  const handleEntry = (job) => {
    console.log(job);

    // This needs to be redone
    // onEdit(updatedJobRows.find((row) => job.job_id === row.job_id));
  };

  const testBlur = () => {
    console.log("bluurrr");
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
        {jobs.map((item) => (
          // <tr key={item.job_id} onKeyDown={(e) => handleKeyboard(e, item)}>

          <tr key={item.job_id}>
            <td>
              <button onClick={() => onJobDelete(item.job_id)}>Delete</button>
              <button onClick={() => toggleEditMode(item)}>
                {editMode.editRow && item.job_id === editMode.id
                  ? "Save"
                  : "Edit"}
              </button>
            </td>
            {/* //FOR NOW going to duplicated this for every field but eventually pull this out to its own thing */}
            {editMode.editRow && item.job_id === editMode.id ? (
              <>
                <td>
                  <input
                    name="company"
                    defaultValue={item.company}
                    onChange={(e) => {
                      pushChange(e, item.job_id);
                    }}
                    onBlur={testBlur}
                    autoFocus
                  ></input>
                </td>
                <td>
                  <input
                    name="job_title"
                    defaultValue={item.job_title}
                    onChange={(e) => {
                      // pushChange(e, item.job_id);
                    }}
                  ></input>
                </td>
                <td>
                  <input
                    name="job_posting"
                    defaultValue={item.job_posting}
                  ></input>
                </td>
                <td>
                  <input
                    name="date_applied"
                    defaultValue={item.date_applied}
                  ></input>
                </td>
                <td>
                  <input name="notes" defaultValue={item.notes}></input>
                </td>
              </>
            ) : (
              <>
                <td>{item.company}</td>
                <td>{item.job_title}</td>
                <td>{item.job_posting}</td>
                <td>{item.date_applied}</td>
                <td>{item.notes}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayJobs;
