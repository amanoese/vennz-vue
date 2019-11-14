/*eslint no-console: "off"*/

let skmeans = require('skmeans')

let _2PI = Math.PI*2

export default {
  min_t : (1/(Math.PI*100)),
  r_size : 500,
  r_cycle(n,i,t) {
    let diff = (i <= 1) ? Math.sin(t) : Math.cos(2**(i-2)*t);
    return (1 - diff * (1 - (i/(n+1))));
  },
  calc (n,i,t) {
    let {r_cycle} = this
    return [ r_cycle(n,i,t) * Math.cos(t),r_cycle(n,i,t) * Math.sin(t)]
  },
  getOneHotString({x, y, n}) {
    let r = Math.sqrt(x**2 + y**2)
    let t = Math.atan2(y,x)

    let result = Array.from({length:n})
      .map((_,i)=> (this.r_cycle(n,i + 1,t) > r) ? '1': '0')
      .join('')

    return result
  },
  posCalc(oneHotString) {

    let n = oneHotString.length
    let d_rad = (2 * Math.PI) / (2**n)

    let oneHot = [ ...oneHotString ]

    //発見した座標 + 確実に存在する座標
    let rad = parseInt(oneHot.reduce((s,v)=> s + '' + (s & 1 ^ v)),2)

    let [ in_x, in_y ] = this.calc(n,n+1,rad * d_rad + (d_rad/2))
    let inList = [ [in_x,in_y] ] //確実に存在する座標は加えておく

    //探索したすべての座標
    let allList = [ [in_x,in_y] ]

    let rand = () => {
      // -1 ~ 1の範囲で掛け算した場合( 正確には-1 ~ 1未満 )
      // 中心軸に多く集まる尖度の大きい正規分布に似た乱数になる（実際には0の値のみ微妙なため連続性は怪しい）
      let _rand = () => (Math.random() * 2 - 1)
       return (_rand() * _rand() + 1) / 2
    }
    //なんちゃってモンテカルロで座標を探索
    for(let m=0; m < 2**10; m++){
      let r = rand()
      let t = Math.random() * _2PI
      let x = Math.cos(t) * r * 2
      let y = Math.sin(t) * r * 2

      if(this.getOneHotString({x,y,n}) == oneHotString) {
        inList.push([x,y])
      }
      allList.push([x,y])
    }
    //発見した座標の幾何中心を求める
    let mean_x = inList.reduce((s,tuple)=>s+tuple[0],0) / inList.length
    let mean_y = inList.reduce((s,tuple)=>s+tuple[1],0) / inList.length

    //Kmeanで２つに分けた領域を2点と幾何中心の座標から
    //領域を２分割する線と、直交座標を求める
    let calc_pos = ([ mean_x, mean_y ],[ x1, y1 ],[ x2, y2]) => {
      // calc  y = ax + b
      let a = ( y1 - y2 ) / (x1 - x2)
      let b = y1 - (a * x1)

      // calc mean_y = mean_a * mean_x + mean_b
      let mean_a = (-1 / a)
      let mean_b = mean_y - (mean_a * mean_x)

      // 交点を求める
      return [
        (-b + mean_b) / (a - mean_a),
        (a * mean_b - mean_a * b) / (a - mean_a)
      ]
    }

    let { centroids } = skmeans(inList,2, 'kmpp')
    let [ cross_x, cross_y ] = calc_pos([mean_x,mean_y], ...centroids)

    //幾何中心から最も近い座標を求める
    let [
      near_x,
      near_y
    ] = inList
      .map(([x,y])=>[
        (x-mean_x)**2 + (y-mean_y)**2,
        x,
        y
      ])
      .sort((a,b)=>a[0]<b[0]? -1: 1)[0]
      .slice(1)

    //幾何中心の座標が大丈夫であれば採用
    //ダメな場合は幾何中心から最も近い座標を採用
    let [x,y] =
        (this.getOneHotString({ x:cross_x, y:cross_y, n}) == oneHotString) ? [ cross_x, cross_y ]
      : (this.getOneHotString({ x:mean_x, y:mean_y, n}) == oneHotString)   ? [ mean_x, mean_y]
      : [near_x,near_y];

    return {
      x,
      y,
      inList,
      allList,
      mean: [ mean_x, mean_y ],
      near: [ near_x, near_y ],
      cross: [ cross_x, cross_y ]
    };

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
  getOpacity(divisionNumber=1) {
    return Math.min( (1 / divisionNumber || 1), 0.25)
  },
  getColor(number=1,divisionNumber=3,colorCodeMaxValue=255){
    return {
      ...this.color(number*_2PI/divisionNumber,colorCodeMaxValue),
      opacity: this.getOpacity(divisionNumber)
    }
  },
  svgCircles(n=3){

    class Circle {
      constructor(color,colorA,points){
        this.color  = color  || 'rgb(0,0,0,0)'
        this.colorA = colorA || 'rgba(0,0,0,0)'
        this.points = points || ''
      }
    }

    let { min_t,r_size } = this
    let circles = []
    for (let i = 1;i<=n;i++){
      let rad = _2PI / n * i;
      let {R,G,B} = this.color(rad)
      let opacity = this.getOpacity(n)

      let points = ''
      for (let t = 0;t<_2PI;t+=min_t){
        let [x1,y1] = this.calc(n,i,t).map(v=>v*(r_size/2) + (r_size))
        points += `${x1},${y1}\n`
      }
      let circle = new Circle(`rgb(${R},${G},${B})`,`rgba(${R},${G},${B},${opacity})`,points)
      circles.push(circle)
    }
    return circles
  },
  svg(n) {
    let polygons = this.svgCircles(n).map((circle,i)=>{
       return  `
        <polygon data-n="${i}"
          stroke="${circle.color}"
          fill="${circle.colorA}"
          points="${circle.points$}"
          stroke-width="1"></polygon>`
    })
    return `<svg>${polygons.join('\n')}</svg>`
  }
}
