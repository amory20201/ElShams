// داتا الشقق (تقدر تزود وتعدل فيها براحتك)
const propertiesData = {
    "1": {
        title: "شقة 120 متر الترا سوبر لوكس",
        price: "850,000 جنيه",
        desc: "شقة مميزة جداً، 3 غرف ورسيبشن قطعتين، تشطيب حديث جاهزة على السكن فوراً. موقع استراتيجي.",
        images: ["img1.jpg", "img2.jpg", "img3.jpg"]
    },
    "2": {
        title: "شقة 100 متر نص تشطيب",
        price: "600,000 جنيه",
        desc: "شقة دور تالت، واجهة بحرية، تقسيم ممتاز للغرف.",
        images: ["img4.jpg", "img5.jpg"]
    }
};

// سحب رقم الشقة من اللينك
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');
const property = propertiesData[propertyId];

// عرض البيانات في الصفحة
if (property) {
    document.getElementById('prop-title').innerText = property.title;
    document.getElementById('prop-price').innerText = property.price;
    document.getElementById('prop-desc').innerText = property.desc;
    document.getElementById('prop-id-hidden').value = propertyId;

    // عرض الصور
    const gallery = document.getElementById('prop-images');
    property.images.forEach(imgSrc => {
        let imgTag = document.createElement('img');
        imgTag.src = imgSrc;
        imgTag.className = "gallery-img";
        gallery.appendChild(imgTag);
    });
}

// التعامل مع الفورم والتحويل لرسايل الفيس بوك
document.getElementById('property-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let clientName = document.getElementById('client-name').value;
    
    // إرسال البيانات لجوجل شيت (حط لينك الـ Apps Script بتاعك هنا)
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; 
    let formData = new FormData();
    formData.append('name', clientName);
    formData.append('property_id', propertyId);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            // التحويل المباشر لرسايل بروفايل الفيس بوك
            // استبدل PROFILE_ID بالـ ID أو الـ Username بتاع بروفايلك
            window.location.href = "https://m.me/PROFILE_ID";
        })
        .catch(error => console.error('Error!', error.message));
});