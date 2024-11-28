FROM node
#Definimos una imagrn base: NODE. esto lo toma del docker hub
WORKDIR /app
#Aca estamos creando una carpeta interna donde guardar nuestro p´royecto
COPY package.json .
#Etamos copiando el package.json a mi nueva carpeta
RUN npm install
#Tiene que ejecutarse la instalacion
COPY . .
#Esto copia todo el codigo de mi aplicación
EXPOSE 8080
#Le decimos que puerto vamos a escuchar
CMD ["npm", "start"]
#Comando de ejecucion "npm start" para que funcione