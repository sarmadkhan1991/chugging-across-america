const bcrypt = require("bcryptjs");

module.exports = {
    getUserSession: (req, res, next) => {
        res.status(200).send(req.session.user)
    },
    register: async (req, res, next) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.get_user(username);
        const existingUser = result[0];
        if(existingUser) {
            return res.status(409).send('Username is taken.')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.register_user(username, hash);
        const user = registeredUser[0];
        req.session.user = {
            id: user.id,
            // username: user.username
        };
        return res.status(200).send(req.session.user)
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        const foundUser = await req.app.get("db").get_user([username]);
        const user = foundUser[0];
        if(!user) {
            return res.status(401).send("User not found.")
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
            return res.status(401).send("Incorrect password.");
        }
        req.session.user = {
            id: user.id,
            username: user.username
        };
        return res.status(200).send(req.session.user);
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send("You have been logged out.");
    },
    updatePassword: async (req, res, next) => {
        const { password } = req.body;
        const { id } = req.session.user;
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await db.update_password(hash, id);
        return res.status(200).send("Your password has been reset.")
    }
};