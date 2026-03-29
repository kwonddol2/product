const bakeries = [
    {
        name: { en: "London Bagel Museum", jp: "ロンドンベーグルミュージアム" },
        neighborhood: { en: "Anguk / Dosan", jp: "安国 / 島山" },
        address: { en: "20 Bukchon-ro 4-gil, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 北村路4キル 20" },
        menu: { en: "Spring Onion Pretzel Bagel", jp: "ネギプレッツェルベーグル" },
        desc: { en: "The #1 viral spot in Seoul. Chewy, creative bagels in a British-themed space.", jp: "ソウルで一番人気のスポット。イギリス風の空間で味わう、もちもちの創作ベーグル。" },
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Cafe Onion", jp: "カフェ・オニオン" },
        neighborhood: { en: "Anguk (Hanok)", jp: "安国 (韓屋)" },
        address: { en: "5 Gyedong-gil, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 桂洞キル 5" },
        menu: { en: "Pandoro", jp: "パンドーロ" },
        desc: { en: "A stunning Hanok (traditional house) cafe famous for its powdered sugar mountain pastry.", jp: "粉糖が山のように積もったパンドーロで有名な、美しい韓屋カフェ。" },
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Artist Bakery", jp: "アーティストベーカリー" },
        neighborhood: { en: "Anguk", jp: "安国" },
        address: { en: "167 Yulgok-ro, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 栗谷路 167" },
        menu: { en: "Salt Bread (Sogeum-ppang)", jp: "塩パン (ソグムパン)" },
        desc: { en: "A European-style salt bread specialist from the creators of London Bagel Museum.", jp: "ロンドンベーグルミュージアムのチームが手掛ける、ヨーロッパ風の塩パン専門店。" },
        img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Jayeondo Salt Bread", jp: "自然島塩パン" },
        neighborhood: { en: "Seongsu / Ikseon", jp: "聖水 / 益善洞" },
        address: { en: "56-1 Yeonmujang-gil, Seongdong-gu, Seoul", jp: "ソウル特別市 城東区 演武場キル 56-1" },
        menu: { en: "Signature Salt Bread (Set of 4)", jp: "シグネチャー塩パン (4個セット)" },
        desc: { en: "Buttery and crispy salt bread sold in viral sets. Often has a fast-moving queue.", jp: "バターたっぷりでカリカリの塩パン。行列ができる人気セット販売店。" },
        img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Teddy Beurre House", jp: "テディブールハウス" },
        neighborhood: { en: "Yongsan (Samgakji)", jp: "龍山 (三角地)" },
        address: { en: "42-1 Hangang-daero 40-ga-gil, Yongsan-gu, Seoul", jp: "ソウル特別市 龍山区 漢江大路40街キル 42-1" },
        menu: { en: "Pistachio Croissant", jp: "ピスタチオクロワッサン" },
        desc: { en: "A whimsical French-style bakery themed around cute teddy bears.", jp: "可愛いテディベアをテーマにした、幻想的なフランス風ベーカリー。" },
        img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Dotori Garden", jp: "ドトリガーデン" },
        neighborhood: { en: "Anguk", jp: "安国" },
        address: { en: "19-8 Gyedong-gil, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 桂洞キル 19-8" },
        menu: { en: "Acorn Madeleine", jp: "どんぐりマドレーヌ" },
        desc: { en: "A Ghibli-esque cottage cafe serving acorn-shaped sweets and Greek yogurt.", jp: "ジブリのような雰囲気のコテージカフェ。どんぐり型のスイーツが人気。" },
        img: "https://images.unsplash.com/photo-1587248721545-977468832b14?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Nudake", jp: "ヌデイク" },
        neighborhood: { en: "Haus Dosan / Seongsu", jp: "ハウス島山 / 聖水" },
        address: { en: "50 Apgujeong-ro 46-gil, Gangnam-gu, Seoul", jp: "ソウル特別市 江南区 狎鴎亭路46街キル 50" },
        menu: { en: "Peak Cake (Black Croissant)", jp: "ピークケーキ (ブラッククロワッサン)" },
        desc: { en: "Futuristic and artistic desserts by Gentle Monster. The Peak cake is iconic.", jp: "ジェントルモンスターが手掛ける芸術的なデザート。抹茶クリームのピークケーキは必見。" },
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Ugly Bakery", jp: "アグリーベーカリー" },
        neighborhood: { en: "Mangwon", jp: "望遠" },
        address: { en: "73 World Cup-ro 13-gil, Mapo-gu, Seoul", jp: "ソウル特別市 麻浦区 ワールドカップ路13街キル 73" },
        menu: { en: "Mammoth Bread / Cream Buns", jp: "マンモスパン / クリームパン" },
        desc: { en: "Known for heavy, cream-filled buns and traditional Mammoth bread with diverse fillings.", jp: "ずっしりとクリームが詰まったパンや、具沢山のマンモスパンで有名。" },
        img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Abebe Bakery", jp: "アベベベーカリー" },
        neighborhood: { en: "Gwangjang Market", jp: "広蔵市場" },
        address: { en: "210 Cheonggyecheon-ro, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 清渓川路 210" },
        menu: { en: "Jeju Peanut Cream Donut", jp: "済州ピーナッツクリームドーナツ" },
        desc: { en: "Originating from Jeju Island, offering unique donuts inspired by local Jeju ingredients.", jp: "済州島発のベーカリー。島の特産品を活かしたユニークなドーナツが揃う。" },
        img: "https://images.unsplash.com/photo-1530631673369-bc20fdb32ff8?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Cheongsudang", jp: "清水堂" },
        neighborhood: { en: "Ikseon-dong", jp: "益善洞" },
        address: { en: "31-9 Donhwamun-ro 11-na-gil, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 敦化門路11ナキル 31-9" },
        menu: { en: "Soufflé Castella", jp: "スフレカステラ" },
        desc: { en: "A peaceful water-garden cafe. The lantern-lit entrance is an Instagram favorite.", jp: "美しい水辺の庭園があるカフェ。提灯が灯る入口は絶好のフォトスポット。" },
        img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Soha Salt Pond", jp: "ソハ塩田" },
        neighborhood: { en: "Ikseon-dong", jp: "益善洞" },
        address: { en: "21-5 Supyo-ro 28-gil, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 水標路28街キル 21-5" },
        menu: { en: "Truffle Salt Bread", jp: "トリュフ塩パン" },
        desc: { en: "A themed cafe designed like a traditional salt farm, specializing in salt bread.", jp: "塩田をテーマにしたユニークなカフェ。こだわりの塩パンが楽しめる。" },
        img: "https://images.unsplash.com/photo-1621236378699-8597fac6bb4d?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Daelim Warehouse", jp: "テリム倉庫" },
        neighborhood: { en: "Seongsu", jp: "聖水" },
        address: { en: "78 Seongsui-ro, Seongdong-gu, Seoul", jp: "ソウル特別市 城東区 聖水二路 78" },
        menu: { en: "Rustic Croissants / Coffee", jp: "クロワッサン / コーヒー" },
        desc: { en: "The pioneer of Seongsu-dong's industrial chic vibe. A massive warehouse-turned-cafe.", jp: "聖水洞のインダストリアルな雰囲気を定着させた、巨大な倉庫リノベーションカフェ。" },
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Lowide", jp: "ロワイド" },
        neighborhood: { en: "Seongsu", jp: "聖水" },
        address: { en: "22-1 Seoulsup 2-gil, Seongdong-gu, Seoul", jp: "ソウル特別市 城東区 ソウルの森2キル 22-1" },
        menu: { en: "Corn Scone", jp: "コーンスコーン" },
        desc: { en: "A minimalist, trendy spot near Seoul Forest popular with the fashion-forward crowd.", jp: "ソウルの森近くにあるミニマルなカフェ。トレンドに敏感な人々に人気。" },
        img: "https://images.unsplash.com/photo-1550617175-e1c093587516?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Peony", jp: "ピオニー" },
        neighborhood: { en: "Yeonnam / Hongdae", jp: "延南洞 / 弘大" },
        address: { en: "53 Eoulmadang-ro, Mapo-gu, Seoul", jp: "ソウル特別市 麻浦区 語義マダン路 53" },
        menu: { en: "Strawberry Shortcake", jp: "イチゴのショートケーキ" },
        desc: { en: "Legendary for having the best, most consistent strawberry shortcake in the city.", jp: "ソウルで一番美味しいイチゴケーキといえばここ。長年愛される名店。" },
        img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Taegeukdang", jp: "太極堂" },
        neighborhood: { en: "Jangchung-dong", jp: "奨忠洞" },
        address: { en: "7 Dongho-ro 24-gil, Jung-gu, Seoul", jp: "ソウル特別市 中区 東湖路24街キル 7" },
        menu: { en: "Monaka Ice Cream", jp: "モナカアイスクリーム" },
        desc: { en: "Seoul's oldest bakery (est. 1946). Famous for traditional snacks and retro vibes.", jp: "1946年創業のソウル最古のパン屋。レトロな雰囲気とモナカアイスが名物。" },
        img: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Napoleon Bakery", jp: "ナポレオン菓子店" },
        neighborhood: { en: "Seongbuk-gu", jp: "城北区" },
        address: { en: "7 Seongbuk-ro, Seongbuk-gu, Seoul", jp: "ソウル特別市 城北区 城北路 7" },
        menu: { en: "Traditional Cream Bread", jp: "伝統クリームパン" },
        desc: { en: "A historic high-end bakery known for sophisticated, classic Korean pastries.", jp: "歴史ある高級ベーカリー。洗練されたクラシックな韓国のパンが楽しめる。" },
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Hyoja Bakery", jp: "孝子ベーカリー" },
        neighborhood: { en: "Seochon", jp: "西村" },
        address: { en: "54 Pirundae-ro, Jongno-gu, Seoul", jp: "ソウル特別市 鐘路区 弼雲台路 54" },
        menu: { en: "Corn Bread", jp: "コーンパン" },
        desc: { en: "The former official bakery for the Presidential residence. A local legend.", jp: "かつて大統領府にパンを納めていた歴史を持つ、地元で愛される名店。" },
        img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Old Ferry Donut", jp: "オールドフェリードーナツ" },
        neighborhood: { en: "Hannam / Sinsa", jp: "漢南 / 新沙" },
        address: { en: "66-1 Hannam-daero 27-gil, Yongsan-gu, Seoul", jp: "ソウル特別市 龍山区 漢南大路27街キル 66-1" },
        menu: { en: "Creme Brulee Donut", jp: "クレームブリュレドーナツ" },
        desc: { en: "Premium donuts with rich fillings and artistic designs. A leader in the donut trend.", jp: "濃厚なフィリングと芸術的なデザイン。ドーナツブームを牽引する人気店。" },
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Press Bakery", jp: "プレスベーカリー" },
        neighborhood: { en: "Mapo", jp: "麻浦" },
        address: { en: "36 Baekbeom-ro, Mapo-gu, Seoul", jp: "ソウル特別市 麻浦区 白凡路 36" },
        menu: { en: "Flaky Laminated Pastries", jp: "デニッシュ・ペストリー" },
        desc: { en: "A premium production lab where you can see the artisan baking process.", jp: "職人の焼き上げプロセスを間近で見ることができる、プレミアムなベーカリー。" },
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: { en: "Myeongdong Yanggwa", jp: "明洞洋菓" },
        neighborhood: { en: "Myeongdong", jp: "明洞" },
        address: { en: "14 Myeongdong 10-gil, Jung-gu, Seoul", jp: "ソウル特別市 中区 明洞10キル 14" },
        menu: { en: "Retro Fresh Cream Cake", jp: "レトロ生クリームケーキ" },
        desc: { en: "A nostalgia-themed bakery in the heart of Myeongdong, inspired by the 1980s.", jp: "80年代の雰囲気を再現した、明洞の中心にあるレトロなベーカリー。" },
        img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400"
    }
];

let currentLang = 'en';

function renderBakeries() {
    const grid = document.getElementById('bakery-grid');
    grid.innerHTML = '';

    bakeries.forEach((bakery, index) => {
        const card = document.createElement('article');
        card.className = 'bakery-card';
        
        card.innerHTML = `
            <div class="bakery-img-container">
                <img src="${bakery.img}" alt="${bakery.name[currentLang]}">
            </div>
            <div class="bakery-info">
                <span class="tag-neighborhood">${bakery.neighborhood[currentLang]}</span>
                <h2>${bakery.name[currentLang]}</h2>
                <div class="bakery-details">
                    <p>${bakery.desc[currentLang]}</p>
                    <span class="label">${currentLang === 'en' ? 'Main Menu' : '主なメニュー'}</span>
                    <span class="menu-item">✨ ${bakery.menu[currentLang]}</span>
                    <span class="label">${currentLang === 'en' ? 'Address' : '住所'}</span>
                    <p style="font-size: 0.8rem; color: #666;">${bakery.address[currentLang]}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Language Switcher
document.getElementById('btn-en').addEventListener('click', () => {
    currentLang = 'en';
    document.getElementById('btn-en').classList.add('active');
    document.getElementById('btn-jp').classList.remove('active');
    updateStaticText();
    renderBakeries();
});

document.getElementById('btn-jp').addEventListener('click', () => {
    currentLang = 'jp';
    document.getElementById('btn-jp').classList.add('active');
    document.getElementById('btn-en').classList.remove('active');
    updateStaticText();
    renderBakeries();
});

function updateStaticText() {
    const title = document.querySelector('header h1');
    const subtitle = document.querySelector('.subtitle');
    
    if (currentLang === 'en') {
        title.textContent = 'Seoul Hot Bakery Guide';
        subtitle.textContent = '20 Trendiest Spots to Visit in 2026!';
    } else {
        title.textContent = 'ソウル人気ベーカリーガイド';
        subtitle.textContent = '2026年、今最もホットな20の名店！';
    }
}

// Initial Render
window.onload = () => {
    renderBakeries();
};
