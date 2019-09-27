<template>
  <div>
    <svg :height="r_size*2" :width="r_size*2">
      <svg v-html="circle"></svg>
      <!--<circle :cx="r_size" :cy="r_size" :r="r_size/2" fill="none" stroke="black"/>-->
      <circle :cx="target.x" :cy="target.y" r="8" fill="white" stroke="black"/>
      <circle v-for="[x,y] in allList" :cx="x" :cy="y" r="1" fill="black" stroke="black"/>
      <circle v-for="[x,y] in inList" :cx="x" :cy="y" r="2" fill="red" stroke="red"/>
    </svg>
  </div>
</template>
<script>
/*eslint no-console: "off"*/
import vennzREM from '@/scripts/VennzRotaryEncoderModule.js'

export default {
  data(){
    return {
      r_size : 500,
      circle : '',
      target : {
        x : 125,
        y : 125,
      },
      inList :  [[0,0]],
      allList : [[0,0]]
    }
  },
  created(){
    let n = 7
    let { r_size } = this
    let rad = parseInt([ ...'1111100' ].reduce((s,v)=> s + '' + (s & 1 ^ v)),2)
    let d_rad = (2 * Math.PI) / (2**n)

    let [_maybeX,_maybeY,inList,allList] = vennzREM.posCalc()
    console.log(_maybeX,_maybeY,allList,inList)

    this.allList = allList.map(tuple=>tuple.map(v=>+v*(r_size/2)+r_size))
    this.inList = inList.map(tuple=>tuple.map(v=>+v*(r_size/2)+r_size))

    let [maybeX,maybeY] = [_maybeX,_maybeY].map(v=>(+v*(r_size/2))+r_size)
    console.log(_maybeX,_maybeY)
    console.log(maybeX,maybeY)
    this.target.x = maybeX || r_size + (r_size/2 + (r_size/2/2/2/n)) * Math.cos(rad * d_rad + (d_rad/2))
    this.target.y = maybeY || r_size + (r_size/2 + (r_size/2/2/2/n)) * Math.sin(rad * d_rad + (d_rad/2))

    vennzREM.r_size = r_size
    this.circle = vennzREM.svg(n)
  }
}
</script>
