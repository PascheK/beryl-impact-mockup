import { AlertTriangle, Info, CheckCircle2, XOctagon } from 'lucide-react'
import Overlay from '@/components/Overlay'
import { OverlayAlign, OverlayType } from '@/types/overlay'

const baseOverlayClass =
  'px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2'

const styleMap: Record<OverlayType, string> = {
  info: 'bg-blue-500/80 text-white',
  warning: 'bg-yellow-600/90 text-black',
  success: 'bg-green-600/90 text-white',
  error: 'bg-red-600/90 text-white',
}

const iconMap: Record<OverlayType, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <XOctagon className="w-5 h-5" />,
}

export function renderOverlay(
  key: string,
  appear: number,
  disappear: number,
  align: OverlayAlign,
  type: OverlayType,
  content: React.ReactNode,
  withIcon: boolean = true
) {
  return (
    <Overlay
      key={key}
      appear={appear}
      disappear={disappear}
      align={align}
      className={`${baseOverlayClass} ${styleMap[type]}`}
    >
      {withIcon && iconMap[type]}
      {content}
    </Overlay>
  )
}

export function renderOverlays(
  items: {
    key: string
    appear: number
    disappear: number
    align: OverlayAlign
    type: OverlayType
    content: React.ReactNode
    withIcon?: boolean
  }[]
) {
  return items.map(item =>
    renderOverlay(
      item.key,
      item.appear,
      item.disappear,
      item.align,
      item.type,
      item.content,
      item.withIcon ?? true
    )
  )
}
