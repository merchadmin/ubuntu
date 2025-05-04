# Amazon Merch Niche Finder - Project Handoff README

## 1. Project Overview

This project aims to build a web application called "Amazon Merch Niche Finder". The application is designed to help Amazon Merch sellers identify potentially profitable niches by searching and analyzing product data fetched in real-time from Amazon using a third-party scraping API.

## 2. Current Status (As of May 04, 2025)

The initial planning, research, and foundational scripting phases are complete. Key accomplishments include:

*   **API Analysis:** Several Amazon scraping APIs on RapidAPI were analyzed. The "Real-time Amazon API" (by opendatapointcom) was selected as the primary API due to its functionality (including `Search` endpoint returning `total_products`) and accessibility (free tier without requiring a credit card for initial testing). See `docs/api_mapping_plan.md`.
*   **Requirements Definition:** Functional and non-functional requirements, along with user stories, have been defined. See `docs/app_requirements.md`.
*   **System Architecture:** A system architecture based on React (frontend), Flask (backend), MySQL (database), and deployment on Google Cloud Platform (GCP) has been designed. See `docs/system_architecture.md` and the visualization in `docs/architecture_diagram.md`.
*   **GCP Deployment Plan:** A detailed step-by-step guide for deploying the application to GCP has been created. See `docs/gcp_deployment_guide.md`.
*   **Initial API Script:** A basic Python script (`scripts/amazon_search.py`) has been implemented and tested. It successfully retrieves the RapidAPI key, calls the chosen API's `Search` endpoint, handles the response structure, performs basic BSR filtering (client-side), and saves raw/filtered results. See `api_results/` for sample output.
*   **Project Organization:** All generated files have been organized into the current directory structure.

**The project is now ready for the main application development phase (building the Flask backend and React frontend).**

## 3. Directory Structure

```
/amazon_merch_niche_finder
|-- docs/                 # All documentation files (requirements, architecture, API analysis, deployment)
|-- scripts/              # Python scripts (initial API interaction)
|-- api_results/          # Sample JSON results from API testing
|-- resources/
|   |-- screenshots/      # Screenshots from API analysis phase
|-- file_descriptions.md  # Descriptions of key files in the project
|-- README.md             # This file
|-- todo.md               # Checklist for the organization/handoff task (now complete)
```

For detailed descriptions of each file, please refer to `file_descriptions.md`.

## 4. Next Steps for Development (in VS Code)

The next AI model or developer should focus on building the application components based on the defined architecture and requirements:

1.  **Setup Development Environment:** Configure VS Code with appropriate extensions for Python (Flask) and JavaScript/TypeScript (React).
2.  **Backend Development (Flask):**
    *   Initialize a Flask project structure (potentially using the `create_flask_app` template mentioned in the knowledge base, adapted for this project's needs, or manually creating the structure outlined in `system_architecture.md`).
    *   Set up a virtual environment (`venv`).
    *   Implement API endpoints based on `app_requirements.md` (e.g., `/api/search`, `/api/auth/login`, `/api/niches`).
    *   Integrate the logic from `scripts/amazon_search.py` into the `/api/search` endpoint.
    *   Implement secure handling of the RapidAPI key (using environment variables, `.env` file for local dev, and integrating with GCP Secret Manager for deployment as per `gcp_deployment_guide.md`).
    *   Set up database models (SQLAlchemy) for users and saved niches.
    *   Implement user authentication (signup, login, token/session management - consider using GCP Identity Platform/Firebase Auth as suggested).
    *   Implement CRUD operations for saved niches.
3.  **Frontend Development (React):**
    *   Initialize a React project (e.g., using `create-react-app` or Vite).
    *   Build UI components for search input, filters, results display (table/grid), product details view, login/signup forms, and saved niches list.
    *   Implement state management.
    *   Connect UI components to the Flask backend API endpoints.
    *   Handle user authentication state in the frontend.
4.  **Database Setup (Local):** Set up a local MySQL database instance for development, mirroring the structure planned for Cloud SQL.
5.  **Testing:** Implement unit and integration tests for both backend and frontend.
6.  **Containerization:** Update/create Dockerfiles for both Flask and React applications as development progresses, following the examples in `gcp_deployment_guide.md`.

## 5. Setup Instructions (VS Code)

*   **Clone/Open Project:** Open this `amazon_merch_niche_finder` directory in VS Code.
*   **Python/Flask Backend:**
    *   Ensure you have Python 3.11+ installed.
    *   Create and activate a virtual environment: `python3.11 -m venv venv` and `source venv/bin/activate` (or `venv\Scripts\activate` on Windows).
    *   Install dependencies: `pip install -r requirements.txt` (Note: `requirements.txt` needs to be created based on the Flask app's dependencies as it's built).
    *   Install VS Code Python extension.
*   **JavaScript/React Frontend:**
    *   Ensure you have Node.js (e.g., v18+) and npm/yarn/pnpm installed.
    *   Navigate to the frontend project directory (once created).
    *   Install dependencies: `npm install` (or `yarn install` / `pnpm install`).
    *   Install VS Code extensions like ESLint, Prettier, etc.

## 6. API Key Handling

*   The initial script (`scripts/amazon_search.py`) currently has the RapidAPI key hardcoded for demonstration purposes. **This is NOT secure for production.**
*   **Local Development:** Use environment variables or a `.env` file (add `.env` to `.gitignore`) to store the `RAPIDAPI_KEY`.
*   **GCP Deployment:** Follow the instructions in `gcp_deployment_guide.md` to store the key in GCP Secret Manager and access it from the Flask application running on Cloud Run.
*   The necessary RapidAPI key is: `c8ba39d2a6mshf0803d154e8991fp1f6499jsne691828c465d` (Retrieved during previous steps).

This README provides the context and direction needed to continue the development of the Amazon Merch Niche Finder application.
