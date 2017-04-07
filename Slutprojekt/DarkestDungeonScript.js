// JavaScript Document

var owidth = document.getElementById("background1").width;
var oheight = document.getElementById("background1").height;
var cursorx = 0.5;
var cursory = 0.5;
var posx = cursorx;
var posy = cursory;

var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
alert(isTouch);

var olowLeft = new Array();
var olowTop = new Array();
var olowWidth = new Array();
var olowHeight = new Array();
var olowFontSize = new Array();

var ohighLeft = new Array();
var ohighTop = new Array();
var ohighWidth = new Array();
var ohighHeight = new Array();
var ohighFontSize = new Array();

var iter = owidth;
var ms = 0;
var delay = 1500;

$(window).load(function()
{
	ZoomLoop();
	$("#background1").fadeOut(delay);
	
	var sprites = document.getElementsByClassName("fadein");
	for (var i = 0; i < sprites.length; i++)
	{
		$(sprites.item(i)).fadeOut(0).delay(delay).fadeIn(delay).delay(delay);
	}
});
$(document).bind('mousemove',function(e)
{
	cursorx = e.pageX;
	cursory = e.pageY;
});

function ZoomLoop()
{
	setTimeout(function()
	{
		$("#imgcenter").css('left', 36 -(iter - $(window).width()) / 2);
		$("#imgcenter").css('top', $(window).height() * 0.3 -(iter - $(window).height())/3);
		$("#background1").css('width', iter + 'px');
		if($("#background1").is(":visible"))
		{
			ms++;
			iter+=2;
			ZoomLoop();
		}
		if(!$("#background1").is(":visible"))
		{
			$("#imgcenter").css('top', 0);
			$("#imgcenter").css('left', 0);
			ms = 0;
			
			var low = document.getElementsByClassName("parallaxlow");
			for (var i = 0; i < low.length; i++)
			{
				olowLeft[i] = $(low.item(i)).position().left;
				olowTop[i] = $(low.item(i)).position().top;
				olowWidth[i] = low.item(i).width;
				olowHeight[i] = low.item(i).height;
				olowFontSize[i] = parseFloat($(low.item(i)).css("font-size"));
			}
			
			var high = document.getElementsByClassName("parallaxhigh");
			for (var i = 0; i < high.length; i++)
			{
				ohighLeft[i] = $(high.item(i)).position().left;
				ohighTop[i] = $(high.item(i)).position().top;
				ohighWidth[i] = high.item(i).width;
				ohighHeight[i] = high.item(i).height;
				ohighFontSize[i] = parseFloat($(high.item(i)).css("font-size"));
			}
			
			Passive();
		}
	}, 1);
}

var infoboxes = document.getElementsByClassName("infobox");
var infotabs = document.getElementsByClassName("infotab");
for(var i = 0; i < infotabs.length; i++)
{
	$(infotabs.item(i)).css('opacity', 0).css('height', 0).hide();
}

function Passive()
{
	posx += ((0.5 - cursorx / $(window).width()) - posx) * 0.2;
	posy += ((0.5 - cursory / $(window).height()) - posy) * 0.2;
	
	var bg = document.getElementsByClassName("parallaxbg");
	for (var i = 0; i < bg.length; i++)
	{
		$(bg.item(i)).css('left', (posx * owidth * 0.01) - Math.min(Math.pow(owidth / $(window).width() - 1, 0.5) * 800, owidth * 0.75));
		$(bg.item(i)).css('top', (posy * oheight * 0.01));
	}
	
	var low = document.getElementsByClassName("parallaxlow");
	for (var i = 0; i < low.length; i++)
	{
		$(low.item(i)).css('left', olowLeft[i] + (posx * owidth * 0.0125) + $(window).width() * 0.5 - low.item(i).width * 0.5);
		$(low.item(i)).css('top', olowTop[i] + (posy * oheight * 0.0125));
		$(low.item(i)).css('width', olowWidth[i] * Math.pow($(window).width() / owidth, 0.5));
		$(low.item(i)).css('height', olowHeight[i] * Math.pow($(window).width() / owidth, 0.5));
		$(low.item(i)).css('font-size', olowFontSize[i] * Math.pow($(window).width() / owidth, 0.5));
	}
	
	var high = document.getElementsByClassName("parallaxhigh");
	for (var i = 0; i < high.length; i++)
	{
		$(high.item(i)).css('left', ohighLeft[i] + (posx * owidth * 0.015) + $(window).width() * 0.5 - high.item(i).width * 0.5);
		$(high.item(i)).css('top', ohighTop[i] + (posy * oheight * 0.015));
		$(high.item(i)).css('width', ohighWidth[i] * Math.pow($(window).width() / owidth, 0.5));
		$(high.item(i)).css('height', ohighHeight[i] * Math.pow($(window).width() / owidth, 0.5));
		$(high.item(i)).css('font-size', ohighFontSize[i] * Math.pow($(window).width() / owidth, 0.5));
	}
	
	for(var i = 0; i < infotabs.length; i++)
	{
		if(($(infoboxes.item(i)).is(":hover") || $(infotabs.item(i)).is(":hover")) && parseFloat($(infotabs.item(i)).css('opacity')) != 1)
		{
			if(!$(infotabs.item(i)).is(":animated") && !$(infoboxes.item(i)).is(":animated"))
			{
				$(infotabs.item(i)).css('width', $(window).width() * 0.25
												+ (1 - $(window).width() / owidth) * 0.1 * owidth);
				$(infotabs.item(i)).show(0).animate({opacity: 1, height: $(infotabs.item(i)).get(0).scrollHeight}, 500);
			}
		}
	}
	
	for(var i = 0; i < infotabs.length; i++)
	{
		if(!$(infoboxes.item(i)).is(":hover") && !$(infotabs.item(i)).is(":hover") && parseFloat($(infotabs.item(i)).css('opacity')) != 0)
		{
			if(!$(infotabs.item(i)).is(":animated") && !$(infoboxes.item(i)).is(":animated"))
			{
				$(infotabs.item(i)).animate({opacity: 0, height: 0}, 500).hide(0);
			}
		}
	}
	
	$("#info").css('left', $(window).width() - $(window).width() * 0.25 + (posx * owidth * 0.015) - (1 - $(window).width() / owidth) * 0.1 * owidth);
	$("#info").css('top', $(window).height() - $(window).height() * 0.15 + (posy * oheight * 0.015) - $("#info").height());
	
	$("nav").css('left', $(window).width() * -0.01 + (posx * owidth * 0.015));
	$("nav").css('top', $(window).height() * 0.4 + (posy * oheight * 0.015) + Math.pow(($(window).width() / owidth), 5) * -0.15 * oheight);
	$("nav").css('width', $(window).width() * 0.2 + (1 - $(window).width() / owidth) * 0.125 * owidth);
	$("nav").css('height', $(window).height() * 0.75 + (1 - Math.pow($(window).width() / owidth, 2.5)) * -0.15 * oheight);
	
	setTimeout(function()
	{
		ms++;
		Passive();
	}, 1);
}
