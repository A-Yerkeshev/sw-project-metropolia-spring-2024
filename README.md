# The Instant Review Software "ReflectEd"

## Introduction

The Instant Feedback Software is designed for teachers at different educational institutions, aiming to improve their lecture quality through timely student feedback. This web application allows students to provide immediate responses post-lecture, enabling educators to adapt and evolve their teaching methods effectively. Unlike traditional end-of-course feedback, this tool offers real-time insights into lecture performance, helping teachers identify successful topics and teaching styles.

The teacher has the possibility to sign up, log in, and create courses. Inside each course, the teacher can create sessions. For each session the teacher can generate a QR code.

Students can scan a QR code and leave a review for the session using their phone. The review involves a color assessment (red, green and yellow) and a voluntary comment. Each student can leave only one review per one session.

## Features

**Continuous Integration/Deployment (CI/CD)**

- **Auto Testing:** Every update is automatically tested with Jenkins, reducing bugs.
- **Easy Deployment:** Docker makes putting the project live simple and consistent.

**Real-time Feedback**

- **Quick Feedback:** Teachers get student feedback right after classes.
- **Anonymous:** Students can give honest feedback safely.

**Secure Login**

- **Protected Access:** Uses JWT tokens to keep logins safe.
- **Different User Types:** Students and teachers see different things on the app.

**User-Friendly Design**

- **Looks Good on Any Device:** Thanks to Material-UI, the app works well on phones, tablets, and computers.
- **Easy to Use:** Designed to be straightforward for everyone.

**Insights for Teachers**

- **Track Progress:** Teachers can see how they're doing over time.
- **Visual Data:** Feedback is shown in charts, making it easy to understand.

**Tech Quality**

- **Well-Organized:** Built with MERN (MongoDB, Express.js, React, Node.js) for a clean setup.
- **Thoroughly Tested:** Uses Jest, Mocha, and Chai for testing to make sure everything works.
- **High Code Standards:** ESLint helps keep the code clean and easy to work with

## Technology Stack

This project leverages a robust stack designed for scalability, efficiency, and ease of use. Below is an overview of the primary technologies and tools utilized:

### MERN Stack

- ![MongoDB](https://img.shields.io/badge/-MongoDB-green?style=flat-square&logo=mongodb) **MongoDB**: A document-based open source database.
- ![Express.js](https://img.shields.io/badge/-Express.js-black?style=flat-square&logo=express) **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- ![React](https://img.shields.io/badge/-React-blue?style=flat-square&logo=react) **React**: A JavaScript library for building user interfaces.
- ![Node.js](https://img.shields.io/badge/-Node.js-green?style=flat-square&logo=node.js) **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

### CI/CD & DevOps

- ![Jenkins](https://img.shields.io/badge/-Jenkins-red?style=flat-square&logo=jenkins) **Jenkins**: An open-source automation server that enables developers around the world to reliably build, test, and deploy their software.
- ![Docker](https://img.shields.io/badge/-Docker-blue?style=flat-square&logo=docker) **Docker**: A set of platform-as-a-service (PaaS) products that use OS-level virtualization to deliver software in packages called containers.

### Authentication

- ![JWT](https://img.shields.io/badge/-JWT-black?style=flat-square&logo=json-web-tokens) **JWT Tokens**: Securely transmitting information between parties as a JSON object.

### UI/UX

- ![Material-UI](https://img.shields.io/badge/-Material--UI-blue?style=flat-square&logo=material-ui) **Material-UI**: A popular React UI framework featuring React components that implement Google's Material Design.

### Testing & Development

- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Supertest**: A Super-agent driven library for testing HTTP servers.
- **Mocha/Chai**: A flexible testing framework for asynchronous testing.

### Code Quality

- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Screenshots

- Login
  ![Login](./screenshots/login.JPG)
- Courses page
  ![courses](./screenshots/courses.JPG)
- Sessions page
  ![Sessions](./screenshots/SessionsAccordeon.JPG)
- Editing Modal
  ![Modal](./screenshots/editing.JPG)
- Statistics
  ![Statistics](./screenshots/statistics.JPG)
- QR page
  ![QR](./screenshots/QR.JPG)
- Feedback form
  ![Feedback](./screenshots/FeedbackForm.JPG)

## Getting started

### Prerequisites

- Ensure you have Node.js and npm installed on your system.

### Installation

**Backend Setup:**

1.  **Navigate to the backend directory:**

```bash
cd backend
```

2.  **Install dependencies:**

```bash
npm install
```

3.  **Create a `.env` file in the `backend` directory with the following variables:**

```plaintext
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
MONGO_URI_TEST=<your_mongodb_test_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Replace `<your_mongodb_connection_string>`, `<your_mongodb_test_connection_string>`, and `<your_jwt_secret>` with your actual MongoDB connection strings and JWT secret. 4. **Start the backend server:**

```bash
 npm run dev
```

**Frontend Setup:**

1.  **Navigate to the frontend directory:**

```bash
 cd ../frontend
```

2.  **Install dependencies:**

```bash
 npm install
```

3.  **Create a `.env` file in the `frontend` directory with the following variable:**

REACT_APP_BACKEND_URL=http://localhost:4000

This variable connects the frontend application to your backend server. 4. **Start the frontend application:**

```bash
 npm start
```

Your default web browser should open automatically to `http://localhost:3000`.

### Usage

After installation, open `http://localhost:3000` in your browser to access the application. Teachers can create lectures and view feedback, while students can submit feedback post-lecture.

## Screenshots

## UML Diagrams / Architecture

- ER Diagram
  ![ER Diagram](./diagrams/ERdiagram.png)

- Relational Schema
  ![Relational Schema](./diagrams/RelationalSchema.png)

- Use Case Diagram
  ![Use Case Diagram](./diagrams/UseCaseDiagram.png)

- Activity Diagram
  ![Activity Diagram](./diagrams/ActivityDiagram.png)

## Contributing

## FAQ

**Q: Can I use this software for any educational institution?**
A: Yes, the Instant Review Software is designed to be versatile and adaptable for various educational settings.

## Acknowledgments

### Team

The Instant Review Software was brought to life by:

- **Arman Yerkeshev** - _Lead Developer_ - [GitHub](https://github.com/A-Yerkeshev) - [LinkedIn](https://www.linkedin.com/in/arman-yerkesh-29b8a7165/)
- **Anna Linden** - _Full Stack Developer_ - [GitHub](https://github.com/AnnaLinden) - [LinkedIn](https://www.linkedin.com/in/anna-linden-software-developer/)
- **Artur Golavskiy** - _Full Stack Developer_ - [GitHub](https://github.com/arturgola) - [LinkedIn](https://www.linkedin.com/in/artur-golavskiy/)
- **Dung Pham** - _Full Stack Developer_ - [GitHub](https://github.com/dungdpham)

- Thanks to Metropolia University of Applied Sciences for supporting this project.
