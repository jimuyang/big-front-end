import Vue from 'vue';
import ElementUI, { Button } from 'element-ui';

import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/zh-CN';

// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

// 引入element-ui scss全局变量
import './global-variables.scss'

// 设置语言
locale.use(lang)

// 设置全局属性
Vue.prototype.$ELEMENT = {
    size: 'small',
    zIndex: 3000
}

// 单个引入组件
Vue.component(Button.name, Button)

// 使用elementUI
Vue.use(ElementUI)