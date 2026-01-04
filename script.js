(function () {
    emailjs.init("FN7eVtCPlRnbzYduu");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_c26aquo",
        "template_kexqgy1",
        this
    )
        .then(function () {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        }, function (error) {
            alert("Failed to send message.");
            console.log(error);
        });
});
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const mainContent = document.querySelector(".main-content");

    // --- Preloader Logic ---
    const preloader = document.getElementById("preloader");
    const preloaderText = document.getElementById("preloader-text");
    const preloaderForm = document.getElementById("preloader-form");
    const visitorNameInput = document.getElementById("visitor-name");
    const preloaderSkipBtn = document.getElementById("preloader-skip-btn");
    const preloaderWelcomeText = "Hey, I'm Kiran.";
    let preloaderCharIndex = 0;

    function typePreloaderText() {
        if (preloaderCharIndex < preloaderWelcomeText.length) {
            preloaderText.textContent +=
                preloaderWelcomeText.charAt(preloaderCharIndex);
            preloaderCharIndex++;
            setTimeout(typePreloaderText, 100);
        } else {
            preloaderForm.classList.add("visible");
            visitorNameInput.focus();
            setTimeout(() => {
                preloaderSkipBtn.classList.add("visible");
            }, 3000);
        }
    }
    function proceedToSite() {
        preloader.classList.add("fade-out");
        mainContent.classList.add("visible");
        body.classList.remove("preloader-active");

        // ✅ SHOW NAVBAR
        document.getElementById("header").classList.add("nav-visible");

        setTimeout(() => {
            preloader.style.display = "none";
            startMainContentAnimations();
        }, 700);
    }

    visitorNameInput.addEventListener("input", () => {
        if (visitorNameInput.classList.contains("input-error")) {
            visitorNameInput.classList.remove("input-error");
        }
    });

    preloaderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const visitorName = visitorNameInput.value.trim();
        if (visitorName !== "") {
            visitorNameInput.classList.remove("input-error");
            proceedToSite();
        } else {
            visitorNameInput.classList.add("input-error");
        }
    });

    preloaderSkipBtn.addEventListener("click", (e) => {
        e.preventDefault();
        proceedToSite();
    });

    typePreloaderText();

    // --- Meteor Shower Background ---
    const canvas = document.getElementById("meteorCanvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let animationFrameId;

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createStars();
    });

    let stars = [];
    let meteors = [];

    function createStars() {
        stars = Array.from({ length: 130 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.3,
            // MODIFICATION: Increased speed
            speed: 0.1 + Math.random() * 0.2,
        }));
    }

    function createMeteor() {
        const angle = Math.PI / 4;
        const speedMagnitude = 4 + Math.random() * 3;
        const length = 300 + Math.random() * 300;
        return {
            x: -50,
            y: Math.random() * height * 0.2 - 50,
            length: length,
            speedX: speedMagnitude * Math.cos(angle),
            speedY: speedMagnitude * Math.sin(angle),
            opacity: 0.7 + Math.random() * 0.3,
            color:
                Math.random() > 0.5 ? "rgba(173,216,230,1)" : "rgba(0,191,255,1)",
        };
    }

    function spawnMeteors() {
        if (meteors.length < 5) {
            const count = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) {
                meteors.push(createMeteor());
            }
        }
    }

    function drawStars() {
        ctx.fillStyle = "white";
        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > height + star.size) {
                star.y = 0 - star.size;
                star.x = Math.random() * width;
            }
        });
    }

    function drawMeteors() {
        meteors.forEach((meteor, index) => {
            const tailEndX =
                meteor.x -
                (meteor.speedX /
                    Math.sqrt(meteor.speedX ** 2 + meteor.speedY ** 2)) *
                meteor.length;
            const tailEndY =
                meteor.y -
                (meteor.speedY /
                    Math.sqrt(meteor.speedX ** 2 + meteor.speedY ** 2)) *
                meteor.length;
            const gradient = ctx.createLinearGradient(
                meteor.x,
                meteor.y,
                tailEndX,
                tailEndY
            );
            const headColor = meteor.color.replace(
                /,1\)/,
                `,${meteor.opacity})`
            );
            const tailColor = meteor.color.replace(/,1\)/, ",0)");
            gradient.addColorStop(0, headColor);
            gradient.addColorStop(1, tailColor);
            ctx.shadowBlur = 15;
            ctx.shadowColor = meteor.color.replace(
                /,1\)/,
                `,${meteor.opacity * 0.5})`
            );
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3.5;
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(tailEndX, tailEndY);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            meteor.x += meteor.speedX;
            meteor.y += meteor.speedY;
            if (
                meteor.x > width + meteor.length ||
                meteor.y > height + meteor.length
            ) {
                meteors.splice(index, 1);
            }
        });
    }

    function animateCanvas() {
        if (!body.classList.contains("preloader-active")) {
            ctx.clearRect(0, 0, width, height);
            drawStars();
            drawMeteors();
        }
        animationFrameId = requestAnimationFrame(animateCanvas);
    }

    // --- Function to start animations AFTER preloader ---
    function startMainContentAnimations() {
        // --- Hero Animations ---
        const nameEl = document.getElementById("hero-name-reveal");
        const roleEl = document.getElementById("hero-role-typewriter");

        function animateNameFromCenter() {
            const text = "Kiran Balaso Patil";
            const letters = text.split("");
            nameEl.innerHTML = "";
            const spans = letters.map((letter) => {
                const span = document.createElement("span");
                span.textContent = letter === " " ? "\u00A0" : letter;
                nameEl.appendChild(span);
                return span;
            });
            const mid = Math.floor(spans.length / 2);
            let delay = 0;
            for (let i = 0; i <= mid; i++) {
                const leftIndex = mid - i;
                const rightIndex = mid + i;
                if (leftIndex >= 0) {
                    setTimeout(() => {
                        if (spans[leftIndex]) spans[leftIndex].style.opacity = "1";
                    }, delay);
                }
                if (rightIndex < spans.length && rightIndex !== leftIndex) {
                    setTimeout(() => {
                        if (spans[rightIndex]) spans[rightIndex].style.opacity = "1";
                    }, delay);
                }
                delay += 90;
            }
        }

        class Typewriter {
            constructor(element, roles) {
                this.el = element;
                this.roles = roles;
                this.loopNum = 0;
                this.txt = "";
                this.isDeleting = false;
                this.tick();
            }
            tick() {
                const i = this.loopNum % this.roles.length;
                const fullTxt = this.roles[i];
                let typeSpeed = 150;
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                    typeSpeed = 75;
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
                this.el.innerHTML = `${this.txt}<span class="typewriter-cursor"></span>`;
                if (!this.isDeleting && this.txt === fullTxt) {
                    typeSpeed = 2000;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === "") {
                    this.isDeleting = false;
                    this.loopNum++;
                    typeSpeed = 500;
                }
                setTimeout(() => this.tick(), typeSpeed);
            }
        }

        setTimeout(() => {
            animateNameFromCenter();
            // UPDATED: New typewriter roles
            new Typewriter(roleEl, [
                "Aspiring Full Stack Developer",
                "Front-end Developer",
                "AI Prompter",
            ]);
        }, 100);

        // --- Animate on Scroll ---
        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            scrollObserver.observe(el);
        });
    }

    // --- Initialize Canvas ---
    createStars();
    setInterval(spawnMeteors, 10000);
    spawnMeteors();
    animateCanvas();

    // --- Mobile Nav ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu-mobile");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu-mobile a").forEach((link) => {
        link.addEventListener("click", () => {
            body.classList.remove("nav-open");
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- NEW: Popup Contact Form Logic ---
    const openBtn = document.getElementById("floating-contact-btn");
    const closeBtn = document.getElementById("popup-back-btn");
    const popup = document.getElementById("contact-popup-overlay");

    function setPopupInputsEnabled(enabled) {
        popup.querySelectorAll("input, textarea, button").forEach(el => {
            if (enabled) {
                el.removeAttribute("disabled");
            } else {
                el.setAttribute("disabled", true);
                el.blur(); // force close mobile keyboard
            }
        });
    }


    openBtn.addEventListener("click", () => {
        popup.classList.add("visible");
        body.classList.add("popup-open");

        // Enable inputs ONLY after popup is visible
        setTimeout(() => {
            setPopupInputsEnabled(true);
        }, 300);
    });


    function closePopup() {
        popup.classList.remove("visible");
        body.classList.remove("popup-open");

        // Disable inputs to prevent keyboard on scroll
        setPopupInputsEnabled(false);
    }

    setPopupInputsEnabled(false);
    
    closeBtn.addEventListener("click", closePopup);
    popup.addEventListener("click", (e) => {
        // Close if clicking on the overlay itself, not the content
        if (e.target === popup) {
            closePopup();
        }
    });



    // --- UPDATED: Contact Form (now inside popup) with AJAX (fetch) ---
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission (page reload)

        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable button and show sending state
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json", // Formspree recommends this header
            },
        })
            .then((response) => {
                if (response.ok) {
                    // SUCCESS! Show the animation
                    contactForm.classList.add("hidden");
                    successMessage.classList.add("visible");
                    successMessage.innerHTML = ""; // Clear previous messages
                    const messageText = "We will be in touch soon";
                    const characters = messageText.split("");
                    const middleIndex = Math.floor(characters.length / 2);
                    characters.forEach((char, index) => {
                        const span = document.createElement("span");
                        span.textContent = char === " " ? "\u00A0" : char;
                        successMessage.appendChild(span);
                        const delay = Math.abs(index - middleIndex) * 50;
                        setTimeout(() => {
                            span.style.opacity = "1";
                            span.style.transform = "translateY(0)";
                        }, delay);
                    });

                    // After animation, reset the form and button
                    setTimeout(() => {
                        successMessage.classList.remove("visible");
                        setTimeout(() => {
                            form.reset();
                            contactForm.classList.remove("hidden");
                            submitButton.disabled = false;
                            submitButton.textContent = originalButtonText;
                            successMessage.innerHTML = "";
                        }, 500);
                    }, 4000);
                } else {
                    // ERROR from Formspree (e.g., validation error)
                    response.json().then((data) => {
                        // Show an error message
                        successMessage.innerHTML = `<span>Oops! ${data.error || "Something went wrong."
                            }</span>`;
                        const span = successMessage.querySelector("span");
                        span.style.opacity = "1";
                        span.style.transform = "translateY(0)";
                        successMessage.classList.add("visible");

                        // Re-enable the button
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;

                        // Hide error after a few seconds
                        setTimeout(() => {
                            successMessage.classList.remove("visible");
                            setTimeout(() => {
                                successMessage.innerHTML = "";
                            }, 500);
                        }, 4000);
                    });
                }
            })
            .catch((error) => {
                // NETWORK ERROR
                successMessage.innerHTML =
                    "<span>Network error. Please try again.</span>";
                const span = successMessage.querySelector("span");
                span.style.opacity = "1";
                span.style.transform = "translateY(0)";
                successMessage.classList.add("visible");

                // Re-enable the button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                // Hide error after a few seconds
                setTimeout(() => {
                    successMessage.classList.remove("visible");
                    setTimeout(() => {
                        successMessage.innerHTML = "";
                    }, 500);
                }, 4000);
            });
    });

    // --- Sticky Header ---
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (
            !body.classList.contains("nav-open") &&
            !body.classList.contains("popup-open")
        ) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });
});

// ===== PROJECT SHOWCASE COUNTER =====
// ===== PROJECT SHOWCASE COUNTER (SCROLL TRIGGERED) =====
const showcaseSection = document.getElementById("project-showcase");
const showcaseCounters = document.querySelectorAll(".showcase-number");

let showcaseAnimated = false;

const animateShowcaseCounters = () => {
    if (showcaseAnimated) return;
    showcaseAnimated = true;

    showcaseCounters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const duration = 1200; // total animation time (ms)
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            current = Math.floor(progress * target);
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + "+";
            }
        };

        requestAnimationFrame(update);
    });
};

const showcaseObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateShowcaseCounters();
                showcaseObserver.disconnect(); // run only once
            }
        });
    },
    {
        threshold: 0.4, // 40% visible before starting
    }
);

showcaseObserver.observe(showcaseSection);

const ufo = document.getElementById("ufo");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let posX = mouseX;
let posY = mouseY;

let lastMoveTime = Date.now();
let idleOffset = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMoveTime = Date.now();
});

function animate() {
    const now = Date.now();
    const isIdle = now - lastMoveTime > 300; // 300ms without movement

    // Smooth follow
    posX += (mouseX - posX) * 0.08;
    posY += (mouseY - posY) * 0.08;

    // Idle floating motion
    if (isIdle) {
        idleOffset += 0.05;
        posY += Math.sin(idleOffset) * 0.8;
        posX += Math.cos(idleOffset * 0.7) * 0.5;
    }

    // Rotation based on movement
    const rotateX = (posY - mouseY) * 0.15;
    const rotateY = (mouseX - posX) * 0.15;

    ufo.style.transform = `
      translate(${posX - 110}px, ${posY - 110}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    requestAnimationFrame(animate);
}

animate();

let hasSpoken = false;

function speakGreeting() {
    if (hasSpoken) return;
    hasSpoken = true;

    const message = new SpeechSynthesisUtterance(
        "Hi, I'm Kiran. What's your name?"
    );

    message.lang = "en-US";
    message.rate = 0.95;
    message.pitch = 1.1;
    message.volume = 1;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
        v.name.toLowerCase().includes("google") ||
        v.name.toLowerCase().includes("female")
    );

    if (preferred) message.voice = preferred;

    window.speechSynthesis.speak(message);
}

// Wait for user interaction
function enableVoice() {
    document.addEventListener("click", speakGreeting, { once: true });
    document.addEventListener("touchstart", speakGreeting, { once: true });
    document.addEventListener("keydown", speakGreeting, { once: true });
}

// Start listening
enableVoice();

//nav bar animation foro the mobile
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const hero = document.getElementById("hero");

    const heroObserver = new IntersectionObserver(
        ([entry]) => {
            if (window.innerWidth <= 768) {
                if (entry.isIntersecting) {
                    // Hero visible → compact
                    header.classList.add("nav-compact");
                    header.classList.remove("nav-expanded");
                } else {
                    // Hero out of view → expanded
                    header.classList.add("nav-expanded");
                    header.classList.remove("nav-compact");
                }
            }
        },
        {
            threshold: 0.6
        }
    );

    heroObserver.observe(hero);
});