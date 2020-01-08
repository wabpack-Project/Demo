### 加载中

1. 加载中样式
a、 纯css3 实现
b、 图标 实现
c、 纯动态gif 实现

### 实践积累
1. 图标和动态gif   使用旋转动画，整体旋转
2. 纯css包含子元素    子元素渐变动画和自运行动画   也可搭配整体动画
3. 颜色统一配置   文字和旋转器 字体分别设置  
4. 插件使用位置，即插件使用位置
5. 由统一样式开关，配置整个插件显示样式



### svg压缩工具svgo安装使用
cnpm install -g svgo
svgo   E:\Demo\wabpack.Project\Demo\src\vendors\loading\css\jiazai.svg    E:\Demo\wabpack.Project\Demo\src\vendors\loading\css\jiazai.min.svg

svgo   /src/images/customs/jiazai.svg    /src/images/customs/jiazai.min.svg


svgo -f   C:\Users\Administrator\Desktop\svg 
svgo -f C:\Users\Administrator\Desktop\svg -o C:\Users\Administrator\Desktop\svg\min


svgo -s '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#333" d="M772.86 221.677a54.351 54.351 0 10108.702 0 54.351 54.351 0 10-108.702 0zM873.818 515.4a67.087 67.087 0 10134.174 0 67.087 67.087 0 10-134.174 0zM750.78 810.595a78.975 78.975 0 10157.95 0 78.975 78.975 0 10-157.95 0zM443.345 928.641a91.487 91.487 0 10182.973 0 91.487 91.487 0 10-182.973 0zM141.878 805.955a101.902 101.902 0 10203.805 0 101.902 101.902 0 10-203.805 0zM428.769 107.87a107.854 107.854 0 10215.709 0 107.854 107.854 0 10-215.709 0zM135.926 224.22a107.854 107.854 0 10215.709 0 107.854 107.854 0 10-215.71 0zM26.664 512.008a102.766 102.766 0 10205.532 0 102.766 102.766 0 10-205.532 0z"/></svg>' -o test.min.svg


