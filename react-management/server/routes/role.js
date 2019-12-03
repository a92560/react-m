const Router = require('koa-router')
const router = new Router({
	prefix: "/api/roles"
})
const {
	create,
	find,
	update
} = require("../controllers/role")

router.get("/", find)
router.post("/", create)
router.patch("/:id", update)

module.exports = router