class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.theme = localStorage.getItem('theme') || 'light';
    this.render();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.render();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...numbers].sort((a, b) => a - b);
  }

  render() {
    const numbers = this.generateNumbers();
    const isDark = this.theme === 'dark';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --bg-color: ${isDark ? '#1a1a1a' : '#f0f0f0'};
          --container-bg: ${isDark ? '#2d2d2d' : '#ffffff'};
          --text-color: ${isDark ? '#ffffff' : '#333333'};
          --button-bg: #4CAF50;
          --button-hover: #45a049;
          --number-bg: ${isDark ? '#3d3d3d' : '#ffffff'};
          --number-border: ${isDark ? '#555555' : '#cccccc'};
          display: block;
          height: 100vh;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          background-color: var(--bg-color);
          font-family: sans-serif;
          transition: background-color 0.3s ease;
          color: var(--text-color);
        }
        .theme-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 20px;
          border: 1px solid var(--number-border);
          background: var(--container-bg);
          color: var(--text-color);
          font-size: 14px;
          transition: all 0.3s ease;
        }
        h1 {
          margin-bottom: 30px;
        }
        .numbers {
          display: flex;
          margin: 20px 0;
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          margin: 0 8px;
          border-radius: 50%;
          background-color: var(--number-bg);
          border: 2px solid var(--number-border);
          font-size: 24px;
          font-weight: bold;
          color: var(--text-color);
          transition: all 0.3s ease;
        }
        .controls {
          margin-top: 20px;
        }
        button.generate-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 5px;
          background-color: var(--button-bg);
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button.generate-btn:hover {
          background-color: var(--button-hover);
        }
      </style>
      <div class="container">
        <button class="theme-toggle" id="themeBtn">
          ${isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <h1>Lotto Number Generator</h1>
        <div class="numbers" id="numbersContainer">
          ${numbers.map(n => `<div class="number">${n}</div>`).join('')}
        </div>
        <div class="controls">
          <button class="generate-btn" id="generateBtn">Generate Numbers</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('themeBtn').addEventListener('click', () => this.toggleTheme());
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => {
      const container = this.shadowRoot.getElementById('numbersContainer');
      const newNumbers = this.generateNumbers();
      container.innerHTML = newNumbers.map(n => `<div class="number">${n}</div>`).join('');
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
