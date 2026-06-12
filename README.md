# GitHub API Analyzer

A backend service that integrates with the GitHub REST API to fetch, analyze and update user profiles, repositories, and related data. The project is designed with a focus on clean REST architecture, proper error handling, and production-ready backend practices.

---

## 🚀 Features

- Fetch GitHub user profile data
- Retrieve public repositories of a user
- Basic repository/user analysis via GitHub API
- Proper error handling for invalid users and API failures
- Rate limit aware API usage
- Clean and modular REST API structure
- Secure environment variable usage for API tokens

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- GitHub REST API
- Axios
- dotenv
- MySql

---

## 📁 Project Structure

```
/src
|── helper/
|── controllers/
|── routes/
|── middleware/
|── services/
|── config/
|── app.js
|── server.js
```
---

## ⚙️ Setup Instructions

1. git clone https://github.com/ThaparNitish/GitHub-Analyzer.git
2. cd GitHub-Analyzer
3. npm install
4. npm start

---

## 📡 API Endpoints
BASE URL: https://profound-acceptance-production-0f24.up.railway.app/

1. GET api/users/:username
2. GET api/users/:username/repos
3. GET api/users/:username/repos/:repoName
4. GET api/users/
5. GET /:username/analysis
6. GET api/github/:username
7. PATCH api/github/:editProfile
8. GET api/github/:username/repos
9. GET /db-test

---

## 📌 Project Highlights

1. RESTful API design
2. Modular backend architecture
3. External API integration (GitHub)
4. Production-style error handling
5. Clean and scalable code structure
