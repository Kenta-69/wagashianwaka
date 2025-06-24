// ----------------------------------
// Smooth Scroll
// ----------------------------------

// メニュー内のリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.header-menu a').forEach(link => {
  link.addEventListener('click', function(event) {
    const targetId = this.getAttribute('href'); // クリックしたリンクのhrefを取得
    const targetElement = document.querySelector(targetId); // 対象の要素を取得

    if (targetElement) {
      event.preventDefault(); // 通常のアンカーリンクの動作を無効化

      const headerHeight = document.querySelector('#header').offsetHeight; // ヘッダーの高さを取得
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight; // 正しい位置を計算

      window.scrollTo({ top: targetPosition, behavior: 'smooth' }); // スムーズスクロールで移動
    }

    // メニューを閉じる
    document.querySelector('.header-menu').classList.remove('active');
    document.querySelector('.header-menu-toggle').classList.remove('active');
  });
});

// -----------------------------
// Responsive Hamburger Menu
// -----------------------------

// ハンバーガーメニューを開閉する処理
document.querySelector('.header-menu-toggle').addEventListener('click', function() {
  document.querySelector('.header-menu').classList.toggle('active');
  this.classList.toggle('active');
});

// -----------------------------
// News Modal
// -----------------------------
const modal = document.querySelector('.news-modal');
const closeBtn = document.getElementById('modal-close');

document.querySelectorAll('.news-title a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const title = link.dataset.title;
    const image = link.dataset.image;
    const content = link.closest('article').querySelector('.news-content').innerHTML;

    modal.querySelector('#modal-title').textContent = title;
    modal.querySelector('#modal-image').src = image;
    modal.querySelector('#modal-description').innerHTML = content;
    modal.classList.add('show');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});


//History-Event-Animation
document.addEventListener("DOMContentLoaded", function () {
  const events = document.querySelectorAll(".history-event");

  // アニメーション表示処理
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0 });

  events.forEach(event => observer.observe(event));

  // 金の棒の高さを最後のイベントに合わせて調整
  const historySection = document.querySelector(".history-section");
  const lastEvent = events[events.length - 5];

  if (historySection && lastEvent) {
    const sectionTop = historySection.getBoundingClientRect().top + window.scrollY;
    const eventBottom = lastEvent.getBoundingClientRect().bottom + window.scrollY;
    const height = eventBottom - sectionTop;

    // CSS変数で高さをセット
    historySection.style.setProperty("--history-line-height", `${height}px`);
  }
});


// Menu-Modal
document.addEventListener("DOMContentLoaded", function () {
  // 画像のフェードイン処理
  document.querySelectorAll("img.fadein").forEach(img => {
    img.addEventListener("load", () => img.classList.add("loaded"));
    if (img.complete) img.classList.add("loaded");
  });
  // モーダル要素を作成
  const menuModal = document.createElement("div");
  menuModal.classList.add("menu-modal");
  menuModal.innerHTML = `
    <div class="menu-modal-content">
        <span class="modal-close">&times;</span>
        <img src="" alt="商品画像">
        <p class="menu-modal-name"></p>
        <p class="menu-modal-price"></p>
        <div class="menu-modal-description"></div>
        <a href="#" target="_blank" class="store-button">ご購入はこちら - Purchase Here -</a>
    </div>
  `;
  document.body.appendChild(menuModal);
  const menuModalImg = menuModal.querySelector("img");
  const menuModalName = menuModal.querySelector(".menu-modal-name");
  const menuModalPrice = menuModal.querySelector(".menu-modal-price");
  const menuModalDescription = menuModal.querySelector(".menu-modal-description");
  const storeButton = menuModal.querySelector(".store-button");
  const closeMenuModal = menuModal.querySelector(".modal-close");
  // 価格を3桁区切りでカンマを付ける関数
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 商品情報を管理する配列
  const menuItems = [...document.querySelectorAll(".item")].map(item => ({
    img: item.dataset.img,
    name: item.dataset.name,
    price: formatPrice(item.dataset.price), // 価格をカンマ付きに変換
    description: item.querySelector(".item-description").innerHTML,
    url: item.dataset.url
  }));
  // 商品クリック時の処理
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    const index = [...document.querySelectorAll(".item")].indexOf(item);
    if (index === -1) return;
    const { img, name, price, description, url } = menuItems[index];
    // 更新する情報を個別に変更
    menuModalImg.src = img;
    menuModalName.textContent = name;
    menuModalPrice.textContent = `価格: ¥${price}`;
    menuModalDescription.innerHTML = description;
    storeButton.href = url;
    menuModal.classList.add("show"); // 'show'クラスを追加してモーダルを表示
  });
  // モーダルを閉じる処理
  document.addEventListener("click", (e) => {
    if (e.target === menuModal || e.target.classList.contains("modal-close")) {
      menuModal.classList.remove("show"); // 'show'クラスを削除してモーダルを非表示
    }
  });
  // 外部リンクをクリックしたらモーダルを閉じる
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("store-button")) {
      menuModal.classList.remove("show"); // 'show'クラスを削除してモーダルを非表示
    }
  });
});

// Contact-Form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const toastMessage = document.getElementById("toast-message");

  // モーダルのイベント処理（←ネスト不要）
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".store-button").href = item.dataset.storeUrl;
      document.querySelector(".menu-modal").style.display = "flex";
    });
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    document.querySelector(".menu-modal").style.display = "none";
  });

  // バリデーション関数
  function validateForm() {
    let errors = [];
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const responseMethod = document.querySelector('input[name="response"]:checked');
    const responseDate = document.querySelector('input[name="response-date"]:checked');
    const timeSlot = document.getElementById("contact-time").value;
    const privacyChecked = document.getElementById("contact-privacy").checked;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10,11}$/;

    if (!name) errors.push("・お名前を入力してください。\n  Please enter your name.");
    if (!email) {
      errors.push("・メールアドレスを入力してください。\n  Please enter your email address.");
    } else if (!emailPattern.test(email)) {
      errors.push("・有効なメールアドレスを入力してください。\n  Please enter a valid email address.");
    }
    if (!phone) {
      errors.push("・電話番号を入力してください。\n  Please enter your phone number.");
    } else if (!phonePattern.test(phone)) {
      errors.push("・有効な電話番号を入力してください。（半角数字10～11桁）\n  Please enter a valid phone number (10-11 digits, numbers only).");
    }
    if (!message) errors.push("・お問い合わせ内容を入力してください。\n  Please enter your inquiry.");
    if (!responseMethod) errors.push("・返信方法を選択してください。\n  Please select a response method.");
    if (!responseDate) errors.push("・返信希望日を選択してください。\n  Please select a preferred response date.");
    if (!timeSlot) errors.push("・希望の時間帯を選択してください。\n  Please select a preferred time slot.");
    if (!privacyChecked) errors.push("・プライバシーポリシーに同意してください。\n  Please agree to the privacy policy.");

    if (errors.length > 0) {
      alert("以下の項目を修正してください。\nPlease correct the following items:\n\n" + errors.join("\n"));
      return false;
    }
    return true;
  }

  // フォーム送信時の処理
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      toastMessage.classList.add("show");
      setTimeout(() => {
        toastMessage.classList.remove("show");
        form.reset();
      }, 3000);
    }
  });
});
