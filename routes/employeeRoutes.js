import express from "express"
export const router = express.Router()
import { employee_index, employee_content } from "../controller/employeeController.js"

router.get("/", employee_index)
router.get("/:id", employee_content)