# Doctor Listing Page

This project implements a dynamic Doctor Listing Page, enabling users to efficiently search, filter, and sort doctors based on data fetched from a single API call. All data manipulation occurs client-side, ensuring a responsive user experience.

## Features

### 1. Autocomplete Search Bar

* **Search Functionality:**
    * Displays the top 3 matching doctor names as suggestions.
    * Filters the doctor list upon clicking a suggestion or pressing Enter.
    * Hides the suggestion dropdown when no matches are found.
* **Implementation Highlights:**
    * Real-time, fully dynamic search filtering.
    * Built-in support for test automation:
        * `data-testid="autocomplete-input"` for the input field.
        * `data-testid="suggestion-item"` for each suggestion.

### 2. Filter Panel

* **Consultation Type:**
    * Single-select radio buttons to filter by:
        * "Video Consult" (`data-testid="filter-video-consult"`)
        * "In Clinic" (`data-testid="filter-in-clinic"`)
* **Specialties:**
    * Multi-select checkboxes for filtering by doctor specialties.
    * Specialties are dynamically populated from the fetched dataset.
    * Test automation support with `data-testid="filter-specialty-[Specialty Name]"` (e.g., `data-testid="filter-specialty-General-Physician"`).
* **Sort Options:**
    * Dropdown or radio buttons to sort the doctor list by:
        * Fees (ascending) (`data-testid="sort-fees"`)
        * Experience (descending) (`data-testid="sort-experience"`)
* **Clear All Filters:**
    * A dedicated "Clear All" button to reset all applied search terms and filters.

### 3. Doctor List

* **Dynamic Rendering:**
    * Displays a list of doctor cards based on the current search, filters, and sorting.
    * Visual feedback for data fetching states:
        * Loading spinner displayed during the initial API call.
        * "No doctors found" message shown when no doctors match the criteria.
* **Doctor Card:**
    * Each doctor card presents key information:
        * Doctor's Name (`data-testid="doctor-name"`)
        * Specialty/Specialties (`data-testid="doctor-specialty"`)
        * Years of Experience (`data-testid="doctor-experience"`)
        * Consultation Fee (`data-testid="doctor-fee"`)
    * Test automation support with `data-testid="doctor-card"` for the container.

### 4. Client-Side Filtering and Sorting

* All filtering, searching, and sorting operations are performed on the client-side after the initial API data retrieval.
* Filters are applied cumulatively, with the first applied filter narrowing down the subsequent filtering options.

### 5. Query Parameters for Filters

* The current state of applied filters and the search query are reflected in the browser's URL as query parameters.
* This enables users to:
    * Share specific filtered views via URL.
    * Retain their applied filters when navigating back and forward through the browser history.

## Highlights

* **Dynamic Specialties:** The list of available specialties in the filter panel is automatically generated based on the unique specialties present in the fetched doctor data.
* **Comprehensive Test Automation Support:** All specified `data-testid` attributes have been implemented to facilitate robust end-to-end testing.
* **Robust Error Handling:** The application gracefully handles potential API errors, ensuring a stable and functional user experience.

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Navigate to `http://localhost:3000` in your web browser.

## API Used

* **URL:** `https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json`
* **Method:** `GET` (The application fetches data using a single API call upon initial load.)

## Final Submission

All features outlined in the requirements have been successfully implemented. The Doctor Listing Page is fully functional and passes all defined test cases, providing a seamless and efficient way for users to find the right doctor.
