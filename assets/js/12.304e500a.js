(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{14:function(t,e,i){},35:function(t,e,i){t.exports=i.p+"assets/img/handler.d2843e4e.svg"},36:function(t,e,i){"use strict";var n=i(14);i.n(n).a},52:function(t,e,i){"use strict";i.r(e);var n=i(11),s={name:"CircleStencil",components:{PreviewResult:n.e,DraggableArea:n.c,DraggableElement:n.d},props:{img:{type:Object},resultCoordinates:{type:Object},stencilCoordinates:{type:Object}},computed:{style:function(){var t=this.stencilCoordinates,e=t.height,i=t.width,n=t.left,s=t.top;return{width:"".concat(i,"px"),height:"".concat(e,"px"),left:"".concat(n,"px"),top:"".concat(s,"px")}}},methods:{onMove:function(t){this.$emit("move",t)},onHandlerMove:function(t){var e=t.shift(),i=e.left/2,s=-e.top/2,o=this.resultCoordinates,a=(o.height,o.width);o.left,o.top,this.stencilCoordinates.width;this.$emit("resize",new n.f(t.nativeEvent,{left:i,right:i,top:s,bottom:s}))},aspectRatios:function(){return{minimum:1,maximum:1}}}},o=(i(36),i(1)),a=Object(o.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"circle-stencil",style:t.style},[n("DraggableElement",{attrs:{classname:"circle-stencil__handler"},on:{drag:t.onHandlerMove}},[n("img",{staticClass:"circle-stencil__icon",attrs:{src:i(35),alt:""}})]),t._v(" "),n("DraggableArea",{on:{move:t.onMove}},[n("PreviewResult",{attrs:{classname:"circle-stencil__preview",img:t.img,width:t.stencilCoordinates.width,height:t.stencilCoordinates.height,resultCoordinates:t.resultCoordinates,stencilCoordinates:t.stencilCoordinates}})],1)],1)},[],!1,null,null,null);e.default=a.exports}}]);