var item = [];

function insert(text){
	$(".list tbody").append('<tr class="task"><td><img class="done" src="done.gif"></td><td class="taskItem">'+text+'</td><td><img class="remove" src="remove.png"></td></tr>');
}

function addTask(index, stat, text){
	insert(text);
	if(stat == 1){
		$(".list tbody tr:nth-child("+index+")").find(".done").addClass("appear");
		$(".list tbody tr:nth-child("+index+")").find("td:nth-child(2)").addClass("line");
	}
}

function init(){
	var data = localStorage.getItem('todo');
	if(data != null && data != ""){
		if(data[data.length-1] == ","){
			data = data.slice(0,data.length-1);
		}
		data = data.split(',');
		for(var i = 0; i < data.length; i += 2){
			item.push([data[i],data[i+1]]);
		}
		for(var i = 0; i < item.length; ++i){
			addTask(i+1,item[i][0],item[i][1]);
		}
	}
}

function store(val){
	item.push([0,val]);
}

function check(index){
	if(item[index][0] == 1)
		item[index][0] = 0;
	else
		item[index][0] = 1;
}

function all(status){
	for(var i = 0; i < item.length; ++i){
		item[i][0] = status;
	}
}

function del(index){
	var temp = [];
	if(index == 0){
		temp = item.slice(index+1,item.length);
	}
	else if(index == item.length-1){
		temp = item.slice(0,item.length-1);
	}
	else{
		temp = item.slice(0,index);
		temp.push(item.slice(index+1,item.length));
	}
	item = temp;
}

function update(){
	localStorage.setItem('todo', item);
}

function removeAppear(){
	$(this).find(".remove").toggleClass("appear");}

function updateVal(current, value){
	$(current).html('<input class="edit" type="text" value="' + value + '">');
	$(".edit").focus();
	$(".edit").keyup(function (event) {
		if (event.keyCode == 13) {
			$(current).html($(".edit").val().trim());
		}
	});

	$(document).click(function () {
		$(current).html($(".edit").val().trim());
	});
}

$(document).ready(function(){

	init();

	$(".input").keyup(function (e) {
		if (e.keyCode == 13) {
			if ($(".input").val() !== "") {
				insert($(".input").val().trim());
				store($(this).val());
				update();
				$(".input").val("");
			}
		}
	});
	
	$(".remove").live("click", function(){
		del($(this).closest("tr").index());
		update();
		$(this).closest("tr").remove();
	});
	
	$(".task").live("mouseenter mouseleave", removeAppear);

	$(".done").live("click", function(){
		$(this).toggleClass("appear");
		$(this).closest("tr").find("td:nth-child(2)").toggleClass("line");
		check($(this).closest("tr").index());
		update();
	});

	$(".doneall").live("click", function(){
		if($(this).hasClass("appear")){
			$(".done,.doneall").removeClass("appear");
			$(".taskItem").removeClass("line");
			all(0);
		}
		else{
			$(".done,.doneall").addClass("appear");
			$(".taskItem").addClass("line");
			all(1);
		}
		update();
	});

	$(".taskItem").live("dblclick", function(e){
		var current = $(this);
		var value = $(this).html();
		updateVal(current, value);
	});
});