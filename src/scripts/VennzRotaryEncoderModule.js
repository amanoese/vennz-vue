/*eslint no-console: "off"*/
let _2PI = Math.PI*2

module.exports = {
  min_t : (1/(Math.PI*100)),
  r_size : 500,
  r_cycle(n,i,t) {
    let diff = (i <= 1) ? Math.sin(t) : Math.cos(2**(i-2)*t);
    return (-1 * diff * (1 - (i/(n+1))) + 1);
  },
  calc (n,i,t) {
    let {r_cycle} = this
    return [ r_cycle(n,i,t) * Math.cos(t),r_cycle(n,i,t) * Math.sin(t)]
  },
  posCalc() {
    let n = 7
    let oneHot = [ ...'1111100' ]
    let inside  = oneHot.map((v,index)=> +v > 0 ? index + 1 : null).filter(v=>v)
    let outside = oneHot.map((v,index)=> +v < 1 ? index + 1 : null).filter(v=>v)
    console.log(inside,outside)

    let allList = []
    let list = []

    let isRange = (r,t) => {
      for(let i of inside){
        if( !isRange || this.r_cycle(n,i,t) < r ){
          return false;
        }
      }
      for(let i of outside){
        if( !isRange || this.r_cycle(n,i,t) > r ){
          return false;
        }
      }
      return true;
    }

    for(let m=0; m < 2**10; m++){
      let x = Math.random() * 4 - 2
      let y = Math.random() * 4 - 2
      let r = Math.sqrt(x**2 + y**2)
      let t = Math.atan2(y,x)

      if(isRange(r,t)) { list.push([x,y]) }
      allList.push([x,y])
    }
    let mean_x = list.reduce((s,tuple)=>s+tuple[0],0) / list.length
    let mean_y = list.reduce((s,tuple)=>s+tuple[1],0) / list.length
    let [__,near_x,near_y] = list.map(([x,y])=>[(x-mean_x)**2 +(y-mean_y)**2, x, y]).sort((a,b)=>a[0]<b[0]? -1: 1)[0] || [NaN,NaN,NaN]

    let [x,y] = isRange(Math.sqrt(mean_x**2 + mean_y**2),Math.atan2(mean_y,mean_x)) ?  [mean_x,mean_y] : [near_x,near_y]
    return [x,y,list,allList]
  },
  color(t,max=255) {
    let InRange = value => Math.max(0,Math.min(255,Math.round(value)))
    let _1_3_PI = Math.PI/3;
    let dt_color = max/_1_3_PI

    //console.log(max - (t - _1_3_PI) * dt_color,(t - Math.PI -_1_3_PI) * dt_color)
    let _R = t <= Math.PI ? max - ((t - _1_3_PI) * dt_color) : (t - Math.PI -_1_3_PI) * dt_color
    let _G = t <= Math.PI ? t * dt_color : max - t * dt_color
    let _B = t <= Math.PI ? (t - _1_3_PI*2) * dt_color : max - (t - _1_3_PI*5) * dt_color

    //console.log(dt_color,_R,_G,_B)
    let [R,G,B] = [_R,_G,_B].map(InRange)
    return {R,G,B}
  },
  getColor(number=1,divisionNumber=3,colorCodeMaxValue=255){
    return this.color(number*_2PI/divisionNumber,colorCodeMaxValue)
  },
  svg(n=3){
    let { min_t,r_size } = this
    let circle =''
    for (let i = 1;i<=n;i++){
      let rad = _2PI / n * i;
      let {R,G,B} = this.color(rad)

      let opacity = 1/n
      //console.log({rad},R,G,B)

      circle += `<polygon data-n="${i}" fill="rgba(${R},${G},${B},${opacity})" stroke="rgb(${R},${G},${B})" stroke-width="1" points="`
      for (let t = 0;t<_2PI;t+=min_t){
        let [x1,y1] = this.calc(n,i,t).map(v=>v*(r_size/2) + (r_size))
        circle += `${x1},${y1}\n`
      }
      circle += '" />'
    }
    return circle
  }
}
