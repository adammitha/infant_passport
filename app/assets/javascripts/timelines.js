//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){
  $('.datepicker').datepicker();
 })

$(document).ready(function(){
	birthdate = new Date($("#birthdate").attr("title"));
}); 

var developmentChanges = [];
var feedingChanges = [];
var vaccineChanges = [];
var vaccineAdditions = [];
var vaccineDeletions = [];
var allergyChanges = [];
var allergyAdditions = [];
var allergyDeletions = [];
var editted = false;
var counter = 0;
additions = {"vaccine": vaccineAdditions, "allergy": allergyAdditions};
changes = {"development": developmentChanges, "feeding": feedingChanges, "vaccine": vaccineChanges, "allergy": allergyChanges};
deletions = {"vaccine": vaccineDeletions, "allergy":allergyDeletions};


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
	developmentChanges.push([devnum,eventDate.toISOString()]);
	} else if (devnum.slice(0,3) == "fed") {
	feedingChanges.push([devnum,eventDate.toISOString()]);
	} else if (devnum.slice(0,10) == "pushedVacc") {
		var pushedVaccineIndex = findIndex(vaccineAdditions,devnum.slice(11)) 	;
		vaccineAdditions[pushedVaccineIndex] = [devnum.slice(11),birthdate.toISOString()];
	} else {
	vaccineChanges.push([devnum,eventDate.toISOString()]);
	}
	changeSaveButton();
}

function addVacc(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="newVacc" type="text" size="15" class="input-sm form-control pull-left" value="" placeholder="Vaccine"/> \
														</span> \
													</td> \
													<td> Let us handle the math </td> \
													<td> \
														<span class="form-inline"> \
															<span class="input-group"> \
																<input type="text" size="20" class="date-chooser input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
																<span class="input-group-addon"> \
																	<span class="fa fa-floppy-o" onclick="saveVacc(this,' + "'newVacc'" + ')"></span> \
																</span> \
															</span> \
															<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + "'newVacc'" + ')">Cancel</button> \
														</span> \
													</td>';
	}

function saveVacc(element,vaccID){
	var vaccName = String(document.getElementById(vaccID).value);
	var vaccDate = new Date(element.parentElement.previousElementSibling.value);
	var vaccAge = (vaccDate - birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + vaccName + '</td> \
																				<td>' + Math.round(vaccAge) + ' Months </td> \
																				<td>' + vaccDate.toDateString().slice(4) + '<i id="pushedVacc' + vaccName + '" class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i></td>';
	var bt = document.createElement("tr");
	bt.innerHTML = 	'<td colspan="3"> \
						<button type="button" class="btn btn-info" onclick="addVacc(this)">Add Vaccine</button> \
					</td>';
	document.getElementById("vaccineBody").appendChild(bt);
	vaccineAdditions.push([vaccName,vaccDate.toISOString()]);
	changeSaveButton();
}

function deleteVacc(element,vaccID){
	document.getElementById("vaccineBody").removeChild(element.parentElement.parentElement.parentElement);
	if (vaccID == "newVacc") {
		var bt = document.createElement("tr");
		bt.innerHTML = 	'<td colspan="3"> \
							<button type="button" class="btn btn-info" onclick="addVacc(this)">Add Vaccine</button> \
						</td>';
		document.getElementById("vaccineBody").appendChild(bt);
	} else if (vaccID.slice(0,10) == "pushedVacc") {
		var pushedVaccineIndex = findIndex(vaccineAdditions,vaccID.slice(11));
		vaccineAdditions.splice(pushedVaccineIndex,1);
	} else {
		vaccineDeletions.push(vaccID);
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
																		<span class="fa fa-floppy-o" onclick="saveAllergy(this,' + "'newAllergen','sel1'," + "''" + ')"></span> \
																  </span> \
																  <select class="form-control input-sm" id="sel1"> \
																	<option>Mild</option> \
																	<option>Moderate</option> \
																	<option>Severe</option> \
																	<option>Unknown</option> \
																  </select> \
															</span> \
															<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteAllergy(this,' + "'newAllergen'" + ')">Cancel</button> \
														</span>\
													</td>';
}

function saveAllergy(element,allergenID,severityID,allergyName){
	var allergySeverityIndex = document.getElementById(severityID).selectedIndex;
	var allergySeverity = "Unknown";
	if (allergySeverityIndex == 0){
		allergySeverity = "Mild";
	} else if (allergySeverityIndex == 1) {
		allergySeverity = "Moderate";
	} else if (allergySeverityIndex == 2) {
		allergySeverity = "Severe";
	};
	if (allergenID == "newAllergen"){
		allergyName = document.getElementById("newAllergen").value;
		var bt = document.createElement("tr");
		bt.innerHTML = 	'<td colspan="3"> \
							<button type="button" class="btn btn-info" onclick="addAllergy(this)">Add Allergy</button> \
						</td>';
		document.getElementById("allergyBody").appendChild(bt);
		allergyAdditions.push([allergyName,allergySeverityIndex]);
		allergenID = "pushedAllergen";
	} else if (allergenID == "pushedAllergen"){
		var pushedAllergenIndex = findIndex(allergyAdditions,allergyName);
		allergyAdditions[pushedAllergenIndex] = [allergyName,allergySeverityIndex];
	} else {
	allergyChanges.push([allergenID,allergySeverityIndex]);
	}
	document.getElementById(severityID).parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + allergyName + '</td> \
											<td>' + allergySeverity + '<i id="' + allergenID + '" class="fa fa-pencil pull-right" \
											onclick="editAllergy(this,this.id,' + "'" + allergyName + "'" + ')"></i></td>';
	changeSaveButton();
}

function editAllergy(element,allergenID,allergyName){
	element.parentElement.innerHTML = 	'<span class="form-inline"> \
											<span class="input-group"> \
												  <span class="input-group-addon"> \
														<span class="fa fa-floppy-o" onclick="saveAllergy(this,' + "'" + allergenID + "'" + ",'sel2'," + "'" + allergyName + "'" + ')"></span> \
												  </span> \
												  <select class="form-control input-sm" id="sel2"> \
													<option>Mild</option> \
													<option>Moderate</option> \
													<option>Severe</option> \
													<option>Unknown</option> \
												  </select> \
											</span> \
											<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteAllergy(this,' + "'" + allergenID + "'," + "'" + allergyName + "'" + ')">Delete</button> \
										</span>'
}

function deleteAllergy(element,allergenID,allergyName){
	if (allergenID == "pushedAllergen"){
		var pushedAllergenIndex = findIndex(allergyAdditions,allergyName);
		allergyAdditions.splice(pushedAllergenIndex,1);
	} else if (allergenID != "newAllergen"){
		allergyDeletions.push(allergenID);
		changeSaveButton();
	}
	document.getElementById("allergyBody").removeChild(element.parentElement.parentElement.parentElement);
	if (allergenID == "newAllergen"){
		var bt = document.createElement("tr");
		bt.innerHTML = 	'<td colspan="3"> \
							<button type="button" class="btn btn-info" onclick="addAllergy(this)">Add Allergy</button> \
						</td>';
		document.getElementById("allergyBody").appendChild(bt);		
	}
}

function changeSaveButton(){
	if (editted == false) {
		document.getElementById("saveChangesButton").className = "btn btn-success";
		editted = true;
	}
}

function updateFormData(){
	$("#formData").val(JSON.stringify({"additions": additions, "changes":changes, "deletions":deletions}));
}

function findIndex(array,firstItem){
	for (i = 0; i < array.length; i++) {
		if (array[i][0] == firstItem) {
			return i;
		}
	}
}