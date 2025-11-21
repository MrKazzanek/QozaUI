(function() {
    // 1. KONFIGURACJA WYGLĄDU (Baza danych stylów)
    // Teraz obsługujemy obiekt 'css' (zwykły wygląd) i 'hover' (po najechaniu)
    const theme = {
        // Komponent: Przycisk
        'btn': {
            // Style bazowe (wspólne dla każdego przycisku)
            base: {
                css: {
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.1s, background-color 0.2s',
                    fontFamily: 'Arial, sans-serif',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                active: { transform: 'scale(0.95)' } // Efekt kliknięcia
            },
            // Warianty kolorystyczne
            variants: {
                'primary': {
                    css:   { backgroundColor: '#3b82f6', color: '#ffffff' },
                    hover: { backgroundColor: '#2563eb' } // Ciemniejszy niebieski
                },
                'danger': {
                    css:   { backgroundColor: '#ef4444', color: '#ffffff' },
                    hover: { backgroundColor: '#dc2626' } // Ciemniejszy czerwony
                },
                'ghost': {
                    css:   { backgroundColor: 'transparent', color: '#333', border: '1px solid #ccc' },
                    hover: { backgroundColor: '#f3f4f6', color: '#000' },
                    disabled: { backgroundColor: 'black'}
                }
            },
            // Rozmiary
            sizes: {
                '1': { css: { fontSize: '12px', padding: '6px 12px' } },
                '2': { css: { fontSize: '16px', padding: '10px 20px' } },
                '3': { css: { fontSize: '20px', padding: '16px 32px', textTransform: 'uppercase' } }
            }
        },
        // Komponent: Alert (Box)
        'alert': {
            base: {
                css: { padding: '15px', borderRadius: '8px', borderLeft: '5px solid #333', marginBottom: '10px' }
            },
            variants: {
                'info': { css: { backgroundColor: '#e0f2fe', borderColor: '#0ea5e9', color: '#0c4a6e' } },
                'warn': { css: { backgroundColor: '#fef3c7', borderColor: '#d97706', color: '#78350f' } }
            }
        }
    };

    // Zbiór już wygenerowanych klas, żeby nie duplikować kodu CSS
    const generatedClasses = new Set();

    // Utworzenie elementu <style> w head
    const styleTag = document.createElement('style');
    styleTag.id = 'q-dynamic-styles';
    document.head.appendChild(styleTag);

    // Funkcja pomocnicza: konwersja obiektu JS na string CSS
    // np. { backgroundColor: 'red' } -> "background-color: red;"
    function objToCss(obj) {
        if (!obj) return '';
        return Object.entries(obj).map(([key, value]) => {
            // Zamiana camelCase na kebab-case (backgroundColor -> background-color)
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssKey}: ${value};`;
        }).join(' ');
    }

    // 2. GENERATOR CSS
    function generateCSS(className) {
        // Jeśli już wygenerowaliśmy styl dla tej klasy, pomiń
        if (generatedClasses.has(className)) return;
        
        // Oczyszczanie nazwy: "Q&btn-primary-1" -> ["btn", "primary", "1"]
        const rawName = className.substring(2); // usuń "Q&"
        const parts = rawName.split('-');
        
        const compName = parts[0];
        const variantName = parts[1];
        const sizeName = parts[2];

        const compConfig = theme[compName];
        if (!compConfig) return;

        // Zbieranie reguł
        let rules = {
            normal: {},
            hover: {},
            active: {},
            disabled: {}
        };

        // A. Pobierz Base
        if (compConfig.base) {
            if (compConfig.base.css) Object.assign(rules.normal, compConfig.base.css);
            if (compConfig.base.hover) Object.assign(rules.hover, compConfig.base.hover);
            if (compConfig.base.active) Object.assign(rules.active, compConfig.base.active);
            if (compConfig.base.disabled) Object.assign(rules.disabled, compConfig.base.disabled);
        }

        // B. Pobierz Variant
        if (variantName && compConfig.variants && compConfig.variants[variantName]) {
            const v = compConfig.variants[variantName];
            if (v.css) Object.assign(rules.normal, v.css);
            if (v.hover) Object.assign(rules.hover, v.hover);
            if (v.active) Object.assign(rules.active, v.active);
            if (v.disabled) Object.assign(rules.disabled, v.disabled);
        }

        // C. Pobierz Size
        if (sizeName && compConfig.sizes && compConfig.sizes[sizeName]) {
            const s = compConfig.sizes[sizeName];
            if (s.css) Object.assign(rules.normal, s.css);
        }

        // D. Zbuduj String CSS
        // Musimy "eskejować" znaki specjalne w selektorze CSS (np. &)
        const selector = `.${className.replace(/&/g, '\\&')}`; 
        
        let cssString = `
            ${selector} { ${objToCss(rules.normal)} }
            ${selector}:hover { ${objToCss(rules.hover)} }
            ${selector}:active { ${objToCss(rules.active)} }
        `;

        // Wstrzyknij do <style>
        styleTag.innerHTML += cssString;
        
        // Zapamiętaj, że zrobione
        generatedClasses.add(className);
    }

    // 3. SKANER DOM
    function scanAndApply() {
        // Znajdź wszystkie elementy z klasą zawierającą "Q&"
        const elements = document.querySelectorAll('[class*="Q&"]');
        
        elements.forEach(el => {
            el.classList.forEach(cls => {
                if (cls.startsWith('Q&')) {
                    generateCSS(cls);
                }
            });
        });
    }

    // 4. OBSERWATOR (Dla dynamicznych elementów)
    const observer = new MutationObserver((mutations) => {
        let needsScan = false;
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0 || mutation.attributeName === 'class') {
                needsScan = true;
            }
        });
        if (needsScan) scanAndApply();
    });

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            scanAndApply();
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        });
    } else {
        scanAndApply();
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

})();
