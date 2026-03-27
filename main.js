class SlangLearningApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.theme = localStorage.getItem('theme') || 'light';
    this.language = localStorage.getItem('lang') || 'en';
    this.today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    this.slangs = [
      { word: "대박 (Daebak)", en: "Awesome / Great", ja: "やばい / すごい", ex: "오늘 날씨 대박이다!", exEn: "The weather today is awesome!", exJa: "今日の天気、最高だね！" },
      { word: "킹받네 (King-bad-ne)", en: "So annoying", ja: "ムカつく", ex: "그 농담 진짜 킹받네.", exEn: "That joke is so annoying.", exJa: "その冗談、本当にムカつく。" }
    ];
    this.render();
  }
  toggleTheme() { this.theme = this.theme === 'light' ? 'dark' : 'light'; localStorage.setItem('theme', this.theme); this.render(); }
  changeLang(lang) { this.language = lang; localStorage.setItem('lang', lang); this.render(); }
  render() {
    const isDark = this.theme === 'dark';
    const isEn = this.language === 'en';
    this.shadowRoot.innerHTML = `
      <style>
        :host { --bg-color: ${isDark ? '#121212' : '#f8f9fa'}; --card-bg: ${isDark ? '#1e1e1e' : '#ffffff'}; --text-primary: ${isDark ? '#e0e0e0' : '#212529'}; --accent-color: #007bff; display: block; min-height: 100vh; background-color: var(--bg-color); color: var(--text-primary); font-family: sans-serif; }
        .header { background: var(--card-bg); padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 800px; margin: 2rem auto; }
        .slang-card { display: flex; background: var(--card-bg); margin-bottom: 1rem; border-radius: 8px; border: 1px solid #ddd; overflow: hidden; }
        .word-section { width: 150px; padding: 1rem; background: #eee; color: #333; font-weight: bold; }
        .content-section { padding: 1rem; }
      </style>
      <div class="header">
        <h1>Today's K-Slang (${this.today})</h1>
        <div>
          <button id="btnEn">EN</button><button id="btnJa">JA</button><button id="themeBtn">Theme</button>
        </div>
      </div>
      <div class="container">
        ${this.slangs.map(item => `
          <div class="slang-card">
            <div class="word-section">${item.word}</div>
            <div class="content-section">
              <div style="color:var(--accent-color); font-weight:bold;">${isEn ? item.en : item.ja}</div>
              <div>"${item.ex}"</div>
              <div style="font-size:0.9rem; color:#888;">${isEn ? item.exEn : item.exJa}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    this.shadowRoot.getElementById('btnEn').onclick = () => this.changeLang('en');
    this.shadowRoot.getElementById('btnJa').onclick = () => this.changeLang('ja');
    this.shadowRoot.getElementById('themeBtn').onclick = () => this.toggleTheme();
  }
}
customElements.define('slang-learning-app', SlangLearningApp);
