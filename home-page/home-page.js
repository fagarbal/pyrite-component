class HomeComponent extends HTMLPyriteComponent {
    onConnect() {
        console.log('home connected')
    }

    onDisconnect() {
        console.log('home disconnect')
    }
}

customElements.define("home-page", HomeComponent);