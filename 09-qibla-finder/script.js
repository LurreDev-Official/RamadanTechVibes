const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

let userLat, userLng;

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function calculateQibla(lat, lng) {
    const dLng = toRadians(KAABA_LNG - lng);
    const lat1 = toRadians(lat);
    const lat2 = toRadians(KAABA_LAT);
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;
    
    return bearing;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance.toFixed(2);
}

function updateCompass(qiblaAngle) {
    const arrow = document.getElementById('qibla-arrow');
    arrow.style.transform = `translate(-50%, -50%) rotate(${qiblaAngle}deg)`;
    
    document.getElementById('qibla-angle').textContent = qiblaAngle.toFixed(2);
    
    const distance = calculateDistance(userLat, userLng, KAABA_LAT, KAABA_LNG);
    document.getElementById('distance').textContent = distance;
}

function findQibla() {
    if (!userLat || !userLng) {
        alert('Please allow location access or enter coordinates manually');
        return;
    }
    
    const qiblaAngle = calculateQibla(userLat, userLng);
    updateCompass(qiblaAngle);
}

function useMyLocation() {
    if ('geolocation' in navigator) {
        document.getElementById('location').textContent = 'Getting your location...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLat = position.coords.latitude;
                userLng = position.coords.longitude;
                
                document.getElementById('location').textContent = 
                    `Lat: ${userLat.toFixed(4)}, Lng: ${userLng.toFixed(4)}`;
                
                document.getElementById('lat').value = userLat;
                document.getElementById('lng').value = userLng;
                
                findQibla();
            },
            (error) => {
                document.getElementById('location').textContent = 
                    'Unable to get location. Please enter manually.';
                console.error('Geolocation error:', error);
            }
        );
    } else {
        document.getElementById('location').textContent = 
            'Geolocation not supported. Please enter manually.';
    }
}

function calculateFromManual() {
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    
    if (isNaN(lat) || isNaN(lng)) {
        alert('Please enter valid coordinates');
        return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        alert('Invalid coordinates. Lat: -90 to 90, Lng: -180 to 180');
        return;
    }
    
    userLat = lat;
    userLng = lng;
    
    document.getElementById('location').textContent = 
        `Lat: ${userLat.toFixed(4)}, Lng: ${userLng.toFixed(4)}`;
    
    findQibla();
}

useMyLocation();
