// HTML 불러오는 함수
async function loadComponent(path) {
  const res = await fetch(path);
  return await res.text();
}

// 페이지 로드 함수
async function loadPage(page = 'home') {
  const content = await loadComponent(`pages/${page}.html`);
  const app = document.getElementById('app');
  const [header, footer] = await Promise.all([
    loadComponent('pages/header.html'),
    loadComponent('pages/footer.html')
  ]);
  app.innerHTML = header + content + footer;

  // 헤더 버튼 클릭 이벤트 등록
  addNavEventListeners();
}

// 네비게이션 버튼 클릭시 동작
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

// 최초 로딩
loadPage();
  