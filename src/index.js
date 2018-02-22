import SVGGenerator from './SVGGenerator';

document.querySelectorAll('[data-placeholder]').forEach(function(imageContainer) {
    const svgGen = new SVGGenerator(imageContainer);
    const xml = svgGen.getDefaultXMLImage();

    imageContainer.src = 'data:image/svg+xml;charset=utf-8,' + xml;
});
