var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserByIdOrEmail } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }
        const user = yield getUserByIdOrEmail(email);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid password",
            });
        }
        // create token jwt and send it to client
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.status(200).json({
            token,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            error: "Login failed",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
//# sourceMappingURL=login.js.map