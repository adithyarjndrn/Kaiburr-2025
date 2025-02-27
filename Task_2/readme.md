Here’s a refined and well-structured version of your Kubernetes deployment documentation with a professional touch:  

---

# **Kubernetes Deployment - Task 2**  
**Author: Adithya Rajendran**  

This task involves **containerizing** the Task Manager application and deploying it on a **Kubernetes cluster** using **Minikube**. The application runs inside the Minikube environment, with tasks executed dynamically through **BusyBox pods**. **MongoDB** is deployed with a **Persistent Volume (PV)** to ensure data persistence.  

---

## **1️⃣ Cluster Setup**  

The **Kubernetes cluster** was configured locally using **Minikube v1.33.1**, with **Docker** as the **Container Runtime Interface (CRI)**.  

To verify cluster status:  
```bash
alias k=kubectl
minikube status
```
📌 **Minikube status:**  
![Minikube Status](SCREENSHOTS/minikube-status.png)  

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
![Docker Build](SCREENSHOTS/dockerbuild-cmd.png)  
![Docker Hub Image](SCREENSHOTS/dockerimg-hub.png)  

---

## **3️⃣ Kubernetes Deployment**  

### **Kubernetes Objects Used:**  
✔️ **Deployment** - Runs the Task Manager API  
✔️ **Service** - Exposes the API (Type: NodePort)  
✔️ **MongoDB Deployment & Service** - Manages MongoDB operations  
✔️ **Persistent Volume (PV)** - Ensures MongoDB data persistence  

```bash
k get all
```
📌 **Deployed Resources:**  
![Manifest List](SCREENSHOTS/manifest-list.png)  
![Get All Resources](SCREENSHOTS/get-all.png)  

---

## **4️⃣ API Testing (cURL Requests)**  

### **✅ Ping API Test**  
```bash
curl -X GET http://<MINIKUBE-IP>:<PORT>/tasks/ping
```
📌 **Response:**  
![Ping Test](SCREENSHOTS/ping.png)  

### **✅ Create a Task (POST Request)**  
```bash
curl -X POST http://<MINIKUBE-IP>:<PORT>/tasks \
     -H "Content-Type: application/json" \
     -d '{
           "id": "123",
           "name": "K8s Task",
           "owner": "Adithya Rajendran",
           "command": "echo Kubernetes Running!"
         }'
```
📌 **Task Creation Response:**  
![POST Task](SCREENSHOTS/post-check.png)  

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
