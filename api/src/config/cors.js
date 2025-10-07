module.exports = (req, res, next) => {
    res.header('Acess-Control-Allow-Orign', '*')
    res.header('Acess-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}