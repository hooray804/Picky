// ==UserScript==
// @name         Picky
// @namespace    https://github.com/hooray804/Picky
// @version      1.0
// @description  A lightweight Web Element Inspector & CSS Selector Tool
// @author       hooray804
// @match        *://*/*
// @grant        none
// @updateURL    https://github.com/hooray804/Picky/raw/main/Picky.user.js
// @downloadURL  https://github.com/hooray804/Picky/raw/main/Picky.user.js
// @supportURL   https://github.com/hooray804/Picky/issues
// ==/UserScript==

(function() {
    'use strict';

    const P_ID = 'picky-tool';
    const P_HL = 'picky-hl';
    const P_ISO_B = 'picky-iso-body';
    const P_ISO_P = 'picky-iso-path';
    const P_SHIELD = 'picky-shield';

    let touchMoved = false;
    let initialTouchedEl = null;
    const MOVE_THRESHOLD = 15;

    if (document.getElementById(P_ID)) {
        window.Picky?.end();
    }

    const ICONS = {
        close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`,
        settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>`,
        modeCycle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"></path></svg>`,
        modeFull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-8h18v2H3v-2z"></path></svg>`,
        back: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path></svg>`,
        copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>`,
        parent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"></path></svg>`,
        child: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-6-6 1.41-1.41L12 13.17l4.59-4.58L18 10l-6 6z"></path></svg>`,
        eyeOpen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>`,
        eyeClosed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>`,
        reset: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg>`,
        code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg>`,
        dot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"></circle></svg>`,
    };

    const P = {
        ui: {},
        st: {
            el: null, rootEl: null, path: [], selInfo: { selector: '', root: document },
            view: 'initial', size: 'full', min: true, hidden: false, isolate: false,
            hiddenEls: [], origDisp: new Map(), matchCount: 0, autoClose: true, pos: 'bottom',
            cfg: {
                useId: true, useClasses: true, classCount: 2, useNthOfType: true,
                intelligentMode: true,
                unstableClasses: ['active', 'select', 'focus', 'open', 'js-', 'ui-', 'hover', 'disabled', 'checked', 'selected', '--is-', '_is-'],
                stableAttrs: ['data-testid', 'data-cy', 'data-test-id', 'data-test', 'name'],
                maxClimb: 7,
                shadowDomSupport: false
            }
        },
        
        getParent(el) {
            if (!el) return null;
            if (!this.st.cfg.shadowDomSupport) return el.parentElement;
            if (el.parentElement) return el.parentElement;
            const root = el.getRootNode();
            return (root instanceof ShadowRoot) ? root.host : null;
        },
        getChildren(el) {
            if (!el) return [];
            if (!this.st.cfg.shadowDomSupport || !el.shadowRoot) return Array.from(el.children);
            return Array.from(el.shadowRoot.children);
        },
        getElementFromPointDeep(x, y) {
            let element = document.elementFromPoint(x, y);
            while (element && element.shadowRoot) {
                const deeperElement = element.shadowRoot.elementFromPoint(x, y);
                if (deeperElement) { element = deeperElement; } 
                else { break; }
            }
            return element;
        },

        Modal: {
            el: null,
            show(title, content, isHtml = false) { this.hide(); const o = document.createElement('div'); o.className = 'picky-modal-overlay'; o.innerHTML = `<div class="picky-modal-content"><div class="picky-modal-header"><span class="picky-modal-title"></span><button class="picky-icon-button" data-action="closeModal">${ICONS.close}</button></div><div class="picky-modal-body"></div></div>`; o.querySelector('.picky-modal-title').textContent = title; const b = o.querySelector('.picky-modal-body'); if (isHtml) { b.innerHTML = content; } else { b.innerHTML = `<textarea readonly></textarea>`; b.querySelector('textarea').textContent = content; } document.body.appendChild(o); this.el = o; this.el.addEventListener('click', (e) => { if (e.target.closest('[data-action="closeModal"]') || e.target === this.el) { this.hide(); } }); setTimeout(() => this.el.classList.add('visible'), 10); },
            hide() { if (!this.el) return; this.el.classList.remove('visible'); setTimeout(() => { this.el?.remove(); this.el = null; }, 300); }
        },
        
        css(el) {
            const c = this.st.cfg; if (!el || el.nodeType !== 1) return { selector: '', root: document };
            const toolStateClasses = [P_HL, P_ISO_P];
            
            const rootNode = this.st.cfg.shadowDomSupport ? el.getRootNode() : document;
            const queryContext = rootNode === document ? document : rootNode;

            const getSelectorPath = (currentEl) => {
                const parts = []; let current = currentEl; let climbCount = 0;
                while (current && current.tagName && climbCount < c.maxClimb) {
                    if (this.st.cfg.shadowDomSupport && current === queryContext) break;

                    const tagName = current.tagName.toLowerCase();
                    if (tagName === 'body' || tagName === 'html') break;
                    let part = tagName;
                    
                    if (c.useClasses) {
                        const stableClasses = Array.from(current.classList).filter(cls =>
                            !toolStateClasses.includes(cls) &&
                            !(!cls || /\d{4,}/.test(cls) || /[a-f0-9]{6,}/i.test(cls) || c.unstableClasses.some(unstable => cls.toLowerCase().includes(unstable)))
                        ).slice(0, c.classCount);
                        if (stableClasses.length > 0) part += '.' + stableClasses.map(cls => CSS.escape(cls)).join('.');
                    }
                    
                    if (c.useNthOfType) {
                        const parent = this.getParent(current);
                        if (parent) {
                            const siblings = this.getChildren(parent);
                            const sameTagSiblings = siblings.filter(sib => sib.tagName === current.tagName);
                            if (sameTagSiblings.length > 1) {
                                const index = sameTagSiblings.indexOf(current) + 1;
                                if (index > 0) part += `:nth-of-type(${index})`;
                            }
                        }
                    }
                    parts.unshift(part);

                    if (c.intelligentMode) {
                        const tempSelector = parts.join(' > ');
                        try {
                            if (queryContext.querySelectorAll(tempSelector).length === 1) {
                                return parts.join(' > ');
                            }
                        } catch (e) {}
                    }
                    current = this.getParent(current);
                    climbCount++;
                }
                return parts.join(' > ');
            };
            
            if (c.intelligentMode) {
                if (c.useId && el.id) {
                    const id = el.id, escapedId = CSS.escape(id);
                    if (!/^\d+$/.test(id) && !id.startsWith('ember') && !id.includes(':')) {
                        try { if (queryContext.querySelectorAll(`#${escapedId}`).length === 1) return { selector: `#${escapedId}`, root: queryContext }; } catch (e) {}
                    }
                }
                for (const attr of c.stableAttrs) {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const selector = `[${attr}="${CSS.escape(val)}"]`;
                        try { if (queryContext.querySelectorAll(selector).length === 1) return { selector: selector, root: queryContext }; } catch (e) {}
                    }
                }
            } else {
                if (c.useId && el.id) {
                     const id = el.id, escapedId = CSS.escape(id);
                    if (!/^\d+$/.test(id) && !id.startsWith('ember') && !id.includes(':')) {
                        try { if (queryContext.querySelectorAll(`#${escapedId}`).length === 1) return { selector: `#${escapedId}`, root: queryContext }; } catch (e) {}
                    }
                }
            }
            
            return { selector: getSelectorPath(el), root: queryContext };
        },

        upd8() {
            if (!this.st.el) { this.st.matchCount = 0; return; }
            this.st.selInfo = this.css(this.st.el);
            const { selector, root } = this.st.selInfo;
            if (!selector) { this.st.matchCount = 0; return; }
            try { this.st.matchCount = root.querySelectorAll(selector).length; } catch (e) { this.st.matchCount = 0; }
            if (this.ui.match) this.ui.match.textContent = `${this.st.matchCount}개 일치`;
            if (this.ui.disp) {
                let displayText = selector;
                if (this.st.cfg.shadowDomSupport && root instanceof ShadowRoot) {
                    displayText += ` (in Shadow DOM)`;
                }
                this.ui.disp.textContent = displayText;
            }
        },
        cssInject() { const css = `:root{--pk-pri:#007aff;--pk-on-pri:#ffffff;--pk-pri-cont:#007aff;--pk-on-pri-cont:#ffffff;--pk-sec-cont:#e9e9eb;--pk-on-sec-cont:#1d1d1f;--pk-surf-var:#f0f0f2;--pk-on-surf-var:#333333;--pk-outl:#d1d1d6;--pk-surf:#f9f9f9;--pk-on-surf:#1d1d1f;--pk-succ:#34c759;--pk-err:#ff3b30}#${P_ID}{position:fixed;right:20px;z-index:2147483646;width:calc(100% - 24px);max-width:400px;background-color:rgba(248,248,248,.75);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,.15);border:1px solid rgba(0,0,0,.1);padding:12px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transition:transform .4s cubic-bezier(.4,0,.2,1),opacity .4s,top .4s,bottom .4s,width .3s,height .3s,border-radius .3s;user-select:none;-webkit-user-select:none}#${P_ID}.top{top:-200%;opacity:0}#${P_ID}.bottom{bottom:-200%;opacity:0}#${P_ID}.visible.top{top:12px;opacity:1}#${P_ID}.visible.bottom{bottom:12px;opacity:1}#${P_ID} .picky-icon-button{display:flex;align-items:center;justify-content:center;background:0 0;border:none;padding:4px;color:var(--pk-on-surf);cursor:pointer;border-radius:50%;transition:background-color .2s}#${P_ID} .picky-icon-button:hover{background-color:rgba(0,0,0,.08)}#${P_ID} .picky-icon-button svg{width:24px;height:24px;background:transparent!important;fill:currentColor!important;display:block;}#${P_ID} .picky-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;color:var(--pk-on-surf)}#${P_ID} .picky-header-title{font-size:16px;font-weight:600}#${P_ID} .picky-header-actions{display:flex;gap:8px}#${P_ID} .picky-selector-box{background-color:var(--pk-surf-var);padding:8px 12px;border-radius:12px;margin-bottom:12px}#${P_ID} .picky-selector-box-title{font-size:11px;color:var(--pk-on-surf-var);margin-bottom:4px;display:flex;justify-content:space-between}#${P_ID} .picky-selector-display{font-family:'SF Mono','Menlo',monospace;font-size:12px;color:var(--pk-on-surf);word-break:break-all;max-height:7em;overflow-y:auto}#${P_ID} .picky-button-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(60px,1fr));gap:8px}#${P_ID} hr{border:none;border-top:1px solid var(--pk-surf-var);margin:10px 0}#${P_ID} button{padding:8px 10px;border:none;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;background-color:var(--pk-sec-cont);color:var(--pk-on-sec-cont);transition:background-color .2s,transform .1s;display:flex;align-items:center;justify-content:center;gap:4px}#${P_ID} button:active{transform:scale(.96)}#${P_ID} button.primary{background-color:var(--pk-pri-cont);color:var(--pk-on-pri-cont)}#${P_ID} button.copied{background-color:var(--pk-succ);color:#fff}#${P_ID}.minimized{width:28px;height:28px;border-radius:50%;padding:0;cursor:pointer}#${P_ID}.minimized .picky-content{display:none}#${P_ID} .picky-maximize-button{display:none}#${P_ID}.minimized .picky-maximize-button{display:flex;width:100%;height:100%;align-items:center;justify-content:center}#${P_ID}.minimal{padding:6px;height:auto}#${P_ID}.minimal .picky-content{display:flex;justify-content:space-around;gap:4px}#${P_ID}.minimal button{background:0 0}#${P_ID}.minimal button:hover{background-color:rgba(0,0,0,.08)}.${P_HL}{outline:2px dotted #ff453a!important;outline-offset:2px;box-shadow:0 0 0 9999px rgba(0,0,0,.4)!important;transition:outline .1s,box-shadow .1s}body.${P_ISO_B} > *:not(#${P_ID}):not(.picky-modal-overlay){visibility:hidden!important}body.${P_ISO_B} .${P_ISO_P}{visibility:visible!important}body.${P_ISO_B} .${P_ISO_P} * {visibility:visible!important}#${P_SHIELD}{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483645;background:transparent;display:none}#${P_ID} .picky-setting-item,#${P_ID} .picky-setting-item span{color:var(--pk-on-surf)}#${P_ID} .picky-setting-title{font-weight:500;font-size:15px;margin:12px 0 8px;color:var(--pk-on-surf)}#${P_ID} .picky-setting-item{display:flex;justify-content:space-between;align-items:center;padding:8px 4px;border-bottom:1px solid var(--pk-surf-var)}#${P_ID} .picky-switch{position:relative;display:inline-block;width:44px;height:24px}#${P_ID} .picky-switch input{opacity:0;width:0;height:0}#${P_ID} .picky-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--pk-outl);transition:.4s;border-radius:24px}#${P_ID} .picky-slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background-color:#fff;transition:.4s;border-radius:50%}#${P_ID} input:checked+.picky-slider{background-color:var(--pk-pri)}#${P_ID} input:checked+.picky-slider:before{transform:translateX(20px)}.picky-modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:2147483647;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);opacity:0;transition:opacity .3s}.picky-modal-overlay.visible{opacity:1}.picky-modal-content{position:fixed;top:50%;left:50%;width:calc(100% - 32px);max-width:600px;max-height:80vh;background-color:var(--pk-surf);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.4);display:flex;flex-direction:column;opacity:0;transform:translate(-50%,-45%);transition:opacity .3s,transform .3s}.picky-modal-overlay.visible .picky-modal-content{opacity:1;transform:translate(-50%,-50%)}.picky-modal-header{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--pk-outl);flex-shrink:0}.picky-modal-title{font-size:16px;font-weight:600;color:var(--pk-on-surf);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.picky-modal-body{padding:16px;overflow-y:auto}.picky-modal-body textarea{width:100%;height:50vh;background:var(--pk-surf-var);border:none;border-radius:8px;color:var(--pk-on-surf);font-family:'SF Mono',monospace;font-size:12px;padding:8px;box-sizing:border-box;resize:vertical}.picky-child-list,.picky-cookie-table{list-style:none;padding:0;margin:0;width:100%;border-collapse:collapse}.picky-child-list li{padding:10px;border-bottom:1px solid var(--pk-outl);cursor:pointer;transition:background-color .2s;font-family:'SF Mono',monospace;font-size:12px;color:var(--pk-on-surf-var)}.picky-child-list li:hover{background-color:var(--pk-surf-var)}.picky-child-list li:last-child{border-bottom:none}.picky-cookie-table th,.picky-cookie-table td{padding:8px;text-align:left;border-bottom:1px solid var(--pk-outl);font-size:12px}.picky-cookie-table th{color:var(--pk-on-surf);font-weight:600}.picky-cookie-table td{color:var(--pk-on-surf-var);word-break:break-all}.picky-cookie-table .cookie-actions{display:flex;gap:8px}.picky-cookie-table .cookie-actions button{padding:4px 8px;font-size:11px;border-radius:8px}.picky-cookie-table .cookie-actions button.delete{background-color:var(--pk-err);color:#fff}#picky-nav-slider-container{padding:8px 0}#picky-nav-slider{width:100%;-webkit-appearance:none;appearance:none;background:var(--pk-outl);height:5px;border-radius:3px;outline:none;cursor:pointer}#picky-nav-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;background:var(--pk-pri);border-radius:50%;cursor:pointer}#picky-nav-slider::-moz-range-thumb{width:22px;height:22px;background:var(--pk-pri);border-radius:50%;cursor:pointer}.picky-code-tabs{display:flex;border-bottom:1px solid var(--pk-outl);margin-bottom:12px}.picky-code-tab{padding:8px 16px;cursor:pointer;color:var(--pk-on-surf-var);border-bottom:2px solid transparent}.picky-code-tab.active{color:var(--pk-pri);border-bottom-color:var(--pk-pri)}.picky-code-panel{display:none}.picky-code-panel.active{display:block}.picky-code-panel pre{white-space:pre-wrap;word-break:break-all;font-family:'SF Mono',monospace;font-size:12px;padding:8px;background:var(--pk-surf-var);border-radius:8px;max-height:50vh;overflow:auto}`; const style = document.createElement('style'); style.id = `${P_ID}-style`; style.textContent = css; document.head.appendChild(style); },
        injectStylesIntoShadowRoots() {
            const styleContent = document.getElementById(`${P_ID}-style`)?.textContent;
            if (!styleContent) return;
            document.querySelectorAll('*').forEach(el => {
                if (el.shadowRoot && !el.shadowRoot.getElementById(`${P_ID}-style`)) {
                    const style = document.createElement('style');
                    style.id = `${P_ID}-style`;
                    style.textContent = styleContent;
                    el.shadowRoot.appendChild(style);
                }
            });
        },
        
        build() {
            this.ui.tool = document.createElement('div'); this.ui.tool.id = P_ID; this.ui.tool.className = this.st.pos; document.body.appendChild(this.ui.tool);
            this.ui.shield = document.createElement('div'); this.ui.shield.id = P_SHIELD; document.body.appendChild(this.ui.shield);
            this.ui.tool.addEventListener('click', this.act.bind(this));
            this.draw();
            setTimeout(() => this.ui.tool.classList.add('visible'), 50);
        },
        
        draw() {
            const tool = this.ui.tool; if (!tool) return;
            tool.classList.toggle('minimized', this.st.min); tool.classList.toggle('minimal', !this.st.min && this.st.size === 'minimal');
            tool.classList.remove('full'); if (!this.st.min && this.st.size === 'full') tool.classList.add('full');
            this.ui.shield.style.display = (this.st.view === 'initial' || this.st.view === 'selected') && !this.st.min ? 'block' : 'none';
            let content = '';
            if (this.st.min) { content = `<button class="picky-maximize-button picky-icon-button" data-action="cycleSize">${ICONS.dot}</button>`; }
            else if (this.st.size === 'minimal') { content = `<div class="picky-content">${this.viewMin()}</div>`; }
            else { content = `<div class="picky-content">${this.viewFull()}</div>`; }
            tool.innerHTML = content; if (this.st.view === 'selected') { this.bindEls(); this.upd8(); }
        },
        
        viewFull() { switch(this.st.view) { case 'selected': return this.viewSel(); case 'settings': return this.viewSet(); default: return `<div class="picky-header"><div class="picky-header-title">요소 선택기</div><div class="picky-header-actions"><button class="picky-icon-button" data-action="close">${ICONS.close}</button></div></div><div style="text-align:center; color: var(--pk-on-surf-var); padding: 16px 0;">페이지에서 요소를 탭/클릭하세요...</div>`; } },
        viewSel() { const s = this.getSliderCfg(); const slider = `<div id="picky-nav-slider-container"><label for="picky-nav-slider" style="font-size:11px; color:var(--pk-on-surf-var)">요소 탐색 (상위 ← → 하위)</label><input type="range" id="picky-nav-slider" min="${s.min}" max="${s.max}" value="${s.val}"></div>`; return `<div class="picky-header"><div class="picky-header-title">요소 선택됨</div><div class="picky-header-actions"><button class="picky-icon-button" data-action="inspectCode" title="연관 코드 보기">${ICONS.code}</button><button class="picky-icon-button" data-action="showSettings" title="설정">${ICONS.settings}</button><button class="picky-icon-button" data-action="cycleSize" title="모드 전환">${ICONS.modeCycle}</button><button class="picky-icon-button" data-action="close" title="닫기">${ICONS.close}</button></div></div><div class="picky-selector-box"><div class="picky-selector-box-title"><span>CSS 선택자</span><span class="picky-match-count"></span></div><div class="picky-selector-display"></div></div>${slider}<div class="picky-button-grid" style="grid-template-columns: repeat(5, 1fr); margin-top: 10px; gap: 6px;"><button data-action="selParent">상위</button><button data-action="selChild">하위</button><button data-action="toggleHide">${this.st.hidden?'복원':'숨김'}</button><button data-action="toggleIsolate">${this.st.isolate?'해제':'격리'}</button><button data-action="selSimilar">유사</button><button data-action="extractUrl">URL</button><button data-action="extractAttr">속성</button><button data-action="copyCSS" class="primary">CSS</button><button data-action="copyRule" class="primary">규칙</button><button data-action="reset">초기화</button></div>`; },
        viewMin() { return `<button class="picky-icon-button" data-action="selParent" title="상위">${ICONS.parent}</button><button class="picky-icon-button" data-action="selChild" title="하위">${ICONS.child}</button><button class="picky-icon-button" data-action="toggleHide" title="${this.st.hidden ? '복원' : '숨김'}">${this.st.hidden ? ICONS.eyeOpen : ICONS.eyeClosed}</button><button class="picky-icon-button" data-action="copyCSS" title="CSS">${ICONS.copy}</button><button class="picky-icon-button" data-action="reset" title="초기화">${ICONS.reset}</button><button class="picky-icon-button" data-action="cycleSize" title="전체 모드">${ICONS.modeFull}</button>`; },
        viewSet() { const c = this.st.cfg; const manual = c.intelligentMode ? 'style="display:none;"' : ''; return `<div class="picky-header"><button class="picky-icon-button" data-action="showSelected">${ICONS.back}</button><div class="picky-header-title">설정</div><div class="picky-header-actions"><button class="picky-icon-button" data-action="showSelected">${ICONS.close}</button></div></div><div class="picky-setting-item"><span>복사 후 자동 닫기</span><label class="picky-switch"><input type="checkbox" data-action="toggleAutoClose" ${this.st.autoClose ? 'checked' : ''}><span class="picky-slider"></span></label></div><div class="picky-setting-title">선택자 생성 규칙</div><div class="picky-setting-item"><span>지능형 모드</span><label class="picky-switch"><input type="checkbox" data-cfg-key="intelligentMode" ${c.intelligentMode ? 'checked' : ''}><span class="picky-slider"></span></label></div><div class="picky-manual-settings" ${manual}><div class="picky-setting-item"><span>ID 사용 (#id)</span><label class="picky-switch"><input type="checkbox" data-cfg-key="useId" ${c.useId ? 'checked' : ''}><span class="picky-slider"></span></label></div><div class="picky-setting-item"><span>클래스 사용 (.class)</span><label class="picky-switch"><input type="checkbox" data-cfg-key="useClasses" ${c.useClasses ? 'checked' : ''}><span class="picky-slider"></span></label></div><div class="picky-setting-item"><span>순서 사용 (:nth-of-type)</span><label class="picky-switch"><input type="checkbox" data-cfg-key="useNthOfType" ${c.useNthOfType ? 'checked' : ''}><span class="picky-slider"></span></label></div></div><div class="picky-setting-title">고급 기능</div><div class="picky-setting-item"><span>Shadow DOM 호환성</span><label class="picky-switch"><input type="checkbox" data-cfg-key="shadowDomSupport" ${c.shadowDomSupport ? 'checked' : ''}><span class="picky-slider"></span></label></div><div class="picky-setting-title">개발자 도구</div><div class="picky-button-grid" style="grid-template-columns: 1fr 1fr;"><button data-action="showSource" data-type="html">HTML</button><button data-action="showSource" data-type="css">CSS</button><button data-action="showSource" data-type="js">JS</button><button data-action="showCookies">쿠키</button></div><div class="picky-button-grid" style="margin-top:8px;"><button data-action="showFp" style="grid-column: 1 / -1;">핑거프린팅 정보</button></div><div class="picky-setting-title">UI 위치</div><div class="picky-button-grid" style="grid-template-columns: 1fr 1fr; margin-top: 8px;"><button data-action="moveTop">상단으로 이동</button><button data-action="moveBottom">하단으로 이동</button></div>`; },

        bindEls() { this.ui.disp = this.ui.tool.querySelector('.picky-selector-display'); this.ui.match = this.ui.tool.querySelector('.picky-match-count'); this.ui.slider = this.ui.tool.querySelector('#picky-nav-slider'); if(this.ui.slider) this.ui.slider.addEventListener('input', this.onSlide.bind(this)); },
        buildPath(el) { this.st.path = []; let curr = el; while (curr && curr.tagName !== 'BODY') { this.st.path.unshift(curr); curr = this.getParent(curr); } },
        getSliderCfg() { const p = this.st.path; if (!p.length) return { min: 0, max: 0, val: 0 }; const rootIdx = p.indexOf(this.st.rootEl); const children = this.getChildren(this.st.rootEl); const currIdx = this.st.el === this.st.rootEl ? rootIdx : (p.includes(this.st.el) ? p.indexOf(this.st.el) : rootIdx + 1 + children.indexOf(this.st.el)); return { min: 0, max: rootIdx + children.length, val: currIdx }; },
        onSlide(e) {
            const val = parseInt(e.target.value, 10); const p = this.st.path; const rootIdx = p.indexOf(this.st.rootEl);
            let newEl = val <= rootIdx ? p[val] : this.getChildren(this.st.rootEl)[val - rootIdx - 1];
            if (newEl && newEl !== this.st.el) { this.unhl(this.st.el); this.st.el = newEl; this.hl(this.st.el); this.upd8(); }
        },
        onPick(e) {
            if (this.st.min) return;
            const realTarget = e.target.id === P_SHIELD ? this.getRealTarget(e) : e.composedPath()[0];
            if (!realTarget || realTarget.closest(`#${P_ID}, .picky-modal-overlay`)) return;
            e.preventDefault(); e.stopImmediatePropagation();
            if (this.st.view === 'initial' || this.st.view === 'selected') {
                this.unhl(this.st.el); this.st.el = realTarget; this.st.rootEl = realTarget; this.buildPath(realTarget); this.hl(this.st.el); this.st.view = 'selected';
                if (this.st.cfg.shadowDomSupport) { this.injectStylesIntoShadowRoots(); }
                this.draw();
            }
        },
        getRealTarget(e) {
            const touch = e.touches?.[0] || e.changedTouches?.[0] || e;
            const prevDisplay = this.ui.shield.style.display;
            this.ui.shield.style.display = 'none';
            const target = this.st.cfg.shadowDomSupport ? this.getElementFromPointDeep(touch.clientX, touch.clientY) : document.elementFromPoint(touch.clientX, touch.clientY);
            this.ui.shield.style.display = prevDisplay;
            return target;
        },
        onSelStart(e) { if (e.target.closest(`#${P_ID}`)) return; initialTouchedEl = this.getRealTarget(e); touchMoved = false; },
        onSelMove(e) { if (touchMoved || !initialTouchedEl) return; const t = e.touches[0]; const rect = initialTouchedEl.getBoundingClientRect(); const dx = t.clientX - rect.left; const dy = t.clientY - rect.top; if (Math.sqrt(dx*dx + dy*dy) > MOVE_THRESHOLD) touchMoved = true; },
        onSelEnd(e) { 
            if (this.st.min) return;
            if (touchMoved || e.target.closest(`#${P_ID}`)) return; 
            const realTarget = this.getRealTarget(e); 
            this.onPick({ target: realTarget, composedPath: () => [realTarget], preventDefault: e.preventDefault, stopImmediatePropagation: e.stopImmediatePropagation }); 
        },
        act(e) {
            const t = e.target, aT = t.closest('[data-action]'), cT = t.closest('[data-cfg-key]');
            if (cT) {
                const k = cT.dataset.cfgKey;
                if (typeof this.st.cfg[k] === 'boolean') { this.st.cfg[k] = cT.checked; }
                if (k === 'shadowDomSupport' && cT.checked) this.injectStylesIntoShadowRoots();
                if (k === 'intelligentMode') this.ui.tool.querySelector('.picky-manual-settings').style.display = cT.checked ? 'none' : 'block';
                this.upd8(); return;
            }
            if (!aT) return; const act = aT.dataset.action, type = aT.dataset.type;
            const actions = {
                close: () => this.end(false),
                cycleSize: () => { if (this.st.min) { this.st.min = false; this.st.size = 'full'; } else if (this.st.size === 'full') { this.st.size = 'minimal'; } else { this.st.min = true; } this.draw(); },
                showSettings: () => { this.st.view = 'settings'; this.draw(); },
                showSelected: () => { this.st.view = 'selected'; this.draw(); },
                reset: () => { this.cleanup(); this.unhl(this.st.el); this.st.el = null; this.st.rootEl = null; this.st.path = []; this.st.view = 'initial'; this.st.size = 'full'; this.st.min = false; this.draw(); },
                selParent: () => { this.cleanup(); const p = this.getParent(this.st.el); if (p && p.tagName?.toLowerCase() !== 'body' && p.tagName?.toLowerCase() !== 'html') { this.unhl(this.st.el); this.st.el = p; this.hl(this.st.el); if (!this.st.path.includes(p)) this.buildPath(this.st.rootEl); this.upd8(); this.draw(); } },
                selChild: () => this.showChildSel(),
                selSimilar: () => { const selInfo = this.css(this.st.el); const s = selInfo.selector.replace(/:nth-of-type\(\d+\)/g, ''); if (this.ui.disp) this.ui.disp.textContent = s + (selInfo.root instanceof ShadowRoot ? ' (in Shadow DOM)' : ''); this.upd8(); },
                toggleHide: () => { const { selector, root } = this.st.selInfo; if (!selector) return; if (this.st.hidden) this.restoreHidden(); else this.applyHide(selector, root); this.draw(); },
                toggleIsolate: () => this.toggleIso(),
                copyCSS: () => this.copy(false),
                copyRule: () => this.copy(true),
                toggleAutoClose: () => { this.st.autoClose = t.checked; },
                moveTop: () => this.move('top'), moveBottom: () => this.move('bottom'),
                extractUrl: () => this.getUrl(), extractAttr: () => this.getAttr(),
                inspectCode: () => this.showCodeInspector(),
                showSource: () => this.showSrc(type), showCookies: () => this.showCookies(), showFp: () => this.showFp(),
            };
            if (actions[act]) actions[act]();
        },
        
        hl(el) { el?.classList.add(P_HL); }, unhl(el) { el?.classList.remove(P_HL); },
        cleanup() { this.restoreHidden(); if(this.st.isolate) this.toggleIso(true); },
        applyHide(selector, root) { try { this.st.hiddenEls = Array.from(root.querySelectorAll(selector)); this.st.hiddenEls.forEach(el => { if (!this.st.origDisp.has(el)) this.st.origDisp.set(el, el.style.display || ''); el.style.display = 'none'; }); this.st.hidden = true; } catch(e) {} },
        restoreHidden() { this.st.hiddenEls.forEach(el => { if (this.st.origDisp.has(el)) el.style.display = this.st.origDisp.get(el); }); this.st.hiddenEls = []; this.st.origDisp.clear(); this.st.hidden = false; },
        toggleIso(forceOff = false) {
            this.st.isolate = forceOff ? false : !this.st.isolate;
            document.querySelectorAll(`.${P_ISO_P}`).forEach(el => el.classList.remove(P_ISO_P));
            if (this.st.isolate && this.st.el) {
                let current = this.st.el;
                while(current) { current.classList.add(P_ISO_P); current = this.getParent(current); }
                document.body.classList.add(P_ISO_B);
            } else { document.body.classList.remove(P_ISO_B); }
            this.draw();
        },
        copy(asRule = false) {
            const { selector, root } = this.st.selInfo; if (!selector) return;
            if (this.st.cfg.shadowDomSupport && root instanceof ShadowRoot) { alert("Shadow DOM 내부의 선택자는 복사되지만, 전역 스타일시트나 광고 차단 규칙에서는 작동하지 않을 수 있습니다. 개발자 도구의 해당 컴포넌트 내부에서 사용해야 합니다."); }
            let text = asRule ? `${window.location.hostname}##${selector}` : selector;
            navigator.clipboard.writeText(text).then(() => { const b = this.ui.tool.querySelector(asRule ? '[data-action="copyRule"]' : '[data-action="copyCSS"]'); if (!b) return; const o = b.innerHTML; b.textContent = '복사 완료!'; b.classList.add('copied'); setTimeout(() => { if (this.st.autoClose) this.end(false); else { b.innerHTML = o; b.classList.remove('copied'); } }, 1200); }).catch(() => { prompt('복사 실패:', text); if (this.st.autoClose) this.end(false); });
        },
        move(pos) { this.st.pos = pos; this.ui.tool.className = `${pos} visible`; },
        getUrl() { let el = this.st.el, url = null; for (let i = 0; i < 5 && el; i++) { url = el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('data-original'); if (url) break; const bg = window.getComputedStyle(el).backgroundImage; if (bg?.includes('url')) { url = bg.match(/url\(['"]?(.*?)['"]?\)/)[1]; if(url) break; } el = this.getParent(el); } if (url) prompt("추출된 URL:", new URL(url, window.location.href).href); else alert("URL을 찾을 수 없습니다."); },
        getAttr() { const a = prompt('추출할 속성 이름 입력 (예: data-id, alt):'); if (!a) return; const v = this.st.el?.getAttribute(a); if (v !== null) prompt(`'${a}' 속성 값:`, v); else alert(`'${a}' 속성을 찾을 수 없습니다.`); },
        showChildSel() {
            const children = this.getChildren(this.st.el); if (!children || children.length === 0) { alert('하위 요소가 없습니다.'); return; }
            const items = children.map((c, i) => { const t = c.tagName.toLowerCase(), id = c.id ? `#${c.id}` : '', cls = c.className ? `.${String(c.className).split(' ').filter(Boolean).join('.')}` : ''; return `<li data-idx="${i}">${t}${id}${cls}</li>`; }).join('');
            this.Modal.show('하위 요소 선택', `<ul class="picky-child-list">${items}</ul>`, true);
            this.Modal.el.querySelector('.picky-child-list').addEventListener('click', (e) => {
                const t = e.target.closest('li[data-idx]'); if (!t) return; const i = parseInt(t.dataset.idx, 10), n = children[i];
                if (n) { this.unhl(this.st.el); this.st.el = n; this.hl(this.st.el); this.upd8(); } this.Modal.hide();
            });
        },
        showCodeInspector() {
            if (!this.st.el) return; const el = this.st.el; const toolClasses = [P_HL, P_ISO_P];
            const getRelatedHTML = () => {
                const cleanEl = el.cloneNode(true);
                cleanEl.classList.remove(...toolClasses);
                cleanEl.querySelectorAll(toolClasses.map(c => `.${c}`).join(', ')).forEach(child => child.classList.remove(...toolClasses));
                let formattedHtml = cleanEl.outerHTML;
                let indentedHtml = '';
                let indentLevel = 0;
                const indentSize = 2;

                formattedHtml.split(/(?=<)/).forEach(line => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return;
                    if (trimmedLine.startsWith('</')) indentLevel--;
                    if (indentLevel < 0) indentLevel = 0;
                    indentedHtml += ' '.repeat(indentLevel * indentSize) + trimmedLine + '\n';
                    if (trimmedLine.startsWith('<') && !trimmedLine.startsWith('</') && !trimmedLine.endsWith('/>')) indentLevel++;
                });
                return indentedHtml.trim();
            };
            const getRelatedCSS = () => {
                let cssText = `/* --- 인라인 스타일 --- */\n`;
                cssText += el.style.cssText ? `${this.css(el).selector} {\n  ${el.style.cssText.replace(/; /g, ';\n  ')}\n}\n\n` : '없음\n\n';
                cssText += `/* --- 계산된 스타일 (기본값 제외) --- */\n`;
                let computedStylesText = '';
                try {
                    const computed = window.getComputedStyle(el);
                    const defaultStyles = window.getComputedStyle(document.createElement(el.tagName));
                    const props = new Set();
                    for(let i=0; i<computed.length; i++) props.add(computed[i]);
                    ['font', 'background', 'padding', 'margin', 'border'].forEach(p => props.add(p));

                    for (const prop of Array.from(props).sort()) {
                        const value = computed.getPropertyValue(prop);
                        if (value && value !== defaultStyles.getPropertyValue(prop)) {
                            if (prop.startsWith('-') || ['width', 'height', 'top', 'left', 'right', 'bottom'].some(s => prop.includes(s))) continue;
                            computedStylesText += `  ${prop}: ${value};\n`;
                        }
                    }
                } catch(e) { }
                
                return cssText + (computedStylesText ? `${this.css(el).selector} {\n${computedStylesText}}\n` : '추가적인 계산된 스타일 없음\n');
            };
            const getRelatedJS = () => { let jsText = `/* --- 인라인 이벤트 핸들러 --- */\n`; let hasInline = false; for (const attr of el.attributes) { if (attr.name.startsWith('on')) { jsText += `${attr.name}="${attr.value}"\n`; hasInline = true; } } if (!hasInline) jsText += '없음\n'; jsText += `\n/* --- 인라인 스크립트 연관 코드 (ID/클래스 기반 검색) --- */\n`; let foundScripts = ''; const searchTerms = [el.id, ...Array.from(el.classList).filter(c => !toolClasses.includes(c))].filter(Boolean); if (searchTerms.length > 0) { const regex = new RegExp(searchTerms.map(t => CSS.escape(t)).join('|'), 'i'); document.querySelectorAll('script:not([src])').forEach((script, i) => { if (regex.test(script.innerHTML)) { foundScripts += `\n// 인라인 스크립트 #${i+1} 에서 발견:\n${script.innerHTML.substring(0, 1000).trim()}...\n`; } }); } jsText += (foundScripts || '없음\n'); jsText += `\n/* 외부 스크립트나 동적 이벤트 리스너는 개발자 도구에서 확인해야 합니다. */`; return jsText; };
            const content = `<div class="picky-code-tabs"><div class="picky-code-tab active" data-tab="html">HTML</div><div class="picky-code-tab" data-tab="css">CSS</div><div class="picky-code-tab" data-tab="js">JS</div></div><div class="picky-code-panel active" data-panel="html"><pre>${getRelatedHTML().replace(/</g, '&lt;')}</pre></div><div class="picky-code-panel" data-panel="css"><pre>${getRelatedCSS().replace(/</g, '&lt;')}</pre></div><div class="picky-code-panel" data-panel="js"><pre>${getRelatedJS().replace(/</g, '&lt;')}</pre></div>`; this.Modal.show('연관 코드 검사기', content, true); const modal = this.Modal.el; modal.querySelectorAll('.picky-code-tab').forEach(tab => { tab.addEventListener('click', () => { modal.querySelector('.picky-code-tab.active').classList.remove('active'); modal.querySelector('.picky-code-panel.active').classList.remove('active'); tab.classList.add('active'); modal.querySelector(`.picky-code-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active'); }); });
        },
        showSrc(type) { let t = '', c = ''; switch(type) { case 'html': t = 'HTML (현재 DOM)'; c = document.documentElement.outerHTML; break; case 'css': t = 'CSS (내부 스타일)'; c = `/* 동일 출처 스타일시트와 인라인 스타일만 표시됩니다. */\n\n`; Array.from(document.styleSheets).forEach(s => { try { if (!s.href || s.href.startsWith(location.origin)) { c += `/* --- ${s.href || 'Inline'} --- */\n`; Array.from(s.cssRules).forEach(r => c += r.cssText + '\n'); } } catch (e) {} }); break; case 'js': t = 'JavaScript (원본 형식)'; c = `/* 페이지에 로드된 스크립트 목록입니다. */\n\n`; Array.from(document.scripts).forEach((s, i) => { c += s.src ? `<!-- 외부 #${i+1}: ${s.src} -->\n<script src="${s.src}"></script>\n\n` : `<!-- 인라인 #${i+1} -->\n<script>${s.innerHTML}</script>\n\n`; }); break; } this.Modal.show(t, c); },
        showCookies() { const getCookies = () => document.cookie.split(';').filter(Boolean).map(c => { const parts = c.trim().split('='); return { name: parts[0], value: decodeURIComponent(parts.slice(1).join('=')) }; }); const render = () => { const cookies = getCookies(); if (cookies.length === 0) { return '표시할 쿠키가 없습니다 (HttpOnly 쿠키는 접근 불가).'; } const rows = cookies.map(c => `<tr><td>${c.name}</td><td>${c.value}</td><td class="cookie-actions"><button data-cookie-name="${c.name}" data-action="editCookie">수정</button><button data-cookie-name="${c.name}" data-action="deleteCookie" class="delete">삭제</button></td></tr>`).join(''); return `<p style="font-size:11px; color:var(--pk-on-surf-var); margin-bottom:10px;">HttpOnly 플래그가 설정된 쿠키는 보안 정책상 표시되지 않습니다.</p><table class="picky-cookie-table"><thead><tr><th>Name</th><th>Value</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table>`; }; this.Modal.show('쿠키 정보', render(), true); this.Modal.el.querySelector('.picky-modal-body').addEventListener('click', e => { const btn = e.target.closest('button[data-cookie-name]'); if (!btn) return; const name = btn.dataset.cookieName, action = btn.dataset.action; if (action === 'editCookie') { const current = getCookies().find(c => c.name === name)?.value || ''; const newValue = prompt(`'${name}' 쿠키의 새 값을 입력하세요:`, current); if (newValue !== null) { document.cookie = `${name}=${encodeURIComponent(newValue)};path=/;max-age=31536000`; this.Modal.el.querySelector('.picky-modal-body').innerHTML = render(); } } else if (action === 'deleteCookie') { if (confirm(`'${name}' 쿠키를 삭제하시겠습니까?`)) { document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`; this.Modal.el.querySelector('.picky-modal-body').innerHTML = render(); } } }); },
        showFp() { let c = "--- 브라우저/시스템 ---\n"; try { c += `User Agent: ${navigator.userAgent}\n언어: ${navigator.language}\n시간대: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n스레드 수: ${navigator.hardwareConcurrency || 'N/A'}\n메모리(GB): ${navigator.deviceMemory || 'N/A'}\n\n--- 화면 ---\n`; c += `해상도: ${screen.width}x${screen.height}\n사용 가능: ${screen.availWidth}x${screen.availHeight}\n색상 깊이: ${screen.colorDepth}\n픽셀 비율: ${devicePixelRatio}\n\n--- 렌더링 ---\n`; const gl = document.createElement('canvas').getContext('webgl'); const dbg = gl.getExtension('WEBGL_debug_renderer_info'); c += `WebGL 벤더: ${gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)}\nWebGL 렌더러: ${gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)}\n\n`; } catch (e) {} c += "--- 네트워크 (Performance API) ---\n"; const r = performance.getEntriesByType('resource'); c += `${r.length}개 리소스 요청됨.\n\n`; r.slice(0, 20).forEach(res => { c += `[${res.initiatorType}] ${res.name} (${Math.round(res.duration)}ms)\n`; }); this.Modal.show('핑거프린팅 정보', c); },
        
        run() {
            this.b = { 
                onPick: this.onPick.bind(this), 
                onSelStart: this.onSelStart.bind(this), 
                onSelMove: this.onSelMove.bind(this), 
                onSelEnd: this.onSelEnd.bind(this) 
            };
            this.cssInject(); this.build();
            document.addEventListener('click', this.b.onPick, { capture: true });
            document.addEventListener('touchstart', this.b.onSelStart, { capture: true, passive: true });
            document.addEventListener('touchmove', this.b.onSelMove, { capture: true, passive: true });
            document.addEventListener('touchend', this.b.onSelEnd, { capture: true });
            window.Picky = this;
        },
        end(restore = true) {
            if (restore) this.cleanup();
            document.removeEventListener('click', this.b.onPick, { capture: true });
            document.removeEventListener('touchstart', this.b.onSelStart, { capture: true });
            document.removeEventListener('touchmove', this.b.onSelMove, { capture: true });
            document.removeEventListener('touchend', this.b.onSelEnd, { capture: true });
            this.ui.tool?.classList.remove('visible'); this.Modal.hide();
            setTimeout(() => { document.getElementById(P_ID)?.remove(); document.getElementById(`${P_ID}-style`)?.remove(); document.getElementById(P_SHIELD)?.remove(); this.unhl(document.querySelector(`.${P_HL}`)); }, 400);
            delete window.Picky;
        },
    };
    
    P.run();

})();