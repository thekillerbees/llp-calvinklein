var map_element = document.getElementsByClassName('map');

function changeMap () {
  var windowheight = window.innerHeight;
  var difference = windowheight -3;
  map_element[0].style.height = difference +"px";
}

window.addEventListener("load", changeMap, false);
window.addEventListener("resize", changeMap, false);

function moreinfo_change() {
    if(window.innerWidth > 800) {
       var topbox = document.getElementsByClassName('form-wrapper');
       var getpoi = document.getElementsByClassName('poi');
       var getmap = document.getElementsByClassName('map');
       var zoomtools = document.getElementsByClassName('ol-panzoom');
       topbox[0].style.display = "none";
       getpoi[0].style.top = "25px";
       getpoi[0].style.overflow = "hidden";
       getmap[0].style.pointerEvents ="none";
       zoomtools[0].style.display="none";
   } 
   parent.postMessage("w2gi:iframeHeightUpdated" + "//" + $('#w2gi_wrapper').height() + "//" + $('#w2gi_wrapper').width(),"*");
}

 function moreinfo_changeback() {
   var topbox = document.getElementsByClassName('form-wrapper');
   var getpoi = document.getElementsByClassName('poi');
   var getmap = document.getElementsByClassName('map');
   var zoomtools = document.getElementsByClassName('ol-panzoom');
   topbox[0].style.display = "block";
   //getpoi[0].style.top = "157px";
   getpoi[0].style.overflow = "auto";
   getmap[0].style.pointerEvents ="all";
   zoomtools[0].style.display="block";
   parent.postMessage("w2gi:iframeHeightUpdated" + "//" + $('#w2gi_wrapper').height() + "//" + $('#w2gi_wrapper').width(),"*");
}

function getdirections_moreinfo(){ 
    var bubble_open = document.getElementById('open_bubble'); bubble_open.click(); 
    var container_bubble = document.getElementsByClassName('ol-overlaycontainer-stopevent'); 
    var bubble_input = document.getElementById('input_bubble'); 
    var input = document.getElementById('input_moreinfo'); 
    var bubble_submit = document.getElementById('bubble_submit'); 
    container_bubble[0].style.display="none"; 
    bubble_input.value = input.value;
    bubble_submit.click();
}

function open_filters() {
    var filter_down = document.getElementById('filter_button');
    var filter_up = document.getElementById('filter_button_up');
    var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters'); 
    filter_down.style.display="none";
    filter_up.style.display="inline";
    getpoi[0].style.left="-9000px"; 
    getfilters.style.left="0"; 
}

function close_filters() {
    var filter_down = document.getElementById('filter_button');
    var filter_up = document.getElementById('filter_button_up');
    var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters'); 
    filter_down.style.display="inline";
    filter_up.style.display="none";
    getpoi[0].style.left="100px"; 
    getfilters.style.left="-9000px"; 
}

function toggleFilter(event) {
   var target = event.target;
   target.parentElement.setAttribute("checked", "true");
   target.style.display="none";
   target.nextElementSibling.style.display="block";
   target.nextElementSibling.nextElementSibling.style.fontWeight="600";
   target.nextElementSibling.nextElementSibling.nextElementSibling.style.display="block";
   // var checkbox = target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
   // checkbox.click();
}

function untoggleFilter(event) {
   var target = event.target;
   target.parentElement.setAttribute("checked", "");
   target.previousElementSibling.style.display="block";
   target.style.display="none";
   target.nextElementSibling.style.fontWeight="normal";
   target.nextElementSibling.nextElementSibling.style.display="none";
   // var checkbox = target.nextElementSibling.nextElementSibling.nextElementSibling;
   // checkbox.click();
}

function applyFilters() {
    var filter_items = document.getElementsByClassName('filter_div');
    for (var i = 0; i < filter_items.length; i++) {

       var check = filter_items[i].getAttribute("checked");
       if (check == "true") {
       filter_items[i].lastElementChild.checked = true;
       } else {
            filter_items[i].lastElementChild.checked = false;
         }
     }
     var search_button = document.getElementsByClassName('button-search');
     search_button[0].click();
     close_filters();
}

function showMoreinfo(e) {
    if(window.innerWidth > 800) {
        var arrow = document.getElementsByClassName(e);
        arrow[0].click();
    }
}

// MOBILE FUNCTIONS //

function showMapOLD() {
    var getmap = document.getElementsByClassName('map');
    var getpoi = document.getElementsByClassName('poi');
    var listview = document.getElementById('listview');
    var mapview = document.getElementById('mapview');
    var attrib = document.getElementsByClassName('attribution');
    //getmap[0].style.left = "2%";
    getpoi[0].style.left="-9000px";
    getpoi[0].style.height="100px";
    listview.style.color = "white";
    listview.style.backgroundColor = "#014E62";
    mapview.style.color = "gray";
    mapview.style.backgroundColor = "white";
    attrib[0].style.display="block";
	parent.postMessage("w2gi:iframeHeightUpdated" + "//" + $('#w2gi_wrapper').height() + "//" + $('#w2gi_wrapper').width(),"*");     
}

function showMap() {
  var mapEl = document.getElementById('mapEl')
   if (mapEl.className.indexOf('active') === -1) {
    console.log(mapEl.className)
    mapEl.className += ' active'
    var poiEl = document.getElementById('poi')
    poiEl.className += ' hidden'
    //var getmap = document.getElementsByClassName('map');
    //var getpoi = document.getElementsByClassName('poi');
    var listview = document.getElementById('listview');
    var mapview = document.getElementById('mapview');
    var attrib = document.getElementsByClassName('attribution');
    //getmap[0].style.left = "2%";
    //getpoi[0].style.left="-9000px";
    //getpoi[0].style.height="100px";
    listview.style.color = "white";
    listview.style.backgroundColor = "#014E62";
    mapview.style.color = "gray";
    mapview.style.backgroundColor = "white";
    attrib[0].style.display="block";
    parent.postMessage("w2gi:iframeHeightUpdated" + "//" + 500 + "//" + $('#w2gi_wrapper').width(),"*");
  }
}

function showListOLD() {
    var getmap = document.getElementsByClassName('map');
    var getpoi = document.getElementsByClassName('poi');
    var listview = document.getElementById('listview');
    var mapview = document.getElementById('mapview');
    var attrib = document.getElementsByClassName('attribution');
    //getmap[0].style.left = "-9000px";
    getpoi[0].style.left="0";
    getpoi[0].style.height="auto";
    listview.style.color = "gray";
    listview.style.backgroundColor = "white";
    mapview.style.color = "white";
    mapview.style.backgroundColor = "#014E62";
    attrib[0].style.display="none";
    parent.postMessage("w2gi:iframeHeightUpdated" + "//" + $('#w2gi_wrapper').height() + "//" + $('#w2gi_wrapper').width(),"*");
        
}

function showList() {
  var mapEl = document.getElementById('mapEl')
  mapEl.className = mapEl.className.replace(' active', '')

  var poiEl = document.getElementById('poi')
  poiEl.className = poiEl.className.replace(' hidden', '')

    //var getmap = document.getElementsByClassName('map');
    //var getpoi = document.getElementsByClassName('poi');
    var listview = document.getElementById('listview');
    var mapview = document.getElementById('mapview');
    var attrib = document.getElementsByClassName('attribution');
    //getmap[0].style.left = "-9000px";
    //getpoi[0].style.left="0";
    //getpoi[0].style.height="auto";
    listview.style.color = "gray";
    listview.style.backgroundColor = "white";
    mapview.style.color = "white";
    mapview.style.backgroundColor = "#014E62";
    attrib[0].style.display="none";

    parent.postMessage("w2gi:iframeHeightUpdated" + "//" + poiEl.scrollHeight + "//" + $('#w2gi_wrapper').width(),"*");
}

 function open_filters_mobile() {
    var filter_down = document.getElementById('filter_button_mobile');
    var filter_up = document.getElementById('filter_button_up_mobile');
    var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters'); 
    filter_down.style.display="none";
    filter_up.style.display="inline";
    // This needs to be adjusted if a filter is added and the filter box is larger
    getpoi[0].style.marginTop="327px";
    getfilters.style.left="0"; 
}

function close_filters_mobile() {
    var filter_down = document.getElementById('filter_button_mobile');
    var filter_up = document.getElementById('filter_button_up_mobile');
    var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters');
    filter_down.style.display="inline";
    filter_up.style.display="none";
    getpoi[0].style.marginTop="0";
    getfilters.style.left="-9000px"; 
}

function applyFilters_mobile() {
    var filter_items = document.getElementsByClassName('filter_div');
    for (var i = 0; i < filter_items.length; i++) {
       var check = filter_items[i].getAttribute("checked");
       if (check == "true") {
       filter_items[i].lastElementChild.checked = true;
       } else {
            filter_items[i].lastElementChild.checked = false;
         }
     }
     var search_button = document.getElementsByClassName('button-search');
     search_button[0].click();
     close_filters_mobile();
}

// Resolves discrepancies between Desktop and Mobile views
function checkWidth() {
    var indicator = document.getElementById('indicator');
    var getpoi = document.getElementsByClassName("poi");
    var getmap = document.getElementsByClassName("map");
    var goback = document.getElementById('back_image');
    var attrib = document.getElementsByClassName('attribution');

    if(window.innerWidth > 801){
        if(indicator.className == "mobile") {
        attrib[0].style.display="block";
        close_filters_mobile();
        getpoi[0].style.left="100px";
        getpoi[0].style.height="auto";
        getmap[0].style.left="0";
        var check = document.body.contains(goback);
         if (check == true) {
           goback.click();
         } else { 
         }
     }
        indicator.className = "desktop";
    }

    if(window.innerWidth < 802) {
         if(indicator.className == "desktop") {
            attrib[0].style.display="none";
            close_filters();
            showList();
            var check = document.body.contains(goback);
             if (check == true) {
               goback.click();
             } else {
             }
         }
        indicator.className = "mobile";
    }
}

window.addEventListener("resize", checkWidth, false);