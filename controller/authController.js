const { db } = require("../db.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const data = await req.body;
        const findUser = await db.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        data['password'] = await bcrypt.hash(data.password, salt);
        const user = await db.user.create({
            data: data
        });
        delete user.password;
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}


const login = async (req, res) => {
    try {
        const data = await req.body;
        const findUser = await db.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const comparePassword = await bcrypt.compare(data.password, findUser.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = await jwt.sign({
            id: findUser.id,
            email: findUser.email,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        delete findUser.password;
        findUser['token'] = token;
        res.status(200).json(findUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

const autoLogin = async (req, res) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id: req.user.id
            },
            include: {
                profile: {
                    select: {
                       bio: true,
                       img: true,
                       dob: true,
                    }
                }
            }
        });
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateProfile = async (req, res) => {
    try {
        const data = await req.body;
        const findProfile = await db.profile.findFirst({
            where: {
                userId: req.user.id
            }
        });
        if (!findProfile) {
            const profile = await db.profile.create({
                data: {
                    ...data,
                    userId: req.user.id
                }
            });
            res.status(201).json(profile);
        } else {
            const profile = await db.profile.update({
                where: {
                    id: findProfile.id
                },
                data: data
            });
            res.status(200).json(profile);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}


module.exports = {
    signup,
    login,
    autoLogin,
    updateProfile
}