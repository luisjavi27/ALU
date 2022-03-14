const { verifyToken } = require('../services/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ').pop() 
        const tokenData = await verifyToken(token)
        console.log(token)
        console.log("id "+tokenData._id)
        if (tokenData._id) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

export = checkAuth