const express = require('express');
const app = express();
const port = 80;
var names = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));


app.get('/lab1', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.render('baseeditor.ejs', {data: ''});
});

app.post('/lab1', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'");
        res.render('baseeditor.ejs', {data: data});

    } else {
        res.end();
    }

});

app.get('/lab2', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://code.jquery.com/ https://cdn.jsdelivr.net/; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor1.ejs', {data: ''});
});

app.post('/lab2', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://code.jquery.com/ https://cdn.jsdelivr.net/; style-src https://cdn.jsdelivr.net/");
        res.render('baseeditor1.ejs', {data: data});

    } else {
        res.end();
    }

});

app.get('/lab3', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://*.amazonaws.com; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor2.ejs', {data: ''});
});

app.post('/lab3', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://*.amazonaws.com; style-src https://cdn.jsdelivr.net/");
        res.render('baseeditor2.ejs', {data: data});

    } else {
        res.end();
    }

});



app.get('/lab4', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://cdnjs.cloudflare.com; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor3.ejs', {data: ''});
});

app.post('/lab4', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://cdnjs.cloudflare.com; style-src https://cdn.jsdelivr.net/");
        res.render('baseeditor3.ejs', {data: data});

    } else {
        res.end();
    }

});

app.get('/lab5', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' data: https://code.jquery.com/ https://cdn.jsdelivr.net/; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor4.ejs', {data: ''});
});

app.post('/lab5', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' data: https://code.jquery.com/ https://cdn.jsdelivr.net/; style-src https://cdn.jsdelivr.net/");
        res.render('baseeditor4.ejs', {data: data});

    } else {
        res.end();
    }

});

app.get('/lab6', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://accounts.google.com/; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor5.ejs', {data: ''});
});

app.post('/lab6', (req, res)=>{
    let data = req.body.data;

    if(data) {

        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com/ https://cdn.jsdelivr.net/ https://accounts.google.com/; style-src https://cdn.jsdelivr.net/");
        res.render('baseeditor5.ejs', {data: data});

    } else {
        res.end();
    }

});

app.get('/lab7', (req, res)=>{

    let token = req.query.token;

    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; report-uri http://lab.com/logs/"+token);
    res.render('baseeditor6.ejs');
});


app.get('/lab8', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com/ https://cdn.jsdelivr.net/; style-src https://cdn.jsdelivr.net/");
    res.render('baseeditor7.ejs', { d: {token: '', data: ''}} );
});


app.post('/lab8', (req, res)=>{

    let data = req.body.data;
    if(data) {
        let tokens = [
            'rPg1abZ/22KZKv/EFFNIvQ==',
            'Du8f+xPqAeyl23GPD7aP8w==',
            'LXn1t2BaXPiBGRlK6e/WcA==',
            'xNfov8fqEx9chY6zVW+ZMQ==',
            'XN9nbLtxDjlaE9UuwRNiDg=='
        ]
    
        let finalToken = tokens[Math.floor(Math.random() * 5)];
        res.setHeader("Content-Security-Policy", `default-src 'self'; script-src 'nonce-${finalToken}'; style-src https://cdn.jsdelivr.net/`);
        res.render('baseeditor7.ejs', { d: {token: finalToken, data: data}});
    } else {
        res.end();
    }
});

app.get('/lab9', (req, res)=>{

    let data = req.query.number;

    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; img-src *");
    res.render('secret.ejs', {data:data});
});

app.listen(port, ()=>{console.log(`Server is running on port: ${port}`)});



