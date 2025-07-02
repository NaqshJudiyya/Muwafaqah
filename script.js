
// قاموس حساب الجمل للحروف العربية
const GEMATRIA_VALUES = {
    'أ': 1, 'ا': 1, 'إ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8,
    'ط': 9, 'ي': 10, 'ى': 1, 'ة': 5, 'ئ': 10, 'ؤ': 6, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60,
    'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400,
    'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
};

// قائمة الأسماء مع القيم - 56 اسماً
const namesAndValues = [
    ["الله", 66], ["رحمن", 298], ["رحيم", 258], ["ملك", 90], ["قدوس", 170], ["سلام", 131], ["مؤمن", 136], ["مهيمن", 145], ["عزيز", 94], ["جبار", 206],
    ["متكبر", 662], ["خالق", 731], ["بارئ", 213], ["مصور", 336], ["غفار", 1281], ["قهار", 306], ["وهاب", 14], ["رزاق", 308], ["فتاح", 489], ["عليم", 150],
    ["قابض", 903], ["باسط", 72], ["خافض", 1481], ["رافع", 351], ["معز", 117], ["مذل", 770], ["سميع", 180], ["بصير", 302], ["حكم", 68], ["عدل", 104],
    ["لطيف", 129], ["خبير", 812], ["حليم", 88], ["عظيم", 1020], ["غفور", 1286], ["شكور", 526], ["علي", 110], ["كبير", 232], ["حفيظ", 998], ["مقيت", 550],
    ["حسيب", 80], ["جليل", 73], ["كريم", 270], ["رقيب", 312], ["مجيب", 55], ["واسع", 137], ["حكيم", 78], ["ودود", 20], ["مجيد", 57], ["باعث", 573],
    ["شهيد", 319], ["حق", 108], ["وكيل", 66], ["قوي", 116], ["متين", 500], ["ولي", 46], ["حميد", 62], ["محصي", 148], ["مبدئ", 56], ["معيد", 124],
    ["محيي", 68], ["مميت", 490], ["حي", 18], ["قيوم", 156], ["واجد", 14], ["ماجد", 48], ["واحد", 19], ["أحد", 13], ["فرد", 284], ["صمد", 134],
    ["قادر", 305], ["مقتدر", 744], ["مقدم", 184], ["مؤخر", 846], ["أول", 37], ["آخر", 800], ["ظاهر", 1106], ["باطن", 62], ["والي", 47], ["متعالي", 551],
    ["بر", 202], ["تواب", 409], ["منتقم", 630], ["عفو", 156], ["رءوف", 286], ["مالك الملك", 212], ["ذو الجلال والإكرام", 1100], ["مقسط", 209], ["جامع", 114], ["غني", 1060],
    ["مغني", 1100], ["مانع", 161], ["نافع", 201], ["ضار", 1001], ["نور", 256], ["هادي", 20], ["بديع", 86], ["باقي", 113], ["وارث", 707], ["رشيد", 514],["صبور", 298]
];

// حساب قيمة الجمل للنص المدخل
function calculateGematriaValue(text) {
    let total = 0;
    const breakdown = [];
    
    for (const char of text.trim()) {
        if (GEMATRIA_VALUES[char]) {
            const value = GEMATRIA_VALUES[char];
            total += value;
            breakdown.push([char, value]);
        }
    }
    
    return [total, breakdown];
}

// دالة لإنشاء تركيبات بأحجام مختلفة
function getCombinations(array, size) {
    if (size === 1) {
        return array.map(item => [item]);
    }
    
    const combinations = [];
    for (let i = 0; i < array.length - size + 1; i++) {
        const head = array[i];
        const tailCombinations = getCombinations(array.slice(i + 1), size - 1);
        for (const tail of tailCombinations) {
            combinations.push([head, ...tail]);
        }
    }
    return combinations;
}

// البحث عن تركيبات الأسماء التي مجموعها يساوي القيمة المطلوبة
function findCombinations(targetValue) {
    const found = [];
    
    // البحث في الأسماء الفردية (اسم واحد)
    for (const [name, value] of namesAndValues) {
        if (value === targetValue) {
            found.push([[name, value]]);
        }
    }
    
    // البحث في التركيبات من اسمين
    const twoCombinations = getCombinations(namesAndValues, 2);
    for (const combo of twoCombinations) {
        const sum = combo.reduce((total, [name, value]) => total + value, 0);
        if (sum === targetValue) {
            found.push(combo);
        }
    }
    
    // البحث في التركيبات من 3 أسماء
    const threeCombinations = getCombinations(namesAndValues, 3);
    for (const combo of threeCombinations) {
        const sum = combo.reduce((total, [name, value]) => total + value, 0);
        if (sum === targetValue) {
            found.push(combo);
        }
    }
    
    return found;
}

// عرض النتائج
function displayResults(combinations, target) {
    const resultsSection = document.getElementById('results-section');
    const searchInfo = document.getElementById('search-info');
    const combinationsList = document.getElementById('combinations-list');

    // فلترة التراكيب حسب الطول
    const oneNameCombos = combinations.filter(combo => combo.length === 1);
    const twoNameCombos = combinations.filter(combo => combo.length === 2);
    const threeNameCombos = combinations.filter(combo => combo.length === 3);

    // تحديد أي مجموعة سيتم عرضها
    let combosToShow = [];
    if (oneNameCombos.length > 0) {
        combosToShow = oneNameCombos;
    } else if (twoNameCombos.length > 0) {
        combosToShow = twoNameCombos;
    } else if (threeNameCombos.length > 0) {
        combosToShow = threeNameCombos;
    }

    // عدد النتائج الفعلية المعروضة (يتم حسابه بعد ما نحدد combosToShow)
    const count = combosToShow.length;

    // عرض عدد النتائج
    searchInfo.innerHTML = `
        <span class="count-badge">${count}</span>
        تم العثور على ${count} نتيجة مجموعها ${target}
    `;

    // ترتيب النتائج أبجديًا حسب الاسم الأول
    combosToShow.sort((a, b) => {
        const nameA = a[0][0];
        const nameB = b[0][0];
        return nameA.localeCompare(nameB, 'ar');
    });

    if (count > 0) {
        combinationsList.innerHTML = combosToShow.map(combo => {
            const comboHtml = combo.map((item, index) => {
                return `<span class="name-part">${item[0]}</span><span class="value-part">(${item[1]})</span>` +
                       (index < combo.length - 1 ? ' + ' : '');
            }).join('');

            return `
                <div class="combination">
                    <div class="combination-content">
                        ${comboHtml}
                        <span class="equals"> = ${target}</span>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        combinationsList.innerHTML = `
            <div class="no-results">
                😔 لم يتم العثور على أي نتائج للرقم ${target}
                <br><br>
                جرب رقماً آخر أو تأكد من صحة الرقم المدخل
            </div>
        `;
    }

    resultsSection.style.display = 'block';
}


// حساب الجمل والبحث التلقائي
function calculateGematria() {
    const text = document.getElementById('gematria_text').value.trim();
    const errorDiv = document.getElementById('error');
    const gematriaResult = document.getElementById('gematria-result');
    const gematriaBreakdown = document.getElementById('gematria-breakdown');
    
    // إخفاء رسائل الخطأ السابقة
    errorDiv.style.display = 'none';
    
    if (!text) {
        errorDiv.textContent = 'يرجى إدخال نص';
        errorDiv.style.display = 'block';
        return;
    }
    
    const [total, breakdown] = calculateGematriaValue(text);
    
    if (total === 0) {
        errorDiv.textContent = 'لا توجد أحرف عربية صالحة للحساب';
        errorDiv.style.display = 'block';
        return;
    }
    
    // عرض نتيجة حساب الجمل
    gematriaResult.innerHTML = `✨ قيمة الجمل للاسم "${text}" = ${total}`;
    gematriaResult.style.display = 'block';
    
    // عرض تفصيل الحساب
    if (breakdown.length > 0) {
        const breakdownHtml = breakdown.map(([char, value]) => 
            `<span class="breakdown-item">
                <span class="breakdown-char">${char}</span> = <span class="breakdown-value">${value}</span>
            </span>`
        ).join('');
        
        gematriaBreakdown.innerHTML = `
            <div class="breakdown-title">تفصيل الحساب:</div>
            ${breakdownHtml}
        `;
        gematriaBreakdown.style.display = 'block';
    }
    
    // وضع النتيجة في خانة البحث والبحث التلقائي
    document.getElementById('target').value = total;
    const combinations = findCombinations(total);
    displayResults(combinations, total);
}

// البحث في التركيبات
function searchCombinations() {
    const targetInput = document.getElementById('target').value;
    const errorDiv = document.getElementById('error');
    
    errorDiv.style.display = 'none';
    
    if (!targetInput) {
        errorDiv.textContent = 'يرجى إدخال رقم';
        errorDiv.style.display = 'block';
        return;
    }
    
    const target = parseInt(targetInput);
    if (isNaN(target) || target <= 0) {
        errorDiv.textContent = 'يرجى إدخال رقم صحيح';
        errorDiv.style.display = 'block';
        return;
    }
    
    const combinations = findCombinations(target);
    displayResults(combinations, target);
}

// عرض قائمة جميع الأسماء
function displayNamesList() {
    const namesGrid = document.getElementById('names-grid');
    
    namesGrid.innerHTML = namesAndValues.map(([name, value]) => `
        <div class="name-item">
            <div class="name-arabic">${name}</div>
            <div class="name-value">(${value})</div>
        </div>
    `).join('');
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayNamesList();
    
    // إضافة مستمعي الأحداث للضغط على Enter
    document.getElementById('gematria_text').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateGematria();
        }
    });
    
    document.getElementById('target').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCombinations();
        }
    });
});

// وظائف مساعدة إضافية
console.log(`تم تحميل التطبيق بنجاح - يحتوي على ${namesAndValues.length} اسماً من الأسماء الحسنى`);
