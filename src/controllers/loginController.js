const Login = require('../models/LoginModel')


exports.index = (request, response) => {
    if(request.session.user) return response.render('login-logged')
    return response.render('login')

}


exports.register = async (request, response) => {
    try {
        const login = new Login(request.body)
        await login.register()
    
        if(login.errors.length > 0) {
            request.flash('errors', login.errors)
            request.session.save(() => {
                return response.redirect('back')
            })
    
            return
        }

        request.flash('sucess', 'User created with success')
        request.session.save(() => {
            return response.redirect('back')
        })
    } catch (e) {
        response.render('404')
    }
}

exports.login = async (request, response) => {
    try {
        const login = new Login(request.body)
        await login.login()
    
        if(login.errors.length > 0) {
            request.flash('errors', login.errors)
            request.session.save(() => {
                return response.redirect('back')
            })
    
            return
        }

        request.flash('sucess', 'Login with succes')
        request.session.user = login.user
        request.session.save(() => {
            return response.redirect('back')
        })
    } catch (e) {
        response.render('404')
    }
}

exports.logout = (res, req) => {
    req.session.destroy()
    res.redirect('/')
}