((currentScript) => {
    customElements.define("example-component", 
        class ExampleComponent extends HTMLPyriteComponent {
            static get currentScript() {
                return currentScript;
            }

            static get observedAttributes() {
                return ['title', 'color'];
            }

            onConnect() {
                console.log('connect');
            }

            onDisconnect() {
                console.log('disconnect');
            }

            onBeforeUpdate() {

            }

            onUpdate() {
                console.log(arguments);
            }
        });
})(document.currentScript.ownerDocument)