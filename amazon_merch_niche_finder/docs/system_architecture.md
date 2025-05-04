# Amazon Merch Niche Finder - System Architecture & Information Flow

## 1. Overview

This document outlines the proposed system architecture for the Amazon Merch Niche Finder application. The architecture is designed to meet the functional and non-functional requirements defined in `app_requirements.md`, focusing on a web-based platform deployable on Google Cloud Platform (GCP).

## 2. Technology Stack

*   **Frontend:** React (using `create_react_app` template for structure, potentially Vite for speed) - For building the user interface.
*   **Backend:** Flask (using `create_flask_app` template) - Python framework to handle API logic, user management, and database interactions.
*   **Database:** MySQL (hosted on GCP Cloud SQL) - To store user accounts and saved niche/keyword data.
*   **External API:** Real-time Amazon API (via RapidAPI) - Primary source for Amazon product data.
*   **Deployment Platform:** Google Cloud Platform (GCP)
    *   Cloud Run: For hosting the containerized Flask backend and React frontend.
    *   Cloud SQL: Managed MySQL database service.
    *   Secret Manager: To securely store the RapidAPI key.
    *   Identity Platform / Firebase Authentication (Optional but Recommended): For managing user authentication.
    *   Cloud Build: For CI/CD pipeline.

## 3. Architecture Components

1.  **Client (Web Browser):** Users interact with the application through a web browser accessing the React frontend.
2.  **Frontend (React Application):**
    *   Hosted on GCP Cloud Run (or Firebase Hosting/Cloud Storage).
    *   Provides the user interface for searching, filtering, viewing results, and managing saved niches.
    *   Handles user input and state management.
    *   Communicates with the Backend API via HTTP requests (RESTful API).
    *   Manages user authentication state (e.g., storing JWT tokens).
3.  **Backend (Flask API):**
    *   Hosted as a container on GCP Cloud Run.
    *   Exposes a RESTful API for the frontend.
    *   **Responsibilities:**
        *   User Authentication & Authorization: Handles user signup, login, and verifies user sessions/tokens (potentially delegating to GCP Identity Platform).
        *   API Gateway Logic: Receives search/filter requests from the frontend.
        *   External API Interaction: Securely fetches data from the Real-time Amazon API using the key stored in Secret Manager.
        *   Data Processing: Parses, filters, and formats data received from the external API before sending it to the frontend.
        *   Database Interaction: Connects to the Cloud SQL database to manage user accounts and saved niche data (CRUD operations).
4.  **Database (GCP Cloud SQL - MySQL):**
    *   Stores persistent data:
        *   `users` table: User ID, username, hashed password, email, etc.
        *   `saved_niches` table: Niche ID, user ID (foreign key), search keywords, filter parameters (JSON or separate columns), timestamp.
5.  **External Services:**
    *   **Real-time Amazon API (RapidAPI):** Provides the core Amazon product data via HTTP requests.
    *   **GCP Secret Manager:** Securely stores the RapidAPI key accessed by the Flask backend.
    *   **GCP Identity Platform / Firebase Auth (Optional):** Provides managed user authentication services.

## 4. Information Flow Examples

### 4.1. User Search

1.  **User Input:** User enters search keywords (e.g., "cat shirt") and applies filters (e.g., BSR < 100k, Marketplace: US) in the React frontend.
2.  **Frontend Request:** React app sends an authenticated POST request to the Flask backend API endpoint (e.g., `/api/search`) with the search parameters.
3.  **Backend Processing:**
    *   Flask backend authenticates the user via token.
    *   Retrieves the RapidAPI key from GCP Secret Manager.
    *   Constructs the request URL and headers for the Real-time Amazon API (`Search` endpoint).
4.  **External API Call:** Flask backend sends the request to the Real-time Amazon API.
5.  **External API Response:** Real-time Amazon API returns product data (JSON).
6.  **Backend Response:** Flask backend processes the JSON, extracts relevant fields (`total_products`, product list, etc.), and sends a formatted JSON response back to the React frontend.
7.  **Frontend Display:** React app receives the data and updates the UI to display the search results table/grid and the total results count.

### 4.2. User Login

1.  **User Input:** User enters username/password in the React frontend.
2.  **Frontend Request:** React app sends a POST request to the Flask backend endpoint (e.g., `/api/auth/login`) with credentials.
3.  **Backend Authentication:**
    *   Flask backend retrieves the user record from the Cloud SQL database based on the username.
    *   Compares the provided password hash with the stored hash.
    *   If valid, generates a JWT token (or uses session from Identity Platform).
4.  **Backend Response:** Flask backend sends the JWT token (or session confirmation) back to the React frontend.
5.  **Frontend State Update:** React app stores the token (e.g., in localStorage) and updates the UI to reflect the logged-in state.

### 4.3. Save Niche

1.  **User Action:** User clicks a "Save" button for the current search/filters in the React frontend.
2.  **Frontend Request:** React app sends an authenticated POST request to the Flask backend endpoint (e.g., `/api/niches`) with the niche details (keywords, filters).
3.  **Backend Processing:**
    *   Flask backend authenticates the user.
    *   Validates the niche data.
4.  **Database Interaction:** Flask backend inserts a new record into the `saved_niches` table in Cloud SQL, associating it with the authenticated user's ID.
5.  **Backend Response:** Flask backend sends a success confirmation (e.g., 201 Created) back to the React frontend.
6.  **Frontend Feedback:** React app provides feedback to the user (e.g., "Niche saved!").

## 5. Deployment Strategy (GCP)

*   **Containerization:** Both Flask backend and React frontend will be containerized using Docker.
*   **Backend Deployment:** Deploy the Flask container to Cloud Run, configured to access Cloud SQL and Secret Manager.
*   **Frontend Deployment:** Deploy the React container to Cloud Run (or build static files and deploy to Firebase Hosting/Cloud Storage).
*   **Database:** Provision a Cloud SQL for MySQL instance, configure networking for access from Cloud Run.
*   **Secrets:** Store the RapidAPI key in GCP Secret Manager.
*   **CI/CD:** Set up Cloud Build triggers to automatically build and deploy containers upon code changes in a Git repository (e.g., GitHub, Cloud Source Repositories).
