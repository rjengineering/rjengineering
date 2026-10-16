(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById('languageToggle');
  let currentLanguage = 'en';

  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-ta]').forEach((element) => {
      const value = element.dataset[language];
      if (value !== undefined) element.innerHTML = value;
    });
    if (toggle) toggle.textContent = language === 'en' ? 'தமிழ்' : 'English';
    const name = document.getElementById('visitorName');
    const phone = document.getElementById('visitorPhone');
    const message = document.getElementById('visitorMessage');
    if (name) name.placeholder = language === 'en' ? 'Name' : 'பெயர்';
    if (phone) phone.placeholder = language === 'en' ? '+91 ...' : '+91 ...';
    if (message) message.placeholder = language === 'en' ? 'Tell us briefly about your requirement' : 'உங்கள் தேவையைச் சுருக்கமாகக் குறிப்பிடவும்';
  }

  if (toggle) toggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ta' : 'en'));

  
const form = document.getElementById('enquiryForm');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      form.innerHTML = `
        <div class="text-center py-4">
          <i class="bi bi-check-circle-fill"
             style="font-size: 42px; color: #2d641e;"></i>
          <h3 class="mt-3">Thank you!</h3>
          <p>Your enquiry has been submitted successfully.
             Our team will get back to you.</p>
        </div>
      `;
    } catch (error) {
      alert(
        'We could not submit your enquiry. Please try again ' +
        'or contact us directly by WhatsApp or phone.'
      );

      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}


  // Close the mobile navigation after choosing a section.
  document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
})();