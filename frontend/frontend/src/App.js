import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  // ✅ FETCH jobs from backend
  useEffect(() => {
    axios.get("http://localhost:8080/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ ADD job to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/jobs", form)
      .then(res => {
        setJobs([...jobs, res.data]);
        setForm({
          title: "",
          company: "",
          location: "",
          description: ""
        });
      })
      .catch(err => console.log(err));
  };

  // 🔍 FILTER logic
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    job.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Portal</h1>

      {/* 🔍 Search */}
      <div className="flex gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by location..."
          className="p-2 border rounded w-1/4"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
      </div>

      {/* ➕ Add Job Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add Job</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full mb-2 p-2 border rounded"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full mb-2 p-2 border rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Job
        </button>
      </form>

      {/* 📄 Job List */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        {filteredJobs.map((job, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <p className="mt-2">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;