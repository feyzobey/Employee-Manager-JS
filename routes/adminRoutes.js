const express = require("express")
const router = express.Router()
const { admin_index, admin_add, admin_add_post, admin_delete } = require("../controller/adminController.js")

router.get("/", admin_index)
router.get("/add", admin_add)
router.post("/add", admin_add_post)
router.delete("/delete/:id", admin_delete)

module.exports = router