function loadjsfile(filename) {
    console.log("loading admin " + filename)
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename)
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function loadcssfile(filename) {
    console.log("loading admin " + filename)
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', filename);
    document.getElementsByTagName('head')[0].appendChild(link);
}
// loadjsfile("myscript.js");
loadcssfile("assets/admin/css/style.css");
loadcssfile("assets/admin/dist/css/developer.css");
loadcssfile("assets/admin/bower_components/font-awesome/css/font-awesome.min.css");
loadcssfile("assets/admin/bower_components/bootstrap/dist/css/bootstrap.min.css");