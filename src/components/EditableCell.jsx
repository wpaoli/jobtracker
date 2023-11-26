const EditableCells = ({
  job,
  editMode,
  handleEntry,
  handleKeyboard,
  toggleEditMode,
}) => {
  const fields = [
    "company",
    "job_title",
    "job_posting",
    "date_applied",
    "notes",
  ];
  const handleFocus = (event) => event.target.select();

  return fields.map((field, index) => {
    if (editMode.editRow && job.job_id === editMode.id) {
      return (
        <td key={field}>
          <input
            name={field}
            defaultValue={job[field]}
            onBlur={(e) => {
              handleEntry(e, job);
            }}
            onKeyDown={(e) => handleKeyboard(e, job)}
            onFocus={handleFocus}
            autoFocus={index === 0}
          ></input>
        </td>
      );
    } else {
      return (
        <td key={field} onClick={() => toggleEditMode(job)}>
          {job[field]}
        </td>
      );
    }
  });
};

export default EditableCells;
