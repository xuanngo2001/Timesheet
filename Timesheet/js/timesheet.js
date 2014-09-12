/* Version = AUTO_VERSION */

//======================================================
//======================================================
//======================================================
//================== Global IDs ========================
var START_IN_MINUTES_ID = 4;
var END_IN_MINUTES_ID 	= 5;

//======================================================
//======================================================
//======================================================
//============= Generate Test Data =====================
$(document).ready(function(){
	
	$("#generate-test-data").click(function() {
		
		remove_all_child_elements("input-data-table-body"); // Clear data container table first.
		
		var data = [
		            	// Description, column #, start time, duration
			            ["English Inter", "1", "19:05", "51"],
			            ["English Beg", "1", "20:00", "60"],
			            
                        ["Spanish Intro", "2", "18:00", "60"],
                        ["English Intro", "2", "19:00", "60"],
                        ["Spanish Inter", "2", "20:00", "60"],
                        
                        
                        ["English Beg", "3", "19:00", "60"],
                        ["English Intro", "3", "20:00", "60"],
                        ["Speaking practice", "3", "21:00", "60"],
                        
                        ["English Inter", "8", "19:00", "60"],
                        
                        
                        ["Spanish Inter", "5", "18:00", "60"],
                        ["English Intro", "5", "19:00", "60"],
                        ["Spanish Beg", "5", "20:00", "60"],
                        ["English Beg", "5", "21:00", "60"],
                        
                        ["Vegetarian", "6", "17:00", "120"],
                        
                        
                        ["Spanish Beg", "7", "17:00", "60"],
                        ["English Beg", "7", "18:00", "60"],
                        ["English Plus", "7", "19:00", "60"],
                        ["English Inter", "7", "20:00", "60"],
                        ["Speaking practice", "7", "21:00", "60"]
		            ]; // IE will display warning if you put comma at the last set of arrays.

		for(i=0; i<data.length; i++)
		{
			var idx = 0;
			$("#event-description")	.val(data[i][idx++]);
			$("#column-number")		.val(data[i][idx++]);
			$("#start-time")		.val(data[i][idx++]);
			$("#duration")			.val(data[i][idx++]);
			
			$("#add-event-button").click();
		}
		
		scrollTo("#input-data-table");
	});
	
});
//======================================================
//======================================================
//======================================================
//============ Add inputs in data container  ===========

$(document).ready(function(){
	
	var unique_id = 0;
	
	$("#add-event-button").click(function() {
		var event_description = $("#event-description").val();
		var column_number = $("#column-number").val();
		var start_time = $("#start-time").val();
		var duration = $("#duration").val();
		
		var tr_id = 'tr_'+unique_id;
		var html_tr = '<tr id='+tr_id+'>'+ 
						'<td>'+event_description+'</td>'+
						'<td>'+column_number+'</td>'+  
						'<td>'+start_time+'</td>'+  
						'<td>'+duration+'</td>'+  
						'<td onclick=remove_event(\''+tr_id+'\')><a href="#input-data-table">Remove</a></td>'+ 
					  '</tr>'
		$("#input-data-table-body").append(html_tr);
		unique_id++;
		
	});


});

/**
 * Remove the element itself and its children.
 * @param id
 */
function remove_event(id)
{
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
};

/**
 * Remove all children of element but keep the element.
 * @param id
 */
function remove_all_child_elements(id)
{
	var node = document.getElementById(id);
	while (node.firstChild)
	{
	    node.removeChild(node.firstChild);
	}	
}
//======================================================
//======================================================
//======================================================
//============ Generate Timesheet ======================
$(document).ready(function(){
	
	$("#generate-timesheet").click(function() {
		
		var event_data = new Array();

		// Getting final version of #input-data-table-body table and
		//	add "start time in minutes" and "end time in minutes" to the array.
		$("#input-data-table-body > tr").each(function() {
			
			// Get all data from input-data-table-body table.
			var row_data = new Array();
			$(this).find("td").each(function() {
				row_data.push($(this).html());
			});
			row_data.pop(); // Delete Remove link.
			
			// Add "start time in minutes" and "end time in minutes" to the array.
			var start_time_in_minutes 	=  time_2_minutes(row_data[2]);					// Start Time = row_data[2];
			var end_time_in_minutes 	=  start_time_in_minutes+parseInt(row_data[3]); // Duration = row_data[3] 
			row_data.push(start_time_in_minutes);
			row_data.push(end_time_in_minutes);
			
			event_data.push(row_data);
			
		});
		
		//******************************
		// Generate timsheet
		var time_slice = 15; // Each row will be 15 minutes.
		var start_end_minutes = get_start_end_minutes(event_data, time_slice);
		var time_minutes = start_end_minutes[0];
		var end_minutes = start_end_minutes[1];
		
		//var column_number = get_number_of_columns(event_data);
		var column_headers = get_column_headers(event_data);

		var timesheet_html = "";

		// Create columns headers
		timesheet_html +="<tr><td>&nbsp;</td>";
		for(i=0; i<column_headers.length; i++)
		{
			timesheet_html +='<td class="column-header"><input class="column-input-header" type="text" value="Column #'+column_headers[i]+'" maxlength="60"/></td>';
		}
		timesheet_html +="</tr>";
		
		// Create events on timesheet.
		while( time_minutes <= end_minutes)
		{
			timesheet_html +="<tr>";
			timesheet_html +="<td class=\"time-scale\">"+get_formatted_time(time_minutes)+"</td>";
			for(column=0; column<column_headers.length; column++)
			{
				var event_found = false;
				for(i=0; i<event_data.length; i++)
				{
					if(column_headers[column]==event_data[i][1])
					{
				
						if( event_data[i][START_IN_MINUTES_ID] >= time_minutes && event_data[i][START_IN_MINUTES_ID] < time_minutes+time_slice )
						{
							timesheet_html += get_event_td(event_data[i], time_slice);	// Write <td></td> event.
							event_found = true;
						}
						else if( get_floor(event_data[i][START_IN_MINUTES_ID], time_slice) <= time_minutes && time_minutes < get_ceil(event_data[i][END_IN_MINUTES_ID], time_slice) )
						{// Don't write <td></td> if it is within an event.
							event_found = true;
						}
					}
				}
				if(!event_found)
					timesheet_html +="<td class=\"no-event\">&nbsp;</td>";
			}
			timesheet_html +="</tr>";
			time_minutes += time_slice;
		}
		
		remove_all_child_elements("timesheet-body"); // Clear timesheet table first.
		$("#timesheet-body").append(timesheet_html);
		
		scrollTo("#timesheet");
	});
	
	

});

/**
 * Return the number of minutes from time string HH:MM
 * @param time_string HH:MM
 */
function time_2_minutes(time_string)
{
	var time_splitted = time_string.split(":");
	var hours = parseInt(time_splitted[0]);
	var minutes = parseInt(time_splitted[1]);
	
	return (hours*60)+minutes;
};

/**
 * Get the start and end time in minutes from the event_data table.
 * @param event_data
 * @returns {Array}
 */
function get_start_end_minutes(event_data, time_slice)
{
	var minimum_start = event_data[0][START_IN_MINUTES_ID];
	var maximum_end = event_data[0][END_IN_MINUTES_ID];
	
	for(i=1; i < event_data.length; i++)
	{
		if( minimum_start > event_data[i][START_IN_MINUTES_ID] )
			minimum_start = event_data[i][START_IN_MINUTES_ID];
		
		if( maximum_end < event_data[i][END_IN_MINUTES_ID] )
			maximum_end = event_data[i][END_IN_MINUTES_ID]
	}

	minimum_start = Math.floor(minimum_start/time_slice)*time_slice;
	maximum_end = Math.ceil(maximum_end/time_slice)*time_slice;
	return new Array(minimum_start, maximum_end);
};

function get_column_headers(event_data)
{
	// Get all column headers.
	var columns = new Array();
	for(i=0; i < event_data.length; i++)
	{
		columns.push(event_data[i][1]);
	}
	
	// Remove duplicate column headers.
	var unique_columns = new Array();
	$.each(columns, function(i, el){
	    if($.inArray(el, unique_columns) === -1) unique_columns.push(el);
	});
	
	return unique_columns;
}

function get_formatted_time(time_in_minutes)
{
	var hours = Math.floor(time_in_minutes/60);
	var minutes = time_in_minutes % 60;
	
	if ( hours < 10 )
		hours = "0"+hours;

	if ( minutes < 10 )
		minutes = "0"+minutes;
	
	return hours+":"+minutes; 
}

function get_event_td(event_data, time_slice)
{
	// Case 1:
	//	Start = 17:13, duration = 43
	//		On the grid, it has to start on 17:00 and end at 18:00.
	// Case 2:
	//	Start = 09:00, duration = 45
	//		On the grid, it has to start on 09:00 and end at 9:45.
	
	var start 	= get_floor(event_data[START_IN_MINUTES_ID], time_slice);
	var end 	= get_ceil(event_data[END_IN_MINUTES_ID], time_slice);
	var rowspan = (end-start)/time_slice; // The division is guaranteed to be an integer because of get_floor() and get_ceil().
	
	var user_relevant_event_data = null; // Event description, Start time and duration.
	
	// Format timesheet: Add <br> depending on the rowspan.
	var br_string = ", <br style=\"mso-data-placement:same-cell;\" />"
	if( rowspan >= 3 )
	{
		user_relevant_event_data = event_data[0]+ br_string +event_data[2]+ br_string +event_data[3]; // Event description, Start time and duration.
	}
	else if( rowspan >= 2 )
	{
		user_relevant_event_data = event_data[0]+ br_string +event_data[2]+", "+event_data[3]; // Event description, Start time and duration.
	}
	else
	{
		user_relevant_event_data = event_data[0]+", "+event_data[2]+", "+event_data[3]; // Event description, Start time and duration.
	
	}
	
	return "<td class=\"event\" rowspan=\""+rowspan+"\">"+user_relevant_event_data+"</td>";
}

function get_floor(value, slice)
{
	return Math.floor(value/slice)*slice;
}

function get_ceil(value, slice)
{
	return Math.ceil(value/slice)*slice;
}

//======================================================
//======================================================
//======================================================
//============= Export Timesheet =======================
function export_to_excel(table_id)
{
	var html_table = document.getElementById(table_id).cloneNode(true);
	
	// Styling html table to make it pretty in Excel.
	html_table = replace_input_with_value_text(html_table);
	html_table = td_inline_styling(html_table);
	
	// MS OFFICE 2003  : data:application/vnd.ms-excel
	// MS OFFICE 2007  : application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html_table.outerHTML));
}

/**
 * Format html table to make it pretty in Excel: Replace <input> with value text.
 * @param table_id
 * @returns
 */
function replace_input_with_value_text(html_table)
{
	// Get the column names and remove <input>.
	var column_headers = html_table.getElementsByClassName("column-header");
	for(i=0; i<column_headers.length; i++)
	{
		var input_header = column_headers[i].getElementsByTagName("input");
		var column_header_name = input_header[0].value;

		column_headers[i].removeChild(input_header[0]);

		var value_node = document.createTextNode(column_header_name);
		column_headers[i].appendChild(value_node);

	}
	
	return html_table;
}

/************************************************************************
 *                          
 *                          Export to EXCEL
 *                          
 ************************************************************************/

function td_inline_styling(html_table)
{
	var tds = html_table.getElementsByTagName("td");
	for(i=0; i<tds.length; i++)
	{
		tds[i].style.borderWidth="1px";
		tds[i].style.borderStyle="dotted";
		tds[i].style.textAlign="center";
		
		if(tds[i].className=="event" )
		{
			tds[i].style.backgroundColor="#D3D3D3";
			tds[i].style.verticalAlign="middle";
		}
		
		if(tds[i].className=="time-scale" )
		{
			/* Top of cell and bold. */
			tds[i].style.verticalAlign="super";
			tds[i].style.fontWeight="bold";
		}
		
		if(tds[i].className=="column-header" )
		{
			tds[i].style.fontWeight="bold";
		}		
		
	}
	return html_table;
}

/************************************************************************
 *                          
 *                          Helpers
 *                          
 ************************************************************************/
function scrollTo(hash)
{
    $('html, body').animate({
        'scrollTop':   $(hash).offset().top
      }, 1000);	
}