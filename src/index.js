import SVGGenerator from './SVGGenerator';

var imgTags = document.querySelectorAll('[data-placeholder]');
imgTags.forEach(function(imageContainer) {
    const svgGen = new SVGGenerator(imageContainer);

   const xml = svgGen.getDefaultXMLImage();
   imageContainer.src = 'data:image/svg+xml;charset=utf-8,' + xml;

/*
   var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
   var content = svgElement.ownerDocument.createTextNode(w + ' x ' + h);

   
   textElement.setAttributeNS(null, 'x', w/2);
   textElement.setAttributeNS(null, 'y', h/2 + 5);
   textElement.setAttributeNS(null, 'fill', 'white');
   textElement.setAttributeNS(null, 'text-anchor', 'middle');
   textElement.appendChild(content);

   svgElement.append(rectElement);



   svgElement.append(textElement);
*/

});