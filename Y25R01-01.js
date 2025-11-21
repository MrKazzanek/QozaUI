(function() {
    // ============================================================
    // 1. KONFIGURACJA
    // ============================================================
    const config = {
        components: {
            'btn': {
                base: { default: { border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', borderRadius: '8px', transition: 'all 0.2s ease', userSelect: 'none', textDecoration: 'none', fontWeight: '600', lineHeight: '1' }, ':disabled': { opacity: '0.6', cursor: 'not-allowed', filter: 'grayscale(1)' }, ':active:not(:disabled)': { transform: 'scale(0.98)' } },
                variants: {
                    'primary': { default: { backgroundColor: '#3b82f6', color: '#fff', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }, ':hover:not(:disabled)': { backgroundColor: '#2563eb', boxShadow: '0 6px 10px -2px rgba(59, 130, 246, 0.4)' } },
                    'dark': { default: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155' }, ':hover:not(:disabled)': { backgroundColor: '#334155', borderColor: '#475569' } },
                    'ghost': { default: { backgroundColor: 'transparent', color: '#94a3b8' }, ':hover:not(:disabled)': { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } },
                    'outline': { default: { backgroundColor: 'transparent', border: '1px solid #475569', color: '#cbd5e1' }, ':hover:not(:disabled)': { borderColor: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } }
                },
                sizes: { 'xs': { default: { padding: '6px 10px', fontSize: '11px' } }, 'sm': { default: { padding: '8px 14px', fontSize: '13px' } }, 'md': { default: { padding: '12px 20px', fontSize: '14px' } }, 'lg': { default: { padding: '14px 28px', fontSize: '16px' } }, 'xl': { default: { padding: '18px 36px', fontSize: '18px' } } }
            },
            'input': {
                base: { default: { display: 'block', width: '100%', padding: '10px 14px', fontSize: '14px', lineHeight: '1.5', borderRadius: '8px', outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s' }, ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' } },
                variants: { 'dark': { default: { backgroundColor: '#0f172a', border: '1px solid #334155', color: '#f8fafc' }, ':focus': { borderColor: '#3b82f6' } } },
                sizes: { 'sm': { default: { padding: '8px 12px', fontSize: '13px' } }, 'md': { default: { padding: '10px 14px', fontSize: '14px' } } }
            },
            'card': {
                base: { default: { borderRadius: '16px', overflow: 'hidden' } },
                variants: { 'dark': { default: { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' } }, 'glass': { default: { backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' } } },
                sizes: { '1': { default: { padding: '16px' } }, '2': { default: { padding: '24px' } }, '3': { default: { padding: '32px' } } }
            },
            'badge': {
                base: { default: { display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', lineHeight: '1', textTransform: 'uppercase', letterSpacing: '0.5px' } },
                variants: { 'green': { default: { backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' } }, 'blue': { default: { backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)' } }, 'purple': { default: { backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.2)' } } }
            },
            'avatar': {
                base: { default: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#334155', color: '#fff', fontWeight: '600', objectFit: 'cover' } },
                sizes: { 'sm': { default: { width: '32px', height: '32px', fontSize: '12px' } }, 'md': { default: { width: '40px', height: '40px', fontSize: '14px' } }, 'lg': { default: { width: '56px', height: '56px', fontSize: '18px' } } }
            }
        },
        vars: {
            colors: { 'white': '#ffffff', 'black': '#000000', 'transparent': 'transparent', 'current': 'currentColor', 'slate': '#64748b', 'gray': '#6b7280', 'zinc': '#71717a', 'red': '#ef4444', 'orange': '#f97316', 'amber': '#f59e0b', 'green': '#22c55e', 'emerald': '#10b981', 'teal': '#14b8a6', 'cyan': '#06b6d4', 'sky': '#0ea5e9', 'blue': '#3b82f6', 'indigo': '#6366f1', 'violet': '#8b5cf6', 'purple': '#a855f7', 'fuchsia': '#d946ef', 'pink': '#ec4899', 'rose': '#f43f5e', 'light': '#f8fafc', 'dark': '#0f172a' },
            sides: { 'lft': 'Left', 'rgt': 'Right', 'up': 'Top', 'dwn': 'Bottom', 'x': 'x', 'y': 'y' },
            units: { 'px': 'px', 'p': '%', 'vh': 'vh', 'vw': 'vw', 'rem': 'rem', 'em': 'em', 'deg': 'deg' },
            fonts: { '1': '12px', '2': '14px', '3': '16px', '4': '18px', '5': '20px', '6': '24px', '7': '30px', '8': '36px', '9': '48px', '10': '60px', '11': '72px', '12': '96px' },
            fontFamilies: { 'sans': 'Inter, ui-sans-serif, system-ui, sans-serif', 'mono': 'ui-monospace, monospace' },
            shadows: { 'sm': '0 1px 2px rgba(0,0,0,0.1)', 'md': '0 4px 6px -1px rgba(0,0,0,0.2)', 'lg': '0 10px 15px -3px rgba(0,0,0,0.3)', 'xl': '0 20px 25px -5px rgba(0,0,0,0.4)', 'none': 'none' },
            // DEFINICJA BREAKPOINTÓW
            breakpoints: { 'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px' }
        }
    };

    // 2. PARSERY
    const getUnit = (u) => config.vars.units[u] || u || 'px';
    const getSide = (s) => config.vars.sides[s] ? (config.vars.sides[s].length > 2 ? `-${config.vars.sides[s].toLowerCase()}` : '') : '';
    const parseColor = (parts, idx) => { if (parts[idx] === 'set') return { val: `#${parts[idx+1]}`, consumed: 2 }; return { val: config.vars.colors[parts[idx]] || parts[idx], consumed: 1 }; };
    const parseBorderLike = (parts, propName) => { let i = 0; const v = parts[i++], u = getUnit(parts[i++]), type = parts[i++]; const cObj = parseColor(parts, i); i += cObj.consumed; const s = parts[i]; if (s) { const sideName = config.vars.sides[s]; if (sideName) return { [`${propName}${sideName}`]: `${v}${u} ${type} ${cObj.val}` }; } return { [propName]: `${v}${u} ${type} ${cObj.val}` }; };
    function parseSpacing(prop, p) { const v = p[0]; if (v === 'auto') return { [prop]: 'auto' }; let u = 'px', s = ''; if(p.length > 1) { if(config.vars.units[p[1]] || p[1]==='p') { u=getUnit(p[1]); if(p[2]) s=p[2]; } else if(config.vars.sides[p[1]]) s=p[1]; } const val = `${v}${u}`; if (s === 'x') return { [`${prop}Left`]: val, [`${prop}Right`]: val }; if (s === 'y') return { [`${prop}Top`]: val, [`${prop}Bottom`]: val }; return { [`${prop}${getSide(s)}`]: val }; }

    // 3. UTILITIES
    const utilities = {
        'clr': (p) => ({ color: parseColor(p, 0).val }), 'bg': (p) => ({ backgroundColor: parseColor(p, 0).val }), 'op': (p) => ({ opacity: p[0] }),
        'mg': (p) => parseSpacing('margin', p), 'pd': (p) => parseSpacing('padding', p),
        'w': (p) => ({ width: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }), 'h': (p) => ({ height: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }), 'mw': (p) => ({ maxWidth: `${p[0]}${getUnit(p[1])}` }), 'minw': (p) => ({ minWidth: `${p[0]}${getUnit(p[1])}` }),
        'fs': (p) => p[0]==='set' ? ({fontSize: `${p[1]}${getUnit(p[2])}`}) : ({fontSize: config.vars.fonts[p[0]]}), 'fw': (p) => ({ fontWeight: p[0] }), 'sft': (p) => p[0]==='set' ? ({fontFamily: p.slice(1).join(' ')}) : ({fontFamily: config.vars.fontFamilies[p[0]]}), 'ta': (p) => ({ textAlign: p[0] }), 'tt': (p) => ({ textTransform: p[0] }), 'ls': (p) => ({ letterSpacing: `${p[0]}${getUnit(p[1])}` }), 'lh': (p) => ({ lineHeight: p[0] }),
        'bd': (p) => parseBorderLike(p, 'border'), 'out': (p) => parseBorderLike(p, 'outline'), 'br': (p) => { const v = `${p[0]}${getUnit(p[1])}`; const s = p[2]; if(!s) return { borderRadius: v }; if(s==='t') return { borderTopLeftRadius: v, borderTopRightRadius: v }; if(s==='b') return { borderBottomLeftRadius: v, borderBottomRightRadius: v }; if(s==='l') return { borderTopLeftRadius: v, borderBottomLeftRadius: v }; if(s==='r') return { borderTopRightRadius: v, borderBottomRightRadius: v }; return { borderRadius: v }; },
        'd': (p) => ({ display: p[0] }), 'pos': (p) => ({ position: p[0] }), 't': (p) => ({ top: `${p[0]}${getUnit(p[1])}` }), 'b': (p) => ({ bottom: `${p[0]}${getUnit(p[1])}` }), 'l': (p) => ({ left: `${p[0]}${getUnit(p[1])}` }), 'r': (p) => ({ right: `${p[0]}${getUnit(p[1])}` }), 'inset': (p) => ({ top: `${p[0]}${getUnit(p[1])}`, right: `${p[0]}${getUnit(p[1])}`, bottom: `${p[0]}${getUnit(p[1])}`, left: `${p[0]}${getUnit(p[1])}` }), 'z': (p) => ({ zIndex: p[0] }), 'ov': (p) => ({ overflow: p[0] }),
        'fx': (p) => { if(['row','column','wrap','col'].includes(p[0])) return p[0]==='wrap'?{flexWrap:'wrap'}:{flexDirection:p[0]==='col'?'column':p[0]}; return { flex: p[0] }; }, 'grow': (p) => ({ flexGrow: p[0]||'1' }), 'ai': (p) => ({ alignItems: p[0]==='center'?'center':(p[0]==='start'?'flex-start':(p[0]==='end'?'flex-end':p[0])) }), 'jc': (p) => ({ justifyContent: p[0]==='sb'?'space-between':(p[0]==='center'?'center':(p[0]==='end'?'flex-end':(p[0]==='start'?'flex-start':p[0]))) }), 'gap': (p) => ({ gap: `${p[0]}${getUnit(p[1])}` }),
        'cols': (p) => ({ gridTemplateColumns: `repeat(${p[0]}, minmax(0, 1fr))` }), 'span': (p) => ({ gridColumn: `span ${p[0]} / span ${p[0]}` }),
        'sh': (p) => ({ boxShadow: p[0]==='set' ? p.slice(1).join(' ') : (config.vars.shadows[p[0]] || 'none') }), 'cursor': (p) => ({ cursor: p[0] }), 'blur': (p) => ({ filter: `blur(${p[0]}${getUnit(p[1])})` }), 'bblur': (p) => ({ backdropFilter: `blur(${p[0]}${getUnit(p[1])})`, WebkitBackdropFilter: `blur(${p[0]}${getUnit(p[1])})` }), 'scale': (p) => ({ transform: `scale(${p[0]/100})` }), 'rot': (p) => ({ transform: `rotate(${p[0]}deg)` }), 'trans': (p) => ({ transition: `all ${p[0]||'0.2'}s ease` }), 'fit': (p) => ({ objectFit: p[0] })
    };

    const generated = new Set(); const styleTag = document.createElement('style'); styleTag.id = 'q-style-engine'; document.head.appendChild(styleTag);
    function objToCss(obj, imp=false) { return Object.entries(obj).map(([k, v]) => { const key = k.replace(/([A-Z])/g, '-$1').toLowerCase(); return `${key}: ${v}${imp?' !important':''};`; }).join(' '); }
    function mergeDeep(t, s) { for(const k in s) if(typeof s[k]==='object') { if(!t[k])t[k]={}; mergeDeep(t[k], s[k]); } else t[k]=s[k]; }

    // 4. CORE GENERATOR (Z obsługą Media Queries)
    function generate(className) {
        if(generated.has(className)) return;
        
        let rawName = className;
        let mediaQuery = null;
        let pseudoState = "default";

        // 1. Sprawdzanie Breakpointów (np. md:Q&...)
        for (const bp in config.vars.breakpoints) {
            const prefix = `${bp}:`;
            if (rawName.startsWith(prefix)) {
                mediaQuery = `@media (min-width: ${config.vars.breakpoints[bp]})`;
                rawName = rawName.substring(prefix.length);
                break;
            }
        }

        // 2. Sprawdzanie Prefiksów Q& i Pseudo-stanów
        if (rawName.startsWith('Q&')) {
            rawName = rawName.substring(2);
        } else if (rawName.startsWith('--')) {
            const idx = rawName.indexOf('-Q&');
            if (idx === -1) return;
            pseudoState = `:${rawName.substring(2, idx)}`;
            rawName = rawName.substring(idx + 3);
        } else {
            return; // Niepoprawna klasa
        }

        // 3. Budowanie reguł
        const parts = rawName.split('-'); const key = parts[0]; const args = parts.slice(1);
        let rules = {}, isUtil = false;

        if(config.components[key]) {
            const comp = config.components[key]; mergeDeep(rules, comp.base);
            args.forEach(a => { if(comp.variants&&comp.variants[a]) mergeDeep(rules,comp.variants[a]); if(comp.sizes&&comp.sizes[a]) mergeDeep(rules,comp.sizes[a]); });
            if(comp.sizes&&Object.keys(comp.sizes).length>0&&!args.some(a=>comp.sizes[a])) { const defSize = comp.sizes['md'] || comp.sizes['2'] || Object.values(comp.sizes)[0]; if(defSize) mergeDeep(rules, defSize); }
        } else if(utilities[key]) { 
            try { rules[pseudoState] = utilities[key](args); isUtil = true; } catch(e){} 
        } else return;

        // 4. Generowanie CSS
        // Escape znaków specjalnych (:, &, --) w selektorze
        const safeClass = className.replace(/&/g, '\\&').replace(/\./g, '\\.').replace(/:/g, '\\:').replace(/%/g, '\\%');
        let cssStr = '';
        
        for(const [st, styles] of Object.entries(rules)) {
            const sel = st==='default' ? `.${safeClass}` : `.${safeClass}${st}`;
            cssStr += `${sel} { ${objToCss(styles, isUtil)} }\n`;
        }

        // 5. Wrapowanie w Media Query
        if (mediaQuery) {
            cssStr = `${mediaQuery} { ${cssStr} }`;
        }

        styleTag.innerHTML += cssStr;
        generated.add(className);
    }

    function scan(root=document) { 
        root.querySelectorAll('*').forEach(el => { 
            if(el.classList) el.classList.forEach(c => {
                // Skanujemy wszystko co ma Q& (również po dwukropku dla breakpointów)
                if (c.includes('Q&')) generate(c);
            }); 
        }); 
    }
    const observer = new MutationObserver(ms => ms.forEach(m => { if(m.type==='childList') m.addedNodes.forEach(n => { if(n.nodeType===1) { if(n.classList)n.classList.forEach(c=>{if(c.includes('Q&'))generate(c)}); scan(n); } }); else if(m.type==='attributes') m.target.classList.forEach(c=>{if(c.includes('Q&'))generate(c)}); }));
    const start = () => { scan(); observer.observe(document.body, {childList:true, subtree:true, attributes:true}); };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
