const format = require('date-fns/format');
const _ = require('lodash');
const imageHelpers = require('./images');
const renderImage = imageHelpers.renderImage;
const renderTeaserImage = imageHelpers.renderTeaserImage;
const renderPicture = imageHelpers.renderPicture;

// constants for image layouts
const LAYOUT_FULL_WIDTH = 'full-width';
const LAYOUT_INLINE = 'inline';

const {
    documentToHtmlString
} = require('@contentful/rich-text-html-renderer');
const RichTextTypes = require('@contentful/rich-text-types');
const BLOCKS = RichTextTypes.BLOCKS;
const INLINES = RichTextTypes.INLINES;

function formatDate(date, dateFormat) {
    return format(date, dateFormat);
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
    if (!startDate && !endDate) {
        return '';
    }
    // if start and end date compare years
    const sameYear =
        (startDate && endDate) &&
            (new Date(startDate).getUTCFullYear() === new Date(endDate).getUTCFullYear())
            ? true : false;
    const startDateFormat = sameYear ? "MMM" : "MMM yyyy";
    const startDateString = formatDate(new Date(startDate), startDateFormat);
    const endDateString = endDate ? formatDate(new Date(endDate), "MMM yyyy") : 'Present';
    return `${startDateString} – ${endDateString}`;
}


const renderMethods = function (caseStudy) {
    const methods = caseStudy.methods || [];
    return methods.map(method => method.fields.title).join(", ");
}


const renderOrganizations = function (caseStudy) {
    const orgs = caseStudy.organizations || [];
    const allOrgs = orgs.map(org => org.fields.name).join(", ");
    if (!allOrgs) {
        return '';
    }
    return `
        <span class="badge badge--org">
            ${allOrgs}
        </span>
    `;
}

const caseStudyBackgroundClass = function (caseStudy) {
    if (!caseStudy.theme) {
        return ''; 
    }
    const theme = caseStudy.theme;
    const imagePosition = caseStudy.imageVerticalAlign || 'top';
    const classSuffix = imagePosition === 'top' ? `white-${theme}` : `${theme}-white`;
    const className = `bg-split-${classSuffix}`;
    return className;
}



module.exports = {
    formatDate: formatDate,
    renderCaseStudyBody: renderCaseStudyBody,
    renderCaseStudyDate: renderCaseStudyDate,
    renderImageBlock: renderImageBlock,
    renderImageBlocks: renderImageBlocks,
    renderMethods: renderMethods,
    renderOrganizations: renderOrganizations,
    renderImage: renderImage,
    renderTeaserImage: renderTeaserImage,
    renderPicture: renderPicture,
    caseStudyBackgroundClass: caseStudyBackgroundClass
};