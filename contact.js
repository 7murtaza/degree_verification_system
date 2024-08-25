
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    // Display a message to the user (simulating form submission)
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Form submitted successfully!';
  
    // Here you can add your own code to handle the form data, such as sending it to a server
    console.log('Form Data:', { name, email, subject, message });
  
    // Reset form
    document.getElementById('contactForm').reset();
  });
  