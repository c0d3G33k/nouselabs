const express = require('express');
const needle = require('needle');
const _ = require('lodash');
const app = express();
const port = 3000;

const users = {};
const history = {};
const resultData = {};

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const fetchData = (tobeFetchedURL)=>{
    
    return new Promise((resolve, reject)=>{

        needle.get(tobeFetchedURL, (err, response)=>{
            if(!err && response.statusCode == 200) {
                resultData[0] = response.body;
                resolve();
            } else {
                resultData[0] = 'Error';
                reject();
            }
        });
    });
}

app.get('/', (req, res)=>{
    res.setHeader('Content-type', 'Application/json');
    res.json({'status':'Up & Running!'});
});

app.post('/',(req, res)=>{

    let data = req.body;

    if(data) {

        _.merge(history, req.body);
        let url = req.body.url;

        const result = async()=>{
            
            try {

                await fetchData(url);
                res.setHeader('Content-type', 'Application/json');
                res.json(resultData[0]);
                res.end();
                
            } catch (error) {

                res.end();
                
            }
        }
        result();

    } else {
        res.json({'Failed':'Please provide required paramters!'});
    }
    
    
});

app.get('/history', (req, res)=>{
    res.setHeader('Content-type', 'Application/json');
    res.json(history);
});

app.get('/checkItems',(req, res)=>{
    res.setHeader('Content-type', 'application/json');

    if(users.isAdmin) {
        res.sendFile('adminavailable.json',{root: __dirname});    
    } else {
        res.sendFile('available.json',{root: __dirname});
    }
});

app.listen(port, ()=>{console.log(`Server is running on PORT: ${port}`)});