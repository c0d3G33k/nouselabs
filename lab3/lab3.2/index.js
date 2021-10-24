const express = require('express');
const SimpleMarkdown = require('simple-markdown');
const app = express();
const port = 80;


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.render('index.ejs', {address: ''});
});

app.post('/', (req, res)=>{

    var mdOutput = SimpleMarkdown.defaultHtmlOutput;
    var implicitParse = SimpleMarkdown.defaultImplicitParse;
    var syntaxTree = implicitParse(req.body.data);
    var parsed_payload = mdOutput(syntaxTree);

    res.render('index.ejs', {address: parsed_payload});
});

app.listen(port, ()=>{console.log(`Server is running on PORT: ${port}`)});