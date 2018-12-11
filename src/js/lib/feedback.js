let Feed = require('./Feed')

const identify = new Feed('identifica el problema', false, {
    group: 'cognitive',
    range: [
        'Realizar un anális más detallado y cuidadoso con respecto al problema planteado.',
        'Identificas y planteas la fórmula que lo ayudará a resolver el problema, pero no está correctamente presentada. Por lo tanto, contines inconsistencias en los resultados planteados.',
        'Identificas y planteas la fórmula que lo ayudará a resolver el problema.'
    ]
})

const tecnology = new Feed('emplea la tecnología', false, {
    group: 'attitudinal',
    range: [
        'Existen diversos softwares y aplicaciones las cuales puedes hacer uso, las cuales te permiter entregar un excelente trabajo; partiendo de ello, el módelo educativo nos marca que desarrollemos la competencia del uso y aplicación de las tecnologías de la información',
        'Empleas la tecnología de la forma adecuada para elaborar un documento con la información solicitada.',
    ]
})

const time = new Feed('entrega a tiempo', false, {
    group: 'attitudinal',
    range: [
        'Entregar en los tiempos establecidos para que no sea afectada tu evaluación.',
        'Cumples con los tiempos estipulados de entrega de la actividad.'
    ]
})

const attitudinal = new Feed('atiende indicaciones', false, {
    group: 'attitudinal',
    range: [
        'Atender las indicaciones que se otorgan en la plataforma, de esta manera puedes cubrir el 100% de cuestionamientos.',
        'Atiendes en un 60 % a las indicaciones para entregar la actividad',
        'Atiendes en un 70 % a las indicaciones para entregar la actividad.',
        'Atiendes en un 80 % a las indicaciones para entregar la actividad',
        'Atiendes en un 90 % a las indicaciones para entregar la actividad.',
        'Atiendes a las indicaciones para entregar la actividad.'
    ]
})

const clean = new Feed('limpio y ordenado', false, {
    group: 'communicative',
    range: [
        'La presentación es poco organizada y en algunos momentos se dificulta la comprensión; puedes tomarte un tiempo y desarrollarla con cuidado y ordenado.',
        'Expones de manera clara tus ideas. La forma en la que presentas la información facilita la lectura y comprensión.'
    ]
})

const orthography = new Feed('redacción y orotografía', false, {
    group: 'communicative',
    range: [
        'Hacer uso del autocorrector ortografico de Word y apoyarte en la RAE(http://rea.es) cuando desconozcas el significado de alguna palabra',
        'Presentas de 5 a 6 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Presentas de 3 a 4 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Presentas de 1 a 2 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Cuentas con una bunea redacción, sintaxis, ortografía y puntuación.'
    ]
})

const information = new Feed('información correcta y pertinente', false, {
    group: 'communicative',
    range: [
        'Realizar una investigación más a profundidad y analitica al respesto al tema.',
        'Realizar una investigación más a profundidad ya que existen inconsistencias en algunas cuestiones.',
        'La información que presentas, así como los procedimientos, son pertinentes y corresponden a los elementos solicitados.'
    ]
})

const critico = new Feed('crítico', false, {
    group: 'thinking',
    range: [
        'Realiza un análisis superficial que no le permite resolver correctamente la actividad.',
        'Analizas de manera general la información para identificar la forma en la que resolverá el planteamiento.',
        'Analizas la información para identificar la forma en la que resolverá el planteamiento.',
        'Analizas de manera general la información, para identificar la forma en la que resolverá el planteamiento.',
        'Analizas la información para identificar la forma en la que resolverá el planteamiento.'
    ]
})

const reflex = new Feed('reflexiona', false, {
    group: 'thinking',
    range: [
        'Reflexionar con la forma adecuada de aplicacr métodos algebraicos.',
        'Reflexionas de forma regular y utilizas de manera incorrecta métodos algebraicos para resolver el problema planteado.',
        'Reflexionas y utilizas métodos algebraicos para resolver el problema planteado.'
    ]
})

const nomenclature = new Feed('nomenclatura correcta', false, {
    group: 'attitudinal',
    range: [
        'Atender la nomenclatura correcta del documento.',
        'Atiendes la nomenclatura solicitada al documento.'
    ]
})

const format = new Feed('formato', false, {
    group: 'attitudinal',
    range: [
        'No está en el formato solicitado el documento',
        'Entregas el documento en el formato solicitado.'
    ]
})
// falta agregar trabajo limpio y ordenado --> digital
//Formato solicitado ---> redactar

module.exports = [
    // analyze, //rehacer********
    identify,
    reflex,
    tecnology,
    attitudinal,
    orthography,
    critico,
    time,
    clean,
    information,
    nomenclature,
    format
];