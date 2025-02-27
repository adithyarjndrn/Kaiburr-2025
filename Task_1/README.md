# Java backend and REST API


This Java backend application was developed as part of the Kaiburr Internship Selection Process. It serves as a task manager API that enables users to create, update, delete, and execute shell commands. Each task includes an ID, name, owner, command, and execution history, all stored in MongoDB.

Upon task creation or update, the application executes the command, captures the output, and stores execution details such as start time, end time, and result.

Users can interact with the API via REST endpoints using cURL, Postman, or a frontend interface.

Additionally, the application includes command validation to prevent execution of harmful commands (e.g., `rm -rf`).

---

## 🚀 Project Setup

To set up and run the application, use the following commands:

```bash
mvn clean package
mvn spring-boot:run
```

### Application Initialization


---

## 🛠 Software Requirements

To run this application, ensure you have the following installed:

- **Java 17** or later
- **Maven** (Apache Maven 3.8+)
- **MongoDB** (NoSQL Database)
- **Postman** (for API testing, optional)
- **cURL** (for API testing via command line, optional)
- **Git** (for version control, optional)

---

## 🔗 API Endpoints

### View All Tasks in the Web Interface


### Search for a Specific Task


### View Task Details


---

## 🛠 API Testing with cURL

### 📌 Create & Execute a Task (POST)

```bash
curl -X POST http://localhost:8080/tasks \
     -H "Content-Type: application/json" \
     -d '{
           "id": "123",
           "name": "Print Hello",
           "owner": "Adithya Rajendran",
           "command": "echo Hello, World!"
         }'
```



---

### 📌 Retrieve All Tasks (GET)

```bash
curl -X GET http://localhost:8080/tasks
```



---

### 📌 Search Tasks by Name (GET)

```bash
curl -X GET "http://localhost:8080/tasks/search?name=Print"
```



---

### 📌 Update an Existing Task (PUT)

```bash
curl -X PUT http://localhost:8080/tasks/123 \
     -H "Content-Type: application/json" \
     -d '{
           "id": "123",
           "name": "Updated Task",
           "owner": "Adithya Rajendran",
           "command": "echo Task Updated!"
         }'
```



---

### 📌 Delete a Task (DELETE)

```bash
curl -X DELETE http://localhost:8080/tasks/123
```



---

### 📜 Copyright

Copyright © 2025 Kaiburr LLC. All rights reserved.

