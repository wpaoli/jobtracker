import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Table } from 'antd';

const columns = [
  {
    title: 'JobID',
    dataIndex: 'JobID',
    key: 'JobID',
  },
  {
    title: 'Company',
    dataIndex: 'Company',
    key: 'Company',
  },
  {
    title: 'JobPosting',
    dataIndex: 'JobPosting',
    key: 'JobPosting',
  },
  {
    title: 'DateApplied',
    dataIndex: 'DateApplied',
    key: 'DateApplied',
  },
  {
    title: 'Notes',
    dataIndex: 'Notes',
    key: 'Notes',
  },
];

const JobsTable = () => {
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error(`There was an error retrieving the job list: ${error}`));
  }, []);
return (


  <Table dataSource={jobs} columns={columns} />
);

}



export default JobsTable;
