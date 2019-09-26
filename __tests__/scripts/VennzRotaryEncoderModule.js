const vennzREM = require('../../src/scripts/VennzRotaryEncoderModule.js')

describe('venn diagram',()=>{
  test('getColor',()=>{
    expect(vennzREM.getColor(1,6)).toMatchObject({"B": 0,  "G": 255, "R": 255})
    expect(vennzREM.getColor(2,6)).toMatchObject({"B": 0,  "G": 255, "R": 0})
    expect(vennzREM.getColor(3,6)).toMatchObject({"B": 255,"G": 255, "R": 0})
    expect(vennzREM.getColor(4,6)).toMatchObject({"B": 255,"G": 0,   "R": 0})
    expect(vennzREM.getColor(5,6)).toMatchObject({"B": 255,"G": 0,   "R": 255})
    expect(vennzREM.getColor(6,6)).toMatchObject({"B": 0,  "G": 0,   "R": 255})
  })
})
