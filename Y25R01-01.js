(function() {
    // ============================================================
    // 1. KONFIGURACJA (Design System)
    // ============================================================
    const config = {
        components: {
            'btn': {
                base: { default: { border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', borderRadius: '8px', transition: 'all 0.2s ease', fontWeight: '600', lineHeight: '1', whiteSpace: 'nowrap' }, ':disabled': { opacity: '0.6', cursor: 'not-allowed', filter: 'grayscale(1)' }, ':active:not(:disabled)': { transform: 'scale(0.98)' } },
                variants: {
                    'primary': { default: { backgroundColor: '#3b82f6', color: '#fff', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }, ':hover:not(:disabled)': { backgroundColor: '#2563eb' } },
                    'dark': { default: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155' }, ':hover:not(:disabled)': { backgroundColor: '#334155' } },
                    'ghost': { default: { backgroundColor: 'transparent', color: '#94a3b8' }, ':hover:not(:disabled)': { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } },
                    'outline': { default: { backgroundColor: 'transparent', border: '1px solid #475569', color: '#cbd5e1' }, ':hover:not(:disabled)': { borderColor: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' } },
                    'danger': { default: { backgroundColor: '#ef4444', color: '#fff' }, ':hover:not(:disabled)': { backgroundColor: '#dc2626' } }
                },
                sizes: { 'sm': { default: { padding: '8px 14px', fontSize: '13px' } }, 'md': { default: { padding: '12px 20px', fontSize: '14px' } }, 'lg': { default: { padding: '14px 28px', fontSize: '16px' } }, 'xl': { default: { padding: '18px 36px', fontSize: '18px' } } }
            },
            'input': {
                base: { default: { display: 'block', width: '100%', padding: '10px 14px', fontSize: '14px', lineHeight: '1.5', borderRadius: '8px', outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s', color: 'inherit' }, ':focus': { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' } },
                variants: { 'dark': { default: { backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff' }, ':focus': { borderColor: '#3b82f6' } } }
            },
            'checkbox': { base: { default: { appearance: 'none', width: '18px', height: '18px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', cursor: 'pointer', position: 'relative', display: 'inline-block', verticalAlign: 'middle' }, ':checked': { backgroundColor: '#3b82f6', borderColor: '#3b82f6', backgroundImage: "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")" } } },
            'radio': { base: { default: { appearance: 'none', width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #475569', backgroundColor: '#0f172a', cursor: 'pointer', display: 'inline-block', verticalAlign: 'middle' }, ':checked': { borderColor: '#3b82f6', borderWidth: '5px' } } },
            'switch': { base: { default: { appearance: 'none', width: '42px', height: '24px', borderRadius: '99px', backgroundColor: '#334155', position: 'relative', cursor: 'pointer', outline: 'none', transition: '0.3s', flexShrink: '0' }, ':checked': { backgroundColor: '#3b82f6' }, ':after': { content: '""', position: 'absolute', top: '2px', left: '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', transition: '0.3s' }, ':checked:after': { transform: 'translateX(18px)' } } },
            'select': { base: { default: { appearance: 'none', display: 'block', width: '100%', padding: '10px 32px 10px 14px', fontSize: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' } } },
            'card': { base: { default: { borderRadius: '16px', overflow: 'hidden', position: 'relative' } }, variants: { 'dark': { default: { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' } } }, sizes: { '1': { default: { padding: '16px' } }, '2': { default: { padding: '24px' } } } },
            'modal': { base: { default: { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: '100', display: 'flex', alignItems: 'center', justifyContent: 'center' } } },
            'modal-box': { base: { default: { backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', maxWidth: '500px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' } } },
            'table': { base: { default: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' } }, variants: { 'dark': { default: { color: '#cbd5e1' } } } },
            'badge': { base: { default: { display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', lineHeight: '1.4', textTransform: 'uppercase', letterSpacing: '0.5px' } }, variants: { 'blue': { default: { backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)' } }, 'green': { default: { backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' } }, 'purple': { default: { backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.2)' } } } },
            'progress': { base: { default: { width: '100%', height: '8px', borderRadius: '99px', backgroundColor: '#334155', overflow: 'hidden' } } },
            'skeleton': { base: { default: { backgroundColor: '#334155', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' } }, variants: { 'text': { default: { height: '12px', width: '100%' } }, 'circle': { default: { borderRadius: '50%' } } } }
        },
        vars: {
            colors: { 'white': '#ffffff', 'black': '#000000', 'transparent': 'transparent', 'current': 'currentColor', 'slate': '#64748b', 'gray': '#6b7280', 'zinc': '#71717a', 'red': '#ef4444', 'orange': '#f97316', 'amber': '#f59e0b', 'green': '#22c55e', 'emerald': '#10b981', 'teal': '#14b8a6', 'cyan': '#06b6d4', 'sky': '#0ea5e9', 'blue': '#3b82f6', 'indigo': '#6366f1', 'violet': '#8b5cf6', 'purple': '#a855f7', 'fuchsia': '#d946ef', 'pink': '#ec4899', 'rose': '#f43f5e', 'light': '#f8fafc', 'dark': '#0f172a' },
            sides: { 'lft': 'Left', 'rgt': 'Right', 'up': 'Top', 'dwn': 'Bottom', 'x': 'x', 'y': 'y' },
            units: { 'px': 'px', 'p': '%', 'vh': 'vh', 'vw': 'vw', 'rem': 'rem', 'em': 'em', 'deg': 'deg' },
            fonts: { '1': '12px', '2': '14px', '3': '16px', '4': '18px', '5': '20px', '6': '24px', '7': '30px', '8': '36px', '9': '48px', '10': '60px', '11': '72px', '12': '96px' },
            fontFamilies: { 'sans': 'Inter, sans-serif', 'mono': 'monospace' },
            shadows: { 'sm': '0 1px 2px rgba(0,0,0,0.1)', 'md': '0 4px 6px -1px rgba(0,0,0,0.1)', 'lg': '0 10px 15px -3px rgba(0,0,0,0.1)', 'xl': '0 20px 25px -5px rgba(0,0,0,0.1)', '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)', 'none': 'none' },
            breakpoints: { 'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px' }
        }
    };

    const getUnit = (u) => config.vars.units[u] || u || 'px';
    const getSide = (s) => config.vars.sides[s] ? (config.vars.sides[s].length > 2 ? `-${config.vars.sides[s].toLowerCase()}` : '') : '';
    const parseColor = (parts, idx) => { if (parts[idx] === 'set') return { val: `#${parts[idx+1]}`, consumed: 2 }; return { val: config.vars.colors[parts[idx]] || parts[idx], consumed: 1 }; };
    const parseBorderLike = (parts, propName) => { let i = 0; const v = parts[i++], u = getUnit(parts[i++]), type = parts[i++]; const cObj = parseColor(parts, i); i += cObj.consumed; const s = parts[i]; if (s) { const sideName = config.vars.sides[s]; if (sideName) return { [`${propName}${sideName}`]: `${v}${u} ${type} ${cObj.val}` }; } return { [propName]: `${v}${u} ${type} ${cObj.val}` }; };
    function parseSpacing(prop, p) { const v = p[0]; if (v === 'auto') return { [prop]: 'auto' }; let u = 'px', s = ''; if(p.length > 1) { if(config.vars.units[p[1]] || p[1]==='p') { u=getUnit(p[1]); if(p[2]) s=p[2]; } else if(config.vars.sides[p[1]]) s=p[1]; } const val = `${v}${u}`; if (s === 'x') return { [`${prop}Left`]: val, [`${prop}Right`]: val }; if (s === 'y') return { [`${prop}Top`]: val, [`${prop}Bottom`]: val }; return { [`${prop}${getSide(s)}`]: val }; }

    const utilities = {
        'clr': (p) => ({ color: parseColor(p, 0).val }), 'bg': (p) => ({ backgroundColor: parseColor(p, 0).val }), 'op': (p) => ({ opacity: p[0] }),
        'mg': (p) => parseSpacing('margin', p), 'pd': (p) => parseSpacing('padding', p),
        'w': (p) => ({ width: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }), 'h': (p) => ({ height: p[0]==='auto'?'auto':`${p[0]}${getUnit(p[1])}` }), 'mw': (p) => ({ maxWidth: `${p[0]}${getUnit(p[1])}` }), 'minw': (p) => ({ minWidth: `${p[0]}${getUnit(p[1])}` }),
        'fs': (p) => p[0]==='set' ? ({fontSize: `${p[1]}${getUnit(p[2])}`}) : ({fontSize: config.vars.fonts[p[0]]}), 'fw': (p) => ({ fontWeight: p[0] }), 'sft': (p) => p[0]==='set' ? ({fontFamily: p.slice(1).join(' ')}) : ({fontFamily: config.vars.fontFamilies[p[0]]}), 'ta': (p) => ({ textAlign: p[0] }), 'tt': (p) => ({ textTransform: p[0] }), 'ls': (p) => ({ letterSpacing: `${p[0]}${getUnit(p[1])}` }), 'lh': (p) => ({ lineHeight: p[0] }),
        'bd': (p) => parseBorderLike(p, 'border'), 'out': (p) => parseBorderLike(p, 'outline'), 'br': (p) => { const v = `${p[0]}${getUnit(p[1])}`; const s = p[2]; if(!s) return { borderRadius: v }; if(s==='t') return { borderTopLeftRadius: v, borderTopRightRadius: v }; if(s==='b') return { borderBottomLeftRadius: v, borderBottomRightRadius: v }; if(s==='l') return { borderTopLeftRadius: v, borderBottomLeftRadius: v }; if(s==='r') return { borderTopRightRadius: v, borderBottomRightRadius: v }; return { borderRadius: v }; },
        'd': (p) => ({ display: p[0] }), 'pos': (p) => ({ position: p[0] }), 't': (p) => ({ top: `${p[0]}${getUnit(p[1])}` }), 'b': (p) => ({ bottom: `${p[0]}${getUnit(p[1])}` }), 'l': (p) => ({ left: `${p[0]}${getUnit(p[1])}` }), 'r': (p) => ({ right: `${p[0]}${getUnit(p[1])}` }), 'inset': (p) => ({ top: `${p[0]}${getUnit(p[1])}`, right: `${p[0]}${getUnit(p[1])}`, bottom: `${p[0]}${getUnit(p[1])}`, left: `${p[0]}${getUnit(p[1])}` }), 'z': (p) => ({ zIndex: p[0] }), 'ov': (p) => ({ overflow: p[0] }), 'ovx': (p) => ({ overflowX: p[0] }),
        'fx': (p) => { if(['row','column','col','wrap'].includes(p[0])) return p[0]==='wrap'?{flexWrap:'wrap'}:{flexDirection:p[0]==='col'?'column':p[0]}; return { flex: p[0] }; }, 'grow': (p) => ({ flexGrow: p[0]||'1' }), 'ai': (p) => ({ alignItems: p[0]==='center'?'center':(p[0]==='start'?'flex-start':(p[0]==='end'?'flex-end':p[0])) }), 'jc': (p) => ({ justifyContent: p[0]==='sb'?'space-between':(p[0]==='center'?'center':p[0]) }), 'gap': (p) => ({ gap: `${p[0]}${getUnit(p[1])}` }),
        'cols': (p) => ({ gridTemplateColumns: `repeat(${p[0]}, minmax(0, 1fr))` }), 'span': (p) => ({ gridColumn: `span ${p[0]} / span ${p[0]}` }),
        'sh': (p) => ({ boxShadow: p[0]==='set' ? p.slice(1).join(' ') : (config.vars.shadows[p[0]] || 'none') }), 'cursor': (p) => ({ cursor: p[0] }), 
        'blur': (p) => ({ filter: `blur(${p[0]}${getUnit(p[1])})` }), 'bblur': (p) => ({ backdropFilter: `blur(${p[0]}${getUnit(p[1])})`, WebkitBackdropFilter: `blur(${p[0]}${getUnit(p[1])})` }), 
        'scale': (p) => ({ transform: `scale(${p[0]/100})` }), 'rot': (p) => ({ transform: `rotate(${p[0]}deg)` }), 'trans': (p) => ({ transition: `all ${p[0]||'0.2'}s ease` }), 'fit': (p) => ({ objectFit: p[0] }),
        'tx': (p) => ({ transform: `translateX(${p[0]}${getUnit(p[1])})` }), 'ty': (p) => ({ transform: `translateY(${p[0]}${getUnit(p[1])})` }), 'tr': (p) => ({ transform: `translate(${p[0]}${getUnit(p[1])}, ${p[2]}${getUnit(p[3])})` }),
        'grad': (p) => { const map = { 'r':'right', 'b':'bottom', 'l':'left', 't':'top', 'br':'bottom right', 'bl':'bottom left', 'tr':'top right', 'tl':'top left' }; const c1 = parseColor(p, 1).val; const offset = p[1] === 'set' ? 3 : 2; const c2 = parseColor(p, offset).val; return { backgroundImage: `linear-gradient(to ${map[p[0]]||'right'}, ${c1}, ${c2})` }; }
    };

    const generated = new Set(); const styleTag = document.createElement('style'); styleTag.id = 'q-style-engine'; document.head.appendChild(styleTag);
    styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }`;

    function objToCss(obj, imp=false) { return Object.entries(obj).map(([k, v]) => { const key = k.replace(/([A-Z])/g, '-$1').toLowerCase(); return `${key}: ${v}${imp?' !important':''};`; }).join(' '); }
    function mergeDeep(t, s) { for(const k in s) if(typeof s[k]==='object') { if(!t[k])t[k]={}; mergeDeep(t[k], s[k]); } else t[k]=s[k]; }

    function generate(className) {
        if(generated.has(className)) return;
        let rawName = className, mediaQuery = null, pseudoState = "default";
        for (const bp in config.vars.breakpoints) { const prefix = `${bp}:`; if (rawName.startsWith(prefix)) { mediaQuery = `@media (min-width: ${config.vars.breakpoints[bp]})`; rawName = rawName.substring(prefix.length); break; } }
        if (rawName.startsWith('--')) { const idx = rawName.indexOf('-Q&'); if (idx !== -1) { pseudoState = `:${rawName.substring(2, idx)}`; rawName = rawName.substring(idx + 1); } }
        if (!rawName.startsWith('Q&')) return; rawName = rawName.substring(2);
        const parts = rawName.split('-'); const key = parts[0]; const args = parts.slice(1);
        let rules = {}, isUtil = false;
        if(config.components[key]) {
            const comp = config.components[key]; mergeDeep(rules, comp.base);
            args.forEach(a => { if(comp.variants&&comp.variants[a]) mergeDeep(rules,comp.variants[a]); if(comp.sizes&&comp.sizes[a]) mergeDeep(rules,comp.sizes[a]); });
            if(comp.sizes && Object.keys(comp.sizes).length > 0 && !args.some(a => comp.sizes[a])) { const defSize = comp.sizes['md'] || comp.sizes['2'] || Object.values(comp.sizes)[0]; if(defSize) mergeDeep(rules, defSize); }
        } else if(utilities[key]) { try { rules[pseudoState] = utilities[key](args); isUtil = true; } catch(e){} } else return;
        const safeClass = className.replace(/&/g, '\\&').replace(/\./g, '\\.').replace(/:/g, '\\:').replace(/%/g, '\\%');
        let cssStr = ''; for(const [st, styles] of Object.entries(rules)) { const sel = st==='default' ? `.${safeClass}` : `.${safeClass}${st}`; cssStr += `${sel} { ${objToCss(styles, isUtil)} }\n`; }
        if (mediaQuery) cssStr = `${mediaQuery} { ${cssStr} }`;
        styleTag.innerHTML += cssStr; generated.add(className);
    }

    function scan(root=document) { root.querySelectorAll('*').forEach(el => { if(el.classList) el.classList.forEach(c => { if (c.includes('Q&')) generate(c); }); }); }
    const observer = new MutationObserver(ms => ms.forEach(m => { if(m.type==='childList') m.addedNodes.forEach(n => { if(n.nodeType===1) { if(n.classList)n.classList.forEach(c=>{if(c.includes('Q&'))generate(c)}); scan(n); } }); else if(m.type==='attributes') m.target.classList.forEach(c=>{if(c.includes('Q&'))generate(c)}); }));
    const start = () => { scan(); observer.observe(document.body, {childList:true, subtree:true, attributes:true}); };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
