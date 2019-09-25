<template>
  <div>
    <svg :height="r_size*2" :width="r_size*2">
      <svg v-html="circle"></svg>
      <circle :cx="r_size" :cy="r_size" :r="r_size/2" fill="none" stroke="black"/>
      <circle :cx="target.x" :cy="target.y" r="8" fill="white" stroke="black"/>
    </svg>
  </div>
</template>
<script>
/*eslint no-console: "off"*/
import vennzREM from '@/components/VennzRotaryEncoderModule.js'

export default {
  data(){
    return {
      r_size : 500,
      circle : '',
      target : {
        x : 125,
        y : 125,
      }
    }
  },
  created(){
    let {r_size} = this
    let rad = parseInt([ ...'1100' ].reduce((s,v)=> s + '' + (s & 1 ^ v)),2)
    let d_rad = (2 * Math.PI) / (2**4)

    this.target.x = r_size + (r_size/2 + (r_size/2/2/2/4)) * Math.sin(rad * d_rad + (d_rad/2))
    this.target.y = r_size + (r_size/2 + (r_size/2/2/2/4)) * Math.cos(rad * d_rad + (d_rad/2))

    vennzREM.r_size = r_size
    this.circle = vennzREM.svg(5)
  }
}
</script>
