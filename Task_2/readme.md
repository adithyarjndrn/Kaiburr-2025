
# **Kubernetes Deployment - Task 2**  
**Author: Adithya Rajendran**  

This task involves **containerizing** the Task Manager application and deploying it on a **Kubernetes cluster** using **Minikube**. The application runs inside the Minikube environment, with tasks executed dynamically through **BusyBox pods**. **MongoDB** is deployed with a **Persistent Volume (PV)** to ensure data persistence.  

---

## **1️⃣ Cluster Setup**  

The **Kubernetes cluster** was configured locally using **Minikube v1.33.1**, with **Docker** as the **Container Runtime Interface (CRI)**.  

To verify cluster status:  
```bash

minikube status
```
📌 **Minikube status:**  
![image](https://github.com/user-attachments/assets/0e12e894-92b6-4d24-8270-46be7a20fb15)

---

## **2️⃣ Containerizing the Application**  

### **🛠️ Tools Used: Docker**  

The Task Manager API was packaged into a **Docker image** and pushed to a repository for deployment.  

#### **Building & Pushing the Docker Image**  
```bash
docker build -t myrepo/taskmanager:latest .
docker push myrepo/taskmanager:latest
```
📌 **Docker Build & Push Logs:**  
![build](https://github.com/user-attachments/assets/a1d4b024-cd3a-46f8-b6d9-51e635af8204)
 ![hub](https://github.com/user-attachments/assets/bf7fab06-9cf1-4f7e-8fa5-17656b9df600)
 

---

## **3️⃣ Kubernetes Deployment**  

### **Kubernetes Objects Used:**  
✔️ **Deployment** - Runs the Task Manager API  
✔️ **Service** - Exposes the API (Type: NodePort)  
✔️ **MongoDB Deployment & Service** - Manages MongoDB operations  
✔️ **Persistent Volume (PV)** - Ensures MongoDB data persistence  

```bash
kubetl get all
```
📌 **Deployed Resources:**  
![image](https://github.com/user-attachments/assets/8a632e2d-e3f0-4675-9f6f-c1d84af1d4de)


![image](https://github.com/user-attachments/assets/75568b72-75ca-4fa3-87d5-a1d906d1635e)

![kget](https://github.com/user-attachments/assets/be52bc1d-bbbf-4843-986b-108d21bceca5)

---

## **4️⃣ API Testing (cURL Requests)**  

### **✅ Ping API Test**  

GET and POST USING POSTMAN
📌 **Response:**  
![POST](https://github.com/user-attachments/assets/38c00511-de4c-4f6e-8792-853bc2182e23)

![kubget](https://github.com/user-attachments/assets/f53c66da-519b-4921-baa9-167947877a7a)



---

## **5️⃣ Dynamic Task Execution (BusyBox Pods)**  

Instead of running commands locally, a **BusyBox pod** is created dynamically for each task execution.  

### **Task Execution Process:**  
🔹 The system spawns a **BusyBox pod** dynamically upon task execution.  
🔹 The **task command runs** inside the BusyBox pod.  
🔹 Logs from the pod are **retrieved and stored** in MongoDB.  

```bash
k get event --sort-by=.metadata.creationTimestamp | tail -n 6
k logs <podname>
```
📌 **BusyBox Execution Logs:**  
![BusyBox Logs](SCREENSHOTS/busybox-creation.png)  
![BusyBox Execution](SCREENSHOTS/busybox-creation2.png)  

---

## **6️⃣ MongoDB Data Persistence with Persistent Volumes (PV)**  

A **Persistent Volume (PV)** ensures that MongoDB data is not lost, even if the pod is restarted or deleted.  

### **Testing Data Persistence:**  

1️⃣ **Delete the MongoDB Pod:**  
```bash
k describe pvc/<mongo-pvc>
k delete po/<mongo-pod-name>
```
📌 **MongoDB PVC Details:**  
![PVC Description](SCREENSHOTS/mongo-pvc.png)  

2️⃣ **Verify MongoDB Data Exists After Restart:**  
```bash
k get pod
k exec -it <mongo-db-pod> -- mongosh "mongodb://admin:password@mongodb-service:27017/taskdb?authSource=admin"
db.tasks.find().pretty()
```
📌 **Persistent Data Verification:**  
![MongoDB PVC Verification 1](SCREENSHOTS/mongo-pvc2.png)  
![MongoDB PVC Verification 2](SCREENSHOTS/mongo-pvc3.png)  

---

## **7️⃣ Conclusion**  

✅ The **Task Manager application** was successfully containerized and deployed in a **Minikube Kubernetes cluster**.  
✅ Tasks are executed dynamically using **BusyBox pods**, ensuring efficient execution.  
✅ **MongoDB data persistence** is maintained through **Persistent Volumes (PV)**.  

This deployment showcases **scalability, reliability, and dynamic execution** within a Kubernetes environment. 🚀  

---

This version improves readability, structure, and presentation. Let me know if you need any further refinements! 🚀
