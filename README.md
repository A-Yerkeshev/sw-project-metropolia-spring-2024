# The Instant Review Software "ReflectEd"

## Introduction

The Instant Review Softwareis designed for dedicated teachers at diverse educational institutions, aiming to enhance their lecture quality through timely and impactful student feedback. This innovative web application empowers students to provide immediate responses post-lecture, enabling educators to adapt and evolve their teaching methods effectively. Unlike traditional end-of-course feedback, our tool offers real-time insights into lecture performance, helping teachers identify successful topics and teaching styles. This approach not only fosters a more engaging learning environment but also aligns with our commitment to continuous improvement and educational excellence.

## Features

## Technology Stack

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

## Contributing

## FAQ

**Q: Can I use this software for any educational institution?** A: Yes, the Instant Review Software is designed to be versatile and adaptable for various educational settings.

## Acknowledgments

### Team

The Instant Review Software was brought to life by:

- **Arman Yerkeshev** - _Lead Developer_ - [GitHub](https://github.com/A-Yerkeshev) - [LinkedIn](https://www.linkedin.com/in/arman-yerkesh-29b8a7165/)
- **Anna Linden** - _Full Stack Developer_ - [GitHub](https://github.com/AnnaLinden) - [LinkedIn](https://www.linkedin.com/in/anna-linden-software-developer/)
- **Artur Golavskiy** - _Full Stack Developer_ - [GitHub](https://github.com/arturgola) - [LinkedIn](https://www.linkedin.com/in/artur-golavskiy/)
- **Dung Pham** - _Full Stack Developer_ - [GitHub](https://github.com/dungdpham)

- Thanks to Metropolia University of Applied Sciences for supporting this project.
