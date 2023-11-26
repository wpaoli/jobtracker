// jobModel.js
import axios from "axios";

const jobs = [];

const addJob = (job) => {
 return axios.post("http://localhost:3000/job", job).then((response) => {
   jobs.push({ ...job, job_id: response.data.insertId });
   return jobs;
 });
};

const editJob = (job) => {
 const jobId = job.job_id;
 return axios.put(`http://localhost:3000/job/${jobId}`, job).then(() => {
   const jobIndex = jobs.findIndex((job) => job.job_id === jobId);
   jobs[jobIndex] = job;
   return jobs;
 });
};

const deleteJob = (jobId, jobs) => {
 return axios
   .delete(`http://localhost:3000/job/${jobId}`)
   .then(() => {
     jobs = jobs.filter((job) => job.job_id !== jobId);
     return jobs;
   });
};

const fetchJobs = (jobs) => {
 return axios
   .get("http://localhost:3000/jobs")
   .then((response) => {
     jobs = response.data;
     return jobs;
   });
};

const jobModel = { jobs, addJob, editJob, deleteJob, fetchJobs };

export default jobModel;
