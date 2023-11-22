const DisplayJobs = ({ jobs }) => {
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

export default DisplayJobs;
