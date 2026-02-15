let events = [];
let eventIdCounter = 1;

// Load events from localStorage
function loadEvents() {
    const saved = localStorage.getItem('iftarEvents');
    if (saved) {
        const data = JSON.parse(saved);
        events = data.events || [];
        eventIdCounter = data.counter || 1;
    }
}

// Save events to localStorage
function saveEvents() {
    localStorage.setItem('iftarEvents', JSON.stringify({
        events: events,
        counter: eventIdCounter
    }));
}

// Display events
function displayEvents() {
    const eventsList = document.getElementById('eventsList');
    
    if (events.length === 0) {
        eventsList.innerHTML = '<div class="empty-state">No events scheduled yet. Create your first iftar event!</div>';
        return;
    }
    
    eventsList.innerHTML = '';
    
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        const eventDate = new Date(event.date);
        const today = new Date();
        const isUpcoming = eventDate >= today;
        
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-name">${event.name}</div>
                <div class="event-badge">${isUpcoming ? 'Upcoming' : 'Past'}</div>
            </div>
            <div class="event-info">
                <div class="event-info-item">📅 ${formatDate(event.date)}</div>
                <div class="event-info-item">🕐 ${event.time}</div>
                <div class="event-info-item">📍 ${event.location}</div>
                <div class="event-info-item">👥 ${event.attendees} people</div>
            </div>
            <div class="event-description">${event.description || 'No description'}</div>
        `;
        
        eventCard.addEventListener('click', () => showEventDetail(event));
        eventsList.appendChild(eventCard);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function showEventDetail(event) {
    const modal = document.getElementById('eventModal');
    const eventDetail = document.getElementById('eventDetail');
    
    eventDetail.innerHTML = `
        <div class="event-detail-title">${event.name}</div>
        <div class="event-detail-section">
            <div class="event-detail-label">Date</div>
            <div class="event-detail-value">${formatDate(event.date)}</div>
        </div>
        <div class="event-detail-section">
            <div class="event-detail-label">Time</div>
            <div class="event-detail-value">${event.time}</div>
        </div>
        <div class="event-detail-section">
            <div class="event-detail-label">Location</div>
            <div class="event-detail-value">${event.location}</div>
        </div>
        <div class="event-detail-section">
            <div class="event-detail-label">Expected Attendees</div>
            <div class="event-detail-value">${event.attendees} people</div>
        </div>
        <div class="event-detail-section">
            <div class="event-detail-label">Description</div>
            <div class="event-detail-value">${event.description || 'No description provided'}</div>
        </div>
        <button class="btn-delete" onclick="deleteEvent(${event.id})">Delete Event</button>
    `;
    
    modal.style.display = 'block';
}

function deleteEvent(eventId) {
    events = events.filter(e => e.id !== eventId);
    saveEvents();
    displayEvents();
    document.getElementById('eventModal').style.display = 'none';
}

// Form submission
document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: eventIdCounter++,
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        attendees: document.getElementById('eventAttendees').value,
        description: document.getElementById('eventDescription').value
    };
    
    events.push(newEvent);
    saveEvents();
    displayEvents();
    
    document.getElementById('eventForm').reset();
    
    alert('✓ Event created successfully!');
});

// Modal close
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('eventModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('eventModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
loadEvents();
displayEvents();
