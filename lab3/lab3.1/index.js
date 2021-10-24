const express = require('express');
const app = express();
const port = 80;
var names = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));

app.get('/lab0', (req, res)=>{

    res.render('address.ejs', {address: ''});
});

app.post('/lab0', (req, res)=>{
    let address = req.body.address;
    res.render('address.ejs', {address: address});
});

app.get('/lab1', (req, res)=>{
    let error = req.query.error;
    res.render('lab1.ejs', {error: error});
});

app.get('/lab2', (req, res)=>{

    res.render('lab2.ejs');
});

app.get('/lab3', (req, res)=>{

    res.render('lab3.ejs', { data: names});
});

app.post('/lab3', (req, res)=>{

    let d = req.body.names;
    names.push(d);
    res.render('lab3.ejs', { data: names});
});

app.get('/lab4', (req, res)=>{

    let xss = req.query.xss;
    let filterInput = xss.replace(/script/gmi, '');
    res.render('lab4.ejs', { data: filterInput});
});

app.get('/lab5', (req, res)=>{

    let regex = /on|script/gm;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        res.render('lab5.ejs', { data: xss });
    }    
});

app.get('/lab6', (req, res)=>{

    let regex = /on|script|javascript/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        res.render('lab6.ejs', { data: xss });
    }    
});

app.get('/lab7', (req, res)=>{

    let regex = /on|script|javascript/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        let lowerStr = xss.toLowerCase();
        res.render('lab7.ejs', { data: lowerStr });
    }   
});

app.get('/lab8', (req, res)=>{

    let regex = /alert|prompt|confirm/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        res.render('lab8.ejs', { data: xss });
    }  
});

app.get('/lab9', (req, res)=>{

    let regex =  /<|>/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);

    if(result) {
        res.render('blocked.ejs');
    } else {
        res.render('lab9.ejs', { data: xss });
    }  
});

app.get('/lab10', (req, res)=>{

    let regex = /on|script|javascript|<|>/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        let strLower = xss.toLowerCase();
        res.render('lab10.ejs', { data: strLower });
    }  
});

app.get('/lab11', (req, res)=>{

    let regex = /\'/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        let strLower = xss.toLowerCase();
        res.render('lab11.ejs', { data: strLower });
    }  
});

app.get('/lab12', (req, res)=>{
    res.render('lab12.ejs');
});

app.get('/lab12-frame', (req, res)=>{
    res.render('lab12frame.ejs');
});

app.get('/lab13', (req, res)=>{
    res.render('lab13.ejs');
});

app.get('/lab13-frame', (req, res)=>{
    res.setHeader('X-frame-options', 'Sameorigin');
    res.render('lab12frame.ejs');
});

// move to CSP
app.get('/baseeditor', (req, res)=>{
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.render('baseeditor.ejs');
});

// end move to CSP

app.get('/lab14', (req, res)=>{

    let regex = /on|script|svg|javascript|iframe|embed|alert|prompt|confirm/gmi;
    let xss = req.query.xss;
    let result = regex.test(xss);
    
    if(result) {
        res.render('blocked.ejs');
    } else {
        res.render('lab14.ejs', { data: xss });
    }  
});

// app.get('/lab15', (req, res)=>{

//     let regex = /on|script|svg|javascript|\bsrc\b|data|href|alert|prompt|confirm/gmi;
//     let xss = req.query.xss;
    
//     let result = regex.test(xss);
    
//     if(result) {
//         res.render('blocked.ejs');
//     } else {
//         res.render('lab15.ejs', { data: xss });
//     }  
// });

// trusted types

app.get('/trusted1', (req, res)=>{
    res.render('trusted.ejs');
});

app.get('/trusted2', (req, res)=>{
    res.render('trusted1.ejs');
});

app.get('/lab16', (req, res)=>{
    res.render('lab16.ejs', {data: ''});
});

app.post('/lab16', (req, res)=>{

    let regex = /\S+@\S+\.\S+/gmi;
    let xss = req.body.email;
    
    let result = regex.test(xss);
    
    if(result) {     
        res.render('lab16.ejs', { data: xss });
        
    } else {
        res.render('blocked.ejs');
    }  
});

app.get('/comments', (req, res)=>{
    let error = req.query.error;
    res.render('comment.ejs', {error: error});
});



app.listen(port, ()=>{console.log(`Server is running on port: ${port}`)});



