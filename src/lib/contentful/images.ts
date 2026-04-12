import queryString from 'query-string';

type CfImageEntry = { fields: Record<string, unknown> & { file: { url: string; contentType: string }; title: string } };

const IMAGE_SVG = 'image/svg+xml';
const IMAGE_PNG = 'image/png';
const IMAGE_WEBP = 'image/webp';

export const LAYOUT_FULL_WIDTH = 'full-width';
export const LAYOUT_INLINE = 'inline';

const IMAGE_PARAMS = {
  fit: 'fill',
  f: 'faces',
};
const WEBP_PARAMS = {
  fm: 'webp',
  q: 80,
};

function getImageUrl(image: CfImageEntry, params: Record<string, string | number>) {
  const imageUrl = `https:${image.fields.file.url}`;
  const imageQuery = queryString.stringify(params);
  return `${imageUrl}?${imageQuery}`;
}

function renderSvg(image: CfImageEntry, layout = LAYOUT_FULL_WIDTH) {
  return `<img class="image-svg ${layout}"
    src="https:${image.fields.file.url}"
    alt="${image.fields.title}" loading="lazy">`;
}

export function renderTeaserImage(
  imageMobile: CfImageEntry,
  imageDesktop: CfImageEntry,
  breakPoint = '61rem',
  mobileWidth = 320,
  desktopWidth = 448,
) {
  const mobileParams = { fm: 'png', w: mobileWidth, ...IMAGE_PARAMS };
  const desktopParams = { fm: 'png', w: desktopWidth, ...IMAGE_PARAMS };
  const imageUrl = `https:${imageMobile.fields.file.url}`;
  const altText = imageMobile.fields.title;
  const mobileUrl = getImageUrl(imageMobile, mobileParams);
  const tabletUrl = getImageUrl(imageMobile, desktopParams);
  const desktopUrl = getImageUrl(imageDesktop, desktopParams);

  return `
    <picture class="teaser-picture">
        <source srcset="${desktopUrl}" media="(min-width: ${breakPoint})" />
        <source srcset="${tabletUrl}" media="(min-width: 28rem)" />
        <source srcset="${mobileUrl}" />
        <img src="${imageUrl}?w=${mobileWidth}&fit=fill&f=faces" alt="${altText}" loading="lazy" />
    </picture>
    `;
}

export function renderPicture(
  image: CfImageEntry,
  breakPoint = '52rem',
  mobileWidth = 480,
  desktopWidth = 820,
) {
  const fallbackParams = { fm: 'png', w: desktopWidth, ...IMAGE_PARAMS };
  const fallbackRetinaParams = { fm: 'png', w: desktopWidth * 2, ...IMAGE_PARAMS };
  const mobileParams = { w: mobileWidth, ...IMAGE_PARAMS, ...WEBP_PARAMS };
  const mobileRetinaParams = { w: mobileWidth * 2, ...IMAGE_PARAMS, ...WEBP_PARAMS };
  const desktopParams = { w: desktopWidth, ...IMAGE_PARAMS, ...WEBP_PARAMS };
  const desktopRetinaParams = { w: desktopWidth * 2, ...IMAGE_PARAMS, ...WEBP_PARAMS };

  const altText = image.fields.title;
  const fallbackUrl = getImageUrl(image, fallbackParams);
  const fallbackRetinaUrl = getImageUrl(image, fallbackRetinaParams);
  const mobileUrl = getImageUrl(image, mobileParams);
  const mobileRetinaUrl = getImageUrl(image, mobileRetinaParams);
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

export function renderImage(image: CfImageEntry, layout = LAYOUT_FULL_WIDTH) {
  const file = image.fields.file;
  switch (file.contentType) {
    case IMAGE_SVG:
      return renderSvg(image, layout);
    default:
      return renderPicture(image);
  }
}
