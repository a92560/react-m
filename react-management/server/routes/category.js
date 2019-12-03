const Router = require("koa-router")
const router = new Router({
	prefix: "/api/categorys"
})
const {
	find,
	create,
	update,
	findById,
	insertMany
} = require('../controllers/category.js')

router.get("/", find)
router.get("/insert", insertMany)
router.post("/", create)
router.get("/:id", findById)
router.patch("/:id", update)

module.exports = router