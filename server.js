const express = require("express");
const path = require("path");
const { initializeDatabase, getCategories, searchJobs, getStats, addUser, addJob } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TRIVEX API is running.",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/categories", (req, res) => {
  const categories = getCategories();
  res.json({ success: true, categories });
});

app.get("/api/jobs", (req, res) => {
  const search = (req.query.search || "").trim();
  const location = (req.query.location || "").trim();

  const jobs = searchJobs({ search, location });

  res.json({
    success: true,
    count: jobs.length,
    jobs
  });
});

app.get("/api/stats", (req, res) => {
  const stats = getStats();
  res.json({ success: true, stats });
});

app.post("/api/register", (req, res) => {
  const {
    fullName,
    email,
    phone,
    userType,
    profession,
    location,
    experience,
    paymentReference,
    status = "pending"
  } = req.body;

  if (!fullName || !email || !phone || !userType || !profession || !location) {
    return res.status(400).json({
      success: false,
      message: "Please complete all required fields."
    });
  }

  // Convert role to normalized form
  const role = userType === "employer" ? "employer" : "worker";

  const newUser = addUser({
    fullName,
    email,
    phone,
    userType: role,
    profession,
    location,
    experience: experience || "",
    paymentReference: paymentReference || "",
    status
  });

  return res.status(201).json({
    success: true,
    message: `${role === "worker" ? "Worker" : "Employer"} registration submitted successfully.`,
    user: newUser
  });
});

app.post("/api/jobs", (req, res) => {
  const {
    title,
    employer,
    location,
    salary,
    category,
    description
  } = req.body;

  if (!title || !employer || !location || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill in the required job fields."
    });
  }

  const job = addJob({
    title,
    employer,
    location,
    salary: salary || "Negotiable",
    category,
    description
  });

  return res.status(201).json({
    success: true,
    message: "Job posted successfully.",
    job
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`TRIVEX server is running on http://localhost:${PORT}`);
});
