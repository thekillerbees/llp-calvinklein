var map_element = document.getElementsByClassName('map');

function changeMap () {
  console.log('cm run')
  var windowheight = window.innerHeight;
  var difference = windowheight -3;
  map_element[0].style.height = difference +"px";
}

//window.addEventListener("load", changeMap, false);
//window.addEventListener("resize", changeMap, false);

function moreinfo_change() {
    if(window.innerWidth > 800) {
       var topbox = document.getElementsByClassName('form-wrapper');
       var getpoi = document.getElementsByClassName('poi');
       var getmap = document.getElementsByClassName('map');
       
       topbox[0].style.display = "none";
       getpoi[0].style.top = "0px";
       getpoi[0].style.overflow = "auto";
       getmap[0].style.pointerEvents ="none";

       var pin = document.getElementsByClassName("mappin");
       console.log(pin[0]);
       document.getElementsByClassName("mappin")[0].setAttribute("data-display","false");
   } 
}

 function moreinfo_changeback() {
   var topbox = document.getElementsByClassName('form-wrapper');
   var getpoi = document.getElementsByClassName('poi');
   var getmap = document.getElementsByClassName('map');
   var iconDiv = document.getElementById('iconOverlay');
   iconDiv.style.display="none";
   topbox[0].style.display = "block";
   getpoi[0].style.top = "";
   getpoi[0].style.overflow = "auto";
   getmap[0].style.pointerEvents ="all";
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
    var iconDiv = document.getElementById('iconOverlay');
    iconDiv.style.display="none";
}

function open_filters() {
  var poiEl = document.getElementById('poiEl')
  if (poiEl.className.indexOf('w-filt') === -1) {
    poiEl.className += ' w-filt'
  }
  
  


    var filter_down = document.getElementById('filter_button');
    var filter_up = document.getElementById('filter_button_up');
    //var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters'); 
    filter_down.style.display="none";
    filter_up.style.display="inline";
    //getpoi[0].style.left="-9000px"; 
    getfilters.style.left="0"; 
}

function close_filters() {
  var poiEl = document.getElementById('poiEl')
  poiEl.className = poiEl.className.replace(' w-filt', '')
  
    var filter_down = document.getElementById('filter_button');
    var filter_up = document.getElementById('filter_button_up');
    //var getpoi = document.getElementsByClassName('poi'); 
    var getfilters = document.getElementById('filters'); 
    if(filter_down) {filter_down.style.display="inline"};
    if(filter_up) {filter_up.style.display="none"};
    if(getfilters) {getfilters.style.left="-9000px";} 
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
    var iconDiv = document.getElementById('iconOverlay');
    iconDiv.style.display="block";
    var arrow = document.getElementsByClassName(e);
    arrow[0].click();
  }
}

// MOBILE FUNCTIONS //

function showMap() {
  var mapEl = document.getElementById('mapEl')
   if (mapEl.className.indexOf('active') === -1) {
    console.log(mapEl.className)
    mapEl.className += ' active'
    var poiEl = document.getElementById('poiEl')
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
    //listview.style.backgroundColor = "#014E62";
    listview.className = 'active';
    mapview.style.color = "gray";
    //mapview.style.backgroundColor = "white";
    mapview.className = 'default';
    attrib[0].style.display="block";
    parent.postMessage("w2gi:iframeHeightUpdated" + "//" + 500 + "//" + $('#w2gi_wrapper').width(),"*");
  }
}

function showList() {
  var mapEl = document.getElementById('mapEl')
  mapEl.className = mapEl.className.replace(' active', '')

  var poiEl = document.getElementById('poiEl')
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
    //listview.style.backgroundColor = "white";
    listview.className = 'default';
    mapview.style.color = "white";
    mapview.className = 'active';
    //mapview.style.backgroundColor = "#014E62";
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
    getpoi[0].className = 'poi';
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

function toggleFilters(event) {
  var target = event.target;
  console.log(target.parentElement);
  var parentattribute = target.parentElement.getAttribute("check");
  console.log(parentattribute);
  if(parentattribute == null) {
    target.parentElement.setAttribute("checked", "true");
    target.parentElement.setAttribute("check", "true");
    parentattribute = target.parentElement.getAttribute("checked");
  }
  if(parentattribute == "true") {
     target.parentElement.setAttribute("checked", "true");
     target.parentElement.setAttribute("check", "false");
     target.previousElementSibling.previousElementSibling.style.display = "none";
     target.previousElementSibling.style.display="block";
     target.style.fontWeight="600";
     target.nextElementSibling.style.display="block";
     target.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("checked", "true");
     // var checkbox = target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
     // checkbox.click();
  }
  else {
     var target = event.target;
     target.parentElement.setAttribute("checked", "false");
     target.parentElement.setAttribute("check", "true");
     /*target.previousElementSibling.style.display="block";
     target.style.display="none";
     target.nextElementSibling.style.fontWeight="normal";
     target.nextElementSibling.nextElementSibling.style.display="none";*/
     target.previousElementSibling.previousElementSibling.style.display = "block";
     target.previousElementSibling.style.display="none";
     target.style.fontWeight="normal";
     target.nextElementSibling.style.display="none";
     target.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("checked", "");
  }
}
// Resolves discrepancies between Desktop and Mobile views
function checkWidth() {
  //console.log('cw run')
    var indicator = document.getElementById('indicator');
    //var getpoi = document.getElementsByClassName("poi");
    //var getmap = document.getElementsByClassName("map");
    var goback = document.getElementById('back_image');
    var attrib = document.getElementsByClassName('attribution');

    if(window.innerWidth > 801){
        if(indicator.className == "mobile") {
        attrib[0].style.display="block";
        close_filters_mobile();
        //getpoi[0].style.left="100px";
        //getpoi[0].style.height="auto";
        //getmap[0].style.left="0";
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

function filterselect() {
  var search_button = document.getElementsByClassName('button-search');
  search_button[0].click();
}


window.addEventListener("resize", checkWidth, false);