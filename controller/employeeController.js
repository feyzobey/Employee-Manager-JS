const { Employee } = require("../models/employees.js")

const employee_index = (req, res) => {
    Employee.find()
        .sort({ createdAt: -1 })
        .then((result) => res.render("index", { title: "Home", employees: result }))
        .catch((err) => console.log(err))
}

const employee_content = (req, res) => {
    const id = req.params.id
    console.log(id)
    Employee.findById(id)
        .then((result) => {
            res.render("showEmployee", { title: "Details", employee: result })
        })
        .catch(() => {
            res.status(404).render("404", { title: "Page is not found" })
        })
}
module.exports = {
    employee_index,
    employee_content
}