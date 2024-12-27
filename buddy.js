// Load existing data into localStorage if not already present
if (!localStorage.getItem("travelData")) {
    const initialData = [
        { name: "Arjun Sharma", contact: "arjun@example.com", destination: "Manali", interests: "Adventure", travelDates: "2025-04-10" },
        // Add more entries as needed
    ];
    localStorage.setItem("travelData", JSON.stringify(initialData));
}

// Add new travel data from the form on data.html
const addTravelForm = document.querySelector(".addTravelForm");
if (addTravelForm) {
    addTravelForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const destination = document.getElementById("destination").value;
        const interests = document.getElementById("interests").value;
        const travelDates = document.getElementById("travelDates").value;

        // New entry to be added
        const newEntry = { name, contact, destination, interests, travelDates };

        // Get existing data from localStorage and add the new entry
        const data = JSON.parse(localStorage.getItem("travelData")) || [];
        data.push(newEntry);

        // Store updated data back to localStorage
        localStorage.setItem("travelData", JSON.stringify(data));

        // Show success message
        alert("Travel data added successfully!");

        // Redirect to the first page (e.g., travel.html)
        window.location.href = "travel.html";
    });
}


// Handle search functionality from companion.html
const searchForm = document.querySelector(".form");
if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get values from the form and trim spaces
        const destination = document.getElementById("destination").value.trim().toLowerCase(); // Remove spaces and make lowercase
        const interests = document.getElementById("interests").value.trim(); // Remove spaces
        const travelDateInput = document.getElementById("travel-date").value.trim();

        // Ensure the travel date input is in the correct format
        const travelDate = new Date(travelDateInput).toISOString().split('T')[0]; // Convert to ISO format (YYYY-MM-DD)

        // Get travel data from localStorage (including the initial data if it's not already present)
        const data = JSON.parse(localStorage.getItem("travelData")) || initialData;

        // Log the inputs for debugging
        console.log("Search Inputs:", { destination, interests, travelDate });

        // Check if all fields are filled
        if (!destination || !interests || !travelDate) {
            alert("Please fill in all the search criteria.");
            return;
        }

        // Filter data based on search criteria
        const results = data.filter((entry) => {
            // Convert stored travel date to the same format for comparison
            const entryDate = new Date(entry.travelDates).toISOString().split('T')[0]; // Convert stored date to ISO format

            // Log the entries and comparisons for debugging
            console.log("Entry:", entry);
            console.log("Comparing:", {
                destinationMatch: entry.destination.toLowerCase() === destination,
                interestsMatch: entry.interests === interests,
                travelDateMatch: entryDate === travelDate
            });

            // Return true if all conditions match
            return (
                entry.destination.toLowerCase() === destination &&
                entry.interests === interests &&
                entryDate === travelDate
            );
        });

        // Log the results to see what matches
        console.log("Search Results:", results);

        // Save search results to localStorage
        localStorage.setItem("searchResults", JSON.stringify(results));

        // Redirect to results.html
        window.location.href = "result.html";
    });
}


if (window.location.pathname.endsWith("result.html")) {
    const resultsContainer = document.getElementById("results");
    const results = JSON.parse(localStorage.getItem("searchResults")) || [];

    if (results.length > 0) {
        results.forEach((result) => {
            const resultElement = document.createElement("div");
            resultElement.classList.add("result");
            resultElement.innerHTML = 
                `<p><strong>Name:</strong> ${result.name}</p>
                <p><strong>Contact:</strong> ${result.contact}</p>
                <p><strong>Destination:</strong> ${result.destination}</p>
                <p><strong>Interests:</strong> ${result.interests}</p>
                <p><strong>Travel Dates:</strong> ${result.travelDates}</p>`;
            resultsContainer.appendChild(resultElement);
        });
    } else {
        resultsContainer.innerHTML = "<p>No matches found. Try a different search.</p>";
    }
}
