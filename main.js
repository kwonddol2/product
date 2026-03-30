// ── INIT SELECTS ──
const yrEl=document.getElementById('yr'),dyEl=document.getElementById('dy');
if (yrEl) {
    for(let y=new Date().getFullYear()-10;y>=1940;y--){const o=document.createElement('option');o.value=y;o.textContent=y;yrEl.appendChild(o);}
}
if (dyEl) {
    for(let d=1;d<=31;d++){const o=document.createElement('option');o.value=d;o.textContent=d;dyEl.appendChild(o);}
}

let pts=0,userGender='',userIntent='kr',lastSeed=0,readingDone=false;

function selP(btn,g,v){document.querySelectorAll('.pill').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');if(g==='g')userGender=v;}
function selIntent(c,v){document.querySelectorAll('.ic').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');userIntent=v;}
function updateIntent(){
  const n=document.getElementById('nat').value;
  if(n==='KR'){document.getElementById('ic-kr').querySelector('.ic-title').textContent='International';document.getElementById('ic-kr').querySelector('.ic-icon').textContent='🌏';document.getElementById('ic-intl').querySelector('.ic-title').textContent='Korean';document.getElementById('ic-intl').querySelector('.ic-icon').textContent='🇰🇷';}
  else if(n){document.getElementById('ic-kr').querySelector('.ic-title').textContent='Korean';document.getElementById('ic-kr').querySelector('.ic-icon').textContent='🇰🇷';document.getElementById('ic-intl').querySelector('.ic-title').textContent='International';document.getElementById('ic-intl').querySelector('.ic-icon').textContent='🌏';}
}

// ── IDOL DATA ──
const idolsMale=[
  {id:'jk',name:'Jungkook',hangul:'정국',group:'BTS',dob:'Sep 1, 1997',emoji:'🎤',grad:'linear-gradient(135deg,#1A1A3E,#3A2860)',elem:'Water ✦ Metal',pillars:['壬水','庚金','壬子','甲木'],insta:'jungkook.97',instaUrl:'https://www.instagram.com/jungkook.97/',pct:87,
   why:'Jungkook\'s Water element nourishes your Wood in the generative cycle (상생). His perfectionism and emotional depth create a rare complementary pairing. Korean masters call this 천생연분.',
   lucky:{nums:'1·6·9',colors:'Navy & Silver',dir:'North',time:'9–11pm'},
   compat:[{k:'오행 Match',v:'Water → Wood ✦',g:true},{k:'궁합 Score',v:'87%',g:true},{k:'연애 Style',v:'Deeply loyal, intense'},{k:'Karmic Bond',v:'Very Strong'}]},
  {id:'v',name:'V · Taehyung',hangul:'뷔',group:'BTS',dob:'Dec 30, 1995',emoji:'🎨',grad:'linear-gradient(135deg,#1A2E1A,#2A5040)',elem:'Wood ✦ Water',pillars:['乙木','壬수','戊土','甲木'],insta:'thv',instaUrl:'https://www.instagram.com/thv/',pct:82,
   why:'V\'s Wood fuels your Fire in a creative amplification cycle. His Water intuition mirrors your emotional depth — two people who feel the world the same way.',
   lucky:{nums:'3·8·11',colors:'Forest Green & Midnight Blue',dir:'East',time:'7–9am'},
   compat:[{k:'오행 Match',v:'Wood fuels Fire ✦',g:true},{k:'궁합 Score',v:'82%',g:true},{k:'연애 Style',v:'Romantic, unpredictable'},{k:'Karmic Bond',v:'Creative soul bond'}]},
  {id:'jimin',name:'Jimin',hangul:'지민',group:'BTS',dob:'Oct 13, 1995',emoji:'💫',grad:'linear-gradient(135deg,#2E1A2E,#604060)',elem:'Fire ✦ Wood',pillars:['乙木','丁火','甲木','壬水'],insta:'j.m',instaUrl:'https://www.instagram.com/j.m/',pct:85,
   why:'Jimin\'s Fire-Wood combination creates an amplifying cycle with your chart. His emotional generosity matches your depth — a rare mirroring of souls.',
   lucky:{nums:'5·10·15',colors:'Rose Gold & Lavender',dir:'South',time:'8–10pm'},
   compat:[{k:'오행 Match',v:'Fire + Wood spiral ✦',g:true},{k:'궁합 Score',v:'85%',g:true},{k:'연애 Style',v:'Passionate, giving'},{k:'Karmic Bond',v:'Dance of souls'}]},
  {id:'kai',name:'Kai',hangul:'카이',group:'EXO',dob:'Jan 14, 1994',emoji:'🌊',grad:'linear-gradient(135deg,#0A1A2E,#1A3050)',elem:'Water ✦ Earth',pillars:['癸水','戊土','壬水','甲木'],insta:'zkdlin',instaUrl:'https://www.instagram.com/zkdlin/',pct:88,
   why:'Kai\'s Water-Earth combination is the vessel your Water needs. Deep elemental harmony — grounded presence paired with emotional depth.',
   lucky:{nums:'1·4·19',colors:'Deep Blue & Silver',dir:'North',time:'11pm–1am'},
   compat:[{k:'오행 Match',v:'Water nourishes ✦',g:true},{k:'궁합 Score',v:'88%',g:true},{k:'연애 Style',v:'Deep, magnetic'},{k:'Karmic Bond',v:'Ancient soul link'}]},
  {id:'gd',name:'G-Dragon',hangul:'지드래곤',group:'BIGBANG',dob:'Aug 18, 1988',emoji:'👑',grad:'linear-gradient(135deg,#2E1500,#5A3010)',elem:'Earth ✦ Metal',pillars:['戊土','庚金','丙火','壬水'],insta:'xxxibgdrgn',instaUrl:'https://www.instagram.com/xxxibgdrgn/',pct:79,
   why:'G-Dragon\'s Metal and Earth give structure and ground to your chart. A pairing where creative ambition meets mutual respect.',
   lucky:{nums:'4·8·18',colors:'Gold & Charcoal',dir:'West',time:'2–4pm'},
   compat:[{k:'오행 Match',v:'Metal shapes Wood ✦',g:true},{k:'궁합 Score',v:'79%',g:true},{k:'연애 Style',v:'Intense creative equal'},{k:'Karmic Bond',v:'Mutual recognition'}]}
];
const idolsFemale=[
  {id:'jennie',name:'Jennie',hangul:'제니',group:'BLACKPINK',dob:'Jan 16, 1996',emoji:'💎',grad:'linear-gradient(135deg,#3E0A3E,#6A1A6A)',elem:'Wood ✦ Water',pillars:['乙木','甲木','壬水','庚金'],insta:'jennierubyjane',instaUrl:'https://www.instagram.com/jennierubyjane/',pct:86,
   why:'Jennie\'s Wood fuels your Fire in a generative spiral. Her strategic intelligence meets your vision — a cycle of mutual elevation.',
   lucky:{nums:'3·6·16',colors:'Rose Gold & Black',dir:'East',time:'10am–12pm'},
   compat:[{k:'오행 Match',v:'Wood feeds Fire ✦',g:true},{k:'궁합 Score',v:'86%',g:true},{k:'연애 Style',v:'Confident, selective'},{k:'Karmic Bond',v:'Strong past-life thread'}]},
  {id:'taeyeon',name:'Taeyeon',hangul:'태연',group:'SNSD / Solo',dob:'Mar 9, 1989',emoji:'🌙',grad:'linear-gradient(135deg,#0A0A2E,#1A1A5A)',elem:'Earth ✦ Water',pillars:['己土','壬水','甲木','丁火'],insta:'taeyeon_ss',instaUrl:'https://www.instagram.com/taeyeon_ss/',pct:88,
   why:'Taeyeon\'s Earth gives your Water a vessel. Her Water mirrors your intuition at a frequency that feels like being truly known — rare, profound safety.',
   lucky:{nums:'2·9·18',colors:'Silver & Dusty Rose',dir:'North',time:'9–11pm'},
   compat:[{k:'오행 Match',v:'Earth holds Water ✦',g:true},{k:'궁합 Score',v:'88%',g:true},{k:'연애 Style',v:'Deeply loyal, introspective'},{k:'Karmic Bond',v:'Old soul connection'}]},
  {id:'iu',name:'IU',hangul:'아이유',group:'Solo',dob:'May 16, 1993',emoji:'🎵',grad:'linear-gradient(135deg,#1A0A2E,#3A1A5A)',elem:'Fire ✦ Earth',pillars:['癸水','丙火','戊土','甲木'],insta:'dlwlrma',instaUrl:'https://www.instagram.com/dlwlrma/',pct:91,
   why:'IU\'s Fire-Earth chart is the rarest complement. Her Fire illuminates your depth without consuming it. 91% — a 천생연분 reading by Korean Saju masters.',
   lucky:{nums:'5·8·16',colors:'Warm Amber & Cream',dir:'South',time:'10am–12pm'},
   compat:[{k:'오행 Match',v:'Fire illuminates ✦',g:true},{k:'궁합 Score',v:'91%',g:true},{k:'연애 Style',v:'Deep, artistic'},{k:'Karmic Bond',v:'Lifetime bond',g:true}]},
  {id:'winter',name:'Winter',hangul:'윈터',group:'aespa',dob:'Jan 1, 2001',emoji:'❄️',grad:'linear-gradient(135deg,#0A1A2E,#1A2A4A)',elem:'Water ✦ Metal',pillars:['庚金','壬水','甲木','癸水'],insta:'aespa_official',instaUrl:'https://www.instagram.com/aespa_official/',pct:85,
   why:'Winter\'s Metal-Water combination creates deep elemental harmony. Her precision gives structure to your intuition — complementary intelligences finding each other.',
   lucky:{nums:'1·6·10',colors:'Ice Blue & Silver White',dir:'North',time:'11pm–1am'},
   compat:[{k:'오행 Match',v:'Metal + Water deep ✦',g:true},{k:'궁합 Score',v:'85%',g:true},{k:'연애 Style',v:'Cool, precise'},{k:'Karmic Bond',v:'Mirror soul link'}]},
  {id:'minji',name:'Minji',hangul:'민지',group:'NewJeans',dob:'May 7, 2004',emoji:'🎀',grad:'linear-gradient(135deg,#1A1A0A,#3A3A1A)',elem:'Wood ✦ Earth',pillars:['甲木','戊土','乙木','壬水'],insta:'newjeans_official',instaUrl:'https://www.instagram.com/newjeans_official/',pct:79,
   why:'Minji\'s Wood-Earth grows gently alongside yours. Her naturalness creates a pairing without pretense — rare and refreshing.',
   lucky:{nums:'3·5·17',colors:'Sage Green & Cream',dir:'East',time:'8–10am'},
   compat:[{k:'오행 Match',v:'Wood grows freely ✦',g:true},{k:'궁합 Score',v:'79%',g:true},{k:'연애 Style',v:'Natural, genuine'},{k:'Karmic Bond',v:'Gentle past thread'}]},
  {id:'wonyoung',name:'Wonyoung',hangul:'원영',group:'IVE',dob:'Aug 31, 2004',emoji:'🌟',grad:'linear-gradient(135deg,#2E0A0A,#5A1A1A)',elem:'Metal ✦ Wood',pillars:['甲木','庚金','壬水','乙木'],insta:'ivestarship',instaUrl:'https://www.instagram.com/ivestarship/',pct:80,
   why:'Wonyoung\'s Metal defines and shapes your Wood into its highest form. Her drive matches your depth — a pairing built on mutual excellence.',
   lucky:{nums:'8·11·31',colors:'Deep Red & Gold',dir:'West',time:'6–8pm'},
   compat:[{k:'오행 Match',v:'Metal defines Wood ✦',g:true},{k:'궁합 Score',v:'80%',g:true},{k:'연애 Style',v:'Perfectionist, caring'},{k:'Karmic Bond',v:'Destiny encounter'}]}
];

let currentIdolFilter='All', openIdolId=null;
function getIdolPool(){return userGender==='Man'?idolsFemale:idolsMale;}

function filterIdols(f,btn){
  currentIdolFilter=f;openIdolId=null;
  document.querySelectorAll('#idol-filter-row .ftab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderIdolGrid();
}

function renderIdolGrid(){
  const pool=getIdolPool();
  const filtered=pool.filter(i=>currentIdolFilter==='All'||i.group===currentIdolFilter);
  const grid=document.getElementById('idol-grid');
  if (!grid) return;
  grid.innerHTML=filtered.map(i=>`
    <div class="idol-card${openIdolId===i.id?' open':''}" id="ic-${i.id}" onclick="toggleIdol('${i.id}')">
      <div class="ic-avatar" style="background:${i.grad};">
        <span style="font-size:46px;">${i.emoji}</span>
        <div class="ic-compat">${i.pct}%</div>
        <a class="ic-insta" href="${i.instaUrl}" target="_blank" onclick="event.stopPropagation();" title="@${i.insta}">📸</a>
      </div>
      <div class="ic-body">
        <div class="ic-name cin">${i.name}</div>
        <div class="ic-group">${i.group}</div>
        <div class="ic-elem">${i.elem}</div>
        <div class="compat-mini"><div class="compat-fill" style="width:${i.pct}%;"></div></div>
      </div>
    </div>`).join('');
  renderIdolDetail(filtered);
}

function renderIdolDetail(pool){
  const wrap=document.getElementById('idol-detail-wrap');
  if(!wrap) return;
  if(!openIdolId){wrap.innerHTML='';return;}
  const idol=pool.find(i=>i.id===openIdolId);
  if(!idol){wrap.innerHTML='';return;}
  wrap.innerHTML=`
    <div class="idol-detail on" id="detail-${idol.id}">
      <div class="detail-top">
        <div class="detail-avatar" style="background:${idol.grad};">${idol.emoji}</div>
        <div class="detail-info">
          <div class="detail-name">${idol.name} (${idol.hangul})</div>
          <div class="detail-group">${idol.group} · Born ${idol.dob}</div>
          <div style="font-size:11px;color:var(--text2);font-style:italic;">@${idol.insta}</div>
        </div>
        <div style="text-align:right;"><div class="detail-pct">${idol.pct}<span style="font-size:14px;">%</span></div><div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:1px;color:var(--text2);">궁합</div></div>
      </div>
      <div class="dtabs">
        <button class="dtab active" onclick="switchDTab('${idol.id}','saju',this)">사주</button>
        <button class="dtab" onclick="switchDTab('${idol.id}','compat',this)">궁합</button>
        <button class="dtab" onclick="switchDTab('${idol.id}','lucky',this)">Lucky ✦</button>
      </div>
      <div class="dpane on" id="dp-${idol.id}-saju">
        <div class="saju-pillars">${idol.pillars.map((p,i)=>`<div class="sp"><span class="sp-h">${p}</span><span class="sp-l">${['Year','Month','Day','Hour'][i]}</span></div>`).join('')}</div>
        <div style="background:var(--bg2);border:0.5px solid var(--border);border-radius:8px;padding:0.875rem;font-size:13px;color:var(--text2);line-height:1.7;"><strong style="color:var(--gold);font-family:'Cinzel',serif;font-size:10px;letter-spacing:1px;">${idol.elem}</strong><br><br>${idol.why}</div>
      </div>
      <div class="dpane" id="dp-${idol.id}-compat">
        ${idol.compat.map(c=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:0.5px solid var(--border2);font-size:12px;"><span style="color:var(--text2);">${c.k}</span><span style="font-family:'Cinzel',serif;font-weight:600;${c.g?'color:var(--gold);':'color:var(--text);'}">${c.v}</span></div>`).join('')}
      </div>
      <div class="dpane" id="dp-${idol.id}-lucky">
        <div class="lucky-grid">
          <div class="lb" style="background:rgba(200,146,42,0.08);border-color:var(--border);"><h5 style="color:var(--gold);">LUCKY NUMBERS</h5><p style="color:var(--text);">${idol.lucky.nums}</p></div>
          <div class="lb" style="background:rgba(24,95,165,0.08);border-color:rgba(24,95,165,0.25);"><h5 style="color:#A0C0DC;">LUCKY COLORS</h5><p style="font-size:11px;color:var(--text);">${idol.lucky.colors}</p></div>
          <div class="lb" style="background:rgba(59,109,17,0.08);border-color:rgba(59,109,17,0.25);"><h5 style="color:#A0DCA0;">DIRECTION</h5><p style="color:var(--text);">${idol.lucky.dir}</p></div>
          <div class="lb" style="background:rgba(163,45,45,0.08);border-color:rgba(163,45,45,0.25);"><h5 style="color:#DCA0A0;">PEAK TIME</h5><p style="font-size:11px;color:var(--text);">${idol.lucky.time}</p></div>
        </div>
      </div>
      <a class="insta-btn" href="${idol.instaUrl}" target="_blank">
        📸 View @${idol.insta} on Instagram
      </a>
      <button class="detail-close" onclick="openIdolId=null;renderIdolGrid();">Close ✕</button>
    </div>`;
}

function toggleIdol(id){openIdolId=(openIdolId===id)?null:id;renderIdolGrid();}
function switchDTab(id,pane,btn){
  const detail=document.getElementById('detail-'+id);
  detail.querySelectorAll('.dtab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');
  detail.querySelectorAll('.dpane').forEach(p=>p.classList.remove('on'));
  document.getElementById(`dp-${id}-${pane}`).classList.add('on');
}

// ── SAJU DATA ──
const sajuDb=[
  {elem:'Wood · Fire 목화',sub:'甲木·丁火',
   oh:[{n:'Wood 木',c:'rgba(59,109,17,0.25)',tc:'#A0DCA0',s:true},{n:'Fire 火',c:'rgba(163,45,45,0.2)',tc:'#DCA0A0',s:true},{n:'Earth 土',c:'rgba(139,107,56,0.15)',tc:'#C8B080',s:false},{n:'Metal 金',c:'rgba(74,96,128,0.15)',tc:'#A0B8C8',s:false},{n:'Water 水',c:'rgba(24,95,165,0.15)',tc:'#A0C0DC',s:false}],
   avoid:['Late-night major decisions','Metal-dominant partners','Autumn project launches','Rushing creativity'],
   good:['Morning creative work','Water-element mentors','Spring new beginnings','Teaching & guiding'],
   must:['Trust first instincts always','Build before age 40','Face east at dawn','Rest before depletion'],
   never:['Business with Fire-dominant partners','Major moves in Year of Dog','Override November gut feelings','Neglect sleep'],
   love:'Your Wood-Fire chart draws people in effortlessly. But your pillars show you\'ve been choosing partners who take your warmth without returning it. Your fated one carries Water energy — nourishing your Wood without consuming it.'},
  {elem:'Fire · Metal 화금',sub:'丙火·庚金',
   oh:[{n:'Fire 火',c:'rgba(163,45,45,0.2)',tc:'#DCA0A0',s:true},{n:'Metal 金',c:'rgba(74,96,128,0.2)',tc:'#A0B8C8',s:true},{n:'Earth 土',c:'rgba(139,107,56,0.15)',tc:'#C8B080',s:false},{n:'Wood 木',c:'rgba(59,109,17,0.15)',tc:'#A0DCA0',s:false},{n:'Water 水',c:'rgba(24,95,165,0.15)',tc:'#A0C0DC',s:false}],
   avoid:['Impulsive partnerships','Water-element business ties','Winter major decisions','Over-explaining yourself'],
   good:['Leadership & creative direction','Earth-element allies','Summer momentum','Structured solo work'],
   must:['Major decisions in spring only','Protect social energy','Release need to be understood','Act before overthinking'],
   never:['Ignore body signals','Rush timelines in Year of Rat','Trust flattery over consistency','Let Metal override Fire'],
   love:'Fire-Metal people attract intensely but bond slowly. You\'ve confused intensity for depth before. Your fated one carries Water and Wood — softening your Metal without extinguishing your Fire.'},
  {elem:'Water · Wood 수목',sub:'壬水·甲木',
   oh:[{n:'Water 水',c:'rgba(24,95,165,0.2)',tc:'#A0C0DC',s:true},{n:'Wood 木',c:'rgba(59,109,17,0.2)',tc:'#A0DCA0',s:true},{n:'Earth 土',c:'rgba(139,107,56,0.15)',tc:'#C8B080',s:false},{n:'Fire 火',c:'rgba(163,45,45,0.15)',tc:'#DCA0A0',s:false},{n:'Metal 金',c:'rgba(74,96,128,0.15)',tc:'#A0B8C8',s:false}],
   avoid:['Fire-dominant people close up','Midday high-pressure','Overcommitting before ready','Ignoring tiredness'],
   good:['Deep one-on-one connections','Metal structure & discipline','Autumn reflection','Creative healing work'],
   must:['Honor intuition as data','Create before consuming mornings','Face north — your direction','Rest without guilt'],
   never:['Override gut feelings for logic','Promise in emotional moments','Let others rush your timing','Neglect water literally'],
   love:'Water-Wood people love with extraordinary depth and quietly. Your chart shows you\'ve been the one who loves more and waits longer than is good for you. Your fated one carries Metal — the structure that gives your Water a vessel.'}
];

const matchData=[
  [{grad:'linear-gradient(135deg,#1A2A3A,#2A4A5A)',emoji:'😊',name:'Junho',age:29,nat:'🇰🇷',loc:'Seoul → Tokyo',job:'Graphic Designer',elem:'Water ✦ Metal',pct:94,why:'His Water nourishes your Wood in the generative cycle. A 94% 궁합 score — Korean masters call this 천생연분.'},
   {grad:'linear-gradient(135deg,#2A1A3A,#4A2A5A)',emoji:'🙂',name:'Minjae',age:32,nat:'🇰🇷',loc:'Busan',job:'Marine Biologist',elem:'Earth ✦ Water',pct:88,why:'His Earth grounds your Wood energy and gives your Fire a stable landing. A karmic thread connects you.'}],
  [{grad:'linear-gradient(135deg,#1A3A2A,#2A5A3A)',emoji:'😊',name:'Taehyun',age:31,nat:'🇰🇷',loc:'Seoul',job:'Architect',elem:'Wood ✦ Water',pct:91,why:'His Wood feeds your Fire while his Water cools your Metal. Elemental balance at its most complete.'},
   {grad:'linear-gradient(135deg,#3A2A1A,#5A4A2A)',emoji:'🙂',name:'Seongmin',age:34,nat:'🇰🇷',loc:'Busan',job:'Chef',elem:'Earth ✦ Wood',pct:86,why:'His Earth grounds your restless Fire-Metal energy. His steadiness is what your intensity has been seeking.'}],
  [{grad:'linear-gradient(135deg,#2A1A1A,#4A2A2A)',emoji:'😊',name:'Donghyun',age:30,nat:'🇰🇷',loc:'Jeju Island',job:'Photographer',elem:'Metal ✦ Earth',pct:96,why:'Metal gives your Water a vessel and your Wood a trellis — the rarest complete pairing. 96% — 일생의 인연.'},
   {grad:'linear-gradient(135deg,#1A1A3A,#2A2A5A)',emoji:'🙂',name:'Kyungmin',age:27,nat:'🇰🇷',loc:'Incheon',job:'Software Engineer',elem:'Metal ✦ Fire',pct:88,why:'His Fire warms your Water without evaporating it. His Metal structures your Wood without rigidity.'}]
];

// ── AI SAJU READING ──
async function startReading(){
  const y=document.getElementById('yr').value,m=document.getElementById('mo').value,d=document.getElementById('dy').value;
  if(!y||!m||!d){alert('Please enter your complete birth date.');return;}
  const seed=(parseInt(y)+parseInt(m)+parseInt(d))%3;lastSeed=seed;
  const monthNames=['','January','February','March','April','May','June','July','August','September','October','November','December'];
  const gender=userGender||'person';
  const hour=document.getElementById('hr').value||'unknown hour';
  const nat=document.getElementById('nat').value||'';
  const loc=document.getElementById('loc').value||'';
  showScreen('s-load');
  const msgs=[['Reading your Four Pillars...','Mapping Year · Month · Day · Hour stems'],['Calculating your 오행 balance...','Wood · Fire · Earth · Metal · Water'],['Channeling 2,000 years of Saju wisdom...','AI consulting ancient Korean tradition'],['Preparing your personal reading...','Almost ready']];
  let i=0;const iv=setInterval(()=>{
    if(i<msgs.length){document.getElementById('loadTxt').textContent=msgs[i][0];document.getElementById('loadSub').textContent=msgs[i][1];i++;}
    else clearInterval(iv);
  },700);
  
  const prompt=`A ${gender} was born on ${monthNames[parseInt(m)]} ${d}, ${y}${hour!=='unknown hour'?`, during the hour of the ${hour}`:''}. ${nat?`They are from ${nat}.`:''}${loc?` They currently live in ${loc}.`:''}`;

  try{
    // Note: Anthropic API requires a server-side proxy or an API Key in headers (not safe for client-side).
    // Using fallback logic for demonstration.
    setTimeout(() => {
        clearInterval(iv);
        showScreen('s-result');
        document.querySelectorAll('.bt').forEach(b=>b.classList.remove('active'));
        document.getElementById('bt-home').classList.add('active');
        renderStaticResult(seed);
        const textEl=document.getElementById('ai-reading-text');
        const fallback=sajuDb[seed];
        textEl.textContent=`Your ${fallback.elem} combination creates a powerful elemental signature. The ${fallback.sub} pillars reveal someone whose greatest strength and deepest vulnerability are the same thing.\n\nKorean Saju masters would immediately recognize your core tension: the war between what your nature demands and what the world expects of you. This has shown up again and again.\n\n${fallback.love}`;
        readingDone=true;addPts(10);
        updateDailyFromSeed(seed);
    }, 3000);
  }catch(err){
    clearInterval(iv);
    showScreen('s-result');
    renderStaticResult(seed);
  }
}

function renderStaticResult(s){
  const r=sajuDb[s];
  document.getElementById('r-elem').textContent=r.elem+' — '+r.sub;
  document.getElementById('oh-row').innerHTML=r.oh.map(o=>`<span class="oh-pill" style="background:${o.c};color:${o.tc};border:0.5px solid ${o.tc}40;${o.s?'font-weight:600;':'opacity:0.55;'}">${o.n}${o.s?' ✦':''}</span>`).join('');
  document.getElementById('gc-avoid').innerHTML=r.avoid.map(x=>`<li>${x}</li>`).join('');
  document.getElementById('gc-good').innerHTML=r.good.map(x=>`<li>${x}</li>`).join('');
  document.getElementById('gc-must').innerHTML=r.must.map(x=>`<li>${x}</li>`).join('');
  document.getElementById('gc-never').innerHTML=r.never.map(x=>`<li>${x}</li>`).join('');
  document.getElementById('love-preview').textContent=r.love;
}

// ── MATCHES ──
function buildMatches(){
  const matches=matchData[lastSeed];
  const isKR=document.getElementById('nat').value==='KR';
  document.getElementById('match-intro-p').textContent=isKR?'Your Saju has been matched to the most compatible international profiles.':'Your Saju has been matched to compatible Korean profiles.';
  document.getElementById('match-cards').innerHTML=matches.map((m,i)=>`
    <div class="match-card">
      <div class="mc-top">
        <div style="position:relative;width:68px;height:68px;flex-shrink:0;">
          <div style="width:68px;height:68px;border-radius:50%;background:${m.grad};filter:blur(10px);border:2px solid rgba(200,146,42,0.3);display:flex;align-items:center;justify-content:center;font-size:24px;">${m.emoji}</div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:50%;"><span style="font-size:16px;">🔒</span></div>
        </div>
        <div class="mc-info">
          <div class="mc-ai">✦ AI PROFILE · MATCH #${i+1}</div>
          <div class="mc-name">${m.name}, ${m.age} ${m.nat}</div>
          <div class="mc-loc">${m.loc} · ${m.job}</div>
          <div class="compat-mini" style="margin-bottom:3px;"><div class="compat-fill" style="width:${m.pct}%;"></div></div>
          <div style="font-size:10px;font-family:'Cinzel',serif;color:var(--gold);">${m.pct}% Compatibility</div>
        </div>
      </div>
      <div class="mc-bottom">${m.why}</div>
      <div class="mc-reveal"><span>Face hidden · Unlock to reveal</span><button class="reveal-sm" onclick="goTab('chat')">Message ✦</button></div>
    </div>`).join('');
}

// ── CHAT ──
const chatUsers=[
  {id:'c1',name:'Junho',emoji:'😊',grad:'linear-gradient(135deg,#1A2A3A,#2A4A5A)',compat:'94% 궁합',locked:false,
   messages:[{from:'them',text:'안녕! Hi~ I saw your Saju result. We have really good 궁합!',time:'2m ago'},{from:'them',text:'I\'m from Seoul but I\'ve been living in Tokyo. Do you know much about Saju?',time:'1m ago'}],
   iceBreakers:['What does your 오행 element say about you?','Have you ever had your 궁합 read before?','What\'s your 운세 like this week?','Do you believe in 인연 (fated connections)?']},
  {id:'c2',name:'Minjae',emoji:'🙂',grad:'linear-gradient(135deg,#2A1A3A,#4A2A5A)',compat:'88% 궁합',locked:true,
   messages:[{from:'them',text:'Your Saju reading sounds really interesting...',time:'5m ago'}],
   iceBreakers:[]},
  {id:'c3',name:'AI Saju Guide',emoji:'✦',grad:'linear-gradient(135deg,#2A1A0A,#4A3A1A)',compat:'SeoulMate',locked:false,
   messages:[{from:'them',text:'Welcome to SeoulMate! I\'m your personal Saju guide.',time:'Just now'}],
   iceBreakers:['Tell me more about my dominant element','What does my 길흉화복 mean for 2025?']}
];
let activeChatId=null;

function buildChatList(){
  document.getElementById('chat-list').innerHTML=chatUsers.map(u=>`
    <div class="chat-row" onclick="${u.locked?'':''} openChat('${u.id}')">
      <div class="chat-avatar" style="background:${u.grad};">${u.emoji}</div>
      <div class="chat-info">
        <div class="chat-name cin">${u.name}</div>
        <div class="chat-preview">${u.messages[u.messages.length-1].text}</div>
      </div>
      <div class="chat-meta">
        <div class="chat-time">${u.messages[u.messages.length-1].time}</div>
        ${u.locked?'<div class="chat-locked">🔒 Upgrade</div>':u.id==='c1'?'<div class="chat-unread">2</div>':''}
      </div>
    </div>`).join('');
}

function openChat(id){
  const u=chatUsers.find(c=>c.id===id);
  if(!u)return;
  if(u.locked){alert('Upgrade to Fate plan to unlock messaging with matches.');return;}
  activeChatId=id;
  document.getElementById('chat-list-view').style.display='none';
  document.getElementById('chat-convo-view').style.display='block';
  document.getElementById('convo-avatar').textContent=u.emoji;
  document.getElementById('convo-name').textContent=u.name;
  document.getElementById('convo-compat').textContent=u.compat;
  const msgs=document.getElementById('messages');
  msgs.innerHTML=u.messages.map(m=>`
    <div class="msg msg-${m.from}">
      <div class="msg-bubble">${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>`).join('');
  const iceWrap=document.getElementById('ice-wrap');
  if(u.iceBreakers&&u.iceBreakers.length){
    iceWrap.style.display='block';
    document.getElementById('ice-chips').innerHTML=u.iceBreakers.map(b=>`<button class="ice-chip" onclick="useIceBreaker('${b.replace(/'/g,"\\'")}')">💬 ${b}</button>`).join('');
  }else{iceWrap.style.display='none';}
  setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,100);
}

function backToList(){
  document.getElementById('chat-list-view').style.display='block';
  document.getElementById('chat-convo-view').style.display='none';
  activeChatId=null;
}

function useIceBreaker(text){document.getElementById('msgInput').value=text;sendMsg();}

function sendMsg(){
  const input=document.getElementById('msgInput');
  const text=input.value.trim();if(!text)return;
  input.value='';
  const msgs=document.getElementById('messages');
  msgs.innerHTML+=`<div class="msg msg-me"><div class="msg-bubble">${text}</div><div class="msg-time">Just now</div></div>`;
  msgs.scrollTop=msgs.scrollHeight;
  document.getElementById('ice-wrap').style.display='none';
  
  setTimeout(()=>{
    const replies=['That\'s really interesting! ✨','I saw your 궁합 — I think we could be compatible 🌙'];
    const reply=replies[Math.floor(Math.random()*replies.length)];
    msgs.innerHTML+=`<div class="msg msg-them"><div class="msg-bubble">${reply}</div><div class="msg-time">Just now</div></div>`;
    msgs.scrollTop=msgs.scrollHeight;
  },1000);
}

// ── DAILY ──
const dailySet=[
  {score:82,desc:'Strong day for new connections',love:88,money:65,health:72,energy:90,
   items:[{t:'love',i:'♡',h:'LOVE TODAY',p:'Your 연애운 peaks.'},{t:'lucky',i:'✦',h:'TODAY\'S LUCKY',p:'Red · Number 8'}]},
  {score:67,desc:'Reflective day',love:60,money:80,health:85,energy:55,
   items:[{t:'money',i:'$',h:'WEALTH TODAY',p:'Unexpected insight.'},{t:'lucky',i:'✦',h:'BEST TIMING',p:'2–5pm'}]},
  {score:91,desc:'Peak energy day',love:95,money:88,health:78,energy:94,
   items:[{t:'love',i:'♡',h:'LOVE TODAY',p:'Exceptional 연애운.'},{t:'lucky',i:'✦',h:'BEST TIMING',p:'Before noon'}]}
];

function updateDailyFromSeed(s){
  const d=dailySet[s];
  const now=new Date();
  const todayLbl = document.getElementById('today-lbl');
  if (todayLbl) todayLbl.textContent=now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase();
  const dScore = document.getElementById('d-score');
  if (dScore) dScore.textContent=d.score;
  const dDesc = document.getElementById('d-desc');
  if (dDesc) dDesc.textContent=d.desc;
  
  const bLove = document.getElementById('b-love'); if(bLove) bLove.style.width=d.love+'%';
  const bLoveN = document.getElementById('b-love-n'); if(bLoveN) bLoveN.textContent=d.love+'%';
  const bMoney = document.getElementById('b-money'); if(bMoney) bMoney.style.width=d.money+'%';
  const bMoneyN = document.getElementById('b-money-n'); if(bMoneyN) bMoneyN.textContent=d.money+'%';
  const bHealth = document.getElementById('b-health'); if(bHealth) bHealth.style.width=d.health+'%';
  const bHealthN = document.getElementById('b-health-n'); if(bHealthN) bHealthN.textContent=d.health+'%';
  const bEnergy = document.getElementById('b-energy'); if(bEnergy) bEnergy.style.width=d.energy+'%';
  const bEnergyN = document.getElementById('b-energy-n'); if(bEnergyN) bEnergyN.textContent=d.energy+'%';
  
  const dailyItems = document.getElementById('daily-items');
  if (dailyItems) dailyItems.innerHTML=d.items.map(it=>`<div class="di ${it.t}"><h4>${it.i} ${it.h}</h4><p>${it.p}</p></div>`).join('');
  updatePtsUI();
}

function claimDaily(){addPts(10);const b=document.getElementById('daily-btn');b.textContent='✦ Claimed!';b.style.background='#1B4A1B';b.disabled=true;}

// ── POINTS ──
function addPts(n){pts+=n;updatePtsUI();}
function updatePtsUI(){
  const pct=Math.min(pts/500*100,100);
  const topPts = document.getElementById('topPts'); if(topPts) topPts.textContent=pts;
  const pb=document.getElementById('pts-big'); if(pb)pb.textContent=pts;
  const bar=document.getElementById('pts-bar'); if(bar)bar.style.width=pct+'%';
}

// ── NAV ──
const tabMap={home:'s-home',idol:'s-idol',match:'s-match',chat:'s-chat',daily:'s-daily'};
function goTab(t){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.bt').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabMap[t]).classList.add('on');
  document.getElementById('bt-'+t).classList.add('active');
  window.scrollTo(0,0);
  if(t==='idol') renderIdolGrid();
  if(t==='match') buildMatches();
  if(t==='chat'){ buildChatList(); backToList(); }
  if(t==='daily'&&readingDone) updatePtsUI();
}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');window.scrollTo(0,0);}
