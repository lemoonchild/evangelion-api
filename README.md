# Evangelion Blog API
This project provides a RESTful API for a blog dedicated to the anime series Neon Genesis Evangelion. It allows users to interact with blog posts, including creating, reading, updating, and deleting entries related to Evangelion's universe, characters, theories, and news.

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js
- Docker
- MySQL

These tools are essential for setting up and running the API locally on your machine.

### Installation
To get started with the Evangelion Anime API on your local machine, follow these steps:

**Setting Up MySQL with Docker**
1. Build the MySQL Docker image:
```
docker build -t mysql-blog-image . 
```

2. Run the MySQL container:
```
docker run --name mysql-blog-container -d -p 3306:3306 mysql-blog-image
```

### Installing Dependencies
Install the necessary Node.js modules:
```
npm install
```
### Starting the API
Once the MySQL service is up and running, and the dependencies are installed, you can start the API with:
```
npm start
```

### Features
The API offers the following functionalities:

1. GET /posts: Fetches all posts published, displaying their  itle, content, author, category, and tags.
2. POST /posts: Creates a new post with the provided title, content, author, category, and tags.
3. GET /posts/{postId}: Retrieves a specific post by its ID.
4. PUT /posts/{postId}: Updates an existing post by ID with the provided information.
5. DELETE /posts/{postId}: Deletes a specific post by its ID.

### How to Use
To interact with the API, you can use tools like Postman or cURL. Below are examples of how to use each endpoint:

**Fetching All Posts:**
To fetch all posts, send a GET request to
```
GET http://localhost:5000/posts
```

**Creating a New Post:**
To create a new post, send a POST request to
```
POST http://localhost:5000/posts
```

Include the post details in the request body as JSON. Here is an example of the JSON format to use:

```
{
  "title": "The Impact of Evangelion on Anime",
  "content": "An in-depth analysis of how Neon Genesis Evangelion transformed the anime industry and influenced subsequent series.",
  "author": "Jane Doe",
  "category": "Analysis",
  "tags": "Evangelion, Anime, Impact"
}
```
**Retrieving a Specific Post by ID:**
To retrieve a specific post by its ID, replace {postId} with the actual post ID in the following GET request
```
GET http://localhost:5000/posts/{postId}
```
**Updating an Existing Post:**
To update an existing post by ID, replace {postId} with the actual post ID and include the updated post details in the request body as JSON
```
PUT http://localhost:5000/posts/{postId}
```
**Deleting a Specific Post:**
To delete a specific post by its ID, replace {postId} with the actual post ID in the following DELETE request
```
DELETE http://localhost:5000/posts/{postId}
```
### Contributing
We welcome contributions to the Evangelion Anime API! If you have suggestions or improvements, please open an issue or submit a pull request.
