const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const loginSchema = new mongoose.Scheema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.errors = new Array()
        this.user = null
    }

    async login() {
        this.validate()
        if (this.errors.length > 0) return

        this.user = await loginModel.find({email: this.body.email})

        if (!this.user) {
           this.errors.push('User does not exists') 
           return
        } 

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid password')
            this.user = null
            return 
        }
    }

    async register() {
        this.validate()
        if (this.errors.length > 0) return
        await this.userExists()
        if (this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
           
        this.user = await LoginModel.create(this.body)
        
    }

    async userExists() {
        this.user = await loginModel.find({email: this.body.email})

        if(this.user) this.errors.push('User already exists')    

    }

    validate() {
        this.cleanUp()

        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid email')

        if (!this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('Invalid password length')
    }

    cleanUp() {
        for(let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login