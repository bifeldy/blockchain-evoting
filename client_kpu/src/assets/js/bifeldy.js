/* 
    JavaScript Untuk Keseluruhan Halaman Website
    -- Basilius Bias Astho Christyono
    -- bias.astho@gmail.com
*/

/** Ambil Parameter Dari URL */
function parseURLParams(url) {

    // https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript

    let queryStart = url.indexOf("?") + 1,
    queryEnd   = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
    }

    return parms;
}

/** Global Variable Status Menu */
var desktop = true;
var overlayExist = true;
var navbarOpen = false;
var Delay = 125;

/** Ukuran Window Di Resize */
function windowResize() {

    /** Khusus Desktop */
    if(desktop) {

        // Sembunyikan Tombol Menu Mobile
        document.getElementById('nav-open-close').style.display = '';

        // Paksa Tutup Menu
        let mobileNav = document.getElementById('nav-open-close').getElementsByTagName('i')[0];
        mobileNav.className = "fa fa-fw fa-bars";
        document.getElementById('navbar').style.height = '';
        let sidebarMenu = document.getElementById('navbar').getElementsByTagName('a');

        // Tutup Menu
        for(let i=0; i<sidebarMenu.length; i++) {
            sidebarMenu[i].getElementsByClassName('visibleMenu')[0].style.display = 'none';
        }
        navbarOpen = false;
        Delay = 125;

        // Overlay
        if(overlayExist){
            document.getElementById("overlay").style.visibility = "hidden";
            document.getElementById("overlay").style.opacity = "0";
        }
    }

    // Cek Ukuran Jika Desktop
    if(window.innerWidth >= 768 || window.OuterWidth >= 768) {
        desktop = true;
    }

}

/** Buka Tutup Menu */
function toggleShowHideNavbar() {
    let sidebarMenu = document.getElementById('navbar').getElementsByTagName('a');
    if(navbarOpen){
        // Tutup Menu
        for(let i=0; i<sidebarMenu.length; i++) {
            sidebarMenu[i].getElementsByClassName('visibleMenu')[0].style.display = 'none';
        }
        navbarOpen = false;
        Delay = 125;
        if(overlayExist){
            document.getElementById("overlay").style.visibility = "hidden";
            document.getElementById("overlay").style.opacity = "0";
        }
    }
    else {
        // Buka Menu
        for(let i=0; i<sidebarMenu.length; i++) {
            sidebarMenu[i].getElementsByClassName('visibleMenu')[0].style.display = 'inline-block';
        }
        navbarOpen = true;
        Delay = 0;
        if(overlayExist){
            document.getElementById("overlay").style.visibility = "visible";
            document.getElementById("overlay").style.opacity = "1";
        }
    }
}

/** Buka Tutup Desktop Menu */
function navbarShowHide(){
    // Ukuran Resolusi Layar Desktop Doank
    if(desktop) {
        setTimeout(toggleShowHideNavbar, Delay);
    }
}

/** Buka Tutup Mobile Menu */
function mobileShowHideNavbar() {
    // Icon Bar Menu Dan Close
    let mobileNav = document.getElementById('nav-open-close').getElementsByTagName('i')[0];
    if (mobileNav.className === "fa fa-fw fa-bars") {
        // Buka Menu
        document.getElementById('navbar').style.height = '100%';
        mobileNav.className += "fa fa-fw fa-remove";
    }
    else {
        // Tutup Menu
        mobileNav.className = "fa fa-fw fa-bars";
        document.getElementById('navbar').style.height = '';
    }
    toggleShowHideNavbar();
};

/** Jam */
function checkTime(i) {
    /** Tambahin 0 Kalo Kurang Dari Angka 10 */
    if (i < 10) {
        i = "0" + i
    } 
    return i;
}
function startTime() {
    /** o'Clockz */
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    /** Cek Digit Angka */
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    /** Tampilkan Jam */
    document.getElementById('jam').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 500);
}

function onDocumentLoaded() {
    /** Cek Ukuran layar Dan Hilangkan Tampilan Yang Ga Perlu Di Mobile */
    if (window.innerWidth < 768 || window.OuterWidth < 768) {
        // Set Mobile Status
        desktop = false;
        // Hapus Overlay
        $('#overlay').remove();
        overlayExist = false;
    }
    else {
        // Overlay Jam
        startTime();
    }
}