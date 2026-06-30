/* Deep-link helpers for the home page "Our Companies" / "Our Businesses"
   sections. Clicking a Company/Business link in the header or footer should
   jump to that section on the home page and activate the clicked item.

   - On the home page: dispatch an event the section listens for.
   - On another page: stash the target and navigate home; the section reads
     it on mount. */

export type SectionKind = 'company' | 'business'

const PENDING_KEY: Record<SectionKind, string> = {
  company: 'pendingCompany',
  business: 'pendingBusiness',
}

export function openSection(kind: SectionKind, id: string) {
  if (typeof window === 'undefined') return
  if (window.location.pathname !== '/') {
    sessionStorage.setItem(PENDING_KEY[kind], id)
    window.location.href = '/'
  } else {
    window.dispatchEvent(new CustomEvent(`eg:${kind}`, { detail: { id } }))
  }
}

export function takePending(kind: SectionKind): string | null {
  if (typeof window === 'undefined') return null
  const v = sessionStorage.getItem(PENDING_KEY[kind])
  if (v) sessionStorage.removeItem(PENDING_KEY[kind])
  return v
}
