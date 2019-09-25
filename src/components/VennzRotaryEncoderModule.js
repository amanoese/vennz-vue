/*eslint no-console: "off"*/
let _2PI = Math.PI*2

export default {
  min_t : (1/(Math.PI*100)),
  r_size : 500,
  r_cycle(n,i,t) {
    return -1 * ((i <= 1) ? Math.sin(t) : Math.cos(2**(i-2)*t)) * (1 - (i/(n+1))) + 1
  },
  calc (n,i,t) {
    let {r_cycle} = this
    return [ r_cycle(n,i,t) * Math.sin(t),r_cycle(n,i,t) * Math.cos(t)]
  },
  color(t,max=255) {
    let InRange = value => Math.max(0,Math.min(255,parseInt(value)))
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
