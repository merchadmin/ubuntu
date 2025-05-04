# Amazon Merch Niche Finder - Google Cloud Deployment Guide

## 1. Overview

This guide provides step-by-step instructions for deploying the Amazon Merch Niche Finder application (Flask backend, React frontend, MySQL database) to Google Cloud Platform (GCP). It assumes the application code follows the structure outlined in `system_architecture.md`.

## 2. Prerequisites

*   **Google Cloud Account:** You need an active GCP account with billing enabled.
*   **Google Cloud SDK (gcloud):** Install and initialize the `gcloud` command-line tool: [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
*   **Docker:** Install Docker Desktop or Docker Engine: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
*   **Git:** Install Git for version control: [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
*   **Application Code:** Your Flask backend and React frontend code should be ready and preferably stored in a Git repository (e.g., GitHub, Cloud Source Repositories).
*   **RapidAPI Key:** Obtain your API key for the "Real-time Amazon API" from RapidAPI.

## 3. GCP Project Setup

1.  **Create Project:**
    *   Go to the GCP Console: [https://console.cloud.google.com/](https://console.cloud.google.com/)
    *   Create a new project or select an existing one.
    *   Note your **Project ID**.
    *   Set your project in `gcloud`:
        ```bash
        gcloud config set project YOUR_PROJECT_ID
        ```
2.  **Enable APIs:** Enable the necessary APIs for your project:
    ```bash
    gcloud services enable run.googleapis.com \n        sqladmin.googleapis.com \n        secretmanager.googleapis.com \n        artifactregistry.googleapis.com \n        cloudbuild.googleapis.com \n        iam.googleapis.com
    # Optional: Enable Identity Platform if using it for auth
    # gcloud services enable identityplatform.googleapis.com
    ```

## 4. Database Setup (Cloud SQL for MySQL)

1.  **Create Instance:**
    *   Navigate to Cloud SQL in the GCP Console.
    *   Click "Create Instance" and choose "MySQL".
    *   Provide an **Instance ID** (e.g., `merch-db`).
    *   Set a strong **root password** (save this securely).
    *   Choose a region close to your users/other services.
    *   Select a machine type (e.g., `db-f1-micro` for development/testing).
    *   Under "Connectivity", ensure "Public IP" is enabled initially for easier setup (you can restrict later). Add your current IP address to "Authorized networks" for direct access during setup if needed.
    *   Click "Create Instance". Wait for it to become available.
2.  **Create Database & User:**
    *   Select the newly created instance.
    *   Go to the "Databases" tab and click "Create database". Name it (e.g., `merch_app_db`).
    *   Go to the "Users" tab and click "Create user account". Create a dedicated user for your application (e.g., `merch_app_user`) and set a strong password (save this securely).
3.  **Note Connection Name:** Go to the instance "Overview" tab and copy the **Connection name** (format: `PROJECT_ID:REGION:INSTANCE_ID`). You will need this later.

## 5. Secret Management (RapidAPI Key)

1.  **Create Secret:**
    *   Navigate to Secret Manager in the GCP Console.
    *   Click "Create Secret".
    *   Give it a name (e.g., `rapidapi-key`).
    *   In the "Secret value" field, paste your RapidAPI key.
    *   Click "Create Secret".
2.  **Grant Access (Cloud Run Service Account):** By default, Cloud Run services run as the Compute Engine default service account. You need to grant this account access to the secret.
    *   Find your Compute Engine default service account email (usually `PROJECT_NUMBER-compute@developer.gserviceaccount.com`) in the IAM section.
    *   Go back to Secret Manager, select your `rapidapi-key` secret.
    *   Go to the "Permissions" tab.
    *   Click "Add Principal".
    *   Enter the service account email.
    *   Assign the role "Secret Manager Secret Accessor".
    *   Click "Save".

## 6. Backend (Flask) Setup & Containerization

1.  **Project Structure (using `create_flask_app`):** Ensure your Flask app follows the template structure, especially `src/main.py`.
2.  **Install Dependencies:**
    ```bash
    # Activate virtual environment (if not already)
    # source venv/bin/activate
    pip install Flask Flask-SQLAlchemy PyMySQL google-cloud-secret-manager python-dotenv
    # Add other dependencies...
    pip freeze > requirements.txt
    ```
3.  **Configure `src/main.py`:**
    *   Modify `src/main.py` to connect to Cloud SQL and access Secret Manager.
    ```python
    import sys
    import os
    sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
    from flask import Flask # ... other imports
    from google.cloud import secretmanager
    import dotenv

    dotenv.load_dotenv()
    app = Flask(__name__)

    # --- Database Configuration ---
    db_user = os.environ.get("DB_USER")
    db_pass = os.environ.get("DB_PASS")
    db_name = os.environ.get("DB_NAME")
    # Use Cloud SQL Python Connector socket path when deployed
    db_socket_dir = os.environ.get("DB_SOCKET_DIR", "/cloudsql")
    cloud_sql_connection_name = os.environ.get("CLOUD_SQL_CONNECTION_NAME")

    if cloud_sql_connection_name:
        # Deployed on Cloud Run with Cloud SQL connection
        app.config['SQLALCHEMY_DATABASE_URI'] = (
            f"mysql+pymysql://{db_user}:{db_pass}@/{db_name}?unix_socket="
            f"{db_socket_dir}/{cloud_sql_connection_name}"
        )
    else:
        # Local development (adjust host/port if needed)
        db_host = os.environ.get("DB_HOST", "127.0.0.1")
        db_port = os.environ.get("DB_PORT", "3306")
        app.config['SQLALCHEMY_DATABASE_URI'] = (
            f"mysql+pymysql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
        )

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # Initialize SQLAlchemy: db = SQLAlchemy(app)

    # --- Secret Manager Configuration ---
    def get_rapidapi_key():
        secret_id = "rapidapi-key" # Name of your secret
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("UTF-8")

    # In your API call logic:
    # rapidapi_key = get_rapidapi_key()
    # headers = { "X-RapidAPI-Key": rapidapi_key, ... }

    # ... your Flask routes (e.g., from src.routes) ...

    if __name__ == '__main__':
        # Listen on 0.0.0.0 and port defined by Cloud Run
        port = int(os.environ.get('PORT', 8080))
        app.run(host='0.0.0.0', port=port)
    ```
4.  **Create `.env` file (for local development):**
    ```
    DB_USER=merch_app_user
    DB_PASS=YOUR_DB_USER_PASSWORD
    DB_NAME=merch_app_db
    DB_HOST=127.0.0.1 # Or your Cloud SQL Public IP for local testing
    DB_PORT=3306
    GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
    # CLOUD_SQL_CONNECTION_NAME=YOUR_CONNECTION_NAME # Only needed when deployed
    ```
5.  **Create `Dockerfile` (in the root of the Flask project):**
    ```dockerfile
    # Use official Python runtime as a parent image
    FROM python:3.11-slim

    # Set environment variables
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONUNBUFFERED 1

    # Set work directory
    WORKDIR /app

    # Install dependencies
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt

    # Copy project code
    COPY . .

    # Expose port and run app
    EXPOSE 8080
    CMD ["python", "src/main.py"]
    ```
6.  **Build & Push Image:**
    *   Configure Docker to authenticate with Artifact Registry (or GCR):
        ```bash
        gcloud auth configure-docker YOUR_REGION-docker.pkg.dev
        ```
    *   Create an Artifact Registry repository (if you haven't):
        ```bash
        gcloud artifacts repositories create backend-repo --repository-format=docker \
            --location=YOUR_REGION --description="Flask backend images"
        ```
    *   Build the image:
        ```bash
        export IMAGE_TAG=YOUR_REGION-docker.pkg.dev/YOUR_PROJECT_ID/backend-repo/flask-backend:v1
        docker build -t $IMAGE_TAG .
        ```
    *   Push the image:
        ```bash
        docker push $IMAGE_TAG
        ```

## 7. Frontend (React) Setup & Containerization

1.  **Project Structure:** Use `create_react_app` or similar.
2.  **Configure API URL:** Modify your frontend code to fetch data from the backend API. Use an environment variable for the backend URL.
    *   Example using `.env`:
        ```
        REACT_APP_BACKEND_API_URL=http://localhost:8080/api # For local dev
        ```
    *   In your code: `const apiUrl = process.env.REACT_APP_BACKEND_API_URL;`
3.  **Create `Dockerfile` (in the root of the React project):**
    ```dockerfile
    # Stage 1: Build the React app
    FROM node:18-alpine as build
    WORKDIR /app
    COPY package.json ./package.json
    COPY package-lock.json ./package-lock.json # Or yarn.lock / pnpm-lock.yaml
    # Use npm, yarn, or pnpm as appropriate
    RUN npm install
    COPY . .
    # Set the backend API URL during build time (adjust if needed)
    ARG REACT_APP_BACKEND_API_URL
    ENV REACT_APP_BACKEND_API_URL=$REACT_APP_BACKEND_API_URL
    RUN npm run build

    # Stage 2: Serve static files with Nginx
    FROM nginx:stable-alpine
    COPY --from=build /app/build /usr/share/nginx/html
    # Copy nginx config if needed (e.g., for routing)
    # COPY nginx.conf /etc/nginx/conf.d/default.conf
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```
4.  **Build & Push Image:**
    *   Create an Artifact Registry repository:
        ```bash
        gcloud artifacts repositories create frontend-repo --repository-format=docker \
            --location=YOUR_REGION --description="React frontend images"
        ```
    *   Build the image (pass the backend URL build argument later during Cloud Build or deployment):
        ```bash
        export IMAGE_TAG=YOUR_REGION-docker.pkg.dev/YOUR_PROJECT_ID/frontend-repo/react-frontend:v1
        # Example: docker build --build-arg REACT_APP_BACKEND_API_URL=https://your-backend-url.run.app -t $IMAGE_TAG .
        docker build -t $IMAGE_TAG .
        ```
    *   Push the image:
        ```bash
        docker push $IMAGE_TAG
        ```

## 8. Deployment to Cloud Run

1.  **Deploy Backend Service:**
    ```bash
    gcloud run deploy flask-backend \
        --image YOUR_REGION-docker.pkg.dev/YOUR_PROJECT_ID/backend-repo/flask-backend:v1 \
        --platform managed \
        --region YOUR_REGION \
        --allow-unauthenticated \ # Or configure authentication
        --add-cloudsql-instances YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID \
        --set-env-vars DB_USER=merch_app_user \
        --set-env-vars DB_PASS=YOUR_DB_USER_PASSWORD \
        --set-env-vars DB_NAME=merch_app_db \
        --set-env-vars CLOUD_SQL_CONNECTION_NAME=YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID \
        --set-env-vars GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
    ```
    *   Note the **Service URL** provided after deployment (e.g., `https://flask-backend-xyz.a.run.app`).
2.  **Deploy Frontend Service:**
    ```bash
    # Replace with your actual backend service URL
    export BACKEND_URL=https://flask-backend-xyz.a.run.app

    gcloud run deploy react-frontend \
        --image YOUR_REGION-docker.pkg.dev/YOUR_PROJECT_ID/frontend-repo/react-frontend:v1 \
        --platform managed \
        --region YOUR_REGION \
        --allow-unauthenticated \
        --set-env-vars REACT_APP_BACKEND_API_URL=$BACKEND_URL/api # Pass the backend URL
    ```
    *   Access the **Service URL** provided for the frontend service in your browser.

## 9. (Optional) Authentication Setup

*   Consider using **GCP Identity Platform** or **Firebase Authentication** for a managed user auth solution.
*   Configure your chosen provider.
*   Update the Flask backend to validate tokens from the provider.
*   Update the React frontend to use the provider's SDK for login/signup flows.
*   Secure your Cloud Run services by setting `--no-allow-unauthenticated` and configuring IAM invoker roles if needed.

## 10. (Optional) CI/CD with Cloud Build

1.  **Create `cloudbuild.yaml`:** Define build steps for both frontend and backend in your repository root.
    ```yaml
    steps:
    # Build Backend
    - name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/backend-repo/flask-backend:$SHORT_SHA', './backend'] # Assuming backend code is in ./backend
      id: 'Build Backend'
    # Build Frontend
    - name: 'gcr.io/cloud-builders/docker'
      args: [
        'build',
        '--build-arg', 'REACT_APP_BACKEND_API_URL=https://flask-backend-xyz.a.run.app/api', # Use deployed backend URL
        '-t', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/frontend-repo/react-frontend:$SHORT_SHA',
        './frontend' # Assuming frontend code is in ./frontend
      ]
      id: 'Build Frontend'
    # Push Backend
    - name: 'gcr.io/cloud-builders/docker'
      args: ['push', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/backend-repo/flask-backend:$SHORT_SHA']
      waitFor: ['Build Backend']
    # Push Frontend
    - name: 'gcr.io/cloud-builders/docker'
      args: ['push', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/frontend-repo/react-frontend:$SHORT_SHA']
      waitFor: ['Build Frontend']
    # Deploy Backend
    - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
      entrypoint: gcloud
      args: [
          'run', 'deploy', 'flask-backend',
          '--image', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/backend-repo/flask-backend:$SHORT_SHA',
          '--region', 'YOUR_REGION',
          '--platform', 'managed',
          '--add-cloudsql-instances', 'YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID',
          # Add other env vars and flags as in manual deployment
      ]
    # Deploy Frontend
    - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
      entrypoint: gcloud
      args: [
          'run', 'deploy', 'react-frontend',
          '--image', 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/frontend-repo/react-frontend:$SHORT_SHA',
          '--region', 'YOUR_REGION',
          '--platform', 'managed',
          # Add other env vars and flags as in manual deployment
      ]
    images:
    - 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/backend-repo/flask-backend:$SHORT_SHA'
    - 'YOUR_REGION-docker.pkg.dev/$PROJECT_ID/frontend-repo/react-frontend:$SHORT_SHA'
    ```
2.  **Connect Repository & Create Trigger:**
    *   Go to Cloud Build in the GCP Console.
    *   Connect your Git repository (GitHub, Cloud Source Repositories, etc.).
    *   Create a trigger that runs the `cloudbuild.yaml` file on pushes to a specific branch (e.g., `main`).

## 11. Final Steps & Considerations

*   **Domain Mapping:** Map a custom domain to your Cloud Run frontend service.
*   **Monitoring & Logging:** Utilize Cloud Logging and Cloud Monitoring to observe application performance and errors.
*   **Security Hardening:** Restrict Cloud SQL access, configure firewalls, review IAM permissions.
*   **Cost Management:** Monitor GCP costs and set up budgets/alerts.
