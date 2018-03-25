customElements.define("pyrite-router", class PyriteRouter extends HTMLElement {
    constructor() {
        super();

        this.rootElement = this.attachShadow({
            mode: 'closed'
        });

        this.paths = [];
    }

    connectedCallback() {
        document.location.hash = '';

        this.addEventListener('pyrite-path', (event) => {
            const target = event.target;
            this.paths.push(target);

            if (target.getAttribute('name') === this.getAttribute('default')) {
                document.location.hash = target.getAttribute('path');
            }
        });

        window.addEventListener('hashchange', (event) => {
            const newPath = document.location.hash.replace('#', '');
            const element = this.paths.find((path) => path.getAttribute('path') === newPath);
            
            if (element) {
                const template = element.getAttribute('component');
                this.rootElement.innerHTML = '';
                const component = document.createElement(template);
                this.rootElement.appendChild(component);
            }
        });
    }
});

customElements.define("pyrite-path", class PyritePath extends HTMLElement {
    connectedCallback() {
        this.dispatchEvent(new CustomEvent('pyrite-path', { bubbles: true }));
    }

});