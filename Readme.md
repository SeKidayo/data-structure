### 拾遗

1. ES6的导入导出

   ```js
   // a.js
   export const a = 1;
   export const b = 2;
   
   // b.js
   import { a, b } from 'a.js'; // 完美 正确 标准
   
   
   
   // a2.js
   const a = 1;
   const b = 2;
   
   export default {
       a,
       b
   }
   
   // b2.js
   import { a, b } from 'a2.js'; // 报错!!!!!!!!!!!!!!!!!!!!!!
   // import的导入语法中 的 {} 不能当作解构;
   // 即 默认导出的模块不能通过 {} 形式接收
   // 正确写法如下:
   import a2 from 'a2.js';
   console.log(a2.a);
   console.log(a2.b);
   
   // 参考文章: https://segmentfault.com/a/1190000022393344

