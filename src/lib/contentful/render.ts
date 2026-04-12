import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import format from 'date-fns/format';

import {
  LAYOUT_INLINE,
  renderImage,
  renderPicture,
  renderTeaserImage,
} from './images';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CfEntry = { fields: any; sys: { contentType: { sys: { id: string } } } };

/** Case study fields shape as used by templates (from Contentful + derived `date`). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CaseStudyData = Record<string, any>;

export function formatDate(date: Date, dateFormat: string) {
  return format(date, dateFormat);
}

function renderImageBlock(entry: CfEntry) {
  const theme = (entry.fields && entry.fields.theme) || '';
  const layout = (entry.fields && entry.fields.layout) || '';
  const caption = (entry.fields && entry.fields.caption) || '';
  const layoutClass =
    layout === LAYOUT_INLINE ? 'flex flex-wrap justify-center' : 'flex flex-wrap justify-center';
  const figureClass = layout === LAYOUT_INLINE ? 'sm:max-w-xs' : '';
  const captionHtml = caption ? documentToHtmlString(caption) : '';
  const figCaption = captionHtml ? `<figcaption>${captionHtml}</figcaption>` : '';
  const images = entry.fields.images || [];
  const imageHtml = images.map(
    (image: CfEntry) => `
            <div class="block-image--image">
                ${renderImage(image, layout)}
            </div>`,
  );
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
}

export function renderImageBlocks(imageBlocks: CfEntry[]) {
  const renderedBlocks = imageBlocks.map((imageBlock) => renderImageBlock(imageBlock));
  const hasInlineImages =
    imageBlocks.filter((imageBlock) => imageBlock.fields.layout === LAYOUT_INLINE).length > 0;
  const wrapperClass = hasInlineImages ? 'sm:grid sm:grid-cols-2 sm:gap-8 sm:max-w-2xl' : '';
  return `
        <div class="flex items-center justify-center">
            <div class="images-wrapper ${wrapperClass}">
                ${renderedBlocks.join('')}
            </div>
        </div>
        `;
}

function renderEmbeddedEntry(node: { data: { target: CfEntry } }) {
  const target = node.data.target;
  const contentType = target.sys.contentType.sys.id;
  switch (contentType) {
    case 'blockImage':
      return renderImageBlock(target);
    default:
      console.log('Unsupported content type in Rich Text: ', contentType);
      return `<!-- unsupported embed -->`;
  }
}

function renderEntryLink(
  node: { data: { target: CfEntry }; content: unknown },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (c: any) => string,
) {
  const target = node.data.target;
  const contentType = target.sys.contentType.sys.id;
  switch (contentType) {
    case 'caseStudy':
      return `<a href="/portfolio/${target.fields.slug}">${children(node.content)}</a>`;
    default:
      console.log('Unsupported content type in Rich Text link: ', contentType);
      return '';
  }
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: { data: { target: CfEntry } }) =>
      `<div class="embed">${renderEmbeddedEntry(node)}</div>`,
    [INLINES.ENTRY_HYPERLINK]: (
      node: { data: { target: CfEntry }; content: unknown },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: (c: any) => string,
    ) => renderEntryLink(node, children),
  },
};

export function renderCaseStudyBody(body: Parameters<typeof documentToHtmlString>[0]) {
  return documentToHtmlString(
    body,
    options as unknown as Parameters<typeof documentToHtmlString>[1],
  );
}

export function renderCaseStudyDate(caseStudy: CaseStudyData) {
  const startDate = (caseStudy && caseStudy.startDate) || '';
  const endDate = (caseStudy && caseStudy.endDate) || '';
  if (!startDate && !endDate) {
    return '';
  }
  const sameYear =
    startDate &&
    endDate &&
    new Date(startDate).getUTCFullYear() === new Date(endDate).getUTCFullYear();
  const startDateFormat = sameYear ? 'MMM' : 'MMM yyyy';
  const startDateString = formatDate(new Date(startDate), startDateFormat);
  const endDateString = endDate ? formatDate(new Date(endDate), 'MMM yyyy') : 'Present';
  return `${startDateString} – ${endDateString}`;
}

export function renderMethods(caseStudy: CaseStudyData) {
  const methods = caseStudy.methods || [];
  return methods.map((method: CfEntry) => method.fields.title).join(', ');
}

export function renderOrganizations(caseStudy: CaseStudyData) {
  const orgs = caseStudy.organizations || [];
  const allOrgs = orgs.map((org: CfEntry) => org.fields.name).join(', ');
  if (!allOrgs) {
    return '';
  }
  return `
        <span class="badge badge--org">
            ${allOrgs}
        </span>
    `;
}

export function caseStudyBackgroundClass(caseStudy: CaseStudyData) {
  if (!caseStudy.theme) {
    return '';
  }
  const theme = caseStudy.theme;
  const imagePosition = caseStudy.imageVerticalAlign || 'top';
  const classSuffix = imagePosition === 'top' ? `white-${theme}` : `${theme}-white`;
  return `bg-split-${classSuffix}`;
}

export { renderImage, renderPicture, renderTeaserImage };
