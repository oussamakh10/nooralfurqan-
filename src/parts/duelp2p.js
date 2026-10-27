/* ===== التحدي المباشر خارج claude.ai: اتصال مباشر بين الجهازين (WebRTC)
   الإشارة الأولية (3 رسائل فقط) عبر ntfy.sh، ثم تنتقل اللعبة مباشرةً بين الجهازين.
   صاحب الغرفة هو المحور: يستقبل من الضيوف ويعيد البث. ===== */
(function(){
  const SIG=window.NF_SIG||'https://ntfy.sh/';
  const ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'},{urls:'stun:global.stun.twilio.com:3478'}]};
  const MAXP=4;
  function rid(){return Math.random().toString(36).slice(2,10)}
  function topicOf(code){return 'nfduel-'+code+'-v1'}
  function post(topic,obj){return fetch(SIG+topic,{method:'POST',body:JSON.stringify(obj)}).then(function(r){if(!r.ok)throw new Error('sig')})}
  function listen(topic,onmsg){
    return new Promise(function(res,rej){
      let es;try{es=new EventSource(SIG+topic+'/sse')}catch(e){rej(e);return}
      let ok=false;
      es.onopen=function(){ok=true;res(es)};
      es.onerror=function(){if(!ok){try{es.close()}catch(e){}rej(new Error('sse'))}};
      es.onmessage=function(ev){try{const j=JSON.parse(ev.data);if(j.event&&j.event!=='message')return;onmsg(JSON.parse(j.message))}catch(e){}};
    });
  }
  function gathered(pc){
    return new Promise(function(res){
      if(pc.iceGatheringState==='complete')return res();
      const t=setTimeout(res,3500);
      pc.addEventListener('icegatheringstatechange',function(){if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}});
    });
  }
  function Room(host,code){
    const me=rid(),self=this;
    const pres={},links={},ons={},peersCbs=[],pending={};
    let closed=false,es=null;
    pres[me]={};
    this.me=me;
    function fire(topic,data,from){(ons[topic]||[]).slice().forEach(function(f){try{f({data:data,from:from})}catch(e){}})}
    function firePeers(){peersCbs.slice().forEach(function(f){try{f()}catch(e){}})}
    function sendTo(id,msg){const l=links[id];if(l&&l.dc&&l.dc.readyState==='open')try{l.dc.send(JSON.stringify(msg))}catch(e){}}
    function broadcast(msg,except){Object.keys(links).forEach(function(id){if(id!==except)sendTo(id,msg)})}
    function pushPeers(){broadcast({k:'peers',map:pres});firePeers()}
    function handle(from,m){
      if(!m||typeof m!=='object')return;
      if(m.k==='pres'&&host){pres[from]=Object.assign({},pres[from],m.p||{});pushPeers()}
      else if(m.k==='peers'&&!host){const mp=m.map||{};Object.keys(pres).forEach(function(k){delete pres[k]});Object.keys(mp).forEach(function(k){pres[k]=mp[k]});firePeers()}
      else if(m.k==='ev'){fire(m.topic,m.data,m.from||from);if(host)broadcast(m,from)}
    }
    function wire(id,pc,dc){
      links[id]={pc:pc,dc:dc};
      dc.onmessage=function(e){let m;try{m=JSON.parse(e.data)}catch(x){return}handle(id,m)};
      dc.onclose=function(){if(closed)return;delete links[id];if(host){delete pres[id];pushPeers()}else firePeers()};
    }
    /* صاحب الغرفة: يستمع لطلبات الانضمام وردود الإجابة */
    this.openHost=function(){
      return listen(topicOf(code),function(m){
        if(m.k==='hello'&&m.from&&!links[m.from]&&!pending[m.from]&&Object.keys(links).length<MAXP-1){
          const gid=m.from,pc=new RTCPeerConnection(ICE),dc=pc.createDataChannel('nf');
          pending[gid]=pc;
          dc.onopen=function(){delete pending[gid];wire(gid,pc,dc);pres[gid]=pres[gid]||{};pushPeers()};
          pc.createOffer().then(function(o){return pc.setLocalDescription(o)}).then(function(){return gathered(pc)}).then(function(){
            return post(topicOf(code),{k:'offer',to:gid,from:me,sdp:pc.localDescription.sdp});
          }).catch(function(){});
        }else if(m.k==='answer'&&m.to===me){
          const pc=pending[m.from];
          if(pc&&!pc.currentRemoteDescription)pc.setRemoteDescription({type:'answer',sdp:m.sdp}).catch(function(){});
        }
      }).then(function(e){es=e;return self});
    };
    /* ضيف: يرسل hello ثم يستقبل العرض ويردّ */
    this.openGuest=function(){
      return new Promise(function(res,rej){
        const pc=new RTCPeerConnection(ICE);let done=false,got=false;
        function fail(e){if(done)return;done=true;clearTimeout(to);try{es&&es.close()}catch(x){}try{pc.close()}catch(x){}rej(e||new Error('fail'))}
        const to=setTimeout(function(){fail(new Error('timeout'))},20000);
        pc.ondatachannel=function(ev){
          const dc=ev.channel;wire('host',pc,dc);
          function opened(){if(done)return;done=true;clearTimeout(to);try{es&&es.close()}catch(x){}sendTo('host',{k:'pres',p:pres[me]});res(self)}
          if(dc.readyState==='open')opened();else dc.onopen=opened;
        };
        listen(topicOf(code),function(m){
          if(m.k==='offer'&&m.to===me&&!got){
            got=true;
            pc.setRemoteDescription({type:'offer',sdp:m.sdp}).then(function(){return pc.createAnswer()}).then(function(a){return pc.setLocalDescription(a)}).then(function(){return gathered(pc)}).then(function(){
              return post(topicOf(code),{k:'answer',to:m.from,from:me,sdp:pc.localDescription.sdp});
            }).catch(fail);
          }
        }).then(function(e){es=e;return post(topicOf(code),{k:'hello',from:me})}).catch(fail);
      });
    };
    this.presence=function(p){pres[me]=Object.assign({},pres[me],p);if(host)pushPeers();else broadcast({k:'pres',p:p});return Promise.resolve()};
    this.onPeers=function(fn){peersCbs.push(fn);return function(){const i=peersCbs.indexOf(fn);if(i>=0)peersCbs.splice(i,1)}};
    this.on=function(topic,fn){(ons[topic]=ons[topic]||[]).push(fn);return function(){const a=ons[topic]||[],i=a.indexOf(fn);if(i>=0)a.splice(i,1)}};
    this.emit=function(topic,data){broadcast({k:'ev',topic:topic,data:data,from:me});return Promise.resolve()};
    this.peers=function(){return Object.keys(pres).map(function(id){return {id:id,presence:pres[id],isMe:id===me}})};
    this.leave=function(){closed=true;try{es&&es.close()}catch(e){}[links,pending].forEach(function(o){Object.keys(o).forEach(function(id){const l=o[id];try{(l.dc||{}).close&&l.dc.close()}catch(e){}try{(l.pc||l).close()}catch(e){}})});return Promise.resolve()};
  }
  function supported(){return typeof RTCPeerConnection!=='undefined'&&typeof EventSource!=='undefined'&&/^https?:$/.test(location.protocol)}
  duelJoin=function(code,host){
    function ok(rm){
      DU.room=rm;DU.code=code;DU.host=host;DU.state='wait';
      rm.presence({n:duelName(),sc:0,dn:0}).catch(function(){});
      DU.offs.push(rm.onPeers(function(){renderDuel()}));
      DU.offs.push(rm.on('duel',function(m){if(DU&&DU.state==='wait'&&m.data&&m.data.qs){duelStart(m.data.qs)}}));
      renderDuel();
    }
    function p2p(){
      if(!supported()){toast('متصفحك لا يدعم التحدي المباشر.');return}
      toast(host?'جارٍ إنشاء الغرفة…':'جارٍ الاتصال بالغرفة…');
      const r=new Room(host,code);
      return (host?r.openHost():r.openGuest()).then(ok).catch(function(){toast(host?'تعذّر إنشاء الغرفة. تأكد من الإنترنت وجرّب مرة أخرى.':'لم أجد الغرفة. تأكد من الرمز وأن صديقك أنشأها ثم جرّب.')});
    }
    if(!(window.claude&&claude.use))return p2p();
    return claude.use('room').then(function(R){
      if(!R||!R.join)return p2p();
      return R.join('nf-'+code).then(ok);
    }).catch(function(){return p2p()});
  };
})();
