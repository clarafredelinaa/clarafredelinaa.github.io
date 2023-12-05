//>>built
define("dojo/_base/lang dojo/_base/array dojo/_base/declare esri/views/3d/webgl-engine/lib/Util esri/core/libs/gl-matrix-2/vec3f64 esri/core/libs/gl-matrix-2/mat4f64 esri/core/libs/gl-matrix-2/vec3 esri/core/libs/gl-matrix-2/mat4 esri/geometry/projection esri/geometry/projection/computeTranslationToOriginAndRotation ../../webgl-engine-extensions/VertexBufferLayout ../../webgl-engine-extensions/GLXBO ../../webgl-engine-extensions/GLVertexArrayObject ../../support/fx3dUtils ../../support/fx3dUnits ../Effect ./PointExtrudeMaterial ../../webgl-engine-extensions/constraints".split(" "),
function(C,L,M,N,z,O,A,r,X,P,Q,D,R,h,w,E,S,T){z=z.vec3f64;A=A.vec3;var t=O.mat4f64;r=r.mat4;var x=T.VertexAttrConstants,U=N.setMatrixTranslation3,n=z.create(),F=(t.create(),t.create()),e=t.create(),f=t.create(),k=null,G=t.create();return M([E],{declaredClass:"esri.views.3d.effects.PointExtrude.PointExtrudeEffect",effectName:"PointExtrude",constructor:function(b){this.orderId=2;this._sizeInMeters=[];this.localOriginFactory=E.createLocalOriginFactory();this._renderObjects={};this._needsAllLoaded=!0},
_initRenderingInfo:function(){this.renderingInfo.radius=6E4;this.renderingInfo.height=8E5;this.renderingInfo.topColors=[h.rgbNames.cadetblue,h.rgbNames.yellowgreen,h.rgbNames.lightpink,h.rgbNames.orangered,h.rgbNames.green,h.rgbNames.indianred];this._colorBarDirty=!0;this.renderingInfo.bottomColor=[0,255,0];this.renderingInfo.shapeType="cylinder";this._renderingInfoDirty=!0;this._segments=32;this._shapeDirty=this._vacDirty=!0;this.inherited(arguments)},_doRenderingInfoChange:function(b){this.inherited(arguments);
for(var a in b)b.hasOwnProperty(a)&&this.renderingInfo.hasOwnProperty(a)&&(h.endsWith(a.toLowerCase(),"info")?h.isInforAttrChanged(this.renderingInfo[a],b[a])&&(this._renderingInfoDirty=!0):h.endsWith(a.toLowerCase(),"color")?b[a]instanceof Array&&3==b[a].length&&(this.renderingInfo[a]=[b[a][0]/255,b[a][1]/255,b[a][2]/255]):h.endsWith(a.toLowerCase(),"colors")?b[a]instanceof Array&&(this.renderingInfo[a]=b[a],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"shapetype"===a.toLowerCase()?this.renderingInfo[a]!=
b[a].toLowerCase()&&(this._vacDirty=!0,this._shapeDirty=!0,this._isAddingGeometry=!1,this._renderingInfoDirty=!0,this.renderingInfo[a]=b[a].toLowerCase(),"cuboid"===this.renderingInfo[a]?this._segments=4:"hexahedron"===this.renderingInfo[a]?this._segments=6:"cylinder"===this.renderingInfo[a]&&(this._segments=32)):"radius"===a.toLowerCase()||"height"===a.toLowerCase()||"transparency"===a.toLowerCase()?(this._clampScope(b,a),"radius"==a&&this._radiusUnit?this.renderingInfo[a]=w.toMeters(this._radiusUnit,
b[a],this._view.viewingMode):"height"==a&&this._heightUnit?(this.renderingInfo[a]=w.toMeters(this._heightUnit,b[a],this._view.viewingMode),this._updateDefaultLabelHeight()):this.renderingInfo[a]=b[a]):typeof b[a]==typeof this.renderingInfo[a]&&(this.renderingInfo[a]=b[a]))},_updateDefaultLabelHeight:function(){this._layer._labelDefaultHeight={flag:1,min:this._scopes.height[0],max:this.renderingInfo.height}},initEffect:function(b){this.inherited(arguments);this._effectConfig&&C.isArray(this._effectConfig.renderingInfo)&&
(this._radiusUnit=null,this._heightUnit=null,L.forEach(this._effectConfig.renderingInfo,function(a){"radius"===a.name.toLowerCase()?(this._radiusUnit=a.unit,this.renderingInfo.radius=w.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"height"===a.name.toLowerCase()&&(this._heightUnit=a.unit,this.renderingInfo.height=w.toMeters(this._heightUnit,this.renderingInfo.height,this._view.viewingMode),this._updateDefaultLabelHeight())}.bind(this)))},destroy:function(){this._resetBuffers()},
_resetBuffers:function(){for(var b in this._renderObjects)this._dispose(this._renderObjects[b].vbo),this._dispose(this._renderObjects[b].ibo),this._dispose(this._renderObjects[b].vao);this._renderObjects={}},_initVertexLayout:function(){this._vertexBufferLayout=new Q([x.POSITION,x.AUXPOS1,x.NORMAL,x.AUXPOS2],[3,3,3,3],[5126,5126,5126,5126])},_initRenderContext:function(){if(this.inherited(arguments),this._vacDirty)if(this._initVertexLayout(),this._vacDirty=!1,this._isAddingGeometry)for(var b in this._renderObjects)this._unBindBuffer(this._renderObjects[b].vao,
this._renderObjects[b].vbo,this._renderObjects[b].ibo),this._renderObjects[b].vao&&(this._renderObjects[b].vao._initialized=!1);else this._resetBuffers();return this._geometryVertexNum=2*this._segments,this._geometryIndexNum=3*(2*this._segments+(this._segments-2)),this._localBindsCallback||(this._localBindsCallback=this._localBinds.bind(this)),this._buildPolyHedronGeometries()},_buildPolyHedronGeometries:function(){var b=this._isAddingGeometry?this._addedGraphics:this._allGraphics(),a=this._isAddingGeometry?
this._toAddGraphicsIndex:0;if(0<b.length){console.log("_buildPolyHedronGeometries \x3d\x3d\x3e graphics.length \x3d\x3d\x3e "+b.length);var l,u,c,m,V=(this._vertexBufferLayout.getStride(),2*Math.PI),W=1/this._segments;for(u=0;u<b.length;u++)if(l=b[u].geometry,null!=l){A.set(n,l.longitude,l.latitude,l.altitude||1);var d=t.create();P.computeTranslationToOriginAndRotation(this._wgs84SpatialReference,n,d,this._view.renderSpatialReference);"global"===this._view.viewingMode?h.wgs84ToSphericalEngineCoords(n,
0,n,0):"local"===this._view.viewingMode&&h.wgs84ToWebMerc(n,0,n,0);var g=this.localOriginFactory.getOrigin(n);this._renderObjects[g.id]||(this._renderObjects[g.id]={vbo:new D(this._gl,!0,this._vertexBufferLayout),ibo:new D(this._gl,!1),vao:this._vaoExt?new R(this._gl,this._vaoExt):null,offset:0,origin:g.vec3});g=this._renderObjects[g.id];U(F,-g.origin[0],-g.origin[1],-g.origin[2]);r.multiply(e,F,d);r.invert(f,e);r.transpose(f,f);var p=m=0;var q=1;var H=f[0]*m+f[4]*p+f[8]*q+f[12];var I=f[1]*m+f[5]*
p+f[9]*q+f[13];var J=f[2]*m+f[6]*p+f[10]*q+f[14];var B=[],y=[];d=g.offset;for(c=0;c<this._segments;c++){var v=V*c*W;m=Math.cos(v);p=Math.sin(v);q=0;v=e[0]*m+e[4]*p+e[8]*q;var K=e[1]*m+e[5]*p+e[9]*q;m=e[2]*m+e[6]*p+e[10]*q;B.push(v,K,m,e[12],e[13],e[14],H,I,J,u+a,c,0);B.push(v,K,m,e[12],e[13],e[14],H,I,J,u+a,c,1);c!==this._segments-1?y.push(2*c+d,2*c+2+d,2*c+3+d,2*c+d,2*c+3+d,2*c+1+d):y.push(2*c+d,0+d,1+d,2*c+d,1+d,2*c+1+d)}for(c=0;c<this._segments-2;c++)y.push(1+d,2*c+3+d,2*c+5+d);g.vbo.addData(!0,
new Float32Array(B));g.offset+=this._geometryVertexNum;g.ibo.addData(!0,new Uint32Array(y));g.vao&&(g.vao._initialized=!1)}return this._resetAddGeometries(),!0}return!1},_loadShaders:function(){return this._material||(this._material=new S({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||
(this._colorBarTexture=this._gl.createTexture());var b=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture);this._gl.pixelStorei(37440,!0);this._gl.texParameteri(3553,10240,9728);this._gl.texParameteri(3553,10241,9728);this._gl.texParameteri(3553,10242,33071);this._gl.texParameteri(3553,10243,33071);var a=h.createColorBarTexture(32,1,this.renderingInfo.topColors);return this._gl.texImage2D(3553,0,6408,6408,5121,a),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,b),
0===this._gl.getError()},_localBinds:function(b,a){b.bind(this._material._program);this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program);a.bind()},_bindBuffer:function(b,a,l){b?(b._initialized||b.initialize(this._localBindsCallback,[a,l]),b.bind()):this._localBinds(a,l)},_unBindBuffer:function(b,a,l){b?b.unbind():(a.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program),l.unbind())},render:function(b,a){this.inherited(arguments);
this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0);this._sizeInMeters[0]=this.renderingInfo.radius;this._sizeInMeters[1]=this._scopes.height[0];this._sizeInMeters[2]=this.renderingInfo.height;this._material.bind(C.mixin({},{me:this._vizFieldVerTextures[this._vizFieldDefault],op:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],pe:this._vizFieldVerTextureSize,sp:this.renderingInfo.animationInterval,se:this._sizeInMeters,ol:this.renderingInfo.transparency,ss:this.renderingInfo.bottomColor,
es:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,pi:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,li:1/this._segments,os:this._colorBarTexture},
b),a);for(var l in this._renderObjects)k=this._renderObjects[l],r.translate(G,b.view,k.origin),this._material.bindMat4("viewMat",G),this._material.bindVec3fv("origin",k.origin),this._material.bindVec3f("camPos",b.viewInvTransp[3]-k.origin[0],b.viewInvTransp[7]-k.origin[1],b.viewInvTransp[11]-k.origin[2]),this._bindBuffer(k.vao,k.vbo,k.ibo),this._gl.drawElements(4,k.ibo.getNum(),5125,0);this._material.release(a);this._unBindBuffer(k.vao,k.vbo,k.ibo)}})});