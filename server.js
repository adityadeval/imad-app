var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var Pool=require('pg').Pool;
var config={
    user:"adityadeval27",
    database:"adityadeval27",
    host:"db.imad.hasura-app.io",
    port:"5432",
    password:process.env.DB_PASSWORD
};
/*
articleone={title:"Duplicate",
    "heading":"Duplicate article",
    "date":"12000000",
    "data":`<p>
                    I am a duplicate article.
                    I am a duplicate article.
                    I am a duplicate article.
                    </p>
                    <p>
                    I am a duplicate article.
                    </p>
                    <p>
                    I am a duplicate article.
                    </p>`};
*/

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new Pool(config);
app.get('/:varName', function (req, res) {
  var variable=req.params.varName;
  pool.query('SELECT * FROM "Articles" where "title"='+"'"+variable+"';" ,function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }else{
         var articleData=result.rows[0];
         res.send(createTemplate(articleData));
     }
  });
});






/*
    Articles=
    {
        articleone:{title:"Article One|Aditya Deval",
        "heading":"Article One",
        "date":"19 Sept 2017",
        "data":`<p>
                        This is paragraph one.
                        This is paragraph one.
                        This is paragraph one.
                        This is paragraph one.
                        This is paragraph one.
                        </p>
                        <p>
                        This is paragraph two.
                        </p>
                        <p>
                        This is paragraph three.
                        </p>`},
        articletwo:{title:"Article Two|Aditya Deval",
        heading:"Article Two",
        date:"18 September 2017 (Article 2)",
        data:`<p>
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    </p>
                    <p>
                    This is paragraph two.
                    </p>
                    <p>
                    This is paragraph three.
                    </p>`},
        articlethree:{title:"Article Three|Aditya Deval",
        heading:"Article Three",
        date:"18 September 2017 (Article Three)",
        data:`<p>
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    This is paragraph one.
                    </p>
                    <p>
                    This is paragraph two.
                    </p>
                    <p>
                    This is paragraph three.
                    </p>`}
    };
*/    

function createTemplate(content)
{
    var title=content.title;
    var date=content.date;
    var heading=content.heading;
    var data=content.data;
    var htmlTemplate =
        `<html>
            <head>
                <title>
                     ${title}
                </title>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class="container">
                    <div>
                        <a href="/">
                        HOME
                        </a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                        ${data}
                    </div>
                </div>
            </body>
        </html>`;
    return htmlTemplate;
}



var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

var nameArray=[];
app.get('/submit-name/:urlName',function (req, res){
   var name=req.params.urlName;
   nameArray.push(name);
   res.send(JSON.stringify(nameArray));
});

/*
var nameArray=[];
app.get('/submit-name',function (req, res){
   var name=req.query.urlName;
   res.send(name);
   nameArray.push(name);
   res.send(JSON.stringify(nameArray));
});
*/

//app.get('/articleone',function(req,res){
//   res.send(createTemplate(articleone)); 
//});

/*
app.get('/:variable', function (req, res) {
  var variable2=req.params.variable;
  res.send(createTemplate(Articles[variable2]));
});
*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
