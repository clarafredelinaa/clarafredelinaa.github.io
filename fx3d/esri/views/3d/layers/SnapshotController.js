//>>built
define("esri/config esri/core/Accessor esri/core/Error esri/core/Evented esri/core/Handles esri/core/Logger esri/core/Promise esri/core/promiseUtils esri/geometry/support/WKIDUnitConversion ./GraphicsManager ./Graphics3DVerticalScale".split(" "),function(D,E,x,F,G,H,I,y,J,K,L){function z(a){var b,c;if(a&&("object"==typeof a?(b=a.wkid,c=a.wkt):"number"==typeof a?b=a:"string"==typeof a&&(c=a)),b)var f=A.values[A[b]];else c&&-1!==c.search(/^PROJCS/i)&&(a=M.exec(c))&&a[1]&&(f=parseFloat(a[1].split(",")[1]));
return f}var B=H.getLogger("esri.layers.graphics.controllers.SnapshotController"),N=6378137*Math.PI/180,M=/UNIT\[([^\]]+)\]\]$/i,A=J;return I.EsriPromiseMixin(F.EventedMixin(E)).createSubclass({declaredClass:"esri.layers.graphics.controllers.SnapshotController",constructor:function(a){return this.type="snapshot",this._gManager=null,this._verticalScale=null,this._handles=new G,this._source=null,this._started=!1,this._pendingQueries=new Map,this.extent=null,this.hasAllFeatures=!1,this.hasFeatures=!1,
this.layer=null,this.layerView=null,this.maxPageSize=null,this.defaultReturnZ=void 0,this.defaultReturnM=void 0,this.pageSize=null,this.paginationEnabled=!1,this._cancelErrorMsg="SnapshotController: query cancelled",this._featureResolution={value:.25,scale:945},this._maxFeatures={point:16E3,multipoint:8E3,polyline:4E3,polygon:4E3,multipatch:4E3},this.layer=a.layer,this.layerView=a.layerView,this.maxPageSize=a.maxPageSize,this.graphics=a.graphics,this},initialize:function(){var a=this,b=this.layer.when(function(){return a._verifyCapabilities()}).then(function(){return a._init()});
this.addResolvingPromise(b)},destroy:function(){this.cancelQuery();this._gManager&&(this._gManager.destroy(),this._gManager=null);this._handles.destroy();this._pendingQueries=this._handles=null},properties:{updating:{value:null,dependsOn:["_pendingQueries"],get:function(){return!!(this._pendingQueries&&0<this._pendingQueries.size)}},graphics:{value:null,set:function(a){var b=this._get("graphics");b!==a&&(this._handles.remove("graphics"),a&&(this._collectionChanged({added:a.toArray(),removed:b&&b.toArray()}),
this._handles.add(a.on("change",this._collectionChanged.bind(this)),"graphics")),this._set("graphics",a))}}},cancelQuery:function(){var a=this;this._pendingQueries&&(this._pendingQueries.forEach(function(b,c){b.isFulfilled()||b.cancel(Error(a._cancelErrorMsg))}),this._pendingQueries.clear(),this.notifyChange("updating"))},refresh:function(){this.isResolved()&&this._started&&this._queryFeatures()},startup:function(){this._started||(this._started=!0,this._resolutionParams=this._getResolutionParams(),
this._queryFeatures())},update:function(){this.startup()},_init:function(){var a=this.layer;this.paginationEnabled=!!a.get("capabilities.query.supportsPagination");this._source=a.source;var b=a.maxRecordCount||4E3;this.pageSize=null==this.maxPageSize?b:Math.min(b,this.maxPageSize);this._gManager=new K({graphics:this.graphics,objectIdField:a.objectIdField});this._verticalScale=new L({sourceSpatialReference:a.spatialReference,destSpatialReference:this.layerView.view.spatialReference});this._setupStateWatchers()},
_getResolutionParams:function(){var a=this.layer,b=a.get("capabilities.query.supportsQuantization");if("polyline"===a.geometryType||"polygon"===a.geometryType){var c=z(this.layerView.view.spatialReference);if(null!=c){var f=this._featureResolution.scale;c=this._featureResolution.value/c;if(a.maxScale)var d=a.maxScale;else if(a.minScale)d=Math.min(f,a.minScale);else{d=Math;var h=d.min,k=this.layerView.view,l=a.fullExtent||k.extent;k=k.width;var g=z(l&&l.spatialReference);d=h.call(d,f,l&&k?l.width/
k*(g||N)*39.37*D.screenDPI:0)}d*=c/this._featureResolution.scale}}return d?{maxAllowableOffset:b?null:d,quantizationParameters:b?{mode:"view",originPosition:"upperLeft",tolerance:d,extent:a.fullExtent}:null}:null},_setupStateWatchers:function(){var a=this;this._handles.add([this.watch("extent",this.refresh.bind(this)),this.layer.watch("outFields",function(b,c){b&&c?-1===c.indexOf("*")&&(b.sort(),c.sort(),JSON.stringify(b)!==JSON.stringify(c)&&a.refresh()):a.refresh()}),this.layer.watch("definitionExpression, historicMoment",
this.refresh.bind(this)),this.layer.on("edits",this._editsHandler.bind(this))])},_createQueryParams:function(){var a=this.layer,b=this.layerView,c=a.createQuery();c.outSpatialReference=b.view.spatialReference;c.geometry=this.extent;a=a.capabilities&&a.capabilities.data;return a&&a.supportsZ&&null==c.returnZ&&null!=this.defaultReturnZ&&(c.returnZ=this.defaultReturnZ),a&&a.supportsM&&null==c.returnM&&null!=this.defaultReturnM&&(c.returnM=this.defaultReturnM),c.set(this._resolutionParams),this.paginationEnabled&&
(c.start=0,c.num=this.pageSize),c},_queryFeatures:function(){this.cancelQuery();this.hasAllFeatures=this.hasFeatures=!1;this._gManager.beginPagedUpdate();this.emit("query-start");this._executeQuery(this._createQueryParams())},_executeQuery:function(a){var b=this,c=this._source.queryFeatures(a),f=this._gManager.createIntentToAdd();this._querySetup(f,c);c.then(this._processFeatureSet.bind(this,a,f))["catch"](function(d){return b._queryError(f,d)}).then(function(){return b._queryTeardown(f)},function(){return b._queryTeardown(f)})},
_hydrate:function(a,b,c){if(a){var f=a.translate[0],d=a.translate[1],h=a.scale[0],k=a.scale[1],l=function(g,t,u){return"esriGeometryPoint"===g?function(e){e.x=t(e.x);e.y=u(e.y)}:"polyline"===g||"polygon"===g?function(e){var v,p,n,q,m=e.rings||e.paths;e=0;for(v=m.length;e<v;e++){var C=m[e];var w=0;for(p=C.length;w<p;w++){var r=C[w];0<w?(n+=r[0],q+=r[1]):(n=r[0],q=r[1]);r[0]=t(n);r[1]=u(q)}}}:"extent"===g?function(e){e.xmin=t(e.xmin);e.ymin=u(e.ymin);e.xmax=t(e.xmax);e.ymax=u(e.ymax)}:"multipoint"===
g?function(e){var v,p,n,q=e.points;e=0;for(v=q.length;e<v;e++){var m=q[e];0<e?(p+=m[0],n+=m[1]):(p=m[0],n=m[1]);m[0]=t(p);m[1]=u(n)}}:void 0}(b,function(g){return g*h+f},function(g){return d-g*k});a=0;for(b=c.length;a<b;a++)c[a].geometry&&l(c[a].geometry)}},_processFeatureSet:function(a,b,c){c.transform&&this._hydrate(c.transform,c.geometryType,c.features);var f=c.exceededTransferLimit,d=c.features,h=this._maxFeatures[this.layer.geometryType]||0,k=d?d.length:0,l=this._gManager.numGraphics+k,g=l>=
h;g&&(B.warn('Feature limit exceeded on layer "',this.layer.title,'". Not all features are shown.'),(h=l-h)&&d.splice(k-h,h));a=!(!f||!this.paginationEnabled||g)&&this._queryNextPage(a);return this._verticalScale.adjust(d),d&&this._gManager.addPage(d,b),this.hasFeatures=!0,a||(this._gManager.endPagedUpdate(),this.hasAllFeatures=!f,this.emit("query-end",{success:!0})),c},_queryNextPage:function(a){return a.start+=this.pageSize,this._executeQuery(a),!0},_queryError:function(a,b){if(b&&"cancel"===b.dojoType&&
!this.hasFeatures?this._gManager.revertPagedUpdate():this._gManager.endPagedUpdate(),this.emit("query-end",{success:!1}),b&&"cancel"===b.dojoType)return y.reject(b);a=new x("snapshotcontroller:tile-request-failed","Failed to query for features",{error:b});return B.error(a),y.reject(a)},_querySetup:function(a,b){this._pendingQueries.set(a,b);this.notifyChange("updating")},_queryTeardown:function(a){this._gManager.removeIntent(a);this._pendingQueries["delete"](a);this.notifyChange("updating")},_processRefetch:function(a,
b){(b=b.features)&&this._gManager.add(b,a)},_refetchError:function(a,b){},_verifyCapabilities:function(){if(!this.layer.get("capabilities.operations.supportsQuery"))throw new x("graphicscontroller:query-capability-required","Service requires query capabilities to be used as a feature layer",{layer:this.layer});},_collectionChanged:function(a){var b=a.added;if(b)for(var c=0;c<b.length;c++)b[c].layer=this.layer,b[c].sourceLayer=this.layer;if(b=a.removed)for(c=0;c<b.length;c++)b[c].layer=null,b[c].sourceLayer=
null},_editsHandler:function(a){var b=this,c=function(h){return h.objectId},f=a.deletedFeatures.map(c);this._gManager["delete"](f);a=a.addedFeatures.concat(a.updatedFeatures).map(c);if(a.length){c=this._createQueryParams();c.objectIds=a;c=this._source.queryFeatures(c);var d=this._gManager.createIntentToAdd(a);this._querySetup(d,c);c.then(this._processRefetch.bind(this,d))["catch"](this._refetchError.bind(this,d)).then(function(){return b._queryTeardown(d)},function(){return b._queryTeardown(d)})}}})});