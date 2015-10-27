# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
		function editFunc(element){
			element.parentElement.innerHTML = '<span class="input-group"> \
													<input type="text" size="10" class="input-sm form-control pull-left" value="dd/mm/yyyy" /> \
													<span class="input-group-addon"> \
														<span class="fa fa-floppy-o" onclick="saveFunc(this)"></span> \
													</span> \
												</span>';
			}
		function saveFunc(element){
			element.parentElement.parentElement.parentElement.innerHTML = '23 August, 2015 <i class="fa fa-pencil pull-right" onclick="editFunc(this)"></i>';
			}
			
		function addVacc(element){
			element.parentElement.parentElement.innerHTML = '<td> \
																<span class="input-group"> \
																	<input type="text" size="10" class="input-sm form-control pull-left" value="Vaccine Name" /> \
																</span> \
															</td> \
															<td> Let us handle the math </td> \
															<td> \
																<span class="input-group"> \
																	<input type="text" size="10" class="input-sm form-control pull-left" value="dd/mm/yyyy" /> \
																	<span class="input-group-addon"> \
																		<span class="fa fa-floppy-o" onclick="saveVacc(this)"></span> \
																	</span> \
																</span> \
															</td>';
			}
			
		function addAllergy(element){
			element.parentElement.parentElement.innerHTML = '<td> \
																<span class="input-group"> \
																	<input type="text" size="10" class="input-sm form-control pull-left" value="Allergen" /> \
																</span> \
															</td> \
															<td> \
																<span class="input-group"> \
																	<label for="sel1">Select Severity:</label> \
																	  <select class="form-control" id="sel1"> \
																		<option>Mild</option> \
																		<option>Moderate</option> \
																		<option>Severe</option> \
																	  </select> \
																</span> \
															<td> \
																<span class="input-group"> \
																	<input type="text" size="10" class="input-sm form-control pull-left" value="dd/mm/yyyy" /> \
																	<span class="input-group-addon"> \
																		<span class="fa fa-floppy-o" onclick="saveAllergy(this)"></span> \
																	</span> \
																</span> \
															</td>';
			}