// JavaScript Document

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