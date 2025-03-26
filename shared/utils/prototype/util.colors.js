export const jsgradient = {
    inputA: '',
    inputB: '',
    inputC: '',
    gradientElement: '',

    // Convert a hex color to an RGB array e.g. [r,g,b]
    // Accepts the following formats: FFF, FFFFFF, #FFF, #FFFFFF
    hexToRgb: function (hex) {
        var r, g, b, parts;
        // Remove the hash if given
        hex = hex.replace('#', '');
        // If invalid code given return white
        if (hex.length !== 3 && hex.length !== 6) {
            return [255, 255, 255];
        }
        // Double up charaters if only three suplied
        if (hex.length == 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        // Convert to [r,g,b] array
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);

        return [r, g, b];
    },

    // Converts an RGB color array e.g. [255,255,255] into a hexidecimal color value e.g. 'FFFFFF'
    rgbToHex: function (color) {
        // Set boundries of upper 255 and lower 0
        color[0] = color[0] > 255 ? 255 : color[0] < 0 ? 0 : color[0];
        color[1] = color[1] > 255 ? 255 : color[1] < 0 ? 0 : color[1];
        color[2] = color[2] > 255 ? 255 : color[2] < 0 ? 0 : color[2];

        return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
    },

    // Pads a number with specified number of leading zeroes
    zeroFill: function (number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number;
    },

    // Generates an array of color values in sequence from 'colorA' to 'colorB' using the specified number of steps
    generateGradient: function (colorA, colorB, steps) {
        var result = [],
            rInterval,
            gInterval,
            bInterval;

        colorA = this.hexToRgb(colorA); // [r,g,b]
        colorB = this.hexToRgb(colorB); // [r,g,b]
        steps -= 1; // Reduce the steps by one because we're including the first item manually

        // Calculate the intervals for each color
        let rStep = (Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0])) / steps;
        let gStep = (Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1])) / steps;
        let bStep = (Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2])) / steps;

        result.push('#' + this.rgbToHex(colorA));

        // Set the starting value as the first color value
        var rVal = colorA[0],
            gVal = colorA[1],
            bVal = colorA[2];

        // Loop over the steps-1 because we're includeing the last value manually to ensure it's accurate
        for (var i = 0; i < steps - 1; i++) {
            // If the first value is lower than the last - increment up otherwise increment down
            rVal = colorA[0] < colorB[0] ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
            gVal = colorA[1] < colorB[1] ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
            bVal = colorA[2] < colorB[2] ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
            result.push('#' + this.rgbToHex([rVal, gVal, bVal]));
        }

        result.push('#' + this.rgbToHex(colorB));

        return result;
    },

    gradientList: function (colorA, colorB, list) {
        list = typeof list === 'object' ? list : document.querySelector(list);

        var listItems = list.querySelectorAll('li'),
            steps = listItems.length,
            colors = jsgradient.generateGradient(colorA, colorB, steps);

        for (var i = 0; i < listItems.length; i++) {
            var item = listItems[i];
            item.style.backgroundColor = colors[i];
        }
    },

    getReversal: function (hexcolor) {
        if (!hexcolor) return false;
        hexcolor = hexcolor.replace('#', '');
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 200 ? false : true;
    },
};

/**
 * HEX color to RGB color
 * @return {Array} RGB Color
 */
String.prototype.hexToRgb = function () {
    return jsgradient.hexToRgb(this);
};

/**
 * RGB color to HEX color
 * @return {String} HEX Color
 */
Array.prototype.rgbToHex = function () {
    return jsgradient.rgbToHex(this);
};

/**
 * 시작색상부터 종료색상까지 원하는 단계로 나누어 그라디언트 컬러 생성
 * @return {Array} HEX Gradients Color
 */
Array.prototype.getGradients = function (colorA, colorB, step) {
    if (!step) step = 10;
    return jsgradient.generateGradient(colorA, colorB, step);
};

/**
 * 타겟 색상에 따라 텍스트 조정
 * @return {String} Color
 */
String.prototype.getTextColorByBG = function ($color) {
    const returnColor = $color ? $color : '#000';

    const c = this.indexOf(',') >= 0 ? this : this.replace('#', ''); // 색상 앞의 # 제거
    const rgbChk = this.indexOf(',') >= 0 ? true : false;

    let rgb, r, g, b, a;
    // Hex
    if (!rgbChk) {
        rgb = parseInt(c, 16);
        r = (rgb >> 16) & 0xff; // red 추출
        g = (rgb >> 8) & 0xff; // green 추출
        b = (rgb >> 0) & 0xff; // blue 추출
    } else {
        rgb = c.split(',');
        r = parseFloat(rgb[0]) || 0;
        g = parseFloat(rgb[1]) || 0;
        b = parseFloat(rgb[2]) || 0;
        a = rgb[3] || null;
    }
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma < 127.5 && a != null && a > 0.4 ? '#fff' : returnColor;
};

/**
 * scss darken 대체
 * HEX code를 전달받아 amount만큼 어두운 rgb 색상 반환
 * @param {String} color HEX code
 * @param {Number} amount 어둡기 정도
 * @return {String} rgb color
 */
export function getDarkenColor(color, amount) {
    color = color.trim();

    // 3자리 HEX 코드 6자리로 변환
    if (color.length === 4) {
        color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`);
    }

    // # 없으면 추가
    if (!color.startsWith('#')) {
        color = `#${color}`;
    }

    const parsedColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    if (!parsedColor) {
        return null;
    }

    const r = parseInt(parsedColor[1], 16);
    const g = parseInt(parsedColor[2], 16);
    const b = parseInt(parsedColor[3], 16);

    const darkenAmount = amount / 100;

    const newR = Math.round(r * (1 - darkenAmount));
    const newG = Math.round(g * (1 - darkenAmount));
    const newB = Math.round(b * (1 - darkenAmount));

    return `rgb(${newR}, ${newG}, ${newB})`;
}

const setProperty = function (key, color) {
    document.querySelector(':root').style.setProperty(`--${key}`, color);
};

export function setPrimaryColor(color) {
    setProperty('primary', color);
    setProperty('primary-rgb', color.hexToRgb().toString());
    setProperty('primary_brd_color_hover', getDarkenColor(color, 18));
    setProperty('primary_bg_color_hover', getDarkenColor(color, 12));
    setProperty('primary_brd_color_active', getDarkenColor(color, 30));
    setProperty('primary_bg_color_active', getDarkenColor(color, 20));
}

export function setSecondaryColor(color) {
    setProperty('secondary', color);
    setProperty('secondary-rgb', color.hexToRgb().toString());
    setProperty('secondary_brd_color_hover', getDarkenColor(color, 18));
    setProperty('secondary_bg_color_hover', getDarkenColor(color, 12));
    setProperty('secondary_brd_color_active', getDarkenColor(color, 30));
    setProperty('secondary_bg_color_active', getDarkenColor(color, 20));
}

export function setTertiaryColor(color) {
    setProperty('tertiary', color);
    setProperty('tertiary-rgb', color.hexToRgb().toString());
    setProperty('tertiary_brd_color_hover', getDarkenColor(color, 18));
    setProperty('tertiary_bg_color_hover', getDarkenColor(color, 12));
    setProperty('tertiary_brd_color_active', getDarkenColor(color, 30));
    setProperty('tertiary_bg_color_active', getDarkenColor(color, 20));
}
