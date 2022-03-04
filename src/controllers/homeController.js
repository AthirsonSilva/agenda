const Contact = require('../models/ContactModel')

exports.index =  async(request, response) => {
  const contacts = await Contact.searchContact()
  response.render('index', {contacts});
};


