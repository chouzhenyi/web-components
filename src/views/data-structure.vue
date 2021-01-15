<template>
  <div>
    <h1>这结构</h1>
  </div>
</template>

<script>
import { link, stackData, doubly, circular } from "@/lib/learn/data-structure"

export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      // this.linkInit()
      // this.stackInit()
      // this.stackExercise()
      // this.doublyLinkedListInit()
      // this.circularInit()
    },
    // 链表练习
    linkInit() {
      link.append('一个太空滑步')
      link.append('我的滑板鞋')
      link.append('网瘾少女')

      link.insert(0, '疏浚大连绵')
      link.insert(2, '我成功了！')
      link.insert(2, '牛魔王四百个小妖精')
      // console.log(link.toString())
      // link.removeAt(3)
      // console.log(link.toString())
      // console.log(link.findIndex('疏浚大连绵'))
      // console.log(link.findIndex('网瘾少女'))
      // console.log(link.findIndex('我的滑板鞋'))
      // link.remove('我的滑板鞋')
      // console.log(link.toString())
    },
    // 栈练习
    stackInit() {
      stackData.push(2)
      stackData.push(3)
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
      stackData.pop()
      console.log("从栈顶删除一项");
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
      stackData.clear()
      console.log('清空栈');
      console.log('toString:', stackData.toString())
      console.log('isEmpty:', stackData.isEmpty())
      console.log('size', stackData.size())
      console.log('栈顶', stackData.peek())
    },
    stackExercise() {
      const testCases = [
        '{}', // true
        '', // true
        '(){<><)', // false
        '({[<>]})', // true
        '{]{}{}{[][][)(>>', // false
      ]
      for (let i = 0; i < testCases.length; i++) {
        const item = testCases[i]
        console.log(this.stackCheckSafe(item), item);
      }
    },
    stackCheckSafe(str) {
      const len = str.length
      stackData.clear()
      for(let i = 0; i < len; i++) {
        const item = str[i]
        const peek = stackData.peek()
        const bracketsMap = new Map()
        bracketsMap.set("}", "{")
        bracketsMap.set("]", "[")
        bracketsMap.set(")", "(")
        bracketsMap.set(">", "<")
        if(peek === bracketsMap.get(item)) {
          stackData.pop()
        } else {
          stackData.push(item)
        }
      }
      return !stackData.size()
    },
    // 双向链表
    doublyLinkedListInit() {
      let str = '测试双向链表4'
      doubly.append('测试双向链表1')
      doubly.append('测试双向链表2')
      console.log(doubly.toString())
      doubly.insert(1, '测试双向链表3')
      console.log(doubly.toString())
      doubly.removeAt(1)
      doubly.insert(1, str)
      console.log(doubly.toString())
      console.log(doubly.findIndex(str));
      console.log(doubly.findAt(1));
      doubly.remove(str)
      console.log(doubly.toString())
      console.log(`isEmpty: ${doubly.isEmpty()}, size:${doubly.size()}`);
    },
    // 循环双向链表
    circularInit() {
      let str = '测试双向循环链表3'
      circular.append('测试双向循环链表1')
      console.log(circular.toString())
      circular.insert(1, '测试双向循环链表2')
      console.log(circular.toString())
      console.log(`isEmpty: ${circular.isEmpty()}, size:${circular.size()}`);
      circular.removeAt(1)
      console.log(circular.toString())
      circular.insert(1, str)
      console.log(circular.toString())
      console.log('findIndex', circular.findIndex(str));
      console.log('findAt', circular.findAt(1));
    },
  },
};
</script>
<style lang="scss" scoped>
</style>