((owner) => {
    function __getRefs() {
        return new Proxy({}, {
            get: __getRefsFromShadowRoot.bind(this)
        });
    }

    function __getProps() {
        return new Proxy({}, {
            get: __getAttribute.bind(this),
            set: __setAttribute.bind(this)
        });
    }

    function __getRefsFromShadowRoot(target, name) {
       return this.rootElement.querySelector('[ref="' + name + '"]');
    }

    function __getAttribute(target, name) {
        return this.getAttribute(name);
    }

    function __setAttribute(target, name, value) {
        this.setAttribute(name, value);

        return true;
    }

    function __setTemplate() {
        this.rootElement = this.attachShadow({
            mode: 'closed'
        });

        const element = this.currentScript.querySelector('template');
        this.__template = element.content.cloneNode(true);
        const instance = element.cloneNode(true);

        instance.innerHTML = eval('`' + instance.innerHTML + '`');
        
        this.rootElement.appendChild(instance.content);
    }

    function __htmlDiff(current, previous) {
        Array.from(current.children).forEach((element, i) => {
            if (element.children && element.children.length) __htmlDiff.call(this, current.children[i].children, previous.children[i].children);

            if (current.children[i].innerText !== previous.children[i].innerText) {
                current.children[i].innerText = eval('`' + previous.children[i].innerText + '`');
            }

            if (current.children[i].attributes && current.children[i].attributes.length) {
                Array.from(current.children[i].attributes).forEach((attr, j) => {
                    if (current.children[i].getAttribute(attr.name) !== previous.children[i].getAttribute(attr.name)) {
                        current.children[i].setAttribute(attr.name,eval('`' + previous.children[i].getAttribute(attr.name) + '`'));
                    }
                });
            }
        });
    }

    class HTMLPyriteComponent extends HTMLElement {
        constructor() {
            super();
    
            this.refs = __getRefs.call(this);
            this.props = __getProps.call(this);
            
            __setTemplate.call(this);
        }
    
        emitEvent(event, detail) {
            this.dispatchEvent(new CustomEvent(event, {
                detail,
                bubbles: true
            }));
        }
    
        render() {
            __htmlDiff.call(this, this.rootElement, this.__template);
        }
    
        connectedCallback() {
            this.onConnect();
        }
    
        disconnectedCallback() {
            this.onDisconnect();
        }
    
        attributeChangedCallback(name, oldVal, newVal) {
            if (oldVal !== newVal) {
                this.onBeforeUpdate(name, oldVal, newVal);
                this.render();
                this.onUpdate(name, oldVal, newVal);
            }
        } 
    
        onConnect() {}
        onDisconnect() {}
        onUpdate() {}
        onBeforeUpdate() {}
    }
    
    window.HTMLPyriteComponent = HTMLPyriteComponent;
    window.HTMLPyriteScripts = {};

    const define = window.customElements.define.bind(window.customElements);
    
    window.customElements.define = (name, component) => {
        component.prototype.currentScript = document.currentScript.ownerDocument;

        return define(name, component);
    };

})();