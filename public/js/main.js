!function e(n,t,r){function o(s,u){if(!t[s]){if(!n[s]){var a="function"==typeof require&&require;if(!u&&a)return a(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var l=t[s]={exports:{}};n[s][0].call(l.exports,function(e){var t=n[s][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,n,t){(function(n,r,o){function o(e,n,t){if(!(this instanceof o))return new o(e,n,t);var r=typeof e;if("base64"===n&&"string"===r)for(e=j(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=T(e);else if("string"===r)i=o.byteLength(e,n);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=T(e.length)}var s;o._useTypedArrays?s=C(new Uint8Array(i)):(s=this,s.length=i,s._isBuffer=!0);var u;if(o._useTypedArrays&&"function"==typeof Uint8Array&&e instanceof Uint8Array)s._set(e);else if(D(e))for(u=0;i>u;u++)s[u]=o.isBuffer(e)?e.readUInt8(u):e[u];else if("string"===r)s.write(e,0,n);else if("number"===r&&!o._useTypedArrays&&!t)for(u=0;i>u;u++)s[u]=0;return s}function i(e,n,t,r){t=Number(t)||0;var i=e.length-t;r?(r=Number(r),r>i&&(r=i)):r=i;var s=n.length;Y(s%2===0,"Invalid hex string"),r>s/2&&(r=s/2);for(var u=0;r>u;u++){var a=parseInt(n.substr(2*u,2),16);Y(!isNaN(a),"Invalid hex string"),e[t+u]=a}return o._charsWritten=2*u,u}function s(e,n,t,r){var i=o._charsWritten=W(N(n),e,t,r);return i}function u(e,n,t,r){var i=o._charsWritten=W(F(n),e,t,r);return i}function a(e,n,t,r){return u(e,n,t,r)}function l(e,n,t,r){var i=o._charsWritten=W(O(n),e,t,r);return i}function f(e,n,t,r){var i=o._charsWritten=W(P(n),e,t,r);return i}function d(e,n,t){return z.fromByteArray(0===n&&t===e.length?e:e.slice(n,t))}function c(e,n,t){var r="",o="";t=Math.min(e.length,t);for(var i=n;t>i;i++)e[i]<=127?(r+=q(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+q(o)}function h(e,n,t){var r="";t=Math.min(e.length,t);for(var o=n;t>o;o++)r+=String.fromCharCode(e[o]);return r}function g(e,n,t){return h(e,n,t)}function p(e,n,t){var r=e.length;(!n||0>n)&&(n=0),(!t||0>t||t>r)&&(t=r);for(var o="",i=n;t>i;i++)o+=x(e[i]);return o}function m(e,n,t){for(var r=e.slice(n,t),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function b(e,n,t,r){r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(void 0!==n&&null!==n,"missing offset"),Y(n+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(n>=o)){var i;return t?(i=e[n],o>n+1&&(i|=e[n+1]<<8)):(i=e[n]<<8,o>n+1&&(i|=e[n+1])),i}}function w(e,n,t,r){r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(void 0!==n&&null!==n,"missing offset"),Y(n+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(n>=o)){var i;return t?(o>n+2&&(i=e[n+2]<<16),o>n+1&&(i|=e[n+1]<<8),i|=e[n],o>n+3&&(i+=e[n+3]<<24>>>0)):(o>n+1&&(i=e[n+1]<<16),o>n+2&&(i|=e[n+2]<<8),o>n+3&&(i|=e[n+3]),i+=e[n]<<24>>>0),i}}function y(e,n,t,r){r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(void 0!==n&&null!==n,"missing offset"),Y(n+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(n>=o)){var i=b(e,n,t,!0),s=32768&i;return s?-1*(65535-i+1):i}}function v(e,n,t,r){r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(void 0!==n&&null!==n,"missing offset"),Y(n+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(n>=o)){var i=w(e,n,t,!0),s=2147483648&i;return s?-1*(4294967295-i+1):i}}function E(e,n,t,r){return r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(n+3<e.length,"Trying to read beyond buffer length")),G.read(e,n,t,23,4)}function _(e,n,t,r){return r||(Y("boolean"==typeof t,"missing or invalid endian"),Y(n+7<e.length,"Trying to read beyond buffer length")),G.read(e,n,t,52,8)}function I(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+1<e.length,"trying to write beyond buffer length"),J(n,65535));var i=e.length;if(!(t>=i))for(var s=0,u=Math.min(i-t,2);u>s;s++)e[t+s]=(n&255<<8*(r?s:1-s))>>>8*(r?s:1-s)}function B(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+3<e.length,"trying to write beyond buffer length"),J(n,4294967295));var i=e.length;if(!(t>=i))for(var s=0,u=Math.min(i-t,4);u>s;s++)e[t+s]=n>>>8*(r?s:3-s)&255}function A(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+1<e.length,"Trying to write beyond buffer length"),R(n,32767,-32768));var i=e.length;t>=i||(n>=0?I(e,n,t,r,o):I(e,65535+n+1,t,r,o))}function L(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+3<e.length,"Trying to write beyond buffer length"),R(n,2147483647,-2147483648));var i=e.length;t>=i||(n>=0?B(e,n,t,r,o):B(e,4294967295+n+1,t,r,o))}function U(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+3<e.length,"Trying to write beyond buffer length"),X(n,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;t>=i||G.write(e,n,t,r,23,4)}function k(e,n,t,r,o){o||(Y(void 0!==n&&null!==n,"missing value"),Y("boolean"==typeof r,"missing or invalid endian"),Y(void 0!==t&&null!==t,"missing offset"),Y(t+7<e.length,"Trying to write beyond buffer length"),X(n,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;t>=i||G.write(e,n,t,r,52,8)}function j(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function C(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=H.get,e.set=H.set,e.write=H.write,e.toString=H.toString,e.toLocaleString=H.toString,e.toJSON=H.toJSON,e.copy=H.copy,e.slice=H.slice,e.readUInt8=H.readUInt8,e.readUInt16LE=H.readUInt16LE,e.readUInt16BE=H.readUInt16BE,e.readUInt32LE=H.readUInt32LE,e.readUInt32BE=H.readUInt32BE,e.readInt8=H.readInt8,e.readInt16LE=H.readInt16LE,e.readInt16BE=H.readInt16BE,e.readInt32LE=H.readInt32LE,e.readInt32BE=H.readInt32BE,e.readFloatLE=H.readFloatLE,e.readFloatBE=H.readFloatBE,e.readDoubleLE=H.readDoubleLE,e.readDoubleBE=H.readDoubleBE,e.writeUInt8=H.writeUInt8,e.writeUInt16LE=H.writeUInt16LE,e.writeUInt16BE=H.writeUInt16BE,e.writeUInt32LE=H.writeUInt32LE,e.writeUInt32BE=H.writeUInt32BE,e.writeInt8=H.writeInt8,e.writeInt16LE=H.writeInt16LE,e.writeInt16BE=H.writeInt16BE,e.writeInt32LE=H.writeInt32LE,e.writeInt32BE=H.writeInt32BE,e.writeFloatLE=H.writeFloatLE,e.writeFloatBE=H.writeFloatBE,e.writeDoubleLE=H.writeDoubleLE,e.writeDoubleBE=H.writeDoubleBE,e.fill=H.fill,e.inspect=H.inspect,e.toArrayBuffer=H.toArrayBuffer,e}function S(e,n,t){return"number"!=typeof e?t:(e=~~e,e>=n?n:e>=0?e:(e+=n,e>=0?e:0))}function T(e){return e=~~Math.ceil(+e),0>e?0:e}function M(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function D(e){return M(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function x(e){return 16>e?"0"+e.toString(16):e.toString(16)}function N(e){for(var n=[],t=0;t<e.length;t++){var r=e.charCodeAt(t);if(127>=r)n.push(e.charCodeAt(t));else{var o=t;r>=55296&&57343>=r&&t++;for(var i=encodeURIComponent(e.slice(o,t+1)).substr(1).split("%"),s=0;s<i.length;s++)n.push(parseInt(i[s],16))}}return n}function F(e){for(var n=[],t=0;t<e.length;t++)n.push(255&e.charCodeAt(t));return n}function P(e){for(var n,t,r,o=[],i=0;i<e.length;i++)n=e.charCodeAt(i),t=n>>8,r=n%256,o.push(r),o.push(t);return o}function O(e){return z.toByteArray(e)}function W(e,n,t,r){for(var o=0;r>o&&!(o+t>=n.length||o>=e.length);o++)n[o+t]=e[o];return o}function q(e){try{return decodeURIComponent(e)}catch(n){return String.fromCharCode(65533)}}function J(e,n){Y("number"==typeof e,"cannot write a non-number as a number"),Y(e>=0,"specified a negative value for writing an unsigned value"),Y(n>=e,"value is larger than maximum value for type"),Y(Math.floor(e)===e,"value has a fractional component")}function R(e,n,t){Y("number"==typeof e,"cannot write a non-number as a number"),Y(n>=e,"value larger than maximum allowed value"),Y(e>=t,"value smaller than minimum allowed value"),Y(Math.floor(e)===e,"value has a fractional component")}function X(e,n,t){Y("number"==typeof e,"cannot write a non-number as a number"),Y(n>=e,"value larger than maximum allowed value"),Y(e>=t,"value smaller than minimum allowed value")}function Y(e,n){if(!e)throw new Error(n||"Failed assertion")}var z=e("base64-js"),G=e("ieee754");t.Buffer=o,t.SlowBuffer=o,t.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){if("undefined"==typeof Uint8Array||"undefined"==typeof ArrayBuffer)return!1;try{var e=new Uint8Array(0);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,n){var t;switch(e+="",n||"utf8"){case"hex":t=e.length/2;break;case"utf8":case"utf-8":t=N(e).length;break;case"ascii":case"binary":case"raw":t=e.length;break;case"base64":t=O(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":t=2*e.length;break;default:throw new Error("Unknown encoding")}return t},o.concat=function(e,n){if(Y(M(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var t;if("number"!=typeof n)for(n=0,t=0;t<e.length;t++)n+=e[t].length;var r=new o(n),i=0;for(t=0;t<e.length;t++){var s=e[t];s.copy(r,i),i+=s.length}return r},o.prototype.write=function(e,n,t,r){if(isFinite(n))isFinite(t)||(r=t,t=void 0);else{var o=r;r=n,n=t,t=o}n=Number(n)||0;var d=this.length-n;t?(t=Number(t),t>d&&(t=d)):t=d,r=String(r||"utf8").toLowerCase();var c;switch(r){case"hex":c=i(this,e,n,t);break;case"utf8":case"utf-8":c=s(this,e,n,t);break;case"ascii":c=u(this,e,n,t);break;case"binary":c=a(this,e,n,t);break;case"base64":c=l(this,e,n,t);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":c=f(this,e,n,t);break;default:throw new Error("Unknown encoding")}return c},o.prototype.toString=function(e,n,t){var r=this;if(e=String(e||"utf8").toLowerCase(),n=Number(n)||0,t=void 0!==t?Number(t):t=r.length,t===n)return"";var o;switch(e){case"hex":o=p(r,n,t);break;case"utf8":case"utf-8":o=c(r,n,t);break;case"ascii":o=h(r,n,t);break;case"binary":o=g(r,n,t);break;case"base64":o=d(r,n,t);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=m(r,n,t);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,n,t,r){var o=this;if(t||(t=0),r||0===r||(r=this.length),n||(n=0),r!==t&&0!==e.length&&0!==o.length){Y(r>=t,"sourceEnd < sourceStart"),Y(n>=0&&n<e.length,"targetStart out of bounds"),Y(t>=0&&t<o.length,"sourceStart out of bounds"),Y(r>=0&&r<=o.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-n<r-t&&(r=e.length-n+t);for(var i=0;r-t>i;i++)e[i+n]=this[i+t]}},o.prototype.slice=function(e,n){var t=this.length;if(e=S(e,t,0),n=S(n,t,t),o._useTypedArrays)return C(this.subarray(e,n));for(var r=n-e,i=new o(r,void 0,!0),s=0;r>s;s++)i[s]=this[s+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,n){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,n)},o.prototype.readUInt8=function(e,n){return n||(Y(void 0!==e&&null!==e,"missing offset"),Y(e<this.length,"Trying to read beyond buffer length")),e>=this.length?void 0:this[e]},o.prototype.readUInt16LE=function(e,n){return b(this,e,!0,n)},o.prototype.readUInt16BE=function(e,n){return b(this,e,!1,n)},o.prototype.readUInt32LE=function(e,n){return w(this,e,!0,n)},o.prototype.readUInt32BE=function(e,n){return w(this,e,!1,n)},o.prototype.readInt8=function(e,n){if(n||(Y(void 0!==e&&null!==e,"missing offset"),Y(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var t=128&this[e];return t?-1*(255-this[e]+1):this[e]}},o.prototype.readInt16LE=function(e,n){return y(this,e,!0,n)},o.prototype.readInt16BE=function(e,n){return y(this,e,!1,n)},o.prototype.readInt32LE=function(e,n){return v(this,e,!0,n)},o.prototype.readInt32BE=function(e,n){return v(this,e,!1,n)},o.prototype.readFloatLE=function(e,n){return E(this,e,!0,n)},o.prototype.readFloatBE=function(e,n){return E(this,e,!1,n)},o.prototype.readDoubleLE=function(e,n){return _(this,e,!0,n)},o.prototype.readDoubleBE=function(e,n){return _(this,e,!1,n)},o.prototype.writeUInt8=function(e,n,t){t||(Y(void 0!==e&&null!==e,"missing value"),Y(void 0!==n&&null!==n,"missing offset"),Y(n<this.length,"trying to write beyond buffer length"),J(e,255)),n>=this.length||(this[n]=e)},o.prototype.writeUInt16LE=function(e,n,t){I(this,e,n,!0,t)},o.prototype.writeUInt16BE=function(e,n,t){I(this,e,n,!1,t)},o.prototype.writeUInt32LE=function(e,n,t){B(this,e,n,!0,t)},o.prototype.writeUInt32BE=function(e,n,t){B(this,e,n,!1,t)},o.prototype.writeInt8=function(e,n,t){t||(Y(void 0!==e&&null!==e,"missing value"),Y(void 0!==n&&null!==n,"missing offset"),Y(n<this.length,"Trying to write beyond buffer length"),R(e,127,-128)),n>=this.length||(e>=0?this.writeUInt8(e,n,t):this.writeUInt8(255+e+1,n,t))},o.prototype.writeInt16LE=function(e,n,t){A(this,e,n,!0,t)},o.prototype.writeInt16BE=function(e,n,t){A(this,e,n,!1,t)},o.prototype.writeInt32LE=function(e,n,t){L(this,e,n,!0,t)},o.prototype.writeInt32BE=function(e,n,t){L(this,e,n,!1,t)},o.prototype.writeFloatLE=function(e,n,t){U(this,e,n,!0,t)},o.prototype.writeFloatBE=function(e,n,t){U(this,e,n,!1,t)},o.prototype.writeDoubleLE=function(e,n,t){k(this,e,n,!0,t)},o.prototype.writeDoubleBE=function(e,n,t){k(this,e,n,!1,t)},o.prototype.fill=function(e,n,t){if(e||(e=0),n||(n=0),t||(t=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),Y("number"==typeof e&&!isNaN(e),"value is not a number"),Y(t>=n,"end < start"),t!==n&&0!==this.length){Y(n>=0&&n<this.length,"start out of bounds"),Y(t>=0&&t<=this.length,"end out of bounds");for(var r=n;t>r;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],n=this.length,r=0;n>r;r++)if(e[r]=x(this[r]),r===t.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("function"==typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),n=0,t=e.length;t>n;n+=1)e[n]=this[n];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var H=o.prototype}).call(this,e("/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")},{"/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,"base64-js":2,buffer:1,ieee754:3}],2:[function(e,n){(function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(){"use strict";function t(e){var n=e.charCodeAt(0);return n===s?62:n===u?63:a>n?-1:a+10>n?n-a+26+26:f+26>n?n-f:l+26>n?n-l+26:void 0}function r(e){function n(e){l[d++]=e}var r,o,s,u,a,l;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=e.length;a="="===e.charAt(f-2)?2:"="===e.charAt(f-1)?1:0,l=new i(3*e.length/4-a),s=a>0?e.length-4:e.length;var d=0;for(r=0,o=0;s>r;r+=4,o+=3)u=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&u)>>16),n((65280&u)>>8),n(255&u);return 2===a?(u=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&u)):1===a&&(u=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(u>>8&255),n(255&u)),l}function o(n){function t(n){return e.charAt(n)}function r(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var o,i,s,u=n.length%3,a="";for(o=0,s=n.length-u;s>o;o+=3)i=(n[o]<<16)+(n[o+1]<<8)+n[o+2],a+=r(i);switch(u){case 1:i=n[n.length-1],a+=t(i>>2),a+=t(i<<4&63),a+="==";break;case 2:i=(n[n.length-2]<<8)+n[n.length-1],a+=t(i>>10),a+=t(i>>4&63),a+=t(i<<2&63),a+="="}return a}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,s=("0".charCodeAt(0),"+".charCodeAt(0)),u="/".charCodeAt(0),a="0".charCodeAt(0),l="a".charCodeAt(0),f="A".charCodeAt(0);n.exports.toByteArray=r,n.exports.fromByteArray=o}()}).call(this,e("/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")},{"/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,buffer:1}],3:[function(e,n,t){(function(){t.read=function(e,n,t,r,o){var i,s,u=8*o-r-1,a=(1<<u)-1,l=a>>1,f=-7,d=t?o-1:0,c=t?-1:1,h=e[n+d];for(d+=c,i=h&(1<<-f)-1,h>>=-f,f+=u;f>0;i=256*i+e[n+d],d+=c,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+e[n+d],d+=c,f-=8);if(0===i)i=1-l;else{if(i===a)return s?0/0:1/0*(h?-1:1);s+=Math.pow(2,r),i-=l}return(h?-1:1)*s*Math.pow(2,i-r)},t.write=function(e,n,t,r,o,i){var s,u,a,l=8*i-o-1,f=(1<<l)-1,d=f>>1,c=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,g=r?1:-1,p=0>n||0===n&&0>1/n?1:0;for(n=Math.abs(n),isNaN(n)||1/0===n?(u=isNaN(n)?1:0,s=f):(s=Math.floor(Math.log(n)/Math.LN2),n*(a=Math.pow(2,-s))<1&&(s--,a*=2),n+=s+d>=1?c/a:c*Math.pow(2,1-d),n*a>=2&&(s++,a/=2),s+d>=f?(u=0,s=f):s+d>=1?(u=(n*a-1)*Math.pow(2,o),s+=d):(u=n*Math.pow(2,d-1)*Math.pow(2,o),s=0));o>=8;e[t+h]=255&u,h+=g,u/=256,o-=8);for(s=s<<o|u,l+=o;l>0;e[t+h]=255&s,h+=g,s/=256,l-=8);e[t+h-g]|=128*p}}).call(this,e("/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")},{"/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,buffer:1}],4:[function(e,n){(function(e){var e=n.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(n){var t=[];return window.addEventListener("message",function(e){var n=e.source;if((n===window||null===n)&&"process-tick"===e.data&&(e.stopPropagation(),t.length>0)){var r=t.shift();r()}},!0),function(e){t.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.binding=function(){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(){throw new Error("process.chdir is not supported")}}).call(this,e("/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process")},{"/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,buffer:1}],5:[function(e){(function(){!function(e,n){"use strict";var t="klip.im"===e.location.hostname,r="?development"===e.location.search,o=t&&!r;o&&(e.console=console||{},console.assert=console.clear=console.constructor=console.count=console.debug=console.dir=console.dirxml=console.error=console.group=console.groupCollapsed=console.groupEnd=console.info=console.log=console.markTimeline=console.profile=console.profileEnd=console.table=console.time=console.timeEnd=console.timeStamp=console.timeline=console.timelineEnd=console.trace=console.warn=function(){return!1});var i=function(){return{init:function(){console.log("Loaded src/js/scripts.js")}}}();n.addEventListener("DOMContentLoaded",function(){i.init()})}(window,document)}).call(this,e("/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_c74a18c5.js","/")},{"/home/fernando/Documentos/Projects/00-opensource/klip.im/klip.im/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,buffer:1}]},{},[5]);