// JavaScript Document

$("#crusader").click(function()
{
	alert("c");
});

$("#plaugedoctor").click(function()
{
	alert("p");
});

$("#occultist").click(function()
{
	alert("o");
});

$("#highwayman").click(function()
{
	alert("h");
});

var node1 = false;
$("#node1").css("height", 0).css("opacity", 0).hide(0);
$("#node1").click(function()
{
	if(!$("#node1").is(":animated"))
	{
		node1 = !node1;
		if(node1)
		{
			alert("show");
			alert($("#node1").get(0).scrollHeight);
			$("#node1").show(0).animate({height:$("#node1").get(0).scrollHeight, opacity:1}, 500);
			alert("A");
		}
		else
		{
			$("#node1").animate({height:0, opacity:0}, 500).hide(0);
		}
	}
});