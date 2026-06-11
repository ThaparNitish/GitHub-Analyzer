import { validateGitHubToken } from "../services/githubService.js";

export const validateToken = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.json({
                success: false,
                message: "No token provided",
            })
        }

        const token = authHeader.split(" ")[1];

        const result = await validateGitHubToken(token);

        if(!result.valid){
            return res.json({
                success: false,
                message: result.message,
            })
        }

        req.token = token;
        next();
    } catch(err) {
        return res.json({
            success: false,
            message: err.message,
        })
    }
}