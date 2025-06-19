type Props = {
  selected: 'before' | 'during' | 'after' | null
  onSelect: (val: 'before' | 'during' | 'after') => void
}

export default function Navbar({ selected, onSelect }: Props) {
  const btnClass = (val: string) =>
    `px-6 py-2 rounded-full transition ${
      selected === val ? 'bg-white text-black font-bold' : 'bg-black/60 text-white'
    }`

  return (
    <div className="flex gap-6 bg-black/30 backdrop-blur px-6 py-3 rounded-full shadow-lg ">
      <button onClick={() => onSelect('before')} className={btnClass('before')}>Avant</button>
      <button onClick={() => onSelect('during')} className={btnClass('during')}>Pendant</button>
      <button onClick={() => onSelect('after')} className={btnClass('after')}>Après</button>
    </div>
  )
}
