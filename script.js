function locomotiveAnime(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function introanime(){
    // gsap.from(".line h1",{
//     y:150,
//     stagger:0.2,
//     duration:0.6,
//     delay: 0.5
//     })
// var h5 =document.querySelector("#counter h5")
// var increase=0
// setInterval(function(){
// // console.log("he")
// if(increase<=100){
//     h5.innerHTML=increase++
// // console.log(increase)
// }
// else{
// h5innerHTML=increase
// // console.log(increase)
// }
//     },30)

    var tl=gsap.timeline()
    tl.from(".line h1",{
    y:150,
    stagger:0.2,
    duration:1,
    delay:0.2
    });
    tl.from("#counter",{
opacity:0,
onStart:function(){
    var h5 =document.querySelector("#counter h5");
var increase=0
setInterval(function(){
// console.log("he")
if(increase<=100){
    h5.innerHTML=increase++
// console.log(increase)
}
else{
h5innerHTML=increase
// console.log(increase)
}
    },30);
}
    });
    tl.to(".line h2",{
        animationName:"fontchange",
        opacity:1
    });
        tl.to("#loader",{
            opacity:0,
            duration:0.8,
            delay:2,       //loader ka duration
        });

        tl.from("#page1",{
           y:1500,
           delay:0.2,
           duration:0.5,
           ease:Power4,
        });
    tl.to("#loader",{
        display:"none",   
    });
    tl.from("#nav",{
        opacity:0
    })
    
    tl.from("#start1 h1,#start2 h1,#start3 h2,#start4 h1",{
        y:200,
        stagger:0.2,
    })
}

function cursorAnime(){
    document.addEventListener("mousemove",function(dets){
    // console.log("hello")
    // console.log(dets.x)
    gsap.to("#cursor",{
        left:dets.x,
        top:dets.y
    }) 

})
Shery.makeMagnet("#nav2 h4",{});

var vdo=document.querySelector("#videobox")
var video=document.querySelector("#videobox video")
vdo.addEventListener("mouseenter",function(){
    vdo.addEventListener("mousemove",function(dets){
        gsap.to("#cursor",{
            opacity:0
        })
gsap.to("#vdocursor",{
   left: dets.x-250 ,  // clientX
            top: dets.y-150,   // clientY
            duration: 0.2  
})
    })
});
vdo.addEventListener("mouseleave",function(){
    gsap.to("#cursor",{
        opacity:1
    })
    gsap.to("#vdocursor",{
    left:"80%",
top:"-10%",
})
});

var flag=0
vdo.addEventListener("click",function(){
    if (flag==0){

    video.play()
    video.style.opacity=1,
    //   img.style.display = "none";
      document.querySelector("#vdocursor").innerHTML=`<i class="ri-pause-line"></i>`
gsap.to("#vdocursor",{
    scale:0.5
})
flag=1
    }
    else{
        video.pause()
  video.style.opacity=0,
    //   img.style.display = "none";
      document.querySelector("#vdocursor").innerHTML=` <i class="ri-play-fill"></i>`
gsap.to("#vdocursor",{
    scale:1
})
flag=0
    }

})

}

function sheryanime(){
    Shery.imageEffect(".imagedivC",{
        style:5,
        // debug:true,
        config:{"a":{"value":1.37,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.799994569354803},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.21,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.49,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.29,"range":[0,2]},"noise_scale":{"value":15.27,"range":[0,100]}},
        gooey:true
    })
}

introanime();
cursorAnime();
locomotiveAnime();
sheryanime();

document.addEventListener("mousemove",function(dets){
    gsap.to("#dress",{
        x:dets.x,
        y:dets.y
    })
})

document.querySelector("#start3").addEventListener("mousemove",function(){
    gsap.to("#dress",{
        opacity:1
    })
})
document.querySelector("#start3").addEventListener("mouseleave",function(){
    gsap.to("#dress",{
        opacity:0
    })
})



// var footerh1=document.querySelector("#footer h1");
// var footer = document.querySelector("#footer");


// footer.addEventListener("mouseenter", function(){
// gsap.fromTo("#footer h1",
//     {opacity:0,x:30},
//    {
//      opacity:1,
//     y:0,
//     delay:0.5,
//     duration:1,
//     onStart : function(){
//         // console.log("Hello")
//         $('#footer h1').textillate({ in: { effect: 'fadeIn' } });
//         footerh1.style.fontFamily="'Playfair Display', serif";
//     }
//     });
// });
// footer.addEventListener("mouseleave", function(){
//     gsap.to("#footer h1",{
//         opacity:1,
//         duration:0.5,
//         onComplete:function(){
//               $('#footer h1').textillate({ in: { effect: 'fadeOut' } });
//          footerh1.style.fontFamily="'Inter', sans-serif";
//         }
//     });
// });

// var footerh1 = document.querySelector("#footer h1");
// var footer = document.querySelector("#footer");

// // mouse enter
// footer.addEventListener("mouseenter", function () {
//   // fade out current text
//   gsap.to("#footer h1", {
//     opacity: 0,
//     duration: 0.4,
//     onComplete: function () {
//       // change font
//       footerh1.style.fontFamily = "'Playfair Display', serif";

//       // fade in new text
//       gsap.fromTo(
//         "#footer h1",
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           onStart: function () {
//             $('#footer h1').textillate({ in: { effect: 'fadeIn' } });
//           }
//         }
//       );
//     }
//   });
// });

// // mouse leave
// footer.addEventListener("mouseleave", function () {
//   gsap.to("#footer h1", {
//     opacity: 0,
//     duration: 0.4,
//     onComplete: function () {
//       // reset to default font
//       footerh1.style.fontFamily = "'Inter', sans-serif";

//       // fade back in with default
//       gsap.fromTo(
//         "#footer h1",
//         { opacity: 0, y: -20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           onStart: function () {
//             $('#footer h1').textillate({ in: { effect: 'fadeOut' } });
//           }
//         }
//       );
//     }
//   });
// }); 