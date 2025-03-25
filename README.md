**Task Manager API**

Overview
This is a simple Task Manager API that allows users to create, read, update, and delete tasks.

Installation and Setup
Prerequisites
Node.js installed
MongoDB database running locally or on a cloud service

Steps to Install
Clone the repository
[git clone https://github.com/your-username/task-manager.git](https://github.com/hustlers9720/Task-Management.git)
cd task-manager
Install dependencies
npm install
Set up environment variables

Create a .env file in the root directory and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string

Run the server
node index.js
or  nodemon index.js

Server should be running at: http://localhost:5000

API Endpoints
**1. Get All Tasks
Endpoint: GET /task/get**
Response:
[
  {
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread",
    "completed": false
  }
]

**2. Add a New Task
Endpoint: POST /task/add
**
Request Body:
{
  "title": "New Task",
  "description": "Task description"
}

Response:
{
  "message": "Task added successfully"
}

**3. Edit a Task
Endpoint: PUT /task/edit/:id**

Request Body:
{
  "title": "Updated Task",
  "description": "Updated description"
}

Response:
{
  "message": "Task updated successfully"
}

**4. Delete a Task
Endpoint: DELETE /task/delete/:id**

Response:
{
  "message": "Task deleted successfully"
}

**5. Mark Task as Complete
Endpoint: PUT /task/edit-completed/:id**

Request Body:
{
  "completed": true
}

Response:
{
  "message": "Task marked as completed"
}

Testing the API using Postman
Steps to Test
Open Postman and create a new request.
Select the request type (GET, POST, PUT, DELETE).
Enter the API endpoint URL, e.g., http://localhost:5000/task/get.
For POST/PUT requests, go to the Body section and select raw > JSON format.
Enter the JSON data, e.g.,

{
  "title": "Complete Assignment",
  "description": "Submit by Friday"
}

Click Send to test the API.
Verify the response in the Response section.





