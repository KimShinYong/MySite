// ===== 스무스 스크롤 =====
const navMenuItems = document.querySelectorAll(".header__menu__item");
const arrowUp = document.querySelector(".arrow-up");

function smoothScrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

navMenuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const href = item.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const id = href.substring(1);
    smoothScrollToSection(id);
  });
});

if (arrowUp) {
  arrowUp.addEventListener("click", (event) => {
    event.preventDefault();
    smoothScrollToSection("home");
  });
}

// ===== 현재 섹션에 따라 메뉴 하이라이트 =====
const sections = document.querySelectorAll(
  "section#home, section#about, section#skills, section#work, section#license, footer#contact"
);

const menuMap = {};
navMenuItems.forEach((item) => {
  const href = item.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const id = href.substring(1);
  menuMap[id] = item;
});

let currentActiveItem = menuMap["home"];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      const correspondingMenu = menuMap[id];
      if (!correspondingMenu) return;

      if (currentActiveItem) {
        currentActiveItem.classList.remove("active");
      }
      correspondingMenu.classList.add("active");
      currentActiveItem = correspondingMenu;
    });
  },
  {
    root: null,
    threshold: 0.3,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===== 스크롤 애니메이션 (페이드인 / 슬라이드 인) =====
const animatedSections = document.querySelectorAll(".section");

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    root: null,
    threshold: 0.2,
  }
);

animatedSections.forEach((section) => animationObserver.observe(section));

// ===== 인삿말 =====
const greetingEl = document.getElementById("greeting");

if (greetingEl) {
  const now = new Date();
  const hour = now.getHours();
  let greetingText = "";

  if (hour >= 5 && hour < 12) {
    greetingText = "좋은 아침입니다! ";
  } else if (hour >= 12 && hour < 18) {
    greetingText = "좋은 오후입니다! ";
  } else {
    greetingText = "좋은 밤입니다! ";
  }

  greetingEl.textContent =
    greetingText + "우리집에서 가장 뛰어난 AI 개발자입니다.";
}

// ===== 다크 모드 / 라이트 모드 전환 =====
const themeToggleBtn = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.dataset.theme = savedTheme;

if (themeToggleBtn) {
  themeToggleBtn.textContent = savedTheme === "light" ? "☀️" : "🌙";

  themeToggleBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    const nextTheme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    themeToggleBtn.textContent = nextTheme === "light" ? "☀️" : "🌙";
  });
}

// ===== work 부분 필터링 (Front-end / Mobile / Back-end) =====
const categories = document.querySelectorAll(".category");
const projects = document.querySelectorAll(".project");

categories.forEach((categoryBtn) => {
  categoryBtn.addEventListener("click", () => {
    categories.forEach((btn) => btn.classList.remove("category--selected"));
    categoryBtn.classList.add("category--selected");

    const filter = categoryBtn.dataset.filter;

    projects.forEach((project) => {
      const type = project.dataset.type;

      if (filter === "all") {
        project.style.display = "block";
      } else if (type === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// ===== 메뉴 토글 =====
const menuToggleBtn = document.getElementById("menu-toggle");
const headerNav = document.querySelector(".header__nav");

if (menuToggleBtn && headerNav) {
  const menuIcon = menuToggleBtn.querySelector("i");

  menuToggleBtn.addEventListener("click", () => {
    const isOpen = headerNav.classList.toggle("show");

    if (isOpen) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });
}

navMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!headerNav) return;

    headerNav.classList.remove("show");

    const menuIcon = menuToggleBtn?.querySelector("i");
    if (menuIcon) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });
});
