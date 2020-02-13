const { Router } = require('express')

const DeveloperController = require('./controllers/DeveloperController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Query Params: request.query (filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DeveloperController.index)
routes.post('/devs', DeveloperController.store)

routes.get('/search', SearchController.index)

module.exports = routes