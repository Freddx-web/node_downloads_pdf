const express = require('express');
const app = express();
const compression = require('compression');
const morgan = require('morgan')
const cors = require('cors');
const pdf = require('html-pdf');
// settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// middlewares

// compress all responses
app.use(compression());

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('combined'));

// routes
//app.use('/api/v1/downloads_pdf', require('./routes/downloads_pdf'));
const content = `
   <h1>title: SolGym PDF</h1>
   <p>  
        <li>id: @id</li>
        <li>member: @member</li>
        <li>email: @email</li>
        <li>date: @date</li>
   </p>
`;

pdf.create(content).toFile('./src/uploads-pdf/SolGym-pdf.pdf', function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log('successful PDF download');
    }
});


app.use(function (req, res, next) {
    res.status(404).json({ errortype: 'Error 404', msg: 'la pagina que solicitastes no existe'});
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({ errortype: 'Error 500', msg: 'unexpected'});
})

module.exports = app;


