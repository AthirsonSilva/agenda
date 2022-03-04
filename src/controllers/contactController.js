const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contacts', {
        contact: {}
    })
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.register()
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
              res.redirect('back')
              return
            })
        }
    
        req.flash('succes', 'Contact added with success')
        req.session.save(() => res,redirect(`/contact/index/${contact.contact._id}`))
        return
    } catch(e) {
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contact = await Contact.searchId(req.params.id)
    if(!contact) return res.render('404')

    res.render('contact', {contact})
}

exports.edit = async (request, response) => {
    try {
        if(!request.params.id) return response.render('404')
        
        const contact = new Contact(request.body)
        await contact.edit(request.params.id)
    
        if (contact.errors.length > 0) {
            request.flash('errors', contact.errors)
            request.session.save(() => {
              response.redirect('back')
              return
            })
        }
    
        request.flash('succes', 'Contact edited with success')
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`))
        return
    } catch(e) {
        response.render('404')
    }
}

exports.delete = async (request, response) => {
    if(!request.params.id) return response.render('404')

    const contact = await Contact.delete(request.params.id)
    if(!contact) return response.render('404')

    request.flash('succes', 'Contact removed with success')
    request.session.save(() => response.redirect('back'))
    response.redirect()
}