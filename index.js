const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");
const markdownLinkExtractorData = require('./src/linkExtractor').markdownLinkExtractor;


 const router = readMdFile('../README.md');
 console.log("arg", process.argv);
 console.log(require.main === module);
//   const route = path.resolve("./README.md"); //vuelve la ruta ingresada por el user, una ruta absoluta
//  console.log(route);
if(require.main === module){
  // validar parametros valide y stats 
    let options = {};
    if (process.argv.includes('--validate')) options.validate = true;
    if (process.argv.includes('--stats')) options.stats = true;

    // validar rutas
    let fileName = process.argv[2]
    console.log("FileName", fileName)
    if(typeof fileName == 'undefined'){
      console.log("no se encuentra el archivo")
      return
    }
    if (path.isAbsolute(fileName)) {
      console.log('esta es una ruta absoluta, ingrese sólo el nombre del archivo');
    } else {

      console.log('no es una ruta absoluta');

// El método path.join() une todos los segmentos de ruta dados. 
// El método process.cwd() devuelve el directorio de trabajo actual.
      let joiningPath = path.join(process.cwd(), fileName);
      console.log("joiningPath",joiningPath)
      markdownLinkExtractor(joiningPath).then((values) => {
            console.log(values);
            
      });
    }
    console.log(options)
}

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
        linkExtractor(archivo)//funcion que extrae los linkserrorerror
       
        })

      });
    });
  }


// Función que recorre los links que están dentro del arreglo
 // Función que lee un archivo y retorna promesa con el contenido del archivo
 function markdownLinkExtractor(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error); // Sabemos que hay un error, así que rechazamos la promesa
        // Si hay error, nos aseguramos con return de no seguir ejecutando nada más en esta función
      }
      //console.log("data",data)
      let resultTmp = linkExtractor(data); // Función que extrae los links
     // console.log( "result",resultTmp)

      for (let index = 0; index < resultTmp.length; index++) {
        const element = resultTmp[index];

        element.then((response)=>{
          console.log("url", index, response)
        })
        
      }
      //return resolve(result)
      })
    });
  }


// Función que recorre los links que están dentro del arreglo
function linkExtractor(data) {
  let links = markdownLinkExtractorData(data);
  //console.log( "links", links)
  let arrLinks = [];

    for (let index = 0; index < links.length; index++) {
      const url = links[index];
      arrLinks.push(fetch(url.href)
        .then(function (response) {
           
            url.file = filePath,
            url.status = `${response.statusText} ${response.status}`; // Status 200
           
            return url;
        }).catch(function(error) {
        
          url.status = 'fail'; // Si el link está roto
          return url
        }
        ))
    }


  return arrLinks
};


