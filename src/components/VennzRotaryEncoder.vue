<template>
  <div>
    <svg :height="r_size*2" :width="r_size*2">
      <svg>
        <polygon
          v-for="(circle,i) in circles"
          :key="i.toString()"
          :data-n="i"
          :stroke="circle.color"
          :fill="circle.colorA"
          :points="circle.points"
          stroke-width="1"></polygon>
      </svg>
      <circle :cx="target.x" :cy="target.y" r="8" fill="white" stroke="black"/>
      <template v-if="isDebug">
        <circle :cx="mean.x" :cy="mean.y" r="4" fill="white" stroke="red"/>
        <circle :cx="near.x" :cy="near.y" r="4" fill="white" stroke="blue"/>
        <circle :cx="cross.x" :cy="cross.y" r="4" fill="white" stroke="green"/>
        <circle :cx="r_size" :cy="r_size" :r="r_size/2" fill="none" stroke="black"/>
        <circle v-for="(pos,i) in allList" :key="+i+1" :cx="pos[0]" :cy="pos[1]" r="1" fill="black" stroke="black"/>
        <circle v-for="(pos,i) in inList"  :key="-i-1" :cx="pos[0]" :cy="pos[1]" r="2" fill="red" stroke="red"/>
      </template>
    </svg>
  </div>
</template>
<script>
/*eslint no-console: "off"*/
import vennzREM from '@/scripts/VennzRotaryEncoderModule.js'

export default {
  props : {
    r_size : {
      default:500
    },
    setList: {
      default: Array.from({length:7})
    },
    targetKeys: {
      default: []
    },
    isDebug: {
      default: false
    },
  },
  data(){
    return {
      circles : [],
      inList :  [],
      allList : [],
      mean: {},
      near: {},
      cross: {},
    }
  },
  mounted(){
    this.renderCircles()
  },
  methods : {
    renderCircles(){
      vennzREM.r_size = this.r_size
      this.circles = vennzREM.svgCircles(this.setList.length)
    },
    readDebugData({ inList, allList, mean, near, cross }){
      let r_size = this.r_size

      this.allList = allList.map(tuple=>tuple.map(v=>+v*(r_size/2)+r_size))
      this.inList = inList.map(tuple=>tuple.map(v=>+v*(r_size/2)+r_size))

      let _mean = mean.map(v=>+v*(r_size/2)+r_size)
      this.mean = {x : _mean[0], y: _mean[1] };

      let _near = near.map(v=>+v*(r_size/2)+r_size)
      this.near = {x : _near[0], y: _near[1] };

      let _cross = cross.map(v=>+v*(r_size/2)+r_size)
      this.cross = {x : _cross[0], y: _cross[1] };
    }
  },
  watch : {
    r_size() {
      this.renderCircles()
    },
    setList() {
      this.renderCircles()
    },
    vennzREMdata(data){
      this.readDebugData(data)
    },
    isDebug(){
      this.readDebugData(this.vennzREMdata)
    }
  },
  computed : {
    targetHotString(){
      return this.setList.map(key=>{
        return this.targetKeys.includes(key) ? 1 : 0
      }).join('')
    },
    vennzREMdata(){
      return vennzREM.posCalc(this.targetHotString)
    },
    target(){
      if (this.targetHotString.length <= 1) {
        return {x:0,y:0}
      }

      let {
        x:_maybeX,
        y:_maybeY,
      } = this.vennzREMdata

      let r_size = this.r_size
      let [maybeX,maybeY] = [_maybeX,_maybeY].map(v=>(+v*(r_size/2))+r_size)

      return {
        x: maybeX,
        y: maybeY
      }
    }
  }
}
</script>
