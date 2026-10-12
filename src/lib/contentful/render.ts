import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

import type { ImageVerticalAlign, SectionTheme, Theme } from './types';

export type CaseStudyData = CollectionEntry<'caseStudies'>['data'];

export function formatDate(date: Date, dateFormat: string) {
  return format(date, dateFormat);
}

export function renderCaseStudyDate(caseStudy: Pick<CaseStudyData, 'startDate' | 'endDate'>) {
  const startDate = caseStudy.startDate || '';
  const endDate = caseStudy.endDate || '';
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

export function methodNames(caseStudy: Pick<CaseStudyData, 'methods'>) {
  return (caseStudy.methods ?? []).map((method) => method.fields.title).join(', ');
}

export function organizationNames(caseStudy: Pick<CaseStudyData, 'organizations'>) {
  return (caseStudy.organizations ?? []).map((org) => org.fields.name).join(', ');
}

export function caseStudyBackgroundClass(caseStudy: {
  theme?: Theme;
  imageVerticalAlign?: ImageVerticalAlign;
}) {
  if (!caseStudy.theme) {
    return '';
  }
  const theme = caseStudy.theme;
  const imagePosition = caseStudy.imageVerticalAlign || 'top';
  const classSuffix = imagePosition === 'top' ? `white-${theme}` : `${theme}-white`;
  return `bg-split-${classSuffix}`;
}

export function sectionBackgroundClass(pageTheme: Theme, sectionTheme?: SectionTheme) {
  return sectionTheme ? `bg-${pageTheme}-${sectionTheme}` : undefined;
}
