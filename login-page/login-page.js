((currentScript) => {
    customElements.define("login-page", class LoginComponent extends HTMLPyriteComponent {
        static get currentScript() {
            return currentScript;
        }
    });
})(document.currentScript.ownerDocument);