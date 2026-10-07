const categoryGrid = document.getElementById('categoryGrid');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const locationSelect = document.getElementById('location');
const searchResult = document.getElementById('searchResult');
const jobResults = document.getElementById('jobResults');
const registrationForm = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');
const userTypeInput = document.getElementById('userType');

function renderCategories(categories) {
  categoryGrid.innerHTML = categories.map((category) => {
    const icons = {
      Electrician: '⚡',
      Plumber: '🔧',
      'House Maid': '🏠',
      Carpenter: '🪚',
      Mason: '🧱',
      Painter: '🎨',
      Welder: '🔥',
      Mechanic: '🚗',
      Gardener: '🌱',
      'Security Guard': '🛡️',
      Driver: '🚘',
      'Cook / Chef': '👨‍🍳',
      Tailor: '🧵',
      Barber: '💈',
      Hairdresser: '💇',
      Cleaner: '🧹',
      'Farm Worker': '🌾',
      'IT Technician': '💻',
      'Appliance Technician': '🔌',
      'Construction Worker': '🏗️'
    };

    return `
      <div class="category">
        <div class="icon">${icons[category] || '💼'}</div>
        <h3>${category}</h3>
      </div>
    `;
  }).join('');
}

async function loadCategories() {
  const response = await fetch('/api/categories');
  const data = await response.json();
  renderCategories(data.categories || []);
}

async function searchJobs() {
  const search = searchInput.value.trim();
  const location = locationSelect.value.trim();

  if (!search && !location) {
    searchResult.textContent = 'Please enter a profession or select a location.';
    jobResults.innerHTML = '';
    return;
  }

  searchResult.textContent = `Searching TRIVEX${search ? ' for ' + search : ''}${location ? ' in ' + location : ''}...`;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (location) params.append('location', location);

  const response = await fetch(`/api/jobs?${params.toString()}`);
  const data = await response.json();

  const jobs = data.jobs || [];

  if (!jobs.length) {
    searchResult.textContent = 'No jobs matched your search yet. Try another keyword or location.';
    jobResults.innerHTML = '';
    return;
  }

  searchResult.textContent = `Found ${jobs.length} result${jobs.length > 1 ? 's' : ''}.`;

  jobResults.innerHTML = jobs.map((job) => `
    <div class="job-card">
      <div class="job-header">
        <h3>${job.title}</h3>
        <span>${job.category}</span>
      </div>
      <p><strong>Employer:</strong> ${job.employer}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary || 'Negotiable'}</p>
      <p>${job.description}</p>
    </div>
  `).join('');
}

searchButton.addEventListener('click', searchJobs);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchJobs();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  searchJobs();
});

const registerButtons = document.querySelectorAll('.register-type');
registerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const role = button.getAttribute('data-role');
    userTypeInput.value = role;
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    const firstInput = registrationForm.querySelector('input[name="fullName"]');
    firstInput.focus();
  });
});

registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const userData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed.');
    }

    formMessage.textContent = data.message;
    formMessage.classList.add('success');
    registrationForm.reset();
    userTypeInput.value = 'worker';
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.classList.add('error');
  }
});
