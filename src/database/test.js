const database = require('./db');
const createProffy = require('./createProffy');

database.then(async (db) => {
    //tabela proffy
    proffyValue = {
        name: 'Regis',
        avatar: 'https://avatars0.githubusercontent.com/u/8951100?s=460&u=cd7f59a13b2631dc3fbde67dee7eb3a5e9f926a1&v=4',
        whatsapp: '0154541245454120',
        bio: 'Programador',

    }

    //tabela classes
    classValue = {
        subject: 1,
        cost: 30,

    }

    //tabela classes_schedule
    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 2,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues});

    //consultar

    // todos os proffys
    const selectedProffys = await db.all("select * from proffys");
    //console.log(selectedProffys);

    // consultar as classes de um determinador professor
    // e trazer junto os dados do professor

    const proffy_id = 1;
    const selectClassesAndProffys = await db.all (`
        select c.*, p.*
          from classes c, proffys p
         where c.proffy_id = p.id
           and c.proffy_id = ${proffy_id}
    `);
    //console.log(selectClassesAndProffys);

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima
    const weekday = 2;
    const time = 530;
    const selectClassesSchedules = await db.all(`
        select cs.*
          from classes c, proffys p, class_schedule cs
         where c.proffy_id = p.id
           and cs.class_id = c.id
           and cs.weekday = ${weekday}
           and ${time} between cs.time_from and cs.time_to
    `);
    console.log(selectClassesSchedules);
})