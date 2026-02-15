function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function calculateFitrah() {
    const ricePrice = parseFloat(document.getElementById('ricePrice').value);
    const people = parseInt(document.getElementById('people').value);
    
    // Zakat fitrah is 2.5 kg of rice per person
    const zakatPerPerson = ricePrice * 2.5;
    const totalZakat = zakatPerPerson * people;
    
    const resultDiv = document.getElementById('fitrahResult');
    resultDiv.innerHTML = `
        <h3>Zakat Fitrah yang harus dibayar:</h3>
        <p>Rp ${totalZakat.toLocaleString('id-ID')}</p>
        <div style="margin-top: 15px; font-size: 14px; color: #666;">
            Per orang: Rp ${zakatPerPerson.toLocaleString('id-ID')}<br>
            (2.5 kg beras × ${people} orang)
        </div>
    `;
}

function calculateMal() {
    const wealth = parseFloat(document.getElementById('wealth').value);
    const nisab = parseFloat(document.getElementById('nisab').value);
    
    const resultDiv = document.getElementById('malResult');
    
    if (wealth < nisab) {
        resultDiv.innerHTML = `
            <h3>Harta belum mencapai nisab</h3>
            <p style="font-size: 16px; color: #666;">
                Harta Anda: Rp ${wealth.toLocaleString('id-ID')}<br>
                Nisab: Rp ${nisab.toLocaleString('id-ID')}<br>
                <br>
                Anda belum wajib membayar zakat mal.
            </p>
        `;
    } else {
        // Zakat mal is 2.5% of wealth
        const zakat = wealth * 0.025;
        
        resultDiv.innerHTML = `
            <h3>Zakat Mal yang harus dibayar:</h3>
            <p>Rp ${zakat.toLocaleString('id-ID')}</p>
            <div style="margin-top: 15px; font-size: 14px; color: #666;">
                2.5% dari Rp ${wealth.toLocaleString('id-ID')}
            </div>
        `;
    }
}

// Auto-calculate on page load
window.onload = function() {
    calculateFitrah();
};
