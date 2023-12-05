//>>built
require({cache:{"url:fx3d/views/3d/effects/CommonShaders.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\x3c!-- Copyright @ 2023 Esri. All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions. --\x3e\x3csnippets\x3e\x3csnippet name\x3d"backEaseIn"\x3e\x3c![CDATA[float getBackEaseInValue(float a,float b,float c,float d){float e\x3dc-b;float f\x3d1.70158;float g\x3da/d;return e*(g*g)*((f+1.0)*g-f)+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"bounceEaseOut"\x3e\x3c![CDATA[float getBounceEaseOutValue(float a,float b,float c,float d){float e\x3dc-b;if((a/\x3dd)\x3c(1.0/2.75)) return e*(7.5625*a*a)+b;else if(a\x3c(2.0/2.75)) return e*(7.5625*(a-\x3d(1.5/2.75))*a+0.75)+b;else if(a\x3c(2.5/2.75)) return e*(7.5625*(a-\x3d(2.25/2.75))*a+0.9375)+b;else return e*(7.5625*(a-\x3d(2.625/2.75))*a+0.984375)+b;}float getBounceEaseInValue(float a,float b,float c,float d){return c-getBounceEaseOutValue(d-a,0.0,c,d)+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"circEaseOut"\x3e\x3c![CDATA[float getCircEaseOutValue(float a,float b,float c,float d){float e\x3dc-b;float f\x3da/d-1.0;return e*sqrt(1.0-f*f)+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"convertHSLtoRGB"\x3e\x3c![CDATA[vec4 a(vec4 b){const float c\x3d1.0/3.0;const float d\x3d2.0/3.0;const float e\x3d6.0;float f\x3db.x;float g\x3db.y;float h\x3db.z;vec3 i\x3dvec3(e*(f-d),0.0,e*(1.0-f));if(f\x3cd){i.r\x3d0.0;i.g\x3de*(d-f);i.b\x3de*(f-c);}if(f\x3cc){i.r\x3de*(c-f);i.g\x3de*f;i.b\x3d0.0;}i\x3dmin(i,1.0);float j\x3d2.0*g;float k\x3d1.0-g;float l\x3d1.0-h;float m\x3d(2.0*h)-1.0;vec3 n\x3d(j*i)+k;vec3 o;if(h\x3e\x3d0.5) o\x3d(l*n)+m;else o\x3dh*n;return vec4(o,b.a);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"cubicEaseOut"\x3e\x3c![CDATA[float getCubicEaseInOutValue(float a,float b,float c,float d){float e\x3dc-b;if((a/\x3dd/2.0)\x3c1.0) return e/2.0*pow(a,3.0)+b;return e/2.0*((a-\x3d2.0)*pow(a,2.0)+2.0)+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"curveInter"\x3e\x3c![CDATA[float b3p0(float a,float b){float c\x3d1.0-a;return pow(c,3.0)*b;}float b3p1(float a,float b){float c\x3d1.0-a;return 3.0*pow(c,2.0)*a*b;}float b3p2(float a,float b){float c\x3d1.0-a;return 3.0*c*pow(a,2.0)*b;}float b3p3(float a,float b){return pow(a,3.0)*b;}float b3(float a,float d,float e,float f,float g){return b3p0(a,d)+b3p1(a,e)+b3p2(a,f)+b3p3(a,g);}vec3 getPoint(float a,vec3 h,vec3 i,vec3 j,vec3 k){float l,m,n;l\x3db3(a,h.x,i.x,j.x,k.x);m\x3db3(a,h.y,i.y,j.y,k.y);n\x3db3(a,h.z,i.z,j.z,k.z);return vec3(l,m,n);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"defines"\x3e\x3c![CDATA[\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n#define Epsilon \t\t1e-6\r\n#define PI \t\t\t\t\t3.14159265358979323846264338327950288\r\n#define EarthRadius 6378137.0\r\n#define DegPerRad \t57.295779513082320\r\n#define RadPerDeg \t0.017453292519943\r\n]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"defines2"\x3e\x3c![CDATA[\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"elasticEaseIn"\x3e\x3c![CDATA[float getElasticEaseInValue(float a,float b,float c,float d){float e\x3dc-b;float f\x3dd*0.3;float g\x3de;float h\x3df/4.0;float i\x3da-1.0;return -(g*pow(2.0,10.0*i)*sin((i*d-h)*(2.0*PI)/f))+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"expoEaseOut"\x3e\x3c![CDATA[float getExpoEaseOutValue(float a,float b,float c,float d){float e\x3dc-b;return (abs(a-d)\x3cEpsilon)?c:(e*(-pow(2.0,-10.0*a/d)+1.0)+b);}float getExpoEaseInValue(float a,float b,float c,float d){float e\x3dc-b;return (abs(a)\x3cEpsilon)?b:(e*pow(2.0,10.0*(a/d-1.0))+b);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"float2rgba"\x3e\x3c![CDATA[vec4 a(float v){float b\x3dfloor(v*256.0)/255.0;float c\x3dfloor(fract(v*256.0)*256.0)/255.0;float d\x3dfloor(fract(v*65536.0)*256.0)/255.0;float e\x3d1.0;return vec4(b,c,d,e);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"getHSVColor"\x3e\x3c![CDATA[vec4 getHSVColor(float a,float b,float c){vec3 d\x3dvec3(1.0,1.0,0.0);float e\x3da/60.0;float f\x3dfloor(e);float g\x3de-f;float h\x3dc*(1.0-b);float i\x3dc*(1.0-b*g);float j\x3dc*(1.0-b*(1.0-g));if(f\x3c0.5) d\x3dvec3(c,j,h);else if(f\x3c1.5) d\x3dvec3(i,c,h);else if(f\x3c2.5) d\x3dvec3(h,c,j);else if(f\x3c3.5) d\x3dvec3(h,i,c);else if(f\x3c4.5) d\x3dvec3(j,h,c);else d\x3dvec3(c,h,i);return vec4(d,0.7);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"linearInterpolator"\x3e\x3c![CDATA[float getLinearValue(vec2 a,float b){if(a[1]\x3d\x3da[0]) return 0.0;else{return (b-a[0])/(a[1]-a[0]);}}float getScope(vec2 c,float d){return c[0]+(c[1]-c[0])*d;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"localTrans"\x3e\x3c![CDATA[vec3 wgs84ToWebMerc(vec3 a){float b\x3d0.4999999*PI;float c\x3da[1]*RadPerDeg;c\x3dclamp(c,-b,b);float d\x3dsin(c);float e\x3dRadPerDeg*a[0]*EarthRadius;float f\x3dEarthRadius*0.5*log((1.0+d)/(1.0-d));float g\x3da[2];return vec3(e,f,g);}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"lonlat2position"\x3e\x3c![CDATA[vec3 lonlat2position(vec3 a){float b\x3dRadPerDeg*(a.x);float c\x3dRadPerDeg*(a.y);float d\x3dcos(c);float e\x3dEarthRadius+a.z;float f\x3dcos(b)*d*e;float g\x3dsin(b)*d*e;float h\x3dsin(c)*e;return vec3(f,g,h);}vec3 position2lonlat(vec3 i){float j\x3dlength(i);float k\x3dasin(i.z/j);float d\x3dcos(k);float l\x3d-1.0;if(i.y\x3e0.0){l\x3d1.0;}float m\x3dl*acos(i.x/(d*j));float b\x3dDegPerRad*(m);float c\x3dDegPerRad*(k);return vec3(b,c,j-EarthRadius);}mat4 toRotationMat(mat4 n){mat4 o\x3dmat4(1.0);o[0]\x3dn[0];o[1]\x3dn[1];o[2]\x3dn[2];return o;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"lonlatDistance"\x3e\x3c![CDATA[float a(vec2 b,vec2 c){float d\x3dRadPerDeg*(b.y);float e\x3dRadPerDeg*(c.y);float f\x3dRadPerDeg*(c.y-b.y);float g\x3dRadPerDeg*(c.x-b.x);float h\x3dsin(f/2.0)*sin(f/2.0)+cos(d)*cos(e)*sin(g/2.0)*sin(g/2.0);float i\x3d2.0*atan2(sqrt(h),sqrt(1.0-h));return EarthRadius*i;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"packDepth"\x3e\x3c![CDATA[\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nvec4 packDepth(const in mediump float a){const mediump vec4 b\x3dvec4(256.0,256.0*256.0,256.0*256.0*256.0,256.0*256.0*256.0*256.0);vec4 c\x3da*b;c.x\x3dmin(c.x+1.0,255.0);c\x3dfract(floor(c)/256.0);return c;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"quintEaseOut"\x3e\x3c![CDATA[float getQuintEaseInOutValue(float a,float b,float c,float d){float e\x3dc-b;if((a/\x3d(d/2.0))\x3c1.0){return e/2.0*a*a*a*a*a+b;}return e/2.0*((a-\x3d2.0)*a*a*a*a+2.0)+b;}float getQuintEaseOut(float a,float b,float c,float d){float e\x3dc-b;return e*((a\x3da/d-1.0)*a*a*a*a+1.0)+b;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"rotateFromToMat"\x3e\x3c![CDATA[mat4 rotateFromTo(vec3 a,vec3 b){mat4 c\x3dmat4(1.0);vec3 d\x3dnormalize(a);vec3 e\x3dnormalize(b);float f\x3ddot(d,e);float g\x3dsqrt(1.0-f*f);float h\x3d1.0-f;vec3 i\x3dcross(d,e);i\x3dnormalize(i);float j\x3di.x,k\x3di.y,l\x3di.z;float m\x3dc[0].x,n\x3dc[0].y,o\x3dc[0].z,p\x3dc[0].w,q\x3dc[1].x,r\x3dc[1].y,s\x3dc[1].z,t\x3dc[1].w,u\x3dc[2].x,v\x3dc[2].y,w\x3dc[2].z,x\x3dc[2].w;float y\x3dj*j*h+f,z\x3dk*j*h+l*g,A\x3dl*j*h-k*g,B\x3dj*k*h-l*g,C\x3dk*k*h+f,D\x3dl*k*h+j*g,E\x3dj*l*h+k*g,F\x3dk*l*h-j*g,G\x3dl*l*h+f;c[0].x\x3dm*y+q*z+u*A;c[0].y\x3dn*y+r*z+v*A;c[0].z\x3do*y+s*z+w*A;c[0].w\x3dp*y+t*z+x*A;c[1].x\x3dm*B+q*C+u*D;c[1].y\x3dn*B+r*C+v*D;c[1].z\x3do*B+s*C+w*D;c[1].w\x3dp*B+t*C+x*D;c[2].x\x3dm*E+q*F+u*G;c[2].y\x3dn*E+r*F+v*G;c[2].z\x3do*E+s*F+w*G;c[2].w\x3dp*E+t*F+x*G;return c;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"translationMat"\x3e\x3c![CDATA[mat4 rotateX(mat4 a,float b){mat4 c\x3da;float d\x3dsin(b);float e\x3dcos(b);float f\x3da[1].x,g\x3da[1].y,h\x3da[1].z,i\x3da[1].w,j\x3da[2].x,k\x3da[2].y,l\x3da[2].z,m\x3da[2].w;c[1].x\x3df*e+j*d;c[1].y\x3dg*e+k*d;c[1].z\x3dh*e+l*d;c[1].w\x3di*e+m*d;c[2].x\x3df*(-d)+j*e;c[2].y\x3dg*(-d)+k*e;c[2].z\x3dh*(-d)+l*e;c[2].w\x3di*(-d)+m*e;return c;}mat4 rotateY(mat4 a,float b){mat4 c\x3da;float d\x3dsin(b);float e\x3dcos(b);float n\x3da[0].x,o\x3da[0].y,p\x3da[0].z,q\x3da[0].w,j\x3da[2].x,k\x3da[2].y,l\x3da[2].z,m\x3da[2].w;c[0].x\x3dn*e+j*(-d);c[0].y\x3do*e+k*(-d);c[0].z\x3dp*e+l*(-d);c[0].w\x3dq*e+m*(-d);c[2].x\x3dn*d+j*e;c[2].y\x3do*d+k*e;c[2].z\x3dp*d+l*e;c[2].w\x3dq*d+m*e;return c;}mat4 getTransMat(vec3 r){mat4 s\x3dmat4(1.0);float t\x3dRadPerDeg*(r.x);float u\x3dRadPerDeg*(r.y);float v\x3dsin(t),w\x3dcos(t),x\x3dsin(u),y\x3dcos(u);s[0].x\x3d-v;s[1].x\x3d-x*w;s[2].x\x3dy*w;s[0].y\x3dw;s[1].y\x3d-x*v;s[2].y\x3dy*v;s[0].z\x3d0.0;s[1].z\x3dy;s[2].z\x3dx;s[0].w\x3d0.0;s[1].w\x3d0.0;s[2].w\x3d0.0;s[3].xyz\x3dlonlat2position(r);s[3].w\x3d1.0;return s;}vec3 rotateOnAxis(vec3 z,float b,vec3 A){vec3 B;float C\x3db*0.5;float d\x3dsin(C);float D\x3dcos(C);float E\x3dd*z[0];float F\x3dd*z[1];float G\x3dd*z[2];float H\x3dA[0],I\x3dA[1],J\x3dA[2];float K\x3dD*H+F*J-G*I,L\x3dD*I+G*H-E*J,M\x3dD*J+E*I-F*H,N\x3d-E*H-F*I-G*J;B[0]\x3dK*D+N*-E+L*-G-M*-F;B[1]\x3dL*D+N*-F+M*-E-K*-G;B[2]\x3dM*D+N*-G+K*-F-L*-E;return B;}]]\x3e\x3c/snippet\x3e\x3csnippet name\x3d"transparentFunc"\x3e\x3c![CDATA[\r\n#extension GL_OES_standard_derivatives : enable\r\nfloat edgeFactor(float a,float b){vec3 b\x3dfwidth(a);vec3 c\x3dsmoothstep(vec3(0.0),b*1.5,a);return min(min(c.x,c.y),c.z);}]]\x3e\x3c/snippet\x3e\x3c/snippets\x3e'}});
define("dojo/_base/lang dojo/_base/array dojo/_base/declare esri/core/scheduling esri/core/reactiveUtils ../webgl-engine-extensions/ShaderSnippets esri/core/libs/gl-matrix-2/vec3f64 esri/core/libs/gl-matrix-2/mat4f64 esri/core/libs/gl-matrix-2/vec3 esri/core/libs/gl-matrix-2/mat4 esri/views/3d/externalRenderers esri/layers/GraphicsLayer ./Effect ../support/fx3dUtils dojo/text!./CommonShaders.xml".split(" "),function(f,m,n,z,A,p,q,r,B,h,k,t,u,C,v){var w=r.mat4f64;h=h.mat4;var x=q.vec3f64,e=n(null,
{declaredClass:"esri.views.3d.effects.FxEffectRendererManager",constructor:function(){this._sceneView=null;this._ready=!1;this._effects=[];this._shaderSnippets=this._fx3dFrameTask=null;this._normalMatrix=w.create();this._viewDirection=x.create();this._shaderSnippets||(this._shaderSnippets=new p,this._shaderSnippets._parse(v))},_init:function(a){return f.isObject(a)?(this._sceneView=a,this._vaoExt=this._sceneView._stage.renderView._rctx._capabilities.vao,void(this._ready||this._sceneView.when(f.hitch(this,
function(){this._viewReadyHandler()})))):void console.error("FxEffectRendererManager: no sceneView")},_viewReadyHandler:function(){this._sceneView&&(this._labelsLayer=new t({id:"-labelinfo-layer",listMode:"hide"}),this._sceneView.map.add(this._labelsLayer))},setup:function(a){this.context={};this.context.gl=a.gl;this.context.rctx=a.rctx;this._gl=this.context.gl;this._gl.getExtension("OES_texture_float");this._gl.getExtension("OES_texture_float_linear");this._effects.forEach(function(b){b.effect.setupEffect({gl:this._gl,
vaoExt:this._vaoExt,shaderSnippets:this._shaderSnippets})}.bind(this));a.resetWebGLState()},_updateContext:function(a){var b={};b.direction=a.sunLight.direction;b.ambient=a.sunLight.ambient.color;b.diffuse=a.sunLight.diffuse.color;b.specular=[.2,.2,.2,.2];b.ambient[3]=a.sunLight.ambient.intensity;b.diffuse[3]=a.sunLight.diffuse.intensity;this.context.lightingData=b;h.copy(this._normalMatrix,a.camera.viewInverseTransposeMatrix);this._normalMatrix[3]=this._normalMatrix[7]=this._normalMatrix[11]=0},
render:function(a){a.gl.enable(a.gl.DEPTH_TEST);a.gl.disable(a.gl.CULL_FACE);a.gl.disable(a.gl.BLEND);this._updateContext(a);_context=a;this._effects.forEach(function(b){b.effect.update();b.effect.render({zoom:this._sceneView.zoom,proj:_context.camera.projectionMatrix,view:_context.camera.viewMatrix,viewInvTransp:_context.camera.viewInverseTransposeMatrix,normalMat:this._normalMatrix,camPos:_context.camera.eye,lightingData:this.context.lightingData,viewport:_context.camera.viewport},_context.rctx)}.bind(this));
k.requestRender(this._sceneView);a.resetWebGLState()},dispose:function(){},addEffect:function(a,b){if(f.isObject(a)&&b instanceof u){if(0<m.filter(this._effects,function(d){return d.id===a.id&&d.effect.effectName==b.effectName}).length)return console.warn("Layer "+a.id+" in "+b.effectName+" effect has already existed."),!1;if(f.isObject(b))return a.emit("hide-feature-label"),this._labelsLayer.id=a.id+this._labelsLayer.id,a._labelsLayer=this._labelsLayer,this._labelsLayer.visible=a.visible,a.watch("visible",
function(d,g,l){this._labelsLayer&&(a.emit("hide-feature-label"),this._labelsLayer.set("visible",!!d))}.bind(this)),this._effects.push({id:a.id,effect:b}),b.initEffect({}),!0}return!1},_remove:function(a,b){if(a&&b){var d=-1,g=m.filter(this._effects,function(l,y){return l.id===b&&a==l.effect.effectName&&(d=y,!0)});0<g.length&&-1<d&&(g[0].effect.destroy(),this._effects.splice(d,1));0===this._effects.length&&(this._ready=!1,this._labelsLayer&&(this._labelsLayer.removeAll(),this._sceneView.map.remove(this._labelsLayer)))}}}),
c=null;return e.init=function(a){c||(c=new e);c._init(a)},e.addEffect=function(a,b){if(c){var d=c._sceneView;return this._eventHandler=a.on("effect-ok-test",function(g){k.add(d,c)}.bind(this)),c.addEffect(a,b)}return!1},e.run=function(a,b){return!!c&&c._prepare(a,b)},e.destroy=function(a,b){if(c){var d=c._sceneView;c._remove(a,b);k.remove(d,c)}},e.pause=function(){c&&c._fx3dFrameTask&&c._fx3dFrameTask.pause()},e});