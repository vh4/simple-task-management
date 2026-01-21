import jwt from "jsonwebtoken";
export const userMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string") {
            return res.status(401).json({ error: "Invalid token payload" });
        }
        req.user = decoded;
        next();
    }
    catch (_b) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
//# sourceMappingURL=user.middleware.js.map