// Rileva la versione in uso del browser.
var NS4;
var NS6;
var IE4;
//var IE5;
var MAC;

if (navigator.platform == 'MacPPC')
	MAC = 1;
else
	MAC = 0;

if (navigator.appName.indexOf("Netscape") >= 0 &&
	parseFloat(navigator.appVersion) >= 4 &&  parseFloat(navigator.appVersion) < 5)
	NS4 =1;
else 
	NS4 =0;
	
if (navigator.appName.indexOf("Netscape") >= 0 &&
	parseFloat(navigator.appVersion) >= 5)
	NS6 =1;
else
	NS6 =0;
	
if (document.all) 
	IE4=1;
else 
	IE4=0;

/*if (IE4 && navigator.appVersion.indexOf("5.") >= 0) 
	IE5=1;
else
	IE5=0; */

/***************************
* Posizionamento dei layer *
***************************/

// Posiziona l'angolo superiore sinistro del layer 
// alle coordinate x e y passate come parametri.
// Tali coordinate sono relative al container genitore del layer

function moveLayerTo(layer, x, y) {

  if (NS4) layer.moveTo(x, y);
  if (IE4) {
    layer.style.left = x;
    layer.style.top  = y;
  }
  if (NS6){
	layer.style.left = parseInt (x)+ "px";
	layer.style.top = parseInt (y)+ "px";
	}  
}

// Muove il layer di una distanza dx orizzontale e
// dy verticale all'interno del container genitore

function moveLayerBy(layer, dx, dy) {

  if (NS4) layer.moveBy(dx, dy);
  if (IE4) {
    layer.style.pixelLeft += dx;
    layer.style.pixelTop  += dy;
  }
  if (NS6){
	layer.style.left = parseInt (layer.style.left)+ dx + "px";
	layer.style.top = parseInt (layer.style.top)+ dy + "px";
	}
}

// Ritorna l'ascissa dell'angolo superiore sinistro del layer
// relativa al container genitore

function getLeft(layer) {

  if (NS4) return layer.left;
  if (IE4) return layer.style.pixelLeft;
  if (NS6) return layer.style.left;
  return -1;
}

// Ritorna l'ordinata dell'angolo superiore sinistro del layer
// relativa al container genitore

function getTop(layer) {

  if (NS4) return layer.top;
  if (IE4) return layer.style.pixelTop;
  if (NS6) return layer.style.top;
  return -1;
}

// Ritorna l'ascissa dell'angolo superiore destro del layer
// relativa al container genitore.

function getRight(layer) {

  if (NS4) return layer.left + getWidth(layer);
  if (IE4) return layer.style.pixelLeft + getWidth(layer);
  if (NS6) return parseInt (layer.style.left) + getWidth(layer);
  return -1;
}

// Ritorna l'ordinata del lato inferiore del layer
// relativa al container genitore.

function getBottom(layer) {

  if (NS4) return layer.top + getHeight(layer);
  if (IE4) return layer.style.pixelTop + getHeight(layer);
  if (NS6) return parseInt (layer.style.top) + getHeight(layer);
  return -1;
}

// Ritorna l'ascissa del lato sinistro del layer
// relativa alla pagina. 

function getPageLeft(layer) {

  var x;

  if (NS4) return layer.pageX;
  if (IE4 || NS6) {
    x = 0;
    while (layer.offsetParent != null) 
		{
		x += layer.offsetLeft;
		layer = layer.offsetParent;
		}
    x += layer.offsetLeft;
    return x;
  }
  return -1;
}

// Ritorna l'ordinata del lato superiore del layer
// relativa alla pagina 

function getPageTop(layer) {

  var y;

  if (NS4) return layer.pageY;
  if (IE4 || NS6) {
    y = 0;
    while (layer.offsetParent != null) {
      y += layer.offsetTop;
      layer = layer.offsetParent;
    }
    y += layer.offsetTop;
    return y;
  }
  return -1;
}

// Ritorna la larghezza del layer in pixel

function getWidth(layer) {

  if (NS4) {
    if (layer.document.width)
      return layer.document.width;
    else
      return layer.clip.right - layer.clip.left;
  }
  if (IE4) {
    if (layer.style.pixelWidth)
      return layer.style.pixelWidth;
    else
      return layer.clientWidth;
  }
  if (NS6) {
      return parseInt (layer.style.width);
  }
  return -1;
}

// Ritorna l'altezza del layer in pixel

function getHeight(layer) {

  if (NS4) {
    if (layer.document.height)
      return layer.document.height;
    else
      return layer.clip.bottom - layer.clip.top;
  }
  if (IE4) {
    if (layer.style.pixelHeight)
      return layer.style.pixelHeight;
    else
      return layer.clientHeight;
  }
  if (NS6) {
      return parseInt (layer.style.height);
  }
  return -1;
}

// Ritorna il valore della proprietà zIndex del layer

function getzIndex(layer) {

  if (NS4) return layer.zIndex;
  if (IE4 || NS6) return layer.style.zIndex;
  return -1;
}

// Imposta la proprietà zIndex del layer al 
// valore passato come parametro z. 

function setzIndex(layer, z) {

  if (NS4) layer.zIndex = z;
  if (IE4 || NS6) layer.style.zIndex = z;
}

/********************************
*  Visualizzazione dei Layer    *
********************************/

//Nasconde il layer

function hideLayer(layer) {

  if (NS4) layer.visibility = "hide";
  if (IE4 || NS6) layer.style.visibility = "hidden";
}

//Rende il layer visibile

function showLayer(layer) {

  if (NS4) layer.visibility = "show";
  if (IE4 || NS6) layer.style.visibility = "visible";
}

//Fà ereditare al layer le impostazioni di
//visibilità del suo genitore

function inheritLayer(layer) {

  if (NS4) layer.visibility = "inherit";
  if (IE4 || NS6) layer.style.visibility = "inherit";
}

//ritorna lo stato di visibilità corrente del layer

function getVisibility(layer) {

  if (IE4 || NS6) return layer.style.visibility;
  if (NS4) {
    if (layer.visibility == "show") return "visible";
    if (layer.visibility == "hide") return "hidden";
    return layer.visibility;
  }
  return "";
}

/******************************************************************************
* Scorrimento dei Layer.
*******************************************************************************/

// Fa scorrere il layer fino alle coordinate specificate

function scrollLayerTo(layer, x, y, bound) {

  var dx = getClipLeft(layer) - x;
  var dy = getClipTop(layer) - y;

  scrollLayerBy(layer, -dx, -dy, bound);
}

// Fa scorrere il layer delle distanze indicate

function scrollLayerBy(layer, dx, dy, bound) {

  var cl = getClipLeft(layer);
  var ct = getClipTop(layer);
  var cr = getClipRight(layer);
  var cb = getClipBottom(layer);

  if (bound) {
    if (cl + dx < 0) dx = -cl;
    else if (cr + dx > getWidth(layer)) dx = getWidth(layer) - cr;
    if (ct + dy < 0) dy = -ct;
    else if (cb + dy > getHeight(layer)) dy = getHeight(layer) - cb;
  }
  clipLayer(layer, cl + dx, ct + dy, cr + dx, cb + dy);
  moveLayerBy(layer, -dx, -dy);
}

/******************************************************************************
* Utilities per Layers.
*******************************************************************************/

// Restituisce un "identificatore" per il layer chiamato

function getLayer(name) {

  if (IE4) return eval('document.all.' + name);
  if (NS4) return findLayer(name, document);
  if (NS6) return eval("document.getElementById('" + name + "')");
  return null;
}

// Trova il layer specificato

function findLayer(name, doc) {

  var i;
  var layer;

  for (i = 0; i < doc.layers.length; i++) {
    layer = doc.layers[i];
    if (layer.name == name) return layer;
    if (layer.document.layers.length > 0)
	  if ((layer = findLayer(name, layer.document)) != null) 
	    return layer;
  }
  return null;
}

// sostituisce il contenuto del layer identificato da sNomeLayer

function sostituisciTestoLayer(sNomeLayer, sTesto){
  var Lpreview = getLayer(sNomeLayer);
  if (NS4){
  Lpreview.document.open();
  Lpreview.document.write(sTesto);
  Lpreview.document.close();
  }
  
  if (IE4 || NS6){
   Lpreview.innerHTML= sTesto;
  }
}

/***************************************************
* Gestione delle regioni visibili (clip) dei layer *
***************************************************/

// Definisce la regione visibile del layer in base ai parametri passati.
// Le coordinate sono relative al layer.

function clipLayer(layer, left, top, right, bottom) {

  if (NS4) {
    layer.clip.left   = left;
    layer.clip.top    = top;
    layer.clip.right  = right;
    layer.clip.bottom = bottom;
  }
  if (IE4 || NS6)
    layer.style.clip = 'rect(' + top + ' ' +  right + ' ' + bottom + ' ' + left +')';
}

// Ritorna l'ascissa dell'angolo superiore sinistro della regione visibile
// relativamente al layer

function getClipLeft(layer) {
  var str;
  var clip;

  if (NS4) return layer.clip.left;
  if (IE4 || NS6) {
    str =  layer.style.clip;
    if (!str) return 0;
    clip = getIEClipValues(layer.style.clip);
    return(clip[3]);
  }
  return -1;
}

// Ritorna l'ordinata del lato superiore della regione visibile
// relativamente al layer

function getClipTop(layer) {
  var str;
  var clip;
  
  if (NS4) return layer.clip.top;
  if (IE4 || NS6) {
    str =  layer.style.clip;
    if (!str) return 0;
    clip = getIEClipValues(layer.style.clip);
    return clip[0];
  }
  return -1;
}

// Ritorna l'ascissa dell'angolo inferiore destro della regione visibile
// relativamente al layer

function getClipRight(layer) {
  var str;
  var clip;

  if (NS4) return layer.clip.right;
  if (IE4 || NS6) {
    str =  layer.style.clip;
    if (!str) return layer.style.pixelWidth;
    clip = getIEClipValues(layer.style.clip);
    return clip[1];
  }
  return -1;
}

// Ritorna l'ascissa del lato inferiore della regione visibile
// relativamente al layer

function getClipBottom(layer) {
  var str;
  var clip;

  if (NS4) return layer.clip.bottom;
  if (IE4 || NS6) {
    str =  layer.style.clip;
    if (!str) return layer.style.pixelHeight;
    clip = getIEClipValues(layer.style.clip);
    return clip[2];
  }
  return -1;
}

// fornisce la larghezza della clip

function getClipWidth(layer) {
	
 if (IE4 || NS6) {
	    var str = layer.style.clip;
		var clip = getIEClipValues(layer.style.clip);
		
	    if (!str) return layer.style.pixelWidth;
	    return clip[1] - clip[3];
	  }
  if (NS4) return layer.clip.width;
  
  return -1;
}

// fornisce l'altezza della clip

function getClipHeight(layer) {
  
  if (IE4 || NS6) {
    var str =  layer.style.clip;
	var clip = getIEClipValues(layer.style.clip);
	
    if (!str) return layer.style.pixelHeight;
    return clip[2] - clip[0];
  }
  if (NS4) return layer.clip.height;
  
  return -1;
}

// fornisce il valore della clip per Internet Explorer

function getIEClipValues(str) {

  var clip = new Array();
  var i;

  // Spezzetta i valori di clip per i layer di IE

  i = str.indexOf("(");
  clip[0] = parseInt(str.substring(i + 1, str.length), 10);
  i = str.indexOf(" ", i + 1);
  clip[1] = parseInt(str.substring(i + 1, str.length), 10);
  i = str.indexOf(" ", i + 1);
  clip[2] = parseInt(str.substring(i + 1, str.length), 10);
  i = str.indexOf(" ", i + 1);
  clip[3] = parseInt(str.substring(i + 1, str.length), 10);
  return clip;
}

/******************************************************************************
* Proprieta' di windows e della pagina.
*******************************************************************************/

// Restituisce la larghezza interna della finestra o del frame

function getWindowWidth() {

  if (IE4 ) return document.body.clientWidth;
  if (NS4 || NS6) return window.innerWidth;
  return -1;
}

// Restituisce l'altezza interna della finestra o del frame inner

function getWindowHeight() {

  if (IE4) return document.body.clientHeight;
  if (NS4 || NS6) return window.innerHeight;
  return -1;
}

// Restituisce la larghezza della finestra o del frame

function getPageWidth() {

  if (IE4) return document.body.scrollWidth;
  if (NS4) return document.width;
  if (NS6) return window.outerWidth;
  return -1;
}

// Restituisce l'altezza interna della finestra o del frame inner

function getPageHeight() {

  if (IE4) return document.body.scrollHeight;
  if (NS4) return document.height;
  if (NS6) return window.outerHeight;
  return -1;
}

//Restituisce lo scorrimento orizzontale della pagina rispetto alla finestra o al frame 

function getPageScrollX() {

  if (IE4) return document.body.scrollLeft;
  if (NS4 || NS6) return window.pageXOffset;
  return -1;
}

//Restituisce lo scorrimento orizzontale della pagina rispetto alla finestra o al frame 

function getPageScrollY() {

  if (IE4) return document.body.scrollTop;
  if (NS4 || NS6) return window.pageYOffset;
  return -1;
}

/******************************************************************************
* Utilities per immagini.
*******************************************************************************/

// Restituisce un "identificatore" per l'immagine chiamata

function getImage(name) {

  if (IE4) return eval('document.all.' + name);
  if (NS4 || NS6) return findImage(name, document);
  return null;
}

// Trova l'immagine specificata 

function findImage(name, doc) {

  var i;
  var img;

  for (i = 0; i < doc.images.length; i++)
    if (doc.images[i].name == name) return doc.images[i];
  for (i = 0; i < doc.layers.length; i++)
    if ((img = findImage(name, doc.layers[i].document)) != null) {
      img.container = doc.layers[i];
      return img;
    }
  return null;
}

// Restituisce l'ascissa (x) dell'angolo alto-sinistra dell'immagine riferita alla pagina

function getImagePageLeft(img) {

  var x;
  var obj;
  
  if (IE4 || NS6 ) {
    x = 0;
    obj = img;
    while (obj.offsetParent != null) {
      x += obj.offsetLeft;
      obj = obj.offsetParent;
    }
    x += obj.offsetLeft;
    return x;
  }
  if (NS4) {
    if (img.container != null)
      return img.container.pageX + img.x;
    else
      return img.x;
  }
  
  return -1;
}

// Restituisce l'ordinata (y) dell'angolo alto-sinistra dell'immagine riferita alla pagina

function getImagePageTop(img) {

  var y;
  var obj;
  
  if (IE4 || NS6) {
    y = 0;
    obj = img;
    while (obj.offsetParent != null) {
      y += obj.offsetTop;
      obj = obj.offsetParent;
    }
    y += obj.offsetTop;
    return y;
  }
  if (NS4) {
    if (img.container != null)
      return img.container.pageY + img.y;
    else
      return img.y;
  }
  return -1;
}

/******************************************************************************
* Layer background.
******************************************************************************/

// Imposta il colore di sfondo

function setBgColor(layer, color) {

  if (IE4 || NS6) layer.style.backgroundColor = color;
  if (NS4) layer.bgColor = color;
}

// Imposta l'immagine di sfondo del layer

function setBgImage(layer, src) {
 
  if (IE4 || NS6) layer.style.backgroundImage = "url(" + src + ")";
  if (NS4) layer.background.src = src;
}
