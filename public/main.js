document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('wallet'); 
    const accountNumber = document.getElementById('accountNumber'); 
    if (loginButton) {
      loginButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            if(account){
                accountNumber.innerHTML = `Wallet Connected`;
                accountNumber.style.fontSize = "15px";
            }
            alert(`Connected: ${account}`);
  
            // Perform additional authentication logic if needed
          } catch (error) {
            alert(`Error: ${error.message}`);
          }
        } else {
          alert('MetaMask is not installed. Please install it to use this application.');
        }
      });
    } else {
      alert('Login button not found');
    }
  });

  function scrollToNextSection() {
    // Get the current scroll position
    const currentScrollPosition = window.scrollY;
    // Get all sections
    const sections = document.querySelectorAll('section');
    // Loop through each section
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        // Get the position of the section
        const sectionTop = section.offsetTop;
        // Check if the current scroll position is less than the top of the section
        if (currentScrollPosition < sectionTop - 1) {
            // Scroll to the section
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
            break;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
  const logoBar = document.querySelector('.logo-bar');
  const copyBar = document.querySelector('.copy-bar');

  logoBar.addEventListener('mouseover', () => {
    copyBar.style.animationPlayState = 'paused';
    logoBar.style.animationPlayState = 'paused';
  });

  logoBar.addEventListener('mouseout', () => {
    logoBar.style.animationPlayState = 'running';
    copyBar.style.animationPlayState = 'running';
  });
});
