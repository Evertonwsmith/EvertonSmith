window.onload = function(){
    
}



document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginBox');
    const landingPage = document.getElementById('landingBox');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Fade out login page
        fadeOut(loginPage);

        // Simulate async login (replace with actual login logic)
        setTimeout(() => {
            // Show landing page
            fadeIn(landingPage);
        }, 1000); // Example: wait for 1 second
    });

    function fadeOut(element) {
        element.classList.add('hidden');
    }

    function fadeIn(element) {
        element.classList.remove('hidden');
    }
});
