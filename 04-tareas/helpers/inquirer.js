const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tarea`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tareas`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();
  console.log('==================='.green);
  console.log('Seleccione una opción'.white);
  console.log('===================\n'.green);

  const prompt = inquirer.createPromptModule();
  const { opcion } = await prompt(preguntas);
  return opcion;
}

const pausarMenu = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ]
  console.log('\n');
  const prompt = inquirer.createPromptModule();
  await prompt(question);
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Ingrese un valor';
        }
        return true;
      }
    }
  ]

  const prompt = inquirer.createPromptModule();
  const { desc } = await prompt(question);
  return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar'
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices: choices
    }
  ]
  const prompt = inquirer.createPromptModule();
  const { id } = await prompt(preguntas);
  
  return id;
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const prompt = inquirer.createPromptModule();
  const { ok } = await prompt(question);
  return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  });

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices: choices
    }
  ]
  const prompt = inquirer.createPromptModule();
  const { ids } = await prompt(preguntas);

  return ids;
}

module.exports = {
  inquirerMenu,
  pausarMenu,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
}

