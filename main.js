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

  generateSingleSet() {
    const mainNumbers = new Set();
    while (mainNumbers.size < 6) {
      mainNumbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedMain = [...mainNumbers].sort((a, b) => a - b);
    
    let bonus;
    do {
      bonus = Math.floor(Math.random() * 45) + 1;
    } while (mainNumbers.has(bonus));
    
    return { main: sortedMain, bonus };
  }

  generateFiveSets() {
    const sets = [];
    for (let i = 0; i < 5; i++) {
      sets.push(this.generateSingleSet());
    }
    return sets;
  }

  render() {
    const sets = this.generateFiveSets();
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
          --bonus-color: #ff9800;
          display: block;
          min-height: 100vh;
          background-color: var(--bg-color);
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          font-family: sans-serif;
          transition: background-color 0.3s ease;
          color: var(--text-color);
        }
        .theme-toggle {
          position: fixed;
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
          z-index: 10;
        }
        h1 {
          margin-bottom: 30px;
        }
        .sets-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 600px;
        }
        .set-row {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--container-bg);
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .set-label {
          font-weight: bold;
          margin-right: 15px;
          min-width: 60px;
        }
        .numbers {
          display: flex;
          align-items: center;
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin: 0 4px;
          border-radius: 50%;
          background-color: var(--number-bg);
          border: 2px solid var(--number-border);
          font-size: 18px;
          font-weight: bold;
          color: var(--text-color);
        }
        .plus {
          margin: 0 8px;
          font-size: 20px;
          font-weight: bold;
        }
        .bonus {
          border-color: var(--bonus-color);
          color: var(--bonus-color);
        }
        .controls {
          margin-top: 30px;
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
        <div class="sets-container" id="setsContainer">
          ${sets.map((set, i) => `
            <div class="set-row">
              <span class="set-label">Set ${i + 1}</span>
              <div class="numbers">
                ${set.main.map(n => `<div class="number">${n}</div>`).join('')}
                <span class="plus">+</span>
                <div class="number bonus">${set.bonus}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="controls">
          <button class="generate-btn" id="generateBtn">Generate 5 New Sets</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('themeBtn').addEventListener('click', () => this.toggleTheme());
    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => {
      const container = this.shadowRoot.getElementById('setsContainer');
      const newSets = this.generateFiveSets();
      container.innerHTML = newSets.map((set, i) => `
        <div class="set-row">
          <span class="set-label">Set ${i + 1}</span>
          <div class="numbers">
            ${set.main.map(n => `<div class="number">${n}</div>`).join('')}
            <span class="plus">+</span>
            <div class="number bonus">${set.bonus}</div>
          </div>
        </div>
      `).join('');
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
