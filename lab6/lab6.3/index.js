const express = require('express');
const app = express();
const port = 8000;

app.get('/status', (req, res)=>{
    res.json({'Status':'Up & Running!'});
});

app.use(express.static('public'));
app.listen(port, ()=>{console.log(`Server is running on PORT: ${port}`)});