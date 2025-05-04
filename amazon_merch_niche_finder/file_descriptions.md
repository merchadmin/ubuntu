# File Descriptions

This document provides descriptions for the key files within the `amazon_merch_niche_finder` project.

## Root Directory (`/`)

*   **`todo.md`**: A checklist tracking the progress of the project organization and handoff task.

## Documentation (`/docs`)

*   **`api_mapping_plan.md`**: Details the analysis and comparison of various Amazon scraping APIs found on RapidAPI, including free plan availability, pricing, endpoint testing results, and final recommendations. Includes analysis of APIs from user-provided screenshots.
*   **`app_requirements.md`**: Defines the functional and non-functional requirements for the Amazon Merch Niche Finder application, along with user stories illustrating key use cases.
*   **`architecture_diagram.md`**: Contains a Mermaid diagram visualizing the system architecture, showing components like the frontend, backend, database, external API, and GCP services.
*   **`gcp_deployment_guide.md`**: Provides step-by-step instructions for deploying the application (Flask backend, React frontend, MySQL database) to Google Cloud Platform, covering Cloud Run, Cloud SQL, Secret Manager, and containerization.
*   **`system_architecture.md`**: Describes the proposed system architecture, technology stack (React, Flask, MySQL, GCP), component responsibilities, information flow examples (search, login, save niche), and deployment strategy.

## Scripts (`/scripts`)

*   **`amazon_search.py`**: A Python script demonstrating initial implementation using the "Real-time Amazon API". It performs a product search based on keywords, retrieves results, attempts to filter them based on Best Seller Rank (BSR), and saves both raw and filtered results to JSON files. Includes logic to handle different API response structures.

## API Results (`/api_results`)

*   **`amazon_search_raw_results.json`**: Contains the raw JSON response received from the "Real-time Amazon API" during the test execution of `amazon_search.py` for the query "funny cat t-shirt".
*   **`amazon_search_filtered_results.json`**: Contains the list of products filtered from the raw results by `amazon_search.py` based on the BSR < 100,000 criterion (empty in the example run as no products met the criteria on the first page).

## Resources (`/resources/screenshots`)

*   Contains various screenshots (`.png`, `.webp`) captured during the API analysis phase on RapidAPI, showing API details, pricing pages, endpoint testing interfaces, and results. These were used as references for the API analysis documentation.
