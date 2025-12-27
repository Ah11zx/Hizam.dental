/* ملف الجافاسكريبت
   يتحكم في التفاعلية والحركة في الموقع
*/

// 1. Initialize AOS (تشغيل مكتبة الأنيميشن)
AOS.init({
    once: true, // Animation happens only once
    offset: 100, // Offset from the original trigger point
    duration: 800, // Duration of animation
    easing: 'ease-out-cubic',
});

// 2. Sticky Header Logic (جعل القائمة العلوية تلتصق وتتغير عند النزول)
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.classList.remove('py-4');
    } else {
        header.classList.remove('scrolled');
        header.classList.add('py-4');
    }
});

// 3. Mobile Menu Logic (التحكم في زر القائمة للجوال)
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = btn.querySelector('i');

btn.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    // Toggle Icon (تغيير شكل الأيقونة بين خطوط و X)
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link (إغلاق القائمة عند الضغط على أي رابط)
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});
