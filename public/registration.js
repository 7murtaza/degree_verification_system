// Function to handle signup form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Signup successful!');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed!');
    }
});

// Function to handle login form submission
// document.getElementById('login-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     try {
//         const response = await fetch('http://localhost:3000/api/auth/signin', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//             alert('Login successful!');
//             window.location.assign("/user.html"); // Refresh the page or redirect as needed

//         } else {
//             const errorData = await response.json();
//             alert(`Error: ${errorData.message}`);
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert('Login failed!');
//     }
// });
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'  // Ensure cookies are sent with the request
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.assign("./user.html");
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed!');
    }
});
