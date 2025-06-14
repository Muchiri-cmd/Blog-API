# Blog API

This is simple RESTful API for a blogging platform that allows users to create, read, update, and delete blog posts built with Express.js, Prisma ORM, and PostgreSQL.

## Technologies Used

- **Express.js**: Web framework for Node.js
- **Prisma**: Modern database ORM
- **PostgreSQL**: Relational database
- **Node.js**: JavaScript runtime

## API Endpoints

### Users

#### GET /users

- Returns a list of all users

```json
// Response
[
  {
    "id": "1d66c657-b3fa-4764-b6e1-93f227089c64uuid",
    "firstName": "John",
    "lastName": "Doe",
    "emailAddress": "john@example.com",
    "username": "johndoe"
  }
]
```

#### GET /users/:id

- Returns a single user by ID

```json
// Response
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "username": "johndoe"
}
```

#### POST /users

- Creates a new user

```json
// Request Body
{
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "username": "johndoe"
}
```

### Posts

#### GET /posts

- Returns all active (non-deleted) blog posts

```json
// Response
[
  {
    "id": "cf3d929f-a628-4212-bab0-8d278682773auuid",
    "title": "My First Post",
    "content": "Hello World!",
    "authorId": "1d66c657-b3fa-4764-b6e1-93f227089c64",
    "createdAt": "2025-06-20T10:00:00Z",
    "lastUpdated": "2025-06-20T10:00:00Z",
    "isDeleted": false
  }
]
```

#### GET /posts/:id

- Returns a single blog post by ID

```json
// Response
{
  "id": "uuid",
  "title": "My First Post",
  "content": "Hello World!",
  "authorId": "user-uuid",
  "createdAt": "2025-06-20T10:00:00Z",
  "lastUpdated": "2025-06-20T10:00:00Z",
  "isDeleted": false
}
```

#### POST /posts

- Creates a new blog post

```json
// Request Body
{
  "title": "My First Post",
  "content": "Hello World!",
  "authorId": "cf3d929f-a628-4212-bab0-8d278682773a"
}
```

#### PUT /posts/:id

- Updates an existing blog post

```json
// Request Body
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### DELETE /posts/:id

- Soft deletes a blog post (sets isDeleted flag to true)

```json
// Response
{
  "message": "Post deleted successfully"
}
```
