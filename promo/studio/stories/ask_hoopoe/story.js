/* ask_hoopoe — قصة: يخجل من السؤال فيبقى معه → يسأل «اسأل هدهد» بلا حرج. أسلوب: مشاهد بخلفيات متغيرة (غرفة→مطر→فجر) + كاميرا + وجوه معبّرة */
CFG.dur=29.8;CFG.bgs=[[0,'room'],[4,'rain'],[9.6,'dawn']];CFG.dawnT=[9.6,15];CFG.mid=[18.2,21.2];CFG.appImgs=['ask','ty','t1'];
CFG.end.t0=24.4;CFG.end.phone='ask';CFG.end.pills=['أرسله لمن يخجل أن يسأل 🤍','احفظه لتجرب الموقع لاحقًا 🔖'];
CFG.cam=[[0,{z:1.18,x:400,y:1000}],[.9,{z:1,x:540,y:960},'eo'],[4,{z:1}],[5,{z:1.15,x:540,y:1000},'eio'],[9.5,{z:1.15,x:540,y:1000}],[10.4,{z:1,x:540,y:960},'eio']];
CFG.shakes.push([9.0,.5,10]);
const omar=char('omar',{x:250,path:[[0,250],[4,250],[5,540,'eo'],[9.5,540],[10.4,160,'eio']],
  keys:[[0,'fidget'],[5,'sad',.6],[10.5,'think',.5],[14.3,'idle',.3],[15.2,'cheer',.4],[17.8,'idle',.5],[21.5,'point',.5]],
  expr:[[0,'worry'],[5,'cry'],[10.5,'think'],[14.3,'happy']],talk:[],prop:[[0,null],[10.6,'phone'],[14.0,null]]});
const teacher=char('teacher',{x:830,face:-1,keys:[[0,'talk']],talk:[[0,4.2]],expr:[[0,'smile']],alpha:[[0,1],[4,1],[4.5,0]]});
const kid=char('kid',{x:650,face:-1,keys:[[0,'idle']],expr:[[0,'happy']],alpha:[[0,1],[4,1],[4.5,0]]});
const sara=char('sara',{x:950,face:-1,keys:[[0,'idle'],[22.4,'talk',.4]],expr:[[0,'happy']],alpha:[[0,0],[21.2,0],[21.6,1]]});
think(omar,.4,3.8,'عندي سؤال.. لكن أخجل!',{dx:150,dy:-190,sz:46});
think(omar,4.4,6.3,'ماذا سيظنون بي؟',{dy:-175,sz:46});think(omar,6.5,8.4,'الكل يعرف إلا أنا',{dy:-175,sz:46});think(omar,8.6,9.9,'سأسكت…',{dy:-175,sz:46});
say(omar,10.7,12.4,'ماذا لو أسأل دون حرج؟',{dx:150,dy:-190,sz:40});say(omar,15.6,17.6,'جاءني الجواب!',{dx:150,dy:-200,sz:42});
say(omar,21.6,23.2,'جرّبه الآن!',{dx:150,dy:-190,sz:42});say(sara,23.3,24.3,'الرابط في البايو!',{dx:-200,dy:-200,sz:42});
TOP.push([0,3.9,[[['عندك سؤال',GOLD],['في دينك؟',WH]],[['وتخجل',WH],['أن تسأل؟',GOLD]]],360,80]);
TOP.push([4,9.9,[[['فيبقى',WH],['السؤال',GOLD]],[['معك',WH],['أيامًا…',GOLD]]],360,76]);
TOP.push([10.1,14,[[['لكن',WH],['ماذا',GOLD],['لو…',GOLD]],[['سألت',WH],['سرًّا؟',GOLD]]],360,76]);
TOP.push([14.1,18,[[['اكتب',WH],['سؤالك',GOLD]],[['وتجد',WH],['الجواب',GOLD]]],360,74]);
TOP.push([21.6,24.3,[[['جرّب',GOLD],['«اسأل',WH],['هدهد»',GOLD]],[['الرابط',GOLD],['في',WH],['البايو',GOLD]]],360,66]);
CAP.push([.3,3.9,'عندك سؤال وتخجل أن تسأل؟'],[4.2,9.9,'فيصمت.. ويبقى السؤال معه'],[10.2,13.9,'ماذا لو سألت دون حرج؟',GOLD],[14.2,18,'يبحث لك.. وفي الفتاوى يحيلك لأهل العلم'],[21.7,24.3,'لا حرج.. فالسؤال أول العلم',GOLD]);
S.front=t=>{ // big question mark above omar that grows while he stays silent
 if(t<10){const k=t<4?1:1+P(4,9.5,t)*.9,x=posX(omar,t)+(t<4?-95:-150),y=GY0()-(t<4?470:400);g.save();g.translate(x,y+Math.sin(t*4)*10);g.scale(k,k);g.rotate(Math.sin(t*3)*.1);g.font='800 130px TJ';g.textAlign='center';g.fillStyle=t<4?GOLD:'#ff9a8a';g.shadowColor=g.fillStyle;g.shadowBlur=14;g.fillText('؟',0,0);g.restore()}
 phone(t,{cx:730,cy:960,w:380,h:760,in:10.4,vis:[[10.3,0],[10.9,1],[17.6,1],[18.4,0],[21.4,0],[22,1],[24.2,1],[24.4,0]],screens:[[10.4,12.7,'ask'],[12.7,14.2,'ty'],[14.2,18.1,'t1'],[21.4,24.6,'ask']],taps:[[13.9,0,334]],hl:[[14.8,17.8,-186,-70,372,255]]});
 hoopoeSide(t,10.6,18,950,1210,['hhappy','hwow','hcheer']);hoopoeSide(t,21.8,24.2,560,1215,['hcheer']);
 if(t>=14.3&&t<14.5){}burst(owx(t),GY0()-440,14.4,t);confetti(14.5,t,2.0,50)};
const GY0=()=>CFG.GY,owx=t=>posX(omar,t)+30;
S.over=t=>{pill(t,10.5,13.9,'🔒 سؤالك بينك وبينه',730,512,MINT,38);arrowUp(t,21.7,24.3,730,850,'🔗 الرابط في البايو')};
