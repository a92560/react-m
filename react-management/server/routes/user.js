const Router = require("koa-router")
const router = new Router({
	prefix: "/api"
})
const {
	login,
	find,
	update,
	create,
	delete: del
} = require("../controllers/user.js")

router.post("/login", login)
router.get("/users/", find)
router.post("/users/", create)
router.patch("/users/:id", update)
router.delete("/users/:id", del)


module.exports = router