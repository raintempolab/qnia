// 헤더/푸터/페이지 로드
async function loadComponent(path) {
    const res = await fetch(path);
    return await res.text();
  }
  
  async function init() {
    const app = document.getElementById('app');
    const [header, home, footer] = await Promise.all([
      loadComponent('pages/header.html'),
      loadComponent('pages/home.html'),
      loadComponent('pages/footer.html')
    ]);
    app.innerHTML = header + home + footer;
  }
  
  init();
  