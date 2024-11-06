const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token dans l'en-tête Authorization
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}
