import drawCanvas from './modules/canvas.mjs'

function getQueryVariable(variable)
{
       let query = window.location.search.substring(1)
       let vars = query.split("&")
       for (var i=0;i<vars.length;i++) {
               let pair = vars[i].split("=")
               if(pair[0] == variable) {return pair[1]}
       }
       return(NaN);
}

function setBarValue(name, value) {
    var innerel = document.getElementById(name)
    var outerel = document.getElementById("bar-" + name)
    outerel.style.width = (value + "%")
    innerel.innerHTML = (value + "%")
    if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
        innerel.style.visibility = "hidden"
    }
}
function setLabel(val,ary) {
    if (val > 100) { return "" } else
    if (val >  90) { return ary[0] } else
    if (val >  75) { return ary[1] } else
    if (val >  60) { return ary[2] } else
    if (val >= 40) { return ary[3] } else
    if (val >= 25) { return ary[4] } else
    if (val >= 10) { return ary[5] } else
    if (val >=  0) { return ary[6] } else
    {return ""}
}

fetch("JSON/ideologies.json")
    .then(response => response.json())
    .then(data => parse_ideology(data))

function parse_ideology(ideologies){
    var moderate       = getQueryVariable("r")
    var leftunity      = getQueryVariable("c")
    var centralized    = getQueryVariable("o")
    var localist       = getQueryVariable("g")
    var traditionalist = getQueryVariable("p")
    var reform         = getQueryVariable("l")
    var markets        = getQueryVariable("m")
    var radical        = (100 - moderate       ).toFixed(1)
    var libunity       = (100 - leftunity      ).toFixed(1)
    var decentralized  = (100 - centralized    ).toFixed(1)
    var globalist      = (100 - localist       ).toFixed(1)
    var progressive    = (100 - traditionalist ).toFixed(1)
    var revolution     = (100 - reform         ).toFixed(1)
    var planning       = (100 - markets        ).toFixed(1)
    
    setBarValue("moderate", moderate)
    setBarValue("radical", radical)
    setBarValue("leftunity", leftunity)
    setBarValue("libunity", libunity)
    setBarValue("centralized", centralized)
    setBarValue("decentralized", decentralized)
    setBarValue("localist", localist)
    setBarValue("globalist", globalist)
    setBarValue("traditionalist", traditionalist)
    setBarValue("progressive", progressive)
    setBarValue("reform", reform)
    setBarValue("revolution", revolution)
    setBarValue("markets", markets)
    setBarValue("planning", planning)

    const radiArray = ["社会自由主义","社会民主主义","劳工主义","自由社会主义","民主社会主义","自由意志社会主义","无政府主义"]
    const coopArray = ["左翼融合","左翼联合","左翼合作","一般","自由意志派合作","自由意志派联合","自由意志派融合"]
    const ownrArray = ["极端集中","集中","倾向集中","平衡","倾向分散","分散","极端分散"]
    const globArray = ["孤立主义","民族主义","国内主义","平衡","国际主义","干预主义","全球主义"]
    const progArray = ["传统主义","非常保守主义","保守主义","平衡","进步主义","非常进步主义","解放主义"]
    const reblArray = ["极端革命派","革命派","罢工派","中间派","和平派","改良派","宪政派"]
    const markArray = ["非常自由市场","自由市场","轻微反管制","监管主义","国有化","计划经济","完全计划经济"]

    document.getElementById("radicality-label").innerHTML = setLabel(moderate, radiArray)
    document.getElementById("co-operation-label").innerHTML = setLabel(leftunity, coopArray)
    document.getElementById("ownership-label").innerHTML = setLabel(centralized, ownrArray)
    document.getElementById("world-label").innerHTML = setLabel(localist, globArray)
    document.getElementById("culture-label").innerHTML = setLabel(traditionalist, progArray)
    document.getElementById("rebelliousness-label").innerHTML = setLabel(revolution, reblArray)
    document.getElementById("markets-label").innerHTML = setLabel(markets, markArray)

    var ideology = ""
    var ideodist = Infinity
    for (var i = 0; i < ideologies.length; i++) {
        var dist = 0
        dist += Math.pow(Math.abs(ideologies[i].stats.radi - moderate), 2)
        dist += Math.pow(Math.abs(ideologies[i].stats.coop - leftunity), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.ownr - centralized), 1.75)
        dist += Math.pow(Math.abs(ideologies[i].stats.glob - localist), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.prog - traditionalist), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.rebl - reform), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.mark - markets), 2)
        if (dist < ideodist) {
            ideology = ideologies[i].name
            ideodist = dist
        }
    }
    document.getElementById("ideology-label").innerHTML = ideology

    drawCanvas(ideology, moderate, radical, leftunity, libunity, centralized, decentralized, localist, globalist, traditionalist, progressive, reform, revolution, markets, planning) 
} 
