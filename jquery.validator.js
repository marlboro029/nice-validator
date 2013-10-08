/*! nice Validator 0.5.0-beta
 * (c) 2012-2013 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function(e,t){"use strict";function i(s,a){var l,u,o=this;return!o instanceof i?new i(s,a):(E(a)&&(a={valid:a}),a=a||{},a.valid&&(o.isAjaxSubmit=!0),u=W(s,"data-"+f+"-option"),u=u&&"{"===u.charAt(0)?Function("return "+u)():{},l=P[a.theme||u.theme||L.theme],o.options=e.extend({},L,l,u,a),o.$el=e(s),o.rules=new n(o.options.rules,!0),o.messages=new r(o.options.messages,!0),o.elements={},o.fields={},o.deferred={},o.errors={},o.isValid=!0,o._init(),t)}function n(e,t){var i=t?t===!0?this:t:n.prototype;if(D(e))for(var r in e)i[r]=s(e[r])}function r(e,t){var i=t?t===!0?this:t:r.prototype;if(D(e))for(var n in e){if(!e[n])return;i[n]=e[n]}}function s(t){switch(e.type(t)){case"function":return t;case"array":return function(e){return t[0].test(e.value)||t[1]||!1};case"regexp":return function(e){return t.test(e.value)}}}function a(t){var i="";return e.map(t.split(" "),function(e){i+=","+("#"===e.charAt(0)?e:'[name="'+e+'"]')}),i.substring(1)}function l(t){if(t&&t.tagName){var i=t;switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":i=t.form||e(t).closest(".n-"+f);break;default:i=e(t).closest(".n-"+f)}return e(i).data(f)||e(i)[f]().data(f)}}function u(i,n){var r=e.trim(W(i,_+"-"+n));if(r)return r=Function("return "+r)(),r?s(r):t}function o(e,t,i){var n=t.msg;return D(n)&&i&&(n=n[i]),N(n)||(n=W(e,"data-msg-"+i)||W(e,"data-msg")||""),n}function d(e){var t;return e&&(t=S.exec(e)),t?t[1]:""}function c(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}var f="validator",g="n-ok",p="n-error",h="n-tip",m="n-loading",v="n-valid",y="n-invalid",b="msg-box",k="aria-invalid",_="data-rule",w="data-target",M="data-tip",x="data-inputstatus",O="novalidate",$=":validationinput",A=/(\w+)(?:\[(.*)\]$|\((.*)\)$)?/,R=/(?:([^:;\(\[]*):)?(.*)/,V=/[^\x00-\xff]/g,S=/^.*(top|right|bottom|left).*$/,j=/(?:(post|get):)?(.+)/i,C=/<|>/g,F=e.noop,T=e.proxy,E=e.isFunction,q=e.isArray,N=function(e){return"string"==typeof e},D=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},I=!window.XMLHttpRequest,W=function(e,i,n){return n===t?e.getAttribute(i):(null===n?e.removeAttribute(i):e.setAttribute(i,""+n),t)},H=window.console||{log:F,info:F,warn:F},L={debug:0,timely:1,theme:"default",stopOnError:!1,ignore:"",beforeSubmit:F,valid:F,invalid:F,msgWrapper:"span",msgMaker:function(e){var t,i={error:p,ok:g,tip:h,loading:m}[e.type];return t='<span class="msg-wrap '+i+'" role="alert">',t+=(e.arrow||"")+(e.icon||"")+'<span class="n-msg">'+e.msg+"</span>",t+="</span>"},msgIcon:'<span class="n-icon"></span>',msgArrow:"",msgClass:"",defaultMsg:"{0} is not valid.",loadingMsg:"Validating..."},P={"default":{formClass:"n-default",msgClass:"n-right",showOk:""}};e.fn[f]=function(t){var n=this,r=arguments;return n.is(":input")?n:(!n.is("form")&&(n=this.find("form")),!n.length&&(n=this),n.each(function(){if(N(t)){if("_"===t.charAt(0))return;var n=e(this).data(f);n&&n[t].apply(n,Array.prototype.slice.call(r,1))}else new i(this,t)}),this)},e.fn.isValid=function(e,i){var n,r,s=l(this[0]);return s?(i===t&&(i=!0),s.checkOnly=i,n=this.is(":input")?this:this.find($),r=s._multiValidate(n,function(t){E(e)&&e.call(null,t),s.checkOnly=!1},!0),E(e)?this:r):!0},e.expr[":"].validationinput=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&"submit"!==e.type&&"button"!==e.type&&"reset"!==e.type||"select"===t||"textarea"===t)&&e.disabled===!1&&!W(e,O)},i.prototype={_init:function(){var t=this,i=t.options,n=t.fields;q(i.groups)&&e.map(i.groups,function(i){if(!N(i.fields)||!E(i.callback))return null;var r=t.$el.find(a(i.fields)),s=function(){return i.callback.call(t,r)};e.extend(s,i),e.map(i.fields.split(" "),function(e){n[e]=n[e]||{},n[e].group=s})}),D(i.fields)&&e.each(i.fields,function(e,t){t&&(n[e]=N(t)?{rule:t}:t)}),t.$el.find($).each(function(){t._parse(this)}),t.msgOpt={type:"error",pos:d(i.msgClass),cls:i.msgClass,style:i.msgStyle,icon:i.msgIcon,arrow:i.msgArrow,show:i.msgShow,hide:i.msgHide},t.$el.data(f)||(t.$el.on("submit."+f+" validate."+f,T(t,"_submit")).on("reset."+f,T(t,"_reset")).on("validated.field."+f,$,T(t,"_validatedField")).on("validated.rule."+f,$,T(t,"_validatedRule")).on("focusin."+f+" click."+f,$,T(t,"_focus")).on("focusout."+f+" validate."+f,$,T(t,"_blur")).on("click."+f,":radio,:checkbox",T(t,"_click")),i.timely>=2&&t.$el.on("keyup."+f+" paste."+f,$,T(t,"_blur")).on("change."+f,"select",T(t,"_click")),t.$el.data(f,t).addClass("n-"+f+" "+i.formClass),W(t.$el[0],O,!0))},_multiValidate:function(i,n,r){var s=this,a=s.options;return a.ignore&&(i=i.not(a.ignore)),s.isValid=!0,s.deferred={},i.each(function(e,i){var n=s.getField(i);if(n)return s._validate(i,n,r),!s.isValid&&a.stopOnError?!1:t}),e.when.apply(null,e.map(s.deferred,function(e){return e})).done(function(){n.call(s,s.isValid)}),e.isEmptyObject(s.deferred)?s.isValid:t},_submit:function(i,n){var r=this,s=r.options,a=i.target;if(r.submiting&&"only"!==n)return E(r.submiting)&&r.submiting.call(r),i.preventDefault();if("only"!==n&&("validate"!==i.type||"FORM"===a.tagName)){if(r.isAjaxSubmit===t)if(null===W(a,"action"))r.isAjaxSubmit=!0;else{var l=e[e._data?"_data":"data"](r.$el[0],"events");r.isAjaxSubmit=l&&l.valid&&e.map(l.valid,function(e){return"form"===e.namespace?1:null}).length?!0:!1}if(s.beforeSubmit.call(r,a)!==!1)return r._reset(),r.submiting=!0,r._multiValidate(r.$el.find($),function(t){var i,n="focus.field",l=t||2===s.debug?"valid":"invalid";if(t)r.isAjaxSubmit||e(a).trigger("submit",["only"]);else{var u=r.$el.find(":input."+y+":first");u.trigger(n),I&&u.trigger(n),i=r.errors}s[l].call(r,a,i),r.$el.trigger(l+".form",[a,i]),r.submiting=!1},!0),(r.isAjaxSubmit||!e.isEmptyObject(r.deferred))&&i.preventDefault(),r.isValid}},_reset:function(){var t=this;t.$el.find(t.options.msgWrapper+"."+b).hide(),t.$el.find($).each(function(){W(this,x,null),W(this,k,null),e(this).removeClass(v+" "+y)}),t.errors={},t.isValid=!0},_focus:function(e){var t=e.target;this.submiting||""!==t.value&&("false"===W(t,k)||"tip"===W(t,x))||this.showMsg(t,{msg:W(t,M),type:"tip"})},_blur:function(t,i){var n,r,s=this,a=s.options,l=t.target,u=t.type,o=100;if(!i&&"paste"!==u){if("validate"===u)r=!0,o=0;else{if(W(l,"notimely"))return;if(a.timely>=2&&"keyup"!==u)return}if(a.ignore&&e(l).is(a.ignore))return;if("keyup"===u){var d=t.keyCode,c={8:1,9:1,16:1,32:1,46:1};if(9===d&&!l.value)return;if(48>d&&!c[d])return;o=a.timely>=100?a.timely:500}}n=s.getField(l),n&&(o?(n.timeout&&clearTimeout(n.timeout),n.timeout=setTimeout(function(){s._validate(l,n,r)},o)):s._validate(l,n,r))},_click:function(e){this._blur(e,!0)},_parse:function(e){var i,n=this,r=e.name;return(e.id&&"#"+e.id in n.fields||!e.name)&&(r="#"+e.id),r?(i=n.fields[r]||{},i.rule||(i.rule=W(e,_)||""),W(e,_,null),i.rule&&(i.key=r,i.required=-1!==i.rule.indexOf("required"),i.must=i.must||!!i.rule.match(/match|checked/),i.required&&W(e,"aria-required",!0),("timely"in i&&!i.timely||!n.options.timely)&&W(e,"notimely",!0),N(i.target)&&W(e,w,i.target),N(i.tip)&&W(e,M,i.tip),n.fields[r]=n._parseRule(i)),t):W(e,_,null)},_parseRule:function(i){var n,r=R.exec(i.rule);if(r)return i.display=r[1],i.rules=[],n=(r[2]||"").split(";"),e.map(n,function(n){var r=A.exec(n);return r?(r[3]&&(r[2]=r[3]),i.rules.push({method:r[1],params:r[2]?e.trim(r[2]).split(", "):t}),t):null}),i.vid=0,i.rid=i.rules[0].method,i},_validatedField:function(t,i,n){var r=this,s=r.options,a=t.target,l=i.isValid=!!n.valid;l?n.type="ok":r.submiting&&(r.errors[i.key]=n.msg),e(a).attr(k,!l).addClass(l?v:y).removeClass(l?y:v).trigger((l?"valid":"invalid")+".field",[i,n]),i.old.ret=n,r.elements[i.key]=a,(i.msgMaker||s.msgMaker&&!r.checkOnly)&&(!n.showOk&&n.msg||n.showOk&&s.showOk!==!1?r.showMsg(a,n,i):r.hideMsg(a,n))},_validatedRule:function(i,n,r,s){n=n||a.getField(u);var a=this,l=a.options,u=i.target,d="",c=n.rid,f=!1,g=!1;if(s=s||{},r===!0||r===t?f=!0:(d=o(u,n,c),d||(N(r)?(d=r,r={error:d}):D(r)&&(r.error?d=r.error:(f=!0,r.ok&&N(r.ok)&&(g=!0),d=r.ok))),s.msg=(f?d:d||a.messages[c]||L.defaultMsg).replace("{0}",n.display||"")),f){if(s.valid=!0,!g){var p=n.ok||W(u,"data-ok");p?(g=!0,s.msg=p):N(l.showOk)&&(g=!0,s.msg=l.showOk)}s.showOk=g,e(u).trigger("valid.rule",[c,s.msg])}else a.isValid=!1,e(u).trigger("invalid.rule",[c,s.msg]);l.debug&&H[f?"info":"warn"](n.vid+": "+c+" -> "+(s.msg||!0)),f&&n.old.value!==t&&n.old.value!==u.value?(n.vid=0,a._checkRule(u,n)):f&&n.vid<n.rules.length-1?(n.vid++,a._checkRule(u,n)):(n.vid=0,e(u).trigger("validated.field",[n,s]))},_checkRule:function(i,n){var r,s=this,a=n.key,l=n.rules[n.vid],o=l.method,d=l.params;if(!s.submiting||!s.deferred[a])if(n.rid=o,n.old.value=i.value,r=(u(i,o)||s.rules[o]||function(){return!0}).call(s,i,d,n),D(r)&&E(r.then)){var c=function(e){return N(e)||D(e)&&("error"in e||"ok"in e)?e:t};s.deferred[a]=r,!s.checkOnly&&s.showMsg(i,{type:"loading",msg:s.options.loadingMsg},n),r.then(function(r,s,a){var l,u=a.responseText;""===u?u=!0:"{"===u.charAt(0)&&(u=e.parseJSON(u)||{},l=c(u),l===t&&(l=c(u.data)),u=l||!0),e(i).trigger("validated.rule",[n,u])},function(t,r){e(i).trigger("validated.rule",[n,r])}),n.isValid=t}else e(i).trigger("validated.rule",[n,r])},_validate:function(i,n,r){if(!i.disabled&&!W(i,O)){n.rules||this._parse(i);var s,a,l=this,u=l.options,o=e(i),d={},f=n.group,g="tip"===W(i,x),p=n.isValid=!0;if(s=n.old=n.old||{},r=r||n.must,f&&(e.extend(d,f),a=f.call(l),a!==!0?(N(a)&&(a={error:a}),n.vid=0,n.rid="group",p=!1):(a=t,l.hideMsg(i,d))),p&&!n.required&&""===i.value){if(g)return;if(l._focus({target:i}),s.value="",!c(i))return o.trigger("validated.field",[n,{valid:!0}]),t}else if(!r&&s&&s.ret!==t&&s.value===i.value){if(s.ret.valid||(l.isValid=!1),g)return;if(""!==i.value)return d=s.ret,o.trigger("validated.field",[n,d]),t}u.debug&&H.log(i),a!==t?o.trigger("validated.rule",[n,a,d]):n.rule&&l._checkRule(i,n)}},_getMsgOpt:function(t){return e.extend({},this.msgOpt,N(t)?{msg:t}:t)},getField:function(e){var t,i=this;return t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name,W(e,_)&&i._parse(e),i.fields[t]},test:function(i,n){var r,s,a,l=this,u=A.exec(n);return u?(u[3]&&(u[2]=u[3]),s=u[1],a=u[2]?e.trim(u[2]).split(", "):t,s in l.rules&&(r=l.rules[s].call(l,i,a)),r===!0||r===t||r):!0},getRangeMsg:function(e,t,i,n){if(t){var r=this,s=r.messages[i]||"",a=t[0].split("~"),l=a[0],u=a[1],o="rg",d=[""],c=+e===+e;if(2===a.length){if(l&&u){if(c&&e>=+l&&+u>=e)return!0;d=d.concat(a)}else if(l&&!u){if(c&&e>=+l)return!0;d.push(l),o="gt"}else if(!l&&u){if(c&&+u>=e)return!0;d.push(u),o="lt"}}else{if(e===+l)return!0;d.push(l),o="eq"}return s&&(n&&s[o+n]&&(o+=n),d[0]=s[o]),r.renderMsg.apply(null,d)}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getMsgDOM:function(t,i){var n,r,s,a=e(t);if(a.is(":input")?(s=i.target||W(t,w),s&&(s=this.$el.find(s),s.length&&(s.is(":input")?t=s.get(0):n=s)),n||(r=!c(t)&&t.id?t.id:t.name,n=this.$el.find(this.options.msgWrapper+"."+b+'[for="'+r+'"]'))):n=a,!n.length)if(a=this.$el.find(s||t),n=e("<"+this.options.msgWrapper+">").attr({"class":b+(i.cls?" "+i.cls:""),style:i.style||"","for":r}),c(t)){var l=a.parent();n.appendTo(l.is("label")?l.parent():l)}else n[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](a);return n},showMsg:function(t,i,n){if(i=this._getMsgOpt(i),i.msg||i.showOk){t=e(t).get(0),W(t,x,i.type);var r=this._getMsgDOM(t,i),s=r[0].className;-1===s.indexOf(i.cls)&&r.addClass(i.cls),I&&"bottom"===i.pos&&(r[0].style.marginTop=e(t).outerHeight()+"px"),r.html(((n||this.getField(t)).msgMaker||this.options.msgMaker).call(this,i)),r[0].style.display="",E(i.show)&&i.show.call(this,r,i.type)}},hideMsg:function(t,i){t=e(t).get(0),i=this._getMsgOpt(i);var n=this._getMsgDOM(t,i);n.length&&(E(i.hide)?(n[0].style.display="",i.hide.call(this,n,i.type)):n[0].style.display="none")},mapMsg:function(t){var i=this;e.each(t,function(e,t){var n=i.elements[e]||i.$el.find(':input[name="'+e+'"]')[0];i.showMsg(n,t)})},setMsg:function(e){new r(e,this.messages)},setRule:function(t){new n(t,this.rules),e.map(this.fields,function(e){e.old={}})},setField:function(i,n){var r=this,s={};if(N(i)){if(null===n)return e.map(i.split(" "),function(e){e&&r.fields[e]&&(r.fields[e]=null)}),t;n&&(s[i]=n)}else D(i)&&(s=i);r.options.fields?e.extend(r.options.fields,s):r.options.fields=s,r._init()},holdSubmit:function(e){e===t&&(e=!0),this.submiting=e},destroy:function(){this._reset(),this.$el.off("."+f).removeData(f)}},e(function(){e("body").on("focusin",":input["+_+"]",function(){var t=this,i=l(t);i?(W(t,_)&&i._parse(t),e(t).trigger("focusin")):W(t,_,null)}).on("click submit","form",function(t){if(!W(this,"novalidate")){var i,n=e(this);n.data(f)||(i=n[f]().data(f),e.isEmptyObject(i.fields)?(W(this,O,!0),n.removeData(f)):"submit"===t.type&&i._submit(t))}})}),new n({required:function(t){return!!e.trim(t.value)},integer:function(e,t){var i,n="0|",r="[1-9]\\d*",s=t?t[0]:"*";switch(s){case"+":i=r;break;case"-":i="-"+r;break;case"+0":i=n+r;break;case"-0":i=n+"-"+r;break;default:i=n+"-?"+r}return i="^(?:"+i+")$",RegExp(i).test(e.value)||this.messages.integer[s]},match:function(t,i,n){var r,s,a,l,u,o,d,c="eq";if(i&&(1===i.length?a=i[0]:(c=i[0],a=i[1]),u="#"===a.charAt(0)?a:':input[name="'+a+'"]',o=this.$el.find(u)[0]))switch(d=this.getField(o),n.init_match||(this.$el.on("valid.field."+f,u,function(){!n.isValid&&t.value&&e(t).trigger("validate")}),n.init_match=1),l=this.messages.match[c].replace("{1}",d.display||a),r=t.value,s=o.value,c){case"lt":return+s>+r||l;case"lte":return+s>=+r||l;case"gte":return+r>=+s||l;case"gt":return+r>+s||l;default:return r===s||l}},range:function(e,t){return this.getRangeMsg(+e.value,t,"range")},checked:function(t,i){if(!c(t))return!0;var n=this.$el.find('input[name="'+t.name+'"]').filter(function(){return!this.disabled&&this.checked&&e(this).is(":visible")}).length;return i?this.getRangeMsg(n,i,"checked"):!!n||this.messages.required},length:function(e,t){var i=e.value,n=(t[1]?i.replace(V,"xx"):i).length;return t&&"~"===t[0].charAt(0)&&(t[0]="0"+t[0]),this.getRangeMsg(n,t,"length",t[1]?"_2":"")},remote:function(t,i){var n,r=this,s={};return i?(n=j.exec(i[0]),s[t.name]=t.value,i[1]&&e.map(i.slice(1),function(e){s[e]=r.$el.find(':input[name="'+e+'"]').val()}),e.ajax({url:n[2],async:!0,type:n[1]||"POST",data:s,cache:!1})):!0},filter:function(e,t){var i=t?RegExp("["+t[0]+"]","g"):C;return e.value=e.value.replace(i,""),!0}}),e[f]={config:function(t){e.each(t,function(e,t){"rules"===e?new n(t):"messages"===e?new r(t):L[e]=t})},setTheme:function(t,i){D(t)?e.each(t,function(e,t){P[e]=t}):N(t)&&D(i)&&(P[t]=i)}}}(jQuery);
