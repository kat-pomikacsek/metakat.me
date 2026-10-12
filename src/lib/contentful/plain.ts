type ContentfulSys = { id: string; contentType?: { sys: { id: string } } };

function isEntryLike(value: object): value is { sys: ContentfulSys; fields?: object } {
  return 'sys' in value && typeof (value as { sys: unknown }).sys === 'object';
}

/**
 * Copy resolved Contentful data into plain objects, keeping only the `sys` fields templates read.
 * Linked entries can point back at an ancestor (e.g. two case studies that reference each other);
 * those back-references are dropped so the result is acyclic, which Astro's content store requires.
 */
export function toPlain(value: unknown, ancestors: Set<object> = new Set()): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => toPlain(item, ancestors)).filter((item) => item !== undefined);
  }
  if (value === null || typeof value !== 'object' || value instanceof Date) {
    return value;
  }
  if (ancestors.has(value)) {
    return undefined;
  }

  const nextAncestors = new Set(ancestors).add(value);

  if (isEntryLike(value)) {
    const { id, contentType } = value.sys;
    const sys: ContentfulSys = contentType
      ? { id, contentType: { sys: { id: contentType.sys.id } } }
      : { id };
    return value.fields ? { sys, fields: toPlain(value.fields, nextAncestors) } : { sys };
  }

  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const plainChild = toPlain(child, nextAncestors);
    if (plainChild !== undefined) {
      result[key] = plainChild;
    }
  }
  return result;
}
