const express = require("express")
const router = express.Router()
const { employee_index, employee_content } = require("../controller/employeeController.js")

router.get("/", employee_index)
router.get("/:id", employee_content)

module.exports = router