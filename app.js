var express=require("express");
var path=require("path");
var routes = require('./route');
var app = express();
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'ejs');
var env =process.argv.slice(2)[1];
app.use(express.static(path.join(__dirname,env == "dev"?'public':'dist')));
routes(app);
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});