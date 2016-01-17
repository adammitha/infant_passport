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
	if (devnum.slice(0,3) == "dev") {
	developmentChanges.push([devnum,eventDate.toISOString()]);
	} else if (devnum.slice(0,3) == "fed") {
	feedingChanges.push([devnum,eventDate.toISOString()]);
	} else if (devnum.slice(0,10) == "pushedVacc") {
		var pushedVaccineIndex = findIndex(vaccineAdditions,devnum.slice(10));
		vaccineAdditions[pushedVaccineIndex] = [devnum.slice(10),birthdate.toISOString()];		
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
														<span class="input-group"> \
															<input type="text" size="12" class="date-chooser input-sm form-control pull-left" value="" placeholder="MM-DD-YYYY" data-provide="datepicker" readonly="readonly"/> \
															<span class="input-group-addon"> \
																<span class="fa fa-floppy-o" onclick="saveVacc(this,' + "'newVacc'" + ')"></span> \
															</span> \
															<button type="button" class="btn btn-danger btn-s pull-right" onclick="deleteVacc(this,' + "'newVacc'" + ')">Cancel</button> \
														</span> \
													</td>';
	}

function saveVacc(element,vaccID){
	var vaccName = String(document.getElementById(vaccID).value);
	var vaccDate = new Date(element.parentElement.previousElementSibling.value);
	var vaccAge = (vaccDate - birthdate)/2629929600;
	element.parentElement.parentElement.parentElement.parentElement.innerHTML = '<td>' + vaccName + '</td> \
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
		var pushedVaccineIndex = findIndex(vaccineAdditions,vaccID.slice(10));
		vaccineAdditions.splice(pushedVaccineIndex,1);
	}else {
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

// Everything below this is for the graph / chart page
//
//
///
///
//
//
//
//
//
//
//
//
///
///
//


// Data for testing graphs
var d1 = [[1, 50], [2, 60], [3, 65], [4, 70], [5, 73]];
var d2 = [[1,20],[2,30],[3,35],[4,40],[5,55]];
var d3 = [d1,d2]

// Percentile data from WHO
var malesHeight = {"5%": [[0,46.8],[1,51.5],[2,55.1],[3,58.1],[4,60.5],[5,62.4],[6,64.1],[9,68.3],[12,71.8],[15,75],[18,77.8],[24,82.8]], "95%": [[0,53],[1,57.9],[2,61.7],[3,64.8],[4,67.3],[5,69.4],[6,71.1],[9,75.7],[12,79.7],[15,83.3],[18,86.7],[24,92.8]]};
var malesWeight = {"5%": [[0,2.6],[1,3.6],[2,4.5],[3,5.2],[4,5.8],[5,6.2],[6,6.6],[9,7.4],[12,8.1],[15,8.6],[18,9.1],[24,10.1]], "95%": [[0,4.2],[1,5.5],[2,6.8],[3,7.7],[4,8.4],[5,9],[6,9.5],[9,10.6],[12,11.5],[15,12.3],[18,13.1],[24,14.7]]};

$(document).ready(function () {

	// Create our graph from the data table and specify a container to put the graph in

	$('button').click(function(){
		var idx=$(this).data('index');
		createGraph('#user-data', '.chart', idx);
	})

	// Here be graphs
	function createGraph(data, container, type) {
		// Declare some common variables and container elements
		var bars = [];
		var figureContainer = $('<div id="figure"></div>');
		var graphContainer = $('<div class="graph"></div>');
		var barContainer = $('<div class="bars"></div>');
		var data = $(data);
		var container = $(container);
		var chartData;
		var graphType = type;
		var columnGroups;
		var dataSet;

		// Create table data object
		var tableData = {
			// Get heading data from table caption
			chartHeading: function() {
				var chartHeading = data.find('caption').text();
				return chartHeading;
			},
			// Sort data into groups based on number of columns
			columnGroups: function() {
				var columnGroups = [];
				// Get number of columns from row of table corresponding to requested data type
				var columns = document.getElementById("user-data").rows[id=graphType].cells.length;

				//Only use data from the specified row
				for (var i = 0; i < columns - 1; i++) {
					columnGroups[i] = [i];
					data.find("." + graphType).each(function() {
						columnGroups[i].push($(this).find('td').eq(i).text());
					});
				}
				return columnGroups;
			}
		}

		// Creating the array for graphing
		columnGroups = tableData.columnGroups();

		// Creating the data arrays for the graph
		// This is super clunky right now, may want some help to clean it up
		if (graphType == "Height") {
			dataSet = [
				{label: "My " + graphType, data: columnGroups, color:"rgb(0,0,0)", animator: {start: 100, steps: 100, duration: 2000, direction: "right"}},
				{label: "5th-95th percentile", id: "5%", data: malesHeight["5%"], lines: {show: true, lineWidth: 0, fill: 0}, points: {show: false}, color:"rgb(50,50,255)", hoverable: false},
				{id: "95%", data: malesHeight["95%"], lines: {show: true, lineWidth: 0, fill: 0.2}, points: {show: false}, color: "rgb(50,50,255)", fillBetween: "5%", hoverable: false}
			]
		}
		else if (graphType == "Weight") {
			dataSet = [
				{label: "My " + graphType, data: columnGroups, color:"rgb(0,0,0)", animator: {start: 100, steps: 100, duration: 2000, direction: "right"}},
				{label: "5th-95th percentile", id: "5%", data: malesWeight["5%"], lines: {show: true, lineWidth: 0, fill: 0}, points: {show: false}, color:"rgb(50,50,255)", hoverable: false},
				{id: "95%", data: malesWeight["95%"], lines: {show: true, lineWidth: 0, fill: 0.2}, points: {show: false}, color: "rgb(50,50,255)", fillBetween: "5%", hoverable: false}
			]
		}



		//Using Flot to plot the graph
		var plot = $.plotAnimator($("#placeholder"), dataSet, {
				series: {
					lines: { show: true },
					points: { show: true }
				},
				//Axes options
				xaxis: {
					tickDecimals: 0,
					tickLength: 0,
					/*axisLabel: 'Age in months',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
          axisLabelPadding: 5
					/*ticks: 10,
					min: -2,
					max: 2,
					tickDecimals: 3*/
				},
				yaxis: {
					/*if (graphType == "Height") {
						tickFormatter: function (v) {
							return v + " cm";
						},
					}
					else if (graphType == "Weight") {
						tickFormatter: function (v) {
							return v + " kg";
						},
					}*/
					/*axisLabel: 'Height in cm',
					axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
          axisLabelPadding: 5*/
				},
				grid: {
					hoverable: true,
					clickable: true,
					backgroundColor: { colors: [ "#fff", "#eee" ] },
					borderWidth: {
						top: 1,
						right: 1,
						bottom: 2,
						left: 2
					}
				}
			});

			//Some CSS for the tooltip popup
			$("<div id='tooltip'></div>").css({
				position: "absolute",
				display: "none",
				border: "1px solid #fdd",
				padding: "2px",
				"background-color": "#fee",
				opacity: 0.80
			}).appendTo("body");

			//Creating the tooltip popup
			$("#placeholder").bind("plothover", function (event, pos, item) {


				if (item) {
					var x = item.datapoint[0].toFixed(0),
						y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(y + "cm tall at " + x + " months")
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#tooltip").hide();
				}
			});
	}
});
