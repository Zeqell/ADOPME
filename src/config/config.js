import dotenv from 'dotenv'
import program from "../utils/commander.js"

let {mode} = program.opts()

dotenv.config({
    path: mode === "production" ? "./.env.production" : "./.env.development"
})

const configObject = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret_token: process.env.SECRET_TOKEN,
  secret_cookie:process.env.SECRET_COOKIE
}

export default configObject