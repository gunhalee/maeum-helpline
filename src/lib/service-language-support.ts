import reviewedData from './service-language-data.json' with { type: 'json' }
import type { ServiceLanguageDisplay, ServiceLanguageProfile } from './service-language-types'

// Import this data module from server components/routes only. Client cards receive
// the compact display object, not the research records for every organization.
export const SERVICE_LANGUAGE_PROFILES: Readonly<Record<string, ServiceLanguageProfile>> = reviewedData.services as Record<string, ServiceLanguageProfile>
export const LANGUAGE_SUPPORT_REVIEWED_AT = reviewedData.reviewedAt

export function formatLanguageSupport(profile?: ServiceLanguageProfile): ServiceLanguageDisplay {
  if (!profile || profile.status === 'unconfirmed') return { label: 'Not confirmed' }

  const languages = [...new Set(profile.languages)]
  const label = profile.status === 'korean_only'
    ? 'Korean only'
    : profile.status === 'multilingual' || languages.length > 5
      ? 'Multilingual support'
      : languages.join(', ') || 'Not confirmed'

  return {
    label,
    ...(profile.qualifier ? { qualifier: profile.qualifier } : {}),
    ...(profile.referral ? { referral: profile.referral } : {}),
  }
}

export function getServiceLanguageDisplay(serviceId: string): ServiceLanguageDisplay {
  return formatLanguageSupport(SERVICE_LANGUAGE_PROFILES[serviceId])
}

interface ContactPointBase {
  '@type': string
  contactType: string
  telephone?: string
  url?: string
  areaServed: string
  hoursAvailable?: {
    '@type': string
    dayOfWeek: readonly string[]
    opens: string
    closes: string
  }[]
}

export function getEnglishContactPoints(serviceId: string, base: ContactPointBase) {
  const profile = SERVICE_LANGUAGE_PROFILES[serviceId]
  if (!profile || profile.status === 'unconfirmed' || !profile.routes?.length) {
    // Missing evidence is not evidence of Korean-only (or English) support.
    return [base]
  }

  return profile.routes.map((route) => {
    const isPhone = route.channel === 'phone'
    return {
      '@type': 'ContactPoint',
      contactType: isPhone ? base.contactType : route.channel === 'written'
        ? 'Written counseling' : 'Separate counseling service',
      telephone: isPhone ? base.telephone : undefined,
      url: route.url ?? (isPhone ? base.url : undefined),
      areaServed: base.areaServed,
      availableLanguage: route.languages,
      description: route.description,
      // Never inherit phone opening hours for written or related services.
      hoursAvailable: route.hours ? [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: route.hours.days.map((day) => `https://schema.org/${day}`),
        opens: route.hours.opens,
        closes: route.hours.closes,
      }] : isPhone && route.useServiceHours ? base.hoursAvailable : undefined,
    }
  })
}
