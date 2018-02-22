class SVGGenerator {

    constructor(imageContainer) {
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const dimensions = imageContainer.dataset.placeholder.split('/');
        this.width = parseInt(dimensions[0]);
        this.height = parseInt(dimensions[1]);
        this.svgElement.setAttributeNS(null, 'width', this.width);
        this.svgElement.setAttributeNS(null, 'height', this.height);
        this.createBackground('lightgray');
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

    _createDefaultSVGImage() {
        const max = (this.width > this.height) ? this.width : this.height;
        const maxRadius = max/2;
        const scaleFactor = maxRadius / 5;

        const horizontalScaling = this.height/4;
        const verticalScaling = this.width/4;

        const maxElements = 5;
        let currentElement = 0;

        do {
            this.createCircle(maxRadius - scaleFactor * currentElement, 'black', 'lightgray');
            currentElement++;

        } while(currentElement < maxElements)

        currentElement = 0;
        do {
            this.createHorizontalLine(0, horizontalScaling * currentElement, this.width, 'black');
            this.createVerticalLine(verticalScaling * currentElement, 0, this.height, 'black');
            currentElement++;

        } while(currentElement < maxElements)

/*
        this.createHorizontalLine(0, 0, this.width, 'black');
        this.createHorizontalLine(0, horizontalCenter/2, this.width, 'black');
        this.createHorizontalLine(0, horizontalCenter, this.width, 'black');
        this.createHorizontalLine(0, horizontalCenter*1.5, this.width, 'black');
        this.createHorizontalLine(0, horizontalCenter*2, this.width, 'black');

        this.createVerticalLine(0, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter/2, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*1.5, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*2, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*2.5, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*3, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*3.5, 0, this.width, 'black');
        this.createVerticalLine(verticalCenter*4, 0, this.width, 'black');
*/
        return this.svgElement;
    }

    getDefaultXMLImage() {
        this._createDefaultSVGImage();
        return (new XMLSerializer).serializeToString(this.svgElement);
    }

}

export default SVGGenerator;