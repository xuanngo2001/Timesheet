/**
 * Export HTML table to different formats.
 * @version = $AUTO_VERSION
 * @author  = Xuan Ngo
 */

function ExportFormat()
{}

ExportFormat.prototype.toExcel =  function (table_id)
{
	var html_table = document.getElementById(table_id).cloneNode(true);
	
	// Styling html table to make it pretty in Excel.
	html_table = this.replaceInputWithValueText(html_table);
	html_table = this.inlineStyleTd(html_table);
	
	// MS OFFICE 2003  : data:application/vnd.ms-excel
	// MS OFFICE 2007  : application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html_table.outerHTML));
};

/************************************************************************
 *                          
 *                          Helpers
 *                          
 ************************************************************************/
/**
 * Format html table to make it pretty in Excel: Replace <input> with value text because column headers use <input>.
 * @param HTML table.
 * @returns HTML table.
 */
ExportFormat.prototype.replaceInputWithValueText = function (html_table)
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
};

/**
 * Inline style of <td>.
 * @param HTML table.
 * @returns HTML table.
 */
ExportFormat.prototype.inlineStyleTd = function (html_table)
{
	var tds = html_table.getElementsByTagName("td");
	for(i=0; i<tds.length; i++)
	{
		// Style all <td>.
		tds[i].style.borderWidth="1px";
		tds[i].style.borderStyle="dotted";
		tds[i].style.textAlign="center";
		
		// Style event <td>.
		if(tds[i].className=="event" )
		{
			tds[i].style.backgroundColor="#D3D3D3";
			tds[i].style.verticalAlign="middle";
		}
		
		// Style time scale <td>.
		if(tds[i].className=="time-scale" )
		{
			/* Top of cell and bold. */
			tds[i].style.verticalAlign="super";
			tds[i].style.fontWeight="bold";
		}
		
		// Style column headers <td>.
		if(tds[i].className=="column-header" )
		{
			tds[i].style.fontWeight="bold";
		}		
		
	}
	return html_table;
};