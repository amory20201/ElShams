const translations = {
  en: {
    nav_home: "Home", nav_properties: "Properties", nav_sell: "List Property", nav_guide: "Guide", nav_about: "About & Contact", nav_cta: "Find my home",
    hero_title: "Find a place<br />that feels like <em>sunshine.</em>",
    hero_text: "Tell us what home means to you. Our experts will curate residential options that match your family's life, taste, and budget.",
    hero_btn: "Start your search", sell_btn: "List your property",
    slider_sub: "ELSHAMS", slider_title: "Mahmoudia<br /><strong>Real Estate</strong>",
    stat_1: "Years guiding buyers", stat_2: "Families matched", stat_3: "City we know by heart",
    footer_copy: "© 2026 ElShams Real Estate. Made for better beginnings.", footer_credit: "Website by",
    props_title: "Available Properties", props_desc: "Browse the latest residential apartments and family homes.",
    sell_title: "List your <em style='color: var(--lime);'>Property.</em>", sell_desc: "Enter your residential unit details below. We connect you with families looking for stability.",
    sell_name: "Full Name", sell_type: "Property Type", sell_apt: "Apartment", sell_house: "House / Villa", sell_details: "Address & Specifications", sell_price: "Asking Price", sell_submit: "Submit Property",
    about_title: "About <em style='color: var(--coral);'>ElShams.</em>", about_p1: "For over 14 years, we have specialized exclusively in residential real estate.", about_p2: "Our goal is finding the place where your family will make its most beautiful memories.",
    contact_title: "Tell us about your <em>dream.</em>", contact_text: "Our residential advisor will contact you soon.", contact_note: "Your details are private.", form_btn: "Connect me with an advisor"
  },
  ar: {
    nav_home: "الرئيسية", nav_properties: "الوحدات المتاحة", nav_sell: "اعرض عقارك", nav_guide: "دليل المحمودية", nav_about: "عن الشركة والتواصل", nav_cta: "ابحث عن منزلي",
    hero_title: "اعثر على منزل<br />يشعرك <em>بالدفء والإشراق.</em>",
    hero_text: "أخبرنا ماذا يعني المنزل بالنسبة لك. سيقوم خبراؤنا باختيار الخيارات السكنية التي تناسب عائلتك.",
    hero_btn: "ابدأ بحثك", sell_btn: "اعرض شقتك للبيع",
    slider_sub: "الشمس", slider_title: "عقارات<br /><strong>المحمودية</strong>",
    stat_1: "عاماً في إرشاد المشترين", stat_2: "عائلة وجدت منزلها", stat_3: "مدينة نعرفها عن ظهر قلب",
    footer_copy: "© 2026 عقارات الشمس. صنع لبدايات أفضل.", footer_credit: "تصميم الموقع بواسطة",
    props_title: "الوحدات المتاحة", props_desc: "تصفح أحدث الشقق والبيوت السكنية المتاحة للبيع أو الإيجار.",
    sell_title: "نعرف قيمة <em style='color: var(--lime);'>عقارك السكني.</em>", sell_desc: "أدخل تفاصيل وحدتك السكنية أدناه. نحن نوصلك بالعائلات والباحثين عن الاستقرار.",
    sell_name: "الاسم بالكامل", sell_type: "نوع العقار", sell_apt: "شقة سكنية", sell_house: "بيت / فيلا كاملة", sell_details: "العنوان والمواصفات", sell_price: "السعر المطلوب", sell_submit: "إرسال بيانات العقار",
    about_title: "عن مكتب <em style='color: var(--coral);'>الشمس.</em>", about_p1: "تخصصنا بشكل حصري في العقارات السكنية على مدار 14 عاماً.", about_p2: "هدفنا إيجاد المكان الذي ستصنع فيه عائلتك أجمل ذكرياتها.",
    contact_title: "أخبرنا عن <em>حلمك.</em>", contact_text: "سيتواصل معك أحد مستشارينا العقاريين قريباً.", contact_note: "بيانات سرية.", form_btn: "تواصل مع مستشار عقاري"
  }
};

// Language Modal & Toggle
function toggleLanguage() {
  const currentLang = localStorage.getItem('elshams_lang') || 'ar';
  selectLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

function selectLanguage(lang) {
  localStorage.setItem('elshams_lang', lang);
  applyLanguage(lang);
  const modal = document.getElementById('lang-modal');
  if(modal) modal.style.display = 'none';
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) el.innerHTML = translations[lang][key];
  });
  
  const isAr = lang === 'ar';
  const placeholders = {
    'sell_name': isAr ? 'الاسم الثنائي' : 'Full Name',
    'sell_details': isAr ? 'اكتب العنوان بالتفصيل...' : 'Address and details...',
    'sell_price': isAr ? 'مثال: 1,500,000 جنيه' : 'e.g. 1,500,000 EGP'
  };
  for (const [id, text] of Object.entries(placeholders)) {
    const el = document.getElementById(id);
    if(el) el.placeholder = text;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('elshams_lang');
  const modal = document.getElementById('lang-modal');
  if (savedLang) {
    applyLanguage(savedLang);
    if(modal) modal.style.display = 'none';
  } else {
    if(modal) modal.style.display = 'flex';
  }
  if(typeof loadProperties === 'function') loadProperties();
});

// متغير لحفظ كل العقارات عشان الفلترة
let allProperties = []; 

// تحميل الداتا من الشيت
async function loadProperties() {
  const storeGrid = document.getElementById('dynamic-store');
  if(!storeGrid) return;
  const isHomePage = storeGrid.getAttribute('data-limit') === '3';
  storeGrid.innerHTML = '<p style="text-align:center; width:100%; font-family: Cairo;">جاري تحميل الوحدات...</p>';

  try {
    const scriptURL = 'https://script.google.com/macros/s/AKfycby3caTgOrfODKAJnGEze34S5cELRXJvReXRfsXRk4gme2GyGej_4m5y3z-775XSAwk/exec';
    const response = await fetch(scriptURL);
    const data = await response.json();
    
    // تسجيل العقارات مع رقمها الأصلي عشان التفاصيل
    allProperties = data.map((prop, index) => ({ ...prop, originalId: index + 1 }));
    
    if(allProperties.length === 0) {
       storeGrid.innerHTML = '<p style="text-align:center; width:100%;">لا توجد وحدات متاحة حالياً.</p>';
       return;
    }
    
    // عرض الكل في البداية
    renderProperties(isHomePage ? allProperties.slice(0, 3) : allProperties);

  } catch(error) {
    storeGrid.innerHTML = '<p style="text-align:center; width:100%; color:red;">حدث خطأ أثناء التحميل.</p>';
  }
}

// دالة رسم الكروت في الموقع (متعدلة عشان الكارت ميفرشحش)
function renderProperties(propertiesToRender) {
  const storeGrid = document.getElementById('dynamic-store');
  storeGrid.innerHTML = ''; 

  if(propertiesToRender.length === 0) {
      storeGrid.innerHTML = '<p style="text-align:center; width:100%; font-family: Cairo;">لا توجد وحدات في هذا القسم حالياً.</p>';
      return;
  }

  propertiesToRender.forEach(prop => {
    const isRent = prop.status.includes('إيجار') ? 'rent' : '';
    
    storeGrid.innerHTML += `
      <article class="store-card" style="max-width: 380px; width: 100%; margin: 0 auto; justify-self: center;">
        <div class="card-img-wrapper">
          <img src="${prop.image}" onerror="this.src='assets/elshams-property.jpg'" />
          <span class="status-badge ${isRent}">${prop.status}</span>
        </div>
        <div class="store-card-content">
          <span class="price" dir="ltr">${prop.price}</span>
          <h3 dir="rtl">${prop.title}</h3>
          <p dir="rtl">${prop.desc}</p>
          <a href="property.html?id=${prop.originalId}" class="store-btn" dir="rtl" style="text-decoration:none;">عرض التفاصيل والصور <span>←</span></a>
        </div>
      </article>`;
  });
}

// تفعيل زراير الفلترة للأقسام بذكاء
document.addEventListener('click', function(e) {
  if(e.target.classList.contains('filter-btn')) {
    // تغيير لون الزرار النشط
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const filterValue = e.target.getAttribute('data-filter');
    
    let filteredProps = [];
    
    if (filterValue === 'all') {
        filteredProps = allProperties;
    } else {
        // الفلترة جوه العنوان والوصف
        filteredProps = allProperties.filter(prop => {
            const text = prop.title + " " + prop.desc;
            
            // 1. قسم الشقق: أي عقار فيه كلمة شقة بيظهر هنا فوراً
            if (filterValue === 'شقة') {
                return ['شقه', 'شقة'].some(keyword => text.includes(keyword));
            }
            
            // 2. قسم المحلات (التجاري والإداري)
            if (filterValue === 'محل') {
                // استبعاد البيوت والفيلات حتى لو مكتوب تحتها محل
                if (prop.title.includes('بيت') || prop.title.includes('فيلا') || prop.title.includes('منزل')) return false;
                
                // البحث عن أي كلمة تدل على الإداري أو التجاري
                return ['محل', 'مكتب', 'اداري', 'إداري', 'صيدليه', 'صيدلية', 'تجاري'].some(keyword => text.includes(keyword));
            }
            
            // 3. قسم البيوت
            if (filterValue === 'بيت') {
                // استبعاد الشقق حتى لو الوصف فيه "بيت أهالي"
                if (prop.title.includes('شقه') || prop.title.includes('شقة')) return false;
                return ['بيت', 'فيلا', 'منزل'].some(keyword => text.includes(keyword));
            }
            
            // 4. قسم الأراضي
            if (filterValue === 'أرض') {
                return ['ارض', 'أرض'].some(keyword => text.includes(keyword));
            }
            
            return false;
        });
    }
    
    renderProperties(filteredProps);
  }
});

// فورم الملاك (اعرض عقارك للبيع)
const sellForm = document.getElementById('sell-form');
if (sellForm) {
  sellForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const submitBtn = document.getElementById('sell-submit-btn');
    const successMsg = document.getElementById('sell-success-msg');
    
    if(submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">جاري حفظ بيانات العقار...</span>';
    }
    
    const formData = new FormData(sellForm);
    
    try {
      const googleSheetURL = 'https://script.google.com/macros/s/AKfycby3caTgOrfODKAJnGEze34S5cELRXJvReXRfsXRk4gme2GyGej_4m5y3z-775XSAwk/exec'; 
      await fetch(googleSheetURL, { method: 'POST', body: formData });
      
      if(submitBtn) submitBtn.style.display = 'none';
      if(successMsg) {
         successMsg.style.display = 'block';
         successMsg.innerHTML = '<p style="color: #25D366; font-weight: bold; font-family: \'Cairo\'; font-size: 18px;">تم استلام تفاصيل عقارك بنجاح! سيتم مراجعتها والتواصل معك قريباً.</p>';
      }
      
      sellForm.reset();
      
    } catch (error) {
      if(submitBtn) {
        submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">حدث خطأ، حاول مرة أخرى</span>';
        submitBtn.disabled = false;
      }
    }
  });
}

// فورم المشترين (بيبعت للشيت وبيفتح واتساب بالرسالة جاهزة)
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = leadForm.querySelector('.submit-button');
    if(submitBtn) {
       submitBtn.disabled = true;
       submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">جاري تسجيل بياناتك...</span>';
    }

    const formData = new FormData(leadForm);
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const propType = document.getElementById('prop_type').value;
    const transType = document.getElementById('trans_type').value;
    const budget = document.getElementById('budget').value;
    const requestedProp = document.getElementById('requested_property') ? document.getElementById('requested_property').value : 'استفسار عام';

    try {
      const googleSheetURL = 'https://script.google.com/macros/s/AKfycby3caTgOrfODKAJnGEze34S5cELRXJvReXRfsXRk4gme2GyGej_4m5y3z-775XSAwk/exec'; 
      await fetch(googleSheetURL, { method: 'POST', body: formData });

      // تجميع رسالة الواتساب
      const whatsappMsg = `أهلاً عقارات الشمس، أنا ${name}.%0Aمحتاج: ${propType} (${transType})%0Aالميزانية في حدود: ${budget}%0Aالرقم: ${phone}%0Aالوحدة المطلوبة: ${requestedProp}`;
      
      if(submitBtn) {
         submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">تم الإرسال بنجاح ✔️</span>';
         submitBtn.disabled = false;
      }
      
      // فتح الواتساب مباشر
      window.open(`https://wa.me/201014973825?text=${whatsappMsg}`, '_blank');
      leadForm.reset();

    } catch (error) {
      if(submitBtn) {
         submitBtn.innerHTML = '<span style="font-family: \'Cairo\', sans-serif;">حدث خطأ، حاول مرة أخرى</span>';
         submitBtn.disabled = false;
      }
    }
  });
}