class SVGGenerator {

    constructor(imageContainer) {
        this.imageContainer = imageContainer;
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const dimensions = imageContainer.dataset.placeholder.split('/');
        this.width = parseInt(dimensions[0]);
        this.height = parseInt(dimensions[1]);
        this.svgElement.setAttributeNS(null, 'width', this.width);
        this.svgElement.setAttributeNS(null, 'height', this.height);
        this._setColors();
    }

    createBackground(color) {
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectElement.setAttributeNS(null, 'fill', color);
        rectElement.setAttributeNS(null, 'stroke', 'none');
        rectElement.setAttributeNS(null, 'x', 0);
        rectElement.setAttributeNS(null, 'y', 0);
        rectElement.setAttributeNS(null, 'width', this.width);
        rectElement.setAttributeNS(null, 'height', this.height);

        this.svgElement.append(rectElement);
    }

    createCircle(radius, borderColor = 'black', fillColor = 'black') {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', this.width/2);
        circle.setAttributeNS(null, 'cy', this.height/2);
        circle.setAttributeNS(null, 'r',  radius);
        borderColor && circle.setAttributeNS(null, 'stroke', borderColor); 
        fillColor && circle.setAttributeNS(null, 'fill', fillColor); 
        this.svgElement.append(circle);
    }

    createHorizontalLine(x, y, length, color) {
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x + length);
        line.setAttribute('y2', y);
        line.setAttribute("stroke", color)
        this.svgElement.append(line);
    }

    createVerticalLine(x, y, length, color) {
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y + length);
        line.setAttribute("stroke", color)
        this.svgElement.append(line);
    }

    _setColors() {
        const containerWidth = Math.round(this.imageContainer.getBoundingClientRect().width);
        const containerHeight = Math.round(this.imageContainer.getBoundingClientRect().height);

        this.backgroundColor = 'lightgray';
        if(containerWidth && containerHeight) {
            const boundsScale = containerWidth / containerHeight;
            const svgScale = this.width / this.height;
console.log(Math.abs(boundsScale - svgScale));
            if(Math.abs(boundsScale - svgScale) > 0.02) {
                this.backgroundColor = 'tomato';
            }
        }
        this.createBackground(this.backgroundColor);
    }

    _createDefaultSVGImage() {
        const max = (this.width > this.height) ? this.width : this.height;
        const maxRadius = max/2;
        const scaleFactor = maxRadius / 5;

        const horizontalScaling = this.height/4;
        const verticalScaling = this.width/4;

        const maxElements = 5;
        let currentElement = 0;

        do {
            this.createCircle(maxRadius - scaleFactor * currentElement, 'black', this.backgroundColor);
            currentElement++;

        } while(currentElement < maxElements)

        currentElement = 0;
        do {
            this.createHorizontalLine(0, horizontalScaling * currentElement, this.width, 'black');
            this.createVerticalLine(verticalScaling * currentElement, 0, this.height, 'black');
            currentElement++;

        } while(currentElement < maxElements)

        return this.svgElement;
    }

    _appendText() {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const content = this.svgElement.ownerDocument.createTextNode(this.width + ' x ' + this.height);

        textElement.setAttributeNS(null, 'x', this.width/2);
        textElement.setAttributeNS(null, 'y', this.height/2 + 25);
        textElement.setAttributeNS(null, 'fill', 'black');
        textElement.setAttributeNS(null, 'text-anchor', 'middle');
        textElement.setAttributeNS(null, 'font-size', '100');
        textElement.setAttributeNS(null, 'font-family', 'Helvetica');

        textElement.appendChild(content);
        this.svgElement.append(textElement);        
    }

    getDefaultXMLImage() {
        this._createDefaultSVGImage();
        this._appendText();
        return (new XMLSerializer).serializeToString(this.svgElement);
    }

}

export default SVGGenerator;