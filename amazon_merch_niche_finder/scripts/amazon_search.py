import requests
import json
import os

# --- Configuration ---
# It's best practice to store API keys securely, e.g., in environment variables
# For this example, we'll retrieve it directly, but avoid hardcoding in production.
RAPIDAPI_KEY = "c8ba39d2a6mshf0803d154e8991fp1f6499jsne691828c465d" # Retrieved from browser session
API_HOST = "real-time-amazon-api.p.rapidapi.com"
SEARCH_ENDPOINT_URL = f"https://{API_HOST}/search"

HEADERS = {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": RAPIDAPI_KEY
}

def search_amazon(query, country="US", page=1, sort_by="RELEVANCE", category_id=None):
    """Performs a search on Amazon using the Real-time Amazon API.

    Args:
        query (str): The search keyword(s).
        country (str): The Amazon marketplace country code (e.g., 'US', 'DE', 'UK').
        page (int): The results page number.
        sort_by (str): Sorting criteria (e.g., 'RELEVANCE', 'PRICE_LOW_TO_HIGH').
        category_id (str, optional): Amazon category ID to narrow down the search.

    Returns:
        dict: The parsed JSON response from the API, or None if an error occurs.
    """
    params = {
        "query": query,
        "country": country.upper(),
        "page": str(page),
        "sort_by": sort_by
    }
    if category_id:
        params["category_id"] = category_id

    print(f"Sending request to: {SEARCH_ENDPOINT_URL}")
    print(f"Params: {params}")

    response = None # Initialize response to None
    try:
        response = requests.get(SEARCH_ENDPOINT_URL, headers=HEADERS, params=params)
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

        print(f"API Response Status Code: {response.status_code}")
        # Try to parse JSON, return None if it fails
        try:
            return response.json()
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
            print(f"Response content (first 500 chars): {response.text[:500]}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error during API request: {e}")
        if response is not None:
            print(f"Response content (first 500 chars): {response.text[:500]}")
        return None

# --- Example Usage & Basic Filtering ---
if __name__ == "__main__":
    search_query = "funny cat t-shirt"
    target_country = "US"
    max_bsr = 100000

    print(f"--- Starting Amazon Search for '{search_query}' in {target_country} ---")
    api_result = search_amazon(query=search_query, country=target_country)

    # Print the raw result for inspection before processing
    if api_result is not None:
        print("\n--- Raw API Response --- (First 1000 chars)")
        try:
            raw_json_str = json.dumps(api_result, indent=4)
            print(raw_json_str[:1000] + ("..." if len(raw_json_str) > 1000 else ""))
        except Exception as e:
            print(f"Could not print raw JSON: {e}")
            print(str(api_result)[:1000] + ("..." if len(str(api_result)) > 1000 else "")) # Print as is if JSON dumping fails
        print("--- End Raw API Response ---\n")
    else:
        print("API call failed or returned None.")
        exit()

    # --- Process the result ---
    products = None
    total_products_reported = "N/A"

    # Attempt 1: Check if 'data' exists and contains 'products'
    data = api_result.get("data")
    if data and isinstance(data, dict):
        products = data.get("products")
        total_products_reported = data.get('total_products', 'N/A')

    # Attempt 2: If not found in 'data', check if 'products' exists at the root level
    if products is None:
        products = api_result.get("products")
        total_products_reported = api_result.get('total_products', 'N/A')

    # Proceed only if products list was found and is a list
    if products is not None and isinstance(products, list):
        print(f"Successfully retrieved data. Total results reported: {total_products_reported}")
        filtered_products = []

        print(f"\n--- Filtering results (Client-side) for BSR < {max_bsr} ---")
        for product in products:
            bsr_info = product.get("best_selling_rank", [])
            current_bsr = None
            if bsr_info and isinstance(bsr_info, list) and len(bsr_info) > 0:
                # Assuming the first rank listed is the most relevant/current
                rank_data = bsr_info[0]
                if isinstance(rank_data, dict):
                     current_bsr = rank_data.get("rank")

            # Filter logic: Check if BSR exists and is below the threshold
            if current_bsr is not None and isinstance(current_bsr, int) and current_bsr < max_bsr:
                filtered_products.append(product)
                print(f"  - Found: '{product.get('product_title', 'N/A')[:50]}...' (ASIN: {product.get('asin', 'N/A')}, BSR: {current_bsr})")
            # Optional: Print products skipped due to missing/invalid BSR or exceeding threshold
            # else:
            #     print(f"  - Skipped: '{product.get('product_title', 'N/A')[:50]}...' (ASIN: {product.get('asin', 'N/A')}, BSR: {current_bsr})")

        print(f"\n--- Summary ---")
        print(f"Total products received from API (page 1): {len(products)}")
        print(f"Products matching BSR < {max_bsr}: {len(filtered_products)}")

        # Save raw and filtered results to files
        raw_output_file = "/home/ubuntu/amazon_search_raw_results.json"
        filtered_output_file = "/home/ubuntu/amazon_search_filtered_results.json"

        try:
            with open(raw_output_file, 'w') as f:
                json.dump(api_result, f, indent=4)
            print(f"Raw API results saved to {raw_output_file}")
        except IOError as e:
            print(f"Error saving raw results: {e}")

        try:
            with open(filtered_output_file, 'w') as f:
                json.dump(filtered_products, f, indent=4)
            print(f"Filtered results saved to {filtered_output_file}")
        except IOError as e:
            print(f"Error saving filtered results: {e}")

    else:
        print("Failed to process data: Could not find 'products' list in the API response.")

