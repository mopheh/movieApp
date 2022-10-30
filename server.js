dotenv.config()

import path from "path"
import dotenv from "dotenv"
import express from "express"
const app = express()

app.use(express.static("public"))

app.use(express.json())

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
  console.log("production")
} else {
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
}

app.listen(process.env.PORT || 5000, function () {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  )
})
