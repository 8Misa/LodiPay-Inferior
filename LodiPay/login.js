// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Handle login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload

    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();

    // Simple validation
    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Demo login logic (replace with real authentication later)
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'analytics.html'; // redirect to analytics page
    } else {
        alert('Invalid email or password.');
    }
});
