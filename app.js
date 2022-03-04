import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import { Employee } from "./models/employees.js"

const app = express() //express uygulaması oluşturma
app.use(express.urlencoded({ extended: true }))
const port = 3000

app.set("view engine", "ejs") //ejs kullanımı

app.use(express.static("public")) //public klasörüne erişim
app.use(morgan("dev"))

const dbURL = "mongodb+srv://FaBeY:FaBeY_123@node-project.i0ngg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }) //veri tabanına bağlanma
  .then(app.listen(port), () => console.log(`listening port:${port}`))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  Employee.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("index", { title: "Home", employees: result }))
    .catch((err) => console.log(err))
})

app.get("/employee/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  Employee.findById(id)
    .then((result) => {
      res.render("showEmployee", { title: "Details", employee: result })
    })
    .catch(() => {
      res.status(404).render("404", { title: "Page is not found" })
    })
})

app.get("/admin", (req, res) => {
  Employee.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", employees: result })
    })
    .catch((err) => console.log(err))
})

app.get("/admin/add", (req, res) => {
  res.render("add", { title: "Adding new employee" })
})

app.get("/admin/add", (req, res) => {
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
})

// app.post("/admin/add", (req, res) => {
//   res.end(JSON.stringify(req.body))
//   const employee = new Employee(req.body)
//   employee.save()
//     .then(() => res.redirect("/admin"))
//     .catch(err => console.log(err))

// })

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id
  Employee.findByIdAndDelete(id)
    .then(() => res.json({ link: "/admin" }))
    .catch(err => console.log(err))
})

app.get("/login", (req, res) => res.render("login", { title: "Login" }))

app.get("/about-us", (req, res) => res.redirect("/about"))

app.get("/about", (req, res) => res.render("about", { title: "About us" }))

app.use((req, res) => res.status(404).render("404", { title: "404 Page is not found" }))