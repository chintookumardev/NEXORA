// Initializes Locomotive Scroll and connects it with GSAP ScrollTrigger.
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Creates a smooth scrolling instance for the main container.
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // Enables smooth scrolling on tablets.
        tablet: { smooth: true },

        // Enables smooth scrolling on mobile devices.
        smartphone: { smooth: true }
    });

    // Updates ScrollTrigger whenever Locomotive Scroll updates.
    locoScroll.on("scroll", ScrollTrigger.update);

    // Connects Locomotive Scroll with GSAP ScrollTrigger.
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            // Scrolls Locomotive Scroll when a new scroll position is provided.
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },

        // Provides the viewport dimensions to ScrollTrigger.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    // Refreshes Locomotive Scroll whenever ScrollTrigger refreshes.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // Refreshes ScrollTrigger after the initial setup.
    ScrollTrigger.refresh();
}

// Handles the initial loading animation of the website.
function loadingAnimation() {

    // Creates a GSAP timeline for the page loading sequence.
    var tl = gsap.timeline()

    // Fades in the first page.
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })

    // Expands and reveals the first page with a smooth effect.
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })

    // Fades in the navigation bar.
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })

    // Reveals the main page content with a staggered animation.
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}

// Controls the hover animation of the navigation menu.
function navAnimation() {

    // Selects the navigation element.
    var nav = document.querySelector("nav")

    // Runs when the mouse enters the navigation area.
    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()

        // Expands the navigation dropdown area.
        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })

        // Displays the hidden submenu items.
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1

        })

        // Animates submenu text into view.
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration:0.3,
            stagger: {
                amount: 0.5
            }
        })
    })

    // Runs when the mouse leaves the navigation area.
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline()

        // Moves submenu text back to its hidden position.
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })

        // Hides the submenu items.
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })

        // Collapses the navigation dropdown.
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })
}

// Adds interactive image-following effects to the elements on page 2.
function page2Animation() {

    // Selects all elements containing the page 2 content.
    var rightElems = document.querySelectorAll(".right-elem")

    // Adds mouse interactions to every right-side element.
    rightElems.forEach(function (elem) {

        // Shows and scales the image when the mouse enters.
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })

        // Hides and scales down the image when the mouse leaves.
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })

        // Moves the image according to the mouse position.
        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 215
            })
        })
    })
}

// Handles the showreel video and project preview animations.
function page3VideoAnimation() {

    // Selects the showreel center area.
    var page3Center = document.querySelector(".page3-center")

    // Selects the page 3 video.
    var video = document.querySelector("#page3 video")

    // Opens and plays the showreel when the center button is clicked.
    page3Center.addEventListener("click", function () {
        video.play()

        // Expands the video to fill the page.
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })

    // Closes and pauses the video when it is clicked.
    video.addEventListener("click", function () {
        video.pause()

        // Shrinks the video back to its original state.
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })


    // Selects all project preview sections.
    var sections = document.querySelectorAll(".sec-right")

    // Adds hover video playback to every project section.
    sections.forEach(function (elem) {

        // Plays the project video when the mouse enters.
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1
            elem.childNodes[3].play()
        })

        // Hides and resets the project video when the mouse leaves.
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0
            elem.childNodes[3].load()
        })
    })

}

// Creates the scroll-based animation for the page 6 process section.
function page6Animations() {

    // Animates the process items when the section enters the viewport.
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            // markers:true,
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}

// Initializes smooth scrolling.
locomotiveAnimation()

// Initializes navigation animations.
navAnimation()

// Initializes page 2 hover animations.
page2Animation()

// Initializes page 3 video and project hover animations.
page3VideoAnimation()

// Initializes page 6 scroll animations.
page6Animations()

// Starts the website loading animation.
loadingAnimation()
