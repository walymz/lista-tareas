descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea por hacer'
};
completado = {
    alias: 'c',
    demand: true,
    desc: 'Estatus de la tarea',
    default: true
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea nueva, debe indicar una descripción entre "", usando el parámetro -d', {
        descripcion
    })
    .command('listar', 'Lista las tareas registradas', {
        completado: {
            alias: 'c',
            desc: 'Muestra las tareas completadas según su estatus',
            demand: false,
            type: Boolean
        }
    })
    .command('actualizar', 'Actualiza el estatus de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea, dada su descripción', {
        descripcion
    })
    .command('borrart', 'Borra toda la lista de tareas', {})
    .help()
    .argv;

module.exports = { argv }