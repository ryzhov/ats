function digest() {
    var tmp;

    if (this.pass != '') {
	tmp = SHA1(this.pass);
	tmp = SHA1(this.key + tmp.toUpperCase() + this.key);
    } else {
	tmp = '';
    }

    return tmp;
}

function getkey() {
    var xml;

    xml = sendSync1("/xml/auth.php?do=getkey");
    this.getStatus(xml);
    
    if (this.status == 'ok') {
	this.key = xml.getElementsByTagName('key')[0].firstChild.nodeValue;
    }
    
    this.showStatus(xml);
        
}

function login() {
    var xml;
    
    this.user = document.getElementById('login').value;
    this.pass = document.getElementById('password').value;

    xml = sendSync1('/xml/auth.php?do=login&user='+this.user+'&digest='+this.digest());
    this.getStatus(xml);
    
    if (this.status != 'ok') {
	this.key = xml.getElementsByTagName('key')[0].firstChild.nodeValue;
	this.showStatus(xml);
    } else {
	// User logged successfully, redirect to main page '/' now.
	top.location.href='/';
    }

}

function logout() {
    var xml = sendSync1("/xml/auth.php?do=logout");

    this.getStatus(xml);
    
    if (this.status == 'ok') {
	document.getElementById('menu_auth').firstChild.firstChild.nodeValue = 'login';
    }
    this.showStatus(xml);
}

function setTextNode(id,text) {
    if (document.getElementById(id).firstChild == null) {
	document.getElementById(id).appendChild(document.createTextNode(text));
    } else {
	document.getElementById(id).firstChild.nodeValue = text;
    }
}


function getStatus(xml) {
    this.status = xml.getElementsByTagName('status')[0].firstChild.nodeValue;
}

function showStatus(xml) {
    var cmd = xml.getElementsByTagName('do')[0].firstChild.nodeValue;
    var status = xml.getElementsByTagName('status')[0].firstChild.nodeValue;
    var mess = xml.getElementsByTagName('message')[0].firstChild.nodeValue;

    this.setTextNode('do','Do '+cmd);
    this.setTextNode('status', 'status ['+status+']');
    this.setTextNode('message', 'message ['+mess+']');
}


// -- Constructor ---------------------------------------
function Auth() {

    // ------------- properties -------------------------
    this.key = null;
    this.user = null;
    this.pass = null;

    this.status = null;

    // ------------- private methods ----------------------------
    this.digest = digest;
    this.getStatus = getStatus;
    this.showStatus = showStatus;
    this.setTextNode = setTextNode;

    // ------------- public methods ----------------------------
    this.getkey = getkey;
    this.login = login;
    this.logout = logout;
}
