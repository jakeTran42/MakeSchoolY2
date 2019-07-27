(function() {

    class Copyright extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' })
            this.node = document.createElement('p')
            this._shadowRoot.appendChild(this.node)
        }

        connectedCallback() {
            let name = this._getName()
            let year = new Date().getFullYear()
            this.node.innerHTML = `<p>&copy; ${name} ${year}</p>`
        }

        _getName() {
            return this.getAttribute('name')
        }

        _getYear() {
            return this.getAttribute('year')
        }
    }
  
    customElements.define('copyright-tag', Copyright)
  
})()