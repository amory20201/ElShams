const SITE_CONFIG = {
  whatsappBuyer: '201014973825',
  whatsappSeller: '201019332065',
  whatsappLeadPost: '201014973825',
  facebookUrl: 'https://www.facebook.com/el.shams.408946',
  sellSheetUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
  leadApiUrl: '/api/leads',
};

const WA_LINKS = {
  buyer: `https://wa.me/${SITE_CONFIG.whatsappBuyer}`,
  seller: `https://wa.me/${SITE_CONFIG.whatsappSeller}`,
  leadPost: `https://wa.me/${SITE_CONFIG.whatsappLeadPost}`,
};

const translations = {
    nav_home: "Home",
    nav_properties: "Properties",
    nav_sell: "List Your Property",
    nav_guide: "Mahmoudia Guide",
    nav_about: "About & Contact",
    nav_cta: "Find my home",
    hero_title: "Find a place<br />that feels like <em>sunshine.</em>",
    hero_text: "Tell us what home means to you. Our Mahmoudia experts will curate options that match your life, your taste, and your budget.",
    hero_btn: "Start your search",
    sell_btn: "List your property",
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
    footer_copy: "© 2026 ElShams Real Estate. Made for better beginnings.",
    footer_credit: "Website by"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_properties: "الوحدات المتاحة",
    nav_sell: "اعرض عقارك",
    nav_guide: "دليل المحمودية",
    nav_about: "عن الشركة والتواصل",
    nav_cta: "ابحث عن منزلي",
    hero_title: "اعثر على منزل<br />يشعرك <em>بالدفء والإشراق.</em>",
    hero_text: "أخبرنا ماذا يعني المنزل بالنسبة لك. سيقوم خبراء المحمودية لدينا باختيار الخيارات التي تناسب حياتك وذوقك وميزانيتك.",
    hero_btn: "ابدأ بحثك",
    sell_btn: "اعرض شقتك للبيع",
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
    footer_copy: "© 2026 عقارات الشمس. صنع لبدايات أفضل.",
    footer_credit: "تصميم الموقع بواسطة"
  }
};

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
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const inputs = {
    name: lang === 'ar' ? "كيف نحب أن نناديك؟" : "How should we call you?",
    phone: lang === 'ar' ? "مثال: 5678 1234 10 20+" : "e.g. +20 10 1234 5678",
    budget: lang === 'ar' ? "مثال: 1,500,000 جنيه" : "e.g. 1,500,000 EGP"
  };

  Object.keys(inputs).forEach(id => {
    const el = document.querySelector(`#${id}`);
    if (el) el.placeholder = inputs[id];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('elshams_lang');
  if (savedLang) {
    applyLanguage(savedLang);
  } else {
    setTimeout(openLangModal, 500);
  }
});

const brandSlides = document.querySelectorAll('.brand-slide');
const sliderDots = document.querySelectorAll('.slider-dots span');
let activeSlide = 0;
const hasSliderDots = sliderDots.length > 0;
if (brandSlides.length > 1 && hasSliderDots) {
  window.setInterval(() => {
    brandSlides[activeSlide].classList.remove('is-active');
    sliderDots[activeSlide].classList.remove('is-active');
    activeSlide = (activeSlide + 1) % brandSlides.length;
    brandSlides[activeSlide].classList.add('is-active');
    sliderDots[activeSlide].classList.add('is-active');
  }, 4500);
}

// Dynamic Store Loader
async function loadProperties() {
  const storeGrid = document.getElementById('dynamic-store');
  if(!storeGrid) return;

  const isHomePage = storeGrid.getAttribute('data-limit') === '3';
  storeGrid.innerHTML = '<p style="text-align:center; width:100%; font-family: Cairo; color: var(--ink);">جاري تحميل الوحدات السكنية...</p>';

   try {
     const scriptURL = 'https://script.google.com/macros/s/AKfycby3caTgOrfODKAJnGEze34S5cELRXJvReXRfsXRk4gme2GyGej_4m5y3z-775XSAwk/exec';
     const response = await fetch(scriptURL);
     const raw = await response.json();
     const properties = Array.isArray(raw) ? raw : [];

     storeGrid.innerHTML = '';

     if(properties.length === 0) {
        storeGrid.innerHTML = '<p style="text-align:center; width:100%; font-family: Cairo; color: var(--muted);">لا توجد وحدات متاحة حالياً، تابعنا قريباً.</p>';
        return;
     }

     if (isHomePage) properties = properties.slice(0, 3);

     properties.forEach((prop) => {
       const status = prop.status || '';
       const isRent = status.includes('إيجار') ? 'rent' : '';
       const image = prop.image || 'assets/elshams-property.jpg';
       const title = prop.title || '';
       const price = prop.price || '';
       const desc = prop.desc || '';
       const cardHTML = `
         <article class="store-card">
           <div class="card-img-wrapper">
             <img src="${image}" alt="${title}" onerror="this.src='assets/elshams-property.jpg'" />
             <span class="status-badge ${isRent}">${status}</span>
           </div>
           <div class="store-card-content">
             <span class="price" dir="ltr">${price}</span>
             <h3 dir="rtl">${title}</h3>
             <p dir="rtl">${desc}</p>
             <a href="about.html#contact?prop=${encodeURIComponent(title)}" class="store-btn" dir="rtl" style="text-decoration:none;">أطلب تفاصيل الشقة <span>←</span></a>
           </div>
         </article>
       `;
       storeGrid.innerHTML += cardHTML;
     });

   } catch(error) {
     storeGrid.innerHTML = '<p style="text-align:center; width:100%; color:red; font-family: Cairo;">حدث خطأ أثناء تحميل الوحدات. يرجى تحديث الصفحة.</p>';
   }
 }

window.addEventListener('DOMContentLoaded', loadProperties);
function validateField(input, minLength = 2) {
  const val = input.value.trim();
  if (!val || val.length < minLength) {
    input.style.borderColor = 'var(--coral)';
    return false;
  }
  input.style.borderColor = '';
  return true;
}

function showSubmitError(btn, msg) {
  btn.disabled = false;
  btn.innerHTML = `<span style="font-family: 'Cairo', sans-serif;">${msg}</span>`;
}

// --- وظيفة فورم عرض العقار (للبائعين) ---
const sellForm = document.getElementById('sell-form');
if (sellForm) {
  const submitBtn = document.getElementById('sell-submit-btn');
  const successMsg = document.getElementById('sell-success-msg');
  const nameInput = document.getElementById('sell_name');
  const phoneInput = document.getElementById('sell_phone');
  const detailsInput = document.getElementById('sell_details');
  const priceInput = document.getElementById('sell_price');

  [nameInput, phoneInput, detailsInput, priceInput].forEach(el => {
    if (!el) return;
    el.addEventListener('blur', () => validateField(el, el.id === 'sell_phone' ? 7 : 2));
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });

  sellForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = [nameInput, phoneInput, detailsInput, priceInput];
    const valid = fields.every(el => el && validateField(el, el.id === 'sell_phone' ? 7 : 2));
    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">جاري الإرسال...</span>';

    if (SITE_CONFIG.sellSheetUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      showSubmitError(submitBtn, 'يرجى تكوين رابط Google Sheet أولاً');
      return;
    }

    const formData = new FormData(sellForm);

    try {
      const res = await fetch(SITE_CONFIG.sellSheetUrl, { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      submitBtn.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    } catch (error) {
      showSubmitError(submitBtn, 'حدث خطأ، حاول مرة أخرى');
    }
  });
}

// --- وظيفة فورم التواصل الرئيسي ---
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  const submitBtn = leadForm.querySelector('.submit-button');
  const formStatus = document.getElementById('form-status');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const budgetInput = document.getElementById('budget');

  [nameInput, phoneInput, budgetInput].forEach(el => {
    if (!el) return;
    el.addEventListener('blur', () => validateField(el, el.id === 'phone' ? 7 : 2));
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });

  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [nameInput, phoneInput, budgetInput];
    const valid = fields.every(el => el && validateField(el, el.id === 'phone' ? 7 : 2));
    if (!valid) {
      if (formStatus) formStatus.textContent = 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح';
      return;
    }

    const propType = document.getElementById('prop_type')?.value || '';
    const transType = document.getElementById('trans_type')?.value || '';
    const requestedProperty = document.getElementById('requested_property')?.value || '';

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'جاري الإرسال... '; }
    if (formStatus) formStatus.textContent = '';

    try {
      const res = await fetch(SITE_CONFIG.leadApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          budget: budgetInput.value.trim(),
          prop_type: propType,
          trans_type: transType,
          requested_property: requestedProperty,
          lead_source: 'about_form',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الإرسال');

      if (formStatus) formStatus.textContent = 'تم إرسال طلبك بنجاح، سنتواصل معك قريباً';
      leadForm.reset();
      const propInput = document.getElementById('requested_property');
      if (propInput) propInput.value = 'استفسار عام';
      document.getElementById('social-modal')?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    } catch (error) {
      if (formStatus) formStatus.textContent = 'حدث خطأ، يرجى المحاولة مرة أخرى';
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Connect me with an advisor'; }
    }
  });
}