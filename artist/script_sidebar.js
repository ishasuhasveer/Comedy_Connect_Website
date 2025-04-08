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