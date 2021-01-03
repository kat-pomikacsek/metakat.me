const {
    documentToHtmlString
  } = require('@contentful/rich-text-html-renderer');
const RichTextTypes = require('@contentful/rich-text-types');
const BLOCKS = RichTextTypes.BLOCKS;
const MARKS = RichTextTypes.MARKS;

function imageProcessing(photo) {
    return `<img class='u-max-full-width'
            srcset="https:${photo.fields.file.url}?w=480&fm=webp&q=80&fit=fill&f=faces 480w,
            https:${photo.fields.file.url}?w=800&fm=webp&q=80&fit=fill&f=faces 800w" sizes="(max-width: 600px) 480px,800px"
            src="https:${photo.fields.file.url}?w=480&fit=fill&f=faces"
            alt="${ photo.fields.title }" loading="lazy">`;
  }


const renderImageBlock = function (entry) {
    const theme = entry.fields && entry.fields.theme || '';
    const layout = entry.fields && entry.fields.layout || '';
    const caption = entry.fields && entry.fields.caption || '';
    const captionHtml = `<figcaption>${documentToHtmlString(caption)}</figcaption>`;
    const images = entry.fields.images || [];
    const imageHtml = images.map((image) => {
        return `
            <div class="block-image--image">
                ${imageProcessing(image)}
            </div>`;

    });
    return `
    <div class="block-image ${theme} ${layout}">
        <figure>
            ${imageHtml.join('')}
            ${captionHtml}
        </figure>
    </div>
    `;
};

const renderEmbeddedEntry = function (node) {
    const target = node.data.target;
    const contentType = target.sys.contentType.sys.id;
    switch (contentType) {
        case 'blockImage':
            return renderImageBlock(target)
            break;
        default:
            console.log('Unsupported content type in Rich Text: ', contentType);
    } 
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => `<div class="embed">${renderEmbeddedEntry(node)}</div>`
  }
}


const renderCaseStudyBody = function (body) {
    return documentToHtmlString(body, options);
}

module.exports = {
    renderCaseStudyBody: renderCaseStudyBody,
    imageProcessing: imageProcessing
};