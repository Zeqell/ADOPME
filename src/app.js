import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'express-compression'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import errorHandler from './middleware/error.js'
import usersRouter from './router/users.router.js'
import petsRouter from './router/pets.router.js'
import adoptionsRouter from './router/adoption.router.js'
import sessionsRouter from './router/sessions.router.js'
import mocksRouter from './router/mocks.router.js'
import configObject from './config/config.js'
import DataBase from './config/conectDb.js'
import swaggerOptions from './utils/swagger.js'

const Db = DataBase.getInstance()
const app = express()
const {port} = configObject
const specs = swaggerJSDoc(swaggerOptions)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extends: true}))
app.use(compression())

app.use('/api/users',usersRouter);
app.use(errorHandler)
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto: ${port}`);
}) 
