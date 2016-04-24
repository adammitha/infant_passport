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

//= require_tree
$(document).ready(function(){
	birthdate = new Date($("#birthdate").attr("title"));
	milestones = $.parseJSON($("#milestones").attr("title"));
});
var developmentAdditions = [];
var developmentChanges = [];
var feedingAdditions = [];
var feedingChanges = [];
var vaccineChanges = [];
var vaccineAdditions = [];
var vaccineDeletions = [];
var allergyChanges = [];
var allergyAdditions = [];
var allergyDeletions = [];
var editted = false;
var counter = 0;
var milestones = [];
additions = {"vaccine": vaccineAdditions, "allergy": allergyAdditions, "development": developmentAdditions, "feeding": feedingAdditions};
changes = {"development": developmentChanges, "feeding": feedingChanges, "vaccine": vaccineChanges, "allergy": allergyChanges};
deletions = {"vaccine": vaccineDeletions, "allergy":allergyDeletions};

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function editFunc(element,devnum){
	if (devnum.slice(0,3) == "dev" || devnum.slice(0,3) == "fed") {
		element.parentElement.innerHTML = '<span> \
											<span class="input-group"> \
												<input type="text" size="12" class="date-chooser input-sm form-control" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
												<span class="input-group-addon"> \
													<span id="' + devnum + '" class="fa fa-floppy-o" onclick="saveFunc(this,this.id)"></span> \
												</span> \
											</span>\
										</span> ';
	} else {
		element.parentElement.innerHTML = '<span class="form-inline"> \
												<span class="input-group"> \
													<input type="text" size="20" class="date-chooser input-sm form-control" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
													<span class="input-group-addon"> \
														<span id="' + devnum + '" class="fa fa-floppy-o" onclick="saveFunc(this,this.id)"></span> \
													</span> \
												</span> \
												<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + "'" + devnum + "'" + ')">Delete</button> \
											</span> ' ;
	}
}

function saveFunc(element,devnum){
	var eventDate = new Date(String(element.parentElement.previousElementSibling.value));
	var eventAge = (eventDate-birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML = Math.round(eventAge) + " Months";
	element.parentElement.parentElement.parentElement.innerHTML = eventDate.toDateString().slice(4) + '<i id="' + devnum + '" \
																class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i>';
	if (devnum.slice(0,3) == "dev") {
		if (isInArray(devnum,milestones)) {
			developmentChanges.push([devnum,eventDate.toISOString()]);
		}	else {
			developmentAdditions.push([devnum,eventDate.toISOString()]);
		}
	} else if (devnum.slice(0,3) == "fed") {
		if (isInArray(devnum,milestones)) {
			feedingChanges.push([devnum,eventDate.toISOString()]);
		} else {
			feedingAdditions.push([devnum,eventDate.toISOString()]);
		}
	} else if (devnum.slice(0,10) == "pushedVacc") {
		var pushedVaccineIndex = findIndex(vaccineAdditions,devnum.slice(11)) 	;
		vaccineAdditions[pushedVaccineIndex] = [devnum.slice(11),birthdate.toISOString()];
	} else {
	vaccineChanges.push([devnum,eventDate.toISOString()]);
	}
	changeSaveButton();
}

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
