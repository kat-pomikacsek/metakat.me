export type ContentfulAsset = {
  fields: {
    file: {
      url: string;
      contentType: string;
      details?: { image?: { width: number; height: number } };
    };
    title: string;
  } & Record<string, unknown>;
};

export const IMAGE_SVG = 'image/svg+xml';

export const LAYOUT_FULL_WIDTH = 'full-width';
export const LAYOUT_INLINE = 'inline';

const DEFAULT_PARAMS: Record<string, string | number> = {
  fit: 'fill',
  f: 'faces',
};

const WEBP_PARAMS: Record<string, string | number> = {
  fm: 'webp',
  q: 80,
};

export function buildImageUrl(
  asset: ContentfulAsset,
  params: Record<string, string | number> = {},
): string {
  const base = `https:${asset.fields.file.url}`;
  const merged = { ...DEFAULT_PARAMS, ...params };
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    search.set(key, String(value));
  }
  return `${base}?${search.toString()}`;
}

export function buildWebpUrl(asset: ContentfulAsset, width: number): string {
  return buildImageUrl(asset, { ...WEBP_PARAMS, w: width });
}

export function buildPngUrl(asset: ContentfulAsset, width: number): string {
  return buildImageUrl(asset, { fm: 'png', w: width });
}

export function getAssetDimensions(
  asset: ContentfulAsset,
): { width: number; height: number } | undefined {
  return asset.fields.file.details?.image;
}

export function getBaseUrl(asset: ContentfulAsset): string {
  return `https:${asset.fields.file.url}`;
}

export function isSvg(asset: ContentfulAsset): boolean {
  return asset.fields.file.contentType === IMAGE_SVG;
}
