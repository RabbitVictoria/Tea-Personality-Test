/**
 * ============================================
 * 茶色人格測試 - Tea-Color Personality Test
 * JavaScript 邏輯
 * ============================================
 */

// ============================================
// 全域變數
// ============================================
let currentLanguage = 'zh'; // 當前語言
let currentQuestion = 0;    // 當前題目索引
let answers = [];           // 用戶答案陣列
let totalScore = 0;         // 總分

// ============================================
// 題目資料（繁體中文 + 英文）
// ============================================
const questions = [
    {
        zh: {
            question: "週末空閒時，你的理想狀態是？",
            options: [
                "A. 出門走走：逛街、探店、吃美食，熱愛人間煙火",
                "B. 慢生活：曬太陽、插花、拍照記錄生活小美好",
                "C. 與自己相處：整理房間、規劃生活、獨處充電",
                "D. 隨心出發 / 隨心創作，不按計劃，驚喜至上"
            ]
        },
        en: {
            question: "On a free weekend, what's your ideal state?",
            options: [
                "A. Go out: shopping, exploring cafes, enjoying good food—loving the hustle and bustle",
                "B. Slow living: basking in the sun, arranging flowers, capturing life's little beauties",
                "C. Time with yourself: organizing your space, planning life, recharging in solitude",
                "D. Go with the flow / create freely, no plans, surprises first"
            ]
        },
        scores: { A: 3, B: 1, C: 2, D: 4 }
    },
    {
        zh: {
            question: "面對重複單調的日常，你習慣如何「添色」？",
            options: [
                "A. 大膽嘗試新搭配、新玩法，把普通變特別",
                "B. 用美食 / 快樂小事打破無聊，給自己一點即時獎勵",
                "C. 保持清醒節奏，學會取捨，只留讓自己舒服的事物",
                "D. 用小儀式感（香薰、杯墊、好看的杯子）提升幸福感"
            ]
        },
        en: {
            question: "Facing repetitive, monotonous routines, how do you 'add color'?",
            options: [
                "A. Boldly try new combinations and ways to play, making ordinary special",
                "B. Break boredom with good food / little joys, giving yourself instant rewards",
                "C. Keep a clear rhythm, learn to choose, only keeping what makes you comfortable",
                "D. Use small rituals (aromatherapy, coasters, pretty cups) to boost happiness"
            ]
        },
        scores: { A: 3, B: 4, C: 1, D: 2 }
    },
    {
        zh: {
            question: "原本計畫好的小事臨時泡湯，你更接近哪種反應？",
            options: [
                "A. 冷靜接受變化，重新安排更穩妥、適合自己的事",
                "B. 乾脆腦洞大開，臨時搞點新奇有趣的組合，把意外變成小驚喜",
                "C. 有點小失落，會換一件溫柔安靜的小事做，找回舒服的狀態",
                "D. 覺得剛好換個玩法，選件輕鬆開心的事，立刻換好心情"
            ]
        },
        en: {
            question: "A planned activity falls through last minute. What's your reaction?",
            options: [
                "A. Calmly accept the change, rearrange something more suitable and secure",
                "B. Get creative on the spot, try something novel and fun, turn the unexpected into a surprise",
                "C. Feel a bit disappointed, switch to something gentle and quiet to find comfort",
                "D. See it as a chance to do something different, pick something easy and fun, change your mood instantly"
            ]
        },
        scores: { A: 3, B: 4, C: 1, D: 2 }
    },
    {
        zh: {
            question: "被安排和不熟悉的人一起合作任務，你的反應是？",
            options: [
                "A. 主動找話題拉近關係，聊美食、聊興趣，快速和對方熟絡起來，合作更愉快",
                "B. 先和對方明確分工和時間節點，制定清晰的合作計畫，高效完成任務",
                "C. 提議用新鮮的方式合作（比如用趣味表格記錄進度、線上語音連麥討論），讓合作不枯燥",
                "D. 主動溫和地打招呼，慢慢瞭解對方的性格，配合對方的節奏推進工作"
            ]
        },
        en: {
            question: "Assigned to work with someone unfamiliar. What's your reaction?",
            options: [
                "A. Actively find topics to connect—chat about food, interests, quickly get acquainted for better collaboration",
                "B. First clarify roles and timelines, create a clear collaboration plan to complete tasks efficiently",
                "C. Suggest fresh ways to collaborate (fun progress charts, voice calls) to keep it interesting",
                "D. Greet warmly, gradually understand their personality, match their pace to move forward"
            ]
        },
        scores: { A: 4, B: 1, C: 2, D: 3 }
    },
    {
        zh: {
            question: "朋友向你傾訴煩心事，你更傾向於哪種安慰方式？",
            options: [
                "A. 溫柔傾聽，輕輕拍對方肩膀，用細膩的語言共情，陪對方慢慢平復",
                "B. 先逗對方笑，講搞笑的段子或自己的糗事，再陪對方吐槽，轉移壞情緒",
                "C. 先幫對方梳理問題的前因後果，給出實際的解決辦法，不做無用的安慰",
                "D. 突發奇想帶對方做一件新鮮事（比如去抓娃娃 / 逛夜市），用新鮮感沖淡不開心"
            ]
        },
        en: {
            question: "A friend shares their troubles. How do you comfort them?",
            options: [
                "A. Listen gently, pat their shoulder, empathize with delicate words, accompany them to calm down slowly",
                "B. First make them laugh with funny stories or your own embarrassing moments, then vent together",
                "C. Help them analyze the problem's causes and effects, give practical solutions, no useless comfort",
                "D. Spontaneously take them to do something new (claw machines, night markets), use novelty to dispel sadness"
            ]
        },
        scores: { A: 2, B: 1, C: 4, D: 3 }
    },
    {
        zh: {
            question: "睡前有半小時空閒，你會怎麼度過？",
            options: [
                "A. 複盤當天的事情，梳理第二天的待辦清單，做好規劃再睡覺，心裏更踏實",
                "B. 玩一會趣味小遊戲或刷小視頻，輕鬆解壓",
                "C. 靠在床頭看幾頁書，或聽舒緩的白噪音，慢慢放鬆，進入睡眠狀態",
                "D. 和家人 / 朋友聊聊天，分享當天的趣事，帶著好心情入睡"
            ]
        },
        en: {
            question: "You have 30 minutes before bed. How do you spend it?",
            options: [
                "A. Review the day, organize tomorrow's to-do list, plan before sleeping for peace of mind",
                "B. Play fun mini-games or watch short videos, relax and de-stress",
                "C. Read a few pages in bed or listen to soothing white noise, gradually relax into sleep",
                "D. Chat with family/friends, share interesting moments from the day, sleep with a good mood"
            ]
        },
        scores: { A: 3, B: 4, C: 1, D: 2 }
    },
    {
        zh: {
            question: "以下哪幾個詞更符合你的生活態度？",
            options: [
                "A. 奇幻、跳脫、不被定義",
                "B. 溫柔、治癒、有內在情緒",
                "C. 熱情、明亮、元氣滿滿",
                "D. 清醒、乾淨、獨立自在"
            ]
        },
        en: {
            question: "Which words best match your life attitude?",
            options: [
                "A. Whimsical, unconventional, undefined",
                "B. Gentle, healing, emotionally deep",
                "C. Passionate, bright, full of energy",
                "D. Clear-minded, clean, independently free"
            ]
        },
        scores: { A: 3, B: 4, C: 2, D: 1 }
    }
];

// ============================================
// 結果資料
// ============================================
const results = {
    titirou: {
        name: { zh: "提提柔", en: "Titirou" },
        drink: { zh: "（輕芝多肉葡萄）", en: "(Light Cheese Grape)" },
        color: "#B4505C",
        image: "images/grape.png",
        tagline: { 
            zh: "溫柔細膩的觀察者，用靜謐治癒疲憊的心靈", 
            en: "A gentle, delicate observer who heals weary souls with tranquility" 
        },
        description: {
            zh: "你是身邊人的「溫柔港灣」，喜歡慢節奏的生活，注重生活的質感和儀式感。對美好事物有敏銳的感知力，性格溫和，待人真誠。你總能在喧囂中找到一片寧靜，用細膩的心思溫暖身邊的每一個人。",
            en: "You are the 'gentle harbor' for those around you. You enjoy a slow-paced life, valuing quality and ritual. With keen perception of beautiful things, your warm and sincere nature brings comfort. You always find tranquility amidst chaos, warming everyone with your delicate care."
        }
    },
    youyouan: {
        name: { zh: "柚柚安", en: "Youyou'an" },
        drink: { zh: "（滿杯紅柚）", en: "(Full Cup Grapefruit)" },
        color: "#E47B65",
        image: "images/grapefruit.png",
        tagline: { 
            zh: "冷靜通透的治癒者，在迷茫時給人方向", 
            en: "A calm, clear-minded healer who gives direction when lost" 
        },
        description: {
            zh: "你理性冷靜，獨立有主見，有清晰的自我認知和目標。做事有條理、有規劃，不隨波逐流，敢於表達自己的想法。骨子裡帶著一股清醒的韌勁，是朋友在迷茫時最信賴的指路明燈。",
            en: "You are rational and calm, independent with clear self-awareness and goals. Organized and planned, you don't follow the crowd and dare to express your thoughts. With a clear-minded resilience, you are the trusted guiding light for friends when they're lost."
        }
    },
    mangmangqing: {
        name: { zh: "芒芒晴", en: "Mangmangqing" },
        drink: { zh: "（輕芝芒芒）", en: "(Light Cheese Mango)" },
        color: "#E5AB20",
        image: "images/mango-plain.png",
        tagline: { 
            zh: "熱情外向的哥哥，是傳遞快樂的小太陽", 
            en: "An outgoing, passionate sunshine who spreads joy like a little sun" 
        },
        description: {
            zh: "你陽光開朗，活力滿滿，天生的樂天派。善於發現生活中的小美好，性格外向，熱愛熱鬧，能給身邊人帶來滿滿的正能量。無論在哪裡，你都是團隊中最閃亮的那顆星，讓每個人都感受到溫暖和快樂。",
            en: "You are sunny and cheerful, full of vitality—a natural optimist. Good at discovering life's little joys, your outgoing personality and love for liveliness bring positive energy to everyone around you. Wherever you are, you're the brightest star, making everyone feel warm and happy."
        }
    },
    mangmanglan: {
        name: { zh: "芒芒藍", en: "Mangmanglan" },
        drink: { zh: "（椰藍芒芒）", en: "(Coconut Blue Mango)" },
        color: "#77B0DA",
        image: "images/mango-blue.png",
        tagline: { 
            zh: "古靈精怪的弟弟，擅長突發奇想、打破常規", 
            en: "A quirky, whimsical spirit who breaks conventions with creative ideas" 
        },
        description: {
            zh: "你古靈精怪，腦洞大開，喜歡新鮮有趣的事物，拒絕一成不變的生活。思維活躍，創意十足，總能用獨特的視角看待世界。你自帶有趣的靈魂，讓平凡的日子充滿驚喜和歡樂，是朋友圈裡的創意擔當。",
            en: "You are quirky and imaginative, loving fresh and interesting things, rejecting a monotonous life. With an active mind full of creativity, you always see the world from unique perspectives. Your interesting soul fills ordinary days with surprises and joy—you're the creative soul of your friend circle."
        }
    }
};

// ============================================
// 雷達圖維度映射規則
// ============================================
/**
 * 四維度映射規則說明：
 * 
 * 治癒感 (Healing): 來自選項 B 的分數總和
 * - B選項代表溫柔、慢節奏、儀式感、共情、安靜等特質
 * 
 * 活力感 (Vitality): 來自選項 C 的分數總和
 * - C選項代表熱情、外向、社交、元氣、開朗等特質
 * 
 * 理性感 (Rationality): 來自選項 D 的分數總和
 * - D選項代表清醒、規劃、獨立、邏輯、冷靜等特質
 * 
 * 靈動感 (Agility): 來自選項 A 的分數總和
 * - A選項代表創意、跳脫、新奇、靈活、驚喜等特質
 */
const dimensionMapping = {
    healing: 'B',    // 治癒感 ← B選項
    vitality: 'C',   // 活力感 ← C選項
    rationality: 'D', // 理性感 ← D選項
    agility: 'A'     // 靈動感 ← A選項
};

// ============================================
// 語言選擇
// ============================================
function selectLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('language-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    updatePageLanguage();
}

// ============================================
// 更新頁面語言
// ============================================
function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLanguage}`);
    });
}

// ============================================
// 開始測試
// ============================================
function startQuiz() {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(null);
    totalScore = 0;
    
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');
    
    renderQuestion();
    updateProgress();
}

// ============================================
// 渲染題目
// ============================================
function renderQuestion() {
    const questionData = questions[currentQuestion];
    const langData = questionData[currentLanguage];
    
    // 設置題目文字
    document.getElementById('question-text').textContent = langData.question;
    
    // 渲染選項
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    langData.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        // 如果已選擇，添加選中樣式
        if (answers[currentQuestion] === index) {
            btn.classList.add('selected');
        }
        
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
    
    // 更新導航按鈕狀態
    updateNavButtons();
}

// ============================================
// 選擇選項
// ============================================
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    // 更新選項樣式
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
        btn.classList.toggle('selected', index === optionIndex);
    });
    
    // 延遲後自動進入下一題（提供視覺反饋時間）
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            // 最後一題，顯示結果
            showResult();
        }
    }, 300);
}

// ============================================
// 更新進度條
// ============================================
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    const progressText = currentLanguage === 'zh' 
        ? `第 ${currentQuestion + 1} / ${questions.length} 題`
        : `Question ${currentQuestion + 1} / ${questions.length}`;
    document.getElementById('progress-text').textContent = progressText;
}

// ============================================
// 更新導航按鈕
// ============================================
function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    
    const isLastQuestion = currentQuestion === questions.length - 1;
    nextBtn.textContent = isLastQuestion 
        ? (currentLanguage === 'zh' ? '查看結果 →' : 'See Result →')
        : (currentLanguage === 'zh' ? '下一題 →' : 'Next →');
    nextBtn.disabled = answers[currentQuestion] === null;
    nextBtn.style.opacity = answers[currentQuestion] === null ? '0.5' : '1';
}

// ============================================
// 上一題
// ============================================
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        updateProgress();
    }
}

// ============================================
// 下一題
// ============================================
function nextQuestion() {
    if (answers[currentQuestion] === null) return;
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        showResult();
    }
}

// ============================================
// 計算分數
// ============================================
function calculateScore() {
    totalScore = 0;
    const optionKeys = ['A', 'B', 'C', 'D'];
    
    answers.forEach((answerIndex, questionIndex) => {
        const optionKey = optionKeys[answerIndex];
        const score = questions[questionIndex].scores[optionKey];
        totalScore += score;
    });
    
    return totalScore;
}

// ============================================
// 計算雷達圖四維度分數
// ============================================
function calculateDimensions() {
    const dimensions = {
        healing: 0,      // 治癒感 (B)
        vitality: 0,     // 活力感 (C)
        rationality: 0,  // 理性感 (D)
        agility: 0       // 靈動感 (A)
    };
    
    const optionKeys = ['A', 'B', 'C', 'D'];
    const dimensionMap = {
        'A': 'agility',
        'B': 'healing',
        'C': 'vitality',
        'D': 'rationality'
    };
    
    answers.forEach((answerIndex, questionIndex) => {
        const optionKey = optionKeys[answerIndex];
        const score = questions[questionIndex].scores[optionKey];
        const dimension = dimensionMap[optionKey];
        dimensions[dimension] += score;
    });
    
    return dimensions;
}

// ============================================
// 獲取結果類型
// ============================================
function getResultType(score) {
    if (score >= 7 && score <= 12) return 'titirou';
    if (score >= 13 && score <= 17) return 'youyouan';
    if (score >= 18 && score <= 22) return 'mangmangqing';
    if (score >= 23 && score <= 28) return 'mangmanglan';
    return 'titirou'; // 預設值
}

// ============================================
// 顯示結果
// ============================================
function showResult() {
    const score = calculateScore();
    const resultType = getResultType(score);
    const result = results[resultType];
    const dimensions = calculateDimensions();
    
    // 隱藏測試頁面，顯示結果頁面
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');
    
    // 填充結果內容
    document.getElementById('result-name').textContent = result.name[currentLanguage];
    document.getElementById('result-name').style.color = result.color;
    document.getElementById('result-drink').textContent = result.drink[currentLanguage];
    document.getElementById('result-drink').style.color = result.color;
    document.getElementById('result-image').src = result.image;
    document.getElementById('total-score').textContent = score;
    
    const taglineEl = document.getElementById('result-tagline');
    taglineEl.textContent = result.tagline[currentLanguage];
    taglineEl.style.background = result.color;
    
    document.getElementById('result-description').textContent = result.description[currentLanguage];
    
    // 繪製雷達圖
    setTimeout(() => {
        drawRadarChart(dimensions, result.color);
    }, 100);
}

// ============================================
// 繪製雷達圖（純 Canvas 實現）
// ============================================
function drawRadarChart(dimensions, mainColor) {
    const canvas = document.getElementById('radar-canvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;
    
    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 維度標籤（根據語言）
    const labels = currentLanguage === 'zh' 
        ? ['治癒感', '活力感', '理性感', '靈動感']
        : ['Healing', 'Vitality', 'Rationality', 'Agility'];
    
    // 維度值陣列（順序：上、右、下、左）
    const values = [
        dimensions.healing,
        dimensions.vitality,
        dimensions.rationality,
        dimensions.agility
    ];
    
    // 最大值（用於標準化）
    const maxValue = 16; // 每個維度最高可能16分
    
    // 繪製背景網格（4層）
    const levels = 4;
    ctx.strokeStyle = 'rgba(86, 45, 7, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i;
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
            const angle = (Math.PI / 2) * j - Math.PI / 2;
            const x = centerX + Math.cos(angle) * levelRadius;
            const y = centerY + Math.sin(angle) * levelRadius;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // 繪製軸線
    ctx.strokeStyle = 'rgba(86, 45, 7, 0.15)';
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    // 繪製數據區域
    ctx.beginPath();
    const normalizedValues = values.map(v => Math.min(v / maxValue, 1));
    
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i - Math.PI / 2;
        const valueRadius = normalizedValues[i] * radius;
        const x = centerX + Math.cos(angle) * valueRadius;
        const y = centerY + Math.sin(angle) * valueRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    // 填充漸層
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, mainColor + '40'); // 25% 透明度
    gradient.addColorStop(1, mainColor + '15'); // 10% 透明度
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // 繪製邊框
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 繪製數據點
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i - Math.PI / 2;
        const valueRadius = normalizedValues[i] * radius;
        const x = centerX + Math.cos(angle) * valueRadius;
        const y = centerY + Math.sin(angle) * valueRadius;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = mainColor;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // 繪製標籤
    ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#562D07';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const labelOffset = radius + 25;
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * labelOffset;
        const y = centerY + Math.sin(angle) * labelOffset;
        ctx.fillText(labels[i], x, y);
    }
}

// ============================================
// 重新測試
// ============================================
function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    totalScore = 0;
    
    document.getElementById('result-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
}

// ============================================
// 保存結果為圖片
// ============================================
function saveResult() {
    const resultCard = document.getElementById('result-card');
    
    // 使用 html2canvas 生成圖片
    html2canvas(resultCard, {
        backgroundColor: '#FFFBEB',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        // 創建下載連結
        const link = document.createElement('a');
        link.download = `tea-personality-result-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error('Failed to save image:', err);
        alert(currentLanguage === 'zh' 
            ? '保存失敗，請嘗試截圖保存' 
            : 'Save failed, please try screenshot');
    });
}

// ============================================
// 分享結果
// ============================================
function shareResult() {
    const modal = document.getElementById('share-modal');
    modal.classList.add('active');
    
    // 如果支持原生分享API，嘗試使用
    if (navigator.share) {
        const resultType = getResultType(totalScore);
        const result = results[resultType];
        
        navigator.share({
            title: currentLanguage === 'zh' 
                ? `我的茶色人格是${result.name.zh}！` 
                : `My Tea-Color Personality is ${result.name.en}!`,
            text: currentLanguage === 'zh' 
                ? `快來測測你的茶色人格吧！${result.tagline.zh}` 
                : `Take the test to find yours! ${result.tagline.en}`,
            url: window.location.href
        }).catch(() => {
            // 用戶取消分享，顯示彈窗
        });
    }
}

// ============================================
// 關閉彈窗
// ============================================
function closeModal() {
    const modal = document.getElementById('share-modal');
    modal.classList.remove('active');
}

// ============================================
// 點擊彈窗外部關閉
// ============================================
document.getElementById('share-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ============================================
// 頁面載入完成後的初始化
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 預設顯示語言選擇頁面
    document.getElementById('language-page').classList.add('active');
});
