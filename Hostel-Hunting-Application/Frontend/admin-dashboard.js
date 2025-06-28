// Sample data
const allUsers = [
    { id: 1, name: "Sarah Chen", email: "sarah.chen@university.edu", type: "Student", status: "Active", joined: "2023-09-15", lastActive: "2024-01-20", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" },
    { id: 2, name: "John Smith", email: "john.smith@properties.com", type: "Landlord", status: "Active", joined: "2023-08-22", lastActive: "2024-01-19", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" },
    { id: 3, name: "Marcus Johnson", email: "marcus.j@university.edu", type: "Student", status: "Active", joined: "2023-10-03", lastActive: "2024-01-20", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" },
    { id: 4, name: "Fake User", email: "fake.user@email.com", type: "Student", status: "Suspended", joined: "2024-01-10", lastActive: "2024-01-15", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" },
    { id: 5, name: "Emily Rodriguez", email: "emily.rodriguez@university.edu", type: "Student", status: "Active", joined: "2023-11-12", lastActive: "2024-01-18", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" }
];

const allProperties = [
    { id: 1, title: "University Heights Dorm", landlord: "John Smith", type: "Dormitory", status: "Verified", location: "College Town, CA", price: 425, tenants: 8, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 2, title: "Campus View Apartments", landlord: "Jane Wilson", type: "Apartment", status: "Verified", location: "College Town, CA", price: 750, tenants: 6, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 3, title: "Green Valley House", landlord: "Robert Brown", type: "House", status: "Verified", location: "College Town, CA", price: 520, tenants: 4, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 4, title: "Sunny Side Studios", landlord: "Michael Davis", type: "Studio", status: "Pending", location: "College Town, CA", price: 650, tenants: 0, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 5, title: "Skyline Residences", landlord: "Lisa Garcia", type: "Apartment", status: "Rejected", location: "College Town, CA", price: 890, tenants: 0, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
];

let filteredUsers = [...allUsers];
let filteredProperties = [...allProperties];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

function initializeAdminDashboard() {
    setupNavigation();
    loadUsersTable();
    loadPropertiesGrid();
    setupEventListeners();
}

function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.getAttribute('href').substring(1));
        });
    });
}

function switchSection(sectionName) {
    document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(sectionName)?.classList.add('active');
    document.querySelector(`.nav-link[href="#${sectionName}"]`)?.classList.add('active');
}

function setupEventListeners() {
    document.getElementById('userSearch')?.addEventListener('input', filterUsers);
    document.getElementById('userFilter')?.addEventListener('change', filterUsers);
    document.getElementById('propertySearch')?.addEventListener('input', filterProperties);
    document.getElementById('propertyFilter')?.addEventListener('change', filterProperties);
}

function loadUsersTable() {
    document.getElementById('usersTableBody').innerHTML = filteredUsers.map(u => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${u.avatar}" alt="${u.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;">
                    <div>
                        <div style="font-weight: 600;">${u.name}</div>
                        <div style="font-size: 0.875rem; color: var(--medium-color);">${u.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${u.type.toLowerCase()}">${u.type}</span></td>
            <td><span class="status-badge ${u.status.toLowerCase()}">${u.status}</span></td>
            <td>${new Date(u.joined).toLocaleDateString()}</td>
            <td>${new Date(u.lastActive).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="userAction(${u.id}, 'view')" title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" onclick="userAction(${u.id}, 'edit')" title="Edit"><i class="fas fa-edit"></i></button>
                    ${u.status === 'Active' ? 
                        `<button class="action-btn delete" onclick="userAction(${u.id}, 'suspend')" title="Suspend"><i class="fas fa-ban"></i></button>` :
                        `<button class="action-btn edit" onclick="userAction(${u.id}, 'reactivate')" title="Reactivate"><i class="fas fa-check"></i></button>`
                    }
                </div>
            </td>
        </tr>
    `).join('');
}

function loadPropertiesGrid() {
    document.getElementById('adminPropertiesGrid').innerHTML = filteredProperties.map(p => `
        <div class="admin-property-card">
            <div style="position: relative;">
                <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="position: absolute; top: 0.75rem; right: 0.75rem;">
                    <span class="status-badge ${p.status.toLowerCase()}">${p.status}</span>
                </div>
            </div>
            <div style="padding: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">${p.title}</h4>
                <p style="color: var(--medium-color); font-size: 0.875rem; margin-bottom: 0.5rem;">By ${p.landlord}</p>
                <p style="color: var(--medium-color); font-size: 0.875rem; margin-bottom: 1rem;"><i class="fas fa-map-marker-alt"></i> ${p.location}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div>
                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--dark-color);">$${p.price}</span>
                        <span style="color: var(--medium-color); font-size: 0.875rem;">/month</span>
                    </div>
                    <div style="color: var(--medium-color); font-size: 0.875rem;"><i class="fas fa-users"></i> ${p.tenants} tenants</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${p.status === 'Pending' ? `
                        <button class="btn-primary" onclick="propertyAction(${p.id}, 'approve')" style="flex: 1;">Approve</button>
                        <button class="btn-outline" onclick="propertyAction(${p.id}, 'reject')" style="flex: 1;">Reject</button>
                    ` : `
                        <button class="btn-outline" onclick="propertyAction(${p.id}, 'view')" style="flex: 1;"><i class="fas fa-eye"></i> View</button>
                        <button class="btn-outline" onclick="propertyAction(${p.id}, 'edit')"><i class="fas fa-edit"></i></button>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter functions
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const filterType = document.getElementById('userFilter').value;
    
    filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
        const filterMap = { students: 'Student', landlords: 'Landlord', active: 'Active', suspended: 'Suspended' };
        const matchesFilter = filterType === 'all' || user.type === filterMap[filterType] || user.status === filterMap[filterType];
        return matchesSearch && matchesFilter;
    });
    loadUsersTable();
}

function filterProperties() {
    const searchTerm = document.getElementById('propertySearch').value.toLowerCase();
    const filterType = document.getElementById('propertyFilter').value;
    
    filteredProperties = allProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm) || 
                             property.landlord.toLowerCase().includes(searchTerm) ||
                             property.location.toLowerCase().includes(searchTerm);
        const filterMap = { verified: 'Verified', pending: 'Pending', rejected: 'Rejected' };
        const matchesFilter = filterType === 'all' || property.status === filterMap[filterType] || (filterType === 'active' && property.tenants > 0);
        return matchesSearch && matchesFilter;
    });
    loadPropertiesGrid();
}

// Unified action handlers
function userAction(id, action) {
    const user = allUsers.find(u => u.id === id);
    
    switch(action) {
        case 'view':
            document.getElementById('userDetailTitle').textContent = `${user.name} - User Details`;
            document.getElementById('userDetailContent').innerHTML = `
                <div style="display: grid; grid-template-columns: auto 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <img src="${user.avatar}" alt="${user.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;">
                    <div>
                        <h3 style="margin-bottom: 0.5rem;">${user.name}</h3>
                        <p style="color: var(--medium-color); margin-bottom: 0.25rem;">${user.email}</p>
                        <span class="status-badge ${user.type.toLowerCase()}">${user.type}</span>
                        <span class="status-badge ${user.status.toLowerCase()}" style="margin-left: 0.5rem;">${user.status}</span>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div><h5>Join Date</h5><p>${new Date(user.joined).toLocaleDateString()}</p></div>
                    <div><h5>Last Active</h5><p>${new Date(user.lastActive).toLocaleDateString()}</p></div>
                    <div><h5>User Type</h5><p>${user.type}</p></div>
                    <div><h5>Account Status</h5><p>${user.status}</p></div>
                </div>
                <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <h5>Quick Actions</h5>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem;">
                        <button class="btn-outline" onclick="userAction(${user.id}, 'message')"><i class="fas fa-envelope"></i> Send Message</button>
                        <button class="btn-outline" onclick="userAction(${user.id}, 'activity')"><i class="fas fa-chart-line"></i> View Activity</button>
                        ${user.status === 'Active' ? 
                            `<button class="btn-outline warning" onclick="userAction(${user.id}, 'suspend')"><i class="fas fa-ban"></i> Suspend User</button>` :
                            `<button class="btn-primary" onclick="userAction(${user.id}, 'reactivate')"><i class="fas fa-check"></i> Reactivate User</button>`
                        }
                    </div>
                </div>
            `;
            document.getElementById('userDetailModal').classList.add('show');
            break;
        case 'suspend':
            if (!confirm(`Suspend ${user.name}?`)) return;
            user.status = 'Suspended';
            loadUsersTable();
            showNotification(`${user.name} suspended`, 'success');
            break;
        case 'reactivate':
            user.status = 'Active';
            loadUsersTable();
            showNotification(`${user.name} reactivated`, 'success');
            break;
        default:
            showNotification(`${action} ${user.name}`, 'info');
    }
}

function propertyAction(id, action) {
    const property = allProperties.find(p => p.id === id);
    
    switch(action) {
        case 'approve':
            property.status = 'Verified';
            loadPropertiesGrid();
            showNotification(`${property.title} approved`, 'success');
            break;
        case 'reject':
            if (!confirm(`Reject ${property.title}?`)) return;
            property.status = 'Rejected';
            loadPropertiesGrid();
            showNotification(`${property.title} rejected`, 'info');
            break;
        default:
            showNotification(`${action} ${property.title}`, 'info');
    }
}

function closeUserDetailModal() {
    document.getElementById('userDetailModal').classList.remove('show');
}

// Utility functions
function logout() {
    if (confirm('Sign out?')) window.location.href = 'index.html';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: 'var(--success-color)', error: 'var(--error-color)', info: 'var(--primary-color)' };
    const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    
    notification.style.cssText = `position: fixed; top: 5rem; right: 1rem; background: ${colors[type]}; color: white; padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-lg); z-index: 3000; max-width: 300px;`;
    notification.innerHTML = `<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-${icons[type]}"></i><span>${message}</span></div>`;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}