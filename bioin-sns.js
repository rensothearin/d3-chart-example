function pstNaverBand(msg,url) {
	var href = 'http://www.band.us/plugin/share?body=';
	if(msg=='site'){
		href = href + url;
	}else{
		href += encodeURIComponent(msg) + "&route=" +  encodeURIComponent(url);
	}

	var a = window.open(href, 'band', '');
	if (a) {
		a.focus();
	}
}

function pstTwitter(msg,url) {
     var href = 'https://twitter.com/intent/tweet?url=';
	 var linkUrl = window.location.href;
	if(msg=='site'){
		href = href + url;
	}else{
		href = href + encodeURIComponent(linkUrl);
	}
	
	var a = window.open(href, 'twitter', '');
	if (a) {
		a.focus();
	}
}

function pstNaverBlog(msg, url) {
	var href = 'https://share.naver.com/web/shareView?url=';
	var linkUrl = window.location.href;
	linkUrl = encodeURI(encodeURIComponent(linkUrl));
	var title = encodeURI("BioIN공유");
	if(msg=='site'){
		href = href + url;
	}else{
		href = href + linkUrl + "&title=" + title;
	}
	console.log(href);
	var a = window.open(href, 'blog', 'Width=500,Height=600');
	if (a) {
		a.focus();
	}
}

function pstKakao(msg, url) {

	Kakao.Link.sendDefault({
      objectType: 'text',
      text:
         msg,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    })
  }

function pstMe2Day(msg,url,tag) {
	$.getJSON('http://api.bit.ly/v3/shorten?login=hwangsunwoo&apiKey=R_78c23e35bbb255158bde631ed3370ce7&callback=?&longUrl=' + encodeURIComponent(url) ,function(data) {
		var href = "https://me2day.net/posts/new?new_post[body]=" + encodeURIComponent('\"' + msg + '\"') + ":" + data.data.url +  encodeURIComponent(' ') + "&new_post[tags]=" + encodeURIComponent(tag);

		var a = window.open(href, 'me2Day', '');
		if (a) {
			a.focus();
		}
	});
}

function copyUrl(url){
	if (window.clipboardData){
		if(confirm("선택하신 게시물의 고유주소(URL)가 클립보드에 복사되었습니다.\n\Ctrl + V 또는 붙여 넣기를 선택하여 이용하시기 바랍니다."))
			window.clipboardData.setData("Text", url);
		} else {
			temp = prompt("선택하신 게시물의 고유주소(URL)입니다. Ctrl+C를 눌러 클립보드로 복사하세요", url);
	}
}
  
function pstFaceBook(msg, url) {
	var href = 'https://www.facebook.com/sharer.php?u=';
	var linkUrl = window.location.href;
	if(msg=='site'){
		href = href + url;
	}else{
		href = href + encodeURIComponent(linkUrl);
	}
	
	var a = window.open(href, 'facebook', '');
	if (a) {
		a.focus();
	}
}
 
var print_window = null;
function goPrint(){
	$('.static').hide();
	window.print();
	$('.static').show();
	location.reload();
}

function getElement(){
	print_window.document.getElementById("contents_body").innerHTML = $("#contbox").html();
	print_window.print();
}

function goMyscrap(bid, seq, m_level, othbc_at){
	if (m_level == ''){
		m_level = 0;
	}
	
	if(othbc_at == "1"){
		alert("비공개 게시글은 스크랩하실 수 없습니다.");
		return false;
	}
	
	m_level = eval(m_level);
	
	if(m_level < 50){
		location.href="/boardCgi.do?cmd=scrap&num=" + seq + "&bid=" + bid;
	} else if (m_level > 80 && m_level != 92){
		var url ="/mng/myScrapForm.do?num=" + seq + "&bid=" + bid;
		var strShape  = 'width=450, height=450';
		strShape += ',status=no,toolbar=no,menubar=no,location=no, scrollbars=yes';
		window.open (url,'',strShape);
	} else {
		alert('로그인 후 사용하실 수 있습니다.');
	}
}
 
function mainMyscrap(bid, seq, m_level){
	if (m_level == ''){
		m_level = 0;
	}
	
	m_level = eval(m_level);
	if(m_level < 50){
		location.href="/boardCgi.do?cmd=scrap&num=" + seq + "&bid=" + bid;
	} else if (m_level > 90){
		var url ="/mng/myScrapForm.do?num=" + seq + "&bid=" + bid;
		var strShape  = 'width=400, height=500';
		strShape += ',status=no,toolbar=no,menubar=no,location=no, scrollbars=auto';
		window.open (url,'',strShape);
	} else {
		alert('로그인 후 사용하실 수 있습니다.');
	}
}
 
//띄워줄 DIV 창
var div_format = "<div id='myscrap_for_admin' style='display:none;'><h4>뉴스레터목록</h4><ul><li id='li_form'>" +
"<form name='myscrap_for_admin'></form></li></ul><p><span class='btn_pack_gray small'><a href='javascript:goInsert();'>입력</a></span>&nbsp;<span class='btn_pack_gray small'><a href='javascript:myscrap_close();'>닫기</a></span></p></div>";

//발간보고서 게시판 bid 모음(주간뉴스레터-센터발간자료)
var rep_list = ["tot_rep", "req_rep", "tech_rep", "policy_rep", "industry_rep", "patent_rep", "data_stat", "w_paper"];

//BT 동향 게시판 bid 모음(주간뉴스레터-국내외BT동향 자료)
var trend_list = ["research", "tech", "policy", "industry", "system", "patent"];
$(function(){
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /*, from*/){
			
			var len = this.length >>> 0;
			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			
	    if (from < 0){
	    	from += len;
	    }
	
	    for (; from < len; from++){
	      if (from in this && this[from] === elt){
	    	  return from;
	      }
	    }
	    return -1;
	  };
	}
});

function openMyscrapDiv(bid, seq){
	if($("#myscrap_for_admin").length == 0){

		$("div.board_sns").append(div_format);

		//div form_s
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").attr("action", "/mng/myscrap.do");
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").attr("method", "post");
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input type='hidden' name='bid' value='"+bid+"' />");
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input type='hidden' name='num' value='"+seq+"' />");
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input type='hidden' name='cmd' value='scrap' />");
		//div form_e

		var height_flag = 3;
		//radio 만들어주기s
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' name='code' type='radio' value='daily_today_issue' />&nbsp;일간뉴스레터 - 오늘의이슈<br />");
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='weekly_today_issue' />&nbsp;주간뉴스레터 - 오늘의이슈<br />");

		if($.inArray(bid, rep_list) > 0){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='weekly_rep' />&nbsp;주간뉴스레터-센터발간자료<br />");
			height_flag++;
		}
		if($.inArray(bid, trend_list) > 0){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='weekly_trend' />&nbsp;주간뉴스레터-국내외BT동향<br />");
			height_flag++;
		}
		if(bid == 'report'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_report' />&nbsp;월간뉴스레터-전문가리포트<br />");
			height_flag++;
		}
		if(bid == 'now'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_now' />&nbsp;월간뉴스레터-글로벌와치<br />");
			height_flag++;
		}
		if(bid == 'review'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_review' />&nbsp;월간뉴스레터-발간서View<br />");
			height_flag++;
		}
		if(bid == 'watch'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_watch' />&nbsp;월간뉴스레터-BioIndustry<br />");
			height_flag++;
		}
		if(bid == 'research'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_research' />&nbsp;월간뉴스레터-연구성과, 동향<br />");
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='research' />&nbsp;BT 주요성과<br />");
			height_flag++;
		}
		if(bid == 'forum_info'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='monthly_forum_info' />&nbsp;월간뉴스레터-생명공학정책연구포럼<br />");
			height_flag++;
		}
		if(bid == 'notice' || bid == 'forum_info' || bid == 'professor' || bid == 'not' || bid=='semina'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='event' />&nbsp;국내외행사<br />");
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='semina' />&nbsp;사업공고<br />");
			height_flag++;
		}
		if(bid == 'policy'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='policy' />&nbsp;과학기술정책<br />");
			height_flag++;
		}
		if(bid == 'watch'){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='watch' />&nbsp;BioIndustry<br />");
			height_flag++;
		}
		if(bid=="feature"){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='feature' />&nbsp;이슈&특집<br />");
			height_flag++;
		}
		if(bid == "wordsforum"){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='weekly_today_issue' />&nbsp;주간뉴스레터 - 오늘의이슈<br />");
			height_flag++;
		}
		if(bid == "business"){
			$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='weekly_today_issue' />&nbsp;주간뉴스레터 - 오늘의이슈<br />");
			height_flag++;
		}

		$("div#myscrap_for_admin form[name=myscrap_for_admin]").append("<input name='code' type='radio' value='temp' />&nbsp;상시서비스<br />");;
		// radio 만들어주기e
		
	}
	$("#myscrap_for_admin").slideDown(200);
}

function goInsert(){
	if($("div#myscrap_for_admin select[name=code] :selected").val()==""){
		alert("뉴스레터를 선택하여 주세요.");
	}else{
		$("div#myscrap_for_admin form[name=myscrap_for_admin]").submit();
	}
}

function myscrap_close(){
	$("#myscrap_for_admin").slideUp(200);
}