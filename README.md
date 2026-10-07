* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

body {
    background: #f5f7fa;
    color: #172033;
}

a {
    text-decoration: none;
}

button,
input,
select {
    font: inherit;
}

header {
    background: #071b33;
    color: white;
    padding: 16px 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
}

.logo span {
    color: #20c997;
}

nav {
    display: flex;
    gap: 25px;
    align-items: center;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

nav a:hover {
    color: #20c997;
}

.register-btn {
    background: #20c997;
    color: #071b33 !important;
    padding: 11px 18px;
    border-radius: 8px;
}

.hero {
    background: linear-gradient(135deg, #071b33, #0d4261);
    color: white;
    padding: 90px 6%;
    text-align: center;
}

.hero h1 {
    font-size: 52px;
    margin-bottom: 18px;
}

.hero h1 span {
    color: #20c997;
}

.hero p {
    font-size: 20px;
    max-width: 700px;
    margin: auto;
    line-height: 1.6;
}

.hero-buttons {
    margin-top: 35px;
}

.btn {
    display: inline-block;
    padding: 15px 25px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    margin: 7px;
    cursor: pointer;
    border: none;
}

.primary {
    background: #20c997;
    color: #071b33;
}

.secondary {
    background: white;
    color: #071b33;
}

.search-box {
    width: 88%;
    max-width: 1000px;
    margin: -35px auto 50px;
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,.12);
    position: relative;
}

.search-box h2 {
    margin-bottom: 15px;
}

.search-form {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 12px;
}

.search-form input,
.search-form select {
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 7px;
    outline: none;
}

.search-form button {
    background: #20c997;
    border: none;
    padding: 14px 25px;
    border-radius: 7px;
    font-weight: bold;
    cursor: pointer;
}

.search-result {
    margin-top: 15px;
    color: #172033;
}

.job-results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 18px;
}

.job-card {
    background: #f8fafc;
    border: 1px solid #e3e8ef;
    border-radius: 12px;
    padding: 18px;
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.job-header h3 {
    font-size: 18px;
}

.job-header span {
    background: #dffbf3;
    color: #0c7f67;
    padding: 6px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: bold;
}

.job-card p {
    margin: 6px 0;
    color: #374151;
    line-height: 1.5;
}

section {
    padding: 65px 6%;
}

.section-title {
    text-align: center;
    margin-bottom: 40px;
}

.section-title h2 {
    font-size: 34px;
    margin-bottom: 10px;
}

.section-title p {
    color: #667085;
}

.categories {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
}

.category {
    background: white;
    padding: 25px 15px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 5px 18px rgba(0,0,0,.06);
    transition: .3s;
    cursor: pointer;
}

.category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,.12);
}

.category .icon {
    font-size: 35px;
    margin-bottom: 12px;
}

.category h3 {
    font-size: 16px;
}

.steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.step {
    background: white;
    padding: 35px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 18px rgba(0,0,0,.06);
}

.step-number {
    width: 55px;
    height: 55px;
    margin: auto auto 18px;
    background: #20c997;
    color: #071b33;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
}

.step h3 {
    margin-bottom: 10px;
}

.step p {
    color: #667085;
    line-height: 1.5;
}

.registration {
    background: #071b33;
    color: white;
    text-align: center;
}

.registration h2 {
    font-size: 38px;
    margin-bottom: 15px;
}

.fee {
    font-size: 42px;
    color: #20c997;
    font-weight: bold;
    margin: 20px;
}

.mpesa {
    background: white;
    color: #172033;
    max-width: 500px;
    margin: 25px auto;
    padding: 25px;
    border-radius: 12px;
}

.mpesa-number {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
}

.registration-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    max-width: 900px;
    margin: 35px auto;
}

.registration-card {
    background: white;
    color: #172033;
    padding: 35px;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0,0,0,.12);
}

.registration-card h3 {
    font-size: 25px;
    margin-bottom: 12px;
}

.registration-card p {
    color: #667085;
    line-height: 1.5;
    margin-bottom: 20px;
}

.registration-form {
    max-width: 800px;
    margin: 35px auto 0;
    background: rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 28px;
}

.registration-form h3 {
    font-size: 28px;
    margin-bottom: 20px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-bottom: 20px;
}

.registration-form input,
.registration-form select {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    outline: none;
}

.form-message {
    margin-top: 16px;
    font-weight: bold;
}

.form-message.success {
    color: #9ef0c8;
}

.form-message.error {
    color: #ffb4b4;
}

footer {
    background: #041222;
    color: white;
    padding: 40px 6%;
    text-align: center;
}

footer h2 {
    margin-bottom: 10px;
}

footer p {
    color: #aab4c3;
    margin: 8px;
}

@media(max-width: 900px) {
    .categories {
        grid-template-columns: repeat(3, 1fr);
    }

    .search-form {
        grid-template-columns: 1fr;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }
}

@media(max-width: 650px) {
    header {
        flex-direction: column;
        gap: 15px;
    }

    nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }

    .hero {
        padding: 65px 5%;
    }

    .hero h1 {
        font-size: 38px;
    }

    .hero p {
        font-size: 17px;
    }

    .categories {
        grid-template-columns: repeat(2, 1fr);
    }

    .steps {
        grid-template-columns: 1fr;
    }

    .registration-options {
        grid-template-columns: 1fr;
    }
}
