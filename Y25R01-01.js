(function() {
    // ==========================================
    // 1. KONFIGURACJA (Twoja "Design System")
    // ==========================================
    const config = {
        // A. KOMPONENTY (np. przyciski, karty - zdefiniowane warianty i rozmiary)
        components: {
            'btn': {
                // Style bazowe (zawsze aplikowane)
                base: {
                    default: {
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'sans-serif',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        userSelect: 'none'
                    },
                    ':disabled': { // Obsługa disabled
                        opacity: '0.6',
                        cursor: 'not-allowed',
                        filter: 'grayscale(80%)'
                    },
                    ':active:not(:disabled)': {
                        transform: 'scale(0.98)'
                    }
                },
                // Warianty (np. kolory)
                variants: {
                    'primary': {
                        default: { backgroundColor: '#2563eb', color: 'white' },
                        ':hover:not(:disabled)': { backgroundColor: '#1d4ed8' }
                    },
                    'danger': {
                        default: { backgroundColor: '#dc2626', color: 'white' },
                        ':hover:not(:disabled)': { backgroundColor: '#b91c1c' }
                    },
                    'outline': {
                        default: { backgroundColor: 'transparent', border: '2px solid #ccc', color: '#333' },
                        ':hover:not(:disabled)': { borderColor: '#333', backgroundColor: '#f5f5f5' }
                    }
                },
                // Rozmiary
                sizes: {
                    '1': { default: { padding: '4px 8px', fontSize: '12px' } },
                    '2': { default: { padding: '8px 16px', fontSize: '16px' } }, // Domyślny, jeśli nie podano
                    '3': { default: { padding: '12px 24px', fontSize: '20px' } }
                }
            }
        },

        // B. UTILITIES (Dynamiczne wartości, np. kolory, marginesy)
        // Funkcja otrzymuje "wartość" (np. 'ff0000') i zwraca obiekt stylów
        utilities: {
            // Użycie: Q&clr-ff0000 (Hex bez hash)
            'clr': (val) => ({
                default: { color: `#${val}` }
            }),
            // Użycie: Q&bg-333333
            'bg': (val) => ({
                default: { backgroundColor: `#${val}` }
            }),
            // Użycie: Q&m-20 (margin: 20px)
            'm': (val) => ({
                default: { margin: `${val}px` }
            }),
            // Użycie: Q&w-100p (width: 100%) - mały hack na znaki specjalne
            'w': (val) => ({
                default: { width: val.replace('p', '%').replace('vh', 'vh') }
            })
        }
    };

    // ==========================================
    // 2. LOGIKA GENERATORA (Nie musisz tu grzebać)
    // ==========================================
    
    const generatedClasses = new Set();
    const styleTag = document.createElement('style');
    styleTag.id = 'q-style-system';
    document.head.appendChild(styleTag);

    function objToCss(obj) {
        return Object.entries(obj).map(([k, v]) => {
            const key = k.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${key}: ${v};`;
        }).join(' ');
    }

    function generateCSS(className) {
        if (generatedClasses.has(className)) return;

        const rawName = className.substring(2); // usuń "Q&"
        const firstDash = rawName.indexOf('-');
        
        let key, argsString;

        if (firstDash === -1) {
            key = rawName; // np. Q&btn (bez argumentów)
            argsString = '';
        } else {
            key = rawName.substring(0, firstDash); // np. btn
            argsString = rawName.substring(firstDash + 1); // np. danger-2
        }

        let rules = {}; // Struktura: { 'default': {}, ':hover': {} }

        // --- SCIEŻKA 1: KOMPONENTY ---
        if (config.components[key]) {
            const comp = config.components[key];
            const args = argsString ? argsString.split('-') : [];

            // 1. Aplikuj Base
            mergeStyles(rules, comp.base);

            // 2. Szukaj wariantów i rozmiarów w argumentach
            // Dzięki temu kolejność (danger-2 czy 2-danger) nie ma znaczenia,
            // a brakujące argumenty są ignorowane.
            args.forEach(arg => {
                if (comp.variants && comp.variants[arg]) {
                    mergeStyles(rules, comp.variants[arg]);
                }
                else if (comp.sizes && comp.sizes[arg]) {
                    mergeStyles(rules, comp.sizes[arg]);
                }
            });

            // Opcjonalnie: Domyślny rozmiar jeśli żaden nie został podany
            // (Możesz to usunąć jeśli nie chcesz defaultów)
            const hasSize = args.some(arg => comp.sizes && comp.sizes[arg]);
            if (!hasSize && comp.sizes && comp.sizes['2']) {
                mergeStyles(rules, comp.sizes['2']);
            }
        } 
        // --- SCIEŻKA 2: UTILITIES ---
        else if (config.utilities[key] && argsString) {
            // Przekazujemy resztę stringa jako wartość do funkcji
            const utilStyles = config.utilities[key](argsString);
            mergeStyles(rules, utilStyles);
        } 
        else {
            return; // Nieznana klasa
        }

        // Budowanie CSS stringa
        const safeClassName = className.replace(/&/g, '\\&'); // Escape znaku &
        let cssString = '';

        for (const [pseudo, styles] of Object.entries(rules)) {
            const selector = pseudo === 'default' 
                ? `.${safeClassName}` 
                : `.${safeClassName}${pseudo}`; // np. .klasa:hover
            
            cssString += `${selector} { ${objToCss(styles)} }\n`;
        }

        styleTag.innerHTML += cssString;
        generatedClasses.add(className);
    }

    // Funkcja pomocnicza do łączenia obiektów stylów (deep merge dla pseudo-klas)
    function mergeStyles(target, source) {
        for (const [state, styles] of Object.entries(source)) {
            if (!target[state]) target[state] = {};
            Object.assign(target[state], styles);
        }
    }

    // Skaner i Observer
    function scan() {
        document.querySelectorAll('*').forEach(el => {
            if(el.classList && el.classList.length > 0) {
                el.classList.forEach(cls => {
                    if (cls.startsWith('Q&')) generateCSS(cls);
                });
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            if (m.type === 'childList') {
                m.addedNodes.forEach(node => {
                    if(node.nodeType === 1) {
                        // Skan samego elementu
                        node.classList.forEach(cls => {
                            if(cls.startsWith('Q&')) generateCSS(cls);
                        });
                        // Skan dzieci
                        node.querySelectorAll('*').forEach(el => {
                           el.classList.forEach(cls => {
                               if(cls.startsWith('Q&')) generateCSS(cls);
                           });
                        });
                    }
                });
            } else if (m.type === 'attributes' && m.attributeName === 'class') {
                m.target.classList.forEach(cls => {
                    if (cls.startsWith('Q&')) generateCSS(cls);
                });
            }
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            scan();
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        });
    } else {
        scan();
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

})();
