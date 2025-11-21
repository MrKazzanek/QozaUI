(function() {
    // ============================================================
    // 1. KONFIGURACJA (Baza danych Design Systemu)
    // ============================================================
    const config = {
        // A. SZABLONY KOMPONENTÓW
        components: {
            // 1. PRZYCISKI
            'btn': {
                base: {
                    default: { border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', borderRadius: '6px', transition: 'all 0.2s ease', userSelect: 'none', textDecoration: 'none', fontWeight: '500', lineHeight: '1' },
                    ':disabled': { opacity: '0.6', cursor: 'not-allowed', filter: 'grayscale(1)' },
                    ':active:not(:disabled)': { transform: 'scale(0.97)' }
                },
                variants: {
                    'primary': { default: { backgroundColor: '#3b82f6', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#2563eb' } },
                    'secondary': { default: { backgroundColor: '#64748b', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#475569' } },
                    'success': { default: { backgroundColor: '#22c55e', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#16a34a' } },
                    'danger': { default: { backgroundColor: '#ef4444', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#dc2626' } },
                    'warning': { default: { backgroundColor: '#f59e0b', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#d97706' } },
                    'dark': { default: { backgroundColor: '#0f172a', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#1e293b' } },
                    'ghost': { default: { backgroundColor: 'transparent', color: '#334155' }, ':hover:not(:disabled)': { backgroundColor: '#f1f5f9' } },
                    'outline': { default: { backgroundColor: 'transparent', border: '1px solid #cbd5e1', color: '#334155' }, ':hover:not(:disabled)': { borderColor: '#94a3b8', backgroundColor: '#f8fafc' } }
                },
                sizes: {
                    'xs': { default: { padding: '6px 10px', fontSize: '11px' } },
                    'sm': { default: { padding: '8px 12px', fontSize: '12px' } },
                    'md': { default: { padding: '10px 16px', fontSize: '14px' } },
                    'lg': { default: { padding: '12px 24px', fontSize: '16px' } },
                    'xl': { default: { padding: '16px 32px', fontSize: '18px' } }
                }
            },
            // 2. FORMULARZE (Input, Textarea, Select)
            'input': {
                base: {
                    default: { display: 'block', width: '100%', padding: '10px 12px', fontSize: '14px', lineHeight: '1.5', color: '#1f2937', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' },
                    ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)' },
                    ':disabled': { backgroundColor: '#f3f4f6', cursor: 'not-allowed', opacity: '0.7' }
                },
                variants: {
                    'error': { default: { borderColor: '#ef4444' }, ':focus': { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' } },
                    'valid': { default: { borderColor: '#22c55e' }, ':focus': { borderColor: '#22c55e', boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.15)' } }
                },
                sizes: {
                    'sm': { default: { padding: '6px 10px', fontSize: '12px' } },
                    'lg': { default: { padding: '12px 16px', fontSize: '16px' } }
                }
            },
            // 3. KARTY
            'card': {
                base: { default: { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
                variants: {
                    'flat': { default: { border: '1px solid #f1f5f9', boxShadow: 'none' } },
                    'shadow': { default: { border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' } },
                    'hover': { default: { transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #e2e8f0' }, ':hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } }
                },
                sizes: { '1': { default: { padding: '12px' } }, '2': { default: { padding: '24px' } }, '3': { default: { padding: '32px' } } }
            },
            // 4. BADGES (Tagi)
            'badge': {
                base: { default: { display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', lineHeight: '1', textTransform: 'uppercase', whiteSpace: 'nowrap' } },
                variants: {
                    'gray': { default: { backgroundColor: '#f1f5f9', color: '#475569' } },
                    'red': { default: { backgroundColor: '#fef2f2', color: '#b91c1c' } },
                    'green': { default: { backgroundColor: '#dcfce7', color: '#15803d' } },
                    'blue': { default: { backgroundColor: '#dbeafe', color: '#1e40af' } },
                    'yellow': { default: { backgroundColor: '#fef9c3', color: '#854d0e' } },
                    'dot': { default: { padding: '0', width: '8px', height: '8px', borderRadius: '50%' } } // Q&badge-dot (sama kropka)
                }
            },
            // 5. ALERTY
            'alert': {
                base: { default: { padding: '14px 18px', borderRadius: '6px', borderLeft: '4px solid', marginBottom: '10px', fontSize: '14px' } },
                variants: {
                    'info': { default: { backgroundColor: '#eff6ff', borderColor: '#3b82f6', color: '#1e3a8a' } },
                    'success': { default: { backgroundColor: '#f0fdf4', borderColor: '#22c55e', color: '#14532d' } },
                    'warning': { default: { backgroundColor: '#fffbeb', borderColor: '#f59e0b', color: '#78350f' } },
                    'error': { default: { backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#7f1d1d' } }
                }
            },
            // 6. AVATAR
            'avatar': {
                base: { default: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#cbd5e1', color: '#fff', fontWeight: '600', objectFit: 'cover', overflow: 'hidden' } },
                sizes: {
                    'sm': { default: { width: '32px', height: '32px', fontSize: '12px' } },
                    'md': { default: { width: '48px', height: '48px', fontSize: '16px' } },
                    'lg': { default: { width: '64px', height: '64px', fontSize: '24px' } },
                    'xl': { default: { width: '96px', height: '96px', fontSize: '32px' } }
                }
            },
            // 7. SPINNER (Loader)
            'spinner': {
                base: {
                    default: { display: 'inline-block', border: '2px solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }
                },
                sizes: {
                    'sm': { default: { width: '16px', height: '16px', borderWidth: '2px' } },
                    'md': { default: { width: '24px', height: '24px', borderWidth: '3px' } },
                    'lg': { default: { width: '40px', height: '40px', borderWidth: '4px' } }
                }
            }
        },

        // B. ZMIENNE GLOBALNE
        vars: {
            colors: {
                'white': '#ffffff', 'black': '#000000', 'transparent': 'transparent', 'current': 'currentColor',
                'slate': '#64748b', 'gray': '#6b7280', 'zinc': '#71717a', 'neutral': '#737373',
                'red': '#ef4444', 'orange': '#f97316', 'amber': '#f59e0b', 'yellow': '#eab308',
                'lime': '#84cc16', 'green': '#22c55e', 'emerald': '#10b981', 'teal': '#14b8a6',
                'cyan': '#06b6d4', 'sky': '#0ea5e9', 'blue': '#3b82f6', 'indigo': '#6366f1',
                'violet': '#8b5cf6', 'purple': '#a855f7', 'fuchsia': '#d946ef', 'pink': '#ec4899', 'rose': '#f43f5e',
                'light': '#f8fafc', 'dark': '#0f172a'
            },
            sides: { 'lft': 'Left', 'rgt': 'Right', 'up': 'Top', 'dwn': 'Bottom', 'x': 'x', 'y': 'y' }, // x, y for axis
            units: { 'px': 'px', 'p': '%', 'vh': 'vh', 'vw': 'vw', 'rem': 'rem', 'em': 'em', 'deg': 'deg', 's': 's', 'ms': 'ms' },
            fonts: { '1': '12px', '2': '14px', '3': '16px', '4': '18px', '5': '20px', '6': '24px', '7': '30px', '8': '36px', '9': '48px', '10': '60px' },
            fontFamilies: {
                'sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            },
            shadows: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'def': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'none': 'none'
            },
            breakpoints: { 'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px' }
        }
    };

    // ============================================================
    // 2. LOGIKA PARSOWANIA (Helpers)
    // ============================================================
    
    const getUnit = (u) => config.vars.units[u] || u || 'px';
    const getSide = (s) => config.vars.sides[s] ? (config.vars.sides[s].length > 2 ? `-${config.vars.sides[s].toLowerCase()}` : '') : '';
    
    // Parsowanie kolorów (nazwa lub hex)
    const parseColor = (parts, idx) => {
        if (parts[idx] === 'set') return { val: `#${parts[idx+1]}`, consumed: 2 };
        return { val: config.vars.colors[parts[idx]] || parts[idx], consumed: 1 };
    };

    // Parsowanie Border/Outline
    const parseBorderLike = (parts, propName) => {
        let i = 0;
        const v = parts[i++], u = getUnit(parts[i++]), type = parts[i++];
        const cObj = parseColor(parts, i); i += cObj.consumed;
        const s = parts[i]; // Side
        
        if (s) {
            const sideName = config.vars.sides[s];
            if (sideName) return { [`${propName}${sideName}`]: `${v}${u} ${type} ${cObj.val}` };
        }
        return { [propName]: `${v}${u} ${type} ${cObj.val}` };
    };

    // Parsowanie Spacing (Margin/Padding) z obsługą x, y, auto
    function parseSpacing(prop, p) {
        const v = p[0];
        if (v === 'auto') return { [prop]: 'auto' };
        
        let u = 'px', s = '';
        if(p.length > 1) {
            if(config.vars.units[p[1]] || p[1]==='p') { u=getUnit(p[1]); if(p[2]) s=p[2]; }
            else if(config.vars.sides[p[1]]) s=p[1];
        }
        
        const val = `${v}${u}`;
        if (s === 'x') return { [`${prop}Left`]: val, [`${prop}Right`]: val };
        if (s === 'y') return { [`${prop}Top`]: val, [`${prop}Bottom`]: val };
        return { [`${prop}${getSide(s)}`]: val };
    }

    // ============================================================
    // 3. UTILITIES (Definicje mechanik CSS)
    // ============================================================
    const utilities = {
        // --- COLORS & BACKGROUNDS ---
        'clr': (p) => ({ color: parseColor(p, 0).val }),
        'bg': (p) => ({ backgroundColor: parseColor(p, 0).val }),
        'op': (p) => ({ opacity: p[0] }),
        
        // --- SPACING ---
        'mg': (p) => parseSpacing('margin', p),
        'pd': (p) => parseSpacing('padding', p),
        
        // --- SIZING ---
        'w': (p) => ({ width: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }),
        'h': (p) => ({ height: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }),
        'mw': (p) => ({ maxWidth: `${p[0]}${getUnit(p[1])}` }),
        'minw': (p) => ({ minWidth: `${p[0]}${getUnit(p[1])}` }),
        'mh': (p) => ({ maxHeight: `${p[0]}${getUnit(p[1])}` }),
        'minh': (p) => ({ minHeight: `${p[0]}${getUnit(p[1])}` }),
        
        // --- TYPOGRAPHY ---
        'fs': (p) => p[0]==='set' ? ({fontSize: `${p[1]}${getUnit(p[2])}`}) : ({fontSize: config.vars.fonts[p[0]]}),
        'fw': (p) => ({ fontWeight: p[0] }),
        'sft': (p) => p[0]==='set' ? ({fontFamily: p.slice(1).join(' ')}) : ({fontFamily: config.vars.fontFamilies[p[0]]}),
        'ta': (p) => ({ textAlign: p[0] }), // left, center, right, justify
        'td': (p) => ({ textDecoration: p[0] }), // none, underline, line-through
        'tt': (p) => ({ textTransform: p[0] }), // uppercase, lowercase, capitalize
        'ls': (p) => ({ letterSpacing: `${p[0]}${getUnit(p[1])}` }),
        'lh': (p) => ({ lineHeight: p[1] ? `${p[0]}${getUnit(p[1])}` : p[0] }),
        'ws': (p) => ({ whiteSpace: p[0] }), // nowrap, pre, pre-wrap
        'trunc': (p) => ({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
        
        // --- BORDERS & OUTLINE ---
        'bd': (p) => parseBorderLike(p, 'border'),
        'out': (p) => parseBorderLike(p, 'outline'),
        'br': (p) => {
            const v = `${p[0]}${getUnit(p[1])}`; const s = p[2];
            if(!s) return { borderRadius: v };
            if(s==='t') return { borderTopLeftRadius: v, borderTopRightRadius: v };
            if(s==='b') return { borderBottomLeftRadius: v, borderBottomRightRadius: v };
            if(s==='l') return { borderTopLeftRadius: v, borderBottomLeftRadius: v };
            if(s==='r') return { borderTopRightRadius: v, borderBottomRightRadius: v };
            return { borderRadius: v };
        },
        
        // --- LAYOUT & FLEXBOX & GRID ---
        'd': (p) => ({ display: p[0] }), // block, inline, flex, grid, none
        'pos': (p) => ({ position: p[0] }), // absolute, relative, fixed, sticky
        't': (p) => ({ top: `${p[0]}${getUnit(p[1])}` }),
        'b': (p) => ({ bottom: `${p[0]}${getUnit(p[1])}` }),
        'l': (p) => ({ left: `${p[0]}${getUnit(p[1])}` }),
        'r': (p) => ({ right: `${p[0]}${getUnit(p[1])}` }),
        'inset': (p) => ({ top: `${p[0]}${getUnit(p[1])}`, right: `${p[0]}${getUnit(p[1])}`, bottom: `${p[0]}${getUnit(p[1])}`, left: `${p[0]}${getUnit(p[1])}` }),
        'z': (p) => ({ zIndex: p[0] }),
        'ov': (p) => ({ overflow: p[0] }), // hidden, auto, scroll
        'ovx': (p) => ({ overflowX: p[0] }),
        'ovy': (p) => ({ overflowY: p[0] }),
        
        // Flex
        'fx': (p) => { 
            if(['row','row-reverse','column','column-reverse'].includes(p[0])) return { flexDirection: p[0] };
            if(['wrap','nowrap','wrap-reverse'].includes(p[0])) return { flexWrap: p[0] };
            if(p[0]==='1') return { flex: '1 1 0%' };
            if(p[0]==='auto') return { flex: '1 1 auto' };
            if(p[0]==='none') return { flex: 'none' };
            return { flex: p[0] };
        },
        'grow': (p) => ({ flexGrow: p[0]||'1' }),
        'shrink': (p) => ({ flexShrink: p[0]||'1' }),
        'ai': (p) => ({ alignItems: p[0]==='center'?'center':(p[0]==='start'?'flex-start':(p[0]==='end'?'flex-end':p[0])) }),
        'jc': (p) => ({ justifyContent: p[0]==='sb'?'space-between':(p[0]==='sa'?'space-around':(p[0]==='center'?'center':(p[0]==='end'?'flex-end':'flex-start'))) }),
        'gap': (p) => ({ gap: `${p[0]}${getUnit(p[1])}` }),
        
        // Grid (Basic)
        'cols': (p) => ({ gridTemplateColumns: `repeat(${p[0]}, minmax(0, 1fr))` }),
        'rows': (p) => ({ gridTemplateRows: `repeat(${p[0]}, minmax(0, 1fr))` }),
        'span': (p) => ({ gridColumn: `span ${p[0]} / span ${p[0]}` }),

        // --- EFFECTS & TRANSFORMS ---
        'sh': (p) => ({ boxShadow: p[0]==='set' ? p.slice(1).join(' ') : (config.vars.shadows[p[0]] || 'none') }),
        'cursor': (p) => ({ cursor: p[0] }), // pointer, not-allowed, text
        'select': (p) => ({ userSelect: p[0] }), // none, text, all
        'pe': (p) => ({ pointerEvents: p[0] }), // none, auto
        'vis': (p) => ({ visibility: p[0] }), // visible, hidden
        'blur': (p) => ({ filter: `blur(${p[0]}${getUnit(p[1])})` }),
        'scale': (p) => ({ transform: `scale(${p[0]/100})` }), // Q&scale-95 -> scale(0.95)
        'rot': (p) => ({ transform: `rotate(${p[0]}deg)` }),
        'trans': (p) => ({ transition: `all ${p[0]||'0.2'}s ease` }),
        
        // --- MEDIA ---
        'fit': (p) => ({ objectFit: p[0] }), // cover, contain
        'list': (p) => ({ listStyleType: p[0] }), // none, disc, decimal
        'resize': (p) => ({ resize: p[0] }) // none, both, x, y
    };

    // ============================================================
    // 4. SILNIK CORE (Generowanie CSS)
    // ============================================================
    const generated = new Set();
    const styleTag = document.createElement('style');
    styleTag.id = 'q-style-engine';
    document.head.appendChild(styleTag);
    
    // Keyframes dla Spinnera
    const keyframes = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    styleTag.innerHTML = keyframes;

    function objToCss(obj, imp=false) { 
        return Object.entries(obj).map(([k, v]) => { 
            const key = k.replace(/([A-Z])/g, '-$1').toLowerCase(); 
            return `${key}: ${v}${imp?' !important':''};`; 
        }).join(' '); 
    }

    function mergeDeep(t, s) { 
        for(const k in s) if(typeof s[k]==='object') { if(!t[k])t[k]={}; mergeDeep(t[k], s[k]); } else t[k]=s[k]; 
    }

    function generate(className) {
        if(generated.has(className)) return;
        
        let rawName = "", pseudoState = "default";
        if (className.startsWith('Q&')) rawName = className.substring(2);
        else if (className.startsWith('--')) {
            const idx = className.indexOf('-Q&'); if(idx===-1)return;
            pseudoState = `:${className.substring(2, idx)}`; rawName = className.substring(idx+3);
        } else return;

        const parts = rawName.split('-'); const key = parts[0]; const args = parts.slice(1);
        let rules = {}, isUtil = false;

        if(config.components[key]) {
            const comp = config.components[key];
            mergeDeep(rules, comp.base);
            args.forEach(a => { 
                if(comp.variants&&comp.variants[a]) mergeDeep(rules,comp.variants[a]); 
                if(comp.sizes&&comp.sizes[a]) mergeDeep(rules,comp.sizes[a]); 
            });
            // Fallback dla default size jeśli jest zdefiniowany
            if(comp.sizes&&Object.keys(comp.sizes).length>0&&!args.some(a=>comp.sizes[a])) {
                 // Sprawdzamy czy jest 'md', '2' lub pierwszy dostępny jako fallback
                 const defSize = comp.sizes['md'] || comp.sizes['2'] || Object.values(comp.sizes)[0];
                 if(defSize) mergeDeep(rules, defSize);
            }
        } else if(utilities[key]) {
            try { rules[pseudoState] = utilities[key](args); isUtil = true; } catch(e){}
        } else return;

        const safeClass = className.replace(/&/g, '\\&').replace(/\./g, '\\.').replace(/:/g, '\\:').replace(/%/g, '\\%');
        let cssStr = '';
        for(const [st, styles] of Object.entries(rules)) {
            const sel = st==='default' ? `.${safeClass}` : `.${safeClass}${st}`;
            cssStr += `${sel} { ${objToCss(styles, isUtil)} }\n`;
        }
        styleTag.innerHTML += cssStr;
        generated.add(className);
    }

    function scan(root=document) {
        root.querySelectorAll('*').forEach(el => { 
            if(el.classList) el.classList.forEach(c => (c.startsWith('Q&')||c.startsWith('--')) && generate(c)); 
        });
    }
    const observer = new MutationObserver(ms => ms.forEach(m => {
        if(m.type==='childList') m.addedNodes.forEach(n => { if(n.nodeType===1) { if(n.classList)n.classList.forEach(c=>(c.startsWith('Q&')||c.startsWith('--'))&&generate(c)); scan(n); } });
        else if(m.type==='attributes') m.target.classList.forEach(c=>(c.startsWith('Q&')||c.startsWith('--'))&&generate(c));
    }));
    
    const start = () => { scan(); observer.observe(document.body, {childList:true, subtree:true, attributes:true}); };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();

})();
