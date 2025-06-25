 let navOpen = false;
  function toggleMenu() {
    navOpen = !navOpen;
    const navLinks = document.querySelector(".navbar-links");
    if (navOpen) {
      navLinks.classList.add("open");
    } else {
      navLinks.classList.remove("open");
    }
  }
  if (typeof window !== "undefined") {
    window.toggleMenu = toggleMenu;
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        document.querySelector(".navbar-links").classList.remove("open");
        navOpen = false;
      }
    });

    window.openImageModal = function (src, alt) {
      const modal = document.getElementById("imageModal");
      const modalImg = document.getElementById("modalImg");
      const caption = document.getElementById("caption");
      modal.style.display = "flex";
      modalImg.src = src;
      modalImg.alt = alt;
      caption.textContent = alt;
      document.body.style.overflow = "hidden";
    };
    window.closeImageModal = function () {
      document.getElementById("imageModal").style.display = "none";
      document.body.style.overflow = "";
    };
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") window.closeImageModal();
    });
    document.addEventListener("click", (e) => {
      const modal = document.getElementById("imageModal");
      if (modal && modal.style.display === "flex" && e.target === modal) {
        window.closeImageModal();
      }
    });
  }

  // Script for navbar scroll effect
  const navbar = document.getElementById("main-navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Ensure external fonts are loaded
  const link1 = document.createElement("link");
  link1.href =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap";
  link1.rel = "stylesheet";
  document.head.appendChild(link1);