function courseNameFn() {
  const list =  ["大学政治类", "思想道德修养与法律基础", "近现代史纲要", "毛泽东思想与社会主义特色理论", "马克思主义原理", "大学数学类", 
  "高等数学大学体育类", "大学体育大学英语类", "大学英语大学计算机类", "计算机基础政治和体育课", "任何专业都要学习", "没有例外", "大学英语",
   "除英语专业外任何专业都要学习", "大学计算机课", "除计算机专业外任何专业都要学习", "大学数学课", "理工科专业", "数学专业", "大学物理课"];
   const len = list.length;
   const index = Math.floor(Math.random() * len)
   return list[index]
}
function randomStr(n) {
  const str = `君人之道处静以修身俭约以率下静则下不扰矣俭则民不怨矣下扰则政乱民怨则德薄政乱则贤者不为谋德薄则勇者不为死是故人
  主好鸷鸟猛兽珍怪奇物狡躁康荒不爱民力驰骋田猎出入不时如此则百官务乱事勤财匾万民愁苦生业 不修矣人主好高台深池雕琢刻镂黼黻文章絺绤绮绣
  宝玩珠玉则赋敛无度而万民力竭矣尧之有天下也非贪万民之富而安人主之位也以为百姓力征强凌弱众暴寡于是尧乃身服节俭之行而明相爱之仁以和辑之
  是故茅茨不翦采椽不斫大路不画越席不缘大羹不和粢食不毁巡狩行教勤劳天下周流五岳岂其奉养不足乐哉？举天下而以为社稷非有利焉年衰志悯举天下
  而传之舜犹却行而脱蹝也衰世则不然一日而有天下之富处人主之势则竭百姓之力以奉耳目之欲志专在于宫室台榭陂池苑囿狂兽熊罴玩好珍怪是故贫民糟糠
  不接于口而虎狼熊罴厌刍豢；百姓短褐不完而宫室衣锦绣人主急兹无用之功百姓黎民憔悴于天下是故使天下不安其性人主之居也如日月之明也天下之所同
  侧目而视侧耳而听延颈举踵而望也是故非澹薄无以明德非宁静无以致远非宽 大无以兼覆非慈厚无以怀众非平正无以制断是故贤主之用人也犹巧工之制木
  也大者以为舟航柱梁小者以为楫楔修者以为櫩榱短者以为朱儒析护无小大修短各得其所宜；规矩方圆各有所施天下之物莫凶于鸡毒然而良医橐而藏之有所
  用也是故林莽之材犹无可弃者而况人乎！今夫朝廷之所不举乡曲之所不誉非其人不肖也其所以官之者非其职也鹿之上山獐不能肢也及其下牧竖能追之才有
  所修短也是故有大略者不可责以捷巧；有小智者不可任以大功人有其才物有其形有任一而大重或任百而尚轻是故审豪厘之计者必遗天下之大数；不失小物
  于大数之举譬犹狸之不可使搏牛虎之不可使搏鼠也今人之才或欲平九州并方外存危国继绝世志在直道正邪决烦理挐而乃责之以闺阁之礼奥窔之间或佞巧小
  具谄进愉说随乡曲之俗卑下众 人之耳目而乃任之以天下之权治乱之机是犹以斧劗毛、以刀抵木也皆失其宜矣`
  const len = str.length;
  return str.substr(Math.floor(Math.random() * len), n);
}

function randomStr1(n) {
  const str = `凡是揣度人的智谋和测量人的才干就是为了吸引远处的人才和招来近处的人才造成一种声势进一步掌握事物发展变化的规律
  一定要首先考察派别的相同和不同之处区别各种不对的和不对的议论了解对内、外的各种进言掌握有余和不足的程度决定事关安危的计谋确定与
  谁亲近和与谁疏远的问题然后权量这些关系如果还有不清楚的地方就要进行研究进行探索使之为我所用借助用引诱对手说话的言辞然后通过恭维来
  钳信对手钩钳之语是一种游说辞令其特点是忽同忽异对于那些以钩钳之术仍没法控制的对手或者首先对他们威胁利诱然后再对他们进行反复试探
  或者首先对他们进行反复试探然后再对他们屐攻击加以催毁有人认为反复试探就等于是对对方进行破坏有人认为对对方的破坏就等于是反复的试探`
  const len = str.length;
  return str.substr(Math.floor(Math.random() * len), n);
}

function randomNum(num = 1) {
  return Math.floor(Math.random() * num)  
}

function getUniversityName() {
  const list = ["北京大学", "南京大学", "浙江大学", "复旦大学", "北京航空航天大学", "武汉大学", "北京理工大学", "中国农业大学", "北京师范大学", "中央民族大学",
  "南开大学", "天津大学", "大连理工大学", "吉林大学", "哈尔滨工业大学", "东北大学", "同济大学", "上海交通大学", "华东师范大学", "中国人民大学", "东南大学", 
  "中国科学技术大学", "厦门大学", "山东大学", "中国海洋大学", "华中科技大学", "湖南大学", "中南大学", "国防科技大学", "中山大学", "华南理工大学", "四川大学", 
  "重庆大学", "电子科技大学", "西安交通大学", "西北工业大学", "西北农林科技大学", "兰州大学", "文华学院", "湖北中医药高等专科学校", "北京工业大学", "中央财经大学", 
  "中国政法大学", "北京邮电大学", "北京交通大学", "北京中医药大学", "华北电力大学", "北京科技大学", "中国石油大学（北京）", "北京外国语大学", "北京化工大学", 
  "对外经济贸易大学", "中央音乐学院", "北京林业大学", "中国矿业大学（北京）", "北京体育大学", "中国传媒大学", "中国地质大学（北京）", "河北工业大学", "天津医科大学", 
  "上海外国语大学", "上海财经大学", "东华大学", "华东理工大学", "上海大学", "西南大学", "华北电力大学（保定）", "太原理工大学", "内蒙古大学", "大连海事大学", "东北师范大学", 
  "东北林业大学", "哈尔滨工程大学", "东北农业大学", "江南大学", "南京航空航天大学", "中国矿业大学", "苏州大学", "南京理工大学", "南京师范大学", "中国药科大学", "河海大学", 
  "南京农业大学", "合肥工业大学", "福州大学", "南昌大学", "中国石油大学（华东）", "郑州大学", "中国地质大学（武汉）", "武汉理工大学", "华中农业大学", "华中师范大学", 
  "中南财经政法大学", "湖南师范大学", "华南师范大学", "暨南大学"];
  const len = list.length;
  const index = Math.floor(Math.random() * len)
  return list[index]
}

export { courseNameFn, randomStr, randomStr1, randomNum, getUniversityName };