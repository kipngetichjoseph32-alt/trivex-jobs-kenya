const Database = require("better-sqlite3");

const db = new Database("trivex.db");

db.pragma("journal_mode = WAL");

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      user_type TEXT NOT NULL,
      profession TEXT NOT NULL,
      location TEXT NOT NULL,
      experience TEXT,
      payment_reference TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      employer TEXT NOT NULL,
      location TEXT NOT NULL,
      salary TEXT,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const count = db.prepare("SELECT COUNT(*) as total FROM jobs").get();

  if (count.total === 0) {
    const seedJobs = [
      {
        title: "Electrician Needed",
        employer: "Mugambi Homes",
        location: "Nairobi",
        salary: "KSh 25,000",
        category: "Electrician",
        description: "Need a licensed electrician for home wiring and electrical repairs."
      },
      {
        title: "House Maid",
        employer: "Naomi Wanjiku",
        location: "Kisumu",
        salary: "KSh 18,000",
        category: "House Maid",
        description: "Looking for a reliable housemaid to clean, cook, and manage the home."
      },
      {
        title: "Plumber",
        employer: "QuickFix Plumbing",
        location: "Nakuru",
        salary: "KSh 22,000",
        category: "Plumber",
        description: "Hiring a plumber for residential installations and maintenance."
      },
      {
        title: "Driver",
        employer: "Tuvit Logistics",
        location: "Mombasa",
        salary: "KSh 30,000",
        category: "Driver",
        description: "Looking for an experienced driver with a clean driving record."
      }
    ];

    const insertJob = db.prepare(`
      INSERT INTO jobs (title, employer, location, salary, category, description)
      VALUES (@title, @employer, @location, @salary, @category, @description)
    `);

    const insertMany = db.transaction((jobs) => {
      for (const job of jobs) {
        insertJob.run(job);
      }
    });

    insertMany(seedJobs);
  }
}

function getCategories() {
  return [
    "Electrician",
    "Plumber",
    "House Maid",
    "Carpenter",
    "Mason",
    "Painter",
    "Welder",
    "Mechanic",
    "Gardener",
    "Security Guard",
    "Driver",
    "Cook / Chef",
    "Tailor",
    "Barber",
    "Hairdresser",
    "Cleaner",
    "Farm Worker",
    "IT Technician",
    "Appliance Technician",
    "Construction Worker"
  ];
}

function searchJobs({ search = "", location = "" }) {
  const whereClauses = [];
  const params = {};

  if (search) {
    whereClauses.push("(LOWER(title) LIKE LOWER(@search) OR LOWER(category) LIKE LOWER(@search) OR LOWER(description) LIKE LOWER(@search))");
    params.search = `%${search}%`;
  }

  if (location) {
    whereClauses.push("LOWER(location) = LOWER(@location)");
    params.location = location;
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const query = `SELECT * FROM jobs ${whereSql} ORDER BY created_at DESC`;

  const stmt = db.prepare(query);
  return stmt.all(params);
}

function getStats() {
  const users = db.prepare("SELECT COUNT(*) AS total FROM users").get();
  const jobs = db.prepare("SELECT COUNT(*) AS total FROM jobs").get();

  return {
    totalUsers: users.total,
    totalJobs: jobs.total
  };
}

function addUser({ fullName, email, phone, userType, profession, location, experience, paymentReference, status }) {
  const stmt = db.prepare(`
    INSERT INTO users (full_name, email, phone, user_type, profession, location, experience, payment_reference, status)
    VALUES (@fullName, @email, @phone, @userType, @profession, @location, @experience, @paymentReference, @status)
  `);

  const result = stmt.run({
    fullName,
    email,
    phone,
    userType,
    profession,
    location,
    experience,
    paymentReference,
    status
  });

  return {
    id: result.lastInsertRowid,
    fullName,
    email,
    phone,
    userType,
    profession,
    location,
    experience,
    paymentReference,
    status
  };
}

function addJob({ title, employer, location, salary, category, description }) {
  const stmt = db.prepare(`
    INSERT INTO jobs (title, employer, location, salary, category, description)
    VALUES (@title, @employer, @location, @salary, @category, @description)
  `);

  const result = stmt.run({ title, employer, location, salary, category, description });

  return {
    id: result.lastInsertRowid,
    title,
    employer,
    location,
    salary,
    category,
    description
  };
}

module.exports = {
  db,
  initializeDatabase,
  getCategories,
  searchJobs,
  getStats,
  addUser,
  addJob
};
