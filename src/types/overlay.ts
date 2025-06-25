// types/overlay.ts

/**
 * Possible alignment values for an overlay.
 */
export type OverlayAlign =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

import { ReactNode } from 'react'

export type OverlayType = 'info' | 'warning' | 'success' | 'error'

export interface OverlayItem {
  key: string
  appear: number
  disappear: number
  align: OverlayAlign
  type: OverlayType
  content: ReactNode
  withIcon?: boolean
}

