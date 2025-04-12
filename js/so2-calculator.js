// Bilingual texts
const texts = {
    en: {
        title: "SO₂ Calculator",
        toppingLink: "Topping Calculator",
        barrelTypeLabel: "Barrel Type:",
        barrelTypes: {
            59: "Standard Barrel (59 gal)",
            118: "Large Puncheon (118 gal)",
            132: "Puncheon (132 gal)"
        },
        ppmLabel: "Target PPM of SO₂:",
        so2PercentLabel: "SO₂ Solution Percentage:",
        calculateBtn: "Calculate",
        so2AmountText: "SO₂ to add:",
        calculationText: "Per barrel calculation:",
        toggleLanguage: "Español",
        errorInvalidData: "Please enter valid values for all fields!",
        perBarrelText: "per barrel",
        calculationFormula: "Calculation:"
    },
    es: {
        title: "Calculadora de SO₂",
        toppingLink: "Calculadora de Topping",
        barrelTypeLabel: "Tipo de barril:",
        barrelTypes: {
            59: "Barrica Estándar (59 gal)",
            118: "Puncheon Grande (118 gal)",
            132: "Puncheon (132 gal)"
        },
        ppmLabel: "Objetivo de PPM de SO₂:",
        so2PercentLabel: "Porcentaje de solución de SO₂:",
        calculateBtn: "Calcular",
        so2AmountText: "SO₂ a agregar:",
        calculationText: "Cálculo por barril:",
        toggleLanguage: "English",
        errorInvalidData: "¡Ingrese valores válidos para todos los campos!",
        perBarrelText: "por barril",
        calculationFormula: "Fórmula:"
    }
};

let currentLanguage = 'en';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up language toggle
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
    
    // Set up calculate button
    document.getElementById('calculateBtn').addEventListener('click', calculate);
    
    // Update language on initial load
    updateLanguage();
});

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
}

function updateLanguage() {
    // Update navigation and form elements
    document.getElementById('appTitle').textContent = texts[currentLanguage].title;
    document.getElementById('toppingLink').textContent = texts[currentLanguage].toppingLink;
    document.getElementById('barrelTypeLabel').textContent = texts[currentLanguage].barrelTypeLabel;
    document.getElementById('ppmLabel').textContent = texts[currentLanguage].ppmLabel;
    document.getElementById('so2PercentLabel').textContent = texts[currentLanguage].so2PercentLabel;
    document.getElementById('calculateBtn').textContent = texts[currentLanguage].calculateBtn;
    document.getElementById('languageText').textContent = texts[currentLanguage].toggleLanguage;

    // Update barrel type options
    const barrelTypeSelect = document.getElementById('barrelType');
    barrelTypeSelect.innerHTML = '';
    for (const [value, text] of Object.entries(texts[currentLanguage].barrelTypes)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        barrelTypeSelect.appendChild(option);
    }

    // Update results if they're visible
    const resultDiv = document.getElementById('result');
    if (!resultDiv.classList.contains('hidden')) {
        document.getElementById('so2AmountText').textContent = texts[currentLanguage].so2AmountText;
        document.getElementById('calculationText').textContent = texts[currentLanguage].calculationText;
        
        // Re-run calculation to update details
        calculate();
    }
}

function calculate() {
    const barrelType = parseFloat(document.getElementById('barrelType').value);
    const ppm = parseFloat(document.getElementById('ppm').value);
    const so2Percent = parseFloat(document.getElementById('so2Percent').value);

    if (!barrelType || !ppm || isNaN(ppm) || isNaN(so2Percent)) {
        alert(texts[currentLanguage].errorInvalidData);
        return;
    }

    // Calculate SO₂ (gallons * ppm * 0.3785 / (SO₂ percentage))
    const so2Ml = Math.round((barrelType * ppm * 0.3785) / so2Percent);
    
    document.getElementById('so2Amount').textContent = so2Ml;
    
    document.getElementById('calculationDetails').innerHTML = `
        <div>${texts[currentLanguage].calculationFormula}</div>
        <div>${barrelType} gal × ${ppm} ppm × 0.3785 ÷ ${so2Percent}% = ${so2Ml} mL</div>
        <div>${so2Ml} mL ${texts[currentLanguage].perBarrelText}</div>
    `;
    
    document.getElementById('result').classList.remove('hidden');
}
