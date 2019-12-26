module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: "User Profile Page"
    });
};

// render the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | SignUp"
    })
};

// render the signIn page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | SignIn"
    })
};

// get the signUp data
module.exports.create = function(req, res){
    // ToDo later
}

// sign in and create a session for the user 
module.exports.createSession = function(req, res){
    // ToDo later
}