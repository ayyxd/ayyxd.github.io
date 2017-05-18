// JavaScript Document

// Font Size
size();
$(window).resize(
	function()
	{
		size();
	});
function size()
{
	var val;
	if($(window).width() > 980)
		val = Math.pow($(window).width() / 1920, 0.3);
	else
		val = Math.pow($(window).width() / 1200, 0.3);
	$("#back").css("font-size", (val * 100) + "%").css("line-height", ((val * 100) + 150) + "%");
}

// Node Text
$("#nodetext1").hide();
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
	});

// Characters
$("#crusader").click(
	function()
	{
		alert("crusader");
	});
$("#plaugedoctor").click(
	function()
	{
		alert("plaugedoctor");
	});
$("#occultist").click(
	function()
	{
		alert("occultist");
	});
$("#highwayman").click(
	function()
	{
		alert("highwayman");
	});