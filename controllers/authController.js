const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        const passOk = await bcryptjs.compare(password, user.password);
        if(!passOk) {
            return res.status(400).json({ msg: 'Password incorrecto'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token });
        }); 
        
    } catch (error) {
        console.log(error);
    }    
}

exports.userAuthenticated = async (req, res) => {
        
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}