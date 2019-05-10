(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,o){"use strict";o.r(t);var n=o(0),r=o(7),a=o(2),c=o(3),u=o(5),s=o(4),i=o(6),l=o(1),d=function(){return Object(n.createVNode)(1,"div",null,[Object(n.createVNode)(1,"h1",null,"inferno-fluxible demo.",16),Object(n.createVNode)(1,"h2",null,"State management library for inferno built on top of fluxible-js.",16),Object(n.createVNode)(1,"p",null,[Object(n.createTextVNode)("In this demo app, I used "),Object(n.createVNode)(1,"strong",null,"inferno-fluxible",16),Object(n.createTextVNode)(" to manage your username and todos."),Object(n.createTextVNode)("I'm"),Object(n.createTextVNode)(" also using the persist feature to persist your todos but not your username. That means even if after you refresh your page, your todos should still be intact.")],0)],4)},p=o(8),b=function(e){function t(){return Object(a.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return Object(n.createVNode)(1,"div",null,[Object(n.createVNode)(1,"h3",null,"Todos component: Your todos (managed by inferno-fluxible)",16),this.props.todos.length?this.props.todos.map(function(e,t){return Object(n.createVNode)(1,"p","done",[Object(n.createVNode)(1,"span",null,"x",16,{onClick:function(){Object(l.updateStore)({todos:l.store.todos.filter(function(e,o){return o!==t})})},style:"cursor: pointer; color: white; padding: 2px; border-radius: 4px; background-color: red; margin-right: 5px;"}),Object(n.createVNode)(64,"input",null,null,1,{type:"checkbox",style:"margin-right: 5px;",checked:e.isDone,onChange:function(e){Object(l.updateStore)({todos:l.store.todos.map(function(o,n){return n!==t?o:Object(r.a)({},o,{isDone:e.target.checked})})})}}),e.isDone?Object(n.createVNode)(1,"s",null,e.value,0):e.value],0,null,t)}):Object(n.createVNode)(1,"p",null,"You have no todos.",16)],0)}}]),t}(n.Component),O=Object(p.mapStatesToProps)(b,function(e){return{todos:e.todos}}),j=function(e){function t(){return Object(a.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return Object(n.createVNode)(1,"div",null,[Object(n.createVNode)(1,"h3",null,"Username component: Your usename (managed by inferno-fluxible)",16),Object(n.createVNode)(1,"p",null,this.props.username.length?this.props.username:"You have no username.",0)],4)}}]),t}(n.Component),m=Object(p.mapStatesToProps)(j,function(e){return{username:e.username}}),f=function(e){function t(e){var o;return Object(a.a)(this,t),(o=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={newUsername:"",newTodoValue:""},o}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return Object(n.createVNode)(1,"div","App",[Object(n.createComponentVNode)(2,d),Object(n.createVNode)(1,"hr"),Object(n.createVNode)(1,"p",null,"This data is store internally as state of this component.",16),Object(n.createVNode)(1,"form",null,[Object(n.createVNode)(64,"input",null,null,1,{type:"text",value:this.state.newUsername,placeholder:"Your username here...",onInput:function(t){e.setState(Object(r.a)({},e.state,{newUsername:t.target.value}))}}),Object(n.createVNode)(64,"input",null,null,1,{type:"submit",value:"Change username"})],4,{onSubmit:function(t){t.preventDefault(),Object(l.updateStore)({username:e.state.newUsername}),e.setState(Object(r.a)({},e.state,{newUsername:""}))}}),Object(n.createVNode)(1,"hr"),Object(n.createVNode)(1,"h3",null,"Add todo",16),Object(n.createVNode)(1,"p",null,"This data is managed as internal state of this component.",16),Object(n.createVNode)(1,"form",null,[Object(n.createVNode)(64,"input",null,null,1,{type:"text",value:this.state.newTodoValue,onInput:function(t){e.setState({newTodoValue:t.target.value})}}),Object(n.createVNode)(64,"input",null,null,1,{type:"submit",value:"Add todo"})],4,{onSubmit:function(t){t.preventDefault(),Object(l.updateStore)({todos:l.store.todos.concat({value:e.state.newTodoValue,isDone:!1})}),e.setState(Object(r.a)({},e.state,{newTodoValue:""}))}}),Object(n.createVNode)(1,"hr"),Object(n.createComponentVNode)(2,m),Object(n.createComponentVNode)(2,O)],4)}}]),t}(n.Component);Object(l.initializeStore)({initialStore:{username:"",todos:[]},persist:{syncStorage:window.localStorage,restore:function(e){return{todos:e.todos}}}}),Object(n.render)(Object(n.createComponentVNode)(2,f),document.getElementById("app"))},8:function(e,t,o){"use strict";t.__esModule=!0,t.mapStatesToProps=function(e,t){function o(o){var n=this;return this.props=o,this.state={mappedStates:t(a.store)},this.componentWillUnmount=(0,a.addObserver)(function(){n.setState({mappedStates:t(a.store)})},Object.keys(this.state.mappedStates)),this.render=function(){return(0,r.normalizeProps)((0,r.createComponentVNode)(2,e,u({},n.props,n.state.mappedStates)))},this}return o.prototype=r.Component.prototype,o.prototype.constructor=o,(0,c.default)(o,e),o};var n,r=o(0),a=o(1),c=(n=o(10))&&n.__esModule?n:{default:n};function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}},9:function(e,t,o){e.exports=o(11)}},[[9,1,2]]]);