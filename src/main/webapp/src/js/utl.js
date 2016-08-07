//倒计时实现
function checkTime(){
    if(fm == 0 && lm == 0 && fs == 0 && ls == 0){
        $.alert('时间到，请点击交卷', function () {
            $.router.load("./grade.html");
        });
    }else{
        fm = checkfm(fm,lm,fs,ls);
        lm = checklm(lm,fs,ls);
        fs = checkfs(fs,ls);
        ls = checkls(ls);
    }
    for (var j = 0; j < time.length; j++) {
        var each = time[j].innerHTML=fm +''+ lm + ':' + fs+'' + ls;
    }
    return each;
};

function checkls(ls){
   if(ls == 0){
      ls = 9;
   }else{
      ls--;
   }
   return ls;
 };
function checkfs(fs,ls){
   if(fs == 0 && ls ==0){
     fs = 5;
   }else if(ls == 0){
     fs--;
   }else{
     return fs;
   }
   return fs;
 };
function checklm(lm,fs,ls){
   if(lm == 0 && ls == 0 && fs == 0){
     lm = 9;
   }else if(ls== 0 &&fs == 0){
     lm--;
   }else{
     return lm;
   }
   return lm;
 };
function checkfm(fm,lm,fs,ls){
   if(lm == 0 && fs == 0 && ls == 0 ){
     fm--;
   }
   return fm;
 };
 //数组删除特定字符方法
 Array.prototype.remove = function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
    this.splice(a, 1);
    return true;
    }
    return false;
    };
//模拟测试音频的播放实现
function audio_play(){
   var audio = $(this).find('audio');
   audio[0].play();
   audio[0].onended = function(){
     $('.playn').show();
     $('.stopn').hide();
   }
 }
