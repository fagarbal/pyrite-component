class HomeComponent extends HTMLPyriteComponent {
    onConnect() {
        console.log('home connected')
        console.log(this.refs.button);
    }

    onDisconnect() {
        console.log('home disconnect')
    }
}

customElements.define("home-page", HomeComponent);