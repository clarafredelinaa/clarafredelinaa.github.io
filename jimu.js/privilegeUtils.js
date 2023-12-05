// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/Deferred","esri/identity/IdentityManager","esri/request","jimu/tokenUtils","jimu/portalUrlUtils"],function(l,m,n,p,f){return{checkEssentialAppsLicense:function(g,d,k){var h=f.getStandardPortalUrl(d.portalUrl),b=f.getSharingUrl(h),c=new l;(k?m.checkAppAccess(b,"arcgisWebApps"):d.getItemById(g).then(function(e){return"public"===e.access?{isPublicApp:!0}:m.checkAppAccess(b,"arcgisWebApps",{force:!0})})).then(function(e){d.getSigninSettingsOfSelfInfo().then(function(a){a&&a.blockedApps&&
a.blockedApps.indexOf&&-1<a.blockedApps.indexOf("webappbuilder")?c.reject({message:"wab is blocked by org admin",isBlockedByOrg:!0}):c.resolve(e)},function(a){c.reject({message:a&&a.message,isBlockedByOrg:!1})})},function(e){c.reject({message:e&&e.message,isBlockedByOrg:!1})});return c},checkIsSelfOrigin:function(g,d,k){var h=!0,b=f.getPortalUrlFromLocation();b=f.getStandardPortalUrl(b);g=f.getItemUrl(b,g);var c=window.location.host;b=p.userHaveSignInPortal(b);c=0<=["www.arcgis.com","devext.arcgis.com",
"qaext.arcgis.com"].indexOf(c);var e=window.location!==window.parent.location;if(d.isPortal||k||c||b||e)d=new l,d.resolve(h);else return n(g,{handleAs:"json",query:{f:"json"},callbackParamName:"callback"}).then(function(a){a=a.data;a.contentOrigin&&"self"!==a.contentOrigin&&(h=!1);return h});return d}}});