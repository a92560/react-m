const Router = require("koa-router")
const router = new Router({
	prefix: "/api/products"
})
const {
	insertMany,
	find,
	update,
	findById,
	upload,
	deleteUpload,
	create
} = require("../controllers/product.js")

router.get("/", find)
router.get("/:id", findById)
router.post("/image/upload", upload)
router.post("/", create)
router.delete("/image/upload", deleteUpload)
router.patch("/:id", update)
router.get("/testinsert", insertMany)
module.exports = router