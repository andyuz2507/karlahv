'use client'

import { useState } from 'react'

export function FileUploader({
  onUploaded,
  accept = 'image/*,.pdf',
}: {
  onUploaded: (url: string) => void
  accept?: string
}) {
  const [loading, setLoading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (res.ok && data.url) {
        onUploaded(data.url)
      } else {
        alert(data.error || 'Error al subir')
      }
    } catch {
      alert('Error al subir archivo')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-berry/10 text-berry text-sm font-medium cursor-pointer hover:bg-berry/20">
      <input
        type="file"
        accept={accept}
        onChange={handleFile}
        disabled={loading}
        className="hidden"
      />
      {loading ? 'Subiendo...' : 'Subir archivo'}
    </label>
  )
}
