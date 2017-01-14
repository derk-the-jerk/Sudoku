//var timeUpdate; // = setInterval(updateDisplay, 1000); // every second call updateDisplay
//loadTable();

var puzzleDefault = [[5,3,4,6,7,8,9,1,2],
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
}//runs the stopwatch

function HTML2array() {
    var puzzle = Array(); // converts string of HTML text to array
    $("table tr").each(function(i, v){
        puzzle[i] = Array();
        $(this).children('td').each(function(ii, vv){
            puzzle[i][ii] = $(this).text();
        }); 
    });
    return puzzle;
}

function array2HTML(puzzleOrig) {
    var tempStr = "";
    
    for (var i=0; i<puzzleOrig.length; i++) {
        tempStr += "<tr>";
        for (var j=0; j<puzzleOrig[i].length; j++) {
            var tmp = "<input type='text' maxlength='1'></input>";
            if ((i === 2 || i === 5) && (j === 2 || j === 5)) {
                tempStr += '<td class="cell" style="border-bottom:2px solid black;';
                tempStr += 'border-right:2px solid black;">';
                if (puzzleOrig[i][j] === "") {
                    tempStr += tmp;
                }
                else {tempStr += puzzleOrig[i][j];}
                tempStr += '</td>';
            }
            else if (i === 2 || i === 5) {
                tempStr += '<td class="cell" style="border-bottom:2px solid black;">';
                if (puzzleOrig[i][j] === "") {
                    tempStr += tmp;
                }
                else {tempStr += puzzleOrig[i][j];}
                tempStr += '</td>';
            }
            else if (j === 2 || j === 5) {
                tempStr += '<td class="cell" style="border-right:2px solid black;">';
                if (puzzleOrig[i][j] === "") {
                    tempStr += tmp;
                }
                else {tempStr += puzzleOrig[i][j];}
                tempStr += '</td>';
            }
            else {
                tempStr += '<td class="cell">';
                if (puzzleOrig[i][j] === "") {
                    tempStr += tmp;
                }
                else {tempStr += puzzleOrig[i][j];}
                
            }
        }
        tempStr += '</tr>';
    }
    return tempStr;
}

function loadTable(puzzleOrig, level) { //loads the initial sudoku puzzle
    var tempStr = array2HTML(puzzleOrig);
    //var finalHTML = emptySquares(tempStr, level);

    $('#puzzle').html(tempStr); // this is where the table is actually displayed
    //$('#puzzle').css("display: none");
    emptySquares(tempStr, level);

} // display the table

function emptySquares(initHTML, level) {
    var sq2del = 35 + level * 5;
    
    var puzzle = HTML2array();
    
    for (i = 0; i <= sq2del; i++) { //erasing spots at random
        rows = parseInt(Math.random() * 9);
        cols = parseInt(Math.random() * 9);
        if (puzzle[rows][cols] === "") {
            i -= 1;
        }
//        else {console.log(i + " (" + rows + ', ' + cols + ") value: " + 
//                    puzzle[rows][cols]);}
        puzzle[rows][cols] = '';
    }
    
    var finalHTML = array2HTML(puzzle);
    $('#puzzle').html(finalHTML);
    return finalHTML;
}

function modifyPuzzle (puzzleOrig) {
    var newPuzzle = puzzleOrig;
    for (iter = 0; iter < 30; iter ++) {
        var randTransform = parseInt(Math.random() * 4);
        switch (randTransform) {
            case 0: //row swap within a subblock
                var randSubBlock = parseInt(Math.random() * 3); // sub block
                var row1 = parseInt(Math.random() * 3) + randSubBlock*3; // row to switch
                var row2 = parseInt(Math.random() * 3) + randSubBlock*3; // row to switch
                if (row1 === row2) {
                    row1 = (row1 + 1) % 3 + randSubBlock * 3;
                }
                var tmpRow = newPuzzle[row1];
                newPuzzle[row1] = newPuzzle[row2];
                newPuzzle[row2] = tmpRow;
                break;

            case 1: //swap whole sub blocks 
                var sub1 = parseInt(Math.random() * 3) * 3;
                var sub2 = parseInt(Math.random() * 3) * 3;
                if (sub1 === sub2) { 
                    sub1 = (sub1 + 3) % 9;
                }
                var tmp1 = newPuzzle[sub1];
                var tmp2 = newPuzzle[sub1 + 1];
                var tmp3 = newPuzzle[sub1 + 2];

                newPuzzle[sub1] = newPuzzle[sub2];
                newPuzzle[sub1 + 1] = newPuzzle[sub2 + 1];
                newPuzzle[sub1 + 2] = newPuzzle[sub2 + 2];

                newPuzzle[sub2] = tmp1;
                newPuzzle[sub2 + 1] = tmp2;
                newPuzzle[sub2 + 2] = tmp3;
                break;

            case 2: //swap columns within sub block
                var randSubBlock = parseInt(Math.random() * 3); // sub block
                var col1 = parseInt(Math.random() * 3) + randSubBlock*3; // row to switch
                var col2 = parseInt(Math.random() * 3) + randSubBlock*3; // row to switch
                if (col1 === col2) {
                    col1 = (col1 + 1) % 3 + randSubBlock * 3;
                }
                for (row = 0; row < newPuzzle.length; row ++) {
                    var tmp = newPuzzle[row][col1];
                    newPuzzle[row][col1] = newPuzzle[row][col2];
                    newPuzzle[row][col2] = tmp;
                }    
                break;
            case 3: //swap column sub blocks
                var sub1 = parseInt(Math.random() * 3) * 3;
                var sub2 = parseInt(Math.random() * 3) * 3;
                if (sub1 === sub2) {
                    sub1 = (sub1 + 3) % 9;
                }
                for (row=0; row<newPuzzle.length; row++) {
                    var tmp1 = newPuzzle[row][sub1];
                    var tmp2 = newPuzzle[row][sub1 + 1];
                    var tmp3 = newPuzzle[row][sub1 + 2];

                    newPuzzle[row][sub1] = newPuzzle[row][sub2];
                    newPuzzle[row][sub1 + 1] = newPuzzle[row][sub2 + 1];
                    newPuzzle[row][sub1 + 2] = newPuzzle[row][sub2 + 2];

                    newPuzzle[row][sub2] = tmp1;
                    newPuzzle[row][sub2 + 1] = tmp2;
                    newPuzzle[row][sub2 + 2] = tmp3;
                }
                break;
        }
    }
    return newPuzzle;
} // randomize puzzle

function playPuzzle() {
    $('.cell').bind("click", function(e) {
        e.stopPropagation();
        $('.cell').removeClass('focus');
        $(this).addClass('focus');
        $(this).find('input').focus();
        var contents = $(this).find('input').text();
//        console.log(contents.toString());
    });
    
    $('.cell').keydown(function(e) {
        if(e.which === 9) {
//            console.log('tab');
            $('.cell').removeClass('focus');
        //    $(document.activeElement).parent('.cell').next('input').addClass('focus');
        }
    });
    
    $('td input').change(function(e) { // listen for value inputted
        var txt = '<span>'+$(this).val()+'</span>';
        $(this).html('');
        $(this).append(txt);

        // checking for duplicate values
        var puzzle = HTML2array();
        var row = $(this).parent('td').parent().index();
        var col = $(this).parent('td').index();
        var rowSub = parseInt(row / 3);
        var colSub = parseInt(col / 3);
        console.log("(" + row + ", " +col + ') value: ' + $(this).val());

        //checking for conflicts in columns
        for (var i = 0; i < puzzle.length; i++) {
            if ((row !== i) && ($(this).val() === (puzzle[i][col])) && $(this).val() !== '') {
                $(this).parent('td').addClass('dup');
                $('#puzzle tr:nth-of-type('+(i+1)+') td:nth-of-type('+(col+1)+')').addClass('dup');
            }
        }

        //checking for conflicts in boxes
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                row1 = rowSub * 3 + i;
                col1 = colSub * 3 + j;
                var diffCell = (col !== col1) || (row !== row1);
                if ( diffCell && $(this).val() === puzzle[row1][col1] && $(this).val() !== '') {
                    $(this).parent('td').addClass('dup');
                    $('#puzzle tr:nth-of-type('+(row1+1)+') td:nth-of-type('+(col1+1)+')').addClass('dup');
                }
            }
        }

        //checking for conflicts in rows
        for (var i = 0; i < puzzle[row].length; i++) {
            if ((col !== i) && ($(this).val() === (puzzle[row][i])) && $(this).val() !== '') {
                $(this).parent('td').addClass('dup');
                $('#puzzle tr:nth-of-type('+(row+1)+') td:nth-of-type('+(i+1)+')').addClass('dup');
            }
        }

    });

    $('.cell input').keydown(function(e) {
        // listen for backspace to remove 'dup' class
        if (e.which === 8) {
            
        }
    });

      //trying to get arrow key navigation to work 
//    $('.cell input').keydown(function(e) {
//        if(e.which === 13) {
//            console.log('enter pressed');
//        }
//        else if (e.which === 39) {
//            $(this).parent('.cell').removeClass('focus');
//            $(this).parent('.cell').next('.cell').addClass('focus');
//            $(this).next('.focus').focus();
//            console.log('arrow right');
//        }
//        else if (e.which === 37) {
//            console.log('arrow left');
//            $(this).parent('.cell').removeClass('focus');
//            $(this).parent('.cell').last('.cell').addClass('focus');
//            $('.focus').next('.cell input').focus();
//        }
//        else if (e.which === 38) {
//            console.log('arrow up');
//        }
//        else if (e.which === 40) {
//            console.log('arrow down');
//        }
//    });
    
}

jQuery(document).ready(function($) {
    var timeUpdate;
    
    //hide pause button until 1st puzzle loads
    $("#pause_resume").css('display','none');
    
    $('#new_puz').bind("click", function(e) { // NEW PUZZLE BUTTON
        $("#pause_resume").css('display','inline-block');
        $('#overlay').css('top','-400px');
         $("#overlay").css('transition','.5s');
        var level = $('input[name=diff]:checked').val(); //the selected level
        var puz2load = modifyPuzzle(puzzleDefault); //randomize puzzle
        
        loadTable(puz2load, level);//delete values and display the puzzle
        playPuzzle();
        
        $('#timer').find('.value_S').text('00');
        $('#timer').find('.value_M').text('00');
        $('#timer').find('.value_H').text('00');
        clearInterval(timeUpdate);
        $("#pause_resume").val("Pause");
        timeUpdate = setInterval(updateDisplay, 1000);
    }); // NEW PUZZLE BUTTON
    
    $('#pause_resume').bind("click", function(e) { // PAUSE BUTTON
        if ($("#pause_resume").val() === "Pause") { 
            // clock is going
            //$("#overlay").css('z-index',2);
            $('#overlay').css('top','11.5vh');
            $("#overlay").css('transition','.5s');
            $("#overlay").css('background.color', 'red');
            $("#pause_resume").val("Resume");
            clearInterval(timeUpdate);
        }
        else { // already in the pause state
            $("#pause_resume").val("Pause");
            $("#overlay").css('top', '-400px');
            timeUpdate = setInterval(updateDisplay, 1000);
        }
    }); // STOPWATCH
});