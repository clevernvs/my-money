const _ = require('lodash')

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle
    if (bundle && bundle.errors) {
        const errors = []
        _.forIn(bundle.errors, error => errors.push(error.message))
        return res.status(500).json({ errors })
    }
    next()
}


