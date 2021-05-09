const queryString = require('query-string');
const _ = require('lodash');

// constants for image mime types
const IMAGE_SVG = 'image/svg+xml';
const IMAGE_PNG = 'image/png';
const IMAGE_WEBP = 'image/webp';
const IMAGE_JPEG = 'image/jpeg';
// constants for image layouts
const LAYOUT_FULL_WIDTH = 'full-width';
const LAYOUT_INLINE = 'inline';
// default params for Contentful Images API
const IMAGE_PARAMS = {
    fit: 'fill',
    f: 'faces'
};
const WEBP_PARAMS = {
    fm: 'webp',
    q: 80
}

const IMAGE_PARAMS_FALLBACK = _.extend({
    fm: 'png',
}, IMAGE_PARAMS);

function getImageUrl (image, params) {
    const imageUrl = `https:${image.fields.file.url}`; 
    const imageQuery = queryString.stringify(params);
    return `${imageUrl}?${imageQuery}`;    
}

function renderSvg(image, layout = LAYOUT_FULL_WIDTH) {
    return `<img class="image-svg ${layout}"
    src="https:${image.fields.file.url}"
    alt="${image.fields.title}" loading="lazy">`;
}


function renderTeaserImage(imageMobile, imageDesktop, breakPoint = '61rem', mobileWidth = 320, desktopWidth = 448) {
    const mobileParams = _.extend({
        fm: 'png',
        w: mobileWidth
    }, IMAGE_PARAMS);
    const desktopParams = _.extend({
        fm: 'png',
        w: desktopWidth
    }, IMAGE_PARAMS);
    const imageUrl = `https:${imageMobile.fields.file.url}`;
    const altText = imageMobile.fields.title;
    const mobileUrl =  getImageUrl(imageMobile, mobileParams);
    const tabletUrl = getImageUrl(imageMobile, desktopParams);
    const desktopUrl = getImageUrl(imageDesktop, desktopParams);
    
    return `
    <picture class="teaser-picture">
        <source srcset="${desktopUrl}" media="(min-width: ${breakPoint})" />
        <source srcset="${tabletUrl}" media"(min-width: 28rem)" /> 
        <source srcset="${mobileUrl}" /> 
        <img src="${imageUrl}?w=${mobileWidth}&fit=fill&f=faces" alt="${altText}" loading="lazy" />
    </picture>
    `;
}

function renderPicture(image, breakPoint = '52rem', mobileWidth = 480, desktopWidth = 820) {
    const fallbackParams = _.extend({
        fm: 'png',
        w: desktopWidth
    }, IMAGE_PARAMS);
    const fallbackRetinaParams = _.extend({
        fm: 'png',
        w: desktopWidth * 2
    }, IMAGE_PARAMS);  
    const mobileParams = _.extend({
        w: mobileWidth
    }, IMAGE_PARAMS, WEBP_PARAMS);
    const mobileRetinaParams = _.extend({
        w: mobileWidth * 2
    }, IMAGE_PARAMS, WEBP_PARAMS);
    const desktopParams = _.extend({
        w: desktopWidth
    }, IMAGE_PARAMS, WEBP_PARAMS);
    const desktopRetinaParams = _.extend({
        w: desktopWidth * 2
    }, IMAGE_PARAMS, WEBP_PARAMS);

    const altText = image.fields.title;
    const fallbackUrl =  getImageUrl(image, fallbackParams);
    const fallbackRetinaUrl =  getImageUrl(image, fallbackRetinaParams);
    const mobileUrl =  getImageUrl(image, mobileParams);
    const mobileRetinaUrl =  getImageUrl(image, mobileRetinaParams);
    const desktopUrl = getImageUrl(image, desktopParams);
    const desktopRetinaUrl = getImageUrl(image, desktopRetinaParams);
    
    return `
    <picture class="responsive-picture">
        <source srcset="${desktopUrl}, ${desktopRetinaUrl} 2x" media="(min-width: ${breakPoint})" type="image/webp" />
        <source srcset="${mobileUrl}, ${mobileRetinaUrl} 2x" type="${IMAGE_WEBP}" />
        <source srcset="${fallbackUrl}, ${fallbackRetinaUrl} 2x" type="${IMAGE_PNG}"> 
        <img src="${fallbackUrl}" alt="${altText}" />
    </picture>
    `;
}

function renderResponsiveImage(image, layout = LAYOUT_FULL_WIDTH, mobileWidth = 480, desktopWidth = 820) {
    const fallbackParams = _.extend({
        fm: 'png',
        w: mobileWidth
    }, IMAGE_PARAMS_FALLBACK);
    const mobileParams = _.extend({
        w: mobileWidth
    }, IMAGE_PARAMS, WEBP_PARAMS);
    const mobileRetinaParams = _.extend({
        w: mobileWidth * 2
    }, IMAGE_PARAMS);
    const desktopParams = _.extend({
        w: desktopWidth
    }, IMAGE_PARAMS, WEBP_PARAMS);
    const desktopRetinaParams = _.extend({
        w: desktopWidth * 2
    }, IMAGE_PARAMS, WEBP_PARAMS);    
    const imageUrl = `https:${image.fields.file.url}`;
    const altText = image.fields.title;
    const mobileUrl =  getImageUrl(image, mobileParams);
    const desktopUrl = getImageUrl(image, desktopParams);
    const desktopRetinaUrl = getImageUrl(image, desktopRetinaParams);
    const fallbackUrl = getImageUrl(image, fallbackParams);
    
    return `<img class="image-responsive ${layout}"
                srcset="${mobileUrl} ${mobileWidth}w,
                ${desktopUrl} ${desktopWidth}w" 
                sizes="(max-width: ${mobileWidth}px) ${mobileWidth}px, ${desktopWidth}px"
                src="${fallbackUrl}"
                alt="${altText}" loading="lazy">`;
              
}


function renderImage(image, layout = LAYOUT_FULL_WIDTH) {
    const file = image.fields.file;
    switch(file.contentType) {
        case IMAGE_SVG:
            return renderSvg(image, layout);
        default:
            return renderPicture(image);
    }
}

module.exports = {
    renderImage: renderImage,
    renderTeaserImage: renderTeaserImage,
    renderSvg: renderSvg,
    renderPicture: renderPicture
};
