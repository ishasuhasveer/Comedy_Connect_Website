document.addEventListener('DOMContentLoaded', function() {
    const sidebarMenuButton = document.querySelector('.sidebar-menu-button');
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.sidebar-menu-button');
    const navList = document.querySelector('.nav-list');

    // Function to set active navigation item based on current page
    function setActiveNavItem() {
        // Get current page URL
        const currentPage = window.location.pathname.split('/').pop();
        
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page nav link
        if (currentPage) {
            const activeLink = document.querySelector(`.nav-link[href="${currentPage}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // If on root page, activate home
            const homeLink = document.querySelector('.nav-link[href="dashboard.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Set active nav item when page loads
    setActiveNavItem();

    function toggleSidebar() {
        sidebar.classList.toggle('show-sidebar');
        if (sidebar.classList.contains('show-sidebar')) {
            menuButton.innerHTML = '<i class="fas fa-arrow-left" style="color: white;"></i>';
            menuButton.style.left = '200px';
        } else {
            menuButton.innerHTML = '<i class="fas fa-bars" style="color: white;"></i>';
            menuButton.style.left = '20px';
        }
    }

    // Event listener for menu button
    menuButton.addEventListener('click', toggleSidebar);

    // Handle dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownContainer = toggle.closest('.dropdown-container');
            const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
            const dropdownIcon = toggle.querySelector('.dropdown-icon');

            // Toggle dropdown menu
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            dropdownIcon.style.transform = dropdownMenu.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarMenuButton.contains(e.target) && 
            sidebar.classList.contains('show-sidebar')) {
            sidebar.classList.remove('show-sidebar');
            menuButton.innerHTML = '<i class="fas fa-bars" style="color: white;"></i>';
            menuButton.style.left = '20px';
        }
    });
});
