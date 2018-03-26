customElements.define("pyrite-router", class PyriteRouter extends HTMLElement {
    constructor() {
        super();

        this.rootElement = this.attachShadow({
            mode: 'closed'
        });

        this.paths = [];
    }

    renderChildren(paths, ctrl, next) {
        const pathName = paths.shift();

        const element = ctrl.paths.find((path) => path.getAttribute('path') === "/" + pathName);

        if (element && !next) {
            const template = element.getAttribute('component');

            if (!this.rootElement.querySelector(template)) {
                this.rootElement.innerHTML = '';
                const component = document.createElement(template);
                this.rootElement.appendChild(component);
            }
        } else if (element && next) {
            const template = element.getAttribute('component');
            const rootComponent = this.rootElement.querySelector(ctrl.getAttribute('component')).rootElement.querySelector('children');
            
            if (!rootComponent.querySelector(template)) {
                rootComponent.innerHTML = '';
                const component = document.createElement(template);
                rootComponent.appendChild(component);
            }
        }

        if (paths.length) {
            this.renderChildren(paths, element, true);
        } else if (element) {
            const template = element.getAttribute('component');
            const childrenRoot = this.rootElement.querySelector(template);
            if (childrenRoot && childrenRoot.rootElement) {
                const children = childrenRoot.rootElement.querySelector('children');
                if (children) children.innerHTML = '';
            }
        }
    }

    connectedCallback() {
        document.location.hash = '';

        this.addEventListener('pyrite-path', (event) => {
            const target = event.target;
            this.paths.push(target);

            if (target.hasAttribute('default')) {
                document.location.hash = target.getAttribute('path');
            }
        });

        window.addEventListener('hashchange', (event) => {
            const paths = document.location.hash.replace('#', '').split('/').filter(e => e);

            this.renderChildren(paths, this);
        });
    }
});

customElements.define("pyrite-path", class PyritePath extends HTMLElement {
    constructor() {
        super();

        this.paths = [];
    }
    connectedCallback() {
        this.dispatchEvent(new CustomEvent('pyrite-path', { bubbles: true }));

        this.addEventListener('pyrite-path', (event) => {
            const target = event.target;
            this.paths.push(target);

            if (target.getAttribute('name') === this.getAttribute('default')) {
                document.location.hash = target.getAttribute('path');
            }
        });
    }

});