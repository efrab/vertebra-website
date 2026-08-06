import {getLocalizedPath, type Locale, type PathnameKey} from '../../i18n/routes'
import type {BreadcrumbItem} from './structuredData'

export function homeBreadcrumb(locale: Locale): BreadcrumbItem {
  return {
    name: locale === 'es' ? 'Inicio' : 'Home',
    path: getLocalizedPath(locale, 'home'),
  }
}

export function indexDetailBreadcrumbs(
  locale: Locale,
  indexKey: PathnameKey,
  indexLabel: string,
  detailTitle: string,
  detailPath: string,
): BreadcrumbItem[] {
  return [
    homeBreadcrumb(locale),
    {
      name: indexLabel,
      path: getLocalizedPath(locale, indexKey),
    },
    {
      name: detailTitle,
      path: detailPath,
    },
  ]
}

export function singletonBreadcrumbs(
  locale: Locale,
  title: string,
  path: string,
): BreadcrumbItem[] {
  return [homeBreadcrumb(locale), {name: title, path}]
}
