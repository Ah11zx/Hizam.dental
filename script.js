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
const headerLogo = document.getElementById('header-logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // تحويل الهيدر إلى شكل نحيف جداً وزجاجي شفاف
        header.classList.remove('bg-gradient-to-b', 'from-black/40', 'to-transparent', 'py-6');
        header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-1');

        // تصغير الشعار بشكل ملحوظ ليناسب الشريط النحيف
        headerLogo.classList.remove('h-20', 'md:h-28');
        headerLogo.classList.add('h-8');
    } else {
        // إعادة الهيدر للحالة الأصلية الكبيرة المريحة
        header.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-1');
        header.classList.add('bg-gradient-to-b', 'from-black/40', 'to-transparent', 'py-6');

        // إعادة الشعار لحجمه الكبير الواضح
        headerLogo.classList.remove('h-8');
        headerLogo.classList.add('h-20', 'md:h-28');
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
