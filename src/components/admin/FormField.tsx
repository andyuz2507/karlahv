export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows,
  required,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  rows?: number
  required?: boolean
}) {
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-berry/20 focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry'
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-charcoal mb-2">
        {label}
        {required && <span className="text-berry">*</span>}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  )
}
