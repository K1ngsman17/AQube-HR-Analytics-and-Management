
//global vars 
var gd = document.getElementById("gd");
var hPot =  document.getElementById("gd");
var s =  document.getElementById("s");
var od =  document.getElementById("od");
var cp =  document.getElementById("gcpd");
var hPer =  document.getElementById("hPer");
var bh =  document.getElementById("bh");
var og =  document.getElementById("og");
var w =  document.getElementById("w");


fetch(
    `performanceAllInfo.php`
).then((res) => res.json())
.then(function (data) {
    globalAllPerfData = data;
    console.log("globalAllPerfData ", globalAllPerfData);
    boxgrid(globalAllPerfData)
});

function boxgrid(globalAllPerfData)
{
    let d1 = document.getElementById("dep1");
    let d2 = document.getElementById("dep2");
    let d3 = document.getElementById("dep3");
    let dAll = document.getElementById("depAll");

    d1.addEventListener('click', dep1());
    d2.addEventListener('click', dep1(d2Perf));
    d3.addEventListener('click', dep1(d3Perf));
    dAll.addEventListener('click', dep1(globalAllPerfData));
    console.log("Success");
}

function dep1()
{
    console.log("in js dep1");
    var res = "<?php echo dep1()><?>";
    gd.innerHTML = res;
}