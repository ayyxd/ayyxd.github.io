// JavaScript Document

// Variables
var sw = 0;
var scrollUp = 0;
var mobile = $(".front").css("float") === "none";

// Font Size
Size();
$(window).resize(
	function()
	{
		Size();
	});
function Size()
{
	mobile = $(".front").css("float") === "none";
	var val;
	if(!mobile)
	{
		val = Math.pow($(window).width() / 1920, 0.3);
	}
	else
	{
		val = Math.pow($(window).width() / 1200, 0.3);
	}
	$(".back").css("font-size", (val * 100) + "%").css("line-height", ((val * 100) + 150) + "%");
}

Passive();
function Passive()
{
	var backs = document.getElementsByClassName("back");
	if(!$(".back").is(":animated"))
	{
		var scrollh = backs.item(sw).scrollHeight > $("nav").get(0).scrollHeight ? backs.item(sw).scrollHeight : $("nav").get(0).scrollHeight;
		$("footer").css("top", scrollh + $("footer").height() + (mobile ? $("#side").height() : 0));
		
		if(mobile)
		{
			$("#side").css("top", scrollh - $("footer").height());
			$("#side").css("left", 0);
		}
		else
		{
			$("#side").css("top", 0);
			if(sw > 0)
			{
				$("#side").css("left", "70%");
			}
		}
	}
	
	if(scrollUp > 0)
	{
		if(window.scrollY === scrollUp)
		{
			scrollUp = Math.round(scrollUp * 0.96);
			scrollUp -= 1;
			window.scrollTo(window.scrollX, scrollUp);
		}
		else
		{
			scrollUp = 0;
		}
	}
	
	setTimeout(function()
	{
		Passive();
	}, 1);
}

// Node Text
$(".nodetext").hide();
var nodetitles = document.getElementsByClassName("nodetitle");
var nodetexts = document.getElementsByClassName("nodetext");

for(var i = 0; i < nodetitles.length; i++)
{
	BindNode(i);
}

function BindNode(i)
{
	$(nodetitles.item(i)).click(function()
	{
		$(nodetexts.item(i)).slideToggle(600);
	});
}

/*$("#nodetext1").hide();
$("#nodetext2").hide();
$("#nodetext3").hide();

$("#node1").click(function()
	{
		$("#nodetext1").slideToggle(600);
	});
$("#node2").click(function()
	{
		$("#nodetext2").slideToggle(600);
	});
$("#node3").click(function()
	{
		$("#nodetext3").slideToggle(600);
	}); // todo make this thing dynamic so you can add more characters or whatnot*/

// Characters
$("#crusader").click(
	function()
	{
		Switch(1);
	});
$("#plaugedoctor").click(
	function()
	{
		Switch(2);
	});
$("#occultist").click(
	function()
	{
		Switch(3);
	});
$("#highwayman").click(
	function()
	{
		Switch(4);
	});

function Switch(i)
{
	var backs = document.getElementsByClassName("back");
	if(!$(backs.item(i)).is(":animated"))
	{
		// Save Switch State
		if(sw === i)
		{
			i = 0;
		}
		sw = i;
		
		// Scroll Up
		scrollUp = window.scrollY;
		
		// Page Transition
		var offset = parseFloat($(backs.item(i)).css("left")) / $(window).width() * 100;
		$(".back").animate({left: "-=" + offset + "%"}, 1000);
		if(i > 0)
		{
			if($("#side").css("left") === "0px" && !mobile)
			{
				$("#side").animate({left: "+=70%"}, 1000);
			}
		}
		else
		{
			if($("#side").css("left") !== "0px")
			{
				$("#side").animate({left: "0%"}, 1000);
			}
		}
		
		// Text Home Transition
		if(i===1)
		{
			$("#crusader span").fadeOut(
				function()
				{
					$(this).text("Home").fadeIn();
				});
		}
		else if($("#crusader span").text() !== "Crusader")
		{
			$("#crusader span").fadeOut(
				function()
				{
					$(this).text("Crusader").fadeIn();
				});
		}
		if(i===2)
		{
			$("#plaugedoctor span").fadeOut(
				function()
				{
					$(this).text("Home").fadeIn();
				});
		}
		else if($("#plaugedoctor span").text() !== "Plauge Doctor")
		{
			$("#plaugedoctor span").fadeOut(
				function()
				{
					$(this).text("Plauge Doctor").fadeIn();
				});
		}
		if(i===3)
		{
			$("#occultist span").fadeOut(
				function()
				{
					$(this).text("Home").fadeIn();
				});
		}
		else if($("#occultist span").text() !== "Occultist")
		{
			$("#occultist span").fadeOut(
				function()
				{
					$(this).text("Occultist").fadeIn();
				});
		}
		if(i===4)
		{
			$("#highwayman span").fadeOut(
				function()
				{
					$(this).text("Home").fadeIn();
				});
		}
		else if($("#highwayman span").text() !== "Highwayman")
		{
			$("#highwayman span").fadeOut(
				function()
				{
					$(this).text("Highwayman").fadeIn();
				});
		}
	}
}