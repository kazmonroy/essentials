// GSAP timeline

const tl = gsap.timeline({defaults: {duration: 0.75, ease: 'Power2.easeOut'}})

// Animations
const leaveAnimation = (current, done) => {

    const product = current.querySelector('.image-product')
    const bubbles = current.querySelectorAll('.circle')
    const text = current.querySelector('.product-text')
    const arrow = current.querySelector('.arrow')

    return (
        tl.fromTo(arrow, {opacity: 1, y: 0}, {opacity: 0, y:20}),
        tl.fromTo(product, {opacity: 1, y: 0}, {opacity: 0, y:20}, '<'),
        tl.fromTo(text, {opacity: 1, y: 0}, {opacity: 0, y:20}, '<'),
        tl.fromTo(bubbles, {opacity: 1, y: 0}, {opacity: 0, y:-100, stagger: 0.15, onComplete: done}, '<')
    )
}

const enterAnimation = (next, done, gradient) => {

    const product = next.querySelector('.image-product')
    const bubbles = next.querySelectorAll('.circle')
    const text = next.querySelector('.product-text')
    const arrow = next.querySelector('.arrow')


    return (
        tl.fromTo(arrow, {opacity: 0, y: 20}, {opacity: 1, y:0}),
        tl.to('body', {background: gradient}, '<'),
        tl.fromTo(product, {opacity: 0, y: 20}, {opacity: 1, y:0}, '<'),
        tl.fromTo(text, {opacity: 0, y: 20}, {opacity: 1, y:0}, '<'),
        tl.fromTo(bubbles, {opacity: 0, y: -100}, {opacity: 1, y:0, stagger: 0.15, onComplete: done}, '<')
    )
}



// Barba init
barba.init({
    preventRunning: true,
    transitions: [
        {
            name: 'default',
            once(data) {
                const done = this.async();
                let next = data.next.container;
                let gradient = getGradient(data.next.namespace);
                gsap.set('body', {background: gradient});
                enterAnimation(next, done, gradient);

            },
            leave(data) {
                const done = this.async();
                let current = data.current.container;
                leaveAnimation(current, done);

            },
            enter(data){
                const done = this.async()
                let next = data.next.container;
                let gradient = getGradient(data.next.namespace);
                enterAnimation(next, done, gradient);

            }
        }
    ]
})


// Change gradient background
function getGradient(name) {
    switch(name){
        case 'handbag':
            return 'linear-gradient(260deg, #d3555b, #a26267)';
        case 'boot': 
            return 'linear-gradient(260deg, #5d8cb7, #4c4f70)';
        case 'hat':
            return 'linear-gradient(260deg, #b27a5c, #7f5450)'
    }
}