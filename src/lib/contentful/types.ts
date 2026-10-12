import type { Document } from '@contentful/rich-text-types';

/** Must stay in sync with the `@source inline` safelist in src/assets/css/index.css. */
export const THEMES = ['petrol', 'sky', 'mango', 'peach'] as const;
export type Theme = (typeof THEMES)[number];
export type SectionTheme = 'light' | 'lightest' | 'gray' | 'dark' | 'bright';
export type ImageLayout = 'full-width' | 'inline';
export type MobileScreenSize = 'short' | 'normal' | 'tall';

export const IMAGE_VERTICAL_ALIGNS = ['top', 'bottom'] as const;
export type ImageVerticalAlign = (typeof IMAGE_VERTICAL_ALIGNS)[number];

type Entry<ContentType extends string, Fields> = {
  sys: { id: string; contentType: { sys: { id: ContentType } } };
  fields: Fields;
};

export type ContentfulAsset = {
  sys: { id: string };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      contentType: string;
      details?: { image?: { width: number; height: number } };
    };
  };
};

export type Organization = Entry<'organization', { name: string }>;

export type DesignMethod = Entry<'designMethod', { title: string }>;

export type ImageBlockEntry = Entry<
  'blockImage',
  { images?: ContentfulAsset[]; caption?: Document; layout?: ImageLayout; theme?: string }
>;

export type CaseStudyTextSection = Entry<
  'caseStudySection',
  { title?: string; body?: Document; theme?: SectionTheme; titleIcons?: ContentfulAsset[] }
>;

export type CaseStudyImagesSection = Entry<
  'caseStudyImages',
  { title?: string; imageBlocks?: ImageBlockEntry[]; theme?: SectionTheme }
>;

export type CaseStudyScreensSection = Entry<
  'caseStudyScreens',
  {
    title?: string;
    desktopImage?: ContentfulAsset;
    mobileImage?: ContentfulAsset;
    mobileScreenSize?: MobileScreenSize[];
    theme?: SectionTheme;
  }
>;

export type SectionEntry = CaseStudyTextSection | CaseStudyImagesSection | CaseStudyScreensSection;

export type SectionType = SectionEntry['sys']['contentType']['sys']['id'];

export type RelatedCaseStudy = Entry<
  'caseStudy',
  {
    slug: string;
    title: string;
    theme: Theme;
    imageVerticalAlign?: ImageVerticalAlign;
    featuredImage: ContentfulAsset;
  }
>;
