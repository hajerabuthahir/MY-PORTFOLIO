/* =========================================================
   HAJER PORTFOLIO V2
   PREMIUM INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");
    const progress = document.getElementById("loaderProgress");
    const percent = document.getElementById("loaderPercent");

    let loadValue = 0;

    const loaderInterval = setInterval(() => {

        loadValue += Math.random() * 10;

        if (loadValue >= 100) {

            loadValue = 100;

            clearInterval(loaderInterval);

            progress.style.width = "100%";
            percent.textContent = "100%";

            setTimeout(() => {

                loader.classList.add("hide");

                document.body.classList.add("loaded");

            }, 500);

        }

        progress.style.width = `${loadValue}%`;
        percent.textContent = `${Math.floor(loadValue)}%`;

    }, 80);


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        }

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * .14;
        ringY += (mouseY - ringY) * .14;

        if (cursorRing) {

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

        }

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    /* =====================================================
       CURSOR HOVER
    ===================================================== */

    const interactiveElements = document.querySelectorAll(
        "a, button, [data-tilt], .project-card, .skill-card"
    );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            document.body.classList.add("cursor-hover");

        });

        element.addEventListener("mouseleave", () => {

            document.body.classList.remove("cursor-hover");

        });

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements = document.querySelectorAll(".magnetic");

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", (e) => {

            const rect = element.getBoundingClientRect();

            const x =
                e.clientX -
                (rect.left + rect.width / 2);

            const y =
                e.clientY -
                (rect.top + rect.height / 2);

            element.style.transform =
                `translate(${x * .15}px, ${y * .15}px)`;

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform = "";

        });

    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        },
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        document.body.style.overflow =
            mobileMenu.classList.contains("open")
                ? "hidden"
                : "";

    });


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            document.body.style.overflow = "";

        });

    });


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingText =
        document.getElementById("typingText");

    const roles = [

        "IT Student",
        "Developer",
        "Creative Technologist",
        "AI Explorer",
        "Problem Solver"

    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {

        if (!typingText) return;

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            characterIndex++;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );

            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(typeRole, 1600);

                return;

            }

        } else {

            characterIndex--;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );

            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

            }

        }

        setTimeout(
            typeRole,
            deleting ? 45 : 85
        );

    }

    setTimeout(typeRole, 1000);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       TIMELINE
    ===================================================== */

    const timeline =
        document.querySelector(".timeline");

    if (timeline) {

        const timelineObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            timeline.classList.add(
                                "active"
                            );

                        }

                    });

                },
                {
                    threshold: .1
                }
            );

        timelineObserver.observe(timeline);

    }


    /* =====================================================
       3D TILT
    ===================================================== */

    const tiltElements =
        document.querySelectorAll("[data-tilt]");

    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;

    if (!isTouchDevice) {

        tiltElements.forEach(element => {

            element.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        e.clientX - rect.left;

                    const y =
                        e.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -4;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        4;

                    element.style.transform =
                        `perspective(1200px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       MOUSE PARALLAX AMBIENT LIGHT
    ===================================================== */

    const ambientOne =
        document.querySelector(".ambient-one");

    const ambientTwo =
        document.querySelector(".ambient-two");

    const ambientThree =
        document.querySelector(".ambient-three");

    window.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (e.clientX /
                    window.innerWidth -
                    .5);

            const y =
                (e.clientY /
                    window.innerHeight -
                    .5);

            if (ambientOne) {

                ambientOne.style.transform =
                    `translate(
                        ${x * 60}px,
                        ${y * 60}px
                    )`;

            }

            if (ambientTwo) {

                ambientTwo.style.transform =
                    `translate(
                        ${x * -45}px,
                        ${y * -45}px
                    )`;

            }

            if (ambientThree) {

                ambientThree.style.transform =
                    `translate(
                        ${x * 30}px,
                        ${y * 30}px
                    )`;

            }

        },
        { passive: true }
    );


    /* =====================================================
       PROJECT MOUSE GLOW
    ===================================================== */

    const projectImages =
        document.querySelectorAll(".project-image");

    projectImages.forEach(image => {

        image.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    image.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const glow =
                    image.querySelector(
                        ".project-glow"
                    );

                if (glow) {

                    glow.style.left =
                        `${x}px`;

                    glow.style.top =
                        `${y}px`;

                }

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                        });

                        const activeLink =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },
            {
                threshold: .35
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       RESUME MODAL
    ===================================================== */

    const resumeBtn =
        document.getElementById("resumeBtn");

    const resumeModal =
        document.getElementById("resumeModal");

    const resumeClose =
        document.getElementById("resumeClose");

    const resumeBackdrop =
        document.getElementById("resumeBackdrop");


    function openResume() {

        resumeModal.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeResume() {

        resumeModal.classList.remove("open");

        document.body.style.overflow = "";

    }


    if (resumeBtn) {

        resumeBtn.addEventListener(
            "click",
            openResume
        );

    }


    if (resumeClose) {

        resumeClose.addEventListener(
            "click",
            closeResume
        );

    }


    if (resumeBackdrop) {

        resumeBackdrop.addEventListener(
            "click",
            closeResume
        );

    }


    document.addEventListener(
        "keydown",
        (e) => {

            if (
                e.key === "Escape" &&
                resumeModal.classList.contains("open")
            ) {

                closeResume();

            }

        }
    );


    /* =====================================================
       SMOOTH ANCHOR OFFSET
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(e) {

                    const id =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        id === "#" ||
                        !document.querySelector(id)
                    ) {

                        return;

                    }

                    e.preventDefault();

                    const target =
                        document.querySelector(id);

                    const offset = 80;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroTitle =
        document.querySelector(".hero-title");

    const codeCard =
        document.querySelector(".hero-code-card");


    if (!isTouchDevice && hero) {

        hero.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const px =
                    x / rect.width - .5;

                const py =
                    y / rect.height - .5;

                if (heroTitle) {

                    heroTitle.style.transform =
                        `translate(
                            ${px * 8}px,
                            ${py * 5}px
                        )`;

                }

                if (codeCard) {

                    codeCard.style.transform =
                        `rotate(5deg)
                         translate(
                            ${px * -20}px,
                            ${py * -20}px
                         )`;

                }

            }
        );

        hero.addEventListener(
            "mouseleave",
            () => {

                if (heroTitle) {

                    heroTitle.style.transform =
                        "";

                }

                if (codeCard) {

                    codeCard.style.transform =
                        "rotate(5deg)";

                }

            }
        );

    }


    /* =====================================================
       CONTACT BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(".contact-button")
        .forEach(button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    button.style.boxShadow =
                        "0 0 0 1px rgba(155,92,255,.15), 0 20px 80px rgba(155,92,255,.2)";

                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.boxShadow = "";

                }
            );

        });


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                document.title =
                    "Come back soon — Hajer.";

            } else {

                document.title =
                    "Hajer Abuthahir | Developer Portfolio";

            }

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c HAJER PORTFOLIO V2 ",
        "background:#9b5cff;color:#fff;padding:8px 14px;font-weight:bold;"
    );

    console.log(
        "Built with HTML, CSS & JavaScript."
    );

});