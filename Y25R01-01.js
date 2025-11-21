// style-engine.js

(function() {
    // 1. DEFINICJA STYLÓW (Twoja "baza danych" wyglądu)
    // Możesz tu zdefiniować gotowe zestawy stylów
    const styleLibrary = {
        // Przykład dla Q&btn-...
        'btn': {
            base: {
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                fontFamily: 'Arial, sans-serif'
            },
            variants: {
                'primary': { backgroundColor: '#3b82f6', color: '#ffffff' },
                'danger':  { backgroundColor: '#ef4444', color: '#ffffff' },
                'success': { backgroundColor: '#22c55e', color: '#ffffff' },
                'cancel':  { backgroundColor: '#9ca3af', color: '#ffffff' }
            },
            sizes: {
                '1': { fontSize: '12px', padding: '5px 10px' }, // mały
                '2': { fontSize: '16px', padding: '10px 20px' }, // średni
                '3': { fontSize: '20px', padding: '15px 30px' }  // duży
            }
        },
        // Przykład dla Q&card-...
        'card': {
            base: {
                padding: '20px',
                backgroundColor: '#f3f4f6',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }
        }
    };

    // 2. FUNKCJA APLIKUJĄCA STYLE
    function applyStyles(element) {
        // Pobieramy wszystkie klasy elementu
        const classes = element.className.split(' ');

        classes.forEach(cls => {
            // Szukamy tylko klas zaczynających się od Twojego prefiksu "Q&"
            if (cls.startsWith('Q&')) {
                
                // Parsowanie: Q&btn-danger-2  -> ["btn", "danger", "2"]
                const rawName = cls.substring(2); // usuwa "Q&"
                const parts = rawName.split('-'); 

                const componentName = parts[0]; // np. "btn"
                const variantName = parts[1];   // np. "danger" (opcjonalne)
                const sizeName = parts[2];      // np. "2" (opcjonalne)

                const componentConfig = styleLibrary[componentName];

                if (componentConfig) {
                    // A. Nadaj style bazowe
                    if (componentConfig.base) {
                        Object.assign(element.style, componentConfig.base);
                    }

                    // B. Nadaj wariant (jeśli istnieje i został podany)
                    if (variantName && componentConfig.variants && componentConfig.variants[variantName]) {
                        Object.assign(element.style, componentConfig.variants[variantName]);
                    } else if (componentConfig.base) {
                         // Domyślny fallback jeśli wariant nie istnieje w definicji
                    }

                    // C. Nadaj rozmiar (jeśli istnieje)
                    if (sizeName && componentConfig.sizes && componentConfig.sizes[sizeName]) {
                        Object.assign(element.style, componentConfig.sizes[sizeName]);
                    }
                }
            }
        });
    }

    // 3. INICJALIZACJA I OBSERWATOR (Automatyzacja)
    
    function init() {
        // A. Przetwórz istniejące elementy
        const allElements = document.querySelectorAll('*[class*="Q&"]');
        allElements.forEach(el => applyStyles(el));

        // B. Uruchom Observer (nasłuchuje nowych elementów dodanych do DOM)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Tylko elementy HTML
                        // Sprawdź sam element
                        if (node.className && typeof node.className === 'string' && node.className.includes('Q&')) {
                            applyStyles(node);
                        }
                        // Sprawdź dzieci elementu (gdyby wklejono cały blok HTML)
                        const children = node.querySelectorAll('*[class*="Q&"]');
                        children.forEach(child => applyStyles(child));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Uruchom po załadowaniu DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
