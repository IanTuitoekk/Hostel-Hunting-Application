// Sample property data
const sampleProperties = [
    {
        id: 1,
        title: "University Heights Dorm",
        description: "Modern dormitory room with shared facilities. Perfect for students looking for a vibrant campus life.",
        address: "123 University Ave",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 425,
        propertyType: "dormitory",
        roomType: "shared",
        capacity: 2,
        amenities: ["wifi", "laundry", "study_room", "gym"],
        images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: true,
        available: true,
        distanceToCampus: 0.3,
        rating: 4.8,
        reviews: 12
    },
    {
        id: 2,
        title: "Campus View Apartments",
        description: "Spacious one-bedroom apartment with modern amenities and great campus views.",
        address: "456 College St",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 750,
        propertyType: "apartment",
        roomType: "1br",
        capacity: 1,
        amenities: ["wifi", "parking", "kitchen", "balcony"],
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: true,
        available: true,
        distanceToCampus: 0.8,
        rating: 4.6,
        reviews: 8
    },
    {
        id: 3,
        title: "Sunny Side Studios",
        description: "Cozy studio apartment perfect for students who prefer privacy and independence.",
        address: "789 Student Lane",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 650,
        propertyType: "studio",
        roomType: "studio",
        capacity: 1,
        amenities: ["wifi", "furnished", "kitchen", "air_conditioning"],
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: false,
        available: true,
        distanceToCampus: 1.2,
        rating: 4.2,
        reviews: 5
    },
    {
        id: 4,
        title: "Green Valley House",
        description: "Shared house with multiple bedrooms, perfect for students who want a home-like environment.",
        address: "321 Valley Rd",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 520,
        propertyType: "house",
        roomType: "shared",
        capacity: 4,
        amenities: ["wifi", "parking", "garden", "furnished", "laundry"],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: true,
        available: true,
        distanceToCampus: 0.5,
        rating: 4.9,
        reviews: 15
    },
    {
        id: 5,
        title: "Cozy Corner Flats",
        description: "Two-bedroom apartment ideal for sharing with a roommate. Modern facilities and great location.",
        address: "654 Corner St",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 580,
        propertyType: "apartment",
        roomType: "2br",
        capacity: 2,
        amenities: ["wifi", "laundry", "parking", "furnished"],
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: true,
        available: true,
        distanceToCampus: 0.7,
        rating: 4.4,
        reviews: 9
    },
    {
        id: 6,
        title: "Skyline Residences",
        description: "Premium one-bedroom with city views and luxury amenities for discerning students.",
        address: "987 Skyline Dr",
        city: "College Town",
        state: "CA",
        zipCode: "90210",
        price: 890,
        propertyType: "apartment",
        roomType: "1br",
        capacity: 1,
        amenities: ["wifi", "gym", "pool", "parking", "balcony", "air_conditioning"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        verified: false,
        available: true,
        distanceToCampus: 1.5,
        rating: 4.1,
        reviews: 3
    }
];

// Global variables
let currentProperties = [...sampleProperties];
let favorites = new Set();
let currentUser = null;
let currentFilters = {};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderProperties();
    loadUserSession();
}

function setupEventListeners() {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Password toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// Search functionality
function searchProperties() {
    const location = document.getElementById('location').value;
    const budget = document.getElementById('budget').value;
    const roomType = document.getElementById('roomType').value;
    
    const filters = {};
    
    if (location) filters.location = location.toLowerCase();
    if (budget) {
        const [min, max] = budget.split('-');
        filters.minPrice = parseInt(min);
        if (max !== '+') filters.maxPrice = parseInt(max);
    }
    if (roomType) filters.roomType = roomType;
    
    applyFiltersToProperties(filters);
    
    // Scroll to properties section
    document.getElementById('properties').scrollIntoView({
        behavior: 'smooth'
    });
}

// Filter functionality
function showFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('show');
}

function applyFilters() {
    const filters = {};
    
    // Price range
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    if (minPrice) filters.minPrice = parseInt(minPrice);
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    
    // Property types
    const propertyTypes = [];
    document.querySelectorAll('.filter-group input[type="checkbox"]:checked').forEach(checkbox => {
        if (['dormitory', 'apartment', 'house', 'studio'].includes(checkbox.value)) {
            propertyTypes.push(checkbox.value);
        }
    });
    if (propertyTypes.length > 0) filters.propertyTypes = propertyTypes;
    
    // Amenities
    const amenities = [];
    document.querySelectorAll('.filter-group input[type="checkbox"]:checked').forEach(checkbox => {
        if (['wifi', 'laundry', 'parking', 'furnished', 'gym', 'pool'].includes(checkbox.value)) {
            amenities.push(checkbox.value);
        }
    });
    if (amenities.length > 0) filters.amenities = amenities;
    
    applyFiltersToProperties(filters);
}

function clearFilters() {
    // Clear form inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset properties
    currentProperties = [...sampleProperties];
    renderProperties();
}

function applyFiltersToProperties(filters) {
    currentFilters = filters;
    currentProperties = sampleProperties.filter(property => {
        // Location filter
        if (filters.location) {
            const locationMatch = property.city.toLowerCase().includes(filters.location) ||
                                 property.address.toLowerCase().includes(filters.location);
            if (!locationMatch) return false;
        }
        
        // Price filter
        if (filters.minPrice && property.price < filters.minPrice) return false;
        if (filters.maxPrice && property.price > filters.maxPrice) return false;
        
        // Room type filter
        if (filters.roomType && property.roomType !== filters.roomType) return false;
        
        // Property type filter
        if (filters.propertyTypes && !filters.propertyTypes.includes(property.propertyType)) return false;
        
        // Amenities filter
        if (filters.amenities) {
            const hasAllAmenities = filters.amenities.every(amenity => 
                property.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }
        
        return true;
    });
    
    renderProperties();
}

// Sort functionality
function sortProperties() {
    const sortBy = document.getElementById('sortBy').value;
    
    currentProperties.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'distance':
                return a.distanceToCampus - b.distanceToCampus;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
            default:
                return b.id - a.id;
        }
    });
    
    renderProperties();
}

// Render properties
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    
    if (currentProperties.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No properties found</h3>
                <p style="color: var(--medium-color);">Try adjusting your search criteria or filters.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = currentProperties.map(property => `
        <div class="property-card" onclick="showPropertyDetails(${property.id})">
            <div class="property-image" style="background-image: url('${property.images[0]}')">
                ${property.verified ? `
                    <div class="property-badge">
                        <i class="fas fa-check-circle"></i>
                        Verified
                    </div>
                ` : ''}
                <button class="property-favorite ${favorites.has(property.id) ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleFavorite(${property.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            
            <div class="property-content">
                <div class="property-header">
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-rating">
                        <i class="fas fa-star"></i>
                        <span>${property.rating.toFixed(1)}</span>
                    </div>
                </div>
                
                <p class="property-location">
                    ${property.distanceToCampus} miles from Campus • ${formatRoomType(property.roomType)}
                </p>
                
                <div class="property-price">
                    <div>
                        <span class="price-amount">$${property.price}</span>
                        <span class="price-period">/month</span>
                    </div>
                    <div class="property-features">
                        <i class="fas fa-${getRoomTypeIcon(property.roomType)}"></i>
                        <span>${property.capacity} ${property.capacity === 1 ? 'bed' : 'beds'}</span>
                    </div>
                </div>
                
                <div class="property-actions">
                    <button class="btn-primary" onclick="event.stopPropagation(); scheduleViewing(${property.id})">
                        Schedule Tour
                    </button>
                    <button class="btn-outline" onclick="event.stopPropagation(); contactLandlord(${property.id})">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper functions
function formatRoomType(roomType) {
    const types = {
        'shared': 'Shared Room',
        'single': 'Single Room',
        'studio': 'Studio',
        '1br': '1 Bedroom',
        '2br': '2 Bedroom'
    };
    return types[roomType] || roomType;
}

function getRoomTypeIcon(roomType) {
    switch (roomType) {
        case 'shared':
            return 'users';
        case 'studio':
            return 'home';
        default:
            return 'bed';
    }
}

// Property actions
function toggleFavorite(propertyId) {
    if (!currentUser) {
        showNotification('Please sign in to save favorites', 'error');
        showAuthModal('login');
        return;
    }
    
    if (favorites.has(propertyId)) {
        favorites.delete(propertyId);
        showNotification('Removed from favorites', 'success');
    } else {
        favorites.add(propertyId);
        showNotification('Added to favorites', 'success');
    }
    
    renderProperties();
    saveFavorites();
}

function scheduleViewing(propertyId) {
    if (!currentUser) {
        showNotification('Please sign in to schedule a viewing', 'error');
        showAuthModal('login');
        return;
    }
    
    const property = sampleProperties.find(p => p.id === propertyId);
    showNotification(`Viewing request sent for ${property.title}`, 'success');
}

function contactLandlord(propertyId) {
    if (!currentUser) {
        showNotification('Please sign in to contact landlords', 'error');
        showAuthModal('login');
        return;
    }
    
    const property = sampleProperties.find(p => p.id === propertyId);
    showNotification(`Message sent to landlord of ${property.title}`, 'success');
}

function showPropertyDetails(propertyId) {
    const property = sampleProperties.find(p => p.id === propertyId);
    const modal = document.getElementById('propertyModal');
    const title = document.getElementById('propertyTitle');
    const content = document.getElementById('propertyContent');
    
    title.textContent = property.title;
    
    content.innerHTML = `
        <div class="property-detail-image">
            <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--border-radius);">
        </div>
        
        <div style="padding: 1rem 0;">
            <div class="flex justify-between items-center mb-3">
                <div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${property.title}</h3>
                    <p style="color: var(--medium-color);">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.address}, ${property.city}, ${property.state}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 2rem; font-weight: bold;">$${property.price}<span style="font-size: 1rem; font-weight: normal; color: var(--medium-color);">/month</span></div>
                    <div style="color: var(--medium-color); margin-top: 0.25rem;">
                        <i class="fas fa-${getRoomTypeIcon(property.roomType)}"></i>
                        ${formatRoomType(property.roomType)}
                    </div>
                </div>
            </div>
            
            ${property.verified ? `
                <div style="margin-bottom: 1rem;">
                    <span style="background: var(--success-color); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">
                        <i class="fas fa-check-circle"></i>
                        Verified Property
                    </span>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">Description</h4>
                <p style="color: var(--medium-color);">${property.description}</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.75rem;">Amenities</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
                    ${property.amenities.map(amenity => `
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-check" style="color: var(--success-color);"></i>
                            <span style="capitalize">${amenity.replace('_', ' ')}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <h5 style="font-weight: 500;">Property Type</h5>
                    <p style="color: var(--medium-color); text-transform: capitalize;">${property.propertyType}</p>
                </div>
                <div>
                    <h5 style="font-weight: 500;">Capacity</h5>
                    <p style="color: var(--medium-color);">${property.capacity} people</p>
                </div>
                <div>
                    <h5 style="font-weight: 500;">Distance to Campus</h5>
                    <p style="color: var(--medium-color);">${property.distanceToCampus} miles</p>
                </div>
                <div>
                    <h5 style="font-weight: 500;">Rating</h5>
                    <p style="color: var(--medium-color);">
                        <i class="fas fa-star" style="color: var(--warning-color);"></i>
                        ${property.rating.toFixed(1)} (${property.reviews} reviews)
                    </p>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary" onclick="scheduleViewing(${property.id}); closePropertyModal();">
                    <i class="fas fa-calendar-alt"></i>
                    Schedule Viewing
                </button>
                <button class="btn-outline" onclick="contactLandlord(${property.id}); closePropertyModal();">
                    <i class="fas fa-envelope"></i>
                    Contact Landlord
                </button>
                <button class="btn-outline" onclick="toggleFavorite(${property.id}); closePropertyModal();">
                    <i class="fas fa-heart ${favorites.has(property.id) ? 'active' : ''}"></i>
                    ${favorites.has(property.id) ? 'Remove from' : 'Add to'} Favorites
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

// Modal functions
function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    
    title.textContent = type === 'login' ? 'Welcome Back' : 'Create Account';
    switchAuthTab(type);
    modal.classList.add('show');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
}

function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('show');
}

function closeModal(modal) {
    modal.classList.remove('show');
}

function switchAuthTab(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (type === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;
    
    // Simulate login
    if (email && password) {
        currentUser = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            userType: 'student'
        };
        
        updateAuthUI();
        closeAuthModal();
        showNotification('Welcome back!', 'success');
        saveUserSession();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const userType = form.querySelector('select').value;
    const fullName = form.querySelectorAll('input[type="text"]')[0].value;
    const username = form.querySelectorAll('input[type="text"]')[1].value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (!userType || !fullName || !username || !email || !password || !confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification("Passwords don't match", 'error');
        return;
    }
    
    // Simulate registration
    currentUser = {
        id: Date.now(),
        email: email,
        name: fullName,
        username: username,
        userType: userType
    };
    
    updateAuthUI();
    closeAuthModal();
    showNotification('Account created successfully! Welcome to StudentPad.', 'success');
    saveUserSession();
}

function logout() {
    currentUser = null;
    favorites.clear();
    updateAuthUI();
    clearUserSession();
    showNotification('You have been signed out', 'success');
}

function updateAuthUI() {
    const navAuth = document.querySelector('.nav-auth');
    
    if (currentUser) {
        navAuth.innerHTML = `
            <span style="color: var(--dark-color); margin-right: 1rem;">
                <i class="fas fa-user"></i>
                ${currentUser.name}
            </span>
            <button class="btn-outline" onclick="logout()">Sign Out</button>
        `;
    } else {
        navAuth.innerHTML = `
            <button class="btn-secondary" onclick="showAuthModal('login')">Sign In</button>
            <button class="btn-primary" onclick="showAuthModal('register')">Sign Up</button>
        `;
    }
}

// Session management
function saveUserSession() {
    if (currentUser) {
        localStorage.setItem('studentpad_user', JSON.stringify(currentUser));
    }
}

function loadUserSession() {
    const saved = localStorage.getItem('studentpad_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateAuthUI();
    }
    
    loadFavorites();
}

function clearUserSession() {
    localStorage.removeItem('studentpad_user');
    localStorage.removeItem('studentpad_favorites');
}

function saveFavorites() {
    if (currentUser) {
        localStorage.setItem('studentpad_favorites', JSON.stringify([...favorites]));
    }
}

function loadFavorites() {
    if (currentUser) {
        const saved = localStorage.getItem('studentpad_favorites');
        if (saved) {
            favorites = new Set(JSON.parse(saved));
        }
    }
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 5rem;
        right: 1rem;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize on page load
window.addEventListener('load', function() {
    // Add any additional initialization here
});