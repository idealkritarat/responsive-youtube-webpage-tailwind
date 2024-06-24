const genreLeft = $("#genre-go-left");
const genreRight = $("#genre-go-right");
const genreScroll = document.getElementById("genre-scroll");

$(genreRight).click(() => { 
    $(genreLeft).addClass("grid");
    $(genreLeft).removeClass("hidden");
    genreScroll.scrollBy(250,0);
    $(genreScroll).css("mask-image", `
        linear-gradient(
            to right,
            rgba(0,0,0,0),
            rgba(0,0,0,1) 10%,
            rgba(0,0,0,1) 90%,
            rgba(0,0,0,0)
        )
    `);
});

$(genreLeft).click(() => { 
    if(genreScroll.scrollLeft <= 250){
        $(genreLeft).addClass("hidden");
        $(genreLeft).removeClass("grid");
        $(genreScroll).css("mask-image", `
            linear-gradient(
                to right,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 90%,
                rgba(0,0,0,0)
            )
        `);
    }
    genreScroll.scrollBy(-250,0);
});


// Clone youtube 

const feed = document.getElementById("youtube-feed");
const video = document.getElementById("video");
const time = ["day", "month", "year"], timenum = [30,12,5];
let n = 80;

while(n--){
    const   clone = video.cloneNode(true),
            index = Math.floor(Math.random() * 3),
            x = Math.floor(Math.random() * timenum[index])+1,
            views = Math.random()*1000 + 1;
            clone.id = "";
    clone.getElementsByClassName("text-neutral-400 text-sm")[1].innerHTML = 
    `${views.toFixed(0)}K views - ${x} ${time[index]}${x>1?"s":""} ago`;
    feed.appendChild(clone);
}

// genre

const genreBar = $("#genre-bar");

$(window).resize(setGenreWidth);

function setGenreWidth() { 
    $(genreBar).width($(feed).width());
}

// menu

const menuBtn = $("#menu-btn");
const maxAside = $("#max-aside");
const minAside = $("#min-aside");
const main = $("#yt-main");
const floatMenuBg = ("#float-menu-bg");
const menuBtnFloat = ("#menu-btn-float");
let PreferMax = true;
let floating = false;

const maximizeMenu = () => {
    $(maxAside).addClass("sticky pt-3");
    $(maxAside).removeClass("fixed pt-16 left-0");
    $(minAside).addClass("hidden");
    $(minAside).removeClass("flex");
    $(main).css("grid-template-columns", "240px auto");
}

const minimizeMenu = () => {
    $(minAside).addClass("flex");
    $(minAside).removeClass("hidden");
    if(!floating){
        $(maxAside).addClass("fixed top-16 -left-60 pt-3");
        $(maxAside).removeClass("sticky top-0 pt-16 left-0");
    }
    $(main).css("grid-template-columns", "100px auto");
}

const hideMenu = () => {
    $(maxAside).addClass("fixed top-16 -left-60 pt-3");
    $(maxAside).removeClass("sticky top-0 pt-16 left-0");
    $(minAside).addClass("hidden");
    $(minAside).removeClass("flex");
    $(main).css("grid-template-columns", "100vw");
}

const showFloatMenu = () => {
    $(maxAside).addClass("left-0");
    $(maxAside).removeClass("-left-60");
    $(floatMenuBg).addClass("opacity-55 z-20");
    $(floatMenuBg).removeClass("opacity-0 -z-10");
    $("body").css("overflow-y","hidden");
    floating = true;
    PreferMax = true;
}

const hideFloatMenu = () => {
    $(maxAside).removeClass("left-0");
    $(maxAside).addClass("-left-60");
    $(floatMenuBg).removeClass("opacity-55 z-20");
    $(floatMenuBg).addClass("opacity-0 -z-10");
    $("body").css("overflow-y","scroll");
    floating = false;
}

const responseToScreen = () => {
    if($(window).width()>1280){
        hideFloatMenu();
        MenuSizePrefer();
    } else if($(window).width()>860){
        minimizeMenu();
    } else {
        if(!floating)hideMenu();
    }

    if($(window).width()<=1280){
        $(maxAside).addClass("top-0");
        $(maxAside).removeClass("top-16");
        $(menuBtnFloat).addClass("flex");
        $(menuBtnFloat).removeClass("hidden");
    } else {
  
        $(menuBtnFloat).removeClass("flex");
        $(menuBtnFloat).addClass("hidden");
    }
}

const MenuSizePrefer = () => {
    if(PreferMax) maximizeMenu();
    else minimizeMenu();
}

const menuBtnFloatBtn = $("#menu-btn-float-btn");

$(menuBtnFloatBtn).click(() => { 
    hideFloatMenu();
});

$(menuBtn).click(()=> {
    if($(window).width()<=860){
        showFloatMenu();
    } else if($(window).width()<=1280) {
        showFloatMenu();
    } else if(PreferMax){
        minimizeMenu();
        PreferMax = false;
    } else {
        maximizeMenu();
        PreferMax = true;
    }
});


$(window).resize(responseToScreen);

responseToScreen();
setGenreWidth();