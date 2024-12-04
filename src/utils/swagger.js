const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info: {
            title: "Documentacion App Adopt-me",
            description: "App creada para encontrar familias que quieran adoptar mascotas"
        }
    },
    apis:["./src/docs/**/*.yaml"]
}

export default swaggerOptions