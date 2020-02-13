const axios = require('axios')
const Developer = require('../models/Developer')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnection, sendMessage } = require('../websocket')
// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Developer.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Developer.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data
            const techsArray = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Developer.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })

            // Filtrar as conexões que estão no máximo a 10km de distância
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnection(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return response.json(dev)
    }
}