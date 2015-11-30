Meteor.methods({
	getWechatSinature:function(url){
		var self=this;
		var appId= Meteor.settings.wechat.appid;
		var appSecret= Meteor.settings.wechat.appSecret;
		var baseUrl= "https://api.weixin.qq.com/cgi-bin/";

		// get access token
		var getAccessToken= function(){
			var url=baseUrl+'token?grant_type=client_credential&appid='+appId+'&secret='+appSecret;
			var res= request.getSync(url);
			if(res.response.statusCode==200&&!res.errcode){
				return JSON.parse(res.body);
			}else{
				throw new Meteor.Error("get-token-failed","获取token失败");
				return;
			}
		}

		var getTicket=function(token){
			var url= baseUrl+"ticket/getticket?access_token="+token+"&type=jsapi";
			var res= request.getSync(url);
			if(res.response.statusCode==200){
				var body=JSON.parse(res.body);
				if(body.errcode===0){
					return body.ticket;
				}else{
					console.log('ticker 失败',body.errmsg);
					throw new Meteor.Error("get-ticket-error","获取Ticker失败");
					return
				}
			}else{
				throw new Meteor.Error("get-token-failed","获取token失败");
				return;
			}
		}

		var createNonceStr= function(){
			return Math.random().toString(36).substr(2, 15);
		}

		var createTimeStamp= function(){
			return parseInt(new Date().getTime() / 1000) + ''		
		}
		
		var createSinature= function(url){
			var timestamp= createTimeStamp()
			, 	noncestr= createNonceStr();
			var token_result= getAccessToken();
			if(!token_result){
				throw new Meteor.Error("get-token-error","获取Token失败");
				return
			}
			var access_token=token_result.access_token
			var jsapi_ticket= getTicket(access_token);
			var tmpstr= "jsapi_ticket="+jsapi_ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url
			var signature= CryptoJS.SHA1(tmpstr).toString();
			console.log(access_token,tmpstr,jsapi_ticket,noncestr,timestamp,url,signature);
			var out={
					appId:appId,
					timestamp:timestamp,
					noncestr:noncestr,
					signature:signature
			}
			return out;
		}

		return createSinature(url);
	}
})