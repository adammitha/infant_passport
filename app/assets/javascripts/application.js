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
//= require_tree .
var developmentChanges = [];
var vaccineChanges = [];
var allergyChanges = [];
var birthdate = new Date("03/25/1995");

function editFunc(element,devnum){
	element.parentElement.innerHTML = '<span class="input-group"> \
											<input type="text" size="10" class="input-sm form-control pull-left" value="mm/dd/yyyy" /> \
											<span class="input-group-addon"> \
												<span id="' + devnum + '" class="fa fa-floppy-o" onclick="saveFunc(this,this.id)"></span> \
											</span> \
										</span>';
	}
function saveFunc(element,devnum){
	var eventDate = new Date(String(element.parentElement.previousElementSibling.value));
	var eventAge = (eventDate-birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.previousElementSibling.innerHTML = Math.round(eventAge) + " Months"
	element.parentElement.parentElement.parentElement.innerHTML = eventDate.toDateString().slice(4) + '<i id="' + devnum + '" \
																class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i>';															
	developmentChanges.push([devnum,eventDate]);
	}
	
function addVacc(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="nameElement" type="text" size="10" class="input-sm form-control pull-left" value="Vaccine Name" /> \
														</span> \
													</td> \
													<td> Let us handle the math </td> \
													<td> \
														<span class="input-group"> \
															<input type="text" size="10" class="input-sm form-control pull-left" value="mm/dd/yyyy" /> \
															<span class="input-group-addon"> \
																<span class="fa fa-floppy-o" onclick="saveVacc(this,' + "'nameElement'" + ')"></span> \
															</span> \
														</span> \
													</td>';
	}
	
function saveVacc(element,nameID){
	var vaccName = String(document.getElementById(nameID).value);
	var vaccDate = new Date(element.parentElement.previousElementSibling.value);
	var vaccAge = (vaccDate - birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + vaccName + '</td> \
																				<td>' + Math.round(vaccAge) + ' Months </td> \
																				<td>' + vaccDate.toDateString().slice(4) + '<i class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i></td>';
	vaccineChanges.push([vaccName,vaccDate]);
   }
	
function addAllergy(element){
	element.parentElement.parentElement.innerHTML = '<td> \
														<span class="input-group"> \
															<input id="allergenElement" type="text" size="10" class="input-sm form-control pull-left" value="Allergen" /> \
														</span> \
													</td> \
													<td> \
														<span class="input-group"> \
															<label for="sel1">Select Severity:</label> \
															  <select class="form-control" id="sel1"> \
																<option>Mild</option> \
																<option>Moderate</option> \
																<option>Severe</option> \
																<option>Unknown</option> \
															  </select> \
														</span> \
													<td> \
														<span class="input-group"> \
															<input type="text" size="10" class="input-sm form-control pull-left" value="mm/dd/yyyy" /> \
															<span class="input-group-addon"> \
																<span class="fa fa-floppy-o" onclick="saveAllergy(this,' + "'allergenElement','sel1'" + ')"></span> \
															</span> \
														</span> \
													</td>';
	}

function saveAllergy(element,allergenID,severityID){
	var allergyName = String(document.getElementById(allergenID).value);
	var allergySeverity = document.getElementById(severityID).selectedIndex;
	var allergyDate = new Date(element.parentElement.previousElementSibling.value);
	if (allergySeverity == 0){
		allergySeverity = "Mild";
	} else if (allergySeverity == 1) {
		allergySeverity = "Moderate";
	} else if (allergySeverity == 2) {
		allergySeverity = "Severe";
	} else {
		allergySeverity = "Unknown";
	};
	element.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + allergyName + '</td> \
																				<td>' + allergySeverity + '</td> \
																				<td>' + allergyDate.toDateString().slice(4) + '<i class="fa fa-pencil pull-right" onclick="editFunc(this,this.id)"></i></td>';
	allergyChanges.push([allergyName,allergySeverity,allergyDate]);
   }
  
function savePage(){
}