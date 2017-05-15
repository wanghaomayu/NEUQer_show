//管理版块js
var FeiChao = window.FeiChao ||{};
FeiChao.Organ = function(){
document.onreadystatechange = Organadvert;
    function Organadvert() {
        var ad = document.getElementsByClassName("adleft");
        var adlength = ad.length;
            for(var i=0;i<adlength;i++)
            {
                var adid = ad[i].id = 'ad'+i;
                if(adid)
                {
                    var nid = document.getElementById(adid);
                    nid.onmouseover=function () {
                        for (var i = 0; i < ad.length; i++) {
                            var tfc  = this.lastElementChild;
                        	ad[i].style.background = '#eeeeee'
                            this.style.background = '#fff'
                            tfc.style.transform = 'rotate(360deg)';
                            tfc.style.transition = '1s';
                            fadein(tfc);
                            var tfl  = this.firstElementChild;
                            tfl.style.transform = 'rotate(360deg)';
                            tfl.style.transition = '1s';
                    }
                }
                    nid.onmouseout=function() {
                        for (var i = 0; i < ad.length; i++) {
                            var tfc  = this.lastElementChild;
                            tfc.display = 'none';
                        	ad[i].style.background = '#fff'
                        	tfc.style.transform = 'rotate(0deg)';
                        	fadeout(tfc);
                            var tfl  = this.firstElementChild;
                            tfl.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            }
    }
}

//fadein
function fadein(el)
{
	el.style.opacity = 0;
	el.style.display = "";
	var last = +new Date();
	var tick = function()
	{
		el.style.opacity = +el.style.opacity + (new Date() - last);
		last = +new Date();
		if(+el.style.opacity >0)
		{
			(window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick,16));
		}
	}
}

// fadeout
function fadeout(el)
{
	el.style.opacity = 1;
	el.style.display = "";
	var last = +new Date();
	var tick = function()
	{
		el.style.opacity = +el.style.opacity + (new Date() - last);
		last = +new Date();
		if(+el.style.opacity <1)
		{
			(window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick,16));
		}
	}
}
