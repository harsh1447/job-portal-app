import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log("Backend not running yet");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/jobs", form);
      fetchJobs();
    } catch (err) {
      alert("Backend not running yet");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Portal</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e) => setForm({...form, title: e.target.value})} />
        <input placeholder="Company" onChange={(e) => setForm({...form, company: e.target.value})} />
        <input placeholder="Location" onChange={(e) => setForm({...form, location: e.target.value})} />
        <input placeholder="Description" onChange={(e) => setForm({...form, description: e.target.value})} />
        <button type="submit">Add Job</button>
      </form>

      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;