const createError = require('http-errors');
const axios = require('axios')

module.exports.getUserInfo = (req, res, next) => {
    const platform = req.params.platform
    const username = req.params.username
    axios.get(`https://r6tab.com/api/search.php?platform=${platform}&search=${username}`)
    .then(response => res.json(response.data))
}

module.exports.getUserStats = (req, res, next) => {
    const id = req.params.id
    axios.get(`hhttps://r6tab.com/api/player.php?p_id=${id}`)
    .then(response => {
        res.json(response.data)})
}