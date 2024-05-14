1. 原理
    
    将需要翻译的内容分为基础内容和动态内容，动态内容中动态部分需要在基础内容中查找。

2. 翻译函数包裹翻译内容时机

    在jsx/tsx转换为js文件之后，使用翻译函数包裹


3. 如何进行校验
    1. 开发阶段在控制台中显示并生成日志
    2. 生产阶段可以可以通过指定接口


# flows

```mermaid
flowchart LR
    init --> collection --> translate --> export file;
```