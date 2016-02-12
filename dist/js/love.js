!function(a){function b(a,b){return a+Math.floor(Math.random()*(b-a+1))}function c(a,b){var c=a[0].mul((1-b)*(1-b)),d=a[1].mul(2*b*(1-b)),e=a[2].mul(b*b);return c.add(d).add(e)}function d(a,b,c){var d=(a/c*(a/c)+b/c*(b/c)-1)*(a/c*(a/c)+b/c*(b/c)-1)*(a/c*(a/c)+b/c*(b/c)-1)-a/c*(a/c)*(b/c)*(b/c)*(b/c);return 0>d}Point=function(a,b){this.x=a||0,this.y=b||0},Point.prototype={clone:function(){return new Point(this.x,this.y)},add:function(a){return p=this.clone(),p.x+=a.x,p.y+=a.y,p},sub:function(a){return p=this.clone(),p.x-=a.x,p.y-=a.y,p},div:function(a){return p=this.clone(),p.x/=a,p.y/=a,p},mul:function(a){return p=this.clone(),p.x*=a,p.y*=a,p}},Heart=function(){for(var a,b,c,d=[],e=10;30>e;e+=.2)c=e/Math.PI,a=16*Math.pow(Math.sin(c),3),b=13*Math.cos(c)-5*Math.cos(2*c)-2*Math.cos(3*c)-Math.cos(4*c),d.push(new Point(a,b));this.points=d,this.length=d.length},Heart.prototype={get:function(a,b){return this.points[a].mul(b||1)}},Seed=function(a,b,c,d){this.tree=a;var c=c||1,d=d||"#FF0000";this.heart={point:b,scale:c,color:d,figure:new Heart},this.cirle={point:b,scale:c,color:d,radius:5}},Seed.prototype={draw:function(){this.drawHeart(),this.drawText()},addPosition:function(a,b){this.cirle.point=this.cirle.point.add(new Point(a,b))},canMove:function(){return this.cirle.point.y<this.tree.height+20},move:function(a,b){this.clear(),this.drawCirle(),this.addPosition(a,b)},canScale:function(){return this.heart.scale>.2},setHeartScale:function(a){this.heart.scale*=a},scale:function(a){this.clear(),this.drawCirle(),this.drawHeart(),this.setHeartScale(a)},drawHeart:function(){var a=this.tree.ctx,b=this.heart,c=b.point,d=b.color,e=b.scale;a.save(),a.fillStyle=d,a.translate(c.x,c.y),a.beginPath(),a.moveTo(0,0);for(var f=0;f<b.figure.length;f++){var g=b.figure.get(f,e);a.lineTo(g.x,-g.y)}a.closePath(),a.fill(),a.restore()},drawCirle:function(){var a=this.tree.ctx,b=this.cirle,c=b.point,d=b.color,e=b.scale,f=b.radius;a.save(),a.fillStyle=d,a.translate(c.x,c.y),a.scale(e,e),a.beginPath(),a.moveTo(0,0),a.arc(0,0,f,0,2*Math.PI),a.closePath(),a.fill(),a.restore()},drawText:function(){var a=this.tree.ctx,b=this.heart,c=b.point,d=b.color,e=b.scale;a.save(),a.strokeStyle=d,a.fillStyle=d,a.translate(c.x,c.y),a.scale(e,e),a.moveTo(0,0),a.lineTo(15,15),a.lineTo(60,15),a.stroke(),a.moveTo(0,0),a.scale(.75,.75),a.font="12px 微软雅黑,Verdana",a.fillText("click here",23,16),a.restore()},clear:function(){var a=this.tree.ctx,b=this.cirle,c=b.point,d=b.scale,e=26,f=h=e*d;a.clearRect(c.x-f,c.y-h,4*f,4*h)},hover:function(a,b){var c=this.tree.ctx,d=c.getImageData(a,b,1,1);return 255==d.data[3]}},Footer=function(a,b,c,d){this.tree=a,this.point=new Point(a.seed.heart.point.x,a.height-c/2),this.width=b,this.height=c,this.speed=d||2,this.length=0},Footer.prototype={draw:function(){var a=this.tree.ctx,b=this.point,c=this.length/2;a.save(),a.strokeStyle="rgb(35, 31, 32)",a.lineWidth=this.height,a.lineCap="round",a.lineJoin="round",a.translate(b.x,b.y),a.beginPath(),a.moveTo(0,0),a.lineTo(c,0),a.lineTo(-c,0),a.stroke(),a.restore(),this.length<this.width&&(this.length+=this.speed)}},Tree=function(a,b,c,d){this.canvas=a,this.ctx=a.getContext("2d"),this.width=b,this.height=c,this.opt=d||{},this.record={},this.initSeed(),this.initFooter(),this.initBranch(),this.initBloom()},Tree.prototype={initSeed:function(){var a=this.opt.seed||{},b=a.x||this.width/2,c=a.y||this.height/2,d=new Point(b,c),e=a.color||"#FF0000",f=a.scale||1;this.seed=new Seed(this,d,f,e)},initFooter:function(){var a=this.opt.footer||{},b=a.width||this.width,c=a.height||5,d=a.speed||2;this.footer=new Footer(this,b,c,d)},initBranch:function(){var a=this.opt.branch||[];this.branchs=[],this.addBranchs(a)},initBloom:function(){for(var a=this.opt.bloom||{},b=[],c=a.num||500,d=a.width||this.width,e=a.height||this.height,f=this.seed.heart.figure,g=240,h=0;c>h;h++)b.push(this.createBloom(d,e,g,f));this.blooms=[],this.bloomsCache=b},toDataURL:function(a){return this.canvas.toDataURL(a)},draw:function(a){var b=this,c=b.ctx,d=b.record[a];if(d){var e=d.point,f=d.image;c.save(),c.putImageData(f,e.x,e.y),c.restore()}},addBranch:function(a){this.branchs.push(a)},addBranchs:function(a){for(var b,c,d,e,f,g,h,i=this,j=0;j<a.length;j++)b=a[j],c=new Point(b[0],b[1]),d=new Point(b[2],b[3]),e=new Point(b[4],b[5]),f=b[6],g=b[7],h=b[8],i.addBranch(new Branch(i,c,d,e,f,g,h))},removeBranch:function(a){for(var b=this.branchs,c=0;c<b.length;c++)b[c]===a&&b.splice(c,1)},canGrow:function(){return!!this.branchs.length},grow:function(){for(var a=this.branchs,b=0;b<a.length;b++){var c=a[b];c&&c.grow()}},addBloom:function(a){this.blooms.push(a)},removeBloom:function(a){for(var b=this.blooms,c=0;c<b.length;c++)b[c]===a&&b.splice(c,1)},createBloom:function(a,c,e,f,g,h,i,j,k,l){for(var m,n;;)if(m=b(20,a-20),n=b(20,c-20),d(m-a/2,c-(c-40)/2-n,e))return new Bloom(this,new Point(m,n),f,g,h,i,j,k,l)},canFlower:function(){return!!this.blooms.length},flower:function(a){for(var b=this,c=b.bloomsCache.splice(0,a),d=0;d<c.length;d++)b.addBloom(c[d]);c=b.blooms;for(var e=0;e<c.length;e++)c[e].flower()},snapshot:function(a,b,c,d,e){var f=this.ctx,g=f.getImageData(b,c,d,e);this.record[a]={image:g,point:new Point(b,c),width:d,height:e}},setSpeed:function(a,b){this.record[a||"move"].speed=b},move:function(a,b,c){var d=this,e=d.ctx,f=d.record[a||"move"],g=f.point,h=f.image,k=f.speed||10,l=f.width,m=f.height;return i=g.x+k<b?g.x+k:b,j=g.y+k<c?g.y+k:c,e.save(),e.clearRect(g.x,g.y,l,m),e.putImageData(h,i,j),e.restore(),f.point=new Point(i,j),f.speed=.95*k,f.speed<2&&(f.speed=2),i<b||j<c},jump:function(){var a=this,c=a.blooms;if(c.length)for(var d=0;d<c.length;d++)c[d].jump();if(c.length&&c.length<3||!c.length)for(var e=this.opt.bloom||{},f=e.width||this.width,g=e.height||this.height,h=this.seed.heart.figure,i=240,d=0;d<b(1,2);d++)c.push(this.createBloom(f/2+f,g,i,h,null,1,null,1,new Point(b(-100,600),720),b(200,300)))}},Branch=function(a,b,c,d,e,f,g){this.tree=a,this.point1=b,this.point2=c,this.point3=d,this.radius=e,this.length=f||100,this.len=0,this.t=1/(this.length-1),this.branchs=g||[]},Branch.prototype={grow:function(){var a,b=this;b.len<=b.length?(a=c([b.point1,b.point2,b.point3],b.len*b.t),b.draw(a),b.len+=1,b.radius*=.97):(b.tree.removeBranch(b),b.tree.addBranchs(b.branchs))},draw:function(a){var b=this,c=b.tree.ctx;c.save(),c.beginPath(),c.fillStyle="rgb(35, 31, 32)",c.shadowColor="rgb(35, 31, 32)",c.shadowBlur=2,c.moveTo(a.x,a.y),c.arc(a.x,a.y,b.radius,0,2*Math.PI),c.closePath(),c.fill(),c.restore()}},Bloom=function(a,c,d,e,f,g,h,i,j){this.tree=a,this.point=c,this.color=e||"rgb(255,"+b(0,255)+","+b(0,255)+")",this.alpha=f||b(.3,1),this.angle=g||b(0,360),this.scale=h||.1,this.place=i,this.speed=j,this.figure=d},Bloom.prototype={setFigure:function(a){this.figure=a},flower:function(){var a=this;a.draw(),a.scale+=.1,a.scale>1&&a.tree.removeBloom(a)},draw:function(){var a=this,b=a.tree.ctx,c=a.figure;b.save(),b.fillStyle=a.color,b.globalAlpha=a.alpha,b.translate(a.point.x,a.point.y),b.scale(a.scale,a.scale),b.rotate(a.angle),b.beginPath(),b.moveTo(0,0);for(var d=0;d<c.length;d++){var e=c.get(d);b.lineTo(e.x,-e.y)}b.closePath(),b.fill(),b.restore()},jump:function(){var a=this,b=a.tree.height;a.point.x<-20||a.point.y>b+20?a.tree.removeBloom(a):(a.draw(),a.point=a.place.sub(a.point).div(a.speed).add(a.point),a.angle+=.05,a.speed-=1)}},a.random=b,a.bezier=c,a.Point=Point,a.Tree=Tree}(window),function(){function timeElapse(a){var b=new Date,c=(Date.parse(b)-Date.parse(a))/1e3,d=Math.floor(c/86400);c%=86400;var e=Math.floor(c/3600);10>e&&(e="0"+e),c%=3600;var f=Math.floor(c/60);10>f&&(f="0"+f),c%=60,10>c&&(c="0"+c),day.innerHTML=d,hour.innerHTML=e,minute.innerHTML=f,second.innerHTML=c}var $=function(a){return document.getElementById(a)},countdown=$("countdown"),day=$("day"),hour=$("hours"),minute=$("minutes"),second=$("seconds"),msg=["潇潇:","今天是个特殊的日子","我要向你说出内心里的话","认识你是我最大的幸运","你是一个可爱,温柔,甜美,傻傻的女孩","每次看到你都很心动","每次知道你加班我也会很心疼","不要加那么多班了好吗","工作永远都做不完,我只希望你健康快乐","记得我们去三圣乡摘梅花","每一刻每一秒都像电影胶片在我脑海浮现","这是我们仅有的美好,希望美好越来越多","我有时候做事可能让你很尴尬,以后我会尊重你的感受","不去你们公司楼下接你","不过我真的希望能多见见你","希望以后的我们能够多了解,多熟悉","我也不希望给你太多压力","我怕你会不理我","我怕一段良缘就此错过","我喜欢你","在这峥嵘的岁月你","我喜欢你","那个温柔善良的你"],btn=$("btn"),input=$("input"),canvas=$("canvas"),width=canvas.width,height=canvas.height,canvasParent=canvas.parentNode,login=$("login"),msgDom=$("msg"),scale=document.documentElement.getBoundingClientRect().width/width;canvasParent.style.transform="scale("+scale+","+scale+")",btn.addEventListener("click",function(){/15884514853/.test(input.value)?(login.classList.add("out"),setTimeout(function(){runAsync().start()},1e3)):alert("请输入正确的手机号码啊！")});var opts={seed:{x:width/2-20,color:"rgb(190, 26, 37)",scale:1},branch:[[535,680,570,250,500,200,30,100,[[540,500,455,417,340,400,13,100,[[450,435,434,430,394,395,2,40]]],[550,445,600,356,680,345,12,100,[[578,400,648,409,661,426,3,80]]],[539,281,537,248,534,217,3,40],[546,397,413,247,328,244,9,80,[[427,286,383,253,371,205,2,40],[498,345,435,315,395,330,4,60]]],[546,357,608,252,678,221,6,100,[[590,293,646,277,648,271,2,80]]]]]],bloom:{num:666,width:1100,height:680}},tree=new Tree(canvas,width,height,opts),growAnimate=eval(Jscex.compile("async",function(){do tree.grow(),$await(Jscex.Async.sleep(10));while(tree.canGrow())})),flowAnimate=eval(Jscex.compile("async",function(){do tree.flower(2),$await(Jscex.Async.sleep(10));while(tree.canFlower())})),moveAnimate=eval(Jscex.compile("async",function(){for(tree.snapshot("p1",240,0,610,680);tree.move("p1",500,0);)$await(Jscex.Async.sleep(10));canvas.parentNode.style.background="url("+tree.toDataURL("image/png")+")",$await(Jscex.Async.sleep(300))})),jumpAnimate=eval(Jscex.compile("async",function(){for(;;)tree.ctx.clearRect(0,0,width,height),tree.jump(),$await(Jscex.Async.sleep(25))})),textAnimate=eval(Jscex.compile("async",function(){var a=new Date;for(a.setFullYear(2016,0,9),a.setHours(20),a.setMinutes(20),a.setSeconds(0),a.setMilliseconds(0);;)timeElapse(a),$await(Jscex.Async.sleep(1e3))})),index=0,topTextAnimate=function(){var a=msg[index];if(!a)return!1;var b=a.length,c=null,d=0,e=document.createElement("p");msgDom.appendChild(e),c=setInterval(function(){var f=document.createElement("span");f.innerHTML=a.charAt(d),e.appendChild(f),d++===b&&(clearInterval(c),index++,setTimeout(topTextAnimate,300))},150)},runAsync=eval(Jscex.compile("async",function(){$await(growAnimate()),$await(flowAnimate()),$await(moveAnimate()),countdown.classList.add("show"),textAnimate().start(),topTextAnimate(),$await(jumpAnimate())}))}();