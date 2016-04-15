// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require bootstrap-datepicker
//= require turbolinks
//= require_tree 

$(document).ready(function(){
  $('.datepicker').datepicker();
 })

$(document).ready(function(){
	birthdate = new Date($("#birthdate").attr("title"));
}); 
var heightAdditions = [];
var heightDeletions = [];
var weightAdditions = [];
var weightDeletions = [];
var editted = false;
var counter = 0;
chartAdditions = {"height": heightAdditions, "weight": weightAdditions};
chartDeletions = {"height": heightDeletions, "weight": weightDeletions};


function addHeight(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="newHeight" type="text" size="15" class="input-sm form-control pull-left" value="" placeholder="cm"/> \
														</span> \
													</td> \
													<td>"Let us do the math"</td> \
													<td> \
														<span class="form-inline"> \
															<span class="input-group"> \
																<input type="text" size="20" class="date-chooser input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
																<span class="input-group-addon"> \
																	<span class="fa fa-floppy-o" onclick="saveHeight(this,' + "'newHeight'" + ')"></span> \
																</span> \
															</span> \
															<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteHeight(this,' + "'newHeight'" + ')">Cancel</button> \
														</span> \
													</td>';
	}

function saveHeight(element,heightID){
	var heightValue = String(document.getElementById(heightID).value);
	var heightDate = new Date(element.parentElement.previousElementSibling.value);
	var heightAge = (heightDate - birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + heightValue + " cm" + '</td> \
																				<td>' + Math.round(heightAge) + ' Months </td> \
																				<td>' + heightDate.toDateString().slice(4) + '<i id="pushedHeight' + heightValue + '" class="fa fa-pencil pull-right" onclick="deleteHeight(this,this.id)"></i></td>';
	var bt = document.createElement("tr");
	bt.innerHTML = 	'<td colspan="3"> \
						<button type="button" class="btn btn-info" onclick="addHeight(this)">Add Height</button> \
					</td>';
	document.getElementById("heightBody").appendChild(bt);
	heightAdditions.push([heightValue,heightDate.toISOString()]);
	changeSaveButton();
}

function deleteHeight(element,heightID){
	document.getElementById("heightBody").removeChild(element.parentElement.parentElement.parentElement);
	if (heightID == "newHeight") {
		var bt = document.createElement("tr");
		bt.innerHTML = 	'<td colspan="3"> \
							<button type="button" class="btn btn-info" onclick="addHeight(this)">Add Height</button> \
						</td>';
		document.getElementById("heightBody").appendChild(bt);
	} else if (heightID.slice(0,12) == "pushedHeight") {
		var pushedHeightIndex = findIndex(vaccineAdditions,vaccID.slice(13));
		heightAdditions.splice(pushedHeightIndex,1);
	} else {
		heightDeletions.push(heightID);
		changeSaveButton();
	}
}

function changeSaveButton(){
	if (editted == false) {
		document.getElementById("saveChangesButton").className = "btn btn-success";
		editted = true;
	}
}

function updateFormData2(){
	$("#formData").val(JSON.stringify({"additions":chartAdditions, "deletions":chartDeletions}));
}

function findIndex(array,firstItem){
	for (i = 0; i < array.length; i++) {
		if (array[i][0] == firstItem) {
			return i;
		}
	}
}


