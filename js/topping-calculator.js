// Bilingual texts
const texts = {
    en: {
        title: "Barrel Topping Calculator",
        so2Link: "SO₂ Calculator",
        gallonsLabel: "Gallons used:",
        barrelsLabel: "Barrel batches (comma-separated):",
        calculateBtn: "Calculate",
        totalBarrelsText: "Total barrels:",
        perBarrelText: "Gallons per barrel (unrounded):",
        distributionTitle: "Distribution per batch:",
        subtractionTitle: "Subtraction Steps:",
        toggleLanguage: "Español",
        remaining: "remaining",
        initialTotal: "Initial total:",
        errorInvalidData: "Please enter valid data!",
        batchText: "Batch",
        barrelsText: "barrels"
    },
    es: {
        title: "Calculadora de Topping para Barriles",
        so2Link: "Calculadora de SO₂",
        gallonsLabel: "Galones usados:",
        barrelsLabel: "Lotes de barriles (separados por comas):",
        calculateBtn: "Calcular",
        totalBarrelsText: "Total de barriles:",
        perBarrelText: "Galones por barril (sin redondear):",
        distributionTitle: "Distribución por lote:",
        subtractionTitle: "Pasos de resta:",
        toggleLanguage: "English",
        remaining: "restantes",
        initialTotal: "Total inicial:",
        errorInvalidData: "¡Ingrese datos válidos!",
        batchText: "Lote",
        barrelsText: "barriles"
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
    document.getElementById('so2Link').textContent = texts[currentLanguage].so2Link;
    document.getElementById('gallonsLabel').textContent = texts[currentLanguage].gallonsLabel;
    document.getElementById('barrelsLabel').textContent = texts[currentLanguage].barrelsLabel;
    document.getElementById('calculateBtn').textContent = texts[currentLanguage].calculateBtn;
    document.getElementById('languageText').textContent = texts[currentLanguage].toggleLanguage;

    // Update results if they're visible
    const resultDiv = document.getElementById('result');
    if (!resultDiv.classList.contains('hidden')) {
        document.getElementById('totalBarrelsText').textContent = texts[currentLanguage].totalBarrelsText;
        document.getElementById('perBarrelText').textContent = texts[currentLanguage].perBarrelText;
        document.getElementById('distributionTitle').textContent = texts[currentLanguage].distributionTitle;
        document.getElementById('subtractionTitle').textContent = texts[currentLanguage].subtractionTitle;
        
        // Re-run calculation to update batch texts
        calculate();
    }
}

function calculate() {
    const gallons = parseFloat(document.getElementById("gallons").value);
    const barrelBatchesInput = document.getElementById("barrelBatches").value;
    
    // Clean and parse barrel batches
    const barrelBatches = barrelBatchesInput.split(',')
        .map(item => parseInt(item.trim()))
        .filter(item => !isNaN(item));
    
    const totalBarrels = barrelBatches.reduce((a, b) => a + b, 0);

    if (!gallons || totalBarrels === 0 || isNaN(gallons)) {
        alert(texts[currentLanguage].errorInvalidData);
        return;
    }

    const gallonsPerBarrel = gallons / totalBarrels;
    document.getElementById("totalBarrels").textContent = totalBarrels;
    document.getElementById("perBarrel").textContent = gallonsPerBarrel.toFixed(4);

    let batchResultsHTML = '';
    let subtractionStepsHTML = '';
    let remainingGallons = gallons;
    let roundedGallons = [];
    let totalRounded = 0;

    // Calculate rounded values for each batch
    barrelBatches.forEach((batch, index) => {
        const batchGallons = batch * gallonsPerBarrel;
        const rounded = Math.round(batchGallons * 4) / 4; // Round to nearest 0.25
        roundedGallons.push(rounded);
        totalRounded += rounded;
    });

    // Adjust difference in last batch to make sum exact
    const difference = gallons - totalRounded;
    if (difference !== 0 && roundedGallons.length > 0) {
        roundedGallons[roundedGallons.length - 1] += difference;
    }

    // Show results and subtraction steps
    subtractionStepsHTML += `<p>${texts[currentLanguage].initialTotal} ${remainingGallons.toFixed(2)}G</p>`;

    barrelBatches.forEach((batch, index) => {
        const rounded = roundedGallons[index];
        
        batchResultsHTML += `
            <div class="result-item">
                <strong>${texts[currentLanguage].batchText} ${index + 1} (${batch} ${texts[currentLanguage].barrelsText}):</strong> 
                ${rounded.toFixed(2)}G
            </div>
        `;

        subtractionStepsHTML += `
            <p>${remainingGallons.toFixed(2)}G - ${rounded.toFixed(2)}G (${texts[currentLanguage].batchText} ${index + 1}) = ${(remainingGallons - rounded).toFixed(2)}G ${texts[currentLanguage].remaining}</p>
        `;
        remainingGallons -= rounded;
    });

    document.getElementById("batchResults").innerHTML = batchResultsHTML;
    document.getElementById("subtractionSteps").innerHTML = subtractionStepsHTML;
    document.getElementById("result").classList.remove('hidden');
}
