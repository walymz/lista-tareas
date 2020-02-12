//const colors = require('colors');
const colors = require('colors/safe');
const tareas = { crearTarea, listarTareas, actualizarTarea, borrarTarea, borrarLista, gestionarOpciones } = require('./tareas/tareas');
const argv = require('./config/config').argv;



let comando = argv._[0];


console.log(colors.rainbow('\n=================================='));
console.log(colors.green('PROGRAMA PARA EL MANEJO DE TAREAS'));
console.log(colors.rainbow('================================='));

gestionarOpciones(comando, argv.d, argv.c);