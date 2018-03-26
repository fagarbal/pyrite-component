class MainComponent extends HTMLPyriteComponent {
    onConnect() {
        console.log('main connected')
    }

    onDisconnect() {
        console.log('main disconnect')
    }
}

customElements.define("main-page", MainComponent);