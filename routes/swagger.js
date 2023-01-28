const router = require ("express").Router()

const swaggerUI = require ("swagger-ui-express")
const swaggerDocs = require ("../swagger.json")

router.use("/api-docs",swaggerUI.serve)
router.get("/api-docs", swaggerUI.setup(swaggerDocs))

module.exports = router