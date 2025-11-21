(function () {
    const styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    const sheet = styleEl.sheet;

    // Definicje klas
    const rules = {
        "cancel-1": `
            background: #ff4d4d;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
        `,
        "green-2": `
            background: #4caf50;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
        `,
        "rounded-lg": `
            border-radius: 12px;
        `,
        "text-big": `
            font-size: 20px;
            font-weight: bold;
        `
    };

    function applyCustomStyles() {
        document.querySelectorAll("[class*='Q&']").forEach(el => {
            el.classList.forEach(cls => {
                if (cls.startsWith("Q&")) {
                    const key = cls.substring(2);
                    if (rules[key]) {
                        sheet.insertRule(`.${CSS.escape(cls)} { ${rules[key]} }`, sheet.cssRules.length);
                    }
                }
            });
        });
    }

    // Uruchom natychmiast
    applyCustomStyles();

    // Ponownie uruchom jeśli elementy się pojawią dynamicznie
    new MutationObserver(applyCustomStyles)
        .observe(document.body, { childList: true, subtree: true });

})();
