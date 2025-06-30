// clase de experiencia aprendida de practicas para el uso de async/await en codigo pronto se subira un commit con el ejercicio practico como en las promises pero por cuestiones de tiempo este primer commit solo tendra la clase del funcionamiento y utilidades de async y await con ejemplos cortos ( cuando suba el ejercicio borrare esto en el mismo commit)

// en el anteriror ejemplo del uso de promesas vimos como consumirlas y como obtener resultados en base a si las promesas se efectuaron correcta o incorrectamente  ahora veremos como funcionan los async await con promesas req, res. Es sencillo peticion / respuesta lo mismo pero esperamos y actuamos con parametros distintos a los de exito / error 

// lo que hacemos aqui es crear una funcion la cual esperara una peticion HTTP para manejar un codigo y devolver un resultado (request/response) o abreviado (req, res) req es el parametro que tiene de informacion que le pedimos y al ejecutar el codigo con esa peticion devuelve el resultado que esperemos devolver o devuelve el error en el proceso donde suseda algo. para manejar que responde en exito o fracaso usamos su version de promesa asi como en promise era(.then / .catch) aqui es try y catch. mas sencillo y facil de leer no crees?
async function requestHandler(req, res) {
    try {
        const user = await User.findById(req.UserI);
        const tasks = task.findById(user.taskId);
        tasks.completed = true;
        await tasks.save(); 
        res.send(`tarea completada estado de la tarea`)
    }
    catch(err) {
        res.send(err);
    }
}