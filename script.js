/* ============================================================
   BIRTHDAY LOVE STORY FOR KANAK — script.js
   Vanilla JavaScript · No frameworks
============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     GLOBAL ANIMATED BACKGROUND FLOATERS
  ============================================================= */
  const floatingLayer = document.getElementById("floatingLayer");
  const floatSymbols = ["❤️","✨","🦋","🌹","⭐","🫧","🪶","💖","🌸"];
  for (let i = 0; i < 30; i++) {
    const f = document.createElement("span");
    f.className = "floatie";
    f.textContent = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
    f.style.left = Math.random() * 100 + "%";
    f.style.fontSize = (Math.random() * 16 + 12) + "px";
    f.style.animationDuration = (Math.random() * 14 + 10) + "s";
    f.style.animationDelay = Math.random() * 12 + "s";
    floatingLayer.appendChild(f);
  }

  /* ============================================================
     LOADER → LOCK SCREEN
  ============================================================= */
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loaderFill");
  const lockscreen = document.getElementById("lockscreen");

  // Loader particles
  const loaderParticles = document.getElementById("loaderParticles");
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("span");
    p.className = "floatie";
    p.textContent = "✨";
    p.style.left = Math.random() * 100 + "%";
    p.style.fontSize = (Math.random() * 12 + 8) + "px";
    p.style.animationDuration = (Math.random() * 6 + 5) + "s";
    loaderParticles.appendChild(p);
  }

  window.addEventListener("load", () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 8;
      if (progress >= 100) {
        progress = 100; clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("hidden");
          lockscreen.classList.add("show");
          setTimeout(() => loader.style.display = "none", 800);
        }, 400);
      }
      loaderFill.style.width = progress + "%";
    }, 200);
  });

  /* ============================================================
     LOCK SCREEN — Clock, Date, Particles
  ============================================================= */
  const lockTime = document.getElementById("lockTime");
  const lockDate = document.getElementById("lockDate");
  function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    lockTime.textContent = `${h}:${m}`;
    lockDate.textContent = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }
  updateClock();
  setInterval(updateClock, 1000);

  const lockParticles = document.getElementById("lockParticles");
  const heartSymbols = ["❤️","💕","💖","✨","🌸"];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement("span");
    h.className = "floatie";
    h.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = (Math.random() * 14 + 14) + "px";
    h.style.animationDuration = (Math.random() * 8 + 8) + "s";
    h.style.animationDelay = Math.random() * 8 + "s";
    lockParticles.appendChild(h);
  }

  /* ============================================================
     PASSCODE LOGIC (3108)
  ============================================================= */
  const PASSCODE = "3108";
  let entered = "";
  const dots = document.querySelectorAll("#passcodeDots .dot");
  const passcodeDots = document.getElementById("passcodeDots");
  const lockMessage = document.getElementById("lockMessage");
  const welcome = document.getElementById("welcome");

  const updateDots = () => dots.forEach((d, i) => d.classList.toggle("filled", i < entered.length));
  const vibrate = () => { if (navigator.vibrate) navigator.vibrate([80, 40, 80]); };

  function handleKey(num) {
    if (entered.length >= 4) return;
    entered += num;
    updateDots();
    if (entered.length === 4) setTimeout(checkPasscode, 200);
  }

  function checkPasscode() {
    if (entered === PASSCODE) {
      lockMessage.textContent = "Unlocked ❤️";
      lockscreen.classList.add("unlock");
      setTimeout(() => {
        lockscreen.style.display = "none";
        welcome.classList.add("show");
        startWelcomeTyping();
      }, 900);
    } else {
      vibrate();
      passcodeDots.classList.add("shake");
      lockMessage.textContent = "Wrong Passcode ❤️ Try Again.";
      setTimeout(() => {
        passcodeDots.classList.remove("shake");
        entered = "";
        updateDots();
      }, 600);
    }
  }

  document.querySelectorAll(".key[data-num]").forEach(k =>
    k.addEventListener("click", () => handleKey(k.dataset.num)));
  document.getElementById("keyDelete").addEventListener("click", () => {
    entered = entered.slice(0, -1); updateDots();
  });
  document.addEventListener("keydown", (e) => {
    if (!lockscreen.classList.contains("show") || lockscreen.classList.contains("unlock")) return;
    if (/^[0-9]$/.test(e.key)) handleKey(e.key);
    else if (e.key === "Backspace") { entered = entered.slice(0, -1); updateDots(); }
  });

  /* ============================================================
     WELCOME SCREEN — Typing Animation
  ============================================================= */
  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeMessage = "Happy Birthday My Malkin ❤️ Kanak";
  function startWelcomeTyping() {
    let i = 0;
    (function type() {
      if (i < welcomeMessage.length) {
        welcomeTitle.textContent += welcomeMessage.charAt(i++);
        setTimeout(type, 90);
      } else {
        welcomeTitle.classList.add("done");
      }
    })();
  }

  document.getElementById("enterBtn").addEventListener("click", () => {
    welcome.classList.add("hide");
    setTimeout(() => {
      welcome.style.display = "none";
      document.getElementById("site").classList.add("show");
      initSite();
    }, 800);
  });

  /* ============================================================
     CUSTOM CURSOR (works globally)
  ============================================================= */
  const cursorHeart = document.getElementById("cursorHeart");
  document.addEventListener("mousemove", (e) => {
    cursorHeart.style.left = e.clientX + "px";
    cursorHeart.style.top = e.clientY + "px";
    if (Math.random() > 0.85) {
      const s = document.createElement("div");
      s.className = "spark-trail";
      s.textContent = ["✨","💕","⭐"][Math.floor(Math.random() * 3)];
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  });
  document.addEventListener("mousedown", (e) => {
    cursorHeart.classList.add("click");
    const r = document.createElement("div");
    r.className = "click-ripple";
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
  document.addEventListener("mouseup", () => cursorHeart.classList.remove("click"));

  /* ============================================================
     MAIN SITE INITIALIZATION
  ============================================================= */
  function initSite() {

    document.getElementById("year").textContent = new Date().getFullYear();

    /* ---------- Scroll progress + back to top + secret btn ---------- */
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");
    const secretBtn = document.getElementById("secretBtn");
    window.addEventListener("scroll", () => {
      const st = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = (st / h) * 100;
      scrollProgress.style.width = pct + "%";
      backToTop.classList.toggle("show", st > 400);
      secretBtn.classList.toggle("show", pct > 80);  // reveal after 80% scroll
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    /* ---------- Hamburger ---------- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(l =>
      l.addEventListener("click", () => { hamburger.classList.remove("active"); navLinks.classList.remove("open"); }));

    /* ---------- Theme toggle ---------- */
    const themeToggle = document.getElementById("themeToggle");
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    themeToggle.textContent = saved === "dark" ? "☀️" : "🌙";
    themeToggle.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
      localStorage.setItem("theme", next);
    });

    /* ---------- Reveal observer ---------- */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("visible"); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    /* ---------- Ripple + magnetic buttons ---------- */
    document.querySelectorAll(".ripple").forEach(btn => {
      btn.addEventListener("click", function (e) {
        const c = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        c.style.width = c.style.height = size + "px";
        c.style.left = e.clientX - rect.left - size / 2 + "px";
        c.style.top = e.clientY - rect.top - size / 2 + "px";
        c.className = "ripple-effect";
        this.appendChild(c);
        setTimeout(() => c.remove(), 600);
      });
    });
    document.querySelectorAll(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      });
      btn.addEventListener("mouseleave", () => btn.style.transform = "");
    });

    /* ---------- Countdown (to next birthday: Aug 31) ---------- */
    const cdDays = document.getElementById("cdDays"), cdHours = document.getElementById("cdHours"),
          cdMins = document.getElementById("cdMins"), cdSecs = document.getElementById("cdSecs");
    function updateCountdown() {
      const now = new Date();
      let year = now.getFullYear();
      let bday = new Date(year, 7, 31, 0, 0, 0); // Aug = month 7, day 31 (3108)
      if (bday < now) bday = new Date(year + 1, 7, 31);
      const diff = bday - now;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      cdDays.textContent = String(d).padStart(2, "0");
      cdHours.textContent = String(h).padStart(2, "0");
      cdMins.textContent = String(m).padStart(2, "0");
      cdSecs.textContent = String(s).padStart(2, "0");
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ---------- LOVE LETTER (envelope + typewriter) ---------- */
    const envelope = document.getElementById("envelope");
    const typeEl = document.getElementById("typewriter");
    const letterText =
`My dearest Kanak,

Happy Birthday, my Malkin ❤️

From the moment you came into my life, everything became brighter, softer, and more beautiful. Your smile is my favorite sight, your laugh my favorite song.

On your special day, I wish you all the happiness your beautiful heart can hold. Thank you for being you — my favorite person, today and always.

With all my love. 🎂✨`;
    let letterTyped = false;
    envelope.addEventListener("click", () => {
      if (envelope.classList.contains("open")) return;
      envelope.classList.add("open");
      if (!letterTyped) {
        letterTyped = true;
        setTimeout(() => {
          let i = 0;
          (function type() {
            if (i < letterText.length) { typeEl.textContent += letterText.charAt(i++); setTimeout(type, 32); }
          })();
          heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 15);
        }, 700);
      }
    });

    /* ---------- GALLERY LIGHTBOX + AUTO SLIDESHOW ---------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const galleryImgs = [...document.querySelectorAll(".polaroid img")];
    let slideIndex = 0, slideTimer = null;
    galleryImgs.forEach((img, idx) => {
      img.addEventListener("click", () => {
        slideIndex = idx;
        openLightbox();
      });
    });
    function openLightbox() {
      lightboxImg.src = galleryImgs[slideIndex].src;
      lightbox.classList.add("open");
      slideTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % galleryImgs.length;
        lightboxImg.style.opacity = "0";
        setTimeout(() => { lightboxImg.src = galleryImgs[slideIndex].src; lightboxImg.style.opacity = "1"; }, 300);
      }, 3000);
    }
    function closeLightbox() { lightbox.classList.remove("open"); clearInterval(slideTimer); }
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

    /* ---------- REASONS: 30 flip cards ---------- */
    const reasons = [
      ["😊","Your smile"],["💗","Your kindness"],["👀","Your eyes"],["😄","Your laugh"],
      ["😠","Your cute anger"],["🤗","Your caring nature"],["💖","Your beautiful heart"],["✨","Everything about you"],
      ["🌸","Your gentleness"],["🎶","Your sweet voice"],["🌙","Your calm presence"],["☀️","Your warmth"],
      ["💃","The way you dance"],["📖","Your intelligence"],["🍫","Your sweetness"],["🌟","Your dreams"],
      ["🕊️","Your pure soul"],["🤍","Your honesty"],["💫","Your energy"],["🌺","Your beauty"],
      ["🫶","Your hugs"],["😇","Your patience"],["🎁","Your surprises"],["🌈","Your positivity"],
      ["🦋","Your grace"],["💐","Your elegance"],["🔥","Your passion"],["🥰","The way you love"],
      ["👑","You being my queen"],["♾️","That you're simply you"]
    ];
    const reasonsGrid = document.getElementById("reasonsGrid");
    reasons.forEach(([emoji, text]) => {
      const card = document.createElement("div");
      card.className = "flip-card reveal";
      card.innerHTML = `<div class="flip-inner">
        <div class="flip-face flip-front"><span class="ff-emoji">${emoji}</span></div>
        <div class="flip-face flip-back">${text}</div></div>`;
      // Tap-to-flip on mobile
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      reasonsGrid.appendChild(card);
      revealObserver.observe(card);
    });

    /* ---------- LOVE COUNTER animation ---------- */
    const counters = document.querySelectorAll(".ct-num");
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target;
          const target = +el.dataset.target;
          let count = 0;
          const step = target / 100;
          const t = setInterval(() => {
            count += step;
            if (count >= target) { count = target; clearInterval(t); }
            el.textContent = Math.floor(count).toLocaleString();
          }, 18);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    /* ============================================================
       MUSIC PLAYER
    ============================================================= */
    const music = document.getElementById("bgMusic");
    const mpPlay = document.getElementById("mpPlay");
    const musicPlayer = document.getElementById("musicPlayer");
    const mpVolume = document.getElementById("mpVolume");
    const mpMute = document.getElementById("mpMute");
    const mpProgressFill = document.getElementById("mpProgressFill");
    const mpProgress = document.getElementById("mpProgress");
    let musicPlaying = false, lastVol = 0.6;
    music.volume = 0.6;

    function toggleMusic() {
      if (musicPlaying) { music.pause(); mpPlay.textContent = "▶"; musicPlayer.classList.remove("playing"); }
      else { music.play().catch(() => {}); mpPlay.textContent = "❚❚"; musicPlayer.classList.add("playing"); }
      musicPlaying = !musicPlaying;
    }
    mpPlay.addEventListener("click", toggleMusic);
    mpVolume.addEventListener("input", () => { music.volume = mpVolume.value; mpMute.textContent = mpVolume.value == 0 ? "🔇" : "🔊"; });
    mpMute.addEventListener("click", () => {
      if (music.volume > 0) { lastVol = music.volume; music.volume = 0; mpVolume.value = 0; mpMute.textContent = "🔇"; }
      else { music.volume = lastVol; mpVolume.value = lastVol; mpMute.textContent = "🔊"; }
    });
    document.getElementById("mpPrev").addEventListener("click", () => music.currentTime = 0);
    document.getElementById("mpNext").addEventListener("click", () => music.currentTime = 0);
    music.addEventListener("timeupdate", () => {
      if (music.duration) mpProgressFill.style.width = (music.currentTime / music.duration) * 100 + "%";
    });
    mpProgress.addEventListener("click", (e) => {
      const rect = mpProgress.getBoundingClientRect();
      if (music.duration) music.currentTime = ((e.clientX - rect.left) / rect.width) * music.duration;
    });
    const startMusic = () => { if (!musicPlaying) toggleMusic(); };

    /* ============================================================
       BIRTHDAY CAKE
    ============================================================= */
    const cakeEl = document.getElementById("cakeEl");
    const blowBtn = document.getElementById("blowBtn");
    const cutBtn = document.getElementById("cutBtn");
    const candles = document.querySelectorAll(".candle");
    let blown = false;

    blowBtn.addEventListener("click", () => {
      if (blown) return; blown = true;
      candles.forEach((candle, i) => {
        setTimeout(() => {
          candle.classList.add("out");
          const smoke = document.createElement("div");
          smoke.className = "smoke";
          candle.appendChild(smoke);
          setTimeout(() => smoke.remove(), 1500);
        }, i * 200);
      });
      setTimeout(() => {
        startConfetti(); launchFireworks(); spawnBalloons(); spawnRoses();
        heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 30);
        startMusic();
        cakeEl.classList.add("show-knife");
        blowBtn.textContent = "Happy Birthday! 🎉";
      }, 700);
    });

    cutBtn.addEventListener("click", () => {
      cakeEl.classList.add("cut");
      startConfetti();
      heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 20);
      setTimeout(() => cakeEl.classList.remove("cut"), 800);
    });

    /* ============================================================
       WISH GENERATOR (100+ wishes)
    ============================================================= */
    const wishes = buildWishes();
    const wishText = document.getElementById("wishText");
    const wishBtn = document.getElementById("wishBtn");
    let lastWish = -1;
    wishBtn.addEventListener("click", () => {
      let idx;
      do { idx = Math.floor(Math.random() * wishes.length); } while (idx === lastWish);
      lastWish = idx;
      wishText.classList.add("fade");
      setTimeout(() => { wishText.textContent = wishes[idx]; wishText.classList.remove("fade"); }, 300);
      heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 8);
    });

    /* ============================================================
       SECRET LOVE MESSAGE POPUP
    ============================================================= */
    const secretPopup = document.getElementById("secretPopup");
    secretBtn.addEventListener("click", () => { secretPopup.classList.add("open"); heartExplosion(window.innerWidth/2, window.innerHeight/2, 20); });
    document.getElementById("secretClose").addEventListener("click", () => secretPopup.classList.remove("open"));
    secretPopup.addEventListener("click", (e) => { if (e.target === secretPopup) secretPopup.classList.remove("open"); });

    /* ============================================================
       FINALE — cinematic ending when scrolled into view
    ============================================================= */
    let finaleTriggered = false;
    const finaleObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting && !finaleTriggered) {
          finaleTriggered = true;
          launchFireworks(); spawnRoses(); startMusic();
          // Thousands of floating hearts (staggered for performance)
          let waves = 0;
          const heartRain = setInterval(() => {
            floatHeartsUp(40);
            if (++waves > 8) clearInterval(heartRain);
          }, 600);
        }
      });
    }, { threshold: 0.3 });
    finaleObserver.observe(document.getElementById("finale"));

    /* ============================================================
       CELEBRATION EFFECTS (Canvas)
    ============================================================= */
    const canvas = document.getElementById("fxCanvas");
    const ctx = canvas.getContext("2d");
    let confettiParticles = [], fireworks = [], fxActive = false, renderRunning = false;
    const fxColors = ["#ff8fab","#e6beff","#f5d76e","#ffffff","#ffc0cb","#d4af37","#c8a2ff"];
    function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
    resizeCanvas(); window.addEventListener("resize", resizeCanvas);

    function startConfetti() {
      fxActive = true;
      for (let i = 0; i < 180; i++)
        confettiParticles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height - canvas.height,
          size: Math.random()*8+4, color: fxColors[Math.floor(Math.random()*fxColors.length)],
          speed: Math.random()*3+2, angle: Math.random()*360, spin: Math.random()*6-3,
          shape: Math.random()>0.5?"rect":"circle" });
      if (!renderRunning) renderFX();
      setTimeout(() => { fxActive = confettiParticles.length ? fxActive : false; }, 100);
    }
    function launchFireworks() {
      fxActive = true;
      const fwInt = setInterval(() => {
        if (!document.getElementById("site")) { clearInterval(fwInt); return; }
        const fx = Math.random()*canvas.width, fy = Math.random()*canvas.height*0.5;
        const color = fxColors[Math.floor(Math.random()*fxColors.length)];
        const fw = { particles: [] };
        for (let i = 0; i < 45; i++) {
          const a = (Math.PI*2*i)/45;
          fw.particles.push({ x:fx, y:fy, vx:Math.cos(a)*(Math.random()*4+2), vy:Math.sin(a)*(Math.random()*4+2), alpha:1, color });
        }
        fireworks.push(fw);
      }, 650);
      if (!renderRunning) renderFX();
      setTimeout(() => clearInterval(fwInt), 8000);
    }
    function renderFX() {
      renderRunning = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.forEach(p => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle*Math.PI/180); ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size/2);
        else { ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill(); }
        ctx.restore();
        p.y += p.speed; p.angle += p.spin; if (p.y > canvas.height) p.y = -20;
      });
      fireworks.forEach((fw, fi) => {
        fw.particles.forEach(p => {
          ctx.save(); ctx.globalAlpha = Math.max(p.alpha,0); ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); ctx.restore();
          p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.alpha -= 0.015;
        });
        if (fw.particles[0].alpha <= 0) fireworks.splice(fi, 1);
      });
      if (fxActive || fireworks.length || confettiParticles.length) {
        if (!fxActive && confettiParticles.length) {
          confettiParticles = confettiParticles.filter(p => p.y < canvas.height + 50);
        }
        requestAnimationFrame(renderFX);
      } else { ctx.clearRect(0,0,canvas.width,canvas.height); renderRunning = false; }
    }

    /* ---------- DOM-based effects ---------- */
    function spawnRoses() {
      const em = ["🌹","🌷","💐","🌸"]; let c = 0;
      const t = setInterval(() => {
        if (c++ > 20) { clearInterval(t); return; }
        const r = document.createElement("div");
        r.className = "rose"; r.textContent = em[Math.floor(Math.random()*em.length)];
        r.style.left = Math.random()*100 + "vw"; r.style.fontSize = (Math.random()*18+18)+"px";
        r.style.animationDuration = (Math.random()*3+4)+"s";
        document.body.appendChild(r); setTimeout(() => r.remove(), 7000);
      }, 300);
    }
    function spawnBalloons() {
      const em = ["🎈","🎈","🎉"];
      for (let i = 0; i < 12; i++) setTimeout(() => {
        const b = document.createElement("div");
        b.className = "balloon"; b.textContent = em[Math.floor(Math.random()*em.length)];
        b.style.left = Math.random()*100+"vw"; b.style.fontSize = (Math.random()*20+30)+"px";
        b.style.animationDuration = (Math.random()*4+5)+"s";
        document.body.appendChild(b); setTimeout(() => b.remove(), 9000);
      }, i*200);
    }
    function heartExplosion(cx, cy, count) {
      for (let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.textContent = ["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];
        heart.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;font-size:${Math.random()*24+16}px;z-index:8602;pointer-events:none;transition:transform 1.5s ease-out,opacity 1.5s ease-out;`;
        document.body.appendChild(heart);
        const a = Math.random()*Math.PI*2, d = Math.random()*400+100;
        requestAnimationFrame(() => {
          heart.style.transform = `translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(0)`;
          heart.style.opacity = "0";
        });
        setTimeout(() => heart.remove(), 1600);
      }
    }
    function floatHeartsUp(count) {
      for (let i = 0; i < count; i++) {
        const h = document.createElement("div");
        h.textContent = ["❤️","💖","💕"][Math.floor(Math.random()*3)];
        h.style.cssText = `position:fixed;left:${Math.random()*100}vw;bottom:-40px;font-size:${Math.random()*18+12}px;z-index:8601;pointer-events:none;transition:transform ${Math.random()*3+4}s ease-out,opacity ${Math.random()*3+4}s;`;
        document.body.appendChild(h);
        requestAnimationFrame(() => {
          h.style.transform = `translateY(-${innerHeight+100}px) rotate(${Math.random()*360}deg)`;
          h.style.opacity = "0";
        });
        setTimeout(() => h.remove(), 7000);
      }
    }

  } // end initSite

  /* ============================================================
     BUILD 100+ ROMANTIC WISHES
  ============================================================= */
  function buildWishes() {
    return [
      "May your birthday be as radiant as your beautiful smile, Kanak ❤️",
      "Wishing you a year filled with love, laughter, and endless joy 🌸",
      "You deserve all the happiness in the world, today and always ✨",
      "May every candle you blow bring a wish come true 🎂",
      "Here's to another year of your gorgeous smile lighting up my world 💖",
      "May your dreams sparkle brighter than the stars tonight 🌟",
      "Happy Birthday to the most beautiful soul I know 🕊️",
      "May this year shower you with roses and sweet surprises 🌹",
      "You make every day brighter just by being you, my Malkin 💫",
      "Wishing you a magical day as special as your heart 🦋",
      "May love follow you wherever you go, today and forever 💕",
      "You are a blessing, and today the world celebrates you 🎉",
      "May your laughter echo through this beautiful new year 😄",
      "Sending you a million hearts on your special day 💗",
      "May your birthday be the start of your best year yet 🌈",
      "You deserve the moon, the stars, and everything in between 🌙",
      "Happy Birthday, my queen — may you always feel treasured 👑",
      "May every moment today feel like a warm, loving hug 🤗",
      "Wishing endless smiles for the girl who gives me endless joy 😊",
      "May your heart stay as pure and kind as it has always been 🤍",
      "Today I celebrate the most precious gift in my life — you 🎁",
      "May happiness bloom around you like a field of flowers 🌺",
      "You light up rooms and hearts — happy birthday, sunshine ☀️",
      "May your year be filled with music, magic, and love 🎶",
      "Wishing you sweetness as lovely as you are, Kanak 🍫",
      "May all your wishes take flight like gentle butterflies 🦋",
      "You are my favorite reason to smile — happy birthday ❤️",
      "May peace and joy wrap around you all year long 🕊️",
      "Here's to you — beautiful inside and out 💐",
      "May today be filled with everything that makes you happy 🥰",
      "You deserve a day as extraordinary as you are 🌟",
      "Sending warm wishes and warmer hugs your way 🤗",
      "May your birthday sparkle with laughter and love 💫",
      "You make life more beautiful — thank you for existing 🌸",
      "Wishing you a fairytale year, my beautiful Kanak 📖",
      "May your smile never fade and your heart never break 💖",
      "Today the stars align to celebrate you 🌠",
      "You are loved beyond words — happy birthday, sweetheart 💕",
      "May your path be paved with roses and dreams 🌹",
      "Wishing you a lifetime of moments as sweet as this one 🍰",
      "You deserve all the love your heart can hold 💗",
      "May your year overflow with blessings and beauty ✨",
      "Happy Birthday to the melody of my heart 🎵",
      "May you always shine as brightly as you do today 🌟",
      "You are my sunshine on the cloudiest days ☀️",
      "Wishing you infinite happiness, my Malkin ♾️",
      "May every dream you hold come gloriously true 💫",
      "Today we celebrate the girl who stole my heart 💘",
      "May your laughter be the soundtrack of this year 😄",
      "You bloom more beautifully with each passing year 🌷",
      "Wishing you skies full of stars and heart full of love 🌌",
      "May kindness always find its way back to you 🤍",
      "You are a masterpiece — happy birthday, my love 🎨",
      "May this day be gentle, joyful, and full of love 🕊️",
      "Here's to celebrating you, now and forever 🥂",
      "You deserve the world wrapped in a bow 🎀",
      "May happiness chase you all year long 🏃‍♀️💖",
      "Wishing you a garden of joy that never wilts 🌻",
      "You are the sweetest chapter of my story 📖",
      "May your birthday glow like candlelight 🕯️",
      "You make ordinary days feel extraordinary ✨",
      "Wishing you dreams as soft and lovely as you 💭",
      "May love surround you like a gentle embrace 🫂",
      "Happy Birthday to my forever favorite person ❤️",
      "May your year be painted in shades of joy 🎨",
      "You deserve every star in the night sky 🌟",
      "Wishing you a day as flawless as your heart 💎",
      "May smiles come easily and worries fade away 😊",
      "You are proof that angels walk among us 😇",
      "May today bring the peace your soul deserves 🕊️",
      "Wishing you a beautiful year, beautiful girl 🌸",
      "You are cherished more than you'll ever know 💗",
      "May your birthday be sprinkled with magic 🪄",
      "Here's to your happiest, most radiant year yet ☀️",
      "You are the poetry my heart loves to read 📜",
      "May joy find you in every little moment 🌈",
      "Wishing you endless reasons to smile today 😄",
      "You are a gift the whole world is lucky to have 🎁",
      "May your heart stay light and your dreams stay big 🎈",
      "Happy Birthday to the girl who makes life sweeter 🍬",
      "May you feel as loved as you make others feel 💕",
      "You deserve a standing ovation just for being you 👏",
      "Wishing you a year of golden memories 🥇",
      "May your candles glow as warmly as your heart 🕯️",
      "You brighten my world in a thousand little ways 💡",
      "May every wish you make find its way home 🏡",
      "Happy Birthday, my precious Kanak — you're irreplaceable 💎",
      "May love, luck, and laughter be yours all year 🍀",
      "You are the reason my heart smiles 😊❤️",
      "Wishing you a day dipped in gold and glitter ✨",
      "May you always know how deeply you are loved 💞",
      "You are a dream I never want to wake from 💭",
      "Here's to more sunsets and forevers with you 🌅",
      "May your birthday be the happiest of them all 🎉",
      "You make every season feel like spring 🌷",
      "Wishing you softness, sweetness, and endless love 🍭",
      "May your heart forever stay young and full 💖",
      "You are the best thing that ever happened to me 🌟",
      "Happy Birthday, my beautiful Malkin Kanak — I adore you ❤️",
      "May this new year love you as much as I do 💘",
      "You deserve the whole universe and a little more 🌌"
    ];
  }

});