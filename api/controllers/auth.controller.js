
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // HASH THE PASSWORD

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log(newUser);

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Échec de la création de l'utilisateur!" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Log the received data
        console.log("Attempting login with username:", username);

        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Les informations d'identification invalides!" });
        }

        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(400).json({ message: "Les informations d'identification invalides!" });
        }

        // Log the user info excluding sensitive data
        console.log("User authenticated:", { id: user.id, username: user.username });

        // GENERATE COOKIE TOKEN AND SEND TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7; // 1 semaine
        const token = jwt.sign(
            { id: user.id, isAdmin: false },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: age,
            })
            .status(200)
            .json({ id: user.id, username: user.username });
    } catch (err) {
        console.error("Error during login:", err); // Log detailed error
        res.status(500).json({ message: "Échec de la connexion!" });
    }
};


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
