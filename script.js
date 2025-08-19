// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for date inputs
    document.getElementById('startDate').valueAsDate = new Date();
    document.getElementById('endDate').valueAsDate = new Date();
    
    // Switch between calculator modes
    document.getElementById('daysFromTodayBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('betweenDatesBtn').classList.remove('active');
        document.getElementById('daysFromTodaySection').style.display = 'block';
        document.getElementById('betweenDatesSection').style.display = 'none';
        clearResults();
    });

    document.getElementById('betweenDatesBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('daysFromTodayBtn').classList.remove('active');
        document.getElementById('daysFromTodaySection').style.display = 'none';
        document.getElementById('betweenDatesSection').style.display = 'block';
        clearResults();
    });
});

// Theme changer
function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
}

// Clear previous results
function clearResults() {
    document.getElementById('resultContainer').innerHTML = '';
    document.getElementById('countdownContainer').innerHTML = '';
}

// Calculate days from today
function calculateDaysFromToday() {
    const daysInput = document.getElementById('daysInput');
    const days = parseInt(daysInput.value);
    
    if (isNaN(days) || days < 0) {
        showError("Please enter a valid positive number");
        return;
    }
    
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    showResult(today, futureDate, days);
    startCountdown(futureDate);
}

// Calculate between two dates
function calculateBetweenDates() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    if (endDate <= startDate) {
        showError("End date must be after start date");
        return;
    }
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    showResult(startDate, endDate, diffDays);
    startCountdown(endDate);
}

// Show results
function showResult(startDate, endDate, days) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[endDate.getDay()];
    
    document.getElementById('resultContainer').innerHTML = `
        <h3>Result:</h3>
        <p>From <strong>${startDate.toDateString()}</strong></p>
        <p>To <strong>${endDate.toDateString()}</strong></p>
        <p>Total days: <strong>${days}</strong></p>
        <p>Day of week: <strong>${dayName}</strong></p>
    `;
}

// Countdown timer
function startCountdown(targetDate) {
    const countdownContainer = document.getElementById('countdownContainer');
    countdownContainer.innerHTML = '<h3>Countdown:</h3><div id="countdown"></div>';
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "The date has arrived!";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-box">
                <div class="countdown-value">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Store interval ID to clear it later if needed
    window.countdownInterval = countdownInterval;
}

// Show error message
function showError(message) {
    document.getElementById('resultContainer').innerHTML = `
        <div class="error-message">
            ❌ ${message}
        </div>
    `;
    document.getElementById('countdownContainer').innerHTML = '';
}