/* ملف الجافاسكريبت
   يتحكم في التفاعلية والحركة في الموقع
*/

// 1. Initialize AOS (تشغيل مكتبة الأنيميشن)
AOS.init({
    once: true, // Animation happens only once
    offset: 100, // Offset from the original trigger point
    duration: 1000, // Duration of animation
    easing: 'ease-out-cubic',
});

// 2. Sticky Header Logic (جعل القائمة العلوية تلتصق وتتغير عند النزول)
const header = document.getElementById('main-header');
const headerLogo = document.getElementById('header-logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // تحويل الهيدر إلى شكل نحيف جداً وزجاجي شفاف
        header.classList.remove('bg-gradient-to-b', 'from-black/40', 'to-transparent', 'py-6');
        header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-1', 'border-b', 'border-gray-200/50');

        // تصغير الشعار بشكل ملحوظ ليناسب الشريط النحيف
        headerLogo.classList.remove('h-20', 'md:h-28');
        headerLogo.classList.add('h-8');
    } else {
        // إعادة الهيدر للحالة الأصلية الكبيرة المريحة
        header.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-1', 'border-b', 'border-gray-200/50');
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

// 4. Feedback Modal Logic (التحكم في نافذة الشكاوى والاقتراحات)
const feedbackModal = document.getElementById('feedbackModal');
const feedbackModalContent = document.getElementById('feedbackModalContent');
const openFeedbackBtn = document.getElementById('openFeedbackModal');
const closeFeedbackBtn = document.getElementById('closeFeedbackModal');
const feedbackForm = document.getElementById('feedbackForm');

// فتح النافذة المنبثقة
function openFeedbackModal() {
    feedbackModal.classList.remove('hidden');
    feedbackModal.classList.add('flex');
    // انتظار قليل ثم إضافة التأثيرات
    setTimeout(() => {
        feedbackModalContent.classList.remove('scale-95', 'opacity-0');
        feedbackModalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// إغلاق النافذة المنبثقة
function closeFeedbackModal() {
    feedbackModalContent.classList.remove('scale-100', 'opacity-100');
    feedbackModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        feedbackModal.classList.remove('flex');
        feedbackModal.classList.add('hidden');
    }, 300);
}

// ربط الأزرار بالدوال
openFeedbackBtn.addEventListener('click', openFeedbackModal);
closeFeedbackBtn.addEventListener('click', closeFeedbackModal);

// ربط زر القائمة المحمولة
const openFeedbackMobileBtn = document.getElementById('openFeedbackModalMobile');
if (openFeedbackMobileBtn) {
    openFeedbackMobileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // إغلاق القائمة المحمولة
        menu.classList.remove('active');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        // فتح modal الشكاوى
        openFeedbackModal();
    });
}

// إغلاق عند الضغط على الخلفية المعتمة
feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
        closeFeedbackModal();
    }
});

// إرسال النموذج عبر الإيميل
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // الحصول على البيانات من النموذج
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const type = document.getElementById('messageType').value;
    const message = document.getElementById('messageText').value;

    // تنسيق العنوان
    const subject = `${type} جديدة من ${name}`;

    // تنسيق نص الرسالة
    const body = `
السلام عليكم ورحمة الله وبركاته،

تم استلام ${type} جديدة من موقع مجمع الحزام الطبي:

----------------------------------------
الاسم: ${name}
رقم الجوال: ${phone}
نوع الرسالة: ${type}
----------------------------------------

الرسالة:
${message}

----------------------------------------
تم الإرسال من: موقع مجمع الحزام الطبي
التاريخ: ${new Date().toLocaleDateString('ar-SA')}
    `.trim();

    // إنشاء رابط mailto
    const mailtoLink = `mailto:alhzam2018@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // فتح تطبيق الإيميل
    window.location.href = mailtoLink;

    // إغلاق النافذة بعد ثانية
    setTimeout(() => {
        closeFeedbackModal();
        feedbackForm.reset();
    }, 1000);
});
