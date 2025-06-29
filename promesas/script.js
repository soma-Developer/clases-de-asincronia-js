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

class usuario {
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
    new usuario (1, "Soma", "Backend Dev", 19),
    new usuario (2, "alejandra", "Backend Dev", 17),
    new usuario (3, "manuel", "Backend Dev", 26),
    new usuario ("8", "enrique", "Backend Dev", 26),
    new usuario ("jose", "carla", "Backend Dev", 17)
]

// Simulamos una función que representa una tarea asíncrona, como una petición a una API

function conseguirDatosUsuario(usuario) {
    return new Promise((res, rej) => {
      // Simulamos retraso con setTimeout
      setTimeout(() => {
        if (arrayId.includes(usuario.id)) {
          // Simulamos una respuesta exitosa
          res({ 
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol,
            edad: usuario.edad,
          });
        } else {
          // Simulamos un error
          rej(new Error("Usuario no encontrado"));
        }
      }, 1000); // 2 segundos de espera
    });
  }
  
  // Usamos la promesa con .then() y .catch()

/* ---------------------------------------------------------------------------------------- */
function mostrarInfo(usuario) {
  conseguirDatosUsuario(usuario)
    .then((dataUser) => { 
      console.log(`🟢 dataUser recibida de ${dataUser.nombre}:`, dataUser);
      return verificarEdad(dataUser); // encadena con verificación de edad
    })
    .then((mensajePermiso) => {
      console.log(`🔓 Permisos de acceso: ${mensajePermiso}`);
    })
    .catch((error) => {
      console.error(`❌ Error con el usuario ${usuario.nombre}:`, error.message);
    });
}

usuarios.forEach((usuario) => {
    mostrarInfo(usuario);
});
/* ---------------------------------------------------------------------------------------- */

// version mejorada de la version anterior con uso de async y await para retornar los datos en orden si desea probarla comenta el codigo de arriba entre las paredes: /*----*/ y descomenta este :
/* ---------------------------------------------------------------------------------------- */
   /* <-borrar

async function mostrarInfo(usuario) {
    try {
      const dataUser = await conseguirDatosUsuario(usuario);
      console.log(`🟢 Datos recibidos de ${dataUser.nombre}:`, dataUser);
  
      const mensajePermiso = await verificarEdad(dataUser);
      console.log(`🔓 Permisos de acceso para ${dataUser.nombre}: ${mensajePermiso}`);
    } catch (error) {
      console.error(`❌ Error con el usuario ${usuario.nombre}:`, error.message);
    }
  }
  
  // Ejecutar uno por uno de forma secuencial
  async function ejecutarUsuariosSecuencialmente(lista) {
    for (const usuario of lista) {
      await mostrarInfo(usuario);
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
