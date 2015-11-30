WechatShare=React.createClass({
	propTypes: {
	    title:React.PropTypes.string,
	    desc:React.PropTypes.string,
	    link:React.PropTypes.string,
	    imgUrl:React.PropTypes.string,
	    apis:React.PropTypes.array,
	    onShareTimeLineSuccess:React.PropTypes.func,
	    onShareAppMessageSuccess:React.PropTypes.func
	},
	getInitialState() {
	    return {
	        isWechatReady:false  
	    };
	},
	getDefaultProps() {
	    return {
	        apis:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']  
	    };
	},
	componentDidMount() {
		let self=this;
		function initWechat(data){
      wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名，见附录1
          jsApiList: self.props.apis // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
   }

   wx.ready(function(){
   		self.setState({
   			isWechatReady:true
   		})

   		wx.onMenuShareTimeline({
          title: self.props.title, // 分享标题
          link: self.props.link, // 分享链接
          imgUrl: self.props.imgUrl, // 分享图标
          success: function () { 
              // 用户确认分享后执行的回调函数
              if(self.props.onShareTimeLineSuccess){
              	self.props.onShareTimeLineSuccess()
              }
          },
          cancel: function () { 
              // 用户取消分享后执行的回调函数
          }
      });

      wx.onMenuShareAppMessage({
        title: self.props.title, // 分享标题
        desc: self.props.desc, // 分享描述
        link: self.props.link, // 分享链接
        imgUrl: self.props.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
            if(self.props.onShareAppMessageSuccess){
              	self.props.onShareTimeLineSuccess()
            }
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
      });
   })

    let url=this.props.link;
    Meteor.call('getWechatSinature',url,function(err,result){
      if(err){
        alert('创建微信签名失败',err.reason)
      }
      if(result){
        initWechat(result);
      }else{
        alert('获取微信签名信息失败');
      }
    })

	},
	render(){
		return <div></div>
	}
})