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

- **Spring boot Working**
![image](https://github.com/user-attachments/assets/249ea466-3d8e-4de0-af22-70c05edc2af4)


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
![image](https://github.com/user-attachments/assets/f790e832-5caa-417c-8148-cd692cd8f613)



---

### 📌 Retrieve All Tasks (GET)

```bash
curl -X GET http://localhost:8080/tasks
```
![image](https://github.com/user-attachments/assets/b3db018e-fabc-466d-8f06-194f0683a37b)

![image](https://github.com/user-attachments/assets/e473aab5-9d79-4563-aa3e-4c95e61d688f)



---

### 📌 Search Tasks by Name (GET)

```bash
curl -X GET "http://localhost:8080/tasks/search?name=Print"
```

![image](https://github.com/user-attachments/assets/a7c8ec55-5025-4f79-bbcd-e0c1f282cd62)


---

### 📌 PUT a task (PUT)


![PUT](https://github.com/user-attachments/assets/143b8e1c-6ec8-405a-852a-eb5b4122bedc)


---

### 📌 Delete a Task (DELETE)

```bash
curl -X DELETE http://localhost:8080/tasks/123
```

![image](https://github.com/user-attachments/assets/3de1910c-20a6-4728-a17b-2e5ced0bba0c)



---

### 📜 Copyright

Copyright © 2025 Kaiburr LLC. All rights reserved.

