document.getElementById('findMosquesBtn').addEventListener('click', findMosques);

function findMosques() {
    const locationInfo = document.getElementById('locationInfo');
    const mosquesList = document.getElementById('mosquesList');
    
    locationInfo.innerHTML = 'Getting your location...';
    mosquesList.innerHTML = '';
    
    if (!navigator.geolocation) {
        locationInfo.innerHTML = 'Geolocation is not supported by your browser';
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            locationInfo.innerHTML = `📍 Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            // Simulated mosque data
            const mosques = generateMockMosques(latitude, longitude);
            displayMosques(mosques);
        },
        (error) => {
            locationInfo.innerHTML = 'Unable to retrieve your location. Showing sample mosques nearby.';
            const mosques = generateMockMosques(0, 0);
            displayMosques(mosques);
        }
    );
}

function generateMockMosques(lat, lng) {
    const mosqueNames = [
        'Central Mosque',
        'Islamic Center',
        'Grand Mosque',
        'Masjid Al-Noor',
        'Masjid Al-Rahma',
        'Community Masjid',
        'Masjid Al-Iman',
        'Baitul Mukarram'
    ];
    
    return mosqueNames.slice(0, 5).map((name, index) => ({
        name: name,
        address: `${100 + index * 50} Main Street, District ${index + 1}`,
        distance: (Math.random() * 5 + 0.5).toFixed(1)
    })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

function displayMosques(mosques) {
    const mosquesList = document.getElementById('mosquesList');
    
    if (mosques.length === 0) {
        mosquesList.innerHTML = '<p style="text-align: center; color: #666;">No mosques found nearby.</p>';
        return;
    }
    
    mosques.forEach(mosque => {
        const mosqueItem = document.createElement('div');
        mosqueItem.className = 'mosque-item';
        mosqueItem.innerHTML = `
            <div class="mosque-name">🕌 ${mosque.name}</div>
            <div class="mosque-address">📍 ${mosque.address}</div>
            <div class="mosque-distance">📏 ${mosque.distance} km away</div>
        `;
        mosquesList.appendChild(mosqueItem);
    });
}
