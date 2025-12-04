import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mnekynmsgleysmfjtdbh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZWt5bm1zZ2xleXNtZmp0ZGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTAxMTUsImV4cCI6MjA4MDE4NjExNX0.l0h5Wlqlvzve5Bs8sHIeVCcRuikRrTr2dRYpkdYLSdo";
const supabase = createClient(supabaseUrl, supabaseKey);

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                phone: phone
            }
        }
    });

    if (error) {
        alert("Sign up error: " + error.message);
        return;
    }

    alert("Account created successfully! Please verify your email.");
    window.location.href = "dashboard.html"; // redirect to dashboard instead of login
});

