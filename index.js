// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother.create({
//   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
//   effects: true, // looks for data-speed and data-lag attributes on elements
//   content: "#smooth-content",
// });





document.querySelectorAll(".pinDiv").forEach(i => {
  const dynamicEnd = () => "+=" + (i.offsetHeight + window.innerHeight * 20) + "px";
  ScrollTrigger.create({
    trigger: i,
    start: "top top",
    end: dynamicEnd,
    scrub: 4,
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
  })
});



gsap.to('.clouds', {
    y: 200,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    } 

});


const sectionTimeline = gsap.timeline({
  defaults: { duration: 1},
  scrollTrigger: {
    trigger: ".part1",
    start: "top top",
    end: () => "+=" + (document.querySelector('.part1').offsetHeight * 22) + "px",
    invalidateOnRefresh: true,
    scrub: true,
    markers: true,
  }
});




sectionTimeline
  .fromTo(".img1", 
    { x: -500, autoAlpha: 0, y: 0 }, 
    { x: 0, autoAlpha: 1, y: 0 }
  )
  .fromTo(".text1",
    { x: 100, autoAlpha: 0, y: 0 },
    { x: 0, autoAlpha: 1, y: 0 },
    "<" 
  )
  .to(".img1", 
    { x: -500, autoAlpha: 0, y: 0 }
  )
  .fromTo(".img2", 
    {x: 500, autoAlpha: 0, y: 0},
    {x: -200, autoAlpha: 1, y: 0}
  )
  .to(".img2", 
    {x: -700, autoAlpha: 0, y: 0}
  )
  .fromTo(".img3", 
    {opacity: 0, scale: 0,  y: 0},
    {opacity: 1, scale: 1, y: 0},
    "<"
  );


const distance = 300; 
const speed = { value: 1}

console.log("timeline.duration()", sectionTimeline.duration());
console.log("scrollDistance", document.querySelector('.part1').offsetHeight * 8);

const anim = gsap.to(".header", {
  x: `-=${distance}`,  
  duration: 5,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(value => {
      // нормализация по модулю distance
      value = parseFloat(value);
      return value % distance;
    })
  }
});



document.querySelector('.header').addEventListener('mouseenter', () => {
    gsap.to(speed, {
      value: 0,
      duration: 1,
      onUpdate: () => {
        anim.timeScale(speed.value);
      }
    })
});

document.querySelector('.header').addEventListener('mouseleave', () => {
  gsap.to(speed, {
      value: 1,
      duration: 1,
      onUpdate: () => {
        anim.timeScale(speed.value);
      }
    })
});

