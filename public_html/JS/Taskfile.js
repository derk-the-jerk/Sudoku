//var timeUpdate = setInterval(updateDisplay, 1000); // every second call updateDisplay
//loadTable();

var puzzleOrig = [[5,3,4,6,7,8,9,1,2],
                 [6,7,2,1,9,5,3,4,8],
                 [1,9,8,3,4,2,5,6,7],
                 [8,5,9,7,6,1,4,2,3],
                 [4,2,6,8,5,3,7,9,1],
                 [7,1,3,9,2,4,8,5,6],
                 [9,6,1,5,3,7,2,8,4],
                 [2,8,7,4,1,9,6,3,5],
                 [3,4,5,2,8,6,1,7,9]];

function updateDisplay(){ //run stopwatch
    // set variables pulled from the HTML
    var value_s = parseInt($('#timer').find('.value_S').text(), 10); 
    var value_m = parseInt($('#timer').find('.value_M').text(), 10);
    var value_h = parseInt($('#timer').find('.value_H').text(), 10);
    
    // roll over to a new minute after 60 seconds
    if (value_s > 59) {
        value_s = value_s - 60;
        value_m ++;
    }
        // roll over to a new hour after 60 minutes
    if (value_m > 59) {
        value_m = value_m - 60;
        value_h ++;
    }
    
    value_s++;
    if (value_s < 10) { $('#timer').find('.value_S').text('0' + value_s); }
    else {$('#timer').find('.value_S').text(value_s); }
    if (value_m < 10) { $('#timer').find('.value_M').text('0' + value_m); }
    else {$('#timer').find('.value_M').text(value_m); }
    if (value_h < 10) { $('#timer').find('.value_H').text('0' + value_h); }
    else {$('#timer').find('.value_H').text(value_h); }
}

function loadTable() { //loads the initial sudoku puzzle
    var table = document.getElementById("#puzzle"); 
    //var tbody = document.createElement('tbody');
    var tempStr = "";
    //alert(puzzleOrig.length);
   
    for (var i=0; i<puzzleOrig.length; i++) {
        tempStr += "<tr>";
        for (var j=0; j<puzzleOrig[i].length; j++) {
            tempStr += '<td>'+puzzleOrig[i][j]+'</td>';
        }
        tempStr += '</tr>';
    }
    //alert('hi');
    $('#puzzle').html(tempStr);

//    
//    for (row=0; row < puzzleOrig.length; row++) {
//        var rows = document.createElement('tr');
//        //alert(rows);
//        for (col = 0; col < puzzleOrig[row].length; col++) {
//            var cells = document.createElement('td');
//            cells.textContent = '1';//puzzleOrig[row][col];
//            rows.appendChild(cells);
//        }
//        tbody.appendChild(rows);
//    }
//    table.appendChild(tbody);
}

jQuery(document).ready(function($) {
    $('#new_puz').bind("click", function(e) {
        loadTable();
    });
    
    $('#pause_resume').bind("click", function(e) {
        if ($("#pause_resume").val() === "Pause") { 
            // clock is going
            $("#pause_resume").val("Resume");
            clearInterval(timeUpdate);
        }
        else { // already in the pause state
            $("#pause_resume").val("Pause");
            timeUpdate = setInterval(updateDisplay, 1000);
        }
    });
});