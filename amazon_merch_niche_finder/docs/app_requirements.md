# Amazon Merch Niche Finder - Application Requirements

## 1. Overview

The primary goal of this application is to help Amazon Merch sellers identify potentially profitable niches by searching and analyzing product data directly from Amazon. The application will leverage a chosen Amazon scraping API (identified as "Real-time Amazon API" in the previous analysis due to its features and accessibility) to fetch real-time data and provide users with powerful filtering and analysis tools.

## 2. Functional Requirements

*   **FR1: Keyword/Category Search:** Users must be able to initiate searches on Amazon based on specific keywords (e.g., "funny cat t-shirt") and optionally filter by Amazon category ID.
*   **FR2: Marketplace Selection:** Users should be able to specify the target Amazon marketplace (e.g., US, UK, DE) for their searches, corresponding to the API's capabilities.
*   **FR3: Advanced Filtering:** Search results must be filterable by multiple criteria, including:
    *   Best Seller Rank (BSR) range (e.g., < 100,000).
    *   Price range.
    *   Number of reviews/ratings range.
    *   Product condition (e.g., New).
    *   Date added/published (if the chosen API supports this reliably).
*   **FR4: Results Display:** Search results should be displayed in a clear, sortable table or grid format, showing key information for each product:
    *   Thumbnail image.
    *   Product Title.
    *   Current Price.
    *   BSR.
    *   Average star rating and number of reviews.
    *   ASIN.
*   **FR5: Total Results Count:** The application must display the total number of results found for the search query (leveraging the `total_products` field from the recommended API) to help gauge niche size.
*   **FR6: Product Detail View:** Users should be able to click on a product in the results to view more detailed information (fetched via the API's Product Details endpoint), potentially including:
    *   Larger images.
    *   Full product description.
    *   Price history/chart (if available).
    *   BSR history/chart (if available).
    *   Variations (if applicable).
*   **FR7: Niche/Keyword Saving:** Users must be able to save specific search queries (keywords + filters) or individual ASINs identified as interesting for later review. This requires user accounts and a database.
*   **FR8: API Integration:** The application must securely and efficiently interact with the chosen Amazon scraping API (Real-time Amazon API), handling API keys and managing request limits (especially the free tier limit).

## 3. Non-Functional Requirements

*   **NFR1: Platform:** Web-based application accessible via modern browsers.
*   **NFR2: User Interface:** Intuitive, clean, and responsive user interface.
*   **NFR3: Performance:** Search and filtering operations should be reasonably fast, dependent on API response times.
*   **NFR4: Scalability:** The architecture should be designed with potential future user growth and increased API usage in mind (relevant for GCP deployment).
*   **NFR5: Security:** User authentication for saving niches; secure storage and handling of API keys.
*   **NFR6: Deployment:** The application must be deployable on Google Cloud Platform.

## 4. User Stories

*   **US1:** As a Merch seller, I want to search for "vintage hiking t-shirt" on Amazon.com so that I can understand the current market for this niche.
*   **US2:** As a Merch seller, after searching, I want to filter the results to show only products with a BSR under 50,000 and priced between $15 and $25, so I can focus on high-performing items in my target price range.
*   **US3:** As a Merch seller, I want to see the total number of search results matching my criteria so I can quickly assess if a niche is too saturated or too small.
*   **US4:** As a Merch seller, I want to click on a specific t-shirt from the search results to see its detailed description, BSR history, and customer reviews so I can evaluate its potential.
*   **US5:** As a Merch seller, I want to save the search query "retro gaming shirts | BSR < 100k" to a personal list so I can easily monitor this niche later.
*   **US6:** As a Merch seller, I want to log in to the application to access my saved niches and keywords.
