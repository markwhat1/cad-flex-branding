(function(t){var e
e=function(){var e,i,a
function s(t){var e,i,a,s,r,n,h,o,d,c,p,l,f,u
for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},n=null;;){switch(e=this.readUInt32(),d=function(){var t,e
for(e=[],t=0;t<4;++t)e.push(String.fromCharCode(this.data[this.pos++]))
return e}.call(this).join(""),d){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++]
break
case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]}
break
case"PLTE":this.palette=this.read(e)
break
case"fcTL":n&&this.animation.frames.push(n),this.pos+=4,n={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},r=this.readUInt16(),s=this.readUInt16()||100,n.delay=1e3*r/s,n.disposeOp=this.data[this.pos++],n.blendOp=this.data[this.pos++],n.data=[]
break
case"IDAT":case"fdAT":for("fdAT"===d&&(this.pos+=4,e-=4),t=(null!=n?n.data:void 0)||this.imgData,l=0;0<=e?l<e:l>e;0<=e?++l:--l)t.push(this.data[this.pos++])
break
case"tRNS":switch(this.transparency={},this.colorType){case 3:if(a=this.palette.length/3,this.transparency.indexed=this.read(e),this.transparency.indexed.length>a)throw new Error("More transparent colors than palette size")
if((c=a-this.transparency.indexed.length)>0)for(f=0;0<=c?f<c:f>c;0<=c?++f:--f)this.transparency.indexed.push(255)
break
case 0:this.transparency.grayscale=this.read(e)[0]
break
case 2:this.transparency.rgb=this.read(e)}break
case"tEXt":h=(p=this.read(e)).indexOf(0),o=String.fromCharCode.apply(String,p.slice(0,h)),this.text[o]=String.fromCharCode.apply(String,p.slice(h+1))
break
case"IEND":return n&&this.animation.frames.push(n),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1
case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(u=this.colorType)||6===u,i=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*i,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray"
case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new Uint8Array(this.imgData))
default:this.pos+=e}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}s.load=function(t,e,i){var a
return"function"==typeof e&&(i=e),(a=new XMLHttpRequest).open("GET",t,!0),a.responseType="arraybuffer",a.onload=function(){var t
return t=new s(new Uint8Array(a.response||a.mozResponseArrayBuffer)),"function"==typeof(null!=e?e.getContext:void 0)&&t.render(e),"function"==typeof i?i(t):void 0},a.send(null)},s.prototype.read=function(t){var e,i
for(i=[],e=0;0<=t?e<t:e>t;0<=t?++e:--e)i.push(this.data[this.pos++])
return i},s.prototype.readUInt32=function(){return this.data[this.pos++]<<24|this.data[this.pos++]<<16|this.data[this.pos++]<<8|this.data[this.pos++]},s.prototype.readUInt16=function(){return this.data[this.pos++]<<8|this.data[this.pos++]},s.prototype.decodePixels=function(t){var e=this.pixelBitlength/8,i=new Uint8Array(this.width*this.height*e),a=0,s=this
if(null==t&&(t=this.imgData),0===t.length)return new Uint8Array(0)
function r(r,n,h,o){var d,c,p,l,f,u,g,m,y,w,v,I,b,x,D,U,T,A,O,k,P,C=Math.ceil((s.width-r)/h),M=Math.ceil((s.height-n)/o),R=s.width==C&&s.height==M
for(x=e*C,I=R?i:new Uint8Array(x*M),u=t.length,b=0,c=0;b<M&&a<u;){switch(t[a++]){case 0:for(l=T=0;T<x;l=T+=1)I[c++]=t[a++]
break
case 1:for(l=A=0;A<x;l=A+=1)d=t[a++],f=l<e?0:I[c-e],I[c++]=(d+f)%256
break
case 2:for(l=O=0;O<x;l=O+=1)d=t[a++],p=(l-l%e)/e,D=b&&I[(b-1)*x+p*e+l%e],I[c++]=(D+d)%256
break
case 3:for(l=k=0;k<x;l=k+=1)d=t[a++],p=(l-l%e)/e,f=l<e?0:I[c-e],D=b&&I[(b-1)*x+p*e+l%e],I[c++]=(d+Math.floor((f+D)/2))%256
break
case 4:for(l=P=0;P<x;l=P+=1)d=t[a++],p=(l-l%e)/e,f=l<e?0:I[c-e],0===b?D=U=0:(D=I[(b-1)*x+p*e+l%e],U=p&&I[(b-1)*x+(p-1)*e+l%e]),g=f+D-U,m=Math.abs(g-f),w=Math.abs(g-D),v=Math.abs(g-U),y=m<=w&&m<=v?f:w<=v?D:U,I[c++]=(d+y)%256
break
default:throw new Error("Invalid filter algorithm: "+t[a-1])}if(!R){var F=((n+b*o)*s.width+r)*e,E=b*x
for(l=0;l<C;l+=1){for(var S=0;S<e;S+=1)i[F++]=I[E++]
F+=(h-1)*e}}b++}}return t=(t=new FlateStream(t)).getBytes(),1==s.interlaceMethod?(r(0,0,8,8),r(4,0,8,8),r(0,4,4,8),r(2,0,4,4),r(0,2,2,4),r(1,0,2,2),r(0,1,1,2)):r(0,0,1,1),i},s.prototype.decodePalette=function(){var t,e,i,a,s,r,n,h,o
for(i=this.palette,r=this.transparency.indexed||[],s=new Uint8Array((r.length||0)+i.length),a=0,i.length,t=0,e=n=0,h=i.length;n<h;e=n+=3)s[a++]=i[e],s[a++]=i[e+1],s[a++]=i[e+2],s[a++]=null!=(o=r[t++])?o:255
return s},s.prototype.copyToImageData=function(t,e){var i,a,s,r,n,h,o,d,c,p,l
if(a=this.colors,c=null,i=this.hasAlphaChannel,this.palette.length&&(c=null!=(l=this._decodedPalette)?l:this._decodedPalette=this.decodePalette(),a=4,i=!0),d=(s=t.data||t).length,n=c||e,r=h=0,1===a)for(;r<d;)o=c?4*e[r/4]:h,p=n[o++],s[r++]=p,s[r++]=p,s[r++]=p,s[r++]=i?n[o++]:255,h=o
else for(;r<d;)o=c?4*e[r/4]:h,s[r++]=n[o++],s[r++]=n[o++],s[r++]=n[o++],s[r++]=i?n[o++]:255,h=o},s.prototype.decode=function(){var t
return t=new Uint8Array(this.width*this.height*4),this.copyToImageData(t,this.decodePixels()),t}
try{i=t.document.createElement("canvas"),a=i.getContext("2d")}catch(r){return-1}return e=function(t){var e
return a.width=t.width,a.height=t.height,a.clearRect(0,0,t.width,t.height),a.putImageData(t,0,0),(e=new Image).src=i.toDataURL(),e},s.prototype.decodeFrames=function(t){var i,a,s,r,n,h,o,d
if(this.animation){for(d=[],a=n=0,h=(o=this.animation.frames).length;n<h;a=++n)i=o[a],s=t.createImageData(i.width,i.height),r=this.decodePixels(new Uint8Array(i.data)),this.copyToImageData(s,r),i.imageData=s,d.push(i.image=e(s))
return d}},s.prototype.renderFrame=function(t,e){var i,a,s
return i=(a=this.animation.frames)[e],s=a[e-1],0===e&&t.clearRect(0,0,this.width,this.height),1===(null!=s?s.disposeOp:void 0)?t.clearRect(s.xOffset,s.yOffset,s.width,s.height):2===(null!=s?s.disposeOp:void 0)&&t.putImageData(s.imageData,s.xOffset,s.yOffset),0===i.blendOp&&t.clearRect(i.xOffset,i.yOffset,i.width,i.height),t.drawImage(i.image,i.xOffset,i.yOffset)},s.prototype.animate=function(t){var e,i,a,s,r,n,h=this
return i=0,n=this.animation,s=n.numFrames,a=n.frames,r=n.numPlays,(e=function(){var n,o
if(n=i++%s,o=a[n],h.renderFrame(t,n),s>1&&i/s<r)return h.animation._timeout=setTimeout(e,o.delay)})()},s.prototype.stopAnimation=function(){var t
return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)},s.prototype.render=function(t){var e,i
return t._png&&t._png.stopAnimation(),t._png=this,t.width=this.width,t.height=this.height,e=t.getContext("2d"),this.animation?(this.decodeFrames(e),this.animate(e)):(i=e.createImageData(this.width,this.height),this.copyToImageData(i,this.decodePixels()),e.putImageData(i,0,0))},s}(),t.PNG=e})("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")())
