//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function(){
  birthdate = new Date($("#birthdate").attr("title"));
  milestones = $.parseJSON($("#milestones").attr("title"));
 })

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
		element.parentElement.innerHTML = '\
      <span> \
  			<span class="input-group"> \
  				<input type="text" size="12" class="date-chooser input-sm form-control" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
  				<span class="input-group-addon"> \
  					<span class="fa fa-floppy-o" onclick="saveFunc(this,' + "'" + devnum + "'" + ')"></span> \
  				</span> \
  			</span>\
  		</span> ';
	} else {
		element.parentElement.innerHTML = '\
      <span class="form-inline"> \
  			<span class="input-group"> \
  				<input type="text" size="12" class="date-chooser input-sm form-control" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
  				<span class="input-group-addon"> \
  					<span class="fa fa-floppy-o" onclick="saveFunc(this,' + "'" + devnum + "'" + ')"></span> \
  				</span> \
  			</span> \
  			<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + "'" + devnum + "'" + ')">Delete</button> \
  		</span> ' ;
  	}
}

function saveFunc(element,devnum){
	var eventDate = new Date(String(element.parentElement.previousElementSibling.value));
	var eventAge = (eventDate-birthdate)/2629929600;
  var eventItem = [devnum,eventDate.toISOString()];
	element.parentElement.parentElement.parentElement.parentElement.previousElementSibling.innerHTML = Math.round(eventAge) + " Months";
	element.parentElement.parentElement.parentElement.parentElement.innerHTML = eventDate.toDateString().slice(4) + '\
      <i class="fa fa-pencil pull-right" onclick="editFunc(this,' + "'" + devnum + "'" + ')"></i>';
	if (devnum.slice(0,3) == "dev") {
		if (isInArray(devnum,milestones)) {
			if (findIndex(developmentChanges,devnum) > -1) {
        var changedDevIndex = findIndex(developmentChanges,devnum);
        developmentChanges[changedDevIndex] = eventItem;
      } else {
        developmentChanges.push(eventItem);
      }
		}	else {
      if (findIndex(developmentAdditions,devnum) > -1) {
        var addedDevIndex = findIndex(developmentAdditions,devnum);
        developmentAdditions[addedDevIndex] = eventItem;
      } else {
			  developmentAdditions.push(eventItem);
      }
		}
	} else if (devnum.slice(0,3) == "fed") {
    if (isInArray(devnum,milestones)) {
			if (findIndex(feedingChanges,devnum) > -1) {
        var changedFeedIndex = findIndex(feedingChanges,devnum);
        feedingChanges[changedFeedIndex] = eventItem;
      } else {
        feedingChanges.push(eventItem);
      }
		}	else {
      if (findIndex(feedingAdditions,devnum) > -1) {
        var addedFeedIndex = findIndex(feedingAdditions,devnum);
        feedingAdditions[addedFeedIndex] = eventItem;
      } else {
			  feedingAdditions.push(eventItem);
      }
		}
	} else if (devnum.slice(0,10) == "pushedVacc") {
		var pushedVaccineIndex = findIndex(vaccineAdditions,devnum.slice(11));
		vaccineAdditions[pushedVaccineIndex] = [devnum.slice(11),birthdate.toISOString()];
	} else {
    if (findIndex(vaccineChanges,devnum) > -1) {
      var changedVaccIndex = findIndex(vaccineChanges,devnum);
      vaccineChanges[changedVaccIndex] = eventItem;
    } else {
      vaccineChanges.push([devnum,eventDate.toISOString()]);
    }
	}
	changeSaveButton();
}

function addVacc(element){
  counter ++;
  var newID = "newVacc" + counter;
  document.getElementById("newVaccRow").id = newID;
  document.getElementById(newID).innerHTML = '\
    <td> \
			<span class="input-group"> \
				<input id="' + newID + 'Value' + '" type="text" size="15" class="input-sm form-control pull-left" value="" placeholder="Vaccine"/> \
			</span> \
		</td> \
		<td> Let us handle the math </td> \
		<td> \
			<span class="form-inline"> \
				<span class="input-group"> \
					<input type="text" size="20" class="date-chooser input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
					<span class="input-group-addon"> \
						<span class="fa fa-floppy-o" onclick="saveVacc(this,' + "'" + newID + "'" + ')"></span> \
					</span> \
				</span> \
				<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + "'" + newID + "'" + ')">Cancel</button> \
			</span> \
		</td>';
	}

function saveVacc(element,vaccID){
	var vaccName = String(document.getElementById(vaccID + "Value").value);
	var vaccDate = new Date(element.parentElement.previousElementSibling.value);
	var vaccAge = (vaccDate - birthdate)/2629929600;
  var pushedID = "pushedVacc" + vaccID.slice(7,vaccID.length);
  document.getElementById(vaccID).id = pushedID;
  document.getElementById(pushedID).innerHTML = '\
    <td>' + vaccName + '</td> \
		<td>' + Math.round(vaccAge) + ' Months </td> \
		<td>' + vaccDate.toDateString().slice(4) + '<i class="fa fa-pencil pull-right" onclick="editFunc(this,' + "'" + pushedID + "'" + ')"></i></td>';
	var bt = document.createElement("tr");
	bt.id = "newVaccRow";
  bt.innerHTML = 	'<td colspan="3"> \
						<button type="button" class="btn btn-info" onclick="addVacc(this)">Add Vaccine</button> \
					</td>';
	document.getElementById("vaccineBody").appendChild(bt);
	vaccineAdditions.push([vaccName,vaccDate.toISOString()]);
	changeSaveButton();
}

function deleteVacc(element,vaccID){
	document.getElementById("vaccineBody").removeChild(document.getElementById(vaccID));
	if (vaccID.slice(0,7) == "newVacc") {
		var bt = document.createElement("tr");
		bt.id = "newVaccRow";
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
  var index = -1;
  for (i = 0; i < array.length; i++) {
		if (array[i][0] == firstItem) {
			index = i;
		}
	}
  return index;
}
