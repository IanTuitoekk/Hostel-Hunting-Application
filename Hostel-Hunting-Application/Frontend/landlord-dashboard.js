// Sample data
const landlordProperties = [
    { id: 1, title: "University Heights Dorm", type: "Dormitory", status: "Active", occupancy: "8/10", monthlyRevenue: 3400, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 2, title: "Campus View Apartments", type: "Apartment", status: "Active", occupancy: "6/6", monthlyRevenue: 4500, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 3, title: "Green Valley House", type: "House", status: "Active", occupancy: "4/4", monthlyRevenue: 2080, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { id: 4, title: "Sunny Side Studios", type: "Studio", status: "Maintenance", occupancy: "0/1", monthlyRevenue: 0, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
];

const bookingRequests = [
    { id: 1, studentName: "Emma Wilson", studentEmail: "emma.wilson@university.edu", property: "Campus View Apartments", requestDate: "2024-01-15", moveInDate: "2024-02-01", status: "pending", message: "I'm a graduate student looking for a quiet place to study." },
    { id: 2, studentName: "Alex Rodriguez", studentEmail: "alex.rodriguez@university.edu", property: "University Heights Dorm", requestDate: "2024-01-14", moveInDate: "2024-01-25", status: "approved", message: "Looking forward to living on campus for my sophomore year." },
    { id: 3, studentName: "Michael Chen", studentEmail: "michael.chen@university.edu", property: "Green Valley House", requestDate: "2024-01-13", moveInDate: "2024-02-15", status: "pending", message: "I prefer shared housing with other students." }
];

const messages = [
    { id: 1, from: "Sarah Johnson", email: "sarah.j@university.edu", subject: "Maintenance Request - Kitchen Sink", preview: "The kitchen sink in unit 2B has been leaking...", time: "2 hours ago", read: false, property: "Campus View Apartments" },
    { id: 2, from: "David Kim", email: "david.kim@university.edu", subject: "Lease Renewal Question", preview: "I wanted to discuss renewing my lease for next year...", time: "5 hours ago", read: true, property: "University Heights Dorm" },
    { id: 3, from: "Jessica Brown", email: "jessica.brown@university.edu", subject: "Thank You", preview: "Thank you for the quick response to my heating issue...", time: "1 day ago", read: true, property: "Green Valley House" }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeLandlordDashboard();
});

function initializeLandlordDashboard() {
    setupNavigation();
    loadPropertiesTable();
    loadBookingsGrid();
    loadMessagesList();
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

function loadPropertiesTable() {
    document.getElementById('propertiesTableBody').innerHTML = landlordProperties.map(p => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${p.image}" alt="${p.title}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div>
                        <div style="font-weight: 600;">${p.title}</div>
                        <div style="font-size: 0.875rem; color: var(--medium-color);">ID: ${p.id}</div>
                    </div>
                </div>
            </td>
            <td>${p.type}</td>
            <td><span class="status-badge ${p.status.toLowerCase()}">${p.status}</span></td>
            <td>${p.occupancy}</td>
            <td>$${p.monthlyRevenue.toLocaleString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="propertyAction(${p.id}, 'view')" title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" onclick="propertyAction(${p.id}, 'edit')" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="propertyAction(${p.id}, 'delete')" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadBookingsGrid() {
    document.getElementById('bookingsGrid').innerHTML = bookingRequests.map(b => `
        <div class="booking-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <div>
                    <h4 style="margin-bottom: 0.25rem;">${b.studentName}</h4>
                    <p style="color: var(--medium-color); font-size: 0.875rem; margin: 0;">${b.studentEmail}</p>
                </div>
                <span class="status-badge ${b.status}">${b.status}</span>
            </div>
            <div style="margin-bottom: 1rem;">
                <p style="margin: 0; font-weight: 500;">Property: ${b.property}</p>
                <p style="margin: 0.25rem 0 0 0; color: var(--medium-color); font-size: 0.875rem;">Move-in: ${new Date(b.moveInDate).toLocaleDateString()}</p>
            </div>
            <div style="margin-bottom: 1rem;">
                <p style="margin: 0; font-size: 0.875rem; color: var(--dark-color);">"${b.message}"</p>
            </div>
            ${b.status === 'pending' ? `
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-primary" onclick="bookingAction(${b.id}, 'approve')" style="flex: 1;">Approve</button>
                    <button class="btn-outline" onclick="bookingAction(${b.id}, 'reject')" style="flex: 1;">Reject</button>
                </div>
            ` : `
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-outline" onclick="messageStudent('${b.studentEmail}')" style="flex: 1;"><i class="fas fa-envelope"></i> Message</button>
                    <button class="btn-outline" onclick="bookingAction(${b.id}, 'view')"><i class="fas fa-eye"></i></button>
                </div>
            `}
        </div>
    `).join('');
}

function loadMessagesList() {
    document.getElementById('messagesList').innerHTML = messages.map(m => `
        <div class="message-item ${m.read ? 'read' : 'unread'}" onclick="selectMessage(${m.id})">
            <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <div>
                        <h5 style="margin: 0; font-weight: 600; ${!m.read ? 'color: var(--primary-color);' : ''}">${m.from}</h5>
                        <p style="margin: 0; font-size: 0.75rem; color: var(--medium-color);">${m.property}</p>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--medium-color);">${m.time}</span>
                </div>
                <h6 style="margin: 0 0 0.25rem 0; font-size: 0.875rem;">${m.subject}</h6>
                <p style="margin: 0; font-size: 0.875rem; color: var(--medium-color);">${m.preview}</p>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    document.getElementById('propertySearch')?.addEventListener('input', () => showNotification('Property search updated', 'info'));
    document.getElementById('bookingFilter')?.addEventListener('change', (e) => showNotification(`Filtering by: ${e.target.value}`, 'info'));
    document.getElementById('messageFilter')?.addEventListener('change', (e) => showNotification(`Message filter: ${e.target.value}`, 'info'));
    document.getElementById('addPropertyForm')?.addEventListener('submit', handleAddProperty);
}

// Unified action handlers
function propertyAction(id, action) {
    const property = landlordProperties.find(p => p.id === id);
    if (action === 'delete' && !confirm(`Delete ${property.title}?`)) return;
    showNotification(`${action.charAt(0).toUpperCase() + action.slice(1)} ${property.title}`, action === 'delete' ? 'success' : 'info');
}

function bookingAction(id, action) {
    const booking = bookingRequests.find(b => b.id === id);
    if (action === 'approve' || action === 'reject') {
        booking.status = action === 'approve' ? 'approved' : 'rejected';
        loadBookingsGrid();
    }
    showNotification(`Booking ${action}d for ${booking.studentName}`, 'success');
}

function messageStudent(email) {
    showNotification(`Message composer opened for ${email}`, 'info');
}

// Message functions
function selectMessage(messageId) {
    const message = messages.find(m => m.id === messageId);
    message.read = true;
    
    document.getElementById('messageDetail').innerHTML = `
        <div style="width: 100%;">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem;">
                <h3 style="margin-bottom: 0.5rem;">${message.subject}</h3>
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p style="margin: 0; font-weight: 500;">${message.from}</p>
                        <p style="margin: 0; font-size: 0.875rem; color: var(--medium-color);">${message.email}</p>
                        <p style="margin: 0; font-size: 0.875rem; color: var(--medium-color);">Property: ${message.property}</p>
                    </div>
                    <span style="font-size: 0.875rem; color: var(--medium-color);">${message.time}</span>
                </div>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <p style="line-height: 1.6;">${message.preview}</p>
            </div>
            <div style="display: flex; gap: 0.75rem;">
                <button class="btn-primary" onclick="messageAction(${message.id}, 'reply')"><i class="fas fa-reply"></i> Reply</button>
                <button class="btn-outline" onclick="messageAction(${message.id}, 'forward')"><i class="fas fa-forward"></i> Forward</button>
                <button class="btn-outline" onclick="messageAction(${message.id}, 'delete')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `;
    loadMessagesList();
}

function messageAction(messageId, action) {
    const message = messages.find(m => m.id === messageId);
    if (action === 'delete' && !confirm(`Delete message from ${message.from}?`)) return;
    showNotification(`Message ${action}d`, 'success');
}

// Modal and utility functions
function showAddPropertyModal() {
    document.getElementById('addPropertyModal').classList.add('show');
}

function closeAddPropertyModal() {
    document.getElementById('addPropertyModal').classList.remove('show');
}

function handleAddProperty(e) {
    e.preventDefault();
    showNotification('Property added successfully!', 'success');
    closeAddPropertyModal();
    loadPropertiesTable();
}

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