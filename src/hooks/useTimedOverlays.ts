import { useMemo } from 'react'
import { renderOverlays } from '@/utils/overlayUtils'
import type { OverlayAlign, OverlayType } from '@/types/overlay'
import { ReactNode } from 'react'

export type OverlayItem = {
  key: string
  appear: number
  disappear: number
  align: OverlayAlign
  type: OverlayType
  content: ReactNode
  withIcon?: boolean
}

export function useTimedOverlays(items: OverlayItem[]) {
  return useMemo(() => renderOverlays(items), [items])
}
