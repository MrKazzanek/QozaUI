(function() {
    // ============================================================
    // 1. KONFIGURACJA (Baza danych)
    // ============================================================
    const config = {
    "components": {
        "btn": {
            "base": {
                "default": {
                    "border": "none",
                    "cursor": "pointer",
                    "display": "inline-flex",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "fontFamily": "sans-serif",
                    "borderRadius": "4px",
                    "transition": "all 0.2s",
                    "userSelect": "none"
                },
                ":disabled": {
                    "opacity": "0.6",
                    "cursor": "not-allowed",
                    "filter": "grayscale(1)"
                },
                ":active:not(:disabled)": {
                    "transform": "scale(0.97)"
                }
            },
            "variants": {
                "primary": {
                    "default": {
                        "backgroundColor": "#3b82f6",
                        "color": "white"
                    },
                    ":hover:not(:disabled)": {
                        "backgroundColor": "#2563eb"
                    }
                },
                "danger": {
                    "default": {
                        "backgroundColor": "#ef4444",
                        "color": "white"
                    },
                    ":hover:not(:disabled)": {
                        "backgroundColor": "#dc2626"
                    }
                }
            },
            "sizes": {
                "1": {
                    "default": {
                        "padding": "6px 12px",
                        "fontSize": "12px"
                    }
                },
                "2": {
                    "default": {
                        "padding": "10px 20px",
                        "fontSize": "14px"
                    }
                }
            }
        }
    },
    "vars": {
        "colors": {
            "white": "#fff",
            "black": "#000",
            "red": "#ef4444",
            "blue": "#3b82f6",
            "green": "#22c55e"
        },
        "sides": {
            "lft": "Left",
            "rgt": "Right",
            "up": "Top",
            "dwn": "Bottom"
        },
        "units": {
            "px": "px",
            "p": "%",
            "vh": "vh",
            "rem": "rem"
        },
        "fonts": {
            "1": "12px",
            "2": "14px",
            "3": "16px",
            "4": "20px",
            "5": "24px",
            "6": "32px"
        }
    }
};
    // ============================================================
    // 2. LOGIKA UTILITIES (Parsery)
    // ============================================================
    
    const getUnit = (u) => config.vars.units[u] || u || 'px';
    const getSide = (s) => config.vars.sides[s] ? `-${config.vars.sides[s].toLowerCase()}` : '';
    
    const parseColor = (parts, idx) => {
        if(parts[idx] === 'set') return { val: `#${parts[idx+1]}`, consumed: 2 };
        return { val: config.vars.colors[parts[idx]] || parts[idx], consumed: 1 };
    };

    const utilities = {
        // Q&clr-red, Q&clr-set-aaaaaa
        'clr': (p) => ({ color: parseColor(p, 0).val }),
        'bg': (p) => ({ backgroundColor: parseColor(p, 0).val }),
        
        // Q&mg-10-px-lft
        'mg': (p) => parseSpacing('margin', p),
        'pd': (p) => parseSpacing('padding', p),
        
        // Q&w-100-px, Q&h-50-p
        'w': (p) => ({ width: `${p[0]}${getUnit(p[1])}` }),
        'h': (p) => ({ height: `${p[0]}${getUnit(p[1])}` }),
        
        // Q&bd-1-px-solid-red-dwn
        'bd': (p) => {
            let i=0;
            const v=p[i++], u=getUnit(p[i++]), t=p[i++];
            const cObj = parseColor(p, i);
            const col = cObj.val;
            i += cObj.consumed;
            const side = getSide(p[i]);
            return { [`border${side}`]: `${v}${u} ${t} ${col}` };
        },
        
        // Q&fs-1, Q&fs-set-20-px
        'fs': (p) => p[0]==='set' ? ({fontSize: `${p[1]}${getUnit(p[2])}`}) : ({fontSize: config.vars.fonts[p[0]]}),
        'br': (p) => ({ borderRadius: `${p[0]}${getUnit(p[1])}` }),
        'cursor': (p) => ({ cursor: p[0] }),
        'txt': (p) => ({ textAlign: p[0] }),
        'd': (p) => ({ display: p[0] })
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
    // 3. SILNIK GENERATORA (Core)
    // ============================================================
    const generated = new Set();
    const styleTag = document.createElement('style');
    styleTag.id = 'q-style-hybrid';
    document.head.appendChild(styleTag);

    function objToCss(obj, important = false) {
        return Object.entries(obj).map(([k, v]) => {
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

        const raw = className.substring(2); // remove Q&
        const parts = raw.split('-');
        const key = parts[0];
        const args = parts.slice(1);

        let rules = {}; // { default: {}, ':hover': {} }
        let isUtility = false;

        // A. CZY TO KOMPONENT? (np. btn)
        if(config.components[key]) {
            const comp = config.components[key];
            // 1. Baza
            mergeDeep(rules, comp.base);
            // 2. Warianty i Rozmiary (kolejność dowolna)
            args.forEach(arg => {
                if(comp.variants && comp.variants[arg]) mergeDeep(rules, comp.variants[arg]);
                if(comp.sizes && comp.sizes[arg]) mergeDeep(rules, comp.sizes[arg]);
            });
            // Fallback size
            if(comp.sizes && comp.sizes['2'] && !args.some(a => comp.sizes[a])) {
                mergeDeep(rules, comp.sizes['2']);
            }
        }
        // B. CZY TO UTILITY? (np. mg, clr)
        else if(utilities[key]) {
            try {
                // Utilities nie mają hoverów w tej prostej wersji, wrzucamy do default
                rules.default = utilities[key](args);
                isUtility = true;
            } catch(e) {}
        } 
        else return;

        // Budowanie CSS
        const safeClass = className.replace(/&/g, '\\&').replace(/\./g, '\\.');
        let cssStr = '';
        
        for(const [state, styles] of Object.entries(rules)) {
            const selector = state === 'default' ? `.${safeClass}` : `.${safeClass}${state}`;
            // Utilities dostają !important, żeby nadpisywać szablony (np. btn color)
            cssStr += `${selector} { ${objToCss(styles, isUtility)} }\n`;
        }

        styleTag.innerHTML += cssStr;
        generated.add(className);
    }

    // ============================================================
    // 4. INICJALIZACJA
    // ============================================================
    function scan(root=document) {
        root.querySelectorAll('*').forEach(el => {
            if(el.classList) el.classList.forEach(c => c.startsWith('Q&') && generate(c));
        });
    }
    const observer = new MutationObserver(ms => ms.forEach(m => {
        if(m.type==='childList') m.addedNodes.forEach(n => n.nodeType===1 && (scan(n), n.classList.forEach(c=>c.startsWith('Q&')&&generate(c))));
        if(m.type==='attributes') m.target.classList.forEach(c=>c.startsWith('Q&')&&generate(c));
    }));
    
    const start = () => { scan(); observer.observe(document.body, {childList:true, subtree:true, attributes:true}); };
    document.readyState==='loading' ? document.addEventListener('DOMContentLoaded', start) : start();

})();
