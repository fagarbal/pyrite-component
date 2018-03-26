class OtherComponent extends HTMLPyriteComponent {
    onConnect() {
        console.log('other connected')
    }

    onDisconnect() {
        console.log('other disconnect')
    }
}

customElements.define("other-page", OtherComponent);