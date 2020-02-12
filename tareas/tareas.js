const fs = require('fs');
const colors = require('colors/safe');
let tareas = [];

const cargarTareas = () => {
    try {
        tareas = require('../tareas/tareas.json');
    } catch (error) {
        tareas = [];
    }
}
const guardarTarea = () => {
    return new Promise((resolve, reject) => {
        // console.log('El json tareas a guardar es:', tareas);
        let data = JSON.stringify(tareas);

        fs.writeFile('tareas/tareas.json', data, (err) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                console.log('EL cambio ha sido guardado');
                resolve(true);
            }

        })
    })
}
const crearTarea = async(descripcion, completado) => {

    cargarTareas();

    let tarea = {
            descripcion,
            completado
        }
        //  console.log('Guardar la tarea=>', tarea);
    tareas.push(tarea);
    let result = await guardarTarea();
    //console.log(result);
    return result;
}

let listarTareas = (c) => {
    cargarTareas();
    let nuevoListado;

    if (c == null) nuevoListado = tareas
    else {
        if (c) nuevoListado = tareas.filter(tarea => tarea.completado !== false)
        else nuevoListado = tareas.filter(tarea => tarea.completado === false);
    }
    return nuevoListado;

}

const actualizarTarea = async(d, c) => {
    cargarTareas();
    let i = tareas.findIndex(tarea => tarea.descripcion === d);
    if (i < 0) {
        console.log('La tarea no se encuentra registrada');
        return false;
    } else {
        console.log('Actualizando la tarea de la posición ', i);
        tareas[i].completado = c;
        let result = await guardarTarea();
        return result;
    }

}

const borrarTarea = async(d) => {
    cargarTareas();
    i = tareas.findIndex(tarea => tarea.descripcion === d);
    if (i < 0) {
        return false;
    } else {
        tareas.splice(i, 1);
        let result = await guardarTarea();
        return result;

    }
}
let borrarLista = async() => {
    tareas = [];
    return await guardarTarea();
}
let gestionarOpciones = async(comando, d, c) => {
    switch (comando) {

        case 'crear':
            //console.log(`d= ${argv.d}`);
            /*  let r = crearTarea(argv.d, false);
             console.log(r); */
            if (await crearTarea(d, false) === true) {
                console.log(colors.green("Se ha creado la tarea"));
            } else console.log(colors.red("Hubo un error al crear la tarea"));;
            break;

        case 'listar':

            let tareas;

            opc = c;

            if (opc != null) {
                if (opc == "true") {
                    console.log(colors.green('\nLISTADO DE LAS TAREAS NO COMPLETADAS:'));
                    console.log("_______________________________");
                    tareas = listarTareas(true);
                } else {
                    if (opc == "false") {
                        console.log(colors.green('\nLISTADO DE TAREAS COMPLETADAS:'));
                        console.log("________________________________");
                        tareas = listarTareas(false);
                    } else {
                        console.log(colors.yellow(`Cuando use el parámetro `) + colors.white(` c `) + colors.yellow(` ó `) + colors.white(`completado`) + colors.yellow(` use `) + colors.white(` true `) + colors.yellow(` para listar las tareas completadas y `) + colors.white(`false`) + colors.yellow(` para listar tareas incompletas.`));
                        return;
                    }
                }


            } else {
                console.log(colors.green('\nLISTADO DE TODAS LAS TAREAS:'));
                console.log("_______________________________");
                tareas = listarTareas(null);
            }

            for (let tarea of tareas) {
                console.log(colors.yellow(`- Tarea:`) + colors.white(`\n ${tarea.descripcion} `) + colors.yellow(`\n- Estatus:`))
                tarea.completado ? console.log(colors.green(` ${tarea.completado }`)) : console.log(colors.red(` ${tarea.completado }`));
            }
            break;

        case 'actualizar':
            console.log('Actualizar tareas');
            //console.log(argv.descripcion, argv.completado);
            if (await actualizarTarea(d, c) == true) {
                console.log(colors.green('La tarea ha sido actualizada'));
            } else { console.log(colors.red('No se ha podido actualizar la tarea')) }
            break;

        case 'borrar':
            console.log(`Borrar la tarea ${d}`);

            if (await borrarTarea(d) == true) console.log(colors.green("La tarea ha sido eliminada satisfactoriamente"));
            else console.log(colors.red('La tarea no ha podido ser eliminada'));
            break;
        case 'borrart':
            console.log('Borrar toda la lista');
            if (await borrarLista() === true) console.log(colors.green('La lista de tareas fue eliminada satisfactoriamente'));
            else console.log(colors.reg('No se pudo borrar la lista'));
            break;
        default:
            console.log('Comando no reconocido');
    }
}

module.exports = {
    crearTarea,
    listarTareas,
    actualizarTarea,
    borrarTarea,
    borrarLista,
    gestionarOpciones
}