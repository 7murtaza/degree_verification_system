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


document.addEventListener("DOMContentLoaded", function () {
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
