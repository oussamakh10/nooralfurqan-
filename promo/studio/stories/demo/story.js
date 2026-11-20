/* story: demo — idea / hook / method / what differs from previous videos: (fill in) */
CFG.dur=29.8;CFG.bg='mosque';           // night|mosque|city|desert|rain|room|dawn|orbit|space
CFG.mid=[18.2,21.2];                    // like/follow card window (keep scenes empty around it)
CFG.end.t0=24.4;CFG.end.phone='home';CFG.end.pills=['أرسله لمن يهمه الأمر 🤍','احفظه لتجرب الموقع لاحقًا 🔖'];
// camera (optional): CFG.cam=[[0,{z:1}],[4,{z:1.25,x:300,y:1100},'eio'],[8,{z:1}]]; CFG.shakes.push([5,.5,14]);
const omar=char('omar',{x:240,keys:[[0,'idle'],[1.2,'point',.5],[4,'cheer',.4]],expr:[[0,'smile'],[1.2,'open']]});
const sara=char('sara',{x:860,face:-1,keys:[[0,'idle'],[3,'talk',.5]]});
say(omar,.3,2.6,'ماذا لو…؟');say(sara,2.8,5.2,'جرّب أولًا!');
TOP.push([0,2.5,[[['ماذا لو',GOLD],['بدأت',WH]],[['اليوم؟',GOLD]]],360,76]);
CAP.push([.2,2.4,'ماذا لو بدأت اليوم؟']);
S.world=t=>{phone(t,{cx:540,cy:960,w:300,h:600,in:0,vis:[[0,1],[17.6,1],[18.4,0],[21.4,0],[22,1],[24.2,1],[24.4,0]],screens:[[0,6,'home'],[6,12,'learn'],[21.4,24.5,'home']]})};
S.over=t=>{pill(t,2.6,6,'① السيناريو الأرجح',540,548,CYAN);arrowUp(t,21.7,24.3,540,820,'🔗 الرابط في البايو')};
