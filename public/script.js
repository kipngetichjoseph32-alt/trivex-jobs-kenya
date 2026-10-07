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
  if (!categoryGrid) return;
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
  try {
    const response = await fetch('/api/categories');
    const data = await response.json();
    renderCategories(data.categories || []);
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
}

async function searchJobs() {
  const search = (searchInput?.value || '').trim();
  const location = (locationSelect?.value || '').trim();

  if (searchResult) {
    searchResult.textContent = search || location
      ? `Searching TRIVEX${search ? ' for ' + search : ''}${location ? ' in ' + location : ''}...`
      : 'Showing available jobs...';
  }

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (location) params.append('location', location);

  try {
    const response = await fetch(`/api/jobs?${params.toString()}`);
    const data = await response.json();
    const jobs = data.jobs || [];

    if (!jobs.length) {
      if (searchResult) {
        searchResult.textContent = 'No jobs matched your search yet. Try another keyword or location.';
      }
      if (jobResults) jobResults.innerHTML = '';
      return;
    }

    if (searchResult) {
      searchResult.textContent = `Found ${jobs.length} result${jobs.length > 1 ? 's' : ''}.`;
    }

    if (jobResults) {
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
  } catch (err) {
    console.error('Search failed:', err);
    if (searchResult) {
      searchResult.textContent = 'Unable to load jobs right now. Please try again.';
    }
  }
}

if (searchButton) {
  searchButton.addEventListener('click', searchJobs);
}

if (searchInput) {
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchJobs();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  searchJobs();
});

const registerButtons = document.querySelectorAll('.register-type');
registerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const role = button.getAttribute('data-role');
    if (userTypeInput) userTypeInput.value = role;
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    const firstInput = registrationForm?.querySelector('input[name="fullName"]');
    firstInput?.focus();
  });
});

if (registrationForm) {
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

      if (formMessage) {
        formMessage.textContent = data.message;
        formMessage.classList.add('success');
      }

      registrationForm.reset();
      if (userTypeInput) userTypeInput.value = 'worker';
    } catch (error) {
      if (formMessage) {
        formMessage.textContent = error.message;
        formMessage.classList.add('error');
      }
    }
  });
}
