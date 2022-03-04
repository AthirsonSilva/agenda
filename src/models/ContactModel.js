const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  surname: {type: String, required: false, default: ''},
  email: {type: String, required: false, default: ''},
  phone: {type: String, required: false, default: ''},
  created: {type: Date, required: false, default: Date.now},
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
      this.body = body
      this.errors = new Array()
      this.user = null
  }

  async searchId(id) {
    if(typeof id !== 'string') return
    const user = await ContactModel.findById(id)
    return user
  }

  async searchContacts() {
    const contact = await ContactModel.find()
      .sort({created: -1})
    return contact
  }

  async searchContacts() {
    if(typeof id !== 'string') return

    const contact = await ContactModel.findOneAndDelete(id)
      .sort({created: -1})
    return contact
  }

  async delete(id) {
    const contact = await ContactModel.find()
      .sort({created: -1})
    return contact
  }

  async login() {
      this.validate()
      if (this.errors.length > 0) return

      this.user = await loginModel.find({email: this.body.email})

      if (!this.user) {
         this.errors.push('User does not exists') 
         return
      } 
  }

  async register() {
      this.validate()
      
      if(this.errors.length > 0) return
      this.contact = await ContactModel.create(this.body)
  }

  async userExists() {
      this.user = await loginModel.find({email: this.body.email})

      if(this.user) this.errors.push('User already exists')    

  }

  validate() {
      this.cleanUp()

      if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email')
      if(!this.body.name) this.errors.push('Name is a required field')
      if(!this.body.email && !this.body.phone) {
        this.errors.push('You must provide either email or phone')
      } 
  }

  cleanUp() {
      for(let key in this.body) {
          if (typeof this.body[key] !== 'string') {
              this.body[key] = ''
          }
      }

      this.body = {
          email: this.body.email,
          name: this.body.name,
          surname: this.body.surname,
          phone: this.body.phone,     
      }
  }

    async edit() {
        if (typeof id !== 'string') return
        this.validate()
        if (this.errors.length > 0) return

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})
  }
}

module.exports = Contact;
