# PeachForward Backend

This is the backend server for the PeachForward news application, built with Node.js, Express, and MongoDB.

## Getting Started

Follow these steps to set up and run the server locally.

### Prerequisites

- Node.js and npm should be installed on your machine.
- MongoDB should be set up (you can use MongoDB Atlas or a local instance).

### Installation

1. Clone the repository:
   ```bash
      git clone https://github.com/<username>/PeachForward-Backend.git
      cd PeachForward-Backend

2. Install Dependencies
   ```bash
      npm install

3. Setup environment variables

   Create a .env file
   ```bash
   MONGO_URI=mongodb://localhost:27017
   MONGO_URI_TEST=mongodb://localhost:27017/test_db
   PORT=5000

4. Start the server
   ```bash
   npm start


## API Endpoints

1. **Get All Articles**
   - **Endpoint**: `GET /news`
   - **Description**: Retrieves a list of all news articles.
   - **Response**:
     - **Status**: `200 OK`
     - **Body**:
       ```json
       [
         {
           "_id": "article_id",
           "title": "Sample Title",
           "author": "Author Name",
           "content": "Article content",
           "timestamp": "2024-01-01T00:00:00.000Z"
         }
       ]
       ```

2. **Create New Article**
   - **Endpoint**: `POST /news`
   - **Description**: Creates a new news article.
   - **Request Body**:
     ```json
     {
       "title": "Sample Title",
       "author": "Author Name",
       "content": "Article content"
     }
     ```
   - **Response**:
     - **Status**: `201 Created`
     - **Body**:
       ```json
       {
         "_id": "article_id",
         "title": "Sample Title",
         "author": "Author Name",
         "content": "Article content",
         "timestamp": "2024-01-01T00:00:00.000Z"
       }
       ```
