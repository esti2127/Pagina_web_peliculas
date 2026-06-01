const { setResponse } = require("../utils/utils")


const validateAdmin = (req, res, next) => {

    try {

        const auth = req.headers.authorization
        if (!auth || !auth.startsWith("Bearer")) return setResponse(res, false, 400, "No token found")

        const token = auth.split(" ")[1]
        const userData = jwt.verify(token, process.env.JWT_SECRET)

        if (userData.rol !== "admin") return setResponse(res, false, 403, "Access denied", token)


        req.user = userData;
        next()

    } catch (error) {
        console.log(error.stack)
        setResponse(res, false, 403, "Invalid token")
    }
}