const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Slide animation
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Regular Expression
const nameRegex = /^[A-Za-z\s]+$/; 
const usernameRegex = /^(?=.*[A-Z]).+$/; 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



function signup() {
    event.preventDefault();

    const name = document.querySelector('.sign-up-container input[placeholder="Name"]').value.trim();
    const username = document.querySelector('.sign-up-container input[placeholder="Username "]').value.trim();
    const password = document.querySelector('.sign-up-container input[placeholder="Password"]').value.trim();

    if (!name || !username || !password) {
        alert("Please enter name, username and password.");
        return;
    }
    if (!nameRegex.test(name)) {
        alert("Name must contain only letters.");
        return;
    }
    if (!usernameRegex.test(username)) {
        alert("Username must contain at least one uppercase letter.");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
        return;
    }

    localStorage.setItem("registeredUser", JSON.stringify({ username, password }));

    alert("Sign Up successful!");
    document.querySelector('.sign-up-container form').reset();
    container.classList.remove("right-panel-active");
}


function login() {
    event.preventDefault();

    const username = document.querySelector('.sign-in-container input[placeholder="Username"]').value.trim();
    const password = document.querySelector('.sign-in-container input[placeholder="Password"]').value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (savedUser.username === username && savedUser.password === password) {
        alert("Login successful!");
        document.querySelector('.sign-in-container form').reset();
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}