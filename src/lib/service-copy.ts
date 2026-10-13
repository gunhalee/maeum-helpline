import type { Service } from './types'

type ServiceCopyInput = Pick<Service, 'name' | 'nameEn' | 'description' | 'descriptionEn' | 'hoursDetail' | 'operatingHours' | 'hoursDetailEn'>

/** Read editable Notion translations without changing the source used for matching or opening-hour calculations. */
export function getServiceCopy(service: ServiceCopyInput, lang: 'ko' | 'en') {
  const sourceHours = service.hoursDetail?.trim() || service.operatingHours?.trim() || ''
  return {
    name: (lang === 'en' && service.nameEn?.trim()) || service.name,
    description: (lang === 'en' && service.descriptionEn?.trim()) || service.description,
    hoursDetail: (lang === 'en' && service.hoursDetailEn?.trim()) || sourceHours,
  }
}
