
const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('./src/linkExtractor')
const fetch = require("node-fetch");




 const router = readMdFile('../README.md');
 console.log(process.argv);
 console.log(require.main === module);
//   const route = path.resolve("./README.md"); //vuelve la ruta ingresada por el user, una ruta absoluta
//  console.log(route);


//resolve cuando es positivo ,reject cuando es negativo 
// Función que lee un archivo y retorna promesa con el contenido del archivo
function readMdFile(filePath ){
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, archivo) => {

      if (error) {

       return reject(error) //// Sabemos que hay un error, así que rechazamos la promesa
        // Si hay error, nos aseguramos con return de no seguir ejecutando nada más en esta función

      }
       return resolve(archivo).then((archivo) => {
        linkExtractor(archivo)//funcion que extrae los links
       
        })

      });
    });
  }




// funcion que recorre los links
function linkExtractor(archivo) {
  
    


}


