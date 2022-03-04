import validator from 'validator'

export default class Login {
    constructor(formClass) {
        this.from = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    validate(e) {
        const el = e.target

        const email = el.querySelector('input[name="email"]')
        const password = el.querySelector('input[name="password"]')
        let error = false

        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid email')
            error = true
        }

        if(password.value.length < 3 || password.value.length > 50) {
            alert('Invalid password')
            error = true
        }

        if(!error) el.submit
    }

    events() {
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }
}