(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{577:function(e,t,n){(function(n){var o,r,i;r=[],void 0===(i="function"==typeof(o=function(){"use strict";function t(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){a(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(n){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,a=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype?function(e,n,a){var c=i.URL||i.webkitURL,u=document.createElement("a");n=n||e.name||"download",u.download=n,u.rel="noopener","string"==typeof e?(u.href=e,u.origin===location.origin?r(u):o(u.href)?t(e,n,a):r(u,u.target="_blank")):(u.href=c.createObjectURL(e),setTimeout((function(){c.revokeObjectURL(u.href)}),4e4),setTimeout((function(){r(u)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,i){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,i),n);else if(o(e))t(e,n,i);else{var a=document.createElement("a");a.href=e,a.target="_blank",setTimeout((function(){r(a)}))}}:function(e,n,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return t(e,n,o);var a="application/octet-stream"===e.type,c=/constructor/i.test(i.HTMLElement)||i.safari,u=/CriOS\/[\d]+/.test(navigator.userAgent);if((u||a&&c)&&"object"==typeof FileReader){var s=new FileReader;s.onloadend=function(){var e=s.result;e=u?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},s.readAsDataURL(e)}else{var l=i.URL||i.webkitURL,p=l.createObjectURL(e);r?r.location=p:location.href=p,r=null,setTimeout((function(){l.revokeObjectURL(p)}),4e4)}});i.saveAs=a.saveAs=a,e.exports=a})?o.apply(t,r):o)||(e.exports=i)}).call(this,n(132))},605:function(e,t,n){"use strict";n.r(t),n.d(t,"ExportComponent",(function(){return D}));n(94),n(95),n(96),n(263),n(264),n(69),n(131),n(265),n(266),n(177),n(267),n(68),n(100),n(178),n(97),n(98),n(268),n(80),n(99);var o=n(1),r=n(521),i=n(541),a=n(542),c=n(611),u=n(613),s=n(608),l=n(548),p=n(610),f=n(615),d=n(621),b=n(577),h=n(549),y=n(543),m=n(128),v=n(544),w=n(545),x=n(530),g=n(546);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){j(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e,t,n,o,r,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(o,r)}function S(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){k(i,o,r,a,c,"next",e)}function c(e){k(i,o,r,a,c,"throw",e)}a(void 0)}))}}function R(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function L(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function A(e){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(E,e);var t,n,r,x,O=(t=E,function(){var e,n=A(t);if(L()){var o=A(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return C(this,e)});function E(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,E),(t=O.call(this,e,"export",{exportType:1,delimiter:",",newline:"\r\n",encoding:"UTF-8",outputText:{show:!1,text:""}},["exportType","delimiter","newline","encoding"])).buttonOnClick=S(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(e,t){return 1===t.exportType?t.outputText.show?{show:!e.outputText.show,text:e.outputText.text}:{show:e.outputText.show,text:e.outputText.text}:{show:!1,text:""}},o=T({},t.state),t.setState((function(e){return{outputText:n(e,o)}})),e.next=5,t.props.store.csvStringAndName(t.state);case 5:if(null!==(r=e.sent)){e.next=8;break}return e.abrupt("return");case 8:t.saveOrOutput(r,o);case 9:case"end":return e.stop()}}),e)}))),t}return n=E,(r=[{key:"render",value:function(){var e=this,t=[{key:1,text:"Textbox"}];this.props.store.state.platform===Office.PlatformType.OfficeOnline&&t.push({key:0,text:"File"});var n=o.createElement(c.a,{label:"Export result",className:m.monospace,readOnly:!0,multiline:!0,rows:15,spellCheck:!1,wrap:"off",value:this.state.outputText.text}),r=o.createElement(u.a,{style:{color:"red"},variant:"medium"},"Large file export is not supported");return o.createElement(o.Fragment,null,o.createElement("div",{className:m.pageMargin},o.createElement(g.a,{text:"Export CSV",helpLink:"https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md#export-csv",mac:this.props.store.state.platform===Office.PlatformType.Mac}),o.createElement(s.a,{label:"Export type",options:t,responsiveMode:l.a.large,selectedKey:this.state.exportType,onChange:function(t,n){return e.setState({exportType:n.key})},id:"exportTypeDropdown"}),o.createElement("br",null),o.createElement(h.a,{value:this.state.encoding,onChange:function(t){return e.setState({encoding:t})},hidden:1===this.state.exportType,showAutoDetect:!1}),o.createElement(i.a,{value:this.state.delimiter,onChange:function(t){return e.setState({delimiter:t})},showLengthError:!1}),o.createElement("br",null),o.createElement(a.a,{value:this.state.newline,onChange:function(t){return e.setState({newline:t})},showAutoDetect:!1}),o.createElement("br",null),o.createElement(p.a,{styles:{root:{display:"inline-block"}},content:this.buttonTooltipContent()},o.createElement(f.a,{onClick:this.buttonOnClick,disabled:""!==this.buttonTooltipContent(),text:"Export to CSV"})),o.createElement("br",null),this.props.store.state.largeFile?r:null,o.createElement(y.a,{onClick:this.props.store.abort,progress:this.props.store.state.progress}),o.createElement(d.a,{inlineLabel:!0,label:"Save options",defaultChecked:this.initialSaveStatus(),onChange:function(t,n){return e.setSaveStatus(n)}}),this.state.outputText.show?n:null,o.createElement(w.a,{parserOutput:this.props.store.state.parserOutput}),o.createElement(v.a,null)))}},{key:"saveOrOutput",value:function(e,t){switch(t.exportType){case 0:var n={type:"text/csv;charset="+t.encoding},o=new Blob([e.string],n);return void b.saveAs(o,e.name+".csv");case 1:return void this.setState((function(t){return{outputText:{show:!t.outputText.show,text:e.string}}}))}}},{key:"buttonTooltipContent",value:function(){return this.props.store.state.initialized?"":"Excel API is not initialized"}}])&&R(n.prototype,r),x&&R(n,x),E}(x.a);t.default=Object(r.a)(D)}}]);
//# sourceMappingURL=export.e52844ee69f59e3186ec.js.map