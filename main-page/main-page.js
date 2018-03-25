((currentScript) => {
    customElements.define("main-page", class MainPage extends HTMLPyriteComponent {
        static get currentScript() {
            return currentScript;
        }
    });
})(document.currentScript.ownerDocument);