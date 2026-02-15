let donations = JSON.parse(localStorage.getItem('donations')) || [];
let currentFilter = 'all';

function saveDonations() {
    localStorage.setItem('donations', JSON.stringify(donations));
}

function addDonation() {
    const amount = parseFloat(document.getElementById('amount').value);
    const cause = document.getElementById('cause').value.trim();
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value.trim();
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (!cause) {
        alert('Please enter a cause or organization');
        return;
    }
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    const donation = {
        id: Date.now(),
        amount: amount,
        cause: cause,
        date: date,
        notes: notes
    };
    
    donations.unshift(donation);
    saveDonations();
    
    document.getElementById('amount').value = '';
    document.getElementById('cause').value = '';
    document.getElementById('date').value = '';
    document.getElementById('notes').value = '';
    
    updateStats();
    displayDonations();
}

function deleteDonation(id) {
    if (confirm('Are you sure you want to delete this donation?')) {
        donations = donations.filter(d => d.id !== id);
        saveDonations();
        updateStats();
        displayDonations();
    }
}

function updateStats() {
    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
    document.getElementById('donation-count').textContent = donations.length;
}

function filterDonations(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayDonations();
}

function getFilteredDonations() {
    const now = new Date();
    
    switch(currentFilter) {
        case 'month':
            return donations.filter(d => {
                const donationDate = new Date(d.date);
                return donationDate.getMonth() === now.getMonth() && 
                       donationDate.getFullYear() === now.getFullYear();
            });
        case 'year':
            return donations.filter(d => {
                const donationDate = new Date(d.date);
                return donationDate.getFullYear() === now.getFullYear();
            });
        default:
            return donations;
    }
}

function displayDonations() {
    const list = document.getElementById('donation-list');
    const filtered = getFilteredDonations();
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state">No donations recorded yet</div>';
        return;
    }
    
    list.innerHTML = filtered.map(donation => {
        const dateObj = new Date(donation.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="donation-item">
                <button class="delete-btn" onclick="deleteDonation(${donation.id})">Delete</button>
                <div class="donation-header">
                    <div class="donation-amount">$${donation.amount.toFixed(2)}</div>
                </div>
                <div class="donation-cause">${donation.cause}</div>
                <div class="donation-date">📅 ${formattedDate}</div>
                ${donation.notes ? `<div class="donation-notes">${donation.notes}</div>` : ''}
            </div>
        `;
    }).join('');
}

document.getElementById('date').valueAsDate = new Date();
updateStats();
displayDonations();
