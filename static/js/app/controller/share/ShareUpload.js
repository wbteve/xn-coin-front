define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
	var iosUpdateUrl,androidUpdateUrl;
	
    init();
    
    function init() {
    	
		base.showLoading("加载中...")
		$.when(
			getAndroidUrl(),
			getIosUrl()
		).then(function(){
			base.hideLoading()
			$("#upload_android").click(function(){
				if(base.getUserBrowser()=="android"){
					location.href = androidUpdateUrl;
				}else{
					base.confirm("当前为iPhone系统请点击下载iPhone版！","确定").then(function(){},function(){})
				}
			})
			$("#upload_ios").click(function(){
				if(base.getUserBrowser()=="ios"){
					location.href = iosUpdateUrl;
				}else{
					base.confirm("当前为android系统请点击下载android版！","确定").then(function(){},function(){})
				}
			})
			
		})
    }
	
	function getAndroidUrl(){
		return Ajax.get("625918",{
			"type":"android-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
	        if (res.success) {
        		androidUpdateUrl = res.data.downloadUrl;
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取安卓下载地址失败");
	    });
	}
	
	function getIosUrl(){
		return Ajax.get("625918",{
			"type":"ios-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
	        if (res.success) {
        		iosUpdateUrl = res.data.downloadUrl;
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取ios下载地址失败");
	    });
	}
});