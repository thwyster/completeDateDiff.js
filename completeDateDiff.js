$(function () {
    $("#DataInicio").datepicker({ dateFormat: 'dd-mm-yy' });
    $("#DataFinal").datepicker({ dateFormat: 'dd-mm-yy' });
    $("#DataInicio").val('01-01-2000');
    $("#DataFinal").val('01-01-2010');
});

$('#btn').click(function () {
    var DataIni = $('#DataInicio').datepicker('getDate');
    var DataFim = $('#DataFinal').datepicker('getDate');

    //alert(DataInicio + DataFinal);
    compute(DataIni, DataFim);
});


function compute(DataInicio, DataFinal) {

    var DataInicioDIA = DataInicio.getDate();
    var DataInicioMES = DataInicio.getMonth();
    var DataInicioANO = DataInicio.getFullYear();

    var DataFinalDIA = DataFinal.getDate();
    var DataFinalMES = DataFinal.getMonth();
    var DataFinalANO = DataFinal.getFullYear();
        
    var nday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    nday[1] = (0 === y2a % 4) && (0 !== y2a % 100) || (0 === y2a % 400) ? 29 : 28;

    var y2a = parseFloat((DataInicioANO));
    
    var y3a = y2a;
    if ((DataInicioANO === "") || (y2a < 1)) {
        alert("Enter a positive number for\n\n From: [Year],\n\n then select A.D. or B.C.\n\n(There was no year 0.)\n\nDo not leave the Year blank.");
    }
    var y2b = parseFloat((DataFinalANO));
        
    var y3b = y2b;
    if ((DataFinalANO === "") || (y2b < 1)) {
        alert("Enter a positive number for\n\n To: [Year],\n\n then select A.D. or B.C.\n\n(There was no year 0.)\n\nDo not leave the Year blank.");
    }
    var cyear2 = y2b;
    var cyear1 = y2a;

    var m2a = parseFloat(DataInicioMES);
    var m2b = parseFloat(DataFinalMES);

    var cmonth2 = m2b;
    var cmonth1 = m2a;

    var d2a = parseFloat(DataInicioDIA);
    var d2b = parseFloat(DataFinalDIA);

    var cday2 = d2b;
    var cday1 = d2a;

    if (1 === (m2a - 1)) {
        nday[1] = (0 === y2a % 4) && (0 !== y2a % 100) || (0 === y2a % 400) ? 29 : 28;
    }
    if (1 == (m2b - 1)) {
        nday[1] = (0 === y2b % 4) && (0 !== y2b % 100) || (0 === y2b % 400) ? 29 : 28;
    }
    if (d2a > nday[m2a - 1]) {
        alert("Not a day. Check the From: Month and Day you selected");
    }
    if (d2b > nday[m2b - 1]) {
        alert("Not a day. Check the To: Month and Day you selected");
    }

    ////var er3a = parseFloat(form.ADBC1.selectedIndex);
    ////var er3b = parseFloat(form.ADBC2.selectedIndex);

    var sday3 = cday2 - cday1;

    if (sday3 < 0) {
        sday3 = nday[cmonth1 - 1] - cday1 + cday2;
        cmonth2 = cmonth2 - 1;
    }

    if (cmonth2 < 0) {
        cmonth2 = cmonth2 + 12;
        cyear2 = cyear2 - 1;
    }

    var smonth3 = cmonth2 - cmonth1;
    if (smonth3 < 0) {
        smonth3 = smonth3 + 12;
        cyear2 = cyear2 - 1;
    }
    

    var syear3 = 0;
    //if (er3a == 1) { cyear1 = -cyear1 + 1; }
    //if (er3b == 1) { cyear2 = -cyear2 + 1; }


    syear3 = cyear2 - cyear1;
    
    //if (er3a == 1) { y2a = -y2a + 1; }
    var rjd1 = cal_to_jd(y2a, m2a, d2a);
    
    //if (er3b == 1) { y2b = -y2b + 1; }
    var rjd2 = cal_to_jd(y2b, m2b, d2b);
    
    if (rjd2 < rjd1) {
        alert("Check your From: and To: selections.");
    }

    else if (d2a > nday[m2a - 1]) {
        alert("Not a day. Check the FROM: day you selected");
    }

    else if (d2b > nday[m2b - 1]) {
        alert("Not a day. Check the TO: day you selected");
    }

    else if ((DataInicioANO === "") || (y3a < 1)) {
        alert("Not a day. Check the FROM: year entered");
    }
    else if ((DataFinalANO === "") || (y3b < 1)) {
        alert("Not a day. Check the TO: year entered");
    }
    else {
        
        $("#txtResultado").val('  ' + syear3 + ' years ' + '  ' + smonth3 + ' months ' + '  ' + sday3 + ' days');
    }
    
}

//function stripBad(string) {
//    for (var i = 0, output = '', valid = "eE-0123456789."; i < string.length; i++)
//        if (valid.indexOf(string.charAt(i)) != -1)
//            output += string.charAt(i);
//    return output;
//}

function cal_to_jd(y2, m2, d2) {
    var j1 = 0;
    var jy = 0;
    var ja = 0;
    var jm = 0;
    if (m2 > 2) {
        jy = y2;
        jm = m2 + 1;
    } else {
        jy = y2 - 1;
        jm = m2 + 13;
    }


    var intgr = Math.floor(Math.floor(365.25 * jy) + Math.floor(30.6001 * jm) + d2 + 1720995);
    var intgr2 = intgr;

    var gregcal = 15 + 31 * (10 + 12 * 1582);
    if (d2 + 31 * (m2 + 12 * y2) >= gregcal) {
        ja = Math.floor(0.01 * jy);
        intgr2 += 2 - ja + Math.floor(0.25 * ja);
    }

    rjd = intgr2;
    return rjd;
}