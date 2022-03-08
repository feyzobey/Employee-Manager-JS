import express from "express"
export const router = express.Router()
import { admin_index, admin_add, admin_add_post, admin_delete } from "../controller/adminController.js"

router.get("/", admin_index)
router.get("/add", admin_add)
router.post("/add", admin_add_post)
router.delete("/delete/:id", admin_delete)