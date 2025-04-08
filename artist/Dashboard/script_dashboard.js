// Function to toggle dropdown menu visibility
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
};

// Function to close all open dropdowns
const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
        toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
};

// Attach click event to all dropdown toggles
document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdown = dropdownToggle.closest(".dropdown-container");
        const menu = dropdown.querySelector(".dropdown-menu");
        const isOpen = dropdown.classList.contains("open");
        closeAllDropdowns(); // Close all other dropdowns
        toggleDropdown(dropdown, menu, !isOpen); // Toggle current dropdown visibility
    });
});

// Sidebar Toggle Function
const sidebar = document.querySelector(".sidebar");
const sidebarToggles = document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button");

// Function to toggle sidebar and save state
const toggleSidebar = () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed")); // Save state
};

// Attach click event to sidebar toggles
sidebarToggles.forEach((button) => {
    button.addEventListener("click", () => {
        closeAllDropdowns(); // Close all open dropdowns
        toggleSidebar(); // Toggle sidebar
    });
});

// Set sidebar state on page load
const isSidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
if (isSidebarCollapsed || window.innerWidth <= 1024) {
    sidebar.classList.add("collapsed");
}

// Simulate fetching from Firebase (replace with actual Firebase code)
setTimeout(() => {
    const venueContainer = document.getElementById("venueContainer");
    venueContainer.innerHTML = ""; // Clear placeholders

    // Example Venue Data (Replace with Firebase data)
    const venues = [
        { name: "Grand Hall", location: "Downtown", capacity: "500 People" },
        { name: "Skyline Terrace", location: "City Center", capacity: "300 People" },
        { name: "Sunset Lounge", location: "Beachside", capacity: "200 People" }
    ];
    venues.forEach(venue => {
        const venueCard = document.createElement("div");
        venueCard.classList.add("venue-card");
        venueCard.innerHTML = `
            <h3>${venue.name}</h3>
            <p>${venue.location}</p>
            <p>Capacity: ${venue.capacity}</p>
        `;
        venueContainer.appendChild(venueCard);
    });

    
},1000); // Simulated 3-second loading delay

document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const notification = this.parentElement;
        notification.classList.add("removed"); // Apply fade-out effect
        setTimeout(() => {
            notification.remove(); // Remove from DOM
            checkNotifications(); // Check if list is empty
        }, 300);
    });
});

// Function to check if notifications are empty
function checkNotifications() {
    const notificationList = document.getElementById("notificationList");
    
    // If no notifications remain, display "No new notifications"
    if (notificationList.children.length === 0) {
        notificationList.innerHTML = `<p class="no-notifications">No new notifications</p>`;
    }
}

// Run check at start in case list is empty
checkNotifications();


