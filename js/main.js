// HTML 컴포넌트 불러오기
async function loadComponent(path) {
  const res = await fetch(path);
  return await res.text();
}

// 페이지 로딩 함수
async function loadPage(page = 'home') {
  const content = await loadComponent(`pages/${page}.html`);
  const app = document.getElementById('app');
  const [header, footer] = await Promise.all([
    loadComponent('pages/header.html'),
    loadComponent('pages/footer.html')
  ]);
  app.innerHTML = header + content + footer;

  // 각종 이벤트 리스너 등록
  addNavEventListeners();        // 헤더 메뉴 클릭 → SPA 전환
  addContactFormListener();      // contact.html 안에 폼이 있다면 → submit 이벤트 등록
}

// 네비게이션 링크 이벤트 연결
function addNavEventListeners() {
  const navLinks = document.querySelectorAll('[data-page]');
  navLinks.forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const targetPage = link.dataset.page;
      loadPage(targetPage);
      window.scrollTo(0, 0);
    };
  });
}

// contact-form 전송 이벤트 연결
function addContactFormListener() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/.netlify/functions/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      const statusDiv = document.getElementById("form-status");

      if (res.ok) {
        statusDiv.textContent = "메일이 전송되었습니다. 감사합니다!";
        form.reset();
      } else {
        statusDiv.textContent = "메일 전송 실패: " + result.error;
      }
    } catch (err) {
      console.error("SMTP 요청 오류:", err);
      const statusDiv = document.getElementById("form-status");
      statusDiv.textContent = "메일 전송 중 오류가 발생했습니다.";
    }
  });
}

// 초기 진입 시 홈 페이지 로드
loadPage();
