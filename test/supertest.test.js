import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080")

describe("Testing de la app Adoptme", ()=>{
  describe("Testing de pets", ()=>{
    it("El endpoint POST /api/pets debe crear una mascota correctamente", async ()=>{
      const petsMock={
        name: "jack",
        specie: "perro",
        birthDate: "2022-04-10"
      }
      const {statusCode, ok, _body} = await requester.post("/api/pets").send(petsMock)
      console.log(statusCode);
      console.log(ok);
      console.log(_body);

      expect(_body.payload).to.have.property("_id")
    })

    it("Al crear una mascota, debe tener la propiedad adopted en false", async()=>{
      const newPets ={
        name: "reck",
        specie: "perro",
        birthDate: "2022-04-04"
      }
      const{statusCode, _body} = await requester.post("/api/pets").send(newPets)
      expect(statusCode).to.equal(200)
      expect(_body.payload).to.have.property("adopted").that.equals(false)
    })

    it("Al intentar crear una mascota sin el campo name, el modulo debe responder con un status 400", async ()=>{
      const petsName = {
        specie: "gato",
        birthDate: "2021-05-15"
      }

      const {statusCode} = await requester.post("/api/pets").send(petsName)
      expect(statusCode).to.equal(400)
    })

    it("Al obtener las mascotas con el metodo GET, las respuesta debe tener los campos status y payloada. Ademas, payload debe ser de tipo array", async () =>{
      const {statusCode, _body} = await requester.get("/api/pets")

      expect(statusCode).to.equal(200)
      expect(_body).to.have.property("status").that.equals("success")
      expect(_body).to.have.property("payload").that.is.an("array")
    })

    it("El metodo PUT debe poder actualizar correctamente a una mascota determinada.", async ()=>{
      const  idPets = "6748df435851d02652ef01af"

      const datosActu ={
        name: "Nanami",
        specie: "Dog"
      }

      const {statusCode} = await requester.put(`/api/pets/${idPets}`).send(datosActu)

      expect(statusCode).to.equal(200)
    })

    it("El método DELETE debe borrar la ultima mascota agregada, esto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota con DELETE y luego corroborar si la mascota existe con un GET.", async ()=>{
      const newPets = {
        name: "delete pets",
        specie: "Dog",
        birthDate: "2023-02-20"
      }

      const {body: {payload:{_id} }} = await requester.post("/api/pets").send(newPets)

      const {statusCode} = await requester.delete(`/api/pets/${_id}`)

      expect(statusCode).to.equal(200)
    })
  })

  describe("Test avanzado", ()=>{
    let cookie;

    it("Debe registrar correctamente un usuario", async ()=>{
      const mockUser = {
        first_name: "Pepe",
        last_name: "Argento",
        email: "pepe@argento.com",
        password: "1324"
      }
      const {_body} = await requester.post("/api/sessions/register").send(mockUser)

      expect(_body.payload).to.be.ok
    })

    it("Debe loguear correctamente al ususario y recuperar la cookie", async ()=>{
      const mockUser = {
        email:"pepe@argento.com",
        password:"1324"
      }
      const result = await requester.post("/api/sessions/login").send(mockUser)

      const cookieResult = result.headers['set-cookie']['0']

      expect(cookieResult).to.be.ok

      cookie = {
        name: cookieResult.split("=")['0'],
        value: cookieResult.split("=")['1']
      }

      expect(cookie.name).to.be.eql("coderCookie")
      expect(cookie.value).to.be.ok
    })

    it("Debe enviar la cookie que contiene el usuario", async ()=>{
      const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`])

      expect(_body.payload.email).to.be.eql("pepe@argento.com")
    })
  })

  describe("Testeamos la carga de imagenes", ()=>{
    it("Tenemos que crear una mascota con una img", async ()=>{
      const mockPets = {
        name: "Obi",
        specie: "cat",
        birthDate: "2023-04-05"
      }
      const result = await requester.post("/api/pets/withimage")
        .field("name", mockPets.name)
        .field("specie", mockPets.specie)
        .field("birthDate", mockPets.birthDate)
        .attach("image", "./test/obi.jpg")

      expect(result.status).to.be.eql(200)

      expect(result._body.payload).to.have.property("_id")
      expect(result._body.payload.image).to.be.ok
    })
  })
})