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
  addNavEventListeners(); // 헤더 메뉴 클릭 → SPA 전환
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

// 초기 진입 시 홈 페이지 로드
loadPage();
