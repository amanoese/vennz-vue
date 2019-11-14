<template>
  <div id="app">
    <h1>Vennz-vue example</h1>
    <div class="content">
      <div>
        <div class="add-item">
          <input type="text" v-model="inputText" @keyup.enter="addItem">
          <input type="button" @click="addItem" value="add item">
        </div>
        <div v-for="(v,i) in names" :key="i">
          <div class="item" :style="{ 'background-color' : itemColors[i] }">
            <label class="item-label">
              <input type="checkbox" :value="v" v-model="checkedNames">{{v}}
            </label>
            <input type="button" value="x" @click.stop.prevent="removeItem(i)">
          </div>
        </div>
        <hr>
        <label><input type="checkbox" v-model="isDebug">Debug Mode</label>
      </div>
      <VennzRotaryEncoder
        :setList="names"
        :targetKeys="checkedNames"
        :isDebug="isDebug"
      ></VennzRotaryEncoder>
    </div>
  </div>
</template>

<script>
import VennzRotaryEncoder from './components/VennzRotaryEncoder.vue'
import vennzREM from '@/scripts/VennzRotaryEncoderModule.js'

export default {
  name: 'app',
  data() {
    return {
      inputText : '',
      names: [ 'apple', 'banana', 'coconut', 'dessert' ],
      checkedNames : [],
      isDebug: false
    }
  },
  computed : {
    itemColors(){
      return this.names
        .map((_,i)=>vennzREM.getColor(i + 1,this.names.length))
        .map(({R,G,B,opacity})=> `rgba(${R},${G},${B},${opacity})`)
    }
  },
  methods : {
    addItem(){
      this.names.push(this.inputText);
      this.inputText = ''
    },
    removeItem(index){
      this.names.splice(index,1)
    }
  },
  components: {
    VennzRotaryEncoder
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  display : flex;
  justify-content: center;
  align-items: center;
}
.add-item {
  margin-bottom: 5px;
}
.item {
  display:inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid black;
  margin: 1px;
}
.item-label {
  display : block;
  width: 100%;
  text-align: left;
}
</style>
