import SVGGenerator from './SVGGenerator';

var imgTags = document.querySelectorAll('[data-placeholder]');

imgTags.forEach(function(imageContainer) {
    const svgGen = new SVGGenerator(imageContainer);

   const xml = svgGen.getDefaultXMLImage();
   imageContainer.src = 'data:image/svg+xml;charset=utf-8,' + xml;
   imageContainer.style.fontSize = '1000px';
});