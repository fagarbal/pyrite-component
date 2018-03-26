class ExampleComponent extends HTMLPyriteComponent {
    static get observedAttributes() {
        return ['title', 'color'];
    }
}

customElements.define("example-component", ExampleComponent);