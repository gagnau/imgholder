import SVGGenerator from './SVGGenerator';


document.querySelectorAll('[data-placeholder]').forEach(function(imageContainer) {
    const svgGen = new SVGGenerator(imageContainer);
    const xml = svgGen.getDefaultXMLImage();
    imageContainer.src = 'data:image/svg+xml;charset=utf-8,' + xml;
});

let rtime;
let timeout = false;
const delta = 200;
window.addEventListener("resize", () => {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

const resizeend = () => {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        document.querySelectorAll('[data-placeholder]').forEach(function(imageContainer) {
            const svgGen = new SVGGenerator(imageContainer);
            const xml = svgGen.getDefaultXMLImage();
            imageContainer.src = 'data:image/svg+xml;charset=utf-8,' + xml;
        });
    }               
}