
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {

    proffyValue.avatar = proffyValue.avatar ? proffyValue.avatar : "/images/icons/without-image.svg" ;

    // inserir os dados na tabela de proffys
    const insertedProffy = await db.run(`
        insert into proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) values (
            '${proffyValue.name}',
            '${proffyValue.avatar}',
            '${proffyValue.whatsapp}',
            '${proffyValue.bio}'
        );
    `).catch((error) => {
        console.log("insertedProffy: " + error);
    });;

    const proffy_id = insertedProffy.lastID;

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
        insert into classes (
            subject,
            cost,
            proffy_id
        ) values (
            '${classValue.subject}',
            '${classValue.cost}',
            ${proffy_id}
        );
    `).catch((error) => {
        console.log("insertedClass: " + error);
    });;

    const class_id = insertedClass.lastID;

    // o map percorre o array e devolve uma function dentro do classScheduleValues
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            insert into class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) values (
                ${class_id},
                ${classScheduleValue.weekday},
                ${classScheduleValue.time_from},
                ${classScheduleValue.time_to}
            );
        `).catch((error) => {
            console.log("insertedAllClassScheduleValues: " + error);
        });
    });

    // aqui vou executar todos os inserts guardados no array de classScheduleValues
    await Promise.all(insertedAllClassScheduleValues);
}