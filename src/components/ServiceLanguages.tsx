import type { ServiceLanguageDisplay } from '@/lib/service-language-types'

export default function ServiceLanguages({ support }: { support?: ServiceLanguageDisplay }) {
  return (
    <dl className="mt-4 text-sm leading-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <dt className="w-[6.5rem] shrink-0 font-medium text-stone-600 sm:w-[7rem]">Languages</dt>
        <dd className="min-w-0 flex-[1_1_9rem] break-words text-stone-700">
          <p>{support?.label ?? 'Not confirmed'}</p>
          {support?.qualifier && <p className="mt-1">{support.qualifier}</p>}
          {support?.referral && (
            <p className="mt-1">
              {support.referral.text}{' '}
              <a
                href={`tel:${support.referral.phone}`}
                aria-label={`Call Danuri: ${support.referral.phone}`}
                className="rounded-sm text-green-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                {support.referral.phone}
              </a>.
            </p>
          )}
        </dd>
      </div>
    </dl>
  )
}
