// en este apartado se buscara entender por completo la logica del codigo asincrono empezando con promesas y sus metodos, tambien se realizara un pequeño ejercicio de codigo asincrono para poder practicar el entorno de trabajo de este mismo


// temario:
// 1. promesas
//request, response
// .then() , .catch()

function  requestHandler(req, res){
    user.findByID(req.user.id)
    .then(user => {
        return Tasks.findByID(user.tasks)
    })
    .then(tasks => {
        tasks.completed = true
        return tasks.save()
    })
    .then(() => {
        res.send(`tasks completed ${tasks}`)
    })
    .catch(err => {
        res.send(err)
    })
}

// aqui escribimos un ejemplo de uso de reques / response para el consumo de promesas en procesos de peticion HTTP pero para entender mejor sus usos en su expresion como promesas para entender mejor la asincronia hice este pequeño ejercicio donde te muestro mas a fondo su uso no para responder peticiones HTTP sino para entender las respuestas asincronas con mayor facilidad sin saber hacerca de peticiones  con express.js o consultas con servidores. estos ejercicios son ideales para aprender, modificar y entender los usos de una promesa con parametros de exito y error. si no entiendes el primer ejemplo de uso este sera mas diverdito y en mi opinion propia como su creador mas faciles de aprender.

class Usuario {
    constructor(id, nombre, rol, edad) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.rol = rol;
        this.edad = edad;

        
        if (typeof this.id  !== 'number' || isNaN(this.id)){
            console.error(`el id ${this.id} no es valido`)
        }
        else if (arrayId.includes(this.id)) {
            console.error(`el id ${this.id} ya existe`)
        }
        else {
            arrayId.push(this.id)
            console.log(`el id ${this.id} ha sido registrado`)
        }
    }
}

let arrayId= []
const usuarios = [
    new Usuario (154461, "Soma", "Backend Dev", 19),
    new Usuario (254896, "alejandra", "Backend Dev", 17),
    new Usuario (349865, "manuel", "Backend Dev", 26),
    new Usuario ("86458", "enrique", "Backend Dev", 26),
    new Usuario ("jose", "carla", "Backend Dev", 17)
]

// Simulamos una función que representa una tarea asíncrona, como una petición a una API

function conseguirDatosUsuario(Usuario) {
    return new Promise((res, rej) => {
      // Simulamos retraso con setTimeout
      setTimeout(() => {
        if (arrayId.includes(Usuario.id)) {
          // Simulamos una respuesta exitosa
          res({ 
            id: Usuario.id,
            nombre: Usuario.nombre,
            rol: Usuario.rol,
            edad: Usuario.edad,
          });
        } else {
          // Simulamos un error
          rej(new Error("Usuario no encontrado"));
        }
      }, 1000); // 1 segundos de espera
    });
  }
  
  // Usamos la promesa con .then() y .catch()

/* ---------------------------------------------------------------------------------------- */
function mostrarInfo(Usuario) {
  conseguirDatosUsuario(Usuario)
    .then((dataUser) => {  
      console.log(`🟢 info recibida de ${dataUser.nombre}:`, dataUser);
      return verificarEdad(dataUser); // encadena con verificación de edad
    })
    .then((mensajePermiso) => {
      console.log(`🔓 Permisos de acceso: ${mensajePermiso}`);
    })
    .catch((error) => {
      console.error(`❌ Error con el Usuario ${Usuario.nombre}:`, error.message);
    });
}

usuarios.forEach((Usuario) => {
    mostrarInfo(Usuario);
});
/* ---------------------------------------------------------------------------------------- */

// version mejorada de la version anterior con uso de async y await para retornar los datos en orden si desea probarla comenta el codigo de arriba entre las paredes: /*----*/ y descomenta este :
/* ---------------------------------------------------------------------------------------- */
   /* <-borrar

async function mostrarInfo(Usuario) {
    try {
      const dataUser = await conseguirDatosUsuario(Usuario);
      console.log(`🟢 Datos recibidos de ${dataUser.nombre}:`, dataUser);
  
      const mensajePermiso = await verificarEdad(dataUser);
      console.log(`🔓 Permisos de acceso para ${dataUser.nombre}: ${mensajePermiso}`);
    } catch (error) {
      console.error(`❌ Error con el Usuario ${Usuario.nombre}:`, error.message);
    }
  }
  
  // Ejecutar uno por uno de forma secuencial
  async function ejecutarUsuariosSecuencialmente(lista) {
    for (const Usuario of lista) {
      await mostrarInfo(Usuario);
    }
  }
  
  ejecutarUsuariosSecuencialmente(usuarios);


    */ /* <-- borrar --> */
/* ---------------------------------------------------------------------------------------- */




function verificarEdad(dataUser) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (dataUser.edad >= 18) {
        res(" Puedes acceder");
      } else {
        rej(new Error(" Eres menor de edad"));
      }
    }, 1000);
  });
}
