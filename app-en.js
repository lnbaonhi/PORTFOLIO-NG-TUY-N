/**
 * Le Ngoc Bao Nhi - Marketing Executive Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarScroll();
    initMobileNav();
    initCounters();
    initDashboardTabs();
    initPortfolioFilter();
    initLightboxModal();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        
        // Update Icon
        const icon = themeBtn.querySelector('i');
        if (newTheme === 'light') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    });
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close on link click
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================================================================
   4. ANIMATED NUMERIC COUNTERS
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 1500; // ms
                    const stepTime = Math.abs(Math.floor(duration / target));

                    const timer = setInterval(() => {
                        count += 1;
                        counter.innerText = count;
                        if (count >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats-grid');
    if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. DASHBOARD TABS SWITCHING
   ========================================================================== */
function initDashboardTabs() {
    const tabs = document.querySelectorAll('.dash-tab');
    const panels = document.querySelectorAll('.dash-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/* ==========================================================================
   6. PORTFOLIO CATEGORY FILTER & LIVE SEARCH
   ========================================================================== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPortfolio();
        });
    });
}

function filterPortfolio() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const searchQuery = (document.getElementById('portfolio-search')?.value || '').toLowerCase().trim();
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const searchTitle = (item.getAttribute('data-title') || '').toLowerCase();

        const matchesFilter = (activeFilter === 'all' || category === activeFilter);
        const matchesSearch = (!searchQuery || searchTitle.includes(searchQuery));

        if (matchesFilter && matchesSearch) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

/* ==========================================================================
   7. LIGHTBOX MODAL WITH REAL CAMPAIGN DATA
   ========================================================================== */
const projectDatabase = {
    p1: {
        title: "New Store Opening (Khu Chung Cư)",
        category: "New Store Opening",
        image: "assets/images/openings/keystore_1.jpg",
        desc: "Xây dựng trọn gói kế hoạch tiếp thị khai trương cửa hàng mới in an apartment complex. Triển khai bộ ấn phẩm POSM đồng bộ, chuẩn bị 830+ suất quà tặng 'Mua Vui Mở Hàng', thu hút lượng khách ghé thăm trong ngày đầu.",
        scope: "Cửa hàng mới — khu chung cư",
        kpi: "Phát thành công 790/830 quà tặng (Rate 95,2%), Rate Chi phí/Doanh thu đạt 5,7%",
        vendor: "Nhà cung cấp FMCG đồng hành"
    },
    p2: {
        title: "Lễ Cắt Băng & Vận Hành New Store Opening",
        category: "Event Management & Public Relations",
        image: "assets/images/openings/ribbon_cut.jpg",
        desc: "Operations lead nghi thức cắt băng khai trương, đón tiếp khách mời VIP và điều phối nhân sự sự kiện. Đảm bảo toàn bộ không gian cửa hàng trang trí ấn tượng, tạo ấn tượng mạnh mẽ cho cư dân khu vực.",
        scope: "Khu vực Cửa hàng Khai trương",
        kpi: "Hơn 1.200 lượt khách đến mua sắm trong 3 ngày đầu",
        vendor: "Ban lãnh đạo & Đối tác bất động sản"
    },
    p3: {
        title: "A4 Promotion Mechanics Sheet",
        category: "POSM & Quảng Cáo In Ấn",
        image: "assets/images/posm/poster_a4_1.jpg",
        desc: "Thiết kế POSM A4 thông tin thể lệ chương trình khuyến mãi, đặt tại quầy thu ngân làm công cụ tư vấn trực tiếp cho nhân viên khi thanh toán.",
        scope: "Toàn bộ chuỗi Co.opSmile",
        kpi: "100% Ấn phẩm bàn giao trước deadline 2 ngày, không lỗi thông tin giá",
        vendor: "Nhãn hàng FMCG xuất hiện trang bìa & trang nhất"
    },
    p4: {
        title: "53×80cm Shopping Guide Poster",
        category: "POSM & Key Visual",
        image: "assets/images/posm/poster_a4_2.jpg",
        desc: "Thiết kế poster 53×80cm theo từng kỳ cẩm nang mua sắm với danh mục hơn 20 sản phẩm giảm giá, trưng bày dán kính trước cửa hàng.",
        scope: "Chuỗi cửa hàng tiện lợi Cheers",
        kpi: "Góp phần tăng 18% lượng khách ghé thăm ngẫu hứng (Walk-in traffic)",
        vendor: "Bộ phận Marketing nội bộ"
    },
    p5: {
        title: "Tích Điểm Đổi Quà Thương Hiệu Dutch Lady",
        category: "Truyền Thông Chiến Dịch Nhãn Hàng & CRM",
        image: "assets/images/social/dutch_lady.jpg",
        desc: "Thiết kế banner và truyền thông chương trình Mua Sữa Tích Điểm Đổi Quà của nhãn Dutch Lady triển khai tại chuỗi, trên Fanpage và nhóm Zalo.",
        scope: "Khách hàng thành viên (KHTV)",
        kpi: "Tăng 35% doanh số ngành hàng Sữa trong tháng triển khai",
        vendor: "FrieslandCampina Vietnam (Dutch Lady)"
    },
    p6: {
        title: "CTKM Giải Nhiệt: Dừa Tươi Mua 1 Tặng 1",
        category: "Social Media Campaign & Digital Banner",
        image: "assets/images/social/dua_1tang1.jpg",
        desc: "Thiết kế banner truyền thông chiến dịch Mua 1 Tặng 1 Nước Dừa Tươi nhân dịp nắng nóng đỉnh điểm mùa hè. Chạy truyền thông trên Facebook Fanpage và nhóm Zalo Cư Dân.",
        scope: "Hệ thống cửa hàng tiện lợi Cheers",
        kpi: "Đẩy mạnh sản lượng bán nước dừa tươi trong cao điểm nắng nóng",
        vendor: "Nhà Cung Cấp Nông Sản Sạch"
    },
    p7: {
        title: "Double Stamp Collection Programme Đổi Quà",
        category: "Loyalty Program & CRM Boost",
        image: "assets/images/social/x2_tem.jpg",
        desc: "Chiến dịch kích cầu mua sắm nhân dịp sinh nhật chuỗi Cheers. Nhân đôi điểm tem tích lũy cho khách hàng mua sắm hóa đơn từ 50k.",
        scope: "Khách hàng mua sắm tại chuỗi Cheers",
        kpi: "Tăng 25% giá trị hóa đơn bình thường (Basket Size)",
        vendor: "Đội ngũ Loyalty nội bộ"
    },
    p10: {
        title: "Store Opening Leaflet",
        category: "Ấn Phẩm Sự Kiện Khai Trương",
        image: "assets/images/posm/torroi_khaitruong.jpg",
        desc: "Tờ rơi khổ A5 gồm 4 trang, phát trực tiếp tại sự kiện khai trương. Trang bìa giới thiệu các chương trình khuyến mãi diễn ra tại sự kiện; các trang trong là danh mục sản phẩm ưu đãi và giảm giá chỉ áp dụng trong tuần lễ khai trương.",
        scope: "Phát tại điểm bán trong tuần lễ khai trương",
        kpi: "4 trang khổ A5, phát hành đúng ngày khai trương",
        vendor: "Bộ phận Marketing nội bộ"
    },
    p9: {
        title: "Shopping Guide Booklet (A4)",
        category: "POSM & Quảng Cáo In Ấn",
        image: "assets/images/posm/cnms_01.jpg",
        desc: "Cuốn A4 phát hành theo từng kỳ khuyến mãi: trang bìa chủ đề, các trang danh mục sản phẩm giảm giá và trang thông tin đặt hàng giao tận nơi. Thiết kế và chuẩn hóa toàn bộ theo tiêu chuẩn thương hiệu.",
        scope: "Toàn bộ chuỗi Co.opSmile",
        kpi: "5 pages per cycle, bàn giao đúng hạn trước ngày khởi động chương trình",
        vendor: "Bộ phận Marketing nội bộ"
    },
    p8: {
        title: "Truyền Thông Ưu Đãi Hằng Tháng Từ Đối Tác Nền Tảng",
        category: "Social Media & Promo Communication",
        image: "assets/images/social/online_promo.jpg",
        desc: "Các đối tác như ShopeeFood, GrabMart... có chương trình ưu đãi hằng tháng dành riêng cho chuỗi. Tôi thiết kế bài đăng và triển khai truyền thông đến khách hàng qua Fanpage và nhóm Zalo cư dân.",
        scope: "Fanpage Cheers, Co.opSmile & nhóm Zalo cư dân",
        kpi: "Bài truyền thông phủ đều mỗi kỳ ưu đãi hằng tháng",
        vendor: "Phối hợp bộ phận phụ trách nền tảng giao hàng"
    }
};

function initLightboxModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalCat = document.getElementById('modal-cat');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalScope = document.getElementById('modal-scope');
    const modalKpi = document.getElementById('modal-kpi');
    const modalVendor = document.getElementById('modal-vendor');

    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', () => {
            const pid = card.getAttribute('data-id');
            const data = projectDatabase[pid];

            if (data) {
                // Dùng lại ảnh thumbnail của card — tránh nhúng trùng ảnh
                // lần thứ hai khi đóng gói trang thành 1 file tự chứa.
                const thumb = card.querySelector('.card-thumb img');
                modalImg.src = thumb ? thumb.src : data.image;
                modalCat.innerText = data.category;
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modalScope.innerText = data.scope;
                modalKpi.innerText = data.kpi;
                modalVendor.innerText = data.vendor;

                modal.classList.add('active');
            }
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

/* ==========================================================================
   8. PRINTABLE CV MODAL FUNCTIONS
   ========================================================================== */
function openCvModal() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) cvModal.classList.add('active');
}

function closeCvModal() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) cvModal.classList.remove('active');
}

/* ==========================================================================
   9. CAMPAIGN ROI CALCULATOR
   ========================================================================== */

function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

