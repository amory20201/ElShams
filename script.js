// Translation Dictionary
const translations = {
  en: {
    nav_why: "Why ElShams",
    nav_areas: "Areas",
    nav_contact: "Contact",
    nav_cta: "Find my home",
    hero_eyebrow: "Mahmoudia real estate, made personal",
    hero_title: "Find a place<br />that feels like <em>sunshine.</em>",
    hero_text: "Tell us what home means to you. Our Mahmoudia experts will curate options that match your life, your taste, and your budget.",
    hero_btn: "Start your search",
    slider_sub: "ELSHAMS",
    slider_title: "Mahmoudia<br /><strong>Real Estate</strong>",
    foot_scroll: "SCROLL TO EXPLORE",
    foot_est: "EST. 2011 · MAHMOUDIA",
    stat_1: "Years guiding<br />buyers home",
    stat_2: "Families matched<br />with a home",
    stat_3: "City we know<br />by heart",
    stat_text: "We believe the best properties are discovered through listening first.",
    promo_1_sub: "Find the perfect home within your budget.",
    promo_2_sub: "Modern spaces designed for family living.",
    areas_eyebrow: "Local knowledge, lasting value",
    areas_title: "Discover life in<br /><em>Mahmoudia.</em>",
    area_sub: "El Beheira, Egypt",
    area_title: "Mahmoudia",
    area_text: "Homes selected for the way you want to live.",
    area_btn: "Explore homes",
    contact_eyebrow: "Your search starts here",
    contact_title: "Tell us a little<br />about your <em>dream.</em>",
    contact_text: "One of our property advisors will be in touch within one business day with opportunities tailored to you.",
    contact_note: "Your details are private and used only to help with your property search.",
    label_name: "Full name",
    label_phone: "Mobile phone",
    label_prop_type: "Property type",
    opt_prop_default: "Select property type",
    opt_prop_apt: "Apartment",
    opt_prop_house: "House",
    opt_prop_shop: "Shop",
    label_trans_type: "Transaction type",
    opt_trans_default: "Select Rent or Sale",
    opt_trans_sale: "Buy / Sale",
    opt_trans_rent: "Rent",
    label_budget: "Your budget",
    form_btn: "Connect me with an advisor",
    footer_copy: "© 2026 ElShams Real Estate. Made for better beginnings.",
    footer_credit: "Website by",
    modal_eyebrow: "Stay in touch",
    modal_title: "Your request is<br />on its <em>way.</em>",
    modal_text: "While an ElShams advisor prepares your options, follow us for the latest Mahmoudia homes."
  },
  ar: {
    nav_why: "لماذا الشمس",
    nav_areas: "المناطق",
    nav_contact: "تواصل معنا",
    nav_cta: "ابحث عن منزلي",
    hero_eyebrow: "عقارات المحمودية، بلمسة شخصية",
    hero_title: "اعثر على منزل<br />يشعرك <em>بالدفء والإشراق.</em>",
    hero_text: "أخبرنا ماذا يعني المنزل بالنسبة لك. سيقوم خبراء المحمودية لدينا باختيار الخيارات التي تناسب حياتك وذوقك وميزانيتك.",
    hero_btn: "ابدأ بحثك",
    slider_sub: "الشمس",
    slider_title: "عقارات<br /><strong>المحمودية</strong>",
    foot_scroll: "مرر للاستكشاف",
    foot_est: "تأسست ٢٠١١ · المحمودية",
    stat_1: "عاماً في إرشاد<br />المشترين لمنازلهم",
    stat_2: "عائلة وجدت<br />منزل أحلامها",
    stat_3: "مدينة نعرفها<br />عن ظهر قلب",
    stat_text: "نحن نؤمن بأن أفضل العقارات يتم اكتشافها من خلال الاستماع أولاً.",
    promo_1_sub: "اكتشف المنزل المثالي ضمن ميزانيتك.",
    promo_2_sub: "مساحات حديثة مصممة للحياة العائلية.",
    areas_eyebrow: "خبرة محلية، وقيمة مستدامة",
    areas_title: "اكتشف الحياة في<br /><em>المحمودية.</em>",
    area_sub: "البحيرة، مصر",
    area_title: "المحمودية",
    area_text: "منازل مختارة بالطريقة التي ترغب في العيش بها.",
    area_btn: "استكشف المنازل",
    contact_eyebrow: "بحثك يبدأ من هنا",
    contact_title: "أخبرنا قليلاً<br />عن <em>حلمك.</em>",
    contact_text: "سيتواصل معك أحد مستشارينا العقاريين خلال يوم عمل واحد بفرص مصممة خصيصاً لك.",
    contact_note: "بياناتك سرية وتستخدم فقط لمساعدتك في البحث عن عقار.",
    label_name: "الاسم الكامل",
    label_phone: "رقم الهاتف",
    label_prop_type: "نوع العقار",
    opt_prop_default: "اختر نوع العقار",
    opt_prop_apt: "شقة سكنية",
    opt_prop_house: "منزل / فيلا",
    opt_prop_shop: "محل تجاري",
    label_trans_type: "نوع التعامل",
    opt_trans_default: "اختر إيجار أو شراء",
    opt_trans_sale: "شراء / تمليك",
    opt_trans_rent: "إيجار",
    label_budget: "الميزانية المتاحة",
    form_btn: "وصلني بمستشار عقاري",
    footer_copy: "© 2026 عقارات الشمس. صنع لبدايات أفضل.",
    footer_credit: "تصميم الموقع بواسطة",
    modal_eyebrow: "ابق على تواصل",
    modal_title: "طلبك في<br />طريقه <em>إلينا.</em>",
    modal_text: "بينما يقوم مستشار الشمس بتجهيز خياراتك، تابعنا لمعرفة أحدث منازل المحمودية."
  }
};

// Language Handling Logic
const langModal = document.querySelector('#lang-modal');

function openLangModal() {
  if (!langModal) return;
  langModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeLangModal() {
  if (!langModal) return;
  langModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function selectLanguage(lang) {
  localStorage.setItem('elshams_lang', lang);
  applyLanguage(lang);
  closeLangModal();
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update input placeholders dynamically
  const nameInput = document.querySelector('#name');
  const phoneInput = document.querySelector('#phone');
  const budgetInput = document.querySelector('#budget');
  
  if (nameInput) nameInput.placeholder = lang === 'ar' ? "كيف نحب أن نناديك؟" : "How should we call you?";
  if (phoneInput) phoneInput.placeholder = lang === 'ar' ? "مثال: 5678 1234 10 20+" : "e.g. +20 10 1234 5678";
  if (budgetInput) budgetInput.placeholder = lang === 'ar' ? "مثال: 1,500,000 جنيه" : "e.g. 1,500,000 EGP";
}

// Check if user has selected a language previously
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('elshams_lang');
  if (savedLang) {
    applyLanguage(savedLang);
  } else {
    // Show pop-up on very first visit
    setTimeout(openLangModal, 500);
  }
});

// Existing Modal & Form Logic
const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
const modal = document.querySelector('#social-modal');
const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

function openSocialModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeSocialModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

modalCloseButtons.forEach((button) => button.addEventListener('click', closeSocialModal));
document.addEventListener('keydown', (event) => { 
  if (event.key === 'Escape') {
    if (modal && modal.getAttribute('aria-hidden') === 'false') closeSocialModal();
    if (langModal && langModal.getAttribute('aria-hidden') === 'false') closeLangModal();
  } 
});

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

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Validate form fields BEFORE sending anything
    if (!form.checkValidity()) { 
      form.reportValidity(); 
      return; 
    }
    
    const button = form.querySelector('button');
    button.disabled = true;
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    status.textContent = currentLang === 'ar' ? 'جاري إرسال طلبك…' : 'Sending your request…';
    
    // Gather form data AFTER checking validity
    const payload = Object.fromEntries(new FormData(form));
    
    if (window.location.protocol === 'file:') {
      form.reset();
      status.textContent = currentLang === 'ar' ? 'وضع المعاينة — تم إرسال طلبك افتراضياً إلى الشمس.' : 'Preview mode — your request would now be sent to ElShams.';
      openSocialModal();
      button.disabled = false;
      return;
    }
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby3caTgOrfODKAJnGEze34S5cELRXJvReXRfsXRk4gme2GyGej_4m5y3z-775XSAwk/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      
      // If successful, reset the form and show the thank-you modal
      form.reset();
      status.textContent = currentLang === 'ar' ? 'شكراً لك — سيتواصل معك أحد مستشاري الشمس قريباً.' : 'Thank you — an ElShams advisor will contact you shortly.';
      openSocialModal();
    } catch (error) {
      status.textContent = currentLang === 'ar' ? 'تعذر إرسال طلبك. يرجى المحاولة مرة أخرى قريباً.' : 'We could not send your request. Please try again shortly.';
    } finally {
      button.disabled = false;
    }
  });
}