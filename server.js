var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var googleSpreadsheet = require('google-spreadsheet');
var async = require('async'); //testing google spreadsheet api//

// var {google} = require('googleapis');
// var fs = require('fs');
// var readline = require('readline');
//database
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGO_DB, {useMongoClientCient: true});
var db = mongoose.connection;
db.once('open', function() {
    console.log('DB connected!');
});
db.on('error', function (err) {
    console.log('DB ERROR : ', err);
});

//Middlewares
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// app.use(function (req, res, next){
//     res.header('Access-Control-Allow-Origin');
//     res.header('Access-Cotrol-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'content-type');
//     next();
// });



var doc = new googleSpreadsheet('1KpgW0E_Oa_BwoFxWIS6eLrgho6WaBzNaoU6gC4rdmGI');
var sheet;

async.series([
    function setAuth(step) {
        var creds_json = {
            client_email: 'jaram-groupware@jaram-groupware.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgZ3dRfJhEWc+e\nq9oSB34fh1rzrR9bnnOQy9ccN+McRXFTYCZxHC8M20BNpSjqZzm85MPMqq7j5uek\nfKEM2TqFpn7i1WKzJMLAZNoQyQpo+s3IpSMCGmVLRp4MNK3hrtrewljNGrgNpOt8\n4dDRMSE9ZBZJUxlWaTwrcUmmG0oW8OgvSSniYfOXqjVV4AFZ5sA3Qnl7XtUlfjC3\niRewavJiz8q9NQaDfpWbi1yYxRl4SP+mQwqbe6xkOu9tTfOi4fhjh8UU+BsOid//\nVbJRIZtG8Ch40j4LIu5qd/T6lLRf2IqqV5hLgwcWD6yom3JzhwNI3vbhLCxGHa2l\nbSnh6J2pAgMBAAECggEAEj/N70CV0Z+cLkkOrY1vrSZI/pSRjuq8lYUzdduVOagG\n6ChLcgP1sGiYwhy1G9IJsMggJKlomLeHtDWVBxwHJfcsKXeDMVl7Kh4Z7IigPWhc\nwDlVfc2Yp6ii85riC4f0ER2bB8lvQOd5/pfHGlMUx+Iat6s+JJAizy3Q5haQZoKX\njslTubm4yHaMRs8jUbfMDJr9Cjzo7nDuSWl9jpIENc2+Du/YlycAlQoQPFVeEmjx\n0P0BDODHCCyAcQWHyNbtXXagZlpzloD8dgt+bg1XlFyYaM7jUKLJBAog5VT5mTnG\n4uNfpcrvaMZzRKlfNARsx6FSwi9sgsRDGV5hyvgKTwKBgQDVXfPQoATZrEeVkLvG\nnYezbr3A9NMzi88GzGNXZqNudHRGLjUu46U0crz6cmfd6kEezoxXx4SyTqumJ1eX\nh9l7QnrshlC/IDtu3nPQrkLFYQummf4+zy2Ix3Cmdu0kq9CXLggNkDAZbQ0yBGoo\noa+tYYWesJTLcvz0lddqycznxwKBgQDAdGI/E+fm4CnxH6kKVec4iKrX/Zmse80c\nwcEIja8K8brFUVshNTuxThIb9SGkvSpBinlcCpoOFd+PlTHZn6toc80WL/0TcSC6\nNogPDYOSPdmtVEHg9N9Qp0Ccw0elX1+Yo0yrB1HD+LQmeTUQY3EG98wTSunb4fZR\nvVsNe9qvDwKBgQCqyuYcHbtEMq+qfYyR1A+IBiFGj7NwE33Ix1rN3477H6TjeKGB\nwx+++AllwKZ78MPn0RZuPXtu76JfAicPWOMx02lqY6nHFBn/CXpTlOpF7QTSe3oU\n9OpSDrORzKjPLelu2p3/nWejMrPZUcdYdvSVKPc4q8ivgoARmNAy3w5yiQKBgQCU\n5XZddvkkFqpcczJFXNDXXGVRVlNerymx5fWCuJuEzCDEKH1o49abBtvb5XtyCSh4\nLLpYC5vE6gdc/wDibjYfSfiSAe666/t2FlqNytbQfim7gES31rwvmjbTEgKMX42G\nelEGwVLxW6mFWqFDXKxFx9GL25mzFM+NzgJ0HC7E4QKBgH7mbz3U8ifEzOKfOqak\njNIrSmkXpMUYZtUFqk2Flai6mG1IWk9tOtZ0Y721DqEDqhJAj8kOEUaMYLtsKQuY\nMapmSIeIaeEzo8tWYTH/j2Wu0u/W07c7+Xw8u0ONDHztV2/KB8c6IYhWlWm6T6cC\nrfqrXBbyBTWZvvBnH0LGuSik\n-----END PRIVATE KEY-----\n'
        }
        doc.useServiceAccountAuth(creds_json, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function (err, info) {
            console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
            step();
        });
    },
    function workingWithRows(step) {
        // google provides some query options
        sheet.getRows({
            offset: 1,
            limit: 20,
            orderby: 'col2'
        }, function (err, rows) {
            console.log('Read ' + rows.length + ' rows');

            // the row is an object with keys set by the column headers
            console.log(rows);
            // console.log(rows[0]._cokwr);
            //  _cokwr: '날짜',
            //      _cpzh4: '분류',
            //      _cre1l: '내용',
            //      _chk2m: '현금 수입',
            //      _ciyn3: '현금 지출',
            //      _ckd7g: '카드 수입',
            //      _clrrx: '카드지출',
            //      _cyevm: '변동액',
            //      _cztg3: '현금 잔액',
            //      _d180g: '통장 잔액',
            //      _d2mkx: '총 잔액',
            //      _cssly: '비고',

        });
    }
            

    // function workingWithRows(step){
    //     sheet.getRows({
    //         offset: 1,
    //         limit: 20,
    //         orderby: 'col2'
    //     }, function(err, rows){
    //         console.log('read '+rows.length+' rows');
    //         // the row is an object with keys set by the column headers
    //         rows[0].colname = 'new val';
    //         rows[0].save(); 

    //         // deleting a row
    //         rows[0].del(); // this is async

    //         step();
    //     });
    // },
    // function workingWithCells(step) {
    //     sheet.getCells({
    //         'min-row': 1,
    //         'max-row': 5,
    //         'return-empty': true
    //     }, function (err, cells) {
    //         var cell = cells[0];
    //         console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);

    //         // cells have a value, numericValue, and formula
    //         cell.value == '1';
    //         cell.numericValue == 1;
    //         cell.formula == '=ROW()';

    //         // updating `value` is "smart" and generally handles things for you
    //         cell.value = 123;
    //         cell.value = '=A1+B2'
    //         cell.save(); //async

    //         // bulk updates make it easy to update many cells at once
    //         cells[0].value = 1;
    //         cells[1].value = 2;
    //         cells[2].formula = '=A1+B1';
    //         sheet.bulkUpdateCells(cells); //async

    //         step();
    //     });
    // }
], function (err) {
    if (err) {
        console.log('ERR: ' + err);
    }
});

//end of testing google spteadsheet api//




//API - 라우팅 역할
const indexRouter = require('./routes/index');
app.use(['/', '/index'], indexRouter);



//server
var port = 3001;
app.listen(port, function(){
    console.log('Listening on port : '+ port);
});