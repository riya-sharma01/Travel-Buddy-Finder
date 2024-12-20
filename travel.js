function saveTravelData(name, contact, destination, interests, travelDates) {
    const travelData = {
        name,
        contact,
        destination,
        interests,
        travelDates
    };

    // Retrieve existing travel data from localStorage
    let travelList = JSON.parse(localStorage.getItem('travelCompanions')) || [];

    // Add new travel data
    travelList.push(travelData);

    // Save back to localStorage
    localStorage.setItem('travelCompanions', JSON.stringify(travelList));
}

// Display the results of search
function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (results.length > 0) {
        results.forEach(companion => {
            const companionDiv = document.createElement("div");
            companionDiv.classList.add("companion");
            companionDiv.innerHTML = `
                <h3>Destination: ${companion.destination}</h3>
                <p><strong>Interests:</strong> ${companion.interests}</p>
                <p><strong>Travel Dates:</strong> ${companion.travelDates}</p>
                <p><strong>Your Name:</strong> ${companion.name}</p>
                <p><strong>Contact:</strong> ${companion.contact}</p>
            `;
            resultsDiv.appendChild(companionDiv);
        });
    } else {
        resultsDiv.innerHTML = "<p>No matching companions found.</p>";
    }
}

// Handle form submission for adding travel data
document.getElementById("addTravelForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const destination = document.getElementById("destination").value;
    const interests = document.getElementById("interests").value;
    const travelDates = document.getElementById("travelDates").value;

    // Save the data to localStorage
    saveTravelData(name, contact, destination, interests, travelDates);

    // Show success message
    const successMessage = document.getElementById("successMessage");
    successMessage.innerHTML = "<p>Travel data added successfully!</p>";

    // Clear form fields
    document.getElementById("addTravelForm").reset();
});

// Handle form submission for finding companions
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchDestination = document.getElementById("searchDestination").value;
    const searchInterests = document.getElementById("searchInterests").value;
    const searchDates = document.getElementById("searchDates").value;

    // Retrieve travel companions from localStorage
    const travelList = JSON.parse(localStorage.getItem('travelCompanions')) || [];

    // Filter based on search
    const results = travelList.filter(companion => {
        return (
            companion.destination.toLowerCase().includes(searchDestination.toLowerCase()) &&
            companion.interests.toLowerCase().includes(searchInterests.toLowerCase()) &&
            companion.travelDates === searchDates
        );
    });

    // Display filtered results
    displayResults(results);
});
