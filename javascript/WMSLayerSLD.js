/**
 *Class Name: WMSLayerSLD 
 */		
require([
    "dojo/_base/declare",
    "esri/layers/DynamicMapServiceLayer"
], function(declare, DynamicMapServiceLayer){
    return declare("WMSLayerSLD", esri.layers.DynamicMapServiceLayer, {
    	    	
	    constructor: function(url) {
	      this.initialExtent = this.fullExtent = new esri.geometry.Extent({xmin:-180,ymin:0,xmax:0,ymax:90,spatialReference:{wkid:4326}});
	      this.spatialReference = new esri.SpatialReference({wkid:4326});
		  
	      this.loaded = true;
	      this.onLoad(this);     
	      this.wmsURL = url;
	      	      		      
	      this.paramsOb = {
	        	request:"GetMap",
	        	transparent:true,
	        	format:"image/png",
	        	bgcolor:"0x000000",
	        	version:"1.1.1", 
	        	layers:"0",
	        	styles: "",
	        	crs:"EPSG:3857", //This may need to be updated
	        	exceptions: "application/vnd.ogc.se_xml"
	      	};	        
	    },
	
	    getImageUrl: function(extent, width, height, callback) {
	      this.paramsOb.bbox = extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax; 
	      this.paramsOb.srs = "EPSG:" + extent.spatialReference.wkid;
	      this.paramsOb.width = width;
	      this.paramsOb.height = height;
	
	      callback(this.wmsURL + "?" + dojo.objectToQuery(this.paramsOb));
        },
        
        setStyleType: function(style) {
            this.paramsOb.styles = style;
        },
        setSLDURL: function(sldURL, style) {
            this.paramsOb.styles = style;
            this.paramsOb.SLD = sldURL;
        },
        setSLDBody: function(SLDBody, style) {
            this.paramsOb.styles = style;
            this.paramsOb.SLD_BODY = SLDBody;
        }
    });
}); 