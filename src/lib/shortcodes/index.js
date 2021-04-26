const format = require('date-fns/format');
const queryString = require('query-string');
const _ = require('lodash');

const {
    documentToHtmlString
} = require('@contentful/rich-text-html-renderer');
const RichTextTypes = require('@contentful/rich-text-types');
const BLOCKS = RichTextTypes.BLOCKS;
const INLINES = RichTextTypes.INLINES;
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
    fm: 'webp',
    q: 100,
    fit: 'fill',
    f: 'faces'
}

function formatDate(date, dateFormat) {
    return format(date, dateFormat);
}

function getImageUrl (image, params) {
    const imageUrl = `https:${image.fields.file.url}`; 
    const imageQuery = queryString.stringify(params);
    return `${imageUrl}?${imageQuery}`;    
}

function renderResponsiveImage(image, layout = LAYOUT_FULL_WIDTH, mobileWidth = 480, desktopWidth = 1200) {
    const mobileParams = _.extend({
        w: mobileWidth
    }, IMAGE_PARAMS);
    const desktopParams = _.extend({
        w: desktopWidth
    }, IMAGE_PARAMS);
    const imageUrl = `https:${image.fields.file.url}`;
    const altText = image.fields.title;
    const mobileUrl =  getImageUrl(image, mobileParams);
    const desktopUrl = getImageUrl(image, desktopParams);;
    
    return `<img class="image-responsive ${layout}"
                srcset="${mobileUrl} ${mobileWidth}w,
                ${desktopUrl} ${desktopWidth}w" 
                sizes="(max-width: 61rem) ${mobileWidth}px,${desktopWidth}px"
                src="${imageUrl}?w=${mobileWidth}&fit=fill&f=faces"
                alt="${altText}" loading="lazy">`;
}

function renderSvg(image, layout = LAYOUT_FULL_WIDTH) {
    return `<img class="image-svg ${layout}"
    src="https:${image.fields.file.url}"
    alt="${image.fields.title}" loading="lazy">`;
}

function renderImage(image, layout = LAYOUT_FULL_WIDTH) {
    const file = image.fields.file;
    switch(file.contentType) {
        case IMAGE_SVG:
            return renderSvg(image, layout);
        default:
            return renderResponsiveImage(image, layout);
    }
}


const renderImageBlock = function (entry) {
    const theme = entry.fields && entry.fields.theme || '';
    const layout = entry.fields && entry.fields.layout || '';
    const caption = entry.fields && entry.fields.caption || '';
    const layoutClass = layout === LAYOUT_INLINE ? 'flex flex-wrap justify-center' : 'flex flex-wrap justify-center';
    const figureClass = layout === LAYOUT_INLINE ? 'sm:max-w-xs' : '';
    const captionHtml = caption ? documentToHtmlString(caption) : '';
    const figCaption = captionHtml ? `<figcaption>${captionHtml}</figcaption>` : '';
    const images = entry.fields.images || [];
    const imageHtml = images.map((image) => {
        return `
            <div class="block-image--image">
                ${renderImage(image, layout)}
            </div>`;

    });
    return `
    <div class="block-image ${layout} ${theme}">
        <figure class="${figureClass}">
            <div class="${layoutClass}">
            ${imageHtml.join('')}
            </div>
            ${figCaption}
        </figure>
    </div>
    `;
};

const renderImageBlocks = function(imageBlocks) {
    const renderedBlocks = imageBlocks.map((imageBlock) => {
        return renderImageBlock(imageBlock)
    });
    const hasInlineImages = imageBlocks.filter(imageBlock => imageBlock.fields.layout === LAYOUT_INLINE).length > 0;
    const wrapperClass = hasInlineImages ? 'sm:grid sm:grid-cols-2 sm:gap-8 sm:max-w-2xl' : '';
    return `
        <div class="flex items-center justify-center">
            <div class="images-wrapper ${wrapperClass}">
                ${renderedBlocks.join('')}
            </div>
        </div>
    `;
}

const renderEmbeddedEntry = function (node) {
    const target = node.data.target;
    const contentType = target.sys.contentType.sys.id;
    switch (contentType) {
        case 'blockImage':
            return renderImageBlock(target)
            break;
        default:
            console.log('Unsupported content type in Rich Text: ', contentType);
            return `<--! unsupported embed -->`;
    }
}

const renderEntryLink = function (node, children) {
    const target = node.data.target;
    const contentType = target.sys.contentType.sys.id;
    switch (contentType) {
        case 'caseStudy':
            return `<a href="/portfolio/${target.fields.slug}">${children(node.content)}</a>`
        default:
            console.log('Unsupported content type in Rich Text link: ', contentType);
            return '';
    }
}


const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node) => `<div class="embed">${renderEmbeddedEntry(node)}</div>`,
        [INLINES.ENTRY_HYPERLINK]: (node, children) => renderEntryLink(node, children),
    }
}


const renderCaseStudyBody = function (body) {
    return documentToHtmlString(body, options);
}

const renderCaseStudyDate = function (caseStudy) {
    const startDate = caseStudy && caseStudy.startDate || '';
    const endDate = caseStudy && caseStudy.endDate || '';
    console.log(startDate, endDate);
    if (!startDate && !endDate) {
        return '';
    }
    // if start and end date compare years
    const sameYear =
        (startDate && endDate) &&
            (new Date(startDate).getUTCFullYear() === new Date(endDate).getUTCFullYear())
            ? true : false;
    const startDateFormat = sameYear ? "MMMM" : "MMMM yyyy";
    const startDateString = formatDate(new Date(startDate), startDateFormat);
    const endDateString = endDate ? formatDate(new Date(endDate), "MMMM yyyy") : 'Present';
    return `${startDateString} – ${endDateString}`;
}

function renderTeaserImage(imageMobile, imageDesktop, mobileWidth = 320, desktopWidth = 448) {
    const mobileParams = _.extend({
        w: mobileWidth
    }, IMAGE_PARAMS);
    const desktopParams = _.extend({
        w: desktopWidth
    }, IMAGE_PARAMS);
    const imageUrl = `https:${imageMobile.fields.file.url}`;
    const altText = imageDesktop.fields.title;
    const mobileUrl =  getImageUrl(imageMobile, mobileParams);
    const tabletUrl = getImageUrl(imageMobile, desktopParams);
    const desktopUrl = getImageUrl(imageDesktop, desktopParams);
    
    return `
    <picture class="teaser-picture">
        <source srcset="${desktopUrl}" media="(min-width: 61rem)" />
        <source srcset="${tabletUrl}" media"(min-width: 28rem)" /> 
        <source srcset="${mobileUrl}" /> 
        <img src="${imageUrl}?w=${mobileWidth}&fit=fill&f=faces" alt="${altText}" loading="lazy" />
    </picture>
    `;
}


const renderMethods = function (caseStudy) {
    const methods = caseStudy.methods || [];
    return methods.map(method => method.fields.title).join(", ");
}

module.exports = {
    formatDate: formatDate,
    renderCaseStudyBody: renderCaseStudyBody,
    renderCaseStudyDate: renderCaseStudyDate,
    renderImageBlock: renderImageBlock,
    renderImageBlocks: renderImageBlocks,
    renderImage: renderImage,
    renderMethods: renderMethods,
    renderTeaserImage: renderTeaserImage
};