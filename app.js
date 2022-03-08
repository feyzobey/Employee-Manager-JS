const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const employeeRoutes = require("./routes/employeeRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")

const app = express() //express uygulaması oluşturma
app.use(express.urlencoded({ extended: true }))
const port = 8080

app.set("view engine", "ejs") //ejs kullanımı
app.use(express.static("public")) //public klasörüne erişim
app.use(morgan("dev"))

const dbURL = "mongodb+srv://FaBeY:FaBeY_123@node-project.i0ngg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }) //veri tabanına bağlanma
  .then(app.listen(port), console.log(`listening port:${port}`))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.redirect("/employee")
})

app.use("/admin", adminRoutes)
app.use("/employee", employeeRoutes)

app.get("/login", (req, res) => res.render("login", { title: "Login" }))
app.get("/about-us", (req, res) => res.redirect("/about"))
app.get("/about", (req, res) => res.render("about", { title: "About us" }))
app.use((req, res) => res.status(404).render("404", { title: "404 Page is not found" }))