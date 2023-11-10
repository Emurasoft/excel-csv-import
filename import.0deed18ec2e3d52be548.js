/*! For license information please see import.0deed18ec2e3d52be548.js.LICENSE.txt */
"use strict";(self.webpackChunkexcel_csv_import=self.webpackChunkexcel_csv_import||[]).push([[6],{35620:(t,e,r)=>{r.r(e),r.d(e,{default:()=>O}),r(59749),r(86544),r(60228),r(84254),r(752),r(21694),r(76265),r(89730),r(12826),r(34284),r(77049),r(64043),r(7409),r(73964),r(58373),r(66793),r(7629),r(77509),r(88052),r(47522);var n=r(67294),o=r(2745),i=r(59201),a=r(20075),u=r(5343),c=r(24817),l=r(14645),f=r(501),s=[{key:0,text:"File"},{key:1,text:"Text input"}];function h(t){var e,r,o=t.value,i=t.onChange;switch(o.inputType){case 0:r=function(t){return i({inputType:0,file:t,text:""})},e=n.createElement(n.Fragment,null,n.createElement("input",{className:u.fullWidth,type:"file",accept:"text/csv",onChange:function(t){return r(t.target.files[0])},id:"SourceInput-FileInput"}),n.createElement("br",null));break;case 1:e=function(t,e){return n.createElement(c.n,{className:u.monospace,multiline:!0,rows:10,spellCheck:!1,wrap:"off",onChange:function(t,e){return function(t){return i({inputType:1,file:null,text:t})}(e)},value:t,id:"SourceInput-TextInput"})}(o.text)}return n.createElement(n.Fragment,null,n.createElement(l.L,{label:"Import type",options:s,responsiveMode:f.eD.large,selectedKey:o.inputType,onChange:function(t,e){return i({inputType:e.key,file:null,text:""})},id:"SourceInput-Dropdown"}),n.createElement("div",{className:u.smallDivider}),e)}var p=r(14661),y=r(9626),m=r(77378),v=r(98836),d=r(51687),g=r(64803),w=r(55877),b=r(92620),E=r(26372),x=r(31005),L=r(30379);function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function S(){S=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var i=e&&e.prototype instanceof d?e:d,a=Object.create(i.prototype),u=new N(n||[]);return o(a,"_invoke",{value:_(t,r,u)}),a}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h="suspendedStart",p="suspendedYield",y="executing",m="completed",v={};function d(){}function g(){}function w(){}var b={};l(b,a,(function(){return this}));var E=Object.getPrototypeOf,x=E&&E(E(A([])));x&&x!==r&&n.call(x,a)&&(b=x);var L=w.prototype=d.prototype=Object.create(b);function C(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function r(o,i,a,u){var c=s(t[o],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==k(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function _(e,r,n){var o=h;return function(i,a){if(o===y)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate;if(u){var c=j(u,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var l=s(e,r,n);if("normal"===l.type){if(o=n.done?m:p,l.arg===v)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function j(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,j(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var i=s(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function A(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(k(e)+" is not iterable")}return g.prototype=w,o(L,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:g,configurable:!0}),g.displayName=l(w,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},e.awrap=function(t){return{__await:t}},C(T.prototype),l(T.prototype,u,(function(){return this})),e.AsyncIterator=T,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new T(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},C(L),l(L,c,"Generator"),l(L,a,(function(){return this})),l(L,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=A,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(I),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return u.type="throw",u.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:A(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}function C(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function T(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,u=[],c=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,e)||function(t,e){if(t){if("string"==typeof t)return _(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var j=(0,b.a)("import");function O(){var t,e,r,u=(0,L.C)((function(t){return t.initialized})),c=(0,L.C)((function(t){return t.platform})),l=(0,L.C)((function(t){return t.progress})),f=(0,L.C)((function(t){return t.output})),s=(0,E.I0)(),b=T((0,n.useState)({inputType:0,file:null,text:""}),2),k=b[0],_=b[1],O=T(j("delimiter",","),2),I=O[0],N=O[1],A=T(j("newline",""),2),P=A[0],G=A[1],F=T(j("encoding",""),2),D=F[0],z=F[1];return t=0==k.inputType&&null==k.file?"Import source is not selected":1!==I.length?"Delimiter is invalid":u?"":"Excel API is not initialized",n.createElement(w.T,{text:"Import CSV",helpLink:"https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md",mac:c===Office.PlatformType.Mac},n.createElement(h,{value:k,onChange:_}),n.createElement("br",null),0===k.inputType?n.createElement(m.C,{value:D,onChange:z,showAutoDetect:!0}):null,n.createElement(p.N,{value:I,onChange:N,showLengthError:!0}),n.createElement("br",null),n.createElement(y.U,{value:P,onChange:G,showAutoDetect:!0}),n.createElement("br",null),n.createElement(o.G,{styles:{root:{display:"inline-block"}},content:t,delay:i.j.zero},n.createElement(a.K,{disabled:""!==t,onClick:(e=S().mark((function t(){return S().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",s((0,x.Tl)({source:k,newline:P,delimiter:I,encoding:D})));case 1:case"end":return t.stop()}}),t)})),r=function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(t){C(i,n,o,a,u,"next",t)}function u(t){C(i,n,o,a,u,"throw",t)}a(void 0)}))},function(){return r.apply(this,arguments)}),text:"Import CSV"})),n.createElement("br",null),n.createElement(v.k,{onClick:function(){return s((0,x.JG)())},progress:l}),n.createElement(g.N,{output:f}),n.createElement(d._,null))}}}]);
//# sourceMappingURL=import.0deed18ec2e3d52be548.js.map