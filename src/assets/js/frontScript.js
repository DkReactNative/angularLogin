function loadjsfile(filename) {
    console.log("loading front-user " + filename)
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename)
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function loadcssfile(filename) {
    console.log("loading front-user " + filename)
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', filename);
    document.getElementsByTagName('head')[0].appendChild(link);
}
loadcssfile("assets/css/style.css")