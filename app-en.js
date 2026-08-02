/**
 * Lê Ngọc Bảo Nhi - Marketing Executive Portfolio Script
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
        title: "New Store Opening (Apartment Complex)",
        category: "New Store Opening",
        image: "assets/images/openings/keystore_1.jpg",
        desc: "End-to-end marketing plan for a new store opening in an apartment complex. Rolled out a coordinated POSM suite and prepared 830+ gifts under the 'Opening Day Cheer' programme to drive footfall from day one.",
        scope: "New store — apartment complex",
        kpi: "790 of 830 gifts redeemed (95.2%), cost-to-revenue ratio at 5.7%",
        vendor: "Partnering FMCG suppliers"
    },
    p2: {
        title: "Ribbon-Cutting Ceremony & Opening Day Operations",
        category: "Event Management & Public Relations",
        image: "assets/images/openings/ribbon_cut.jpg",
        desc: "Ran the ribbon-cutting ceremony, hosted VIP guests and coordinated event staffing, with the full store space dressed to make a strong first impression on local residents.",
        scope: "Opening store and surrounding area",
        kpi: "Over 1,200 shoppers in the first three days",
        vendor: "Company leadership & property partner"
    },
    p3: {
        title: "A4 Promotion Mechanics Sheet",
        category: "POSM & Print Advertising",
        image: "assets/images/posm/poster_a4_1.jpg",
        desc: "Designed an A4 POSM sheet setting out the promotion mechanics, placed at the checkout counter as a tool for staff to explain the offer at the point of payment.",
        scope: "Across the Co.opSmile chain",
        kpi: "100% delivered two days ahead of deadline, with no pricing errors",
        vendor: "FMCG brands featured on cover and front page"
    },
    p4: {
        title: "53×80cm Shopping Guide Poster",
        category: "POSM & Key Visual",
        image: "assets/images/posm/poster_a4_2.jpg",
        desc: "Designed a 53×80cm poster for each shopping-guide cycle, listing 20+ discounted products and displayed on the storefront glass.",
        scope: "Cheers convenience store chain",
        kpi: "Contributed to an 18% lift in walk-in traffic",
        vendor: "In-house Marketing team"
    },
    p5: {
        title: "Dutch Lady Points Redemption Programme",
        category: "Brand Campaign Communications & CRM",
        image: "assets/images/social/dutch_lady.jpg",
        desc: "Designed banners and ran communications for Dutch Lady's buy-milk-collect-points programme as deployed across the chain, on Facebook and Zalo groups.",
        scope: "Membership cardholders",
        kpi: "35% increase in dairy category sales during the campaign month",
        vendor: "FrieslandCampina Vietnam (Dutch Lady)"
    },
    p6: {
        title: "Summer Refresh: Fresh Coconut Buy One Get One",
        category: "Social Media Campaign & Digital Banner",
        image: "assets/images/social/dua_1tang1.jpg",
        desc: "Designed campaign banners for a buy-one-get-one fresh coconut water offer at the peak of the summer heat, promoted on the Facebook page and resident Zalo groups.",
        scope: "Cheers convenience store network",
        kpi: "Drove fresh coconut water volume through the summer peak",
        vendor: "Fresh produce supplier"
    },
    p7: {
        title: "Double Stamp Collection Programme",
        category: "Loyalty Program & CRM Boost",
        image: "assets/images/social/x2_tem.jpg",
        desc: "A demand-driving campaign for the Cheers chain anniversary, doubling collection stamps for customers with receipts from VND 50,000.",
        scope: "Shoppers across the Cheers chain",
        kpi: "25% increase in average basket size",
        vendor: "In-house Loyalty team"
    },
    p10: {
        title: "Store Opening Leaflet",
        category: "Store Opening Event Collateral",
        image: "assets/images/posm/torroi_khaitruong.jpg",
        desc: "A four-page A5 leaflet handed out at the opening event. The cover introduces the promotions running on the day, while the inside pages list the discounted products available only during opening week.",
        scope: "Distributed in store during opening week",
        kpi: "Four A5 pages, released on opening day as scheduled",
        vendor: "In-house Marketing team"
    },
    p9: {
        title: "Shopping Guide Booklet (A4)",
        category: "POSM & Print Advertising",
        image: "assets/images/posm/cnms_01.jpg",
        desc: "An A4 booklet issued each promotion cycle: a themed cover, product listing pages and a page covering home delivery ordering. Designed and standardised throughout to brand guidelines.",
        scope: "Across the Co.opSmile chain",
        kpi: "Five pages per cycle, delivered on time ahead of each launch",
        vendor: "In-house Marketing team"
    },
    p8: {
        title: "Monthly Partner Platform Offer Communications",
        category: "Social Media & Promo Communication",
        image: "assets/images/social/online_promo.jpg",
        desc: "Partners such as ShopeeFood and GrabMart run monthly offers reserved for our chains. I design the posts and run the communications to customers via Facebook and resident Zalo groups.",
        scope: "Cheers and Co.opSmile pages & resident Zalo groups",
        kpi: "Consistent post coverage for every monthly offer cycle",
        vendor: "In coordination with the delivery platform team"
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

