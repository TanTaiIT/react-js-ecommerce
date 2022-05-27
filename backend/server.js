import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/DatabaseConfig.js'
import importData from './DataImport.js'
import productRoute from './routes/ProductRoutes.js'
import userRoute from './routes/UserRoutes.js'
import { errorHandler, notFound } from './middleware/Error.js'
import orderRouter from './routes/OrderRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
dotenv.config()

connectDatabase()
const app = express()
app.use(express.json())

app.use("/api/product/", productRoute)
app.use("/api/import/", importData)
app.use("/api/user", userRoute)
app.use("/api/order", orderRouter)
app.use("/api/category",CategoryRoute)
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))