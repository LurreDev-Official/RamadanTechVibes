const canvas = document.getElementById('wallpaperCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const colorSchemes = {
    blue: { bg: '#1e3a8a', accent: '#3b82f6', light: '#60a5fa' },
    green: { bg: '#065f46', accent: '#10b981', light: '#34d399' },
    gold: { bg: '#78350f', accent: '#f59e0b', light: '#fbbf24' },
    purple: { bg: '#581c87', accent: '#a855f7', light: '#c084fc' }
};

function drawGeometric(colors) {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const size = 80;
    for (let y = 0; y < canvas.height; y += size) {
        for (let x = 0; x < canvas.width; x += size) {
            ctx.save();
            ctx.translate(x + size/2, y + size/2);
            
            ctx.strokeStyle = colors.accent;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 / 8) * i;
                const px = Math.cos(angle) * 30;
                const py = Math.sin(angle) * 30;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    ctx.fillStyle = colors.light;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('☪', canvas.width / 2, canvas.height / 2);
}

function drawCalligraphy(colors) {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.accent);
    gradient.addColorStop(1, colors.light);
    
    ctx.fillStyle = gradient;
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('﷽', canvas.width / 2, canvas.height / 2);
    
    ctx.fillStyle = colors.light;
    ctx.font = '24px Arial';
    ctx.fillText('Bismillah', canvas.width / 2, canvas.height / 2 + 80);
}

function drawMosque(colors) {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Dome
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 80, Math.PI, 0, false);
    ctx.fill();
    
    // Crescent
    ctx.fillStyle = colors.light;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('☪', centerX, centerY - 120);
    
    // Main building
    ctx.fillStyle = colors.accent;
    ctx.fillRect(centerX - 100, centerY + 30, 200, 120);
    
    // Minarets
    ctx.fillRect(centerX - 150, centerY, 30, 150);
    ctx.fillRect(centerX + 120, centerY, 30, 150);
    
    // Minaret tops
    ctx.fillStyle = colors.light;
    ctx.beginPath();
    ctx.arc(centerX - 135, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 135, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawStars(colors) {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = colors.accent;
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
            const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
            
            const innerAngle = angle + Math.PI / 5;
            const ipx = x + Math.cos(innerAngle) * (size / 2);
            const ipy = y + Math.sin(innerAngle) * (size / 2);
            ctx.lineTo(ipx, ipy);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.fillStyle = colors.light;
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('☪', canvas.width / 2, canvas.height / 2);
}

function generateWallpaper() {
    const pattern = document.getElementById('patternSelect').value;
    const colorScheme = document.getElementById('colorScheme').value;
    const colors = colorSchemes[colorScheme];
    
    switch (pattern) {
        case 'geometric':
            drawGeometric(colors);
            break;
        case 'calligraphy':
            drawCalligraphy(colors);
            break;
        case 'mosque':
            drawMosque(colors);
            break;
        case 'stars':
            drawStars(colors);
            break;
    }
}

function downloadWallpaper() {
    const link = document.createElement('a');
    link.download = 'islamic-wallpaper.png';
    link.href = canvas.toDataURL();
    link.click();
}

document.getElementById('generateBtn').addEventListener('click', generateWallpaper);
document.getElementById('downloadBtn').addEventListener('click', downloadWallpaper);

// Generate initial wallpaper
generateWallpaper();
