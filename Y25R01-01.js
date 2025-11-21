(function() {
    // ============================================================
    // 1. KONFIGURACJA (Baza danych)
    // ============================================================
    const config = {
        // A. DEFINICJE KOMPONENTÓW (Szablony - btn, alert itp.)
        components: {
            'btn': {
                base: {
                    default: {
                        border: 'none', cursor: 'pointer', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'sans-serif', borderRadius: '4px',
                        transition: 'all 0.2s', userSelect: 'none', textDecoration: 'none'
                    },
                    ':disabled': { opacity: '0.6', cursor: 'not-allowed', filter: 'grayscale(1)' },
                    ':active:not(:disabled)': { transform: 'scale(0.97)' }
                },
                variants: {
                    'primary': { default: { backgroundColor: '#3b82f6', color: 'white' }, ':hover:not(:disabled)': { backgroundColor: '#2563eb' } },
                    'danger': { default: { backgroundColor: '#ef4444', color: 'white' }, ':hover:not(:disabled)': { backgroundColor: '#dc2626' } },
                    'success': { default: { backgroundColor: '#22c55e', color: 'white' }, ':hover:not(:disabled)': { backgroundColor: '#16a34a' } },
                    'dark': { default: { backgroundColor: '#1f2937', color: 'white' }, ':hover:not(:disabled)': { backgroundColor: '#111827' } }
                },
                sizes: {
                    '1': { default: { padding: '6px 12px', fontSize: '12px' } },
                    '2': { default: { padding: '10px 20px', fontSize: '14px' } },
                    '3': { default: { padding: '14px 28px', fontSize: '18px' } }
                }
            },
            'alert': {
                base: { default: { padding: '15px', borderRadius: '6px', borderLeft: '4px solid', marginBottom: '10px', fontFamily: 'sans-serif' } },
                variants: {
                    'info': { default: { backgroundColor: '#e0f2fe', borderColor: '#0284c7', color: '#0c4a6e' } },
                    'warn': { default: { backgroundColor: '#fef9c3', borderColor: '#ca8a04', color: '#713f12' } },
                    'error': { default: { backgroundColor: '#fee2e2', borderColor: '#dc2626', color: '#7f1d1d' } }
                }
            }
        },

        // B. ZMIENNE (Kolory, Jednostki, Fonty)
        vars: {
            colors: {
                'white': '#ffffff', 'black': '#000000', 'transparent': 'transparent',
                'red': '#ef4444', 'blue': '#3b82f6', 'green': '#22c55e', 'yellow': '#eab308', 
                'gray': '#9ca3af', 'dark': '#1f2937'
            },
            sides: { 'lft': 'Left', 'rgt': 'Right', 'up': 'Top', 'dwn': 'Bottom' },
            units: { 'px': 'px', 'p': '%', 'vh': 'vh', 'vw': 'vw', 'rem': 'rem', 'em': 'em' },
            fonts: { '1': '12px', '2': '14px', '3': '16px', '4': '20px', '5': '24px', '6': '32px' },
            fontFamilies: {
                'arial': 'Arial, Helvetica, sans-serif',
                'sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                'cursive': 'cursive'
            },
            shadows: {
                '1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                '2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                '3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                '4': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                '5': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'none': 'none'
            }
        }
    };

    // ============================================================
    // 2. LOGIKA UTILITIES (Parsery)
    // ============================================================
    
    const getUnit = (u) => config.vars.units[u] || u || 'px';
    const getSide = (s) => config.vars.sides[s] ? `-${config.vars.sides[s].toLowerCase()}` : '';
    
    // Parsuje kolor: set-ffffff lub red
    const parseColor = (parts, idx) => {
        if (parts[idx] === 'set') return { val: `#${parts[idx+1]}`, consumed: 2 };
        return { val: config.vars.colors[parts[idx]] || parts[idx], consumed: 1 };
    };

    // Helper dla Border i Outline (identyczna logika)
    const parseBorderLike = (parts, propertyPrefix) => {
        let i = 0;
        // Q&bd-1-px-solid-red-lft
        const val = parts[i++];
        const unit = getUnit(parts[i++]);
        const type = parts[i++]; // solid, dashed etc.
        const cObj = parseColor(parts, i);
        const col = cObj.val;
        i += cObj.consumed;
        const side = getSide(parts[i]); // opcjonalne
        
        // border-left: 1px solid red
        const prop = `${propertyPrefix}${side}`; 
        const value = `${val}${unit} ${type} ${col}`;
        return { [prop]: value };
    };

    const utilities = {
        // --- KOLORY ---
        'clr': (p) => ({ color: parseColor(p, 0).val }),
        'bg': (p) => ({ backgroundColor: parseColor(p, 0).val }),
        'op': (p) => ({ opacity: p[0] }),

        // --- ODSTĘPY ---
        'mg': (p) => parseSpacing('margin', p),
        'pd': (p) => parseSpacing('padding', p),

        // --- WYMIARY ---
        'w': (p) => ({ width: `${p[0]}${getUnit(p[1])}` }),
        'h': (p) => ({ height: `${p[0]}${getUnit(p[1])}` }),
        'mw': (p) => ({ maxWidth: `${p[0]}${getUnit(p[1])}` }),    // max-width
        'minw': (p) => ({ minWidth: `${p[0]}${getUnit(p[1])}` }), // min-width
        'mh': (p) => ({ maxHeight: `${p[0]}${getUnit(p[1])}` }),  // max-height
        'minh': (p) => ({ minHeight: `${p[0]}${getUnit(p[1])}` }), // min-height

        // --- BORDER & OUTLINE ---
        'bd': (p) => parseBorderLike(p, 'border'),
        'out': (p) => parseBorderLike(p, 'outline'), // Q&out
        'br': (p) => ({ borderRadius: `${p[0]}${getUnit(p[1])}` }),

        // --- FONT ---
        'fs': (p) => p[0]==='set' ? ({fontSize: `${p[1]}${getUnit(p[2])}`}) : ({fontSize: config.vars.fonts[p[0]]}),
        'fw': (p) => ({ fontWeight: p[0] }), // Q&fw-bold
        'sft': (p) => {
            // Q&sft-arial lub Q&sft-set-Times New Roman
            if(p[0] === 'set') {
                // Łączymy resztę argumentów w nazwę czcionki (ze spacjami)
                const fontName = p.slice(1).join(' ');
                return { fontFamily: fontName };
            }
            return { fontFamily: config.vars.fontFamilies[p[0]] || p[0] };
        },
        'ta': (p) => ({ textAlign: p[0] }), // center, left, right, justify
        'td': (p) => ({ textDecoration: p[0] }), // none, underline, line-through

        // --- DISPLAY & FLEX ---
        'd': (p) => ({ display: p[0] }), // block, flex, none, grid
        'fx': (p) => { // kierunki i zawijanie
            if(p[0] === 'row') return { flexDirection: 'row' };
            if(p[0] === 'col') return { flexDirection: 'column' };
            if(p[0] === 'wrap') return { flexWrap: 'wrap' };
            if(p[0] === 'nowrap') return { flexWrap: 'nowrap' };
            return { flex: p[0] }; // np. Q&fx-1 -> flex: 1
        },
        'ai': (p) => { // align-items
            const map = { 'start': 'flex-start', 'end': 'flex-end', 'center': 'center', 'base': 'baseline', 'stretch': 'stretch' };
            return { alignItems: map[p[0]] || p[0] };
        },
        'jc': (p) => { // justify-content
            const map = { 'start': 'flex-start', 'end': 'flex-end', 'center': 'center', 'sb': 'space-between', 'sa': 'space-around', 'se': 'space-evenly' };
            return { justifyContent: map[p[0]] || p[0] };
        },
        'gap': (p) => ({ gap: `${p[0]}${getUnit(p[1])}` }),
        
        // --- EFEKTY I INNE ---
        'sh': (p) => { // box-shadow: Q&sh-2 lub Q&sh-set-...
            if(p[0] === 'set') return { boxShadow: p.slice(1).join(' ') };
            return { boxShadow: config.vars.shadows[p[0]] || 'none' };
        },
        'cursor': (p) => ({ cursor: p[0] }),
        'z': (p) => ({ zIndex: p[0] }),
        'ov': (p) => ({ overflow: p[0] }) // hidden, auto, scroll
    };

    function parseSpacing(prop, p) {
        const v = p[0];
        let u = 'px', s = '';
        if(p.length > 1) {
            if(config.vars.units[p[1]] || p[1]==='p') { u=getUnit(p[1]); if(p[2]) s=p[2]; }
            else if(config.vars.sides[p[1]]) s=p[1];
        }
        return { [`${prop}${getSide(s)}`]: `${v}${u}` };
    }

    // ============================================================
    // 3. SILNIK GENERATORA (Core z obsługą Pseudo-stanów)
    // ============================================================
    const generated = new Set();
    const styleTag = document.createElement('style');
    styleTag.id = 'q-style-engine';
    document.head.appendChild(styleTag);

    function objToCss(obj, important = false) {
        return Object.entries(obj).map(([k, v]) => {
            // Konwersja camelCase na kebab-case (backgroundColor -> background-color)
            const key = k.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${key}: ${v}${important ? ' !important' : ''};`;
        }).join(' ');
    }

    function mergeDeep(target, source) {
        for(const key in source) {
            if(typeof source[key] === 'object') {
                if(!target[key]) target[key] = {};
                mergeDeep(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    function generate(className) {
        if(generated.has(className)) return;

        let rawName = "";
        let pseudoState = "default"; // Domyślny stan

        // 1. Sprawdzanie czy to zwykły Q&... czy --state-Q&...
        if (className.startsWith('Q&')) {
            rawName = className.substring(2);
        } 
        else if (className.startsWith('--')) {
            // Format: --hover-Q&...
            const splitIndex = className.indexOf('-Q&');
            if (splitIndex === -1) return; // Niepoprawny format
            
            const stateName = className.substring(2, splitIndex); // np. "hover"
            pseudoState = `:${stateName}`; // np. ":hover"
            rawName = className.substring(splitIndex + 3); // Reszta po "-Q&"
        } 
        else {
            return; // Nie jest to klasa silnika
        }

        // Parsowanie reszty: np. btn-primary-1 lub bg-red
        const parts = rawName.split('-');
        const key = parts[0];
        const args = parts.slice(1);

        let rules = {}; // { 'default': {...}, ':hover': {...} }
        let isUtility = false;

        // A. CZY TO KOMPONENT? (np. btn)
        if(config.components[key]) {
            const comp = config.components[key];
            
            // Dla komponentów ignorujemy pseudo-prefiks "--hover-", 
            // bo komponenty mają własną logikę stanów wewnątrz definicji JSON.
            // Aplikujemy tylko logikę standardową.
            
            // 1. Baza
            mergeDeep(rules, comp.base);
            // 2. Warianty i Rozmiary
            args.forEach(arg => {
                if(comp.variants && comp.variants[arg]) mergeDeep(rules, comp.variants[arg]);
                if(comp.sizes && comp.sizes[arg]) mergeDeep(rules, comp.sizes[arg]);
            });
            // Rozmiar domyślny
            if(comp.sizes && comp.sizes['2'] && !args.some(a => comp.sizes[a])) {
                mergeDeep(rules, comp.sizes['2']);
            }
        }
        // B. CZY TO UTILITY? (np. mg, clr, sft)
        else if(utilities[key]) {
            try {
                const styles = utilities[key](args);
                // Jeśli użyto prefiksu --hover-, zapisujemy style pod kluczem ':hover'
                // Jeśli nie (default), zapisujemy pod 'default'
                rules[pseudoState] = styles;
                isUtility = true;
            } catch(e) { console.warn("Q& Error:", e); }
        } 
        else return;

        // Budowanie CSS
        // Musimy "zabezpieczyć" nazwę klasy (escape znaków specjalnych jak &, --)
        const safeClass = className.replace(/&/g, '\\&').replace(/\./g, '\\.').replace(/:/g, '\\:');
        
        let cssStr = '';
        
        for(const [state, styles] of Object.entries(rules)) {
            // Budowa selektora: .klasa lub .klasa:hover
            const selector = state === 'default' 
                ? `.${safeClass}` 
                : `.${safeClass}${state}`; 
            
            // Utilities mają !important
            cssStr += `${selector} { ${objToCss(styles, isUtility)} }\n`;
        }

        styleTag.innerHTML += cssStr;
        generated.add(className);
    }

    // ============================================================
    // 4. INICJALIZACJA (Skaner DOM)
    // ============================================================
    function scan(root=document) {
        root.querySelectorAll('*').forEach(el => {
            if(el.classList && el.classList.length > 0) {
                el.classList.forEach(c => {
                    // Skanujemy klasy zaczynające się od Q& LUB --
                    if (c.startsWith('Q&') || c.startsWith('--')) {
                        generate(c);
                    }
                });
            }
        });
    }
    
    const observer = new MutationObserver(ms => ms.forEach(m => {
        if(m.type==='childList') {
            m.addedNodes.forEach(n => {
                if(n.nodeType===1) {
                    // Skan samego elementu
                    if(n.classList) n.classList.forEach(c => (c.startsWith('Q&')||c.startsWith('--')) && generate(c));
                    // Skan dzieci
                    scan(n);
                }
            });
        } else if(m.type==='attributes' && m.attributeName==='class') {
            m.target.classList.forEach(c => (c.startsWith('Q&')||c.startsWith('--')) && generate(c));
        }
    }));
    
    const start = () => { scan(); observer.observe(document.body, {childList:true, subtree:true, attributes:true}); };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

})();
