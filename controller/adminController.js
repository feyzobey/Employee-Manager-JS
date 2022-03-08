import { Employee } from "../models/employees.js"

export const admin_index = (req, res) => {
    Employee.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("admin", { title: "Admin", employees: result })
        })
        .catch((err) => console.log(err))
}

export const admin_add = (req, res) => {
    res.render("add", { title: "Adding new employee" })
}

export const admin_add_post = (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        surname: req.body.surname,
        id: req.body.id,
        salary: req.body.salary
    })
    employee
        .save()
        .then(() => {
            res.redirect("/admin")
        })
        .catch(err => console.log(err))
}
//  (req, res) => {
//   res.end(JSON.stringify(req.body))
//   const employee = new Employee(req.body)
//   employee.save()
//     .then(() => res.redirect("/admin"))
//     .catch(err => console.log(err))
// })
export const admin_delete = (req, res) => {
    const id = req.params.id
    Employee.findByIdAndDelete(id)
        .then(() => res.json({ link: "/admin" }))
        .catch(err => console.log(err))
}