(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{417:function(t,e,n){(function(n){var o,r,i;r=[],void 0===(i="function"==typeof(o=function(){"use strict";function e(t,e,n){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){a(o.response,e,n)},o.onerror=function(){console.error("could not download file")},o.send()}function o(t){var e=new XMLHttpRequest;return e.open("HEAD",t,!1),e.send(),200<=e.status&&299>=e.status}function r(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(n){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,a=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype?function(t,n,a){var u=i.URL||i.webkitURL,s=document.createElement("a");n=n||t.name||"download",s.download=n,s.rel="noopener","string"==typeof t?(s.href=t,s.origin===location.origin?r(s):o(s.href)?e(t,n,a):r(s,s.target="_blank")):(s.href=u.createObjectURL(t),setTimeout(function(){u.revokeObjectURL(s.href)},4e4),setTimeout(function(){r(s)},0))}:"msSaveOrOpenBlob"in navigator?function(t,n,i){if(n=n||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(t,e){return void 0===e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,i),n);else if(o(t))e(t,n,i);else{var a=document.createElement("a");a.href=t,a.target="_blank",setTimeout(function(){r(a)})}}:function(t,n,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof t)return e(t,n,o);var a="application/octet-stream"===t.type,u=/constructor/i.test(i.HTMLElement)||i.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent);if((s||a&&u)&&"object"==typeof FileReader){var c=new FileReader;c.onloadend=function(){var t=c.result;t=s?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=t:location=t,r=null},c.readAsDataURL(t)}else{var l=i.URL||i.webkitURL,p=l.createObjectURL(t);r?r.location=p:location.href=p,r=null,setTimeout(function(){l.revokeObjectURL(p)},4e4)}});i.saveAs=a.saveAs=a,t.exports=a})?o.apply(e,r):o)||(t.exports=i)}).call(this,n(86))},515:function(t,e,n){"use strict";n.r(e);var o=n(116),r=n(1),i=n(391),a=n(500),u=n(399),s=n(70);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function p(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var d,h=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),p(this,f(e).apply(this,arguments))}var n,o,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,r["Component"]),n=e,(o=[{key:"render",value:function(){var t,e=this,n=this.props.t,o={key:d.text,text:n("Textbox")};return t=this.props.enableFileExport?[{key:d.file,text:n("File")},o]:[o],r.createElement(a.a,{label:n("Export type"),options:t,responsiveMode:u.ResponsiveMode.large,selectedKey:this.props.value,onChange:function(t,n){return e.props.onChange(n.key)}})}}])&&l(n.prototype,o),i&&l(n,i),e}(),y=Object(s.e)("importExport")(h),m=n(449),v=n(450),w=n(509),x=n(506),E=n(504),g=n(498),O=n(513),T=n(71),S=n(417),k=n(457),j=n(451),C=n(85),R=n(452),_=n(453),L=n(454),P=n(455);function A(t){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function F(t,e,n,o,r,i,a){try{var u=t[i](a),s=u.value}catch(t){return void n(t)}u.done?e(s):Promise.resolve(s).then(o,r)}function M(t){return function(){var e=this,n=arguments;return new Promise(function(o,r){var i=t.apply(e,n);function a(t){F(i,o,r,a,u,"next",t)}function u(t){F(i,o,r,a,u,"throw",t)}a(void 0)})}}function U(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function B(t,e){return!e||"object"!==A(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function D(t){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function H(t,e){return(H=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}n.d(e,"ExportType",function(){return d}),n.d(e,"ExportComponent",function(){return N}),function(t){t[t.file=0]="file",t[t.text=1]="text"}(d||(d={}));var N=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=B(this,D(e).call(this,t,"export",{exportType:o.c.enableFileExport?d.file:d.text,delimiter:",",newline:T.b.CRLF,encoding:"UTF-8",outputText:{show:!1,text:""}},["exportType","delimiter","newline","encoding"]))).buttonOnClick=M(regeneratorRuntime.mark(function t(){var e,o,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=function(t,e){return e.exportType===d.text?e.outputText.show?{show:!t.outputText.show,text:t.outputText.text}:{show:t.outputText.show,text:t.outputText.text}:{show:!1,text:""}},o=Object.assign({},n.state),n.setState(function(t){return{outputText:e(t,o)}}),t.next=5,n.props.store.csvStringAndName(n.state);case 5:if(null!==(r=t.sent)){t.next=8;break}return t.abrupt("return");case 8:n.saveOrOutput(r,o);case 9:case"end":return t.stop()}},t)})),n}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&H(t,e)}(e,L["a"]),n=e,(i=[{key:"render",value:function(){var t=this,e=this.props.t,n=r.createElement(w.a,{label:e("Export result"),className:C.monospace,readOnly:!0,multiline:!0,rows:15,spellCheck:!1,wrap:"off",value:this.state.outputText.text}),i=r.createElement(x.a,{style:{color:"red"},variant:"medium"},e("Large file export is not supported"));return r.createElement(r.Fragment,null,r.createElement(P.a,{hidden:"iPad"!==navigator.platform,onClick:function(e){return t.props.history.push(e)}}),r.createElement("div",{className:C.pageMargin},r.createElement(x.a,{variant:"xLarge"},r.createElement("strong",null,e("Export CSV"))),r.createElement(y,{enableFileExport:o.c.enableFileExport,value:this.state.exportType,onChange:function(e){return t.setState({exportType:e})}}),r.createElement("br",null),r.createElement(k.a,{value:this.state.encoding,onChange:function(e){return t.setState({encoding:e})},hidden:this.state.exportType===d.text,showAutoDetect:!1}),r.createElement(m.a,{value:this.state.delimiter,onChange:function(e){return t.setState({delimiter:e})},showAutoDetect:!1,showLengthError:!1}),r.createElement("br",null),r.createElement(v.a,{value:this.state.newline,onChange:function(e){return t.setState({newline:e})},showAutoDetect:!1}),r.createElement("br",null),r.createElement(E.a,{styles:{root:{display:"inline-block"}},content:this.buttonTooltipContent()},r.createElement(g.a,{onClick:this.buttonOnClick,disabled:""!==this.buttonTooltipContent(),text:e("Export to CSV")})),r.createElement("br",null),this.props.store.state.largeFile?i:null,r.createElement(j.a,{onClick:this.props.store.abort,progress:this.props.store.state.progress}),r.createElement(O.a,{inlineLabel:!0,label:e("Save options"),defaultChecked:this.initialSaveStatus(),onChange:function(e,n){return t.setSaveStatus(n)}}),this.state.outputText.show?n:null,r.createElement(_.a,{parserOutput:this.props.store.state.parserOutput}),r.createElement(R.a,null)))}},{key:"saveOrOutput",value:function(t,e){switch(e.exportType){case d.file:var n={type:"text/csv;charset="+e.encoding},o=new Blob([t.string],n);return void S.saveAs(o,t.name+".csv");case d.text:return void this.setState(function(e){return{outputText:{show:!e.outputText.show,text:t.string}}})}}},{key:"buttonTooltipContent",value:function(){return this.props.store.state.initialized?"":this.props.t("Excel API is not initialized")}}])&&U(n.prototype,i),a&&U(n,a),e}();e.default=Object(s.e)("importExport")(Object(i.a)(N))}}]);
//# sourceMappingURL=export.a68035815f83269fdda2.js.map