var timeUpdate; // = setInterval(updateDisplay, 1000); // every second call 
var running = false;
var help = false;
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
  if (value_s >= 59) {
    value_s = value_s - 60;
    value_m ++;
  }
      // roll over to a new hour after 60 minutes
  if (value_m >= 59) {
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

function newPuzzle() {
  $("#pause_resume").css('display','inline-block');
  $('#pause').css('top','-400px');
  $('#complete').css('top','-400px');
  $("#pause").css('transition','.5s');
  var level = $('input[name=diff]:checked').val(); //the selected level
  var puz2load = modifyPuzzle(puzzleDefault); //randomize puzzle

  loadTable(puz2load, level);//delete values and display the puzzle
  playPuzzle();
  updateCount();

  $('#timer').find('.value_S').text('00');
  $('#timer').find('.value_M').text('00');
  $('#timer').find('.value_H').text('00');
  clearInterval(timeUpdate);
  $("#pause_resume").val("Pause");
  timeUpdate = setInterval(updateDisplay, 1000);
  running = true;
}// handling of the 'new puzzle' button

function hitPause() {
  $("#pause_resume").focus();
  if ($("#pause_resume").val() === "Pause") { 
    // clock is going
    $('#pause').css('top','11.5vh');
    $("#pause").css('transition','.5s');
    $("#pause_resume").val("Resume");
    clearInterval(timeUpdate);
    running = false;
  }
  else { // already in the pause state
    $("#pause_resume").val("Pause");
    $("#pause").css('top', '-400px');
    timeUpdate = setInterval(updateDisplay, 1000);
    running = true;
  }
}// handling of the 'pause' button

function helpMe () {
  if ($('#help_text').css('display') === 'none') {
    help = true;
    $('#help_text').css('display','block');
    $('#overlay').css('display','block');
    $("#pause_resume").val("Resume");
    $('#pause_resume').focus();
    clearInterval(timeUpdate);
  }
  else { // clicking on 'X' when help is open
    help = false;
    $('#help_text').css('display','none');
    $('#overlay').css('display','none');
    $('#help').focus();
    if(running) {
      timeUpdate = setInterval(updateDisplay, 1000);
      $("#pause_resume").val("Pause");
    }
  }
} // handling of the help menu

function updateCount() {
  var txt = $('#puzzle').text();
  for (var i = 1; i <= 9; i++ ) {
    var count = txt.split(i).length - 1;        
    var html = '<p>'+i+'</p><span>'+count+'</span>';
    $('#sidebar div:nth-of-type('+i+')').html('');
    $('#sidebar div:nth-of-type('+i+')').append(html);
    
    if (count < 9) {
      $('#sidebar div:nth-of-type('+i+') span').css('color','var(--count)');
      $('#sidebar div:nth-of-type('+i+') span').parent('div').css('background','var(--nav-bg');      
    }
    else if(count === 9) {
      //$('#sidebar div:nth-of-type('+i+') span').css('text-shadow','2px 2px var(--count-green)');
      $('#sidebar div:nth-of-type('+i+') span').css('color','#CCC');
      $('#sidebar div:nth-of-type('+i+') span').parent('div').css('background','var(--count-green');
    }
    else if(count > 9) {
      //$('#sidebar div:nth-of-type('+i+') span').css('text-shadow','2px 2px var(--count-red)');
      $('#sidebar div:nth-of-type('+i+') span').css('color','#CCC');
      $('#sidebar div:nth-of-type('+i+') span').parent('div').css('background','var(--count-red');
    }
  }
} // checking number of occurrences in puzzle

function validChar (key2test) {
  return "123456789".indexOf( String.fromCharCode(key2test) ) >= 0;
}

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
        if (puzzleOrig[i][j] === "") {tempStr += tmp;}
        else {tempStr += puzzleOrig[i][j];}
        tempStr += '</td>';
      }
      else if (i === 2 || i === 5) {
        tempStr += '<td class="cell" style="border-bottom:2px solid black;">';
        if (puzzleOrig[i][j] === "") {tempStr += tmp;}
        else {tempStr += puzzleOrig[i][j];}
        tempStr += '</td>';
      }
      else if (j === 2 || j === 5) {
        tempStr += '<td class="cell" style="border-right:2px solid black;">';
        if (puzzleOrig[i][j] === "") { tempStr += tmp;}
        else {tempStr += puzzleOrig[i][j];}
        tempStr += '</td>';
      }
      else {
        tempStr += '<td class="cell">';
        if (puzzleOrig[i][j] === "") { tempStr += tmp; }
        else {tempStr += puzzleOrig[i][j];}
      }
    }
    tempStr += '</tr>';
  }
  return tempStr;
}

function check4dups (row, col, val) {
  var puzzle = HTML2array();
  var dups = new Array();
  console.log('('+row+', '+col+') value: ' + val);
  rowSub = parseInt(row / 3);
  colSub = parseInt(col / 3);
  
  //checking columns
  for (var i = 0; i < puzzle.length; i++) {
      if ((row !== i) && (val === (puzzle[i][col])) && val !== '') {
        dups.push([i, col]);
      }
    }

  //checking for conflicts in boxes
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      row1 = rowSub * 3 + i;
      col1 = colSub * 3 + j;
      var diffCell = (col !== col1) || (row !== row1);
      if ( diffCell && val === puzzle[row1][col1] && val !== '') {
        dups.push([row1,col1]);
      }
    }
  }

  //checking for conflicts in rows
  for (var i = 0; i < puzzle[row].length; i++) {
    if ((col !== i) && (val === (puzzle[row][i])) && val !== '') {
      dups.push([row, i]);
    }
  }
  
  if (dups.length > 0) {
    dups.push([row,col]);
  }
  console.log(dups);
  return dups;
}

function checkAllDups () {
  var puzzle = HTML2array();
  var dups = new Array();
  
  for (x=1; x<=9; x++) { // running through each number one at a time
    for (var row=0; row<puzzle.length; row++) {
      var tmpArr = new Array();
      for (var col = 0; col < puzzle[row].length; col++) {
        //console.log(x+' - ('+row+', '+col+') value '+parseInt(puzzle[row][col]));
        if (x === parseInt(puzzle[row][col])) {
          console.log('('+row+', '+col + ') value: '+ x);
          tmpArr.push([row,col]);
        }
      }
      if (tmpArr.length > 1) { // if more than 1 instance of value in row
        for (var j=0; j<tmpArr.length; j++) {
          dups.push([tmpArr[j][0],tmpArr[j][1]]);
        }
      }
    } // checking rows
    
    for (var col=0; col<puzzle[0].length; col++ ) {
      var tmpArr = new Array();
      for (var row=0; row<puzzle.length; row++) {
        if (x === parseInt(puzzle[row][col])) {
          tmpArr.push([row,col]);
        }
      }
      if (tmpArr.length > 1) {
        for (var j=0; j<tmpArr.length; j++) {
          dups.push([tmpArr[j][0],tmpArr[j][1]]);
        }
      }
    } // checking columns
    
    for (var subRow=0; subRow < 3; subRow++) {
      for (var subCol = 0; subCol < 3; subCol++) { //checking each block
        var tmpArr = new Array();
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            row = subRow * 3 + i; 
            col = subCol * 3 + j;
            if (x === parseInt(puzzle[row][col])) {
              tmpArr.push([row,col]);
            }
          }
        }
        if (tmpArr.length > 1) {
          for (var j=0; j<tmpArr.length; j++) {
            dups.push([tmpArr[j][0],tmpArr[j][1]]);
          }
        }
      }
    } // checking blocks
  }
  console.log(dups);
  return dups;
}

function loadTable(puzzleOrig, level) { //loads the initial sudoku puzzle
  var tempStr = array2HTML(puzzleOrig);
  $('#puzzle').html(tempStr); // this is where the table is actually displayed
  emptySquares(tempStr, level);
} // display the table

function emptySquares(initHTML, level) {
  var sq2del = 36 + level * 4;
  var puzzle = HTML2array();

  for (i = 0; i <= sq2del; i++) { //erasing spots at random
    rows = parseInt(Math.random() * 9);
    cols = parseInt(Math.random() * 9);
    if (puzzle[rows][cols] === "") {
      i -= 1;
    }
    puzzle[rows][cols] = '';
  }

  var finalHTML = array2HTML(puzzle);
  $('#puzzle').html(finalHTML);
  return finalHTML;
} // removes squares

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
  });
    
  $('.cell').keydown(function(e) {
    if(e.which === 9) {
      $('.cell').removeClass('focus');
      $(this).next('.cell input').addClass('focus');
    }
  });
    
  $('td input').change(function(e) { // listen for value inputted
    var txt = '<span>'+$(this).val()+'</span>';
    $(this).html('');
    $(this).append(txt);

    updateCount(); // update the count for each number

    // checking for duplicate values    
    var row = $(this).parent('td').parent().index();
    var col = $(this).parent('td').index();
    //var duplicates = check4dups(row, col, $(this).val()); // checks dups of current cell
    var duplicates = checkAllDups(); // checks for all dups in the puzzle

    //highlighting duplicate cells based on array of duplicate values
    $('#puzzle td').removeClass('dup');
    for (var x = 0; x < duplicates.length; x++) {
      var r = duplicates[x][0] + 1;
      var c = duplicates[x][1] + 1;
      $('#puzzle tr:nth-of-type('+r+') td:nth-of-type('+c+')').addClass('dup');
    }

    // check to see if puzzle is complete
    var complete = true;
    var puzzle = HTML2array();
    for (var i = 0; i < puzzle.length; i++) {
      for (var j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] === '' || duplicates.length > 1) {
          complete = false;
        }
      }
    }
    if (complete) {
      clearInterval(timeUpdate);
      $('#complete').css('top','11.5vh');
      $("#complete").css('transition','.5s');
      $("#pause_resume").css('display','none');
    }
  });
  
  $('.cell input').keydown(function(e) {
    var puzzle = HTML2array();
    var valid = validChar(e.which);
    if (!valid) {
      var row = $(this).parent('td').parent().index();
      var col = $(this).parent('td').index();
      
      if (e.which === 8) {} // listening for backspace
      else if (e.which === 9) {
        $('#puzzle .cell').next().find('input').addClass('focus');
      } // listening for tab
      else if (e.which === 37) {
        if (col > 0) {
          $('#puzzle tr:nth-of-type('+(row+1)+') td:nth-of-type('+col+')').addClass('focus');
        }
      } // left arrow
      else if (e.which === 38) {
        if (row > 0) {
          $('#puzzle tr:nth-of-type('+(row)+') td:nth-of-type('+(col+1)+')').addClass('focus');
        }
      } // up arrow
      else if (e.which === 39) {
        if (col < puzzle[0].length - 1) {
          $('#puzzle tr:nth-of-type('+(row+1)+') td:nth-of-type('+(col+2)+')').addClass('focus');
        }
      } // right arrow
      else if (e.which === 40) {
        if (row < puzzle.length - 1) {
          $('#puzzle tr:nth-of-type('+(row+2)+') td:nth-of-type('+(col+1)+')').addClass('focus');
        }
      } // down arrow
      else if (e.which >= 59 && e.which <= 90){
        if (e.which === 80) {hitPause();}
        if (e.which === 78) {newPuzzle();}
        if (e.which === 72) {helpMe();}
        return false;
      }
    }
  });
}

jQuery(document).ready(function($) { 
  $("#pause_resume").css('display','none'); //hide pause button until 1st puzzle loads

  $('#new_puz').bind("click", function(e) { // NEW PUZZLE BUTTON
    newPuzzle();
  }); // NEW PUZZLE BUTTON

  $('#pause_resume').bind("click", function(e) {
    hitPause();
  });// PAUSE BUTTON

  $('#help').bind("click", function(e) {
    helpMe();
  });// HELP BUTTON
  $('#exit').bind('click', function(e) {
    helpMe();
  });

  $('body').keydown(function (e) {
    if( e.which === 80 ) {
      if ($('#pause_resume').css('display') !== 'none' && !help) {hitPause();}
    }
    else if (e.which === 78 ) {
      if (!help) {newPuzzle();}
    }
    else if (e.which === 72 ) {
      helpMe();
    }
  });
}); // general button handling
