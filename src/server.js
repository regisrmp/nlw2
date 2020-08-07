
const proffys = [
    /*{
        name: "Regis",
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQGOrKt_fmyiQg/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=v0QEpHd_erUp0d-f1gTiEgiI1Y4xzes4i3q-aeJlOBo",
        whatsapp: "19991581989",
        bio: "Biografia",
        subject: "Química",
        cost: 20,
        week: [0],
        time_from: [720],
        time_to: [1220]
    },

    {
        name: "Regis 2",
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQGOrKt_fmyiQg/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=v0QEpHd_erUp0d-f1gTiEgiI1Y4xzes4i3q-aeJlOBo",
        whatsapp: "19991581989",
        bio: "Biografia",
        subject: "Química",
        cost: 20,
        week: [0],
        time_from: [720],
        time_to: [1220]
    }*/
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",

];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

// FUNCIONALIDADES

function getSubjects(subjectNumber) {
    const arrayPosition = +subjectNumber - 1;
    return subjects[arrayPosition];
}


const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

function pageLanding(req, res) {
    return res.render("index.html");
}

function pageStudy(req, res) {
    const filters = req.query;
    return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
    const data = req.query;

    // checa as chaves do objeto
    const isNotEmpty = Object.keys(data).length > 0;

    //se tiver dados
    if (isNotEmpty) {
        //adicionar dados a lista de proffys
        data.subject = getSubjects(data.subject);

        proffys.push(data);
        return res.redirect("/study");
    }

    // senao mostro a pagina
    return res.render("give-classes.html", { proffys, subjects, weekdays });
}


//configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

/* import a pasta public para o servidor */
server.use(express.static("public"));

server.get("/", pageLanding);

server.get("/study", pageStudy);

server.get("/give-classes", pageGiveClasses);

server.listen(5500);
