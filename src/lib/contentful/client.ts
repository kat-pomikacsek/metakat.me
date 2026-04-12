import { createClient } from 'contentful';

function requiredEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (v) return v;
  throw new Error(
    `Missing env: ${name}. Set it in .env (or .env.local) or your host’s env for CI.`,
  );
}

function optionalEnv(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v || undefined;
}

export function createContentfulClient() {
  const space = requiredEnv('CONTENTFUL_SPACE_ID');
  const environment = optionalEnv('CONTENTFUL_ENVIRONMENT') ?? 'master';

  const previewToken = optionalEnv('CONTENTFUL_PREVIEW_TOKEN');
  const usePreview = import.meta.env.DEV && Boolean(previewToken);

  const accessToken = usePreview
    ? previewToken!
    : requiredEnv('CONTENTFUL_ACCESS_TOKEN');

  return createClient({
    space,
    environment,
    accessToken,
    host: usePreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  });
}
