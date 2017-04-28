// JavaScript Document

var owidth = document.getElementById("background1").width;
var oheight = document.getElementById("background1").height;
var otitlewidth = document.getElementById("title").width;
var otitleheight = document.getElementById("title").height;
var cursorx = 0.5;
var cursory = 0.5;
var posx = cursorx;
var posy = cursory;

var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

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
	owidth = document.getElementById("background1").width;
	oheight = document.getElementById("background1").height;
	otitlewidth = document.getElementById("title").width;
	otitleheight = document.getElementById("title").height;
	ZoomLoop();
	$("#background1").fadeOut(delay);
	
	var sprites = document.getElementsByClassName("fadein");
	for (var i = 0; i < sprites.length; i++)
	{
		$(sprites.item(i)).fadeOut(0).delay(delay).fadeIn(delay).delay(delay);
	}
});
if(!isTouch)
{
	$(document).bind('mousemove',function(e)
	{
		cursorx = e.pageX;
		cursory = e.pageY;
	});
}

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
	$(infotabs.item(i)).css('opacity', 0).css('height', 0).hide(0);
}

var ratio = (1 - $(window).height() / oheight);
$("nav").css('left', $(window).width() * -0.01 + (posx * owidth * 0.015));
$("nav").css('top', $(window).height() * 0.25 + (posy * oheight * 0.015) + Math.pow(($(window).width() / owidth), 5) * -0.1 * $(window).height() + ratio * oheight * 0.1);
$("nav").css('width', $(window).width() * 0.2 + (1 - $(window).width() / owidth) * 0.125 * owidth);
var navwidth = $(window).width() * 0.2 + (1 - $(window).width() / owidth) * 0.125 * owidth;
var nratio = Math.pow(navwidth / owidth, 3.5);
$("nav").css('height', nratio * oheight * 46 * 4);
$(".character").css('height', nratio * oheight * 42);
$(".character").css('margin-bottom', nratio * oheight * 4);

var characternames = document.getElementsByClassName("character_name");
var characters = document.getElementsByClassName("character");

function Passive()
{
	posx += ((0.5 - cursorx / $(window).width()) - posx) * 0.2;
	posy += ((0.5 - cursory / $(window).height()) - posy) * 0.2;
	
	navwidth = $(window).width() * 0.2 + (1 - $(window).width() / owidth) * 0.125 * owidth;
	nratio = Math.pow(navwidth / owidth, 3.5);
	ratio = (1 - $(window).height() / oheight);
	
	var bg = document.getElementsByClassName("parallaxbg");
	for (var i = 0; i < bg.length; i++)
	{
		$(bg.item(i)).css('left', (posx * owidth * 0.0075) - Math.min(Math.pow(owidth / $(window).width() - 1, 0.5) * 800, owidth * 0.75));
		$(bg.item(i)).css('top', (posy * oheight * 0.0075));
	}
	
	var high = document.getElementsByClassName("parallaxhigh");
	for (var i = 0; i < high.length; i++)
	{
		$(high.item(i)).css('left', ohighLeft[i] + (posx * owidth * 0.0125) + $(window).width() * 0.5 - high.item(i).width * 0.5);
		$(high.item(i)).css('top', ohighTop[i] + (posy * oheight * 0.0125));
		$(high.item(i)).css('width', ohighWidth[i] * Math.pow($(window).width() / owidth, 0.6));
		$(high.item(i)).css('height', ohighHeight[i] * Math.pow($(window).width() / owidth, 0.6));
		$(high.item(i)).css('font-size', ohighFontSize[i] * Math.pow($(window).width() / owidth, 0.6));
	}
	
	var navvisible = true;
	for(var i = 0; i < infotabs.length; i++)
	{
		if($(infoboxes.item(i)).is(":hover") || $(infotabs.item(i)).is(":hover")
			|| $(infotabs.item(i)).is(":focus") || $(infoboxes.item(i)).is(":focus"))
		{
			if(!$(infotabs.item(i)).is(":animated") && !$(infoboxes.item(i)).is(":animated") && parseFloat($(infotabs.item(i)).css('opacity')) != 1)
			{
				$(infotabs.item(i)).css('width', $(window).width() * 0.25
												+ (1 - $(window).width() / owidth) * 0.1 * owidth);
				$(infotabs.item(i)).show(0).animate({opacity: 1, height: $(infotabs.item(i)).get(0).scrollHeight}, 500);
			}
			navvisible = false;
		}
	}
	
	for(var i = 0; i < infotabs.length; i++)
	{
		if(!$(infoboxes.item(i)).is(":hover") && !$(infotabs.item(i)).is(":hover")
			&& !$(infoboxes.item(i)).is(":focus") && !$(infotabs.item(i)).is(":focus"))
		{
			if(!$(infotabs.item(i)).is(":animated") && !$(infoboxes.item(i)).is(":animated") && parseFloat($(infotabs.item(i)).css('opacity')) != 0)
			{
				$(infotabs.item(i)).animate({opacity: 0, height: 0}, 500).hide(0);
			}
		}
	}
	
	if(!navvisible && $(window).width() < 600)
	{
		if(!$("nav").is(":animated") && $("nav").is(":visible"))
		{
			$("nav").animate({opacity: 0, width: navwidth * 0.2}, 500).hide(0);
		}
	}
	else if(!$("nav").is(":animated") && !$("nav").is(":visible"))
	{
		$("nav").show(0).animate({opacity: 1, width: navwidth}, 500);
	}
	else if(!$("nav").is(":animated"))
	{
		$("nav").css('width', $(window).width() * 0.2 + (1 - $(window).width() / owidth) * 0.125 * owidth);
		$("nav").css('height', nratio * oheight * 60 * 4);
		$(".character").css('height', nratio * oheight * 42);
		$(".character").css('margin-bottom', nratio * oheight * 4);
	}
	
	if(!isTouch)
	{
		for(var i = 0; i < characternames.length; i++)
		{
			if($(characternames.item(i)).is(":hover") || $(characters.item(i)).is(":hover")
				|| $(characternames.item(i)).is(":focus") || $(characters.item(i)).is(":focus"))
			{
				if(!$(characternames.item(i)).is(":animated") && parseFloat($(characternames.item(i)).css('opacity')) != 1)
				{
					$(characternames.item(i)).animate({opacity:1}, 500);
				}
			}
			else
			{
				if(!$(characternames.item(i)).is(":animated") && parseFloat($(characternames.item(i)).css('opacity')) != 0)
				{
					$(characternames.item(i)).animate({opacity:0}, 500);
				}
			}
		}
	}
	else
	{
		if(!$(characternames.item(i)).is(":animated") && parseFloat($(characternames.item(i)).css('opacity')) != 1)
		{
			$(characternames.item(i)).animate({opacity:1}, 500);
		}
	}
	
	for(var i = 0; i < characternames.length; i++)
	{
		if($(characternames.item(i)).is(":hover") || $(characters.item(i)).is(":hover")
			|| $(characternames.item(i)).is(":focus") || $(characters.item(i)).is(":focus"))
		{
			$(characternames.item(i)).css('left', (posx * owidth * 0.015));
			$(characternames.item(i)).css('top', (posy * oheight * 0.015));
		}
	}
	
	$("nav").css('left', $(window).width() * -0.01 + (posx * owidth * 0.01));
	$("nav").css('top', $(window).height() * 0.25 + (posy * oheight * 0.01) + Math.pow(($(window).width() / owidth), 5) * -0.08 * $(window).height() + ratio * oheight * 0.025);
	$("#chartext").css('left', (navwidth - $("#chartext").get(0).scrollWidth) * 0.5);
	
	$("#title").css('width', otitlewidth * Math.pow($(window).width() / owidth, 0.6));
	$("#title").css('height', otitleheight * Math.pow($(window).width() / owidth, 0.6));
	$("#title").css('left', ($(window).width() * 0.5 - $("#title").width() * 0.5) + (posx * owidth * 0.01));
	$("#title").css('top', oheight * 0.05 * Math.pow($(window).width() / owidth, 0.6) + (posy * oheight * 0.01));
	
	$("#subtitle").css('height', oheight * 0.075 * Math.pow($(window).width() / owidth, 0.6));
	$("#subtitle").css('width', owidth * 0.25 * Math.pow($(window).width() / owidth, 0.6));
	var ratio1 = Math.pow($(window).width() / owidth, 0.6);
	var ratio2 = Math.pow($(window).width() / owidth, 2);
	$("#subtitle").css('left', $(window).width() * 0.5 - $("#subtitle").width() * 0.5 + ratio1 * owidth * 0.125 + ratio2 * 0.05 * owidth + (posx * owidth * 0.01));
	$("#subtitle").css('top', Math.pow($(window).width() / owidth, 0.6) * 0.3125 * oheight + (posy * oheight * 0.01) + 0.02 * oheight);
	
	$("#info").css('left', $(window).width() - $(window).width() * 0.25 + (posx * owidth * 0.015) - (1 - $(window).width() / owidth) * 0.1 * owidth);
	$("#info").css('top', $(window).height() - $(window).height() * 0.15 + (posy * oheight * 0.015) - $("#info").height() + (1 - $(window).width() / owidth) * 0.075 * oheight);
	
	setTimeout(function()
	{
		ms++;
		Passive();
	}, 1);
}