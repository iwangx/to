var qr = require('qr-image');

module.exports = function(app) {
    app.get("/",function(req,res){
        res.render("index",{});
    });

    app.get("/error",function(req,res){
        res.render("error",{host:req.query.href});
    });

    app.get("/create_qrcode",function(req,res){
        var text = req.query.text;
        try {
            var img = qr.image(text,{size :10});
            res.writeHead(200, {'Content-Type': 'image/png'});
            img.pipe(res);
        } catch (e) {
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('<h1>414 Request-URI Too Large</h1>');
        }
    });
};