import { format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CfEntry = { fields: any; sys: { contentType: { sys: { id: string } } } };

/** Case study fields shape as used by templates (from Contentful + derived `date`). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CaseStudyData = Record<string, any>;

export function formatDate(date: Date, dateFormat: string) {
  return format(date, dateFormat);
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

export function methodNames(caseStudy: CaseStudyData) {
  const methods = caseStudy.methods || [];
  return methods.map((method: CfEntry) => method.fields.title).join(', ');
}

export function organizationNames(caseStudy: CaseStudyData) {
  const orgs = caseStudy.organizations || [];
  return orgs.map((org: CfEntry) => org.fields.name).join(', ');
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
