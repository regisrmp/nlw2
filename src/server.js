const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const Pages = require('./pages');

//configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});


/* habilta para receber no req.body *post* */
server.use(express.urlencoded({extended: true}));

/* import a pasta public para o servidor */
server.use(express.static("public"));

server.get("/", Pages.pageLanding);

server.get("/study", Pages.pageStudy);
//server.post("/study", Pages.pageStudy);

server.get("/give-classes", Pages.pageGiveClasses);
server.post("/save-classes", Pages.saveClasses);

server.listen(5500);

console.log('API ONLINE');
