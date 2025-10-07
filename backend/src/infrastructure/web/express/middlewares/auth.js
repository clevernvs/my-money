const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization']

    if (!token) return res.status(403).send({ errors: ['No token provided.'] })

    const cleaned = token.startsWith('Bearer ')
        ? token.substring(7)
        : token

    jwt.verify(cleaned, process.env.AUTH_SECRET || 'my-secret', function (err, decoded) {
        if (err) return res.status(403).send({ errors: ['Failed to authenticate token.'] })
        req.decoded = decoded
        next()
    })
}


