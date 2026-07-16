const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
const modal = document.querySelector('#social-modal');
const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

function openSocialModal() {
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeSocialModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

modalCloseButtons.forEach((button) => button.addEventListener('click', closeSocialModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeSocialModal(); });

const brandSlides = document.querySelectorAll('.brand-slide');
const sliderDots = document.querySelectorAll('.slider-dots span');
let activeSlide = 0;
if (brandSlides.length > 1) {
  window.setInterval(() => {
    brandSlides[activeSlide].classList.remove('is-active');
    sliderDots[activeSlide].classList.remove('is-active');
    activeSlide = (activeSlide + 1) % brandSlides.length;
    brandSlides[activeSlide].classList.add('is-active');
    sliderDots[activeSlide].classList.add('is-active');
  }, 4500);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Sending your request…';
  const payload = Object.fromEntries(new FormData(form));
  // A file:// preview has no serverless API. Show the completed experience locally;
  // deployed versions still save to the database through /api/leads below.
  if (window.location.protocol === 'file:') {
    form.reset();
    status.textContent = 'Preview mode — your request would now be sent to ElShams.';
    openSocialModal();
    button.disabled = false;
    return;
  }
  try {
    const response = await fetch('/api/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Unable to save your request');
    form.reset();
    status.textContent = 'Thank you — an ElShams advisor will contact you shortly.';
    openSocialModal();
  } catch (error) {
    status.textContent = 'We could not send your request. Please try again shortly.';
  } finally { button.disabled = false; }
});
