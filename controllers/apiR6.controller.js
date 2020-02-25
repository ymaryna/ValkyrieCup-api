const createError = require('http-errors');
const axios = require('axios')

module.exports.getUserInfo = (req, res, next) => {
    const platform = req.params.platform
    const username = req.params.username
    console.log(req.params)
    axios.get(`https://r6tab.com/api/search.php?platform=${platform}&search=${username}`)
    .then(response => res.json(response.data))
}