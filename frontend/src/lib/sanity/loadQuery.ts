import {sanityClient} from 'sanity:client'

const token = import.meta.env.SANITY_API_READ_TOKEN
const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID?.trim()

export type LoadQueryOptions = {
  perspectiveCookie?: string | null
}

function hasSanityConfig() {
  return Boolean(
    projectId &&
      projectId !== '<your-project-id>' &&
      projectId !== 'your-projectID' &&
      projectId !== 'placeholder',
  )
}

/**
 * When `perspectiveCookie` is set (draft mode), fetches draft content with stega.
 * Otherwise fetches published content from the CDN.
 */
export async function loadQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: LoadQueryOptions = {},
): Promise<T | null> {
  if (!hasSanityConfig()) {
    return null
  }

  const useDrafts = Boolean(options.perspectiveCookie)

  if (useDrafts && !token) {
    console.warn(
      'Draft mode is active but SANITY_API_READ_TOKEN is missing; falling back to published content.',
    )
  }

  const draftFetch = useDrafts && Boolean(token)

  return sanityClient.fetch<T>(query, params, {
    perspective: draftFetch ? 'drafts' : 'published',
    useCdn: !draftFetch,
    ...(draftFetch
      ? {
          token,
          stega: true,
          resultSourceMap: 'withKeyArraySelector' as const,
        }
      : {}),
  })
}
