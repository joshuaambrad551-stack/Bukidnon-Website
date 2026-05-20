// 1. DATA ARRAY (Keep this outside so all functions can see it)
const destinations = [
    {
        id: 1,
        name: "Dahilayan Adventure Park",
        location: "Manolo Fortich",
        category: "Adventure",
        image: "image/dahilayan.jpg",
        description: "Home to one of the longest dual ziplines in Asia.",
        activities: "Ziplining, ATVs, Mountain Luge",
        entranceFee: "50 PHP (varies per ride)",
        hours: "8:00 AM - 5:00 PM",
        tips: "Bring a jacket; it gets cold!"
    },
    {
        id: 2,
        name: "Mt. Capistrano",
        location: "Malaybalay City",
        category: "Mountain",
        image: "image/capistrano.jpg",
        description: "Famous for its rock formations and panoramic views.",
        activities: "Hiking, Photography, Camping",
        entranceFee: "20 PHP",
        hours: "Best at Dawn",
        tips: "Wear shoes with good grip."
    }
    // Add more here...
];

// 2. GLOBAL FUNCTIONS (So your HTML onclick works)
function displayDestinations(items) {
    const container = document.getElementById('destinationContainer');
    if (!container) return; // Guard clause in case you're on a different page

    container.innerHTML = items.map(dest => `
        <div class="col-md-4 mb-4">
            <div class="dest-card h-100 shadow-sm border">
                <div style="height: 200px; overflow: hidden;">
                    <img src="${dest.image}" class="card-img-top" alt="${dest.name}" style="object-fit: cover; height: 100%;">
                </div>
                <div class="card-body">
                    <h5 class="fw-bold">${dest.name}</h5>
                    <p class="small text-muted"><i class="bi bi-geo-alt"></i> ${dest.location} | <span class="badge bg-light text-dark">${dest.category}</span></p>
                    <button class="btn btn-gold w-100" onclick="showDetails(${dest.id})">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(category) {
    if (category === 'All') {
        displayDestinations(destinations);
    } else {
        const filtered = destinations.filter(d => d.category === category);
        displayDestinations(filtered);
    }
}

function showDetails(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;
    
    // Assuming you have a Bootstrap modal with these IDs
    // If you haven't made the modal HTML yet, an alert or a simple modal works
    alert(`Destination: ${dest.name}\nActivities: ${dest.activities}\nTip: ${dest.tips}`);
}

// 3. DOM CONTENT LOADED (For event listeners and startup)
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the list
    displayDestinations(destinations);

    // Navbar Highlighting
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Sticky Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Search Input Listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const filtered = destinations.filter(d => 
                d.name.toLowerCase().includes(value) || 
                d.location.toLowerCase().includes(value) ||
                d.category.toLowerCase().includes(value)
            );
            displayDestinations(filtered);
        });
    }

    // Inquiry Form Logic
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
            
            let isValid = true;
            // ... (Your validation logic from the previous prompt is perfect here)

            if (isValid) {
                this.classList.add('d-none');
                document.getElementById('formSuccess').classList.remove('d-none');
            }
        });
    }
});

