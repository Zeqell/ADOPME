import mongoose from "mongoose";
import Users from "../src/dao/users.dao.js"
import {expect} from "chai"


mongoose.connect("mongodb+srv://schuquelezequiel:coderhouse2024@adopt-me.tv7vp.mongodb.net/?")

describe("Testeamos el DAO de User", function(){
  before(function(){
    this.userDao = new Users()
  })

  beforeEach(async function () {
    await mongoose.connection.collections.users.drop()
  })

  it("GET de user me debe retornar un array", async function () {
    const result = await this.userDao.get()
    expect(Array.isArray(result)).to.be.true  
  })

  it("DAO debe poder agregar un user nuevo a la DB", async function () {
    let user = {
      first_name: "Franco",
      last_name: "colapinto",
      email: "franco@colapinto.com",
      password: "123"
    }
    const result = await this.userDao.save(user)
    expect(result).to.have.property("_id")
  })

  it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
    let user = {
      first_name: "yo",
      last_name: "tu",
      email: "yo@tu.com",
      password: "123"
    }
    const result = await this.userDao.save(user)
    expect(result.pets).to.deep.equal([])
  })

  it("El DAO puede obtener un usuario por email", async function () {
    let user = {
      first_name: "Franco",
      last_name: "colapinto",
      email: "franco@colapinto.com",
      password: "123"
    }
    await this.userDao.save(user)
    const users = await this.userDao.getBy({email: user.email})
    expect(users).to.be.an("object")
  })

  after(async function () {
    await mongoose.disconnect()
  })
})