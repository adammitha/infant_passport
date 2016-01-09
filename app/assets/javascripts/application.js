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
var developmentChanges = [];
var feedingChanges = [];
var vaccineChanges = [];
var vaccineAdditions = [];
var vaccineDeletions = [];
var allergyChanges = [];
var allergyAdditions = [];
var allergyDeletions = [];
var birthdate = new Date("05/18/1997");
var editted = false;
additions = {"vaccine": vaccineAdditions, "allergy": allergyAdditions};
changes = {"development": developmentChanges, "feeding": feedingChanges, "vaccine": vaccineChanges, "allergy": allergyChanges};
deletions = {"vaccine": vaccineDeletions, "allergy":allergyDeletions};


function editFunc(element,devnum){
	if (devnum.slice(0,3) == "dev" || devnum.slice(0,3) == "fed") {
		element.parentElement.innerHTML = '<span> \
											<span class="input-group"> \
												<input type="text" size="12" class="input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker"/> \
												<span class="input-group-addon"> \
													<span id="' + devnum + '" class="fa fa-floppy-o" onclick="saveFunc(this,this.id)"></span> \
												</span> \
											</span>\
										</span> ';
	} else {
		element.parentElement.innerHTML = '<span class="form-inline"> \
												<span class="input-group"> \
													<input type="text" size="20" class="input-sm form-control" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" /> \
													<span class="input-group-addon"> \
														<span id="' + devnum + '" class="fa fa-floppy-o" onclick="saveFunc(this,this.id)"></span> \
													</span> \
												</span> \
												<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + devnum + ')">Delete</button> \
											</span> ' ;
	}
	}
function saveFunc(element,devnum){
	birthdate = new Date($("#birthdate").attr("title"));
	var eventDate = new Date(String(element.parentElement.previousElementSibling.value));
	var eventAge = (eventDate-birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML = Math.round(eventAge) + " Months";
	element.parentElement.parentElement.parentElement.innerHTML = eventDate.toDateString().slice(4) + '<i id="' + devnum + '" \
																class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i>';
	if (devnum.slice(0,2) == "dev") {
	developmentChanges.push([devnum,eventDate.toISOString()]);
	} else if (devnum.slice(0,2) == "fed") {
	feedingChanges.push([devnum,eventDate.toISOString()]);
	} else {
	vaccineChanges.push([devnum,eventDate.toISOString()]);
	}
	if (editted == false){
		changeSaveButton();
	}
	}

function addVacc(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="nameElement" type="text" size="15" class="input-sm form-control pull-left" value="" placeholder="Vaccine"/> \
														</span> \
													</td> \
													<td> Let us handle the math </td> \
													<td> \
														<span class="input-group"> \
															<input type="text" size="12" class="input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker"/> \
															<span class="input-group-addon"> \
																<span class="fa fa-floppy-o" onclick="saveVacc(this,' + "'nameElement'" + ')"></span> \
															</span> \
														</span> \
													</td>';
	}

function saveVacc(element,vaccID){
	var vaccName = String(document.getElementById(vaccID).value);
	var vaccDate = new Date(element.parentElement.previousElementSibling.value);
	var vaccAge = (vaccDate - birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + vaccName + '</td> \
																				<td>' + Math.round(vaccAge) + ' Months </td> \
																				<td>' + vaccDate.toDateString().slice(4) + '<i id="vac' + vaccName + '" class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i></td>';
	var bt = document.createElement("tr");
	bt.innerHTML = 	'<td colspan="3"> \
						<button type="button" class="btn btn-info" onclick="addVacc(this)">Add Vaccine</button> \
					</td>';
	document.getElementById("vaccineBody").appendChild(bt);
	vaccineAdditions.push([vaccName,vaccDate.toISOString()]);
	if (editted == false){
		changeSaveButton();
	}
}

function deleteVacc(element,vaccID){
	document.getElementById("vaccineBody").removeChild(element.parentElement.parentElement.parentElement);
	vaccineDeletions.push(vaccID);
	if (editted == false){
		changeSaveButton();
	}
}

function addAllergy(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="newAllergen" type="text" size="10" class="input-sm form-control pull-left" value="" placeholder="Allergen"/> \
														</span> \
													</td> \
													<td> \
														<span class="form-inline"> \
															<span class="input-group"> \
																  <span class="input-group-addon"> \
																		<span class="fa fa-floppy-o" onclick="saveAllergy(this,' + "'newAllergen','sel1'" + ')"></span> \
																  </span> \
																  <select class="form-control input-sm" id="sel1"> \
																	<option>Mild</option> \
																	<option>Moderate</option> \
																	<option>Severe</option> \
																	<option>Unknown</option> \
																  </select> \
															</span> \
															<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteAllergy(this,' + "'newAllergen'" + ')">Delete</button> \
														</span>\
													</td>';
	}

function saveAllergy(element,allergenID,severityID){
	var allergyName = "";
	var allergySeverityIndex = document.getElementById(severityID).selectedIndex;
	var allergySeverity = "Unknown";
	if (allergenID == "newAllergen") {
		allergyName = String(document.getElementById(allergenID).value);
	} else {
		allergyName = allergenID;
	}
	if (allergySeverityIndex == 0){
		allergySeverity = "Mild";
	} else if (allergySeverityIndex == 1) {
		allergySeverity = "Moderate";
	} else if (allergySeverityIndex == 2) {
		allergySeverity = "Severe";
	} else {
		allergySeverity = "Unknown";
	};
	document.getElementById(severityID).parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + allergyName + '</td> \
																								<td>' + allergySeverity + '<i id="' + allergyName + '" class="fa fa-pencil pull-right" onclick="editAllergy(this,this.id)"></i></td>';
	if (allergenID == "newAllergen"){
		var bt = document.createElement("tr");
		bt.innerHTML = 	'<td colspan="3"> \
							<button type="button" class="btn btn-info" onclick="addAllergy(this)">Add Allergy</button> \
						</td>';
		document.getElementById("allergyBody").appendChild(bt);
		allergyAdditions.push([allergyName,allergySeverityIndex]);
	} else {
	allergyChanges.push([allergyName,allergySeverityIndex]);
	}
	if (editted == false){
		changeSaveButton();
	}
}

function editAllergy(element,allergenID){
	element.parentElement.innerHTML = 	'<span class="form-inline"> \
											<span class="input-group"> \
												  <span class="input-group-addon"> \
														<span class="fa fa-floppy-o" onclick="saveAllergy(this,' + "'" + allergenID + "'" + ",'sel2'" + ')"></span> \
												  </span> \
												  <select class="form-control input-sm" id="sel2"> \
													<option>Mild</option> \
													<option>Moderate</option> \
													<option>Severe</option> \
													<option>Unknown</option> \
												  </select> \
											</span> \
											<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteAllergy(this,' + "'" + allergenID + "'" + ')">Delete</button> \
										</span>'
}

function deleteAllergy(element,allergenID){
	document.getElementById("allergyBody").removeChild(element.parentElement.parentElement.parentElement);
	allergyDeletions.push(allergenID);
	if (editted == false){
		changeSaveButton();
	}
}

function changeSaveButton(){
	document.getElementById("saveChangesButton").className = "btn btn-success";
	editted = true;
}

function updateFormData(){
	$("#formData").val(JSON.stringify({"additions": additions, "changes":changes, "deletions":deletions}));
}
