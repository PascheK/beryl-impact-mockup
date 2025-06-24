type Props = {
  selected: 'before' | 'during' | 'after' | null
  onSelect: (val: 'before' | 'during' | 'after') => void
  canChangeSection: boolean
  onChangeSection: (val: boolean) => void
  onNavbarChanged: (val: boolean) => void
}

export default function Navbar({ selected, onSelect, canChangeSection, onChangeSection, onNavbarChanged }: Props) {
  const btnClass = (val: string) =>
    `px-6 py-2 rounded-full transition ${selected === val ? 'bg-white text-black font-bold' : 'bg-black/60 text-white'
    }`
  const handleClick = (section: 'before' | 'during' | 'after') => {
    if (!canChangeSection || section === selected) return
    onChangeSection(false)
    onNavbarChanged(true)
    onSelect(section)
  }
  return (
    <div className="flex gap-6 bg-black/30 backdrop-blur px-6 py-3 rounded-full shadow-lg ">
      <button onClick={() => handleClick('before')} className={btnClass('before')}>Avant</button>
      <button onClick={() => handleClick('during')} className={btnClass('during')}>Pendant</button>
      <button onClick={() => handleClick('after')} className={btnClass('after')}>Après</button>
    </div>
  )
}
