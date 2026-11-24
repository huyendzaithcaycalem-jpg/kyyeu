/**
 * ============================================================
 * JAVASCRIPT LOGIC CHO TRANG WEB KỶ YẾU 14/2
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initParticles();
  initAudio();
  initCountdown();
});

// State
let currentScreen = 'screen-intro';
let uploadedImageDataUrl = null;

function initApp() {
  // Render Dynamic Config Text
  const ownerNames = document.querySelectorAll('.cfg-owner-name');
  ownerNames.forEach(el => el.textContent = CONFIG.ownerName);

  const eventDates = document.querySelectorAll('.cfg-event-date');
  eventDates.forEach(el => el.textContent = CONFIG.eventDate);

  const eventTimes = document.querySelectorAll('.cfg-event-time');
  eventTimes.forEach(el => el.textContent = CONFIG.eventDetails.time);

  const eventLocs = document.querySelectorAll('.cfg-event-location');
  eventLocs.forEach(el => el.textContent = CONFIG.eventDetails.location);

  const eventAddrs = document.querySelectorAll('.cfg-event-address');
  eventAddrs.forEach(el => el.textContent = CONFIG.eventDetails.address);

  const dressCodes = document.querySelectorAll('.cfg-dress-code');
  dressCodes.forEach(el => el.textContent = CONFIG.eventDetails.dressCode);

  const specialNotes = document.querySelectorAll('.cfg-special-note');
  specialNotes.forEach(el => el.textContent = CONFIG.eventDetails.specialNote);

  // Setup social links
  const zaloLinks = document.querySelectorAll('.link-zalo');
  zaloLinks.forEach(el => el.href = CONFIG.socialLinks.zalo);

  const phoneNumbers = document.querySelectorAll('.cfg-phone-number');
  phoneNumbers.forEach(el => {
    el.textContent = CONFIG.socialLinks.phoneNumber;
  });

  const fbLinks = document.querySelectorAll('.link-facebook');
  fbLinks.forEach(el => el.href = CONFIG.socialLinks.facebook);

  const gmapLinks = document.querySelectorAll('.link-gmap');
  gmapLinks.forEach(el => el.href = CONFIG.eventDetails.googleMapsUrl);

  // Render Photo Gallery
  renderPhotos();

  // Setup Navigation Button Listeners
  setupNavigation();

  // Setup Image Upload
  setupImageUpload();

  // Setup Google Calendar Link
  setupGoogleCalendarLink();
}

/**
 * Hiển thị các bức ảnh kỷ yếu dạng Polaroid
 */
function renderPhotos() {
  const gallery = document.getElementById('polaroid-gallery');
  if (!gallery || !CONFIG.photos) return;

  gallery.innerHTML = '';
  CONFIG.photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.innerHTML = `
      <div class="polaroid-pin"></div>
      <div class="polaroid-img-wrapper">
        <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
      </div>
      <div class="polaroid-caption">${photo.caption}</div>
    `;
    card.addEventListener('click', () => openLightbox(photo.url, photo.caption));
    gallery.appendChild(card);
  });
}

/**
 * Quản lý chuyển đổi giữa các màn hình
 */
function switchScreen(targetScreenId) {
  const currentEl = document.getElementById(currentScreen);
  const targetEl = document.getElementById(targetScreenId);

  if (!targetEl) return;

  if (currentEl) {
    currentEl.classList.remove('active');
  }

  targetEl.classList.add('active');
  currentScreen = targetScreenId;

  // Cuộn lên đầu trang mượt mà
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Kích hoạt hiệu ứng đặc biệt tùy theo màn hình
  if (targetScreenId === 'screen-accept') {
    fireSuccessConfetti();
  } else if (targetScreenId === 'screen-photo-accepted') {
    fireHeartsConfetti();
  }
}

/**
 * Gán sự kiện cho các nút điều hướng
 */
function setupNavigation() {
  // Lựa chọn câu hỏi 1: Có rảnh
  const btnAccept1 = document.getElementById('btn-answer-yes');
  if (btnAccept1) {
    btnAccept1.addEventListener('click', () => {
      switchScreen('screen-accept');
    });
  }

  // Lựa chọn câu hỏi 1: Không rảnh
  const btnDecline1 = document.getElementById('btn-answer-no');
  if (btnDecline1) {
    btnDecline1.addEventListener('click', () => {
      switchScreen('screen-decline-question');
    });
  }

  // Câu hỏi 2 (Xin ảnh): Có cho ảnh
  const btnPhotoYes = document.getElementById('btn-photo-yes');
  if (btnPhotoYes) {
    btnPhotoYes.addEventListener('click', () => {
      switchScreen('screen-photo-accepted');
    });
  }

  // Câu hỏi 2 (Xin ảnh): Không cho ảnh
  const btnPhotoNo = document.getElementById('btn-photo-no');
  if (btnPhotoNo) {
    btnPhotoNo.addEventListener('click', () => {
      switchScreen('screen-decline-final');
    });
  }

  // Các nút quay lại trang chủ / chọn lại
  document.querySelectorAll('.btn-restart').forEach(btn => {
    btn.addEventListener('click', () => {
      switchScreen('screen-intro');
    });
  });
}

/**
 * Setup tải ảnh lên & xem trước (Preview)
 */
function setupImageUpload() {
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('photo-input');
  const previewBox = document.getElementById('preview-container');
  const previewImg = document.getElementById('preview-image');
  const sendZaloBtn = document.getElementById('btn-send-zalo-photo');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0]);
    }
  });

  function handleImage(file) {
    if (!file.type.startsWith('image/')) {
      alert('Cậu hãy chọn một file hình ảnh nha (JPG, PNG, WebP)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImageDataUrl = e.target.result;
      if (previewImg && previewBox) {
        previewImg.src = uploadedImageDataUrl;
        previewBox.style.display = 'block';
        dropzone.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  }

  if (sendZaloBtn) {
    sendZaloBtn.addEventListener('click', () => {
      // Mở Zalo để gửi ảnh
      window.open(CONFIG.socialLinks.zalo, '_blank');
    });
  }
}

/**
 * Lightbox xem ảnh lớn
 */
function openLightbox(url, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const cap = document.getElementById('lightbox-caption');

  if (!modal || !img) return;

  img.src = url;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
}

window.closeLightbox = closeLightbox;

/**
 * Countdown timer tới 14/02
 */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date(CONFIG.eventTargetDate).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = mins < 10 ? '0' + mins : mins;
    secsEl.textContent = secs < 10 ? '0' + secs : secs;
  }

  update();
  setInterval(update, 1000);
}

/**
 * Hiệu ứng Canvas Confetti khi nhận lời
 */
function fireSuccessConfetti() {
  if (typeof confetti === 'function') {
    // Đợt 1
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Đợt 2 sau 300ms
    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 80,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 80,
        origin: { x: 1 }
      });
    }, 350);
  }
}

/**
 * Hiệu ứng bắn tim khi đồng ý cho ảnh
 */
function fireHeartsConfetti() {
  if (typeof confetti === 'function') {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 25,
      shapes: ['star', 'circle'],
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#da70d6']
    };

    confetti({
      ...defaults,
      particleCount: 60,
      scalar: 1.2
    });
  }
}

/**
 * Background Floating Petals & Stars Animation
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = Math.min(28, Math.floor(width / 40));

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 1 + 0.5,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.4 ? '#fbcfe8' : '#fed7aa'
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;

    // Draw gentle petal shape
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size / 1.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of petals) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Trình phát nhạc nền
 */
function initAudio() {
  const toggleBtn = document.getElementById('audio-toggle');
  const audio = document.getElementById('bg-music');

  if (!toggleBtn || !audio || !CONFIG.music.enabled) return;

  audio.src = CONFIG.music.url;

  let isPlaying = false;

  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      toggleBtn.classList.remove('playing');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      isPlaying = false;
    } else {
      audio.play().then(() => {
        toggleBtn.classList.add('playing');
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
        isPlaying = true;
      }).catch(err => {
        console.log('Audio autoplay blocked:', err);
      });
    }
  });
}

/**
 * Tạo link Google Calendar tự động
 */
function setupGoogleCalendarLink() {
  const calBtn = document.getElementById('btn-add-calendar');
  if (!calBtn) return;

  const title = encodeURIComponent(`Chụp Kỷ Yếu Cùng ${CONFIG.ownerName} 🎓✨`);
  const details = encodeURIComponent(
    `Hẹn chụp ảnh kỷ yếu cùng ${CONFIG.ownerName}!\nThời gian: ${CONFIG.eventDetails.time}\nĐịa điểm: ${CONFIG.eventDetails.location}\nLưu ý: ${CONFIG.eventDetails.specialNote}`
  );
  const location = encodeURIComponent(`${CONFIG.eventDetails.location}, ${CONFIG.eventDetails.address}`);
  
  // Format YYYYMMDDTHHMMSSZ (UTC or local)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260214T010000Z/20260214T100000Z&details=${details}&location=${location}`;

  calBtn.href = gcalUrl;
}

