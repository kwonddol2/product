// ── STARFIELD ──
const starsEl=document.getElementById('stars');
for(let i=0;i<80;i++){const s=document.createElement('div');s.className='star';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;--d:${Math.random()*4+2}s;--delay:${Math.random()*4}s;`;starsEl.appendChild(s);}

// ── INIT SELECTS ──
const yrEl=document.getElementById('yr'),dyEl=document.getElementById('dy');
if (yrEl && dyEl) {
  for(let y=new Date().getFullYear()-10;y>=1940;y--){const o=document.createElement('option');o.value=y;o.textContent=y;yrEl.appendChild(o);}
  for(let d=1;d<=31;d++){const o=document.createElement('option');o.value=d;o.textContent=d;dyEl.appendChild(o);}
}

// ── 12 ZODIAC ANIMALS ──
const zodiacData={
  Rat:{emoji:'🐀',name:'Year of the Rat',adjectives:['Clever','Lucky','Quick-witted','Wise','Charming'],colors:['Cobalt','Silver','Midnight Blue']},
  Ox:{emoji:'🐂',name:'Year of the Ox',adjectives:['Steadfast','Luminous','Strong','Loyal','Patient'],colors:['Jade','Forest Green','Amber']},
  Tiger:{emoji:'🐅',name:'Year of the Tiger',adjectives:['Brave','Fierce','Radiant','Courageous','Bold'],colors:['Gold','Crimson','Orange']},
  Rabbit:{emoji:'🐇',name:'Year of the Rabbit',adjectives:['Gentle','Moonlit','Graceful','Kind','Creative'],colors:['Lavender','Pearl','Rose']},
  Dragon:{emoji:'🐉',name:'Year of the Dragon',adjectives:['Luminous','Cosmic','Majestic','Powerful','Visionary'],colors:['Gold','Jade','Indigo']},
  Snake:{emoji:'🐍',name:'Year of the Snake',adjectives:['Mysterious','Wise','Enchanting','Intuitive','Deep'],colors:['Emerald','Midnight','Violet']},
  Horse:{emoji:'🐎',name:'Year of the Horse',adjectives:['Free','Spirited','Radiant','Wild','Adventurous'],colors:['Crimson','Sky Blue','Gold']},
  Goat:{emoji:'🐐',name:'Year of the Goat',adjectives:['Serene','Artistic','Dreaming','Gentle','Peaceful'],colors:['Sage','Cloud White','Lavender']},
  Monkey:{emoji:'🐒',name:'Year of the Monkey',adjectives:['Playful','Brilliant','Sparkling','Clever','Joyful'],colors:['Turquoise','Orange','Yellow']},
  Rooster:{emoji:'🐓',name:'Year of the Rooster',adjectives:['Confident','Shining','Proud','Honest','Precise'],colors:['Gold','Red','White']},
  Dog:{emoji:'🐕',name:'Year of the Dog',adjectives:['Loyal','Faithful','Warm','Honest','Protective'],colors:['Brown','Forest','Sky Blue']},
  Pig:{emoji:'🐖',name:'Year of the Pig',adjectives:['Generous','Golden','Abundant','Kind','Joyful'],colors:['Rose Gold','Cream','Pink']}
};
const yearToZodiac={0:'Monkey',1:'Rooster',2:'Dog',3:'Pig',4:'Rat',5:'Ox',6:'Tiger',7:'Rabbit',8:'Dragon',9:'Snake',10:'Horse',11:'Goat'};
let userZodiac=null,userNickname='';

function getZodiac(year){return yearToZodiac[year%12]||'Dragon';}
function generateNickname(zodiac){
  const z=zodiacData[zodiac];
  const adj=z.adjectives[Math.floor(Math.random()*z.adjectives.length)];
  const animal=zodiac;
  return `${adj} ${animal}`;
}

// ── STATE ──
let pts=0,userGender='',userIntent='kr',lastSeed=0,readingDone=false,gachaDrawn=false,openIdolId=null,currentIdolFilter='All';

function selP(btn,g,v){document.querySelectorAll('.pill').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');if(g==='g')userGender=v;}
function selIntent(c,v){document.querySelectorAll('.ic').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');userIntent=v;}
function updateIntent(){
  const n=document.getElementById('nat').value;
  if(n==='KR'){document.getElementById('ic-kr').querySelector('.ic-title').textContent='International';document.getElementById('ic-kr').querySelector('div').textContent='🌏';document.getElementById('ic-intl').querySelector('.ic-title').textContent='Korean';document.getElementById('ic-intl').querySelector('div').textContent='🇰🇷';}
  else if(n){document.getElementById('ic-kr').querySelector('.ic-title').textContent='Korean';document.getElementById('ic-kr').querySelector('div').textContent='🇰🇷';document.getElementById('ic-intl').querySelector('.ic-title').textContent='International';document.getElementById('ic-intl').querySelector('div').textContent='🌏';}
}

// ── 50+ IDOL DATA ──
const idolsMale=[
  // BTS
  {id:'jk',name:'Jungkook',hangul:'정국',group:'BTS',dob:'Sep 1, 1997',emoji:'🎤',insta:'jungkook.97',instaUrl:'https://instagram.com/jungkook.97/',elem:'Water ✦ Metal',pillars:['壬水','庚金','壬子','甲木'],pct:87,lucky:{nums:'1·6·9',colors:'Navy & Silver',dir:'North ↑',time:'9–11pm'},compat:[{k:'⚡ Energy Match',v:'Water → Wood',g:true},{k:'💯 Score',v:'87%',g:true},{k:'💕 Vibe',v:'Loyal, intense'},{k:'🌙 Karma',v:'Very Strong'}],why:'His Water energy nourishes your Wood in the generative cycle (상생). Perfectionism meets depth — 천생연분.'},
  {id:'v',name:'V · Taehyung',hangul:'뷔',group:'BTS',dob:'Dec 30, 1995',emoji:'🎨',insta:'thv',instaUrl:'https://instagram.com/thv/',elem:'Wood ✦ Water',pillars:['乙木','壬水','戊土','甲木'],pct:82,lucky:{nums:'3·8·11',colors:'Forest & Midnight Blue',dir:'East →',time:'7–9am'},compat:[{k:'⚡ Energy Match',v:'Wood fuels Fire',g:true},{k:'💯 Score',v:'82%',g:true},{k:'💕 Vibe',v:'Romantic, free'},{k:'🌙 Karma',v:'Creative soul bond'}],why:'His Wood fuels your Fire in a creative spiral. Two souls who feel the world the same way.'},
  {id:'jimin',name:'Jimin',hangul:'지민',group:'BTS',dob:'Oct 13, 1995',emoji:'💫',insta:'j.m',instaUrl:'https://instagram.com/j.m/',elem:'Fire ✦ Wood',pillars:['乙木','丁火','甲木','壬水'],pct:85,lucky:{nums:'5·10·15',colors:'Rose Gold & Lavender',dir:'South ↓',time:'8–10pm'},compat:[{k:'⚡ Energy Match',v:'Fire + Wood spiral',g:true},{k:'💯 Score',v:'85%',g:true},{k:'💕 Vibe',v:'Passionate, giving'},{k:'🌙 Karma',v:'Dance of souls'}],why:'Fire-Wood creates an amplifying cycle with your chart. Emotional generosity meets depth — rare mirroring.'},
  {id:'suga',name:'Suga · Agust D',hangul:'슈가',group:'BTS',dob:'Mar 9, 1993',emoji:'🎹',insta:'agustd',instaUrl:'https://instagram.com/agustd/',elem:'Metal ✦ Water',pillars:['癸水','庚金','甲木','壬水'],pct:84,lucky:{nums:'2·8·18',colors:'Silver & Black',dir:'West ←',time:'10pm–12am'},compat:[{k:'⚡ Energy Match',v:'Metal shapes Wood',g:true},{k:'💯 Score',v:'84%',g:true},{k:'💕 Vibe',v:'Quiet devotion'},{k:'🌙 Karma',v:'Old soul recognition'}],why:'Metal gives structure to your creative Wood. Two introverts who recognize each other\'s silence as fluency.'},
  {id:'rm',name:'RM (Namjoon)',hangul:'RM',group:'BTS',dob:'Sep 12, 1994',emoji:'📚',insta:'rkive',instaUrl:'https://instagram.com/rkive/',elem:'Earth ✦ Wood',pillars:['甲木','戊土','壬水','乙木'],pct:81,lucky:{nums:'9·12·21',colors:'Deep Earth & Forest',dir:'Center ✦',time:'2–4pm'},compat:[{k:'⚡ Energy Match',v:'Earth grounds Water',g:true},{k:'💯 Score',v:'81%',g:true},{k:'💕 Vibe',v:'Intellectual, deep'},{k:'🌙 Karma',v:'Philosophical bond'}],why:'Earth absorbs your Water gently. A partnership of ideas, growth, and rare mutual understanding.'},
  {id:'jin',name:'Jin',hangul:'진',group:'BTS',dob:'Dec 4, 1992',emoji:'👑',insta:'jin',instaUrl:'https://instagram.com/jin/',elem:'Fire ✦ Earth',pillars:['壬水','甲木','丙火','戊土'],pct:79,lucky:{nums:'4·7·12',colors:'Warm Gold & Burgundy',dir:'South ↓',time:'12–2pm'},compat:[{k:'⚡ Energy Match',v:'Fire warms Water',g:true},{k:'💯 Score',v:'79%',g:true},{k:'💕 Vibe',v:'Caring, protective'},{k:'🌙 Karma',v:'Warm past-life link'}],why:'His Fire provides warmth without evaporating your Water. Creates safety while inspiring joy.'},
  {id:'jhope',name:'J-Hope',hangul:'제이홉',group:'BTS',dob:'Feb 18, 1994',emoji:'☀️',insta:'uarmyhope',instaUrl:'https://instagram.com/uarmyhope/',elem:'Fire ✦ Earth',pillars:['甲木','丙火','戊土','庚金'],pct:76,lucky:{nums:'2·7·18',colors:'Sun Yellow & Coral',dir:'South ↓',time:'10am–12pm'},compat:[{k:'⚡ Energy Match',v:'Fire activates Water',g:true},{k:'💯 Score',v:'76%',g:true},{k:'💕 Vibe',v:'Joyful, energizing'},{k:'🌙 Karma',v:'Bright energy bond'}],why:'Fire activates your Water in a balancing cycle. Where you hold depth, he brings light.'},
  // EXO
  {id:'kai',name:'Kai',hangul:'카이',group:'EXO',dob:'Jan 14, 1994',emoji:'🌊',insta:'zkdlin',instaUrl:'https://instagram.com/zkdlin/',elem:'Water ✦ Earth',pillars:['癸水','戊土','壬水','甲木'],pct:88,lucky:{nums:'1·4·19',colors:'Deep Blue & Silver',dir:'North ↑',time:'11pm–1am'},compat:[{k:'⚡ Energy Match',v:'Water nourishes deeply',g:true},{k:'💯 Score',v:'88%',g:true},{k:'💕 Vibe',v:'Deep, magnetic'},{k:'🌙 Karma',v:'Ancient soul link'}],why:'Water-Earth combination is the vessel your energy needs. Grounded presence with emotional depth — rare completeness.'},
  {id:'baekhyun',name:'Baekhyun',hangul:'백현',group:'EXO',dob:'May 6, 1992',emoji:'⚡',insta:'baekhyunee_exo',instaUrl:'https://instagram.com/baekhyunee_exo/',elem:'Fire ✦ Metal',pillars:['壬水','丙火','庚金','甲木'],pct:80,lucky:{nums:'5·6·20',colors:'Electric White & Indigo',dir:'South ↓',time:'8–10pm'},compat:[{k:'⚡ Energy Match',v:'Fire activates Water',g:true},{k:'💯 Score',v:'80%',g:true},{k:'💕 Vibe',v:'Playful, devoted'},{k:'🌙 Karma',v:'Bright past-life link'}],why:'His Fire warms your Water without destroying it. Metal brings precision — turns your depth into something radiant.'},
  {id:'chanyeol',name:'Chanyeol',hangul:'찬열',group:'EXO',dob:'Nov 27, 1992',emoji:'🔥',insta:'real__pcy',instaUrl:'https://instagram.com/real__pcy/',elem:'Fire ✦ Wood',pillars:['壬水','丁火','甲木','丙火'],pct:78,lucky:{nums:'3·7·27',colors:'Flame Red & Midnight',dir:'South ↓',time:'6–8pm'},compat:[{k:'⚡ Energy Match',v:'Fire + Wood ignite',g:true},{k:'💯 Score',v:'78%',g:true},{k:'💕 Vibe',v:'Passionate, creative'},{k:'🌙 Karma',v:'Creative flame link'}],why:'His Fire-Wood combination creates sparks with your chart. High-energy creative pairing with explosive potential.'},
  // Stray Kids
  {id:'bangchan',name:'Bang Chan',hangul:'방찬',group:'Stray Kids',dob:'Oct 3, 1997',emoji:'🎧',insta:'bangchan_nz',instaUrl:'https://instagram.com/bangchan_nz/',elem:'Metal ✦ Earth',pillars:['丁火','庚金','戊土','壬水'],pct:83,lucky:{nums:'3·7·10',colors:'Steel Blue & Gold',dir:'West ←',time:'11pm–1am'},compat:[{k:'⚡ Energy Match',v:'Metal structures all',g:true},{k:'💯 Score',v:'83%',g:true},{k:'💕 Vibe',v:'Protective, steady'},{k:'🌙 Karma',v:'Leader energy bond'}],why:'His Metal-Earth combination provides structure and stability to your flowing energy. A leader who protects what he loves.'},
  {id:'felix',name:'Felix',hangul:'필릭스',group:'Stray Kids',dob:'Sep 15, 2000',emoji:'🌟',insta:'felix_skz',instaUrl:'https://instagram.com/felix_skz/',elem:'Fire ✦ Water',pillars:['庚金','丙火','壬水','甲木'],pct:86,lucky:{nums:'1·5·15',colors:'Gold & Sky Blue',dir:'South ↓',time:'9–11am'},compat:[{k:'⚡ Energy Match',v:'Fire warms your soul',g:true},{k:'💯 Score',v:'86%',g:true},{k:'💕 Vibe',v:'Sunny, sincere'},{k:'🌙 Karma',v:'Cross-cultural destiny'}],why:'Felix\'s Fire-Water duality creates perfect balance. His warmth and your depth — opposite energies that complete each other.'},
  // SEVENTEEN
  {id:'jeonghan',name:'Jeonghan',hangul:'정한',group:'SEVENTEEN',dob:'Oct 4, 1995',emoji:'🦋',insta:'jeonghan_svt',instaUrl:'https://instagram.com/jeonghan_svt/',elem:'Wood ✦ Metal',pillars:['乙木','庚金','丁火','壬水'],pct:79,lucky:{nums:'4·6·14',colors:'Soft White & Forest',dir:'East →',time:'7–9am'},compat:[{k:'⚡ Energy Match',v:'Wood defines Metal',g:true},{k:'💯 Score',v:'79%',g:true},{k:'💕 Vibe',v:'Charming, strategic'},{k:'🌙 Karma',v:'Mystical past bond'}],why:'Jeonghan\'s Wood-Metal charm defines and elevates your energy. A beautifully complex pairing.'},
  {id:'mingyu',name:'Mingyu',hangul:'민규',group:'SEVENTEEN',dob:'Apr 6, 1997',emoji:'🌠',insta:'mingyu_svt',instaUrl:'https://instagram.com/mingyu_svt/',elem:'Earth ✦ Fire',pillars:['丁火','甲木','戊土','壬水'],pct:77,lucky:{nums:'6·8·16',colors:'Warm Brown & Gold',dir:'Center ✦',time:'2–4pm'},compat:[{k:'⚡ Energy Match',v:'Earth warms + grounds',g:true},{k:'💯 Score',v:'77%',g:true},{k:'💕 Vibe',v:'Warm, reliable'},{k:'🌙 Karma',v:'Grounding force'}],why:'Mingyu\'s Earth-Fire combination provides warmth and grounding. Tall energy that creates genuine safety.'},
  // BIGBANG / Solo
  {id:'gd',name:'G-Dragon',hangul:'지드래곤',group:'BIGBANG',dob:'Aug 18, 1988',emoji:'👑',insta:'xxxibgdrgn',instaUrl:'https://instagram.com/xxxibgdrgn/',elem:'Earth ✦ Metal',pillars:['戊土','庚金','丙火','壬水'],pct:79,lucky:{nums:'4·8·18',colors:'Gold & Charcoal',dir:'West ←',time:'2–4pm'},compat:[{k:'⚡ Energy Match',v:'Metal shapes Wood',g:true},{k:'💯 Score',v:'79%',g:true},{k:'💕 Vibe',v:'Intense creative equal'},{k:'🌙 Karma',v:'Mutual recognition'}],why:'Metal and Earth give structure to your chart. Creative ambition meets mutual respect — rare and powerful.'},
  // RIIZE/4TH GEN
  {id:'wonbin',name:'Wonbin',hangul:'원빈',group:'RIIZE',dob:'Aug 26, 2004',emoji:'🌙',insta:'riize_official',instaUrl:'https://instagram.com/riize_official/',elem:'Metal ✦ Water',pillars:['甲木','壬水','庚金','壬子'],pct:86,lucky:{nums:'1·8·26',colors:'Silver & Midnight',dir:'North ↑',time:'9–11pm'},compat:[{k:'⚡ Energy Match',v:'Metal + Water deep',g:true},{k:'💯 Score',v:'86%',g:true},{k:'💕 Vibe',v:'Attentive, artistic'},{k:'🌙 Karma',v:'New but fated'}],why:'Metal-Water combination creates deep elemental harmony. His attentiveness and precision match your intuitive depth.'},
];

const idolsFemale=[
  // BLACKPINK
  {id:'jennie',name:'Jennie',hangul:'제니',group:'BLACKPINK',dob:'Jan 16, 1996',emoji:'💎',insta:'jennierubyjane',instaUrl:'https://instagram.com/jennierubyjane/',elem:'Wood ✦ Water',pillars:['乙木','甲木','壬水','庚金'],pct:86,lucky:{nums:'3·6·16',colors:'Rose Gold & Black',dir:'East →',time:'10am–12pm'},compat:[{k:'⚡ Energy Match',v:'Wood feeds Fire',g:true},{k:'💯 Score',v:'86%',g:true},{k:'💕 Vibe',v:'Confident, selective'},{k:'🌙 Karma',v:'Strong past-life'}],why:'Her Wood fuels your Fire in a generative spiral. Strategic intelligence meets your vision — mutual elevation.'},
  {id:'lisa',name:'Lisa',hangul:'리사',group:'BLACKPINK',dob:'Mar 27, 1997',emoji:'⚡',insta:'lalalalisa_m',instaUrl:'https://instagram.com/lalalalisa_m/',elem:'Fire ✦ Wood',pillars:['丁火','甲木','壬水','庚金'],pct:81,lucky:{nums:'1·7·27',colors:'Electric Gold & Green',dir:'South ↓',time:'12–2pm'},compat:[{k:'⚡ Energy Match',v:'Fire warms Water',g:true},{k:'💯 Score',v:'81%',g:true},{k:'💕 Vibe',v:'Energetic, free'},{k:'🌙 Karma',v:'Cross-cultural link'}],why:'Her Fire warms your Water without evaporating it. Wood amplifies yours — someone who matches your pace exactly.'},
  {id:'rose',name:'Rosé',hangul:'로제',group:'BLACKPINK',dob:'Feb 11, 1997',emoji:'🌹',insta:'roses_are_rosie',instaUrl:'https://instagram.com/roses_are_rosie/',elem:'Wood ✦ Fire',pillars:['丁火','乙木','壬水','甲木'],pct:84,lucky:{nums:'2·9·11',colors:'Dusty Rose & Sage',dir:'East →',time:'7–9am'},compat:[{k:'⚡ Energy Match',v:'Wood + Fire spiral',g:true},{k:'💯 Score',v:'84%',g:true},{k:'💕 Vibe',v:'Emotionally deep'},{k:'🌙 Karma',v:'Artistic soul bond'}],why:'Wood-Fire creates an amplifying cycle. Emotional transparency meets your depth — resonance on every frequency.'},
  {id:'jisoo',name:'Jisoo',hangul:'지수',group:'BLACKPINK',dob:'Jan 3, 1995',emoji:'🌸',insta:'sooyaaa__',instaUrl:'https://instagram.com/sooyaaa__/',elem:'Earth ✦ Wood',pillars:['甲木','戊土','壬水','乙木'],pct:83,lucky:{nums:'4·6·13',colors:'Warm Ivory & Blush',dir:'Center ✦',time:'2–4pm'},compat:[{k:'⚡ Energy Match',v:'Earth grounds Water',g:true},{k:'💯 Score',v:'83%',g:true},{k:'💕 Vibe',v:'Warm, grounded'},{k:'🌙 Karma',v:'Ancient warmth'}],why:'Earth provides the vessel your Water needs. Her warmth feels like home — steady, not exciting. Better.'},
  // SNSD/Solo
  {id:'taeyeon',name:'Taeyeon',hangul:'태연',group:'SNSD / Solo',dob:'Mar 9, 1989',emoji:'🌙',insta:'taeyeon_ss',instaUrl:'https://instagram.com/taeyeon_ss/',elem:'Earth ✦ Water',pillars:['己土','壬水','甲木','丁火'],pct:88,lucky:{nums:'2·9·18',colors:'Silver & Dusty Rose',dir:'North ↑',time:'9–11pm'},compat:[{k:'⚡ Energy Match',v:'Earth holds Water',g:true},{k:'💯 Score',v:'88%',g:true},{k:'💕 Vibe',v:'Deeply loyal'},{k:'🌙 Karma',v:'Old soul connection'}],why:'Earth gives your Water a vessel. Her Water mirrors your intuition at a frequency that feels like being truly known.'},
  {id:'iu',name:'IU',hangul:'아이유',group:'Solo',dob:'May 16, 1993',emoji:'🎵',insta:'dlwlrma',instaUrl:'https://instagram.com/dlwlrma/',elem:'Fire ✦ Earth',pillars:['癸水','丙火','戊土','甲木'],pct:91,lucky:{nums:'5·8·16',colors:'Warm Amber & Cream',dir:'South ↓',time:'10am–12pm'},compat:[{k:'⚡ Energy Match',v:'Fire illuminates ✦',g:true},{k:'💯 Score',v:'91%',g:true},{k:'💕 Vibe',v:'Deep, artistic'},{k:'🌙 Karma',v:'Lifetime bond',g:true}],why:'Fire-Earth is the rarest complement. Her Fire illuminates your depth without consuming it. 91% — 천생연분.'},
  // aespa
  {id:'winter',name:'Winter',hangul:'윈터',group:'aespa',dob:'Jan 1, 2001',emoji:'❄️',insta:'aespa_official',instaUrl:'https://instagram.com/aespa_official/',elem:'Water ✦ Metal',pillars:['庚金','壬水','甲木','癸水'],pct:85,lucky:{nums:'1·6·10',colors:'Ice Blue & Silver',dir:'North ↑',time:'11pm–1am'},compat:[{k:'⚡ Energy Match',v:'Metal + Water deep',g:true},{k:'💯 Score',v:'85%',g:true},{k:'💕 Vibe',v:'Cool, precise'},{k:'🌙 Karma',v:'Mirror soul link'}],why:'Metal-Water creates deep elemental harmony. Her precision gives structure to your intuition — complementary intelligences.'},
  {id:'karina',name:'Karina',hangul:'카리나',group:'aespa',dob:'Apr 11, 2000',emoji:'🤖',insta:'aespa_official',instaUrl:'https://instagram.com/aespa_official/',elem:'Metal ✦ Fire',pillars:['庚金','丙火','壬水','甲木'],pct:82,lucky:{nums:'7·11·20',colors:'Midnight Purple & Chrome',dir:'West ←',time:'8–10pm'},compat:[{k:'⚡ Energy Match',v:'Metal shapes Wood',g:true},{k:'💯 Score',v:'82%',g:true},{k:'💕 Vibe',v:'Assertive, loyal'},{k:'🌙 Karma',v:'Future-forward bond'}],why:'Metal gives structure to your creative Wood. Her Fire activates your Water — ambition meets depth.'},
  {id:'ningning',name:'Ningning',hangul:'닝닝',group:'aespa',dob:'Oct 23, 2002',emoji:'🎶',insta:'aespa_official',instaUrl:'https://instagram.com/aespa_official/',elem:'Fire ✦ Earth',pillars:['丙火','戊土','壬水','甲木'],pct:77,lucky:{nums:'1·5·23',colors:'Coral & Warm Brown',dir:'South ↓',time:'12–2pm'},compat:[{k:'⚡ Energy Match',v:'Fire + Earth balance',g:true},{k:'💯 Score',v:'77%',g:true},{k:'💕 Vibe',v:'Expressive, loyal'},{k:'🌙 Karma',v:'Vocal soul link'}],why:'Fire-Earth brings warmth and ground to your chart. Her expressive nature draws out what your depth keeps quiet.'},
  {id:'giselle',name:'Giselle',hangul:'지젤',group:'aespa',dob:'Oct 30, 2000',emoji:'🖤',insta:'aespa_official',instaUrl:'https://instagram.com/aespa_official/',elem:'Water ✦ Wood',pillars:['庚金','壬水','甲木','乙木'],pct:80,lucky:{nums:'2·6·30',colors:'Black & Deep Purple',dir:'North ↑',time:'10pm–12am'},compat:[{k:'⚡ Energy Match',v:'Water flows with Wood',g:true},{k:'💯 Score',v:'80%',g:true},{k:'💕 Vibe',v:'Witty, creative'},{k:'🌙 Karma',v:'Artistic kinship'}],why:'Water-Wood creates a gentle growth cycle. Her creativity and wit spark something new in your energy field.'},
  // NewJeans
  {id:'minji',name:'Minji',hangul:'민지',group:'NewJeans',dob:'May 7, 2004',emoji:'🎀',insta:'newjeans_official',instaUrl:'https://instagram.com/newjeans_official/',elem:'Wood ✦ Earth',pillars:['甲木','戊土','乙木','壬水'],pct:79,lucky:{nums:'3·5·17',colors:'Sage Green & Cream',dir:'East →',time:'8–10am'},compat:[{k:'⚡ Energy Match',v:'Wood grows freely',g:true},{k:'💯 Score',v:'79%',g:true},{k:'💕 Vibe',v:'Natural, genuine'},{k:'🌙 Karma',v:'Gentle past thread'}],why:'Wood-Earth grows gently alongside yours. Naturalness creates a pairing without pretense — rare and refreshing.'},
  {id:'hanni',name:'Hanni',hangul:'하니',group:'NewJeans',dob:'Oct 6, 2004',emoji:'🌺',insta:'newjeans_official',instaUrl:'https://instagram.com/newjeans_official/',elem:'Metal ✦ Wood',pillars:['庚金','甲木','壬水','丁火'],pct:83,lucky:{nums:'6·10·16',colors:'Blush & Champagne',dir:'West ←',time:'6–8pm'},compat:[{k:'⚡ Energy Match',v:'Metal defines Wood',g:true},{k:'💯 Score',v:'83%',g:true},{k:'💕 Vibe',v:'Bright, energetic'},{k:'🌙 Karma',v:'Cross-cultural destiny'}],why:'Her Metal-Wood combination defines and elevates your energy with a spark of cultural crossing — rare magnetic pull.'},
  // IVE
  {id:'wonyoung',name:'Wonyoung',hangul:'원영',group:'IVE',dob:'Aug 31, 2004',emoji:'🌟',insta:'ivestarship',instaUrl:'https://instagram.com/ivestarship/',elem:'Metal ✦ Wood',pillars:['甲木','庚金','壬水','乙木'],pct:80,lucky:{nums:'8·11·31',colors:'Deep Red & Gold',dir:'West ←',time:'6–8pm'},compat:[{k:'⚡ Energy Match',v:'Metal defines Wood',g:true},{k:'💯 Score',v:'80%',g:true},{k:'💕 Vibe',v:'Perfectionist, caring'},{k:'🌙 Karma',v:'Destiny encounter'}],why:'Metal defines your Wood into its highest form. Her drive matches your depth — mutual excellence.'},
  {id:'yujin',name:'Yujin',hangul:'유진',group:'IVE',dob:'Sep 1, 2003',emoji:'✨',insta:'ivestarship',instaUrl:'https://instagram.com/ivestarship/',elem:'Water ✦ Metal',pillars:['癸水','庚金','甲木','壬水'],pct:86,lucky:{nums:'1·9·21',colors:'Aqua & Chrome',dir:'North ↑',time:'9–11pm'},compat:[{k:'⚡ Energy Match',v:'Water + Metal deep',g:true},{k:'💯 Score',v:'86%',g:true},{k:'💕 Vibe',v:'Bright, determined'},{k:'🌙 Karma',v:'Generation fated link'}],why:'Water-Metal creates a precision-intuition pairing. Her determination structures your flow into something powerful.'},
  // Solo
  {id:'yoona',name:'Yoona',hangul:'윤아',group:'SNSD / Solo',dob:'May 30, 1989',emoji:'💐',insta:'yoona__lim',instaUrl:'https://instagram.com/yoona__lim/',elem:'Wood ✦ Fire',pillars:['己土','甲木','丙火','壬水'],pct:87,lucky:{nums:'3·9·30',colors:'Warm Honey & Leaf Green',dir:'East →',time:'10am–12pm'},compat:[{k:'⚡ Energy Match',v:'Wood fuels warmth',g:true},{k:'💯 Score',v:'87%',g:true},{k:'💕 Vibe',v:'Warm, dependable'},{k:'🌙 Karma',v:'Long past-life link'}],why:'Wood-Fire warms and activates your chart. Her reliability and warmth provide what your nature quietly seeks — steadiness.'},
];

// ── SAJU FALLBACK DATA ──
const sajuDb=[
  {elem:'🌿 Wood · Fire',sub:'甲木·丁火 — Growth + Passion Energy',
   oh:[{n:'🌿 Wood',c:'rgba(74,222,128,0.15)',tc:'#86EFAC',s:true},{n:'🔥 Fire',c:'rgba(251,146,60,0.12)',tc:'#FDBA74',s:true},{n:'🌍 Earth',c:'rgba(251,191,36,0.08)',tc:'#FDE68A',s:false},{n:'⚡ Metal',c:'rgba(148,163,184,0.08)',tc:'#CBD5E1',s:false},{n:'💧 Water',c:'rgba(96,165,250,0.08)',tc:'#93C5FD',s:false}],
   avoid:['⏰ Late-night major decisions','⚡ Metal-dominant energy partners','🍂 Autumn project launches','💨 Rushing your creative process'],
   good:['🌅 Morning creative work','💧 Water-energy mentors & friends','🌸 Spring new beginnings','📚 Teaching and nurturing roles'],
   must:['✨ Always trust your first instinct','🏗️ Build foundations before 40','🧭 Face east in morning routines','😴 Rest before you feel depleted'],
   never:['🤝 Business with Fire-dominant energy partners','📅 Major moves in Year of the Dog','🌙 Override your November gut feelings','💤 Neglect sleep — your Wood Vibe requires it'],
   love:'🌿 Your Wood-Fire energy draws people in effortlessly. But your Destiny Stars show you\'ve been choosing partners who take your warmth without returning it. Your fated one carries Water energy — nourishing your growth without consuming your flame.'},
  {elem:'🔥 Fire · Metal',sub:'丙火·庚金 — Passion + Precision Energy',
   oh:[{n:'🔥 Fire',c:'rgba(251,146,60,0.15)',tc:'#FDBA74',s:true},{n:'⚡ Metal',c:'rgba(148,163,184,0.15)',tc:'#CBD5E1',s:true},{n:'🌍 Earth',c:'rgba(251,191,36,0.08)',tc:'#FDE68A',s:false},{n:'🌿 Wood',c:'rgba(74,222,128,0.08)',tc:'#86EFAC',s:false},{n:'💧 Water',c:'rgba(96,165,250,0.08)',tc:'#93C5FD',s:false}],
   avoid:['💥 Impulsive new partnerships','💧 Water-energy business ties','❄️ Winter major decisions','🗣️ Over-explaining yourself'],
   good:['👑 Leadership and creative direction','🌍 Earth-energy grounding allies','☀️ Summer momentum building','🧘 Structured deep solo work'],
   must:['🌸 Major decisions in spring only','🔋 Protect your social energy carefully','🙏 Release the need to be understood','⚡ Act before overthinking holds you back'],
   never:['🚨 Ignore your body signals — elemental alerts','⏱️ Rush timelines in Year of the Rat','🎭 Trust flattery over consistency','🌀 Let Metal override your Fire instincts'],
   love:'🔥 Fire-Metal energy attracts intensely but bonds slowly. You\'ve confused intensity for depth before. Your fated one carries Water and Wood — softening your Metal without extinguishing your beautiful Fire.'},
  {elem:'💧 Water · Wood',sub:'壬水·甲木 — Flow + Growth Energy',
   oh:[{n:'💧 Water',c:'rgba(96,165,250,0.15)',tc:'#93C5FD',s:true},{n:'🌿 Wood',c:'rgba(74,222,128,0.15)',tc:'#86EFAC',s:true},{n:'🌍 Earth',c:'rgba(251,191,36,0.08)',tc:'#FDE68A',s:false},{n:'🔥 Fire',c:'rgba(251,146,60,0.08)',tc:'#FDBA74',s:false},{n:'⚡ Metal',c:'rgba(148,163,184,0.08)',tc:'#CBD5E1',s:false}],
   avoid:['🔥 Fire-dominant energy people close up','⚡ Midday high-pressure environments','📋 Overcommitting before feeling ready','😴 Ignoring your tiredness signals'],
   good:['🤝 Deep one-on-one connections','⚡ Metal structure and discipline','🍂 Autumn reflection periods','🎨 Creative and healing work'],
   must:['🔮 Honor your intuition as real data','🌅 Create before consuming each morning','🧭 Face north — your elemental direction','💤 Rest without guilt — it\'s productive'],
   never:['🧠 Override strong gut feelings with logic','💬 Make promises in emotional moments','⏰ Let others rush your natural timing','🌊 Neglect water — literal and symbolic'],
   love:'💧 Water-Wood people love with extraordinary depth and quietly. Your Destiny Stars show you\'ve been the one who loves more and waits longer than is good for you. Your fated one carries Metal energy — the structure that gives your flow a vessel.'}
];

const matchData=[
  [{grad:'linear-gradient(135deg,#1A2A3A,#2A4A5A)',emoji:'😊',name:'Junho',age:29,nat:'🇰🇷',loc:'Seoul → Tokyo',job:'Graphic Designer',elem:'💧 Water ✦ ⚡ Metal',pct:94,why:'His Water energy nourishes your Wood in the generative cycle (상생). 94% compatibility — Korean masters call this 천생연분 (heaven-made fate).'},
   {grad:'linear-gradient(135deg,#2A1A3A,#4A2A5A)',emoji:'🙂',name:'Minjae',age:32,nat:'🇰🇷',loc:'Busan',job:'Marine Biologist',elem:'🌍 Earth ✦ 💧 Water',pct:88,why:'His Earth grounds your Wood energy and gives your Fire a stable landing. A karmic thread connects you — an unfinished story trying to complete itself.'}],
  [{grad:'linear-gradient(135deg,#1A3A2A,#2A5A3A)',emoji:'😊',name:'Taehyun',age:31,nat:'🇰🇷',loc:'Seoul',job:'Architect',elem:'🌿 Wood ✦ 💧 Water',pct:91,why:'His Wood feeds your Fire while his Water cools your Metal. Elemental balance at its most complete — 천생연분.'},
   {grad:'linear-gradient(135deg,#3A2A1A,#5A4A2A)',emoji:'🙂',name:'Seongmin',age:34,nat:'🇰🇷',loc:'Busan',job:'Chef',elem:'🌍 Earth ✦ 🌿 Wood',pct:86,why:'His Earth grounds your restless Fire-Metal energy. His steadiness is the anchor your intensity has been seeking without knowing it.'}],
  [{grad:'linear-gradient(135deg,#2A1A1A,#4A2A2A)',emoji:'😊',name:'Donghyun',age:30,nat:'🇰🇷',loc:'Jeju Island',job:'Photographer',elem:'⚡ Metal ✦ 🌍 Earth',pct:96,why:'Metal gives your Water a vessel and your Wood a trellis — the rarest complete pairing. 96% — 일생의 인연 (the connection of a lifetime).'},
   {grad:'linear-gradient(135deg,#1A1A3A,#2A2A5A)',emoji:'🙂',name:'Kyungmin',age:27,nat:'🇰🇷',loc:'Incheon',job:'Software Engineer',elem:'⚡ Metal ✦ 🔥 Fire',pct:88,why:'His Fire warms your Water without evaporating it. His Metal structures your Wood without rigidity. A meeting already in motion.'}]
];

// ── 50 GACHA FORTUNES ──
const gachaFortunes=[
  {rarity:'legendary',symbol:'🌟',title:'Great Fortune · 大吉',subtitle:'The universe is wide open for you today',num:'8',color:'Red & Gold',dir:'South ↓',hour:'11am',guardian:'Tiger spirit',message:'A rare alignment of all Five Elements surrounds you today. What you begin now carries the energy of completion. Move boldly — the cosmos is at your back.',items:[{l:'Lucky Number',v:'8',e:'🔢'},{l:'Lucky Color',v:'Red & Gold',e:'🔴'},{l:'Direction',v:'South',e:'🧭'},{l:'Peak Hour',v:'11am',e:'⏰'},{l:'Guardian',v:'Tiger',e:'🐅'},{l:'Element',v:'Fire ✦',e:'🔥'}]},
  {rarity:'epic',symbol:'🌙',title:'Moon Fortune · 月吉',subtitle:'Love and intuition are your gifts today',num:'6',color:'Silver & Pearl',dir:'North ↑',hour:'9pm',guardian:'Rabbit spirit',message:'Your emotional intelligence is heightened today. A message you receive after sunset holds more meaning than it appears. Trust the still, quiet voice inside.',items:[{l:'Lucky Number',v:'6',e:'🔢'},{l:'Lucky Color',v:'Silver',e:'⚪'},{l:'Direction',v:'North',e:'🧭'},{l:'Peak Hour',v:'9pm',e:'⏰'},{l:'Guardian',v:'Rabbit',e:'🐇'},{l:'Element',v:'Water ✦',e:'💧'}]},
  {rarity:'epic',symbol:'🐉',title:'Dragon Star · 龍星',subtitle:'Power and clarity arrive together',num:'9',color:'Jade & Gold',dir:'East →',hour:'8am',guardian:'Dragon spirit',message:'Dragon energy surrounds your path today. Begin the project you\'ve been hesitating on — the timing is exactly right. Speak up in the situation where you\'ve been quiet.',items:[{l:'Lucky Number',v:'9',e:'🔢'},{l:'Lucky Color',v:'Jade Green',e:'💚'},{l:'Direction',v:'East',e:'🧭'},{l:'Peak Hour',v:'8am',e:'⏰'},{l:'Guardian',v:'Dragon',e:'🐉'},{l:'Element',v:'Wood ✦',e:'🌿'}]},
  {rarity:'rare',symbol:'🌸',title:'Blossom Fortune · 花吉',subtitle:'New connections bloom unexpectedly',num:'3',color:'Rose & Sage',dir:'East →',hour:'2pm',guardian:'Rabbit spirit',message:'A chance encounter today is not random. The person who approaches you carries a message your soul needs. Stay open to conversations in unexpected places.',items:[{l:'Lucky Number',v:'3',e:'🔢'},{l:'Lucky Color',v:'Rose Pink',e:'🌸'},{l:'Direction',v:'East',e:'🧭'},{l:'Peak Hour',v:'2pm',e:'⏰'},{l:'Guardian',v:'Rabbit',e:'🐇'},{l:'Element',v:'Wood ✦',e:'🌿'}]},
  {rarity:'rare',symbol:'💫',title:'Star Alignment · 星合',subtitle:'Your energy shine brightest today',num:'1',color:'White & Silver',dir:'South ↓',hour:'Noon',guardian:'Horse spirit',message:'You are seen today in a way you haven\'t been before. Don\'t minimize your presence or your words. The spotlight finds those who step into it.',items:[{l:'Lucky Number',v:'1',e:'🔢'},{l:'Lucky Color',v:'Bright White',e:'⚪'},{l:'Direction',v:'South',e:'🧭'},{l:'Peak Hour',v:'Noon',e:'⏰'},{l:'Guardian',v:'Horse',e:'🐎'},{l:'Element',v:'Fire ✦',e:'🔥'}]},
  {rarity:'common',symbol:'🌊',title:'Flow Fortune · 流吉',subtitle:'Patience brings the greatest reward today',num:'4',color:'Deep Blue',dir:'North ↑',hour:'Dusk',guardian:'Snake spirit',message:'Today is not for pushing — it\'s for listening. The answer you\'ve been seeking is already present. Quiet your mind and it will surface.',items:[{l:'Lucky Number',v:'4',e:'🔢'},{l:'Lucky Color',v:'Deep Blue',e:'💙'},{l:'Direction',v:'North',e:'🧭'},{l:'Peak Hour',v:'Dusk',e:'⏰'},{l:'Guardian',v:'Snake',e:'🐍'},{l:'Element',v:'Water ✦',e:'💧'}]},
  {rarity:'rare',symbol:'⚡',title:'Thunder Fortune · 雷吉',subtitle:'Bold action creates the breakthrough',num:'7',color:'Electric Yellow',dir:'West ←',hour:'3pm',guardian:'Tiger spirit',message:'Stop waiting for permission. The moment of action is now. A decision you\'ve been delaying will resolve itself once you move — the fear is louder than the actual risk.',items:[{l:'Lucky Number',v:'7',e:'🔢'},{l:'Lucky Color',v:'Electric Yellow',e:'💛'},{l:'Direction',v:'West',e:'🧭'},{l:'Peak Hour',v:'3pm',e:'⏰'},{l:'Guardian',v:'Tiger',e:'🐅'},{l:'Element',v:'Metal ✦',e:'⚡'}]},
  {rarity:'common',symbol:'🌿',title:'Earth Fortune · 土吉',subtitle:'Stability and comfort find you today',num:'5',color:'Forest Green',dir:'Center ✦',hour:'Midday',guardian:'Ox spirit',message:'The ground beneath you is solid. Today is for consolidating, not expanding. Appreciate what\'s already built. The harvest comes after patience.',items:[{l:'Lucky Number',v:'5',e:'🔢'},{l:'Lucky Color',v:'Forest Green',e:'💚'},{l:'Direction',v:'Center',e:'🧭'},{l:'Peak Hour',v:'Midday',e:'⏰'},{l:'Guardian',v:'Ox',e:'🐂'},{l:'Element',v:'Earth ✦',e:'🌍'}]},
  {rarity:'legendary',symbol:'☀️',title:'Sun Fortune · 太陽吉',subtitle:'Everything you touch transforms today',num:'9',color:'Gold & Amber',dir:'South ↓',hour:'Sunrise',guardian:'Dragon spirit',message:'The rarest fortune — when Heaven, Earth, and Human align as one. Your intentions today carry amplified power. Set them carefully. This day repeats in your memory.',items:[{l:'Lucky Number',v:'9',e:'🔢'},{l:'Lucky Color',v:'Solar Gold',e:'🌟'},{l:'Direction',v:'South',e:'🧭'},{l:'Peak Hour',v:'Sunrise',e:'⏰'},{l:'Guardian',v:'Dragon',e:'🐉'},{l:'Element',v:'All Five ✦',e:'✨'}]},
  {rarity:'epic',symbol:'🔮',title:'Mystery Fortune · 玄吉',subtitle:'Hidden truths reveal themselves today',num:'2',color:'Deep Purple',dir:'North ↑',hour:'Midnight',guardian:'Snake spirit',message:'Something you assumed was closed is still open. Pay attention to what returns today — old threads, old friends, old dreams. They return for a reason.',items:[{l:'Lucky Number',v:'2',e:'🔢'},{l:'Lucky Color',v:'Deep Purple',e:'💜'},{l:'Direction',v:'North',e:'🧭'},{l:'Peak Hour',v:'Midnight',e:'⏰'},{l:'Guardian',v:'Snake',e:'🐍'},{l:'Element',v:'Water ✦',e:'💧'}]},
];
// Duplicate to 50
while(gachaFortunes.length<50){const base=gachaFortunes[Math.floor(Math.random()*10)];gachaFortunes.push({...base,title:base.title});}

// ── GACHA LOGIC ──
let gachaShaking=false,gachaSpun=false;
function shakeGacha(){
  const orb=document.getElementById('gacha-orb');
  if(gachaSpun)return;
  orb.classList.add('shaking');
  setTimeout(()=>orb.classList.remove('shaking'),500);
}
function drawFortune(){
  if(gachaSpun)return;
  const orb=document.getElementById('gacha-orb');
  const btn=document.getElementById('gacha-btn');
  if (btn) btn.disabled=true;
  orb.classList.add('spinning');
  // Particles
  const particles=document.getElementById('gacha-particles');
  const colors=['#C8922A','#8B5CF6','#EC4899','#14B8A6','#F59E0B'];
  for(let i=0;i<12;i++){
    const p=document.createElement('div');
    const angle=Math.random()*360;const dist=60+Math.random()*60;
    const tx=Math.cos(angle*Math.PI/180)*dist;const ty=Math.sin(angle*Math.PI/180)*dist;
    p.style.cssText=`position:absolute;width:8px;height:8px;border-radius:50%;background:${colors[i%colors.length]};left:50%;top:50%;--tx:${tx}px;--ty:${ty}px;animation:burst 0.6s ease-out forwards;`;
    if (particles) particles.appendChild(p);setTimeout(()=>p.remove(),700);
  }
  setTimeout(()=>{
    orb.classList.remove('spinning');
    const fortune=gachaFortunes[Math.floor(Math.random()*gachaFortunes.length)];
    showFortune(fortune);
    gachaSpun=true;
    const gc = document.getElementById('gacha-count');
    if (gc) gc.textContent='✅ Today\'s draw complete — come back tomorrow!';
    addPts(10);
  },700);
}
function showFortune(f){
  const rarityColors={common:'#A09080',rare:'#60A5FA',epic:'#A78BFA',legendary:'#F59E0B'};
  const itemsHtml=f.items.map(i=>`<div class="fc-item"><div class="fc-item-label">${i.l}</div><div class="fc-item-emoji">${i.e}</div><div class="fc-item-value" style="font-size:11px;">${i.v}</div></div>`).join('');
  const html=`<div class="fortune-card on">
    <div class="fc-rarity rarity-${f.rarity}">✦ ${f.rarity.toUpperCase()} FORTUNE · ${['Common','Rare','Epic','Legendary'][['common','rare','epic','legendary'].indexOf(f.rarity)]}星</div>
    <div class="fc-symbol">${f.symbol}</div>
    <div class="fc-title">${f.title}</div>
    <div class="fc-subtitle">${f.subtitle}</div>
    <div class="fc-grid">${itemsHtml}</div>
    <div class="fc-message">"${f.message}"</div>
    <button class="fc-share-btn" onclick="alert('Share your fortune to Instagram Stories! 📸')">📲 Share to Instagram Story</button>
  </div>`;
  const reveal=document.getElementById('fortune-reveal');
  if (reveal) {
    reveal.innerHTML=html;reveal.classList.add('on');
    const gmw = document.getElementById('gacha-machine-wrap');
    if (gmw) gmw.style.opacity='0.4';
    reveal.scrollIntoView({behavior:'smooth',block:'start'});
  }
}

// ── AI READING ──
async function startReading(){
  const y=document.getElementById('yr').value,m=document.getElementById('mo').value,d=document.getElementById('dy').value;
  if(!y||!m||!d){alert('Please enter your complete birth date! 📅');return;}
  const seed=(parseInt(y)+parseInt(m)+parseInt(d))%3;lastSeed=seed;
  const zodiac=getZodiac(parseInt(y));
  userZodiac=zodiac;
  userNickname=generateNickname(zodiac);
  // Show zodiac welcome
  const zd=zodiacData[zodiac];
  const ze = document.getElementById('zodiac-emoji'); if(ze) ze.textContent=zd.emoji;
  const zan = document.getElementById('zodiac-animal-name'); if(zan) zan.textContent=zd.name;
  const zn = document.getElementById('zodiac-nickname'); if(zn) zn.textContent=`✨ ${userNickname} ✨`;
  const zdesc = document.getElementById('zodiac-desc'); if(zdesc) zdesc.textContent=`Your cosmic ${zodiac} spirit. This symbol guides your SeoulMate journey.`;
  const zw = document.getElementById('zodiac-welcome'); if(zw) zw.style.display='block';
  const zb = document.getElementById('zodiac-badge'); if(zb) zb.style.display='flex';
  const zns = document.getElementById('zodiac-nick-short'); if(zns) zns.textContent=userNickname.split(' ')[1]||zodiac;
  const sz = document.getElementById('share-zodiac'); if(sz) sz.textContent=zd.emoji;
  const sn = document.getElementById('share-nick'); if(sn) sn.textContent=userNickname;
  
  const monthNames=['','January','February','March','April','May','June','July','August','September','October','November','December'];
  const gender=userGender||'person';
  const hour=document.getElementById('hr').value||'unknown hour';
  showScreen('s-load');
  const msgs=[['✨ Reading your Four Pillars...','🌌 Mapping Year · Month · Day · Hour stems'],['⚡ Calculating your 오행 Energy Vibe...','🌿 Wood · Fire · Earth · Metal · Water'],['🔮 Consulting 2,000 years of Saju wisdom...','📜 AI channeling ancient Korean tradition'],['💫 Preparing your personal reading...','🌙 Almost ready — your destiny awaits']];
  let i=0;const iv=setInterval(()=>{if(i<msgs.length){document.getElementById('loadTxt').textContent=msgs[i][0];document.getElementById('loadSub').textContent=msgs[i][1];i++;}else clearInterval(iv);},700);
  const prompt=`You are an expert Korean Saju (사주팔자) master who makes ancient wisdom accessible to international audiences. Use modern, engaging language that bridges Korean tradition with Western astrology concepts.

A ${gender} was born on ${monthNames[parseInt(m)]} ${d}, ${parseInt(y)} (Year of the ${getZodiac(parseInt(y))})${hour!=='unknown hour'?`, during the hour of the ${hour}`:''}. 

Provide a personal Saju reading in English. Use terms like "Energy Vibe", "Destiny Stars", "Cosmic Blueprint" alongside Korean terms with emoji for visual appeal. Structure:

**🌟 YOUR COSMIC BLUEPRINT**
Their dominant element combination and what it means. Use both Korean terms AND modern equivalents (e.g., "甲木 = your Wood Growth Energy"). 2-3 sentences, personal and specific.

**✨ THREE THINGS KOREA HAS ALWAYS KNOWN ABOUT YOU**
Three "punch line" insights that feel surprisingly personal. Each 1-2 sentences. Use one emoji per insight. These should make the reader think "how did they know that?"

**🗺️ YOUR FATE MAP · 길흉화복**
AVOID (⚠️피해야 할 것): 4 specific things
FITS YOU (✅잘 맞는 것): 4 things  
MUST DO (➡️꼭 해야 할 것): 4 actions
NEVER (🚫절대 금지): 4 absolute prohibitions

**💕 LOVE DESTINY · 연애운**
2-3 sentences about love patterns. What energy does their fated partner carry? Be specific about what they need to change.

Keep it engaging, personal, mystical. Use Korean terms with English explanations. Max 400 words.`;
  try{
    clearInterval(iv);
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,stream:true,messages:[{role:'user',content:prompt}]})});
    showScreen('s-result');document.querySelectorAll('.bt').forEach(b=>b.classList.remove('active'));document.getElementById('bt-home').classList.add('active');
    renderStaticResult(seed);
    const textEl=document.getElementById('ai-text');if(textEl){textEl.textContent='';textEl.classList.add('streaming');}
    const reader=res.body.getReader();const decoder=new TextDecoder();let fullText='';
    while(true){const{done,value}=await reader.read();if(done)break;const chunk=decoder.decode(value);const lines=chunk.split('\n');for(const line of lines){if(line.startsWith('data:')){const data=line.slice(5).trim();if(data==='[DONE]')continue;try{const j=JSON.parse(data);if(j.delta?.text){fullText+=j.delta.text;if(textEl)textEl.textContent=fullText;}}catch(e){}}}}
    if(textEl)textEl.classList.remove('streaming');
    readingDone=true;addPts(10);updateBio(seed);
  }catch(err){
    clearInterval(iv);showScreen('s-result');document.querySelectorAll('.bt').forEach(b=>b.classList.remove('active'));document.getElementById('bt-home').classList.add('active');
    renderStaticResult(seed);
    const r=sajuDb[seed];
    const textEl = document.getElementById('ai-text');
    if (textEl) textEl.textContent=`🌟 Your ${r.elem} Cosmic Blueprint creates a powerful Energy Vibe. The ${r.sub} Destiny Stars reveal someone whose greatest strength and deepest vulnerability are the same — you feel everything too fully, and the world is both richer and harder for it.\n\n✨ Korean Saju masters would immediately recognize your core tension: the war between what your nature demands and what the world expects. This has shown up again and again in your relationships, decisions, and regrets.\n\n${r.love}`;
    readingDone=true;addPts(10);updateBio(seed);
  }
}

function renderStaticResult(s){
  const r=sajuDb[s];
  const re = document.getElementById('r-elem'); if(re) re.textContent=r.elem+' · '+r.sub;
  const se = document.getElementById('share-elem'); if(se) se.textContent=r.elem;
  const ohr = document.getElementById('oh-row'); if(ohr) ohr.innerHTML=r.oh.map(o=>`<span class="oh-pill" style="background:${o.c};color:${o.tc};border:0.5px solid ${o.tc}40;${o.s?'font-weight:600;':'opacity:0.55;'}">${o.n}${o.s?' ✦':''}</span>`).join('');
  const gca = document.getElementById('gc-avoid'); if(gca) gca.innerHTML=r.avoid.map(x=>`<li>${x}</li>`).join('');
  const gcg = document.getElementById('gc-good'); if(gcg) gcg.innerHTML=r.good.map(x=>`<li>${x}</li>`).join('');
  const gcm = document.getElementById('gc-must'); if(gcm) gcm.innerHTML=r.must.map(x=>`<li>${x}</li>`).join('');
  const gcn = document.getElementById('gc-never'); if(gcn) gcn.innerHTML=r.never.map(x=>`<li>${x}</li>`).join('');
  const lp = document.getElementById('love-preview'); if(lp) lp.textContent=r.love;
}
function updateBio(s){
  const sets=[[88,65,72,90],[60,80,85,55],[95,88,78,94]];const d=sets[s];
  const bs = document.getElementById('bio-section'); if(bs) bs.style.display='block';
  const bl = document.getElementById('b-love'); if(bl) bl.style.width=d[0]+'%';
  const bln = document.getElementById('b-love-n'); if(bln) bln.textContent=d[0]+'%';
  const bm = document.getElementById('b-money'); if(bm) bm.style.width=d[1]+'%';
  const bmn = document.getElementById('b-money-n'); if(bmn) bmn.textContent=d[1]+'%';
  const bh = document.getElementById('b-health'); if(bh) bh.style.width=d[2]+'%';
  const bhn = document.getElementById('b-health-n'); if(bhn) bhn.textContent=d[2]+'%';
  const be = document.getElementById('b-energy'); if(be) be.style.width=d[3]+'%';
  const ben = document.getElementById('b-energy-n'); if(ben) ben.textContent=d[3]+'%';
}

// ── IDOL RENDER ──
function getPool(){return userGender==='Man'?idolsFemale:idolsMale;}
function filterIdols(f,btn){currentIdolFilter=f;openIdolId=null;document.querySelectorAll('#idol-filters .ftab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderIdols();}

function renderIdols(){
  const pool=getPool();
  const filtered=pool.filter(i=>currentIdolFilter==='All'||i.group===currentIdolFilter||(currentIdolFilter==='Solo'&&i.group==='Solo'));
  // TOP 3
  const top3=[...filtered].sort((a,b)=>b.pct-a.pct).slice(0,3);
  const t3r = document.getElementById('top3-row');
  if (t3r) t3r.innerHTML=top3.map((idol,rank)=>`<div class="top3-card" onclick="openIdol('${idol.id}')"><span class="top3-emoji">${['🥇','🥈','🥉'][rank]}${idol.emoji}</span><div class="top3-name cin">${idol.name}</div><div class="top3-pct">${idol.pct}%</div></div>`).join('');
  // GRID
  const ig = document.getElementById('idol-grid');
  if (ig) ig.innerHTML=filtered.map(i=>`<div class="idol-card${openIdolId===i.id?' open':''}" id="ic-${i.id}" onclick="openIdol('${i.id}')">
    <div class="ic-avatar-wrap" style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(200,146,42,0.1));">
      <span class="ic-emoji-big">${i.emoji}</span>
      <div class="ic-rank">${i.pct}%</div>
      <a class="ic-insta-icon" href="${i.instaUrl}" target="_blank" onclick="event.stopPropagation();" title="@${i.insta}">📷</a>
    </div>
    <div class="ic-body">
      <div class="ic-name">${i.name}</div>
      <div class="ic-group">${i.group}</div>
      <div class="ic-elem">${i.elem}</div>
      <div class="compat-mini"><div class="cf" style="width:${i.pct}%;"></div></div>
    </div>
  </div>`).join('');
  // DETAIL
  const dWrap=document.getElementById('idol-detail-wrap');
  if(!dWrap) return;
  if(!openIdolId){dWrap.innerHTML='';return;}
  const idol=filtered.find(i=>i.id===openIdolId);
  if(!idol){dWrap.innerHTML='';return;}
  dWrap.innerHTML=`<div class="idol-detail on">
    <div class="detail-top">
      <div class="detail-emoji">${idol.emoji}</div>
      <div class="detail-info">
        <div class="detail-name">${idol.name} (${idol.hangul})</div>
        <div class="detail-group">🎤 ${idol.group}</div>
        <div class="detail-dob">📅 Born ${idol.dob}</div>
        <div class="detail-dob">📱 @${idol.insta}</div>
      </div>
      <div style="text-align:right;"><div class="detail-pct">${idol.pct}<span style="font-size:14px;">%</span></div><div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:1px;color:var(--t2);">궁합</div></div>
    </div>
    <div class="dtabs">
      <button class="dtab active" onclick="switchDTab('${idol.id}','saju',this)">四柱 Saju</button>
      <button class="dtab" onclick="switchDTab('${idol.id}','compat',this)">💕 Match</button>
      <button class="dtab" onclick="switchDTab('${idol.id}','lucky',this)">✦ Lucky</button>
    </div>
    <div class="dpane on" id="dp-${idol.id}-saju">
      <div class="saju-pillars">${idol.pillars.map((p,i)=>`<div class="sp"><span class="sp-h">${p}</span><span class="sp-l">${['Year','Month','Day','Hour'][i]}</span></div>`).join('')}</div>
      <div style="background:var(--bg2);border:0.5px solid var(--border);border-radius:8px;padding:0.875rem;font-size:13px;color:var(--t2);line-height:1.7;"><strong style="color:var(--gold);font-family:'Cinzel',serif;font-size:10px;letter-spacing:1px;">⚡ ${idol.elem}</strong><br><br>${idol.why}</div>
    </div>
    <div class="dpane" id="dp-${idol.id}-compat">
      ${idol.compat.map(c=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:0.5px solid var(--border2);font-size:12px;"><span style="color:var(--t2);">${c.k}</span><span style="font-family:'Cinzel',serif;font-weight:600;${c.g?'color:var(--gold);':'color:var(--text);'}">${c.v}</span></div>`).join('')}
      <p style="font-size:12px;color:var(--t2);font-style:italic;margin-top:0.75rem;line-height:1.7;">${idol.why}</p>
    </div>
    <div class="dpane" id="dp-${idol.id}-lucky">
      <div class="lucky-g">
        <div class="lb" style="background:rgba(200,146,42,0.08);border-color:var(--border);"><h5 style="color:var(--gold);">🔢 LUCKY NUMS</h5><p style="color:var(--text);">${idol.lucky.nums}</p></div>
        <div class="lb" style="background:rgba(96,165,250,0.08);border-color:rgba(96,165,250,0.2);"><h5 style="color:#93C5FD;">🎨 LUCKY COLOR</h5><p style="font-size:10px;color:var(--text);">${idol.lucky.colors}</p></div>
        <div class="lb" style="background:rgba(52,211,153,0.08);border-color:rgba(52,211,153,0.2);"><h5 style="color:#6EE7B7;">🧭 DIRECTION</h5><p style="color:var(--text);">${idol.lucky.dir}</p></div>
        <div class="lb" style="background:rgba(244,114,182,0.08);border-color:rgba(244,114,182,0.2);"><h5 style="color:#F9A8D4;">⏰ PEAK TIME</h5><p style="font-size:10px;color:var(--text);">${idol.lucky.time}</p></div>
      </div>
    </div>
    <a class="insta-btn" href="${idol.instaUrl}" target="_blank">📸 Visit @${idol.insta} on Instagram</a>
    <button class="detail-close" onclick="openIdolId=null;renderIdols();">✕ Close</button>
  </div>`;
  setTimeout(()=>dWrap.scrollIntoView({behavior:'smooth',block:'nearest'}),50);
}

function openIdol(id){openIdolId=(openIdolId===id)?null:id;renderIdols();}
function switchDTab(id,pane,btn){
  const d=document.getElementById('idol-detail-wrap');
  if (d) {
    d.querySelectorAll('.dtab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');
    d.querySelectorAll('.dpane').forEach(p=>p.classList.remove('on'));
    const target = document.getElementById(`dp-${id}-${pane}`);
    if (target) target.classList.add('on');
  }
}

// ── MATCHES ──
function buildMatches(){
  const matches=matchData[lastSeed];
  const mc = document.getElementById('match-cards');
  if (mc) mc.innerHTML=matches.map((m,i)=>`<div class="match-card">
    <div class="mc-top">
      <div style="position:relative;width:64px;height:64px;flex-shrink:0;">
        <div class="mc-face" style="background:${m.grad};width:64px;height:64px;">${m.emoji}</div>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:50%;"><span style="font-size:16px;">🔒</span></div>
      </div>
      <div class="mc-info">
        <div class="mc-ai">✦ AI PROFILE · MATCH #${i+1}</div>
        <div class="mc-name">🇰🇷 ${m.name}, ${m.age}</div>
        <div class="mc-loc">📍 ${m.loc} · ${m.job}</div>
        <div class="compat-mini" style="margin-bottom:3px;"><div class="cf" style="width:${m.pct}%;"></div></div>
        <div style="font-size:10px;font-family:'Cinzel',serif;color:var(--gold);">${m.pct}% Compatibility ⚡ ${m.elem}</div>
      </div>
    </div>
    <div class="mc-body">💫 ${m.why}</div>
    <div class="mc-reveal"><span>👁️ Face hidden · Unlock to reveal</span><button class="reveal-sm">Reveal ✦</button></div>
  </div>`).join('');
}

// ── CHAT ──
const chatUsers=[
  {id:'c1',name:'Junho 🇰🇷',emoji:'😊',grad:'linear-gradient(135deg,#1A2A3A,#2A4A5A)',compat:'94% 궁합',locked:false,
   msgs:[{from:'them',text:'안녕 ~ Hi! I saw your Saju result 👀 We have really good 궁합! 💫',time:'2m ago'},{from:'them',text:'I\'m from Seoul but living in Tokyo now 🌏 Do you know much about Saju?',time:'1m ago'}],
   ice:['What does your Energy Vibe (오행) say about you?','Have you had your 궁합 read before? 🔮','What\'s your fortune like this week? ✨','Do you believe in 인연 (fated connections)? 🌙']},
  {id:'c2',name:'Minjae 🇰🇷',emoji:'🙂',grad:'linear-gradient(135deg,#2A1A3A,#4A2A5A)',compat:'88% 궁합',locked:true,msgs:[{from:'them',text:'Your Saju Energy Vibe sounds really interesting... 🌿',time:'5m ago'}],ice:[]},
  {id:'c3',name:'✦ Saju AI Guide',emoji:'🔮',grad:'linear-gradient(135deg,#2A1A0A,#4A3A1A)',compat:'SeoulMate AI',locked:false,
   msgs:[{from:'them',text:'안녕! Welcome to SeoulMate! 🌙 I\'m your personal Saju Guide powered by AI. Ask me anything about your reading, Energy Vibes, or Korean destiny! ✨',time:'Just now'}],
   ice:['Tell me more about my dominant Energy Vibe 🔮','What does my 길흉화복 mean for 2025? 📅','How do I strengthen my weaker elements? ⚡','What should I look for in a Destiny Partner? 💕']}
];
let activeChatId=null;
function buildChatList(){
  const cli = document.getElementById('chat-list-inner');
  if (cli) cli.innerHTML=chatUsers.map(u=>`<div class="chat-row" onclick="openChat('${u.id}')">
    <div class="chat-avatar" style="background:${u.grad};">${u.emoji}</div>
    <div style="flex:1;min-width:0;">
      <div class="chat-name">${u.name}</div>
      <div class="chat-preview">${u.msgs[u.msgs.length-1].text}</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
      <div style="font-size:10px;color:var(--t3);">${u.msgs[u.msgs.length-1].time}</div>
      ${u.locked?'<div style="font-size:10px;color:var(--t3);font-family:Cinzel,serif;">🔒</div>':u.id==='c1'?'<div class="chat-unread">2</div>':''}
    </div>
  </div>`).join('');}

function openChat(id){
  const u=chatUsers.find(c=>c.id===id);if(!u)return;
  if(u.locked){alert('🔒 Upgrade to Fate plan to unlock messaging! ✨');return;}
  activeChatId=id;
  document.getElementById('chat-list-view').style.display='none';
  document.getElementById('chat-convo-view').style.display='block';
  document.getElementById('convo-avatar').textContent=u.emoji;
  document.getElementById('convo-name').textContent=u.name;
  document.getElementById('convo-compat').textContent=u.compat;
  const msgs=document.getElementById('messages');
  msgs.innerHTML=u.msgs.map(m=>`<div class="msg msg-${m.from}"><div class="msg-bubble">${m.text}</div><div class="msg-time">${m.time}</div></div>`).join('');
  const iceWrap=document.getElementById('ice-wrap');
  if (iceWrap) {
    if(u.ice&&u.ice.length){iceWrap.style.display='block';document.getElementById('ice-chips').innerHTML=u.ice.map(b=>`<button class="ice-chip" onclick="useIce('${b.replace(/'/g,"\\'").replace(/"/g,'\\"')}')">💬 ${b}</button>`).join('');}
    else iceWrap.style.display='none';
  }
  setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,100);
}
function backToList(){document.getElementById('chat-list-view').style.display='block';document.getElementById('chat-convo-view').style.display='none';activeChatId=null;}
function useIce(text){document.getElementById('msgInput').value=text;sendMsg();}
async function sendMsg(){
  const input=document.getElementById('msgInput'),text=input.value.trim();if(!text)return;
  input.value='';
  const msgs=document.getElementById('messages');
  msgs.innerHTML+=`<div class="msg msg-me"><div class="msg-bubble">${text}</div><div class="msg-time">Just now</div></div>`;
  msgs.scrollTop=msgs.scrollHeight;
  const iw = document.getElementById('ice-wrap');
  if (iw) iw.style.display='none';
  if(activeChatId==='c3'){
    const typing=document.createElement('div');typing.className='msg msg-them';typing.id='typing';typing.innerHTML='<div class="msg-bubble" style="color:var(--t2);font-style:italic;">🔮 consulting the stars...</div>';msgs.appendChild(typing);msgs.scrollTop=msgs.scrollHeight;
    const r=sajuDb[lastSeed];
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:200,system:`You are SeoulMate's AI Saju Guide. The user's dominant Energy Vibe is ${r?r.elem:'Wood · Fire'}. Answer questions about Korean Saju, 오행 elements, and destiny in 2-3 sentences. Be warm, mystical, and use one relevant emoji. Use modern terms like "Energy Vibe" and "Destiny Stars" alongside Korean terms.`,messages:[{role:'user',content:text}]})});
      document.getElementById('typing')?.remove();
      const data=await res.json();const reply=data.content?.[0]?.text||'The cosmic forces are reflecting on your question... ✨';
      msgs.innerHTML+=`<div class="msg msg-them"><div class="msg-bubble">${reply}</div><div class="msg-time">Just now</div></div>`;msgs.scrollTop=msgs.scrollHeight;
    }catch(e){document.getElementById('typing')?.remove();msgs.innerHTML+=`<div class="msg msg-them"><div class="msg-bubble">🌙 The stars are momentarily quiet... try again soon ✨</div><div class="msg-time">Just now</div></div>`;msgs.scrollTop=msgs.scrollHeight;}
  }else{
    setTimeout(()=>{const replies=['Your energy today seems really bright ✨','I\'d love to hear more about your Saju reading! 🔮','Have you tried the Gacha fortune today? 🎰'];msgs.innerHTML+=`<div class="msg msg-them"><div class="msg-bubble">${replies[Math.floor(Math.random()*replies.length)]}</div><div class="msg-time">Just now</div></div>`;msgs.scrollTop=msgs.scrollHeight;},1500);}
}

// ── UTILS ──
function addPts(n){pts+=n;updatePtsUI();}
function updatePtsUI(){
  const pct=Math.min(pts/500*100,100);
  const tp = document.getElementById('topPts'); if(tp) tp.textContent=pts;
  const pb=document.getElementById('pts-big');if(pb)pb.textContent=pts;
  const bar=document.getElementById('pts-bar');if(bar)bar.style.width=pct+'%';
}
const tabMap={home:'s-home',idol:'s-idol',match:'s-match',chat:'s-chat',daily:'s-daily'};
function goTab(t){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.bt').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabMap[t]).classList.add('on');
  document.getElementById('bt-'+t).classList.add('active');
  window.scrollTo(0,0);
  if(t==='idol'){renderIdols();}
  if(t==='match')buildMatches();
  if(t==='chat'){buildChatList();backToList();}
  if(t==='daily'){const now=new Date();const tl = document.getElementById('today-lbl'); if(tl) tl.textContent=now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase();}
}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');window.scrollTo(0,0);}
// INIT today date
const todayLbl = document.getElementById('today-lbl');
if (todayLbl) todayLbl.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase();
