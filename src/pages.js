const Database = require('./database/db');
const { subjects, weekdays, getSubjects, convertHoursToTime } = require('./utils/format');

function pageLanding(req, res) {
    return res.render("index.html");
}

async function pageStudy(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays });
    }

    const time = convertHoursToTime(filters.time);

    const query = `
        select c.*, p.*
          from classes c, proffys p
         where c.proffy_id = p.id
           and c.subject = '${filters.subject}'
           and exists (select null
                         from class_schedule cs
                        where cs.class_id = c.id
                          and cs.weekday = ${filters.weekday}
                          and ${time} between cs.time_from and cs.time_to)
    `;
	
	console.log(query);
	
    // inicio como vazio
    var proffys = [];

    try {
        const db = await Database;
        proffys = await db.all(query);

        proffys.map ((proffy) => {
            proffy.subject = getSubjects(proffy.subject);
        });

    } catch (error) {
        console.error("Erro catch: " + error);
    }

    return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
    const proffys = [];

    return res.render("give-classes.html", { proffys, subjects, weekdays });
}


async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy');

    //console.log(req.body);

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }


    const classScheduleValues = req.body.weekday
        .map((weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToTime(req.body.time_from[index]),
                time_to: convertHoursToTime(req.body.time_to[index])
            }
        });

    //console.log(classScheduleValues);

    const db = await Database;

    try {
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];

        return res.redirect("/study" + queryString);
    } catch (error) {
        console.log(error);
        //pageGiveClasses;
    }



}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}