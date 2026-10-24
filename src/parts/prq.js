/* قصص الأنبياء: وحدة أساسية ووحدة تحدٍّ (تُضاف ما وُجدت الملفات) */
(function(){
  const E=[].concat(typeof PRO1_E!=='undefined'?PRO1_E:[],typeof PRO2_E!=='undefined'?PRO2_E:[],typeof PRO3_E!=='undefined'?PRO3_E:[]);
  const H=[].concat(typeof PRO1_H!=='undefined'?PRO1_H:[],typeof PRO2_H!=='undefined'?PRO2_H:[],typeof PRO3_H!=='undefined'?PRO3_H:[]);
  if(E.length)DATA.push({title:'قصص الأنبياء: الأساسيات',sub:'أسئلة سهلة ومتنوعة عن كل نبي',lessons:E});
  if(H.length)DATA.push({title:'قصص الأنبياء: تحدّي',sub:'تفاصيل دقيقة للكبار وطلبة العلم',lv:'a',lessons:H});
})();
