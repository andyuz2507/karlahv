/** Calcula los espacios disponibles para una semana dada */
export function getAvailableSlotsForWeek(
  slots: { dayOfWeek: number; startTime: string; endTime: string; frequency: string; biweekGroup: number | null }[],
  weekStart: Date
) {
  const result: { date: string; time: string; label: string }[] = []
  const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  for (let d = 0; d < 7; d++) {
    const date = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + d)
    const dayOfWeek = date.getDay()
    const weekNum = getWeekOfYear(date)
    const biweekGroup = weekNum % 2

    for (const slot of slots) {
      if (slot.dayOfWeek !== dayOfWeek) continue
      if (slot.frequency === 'biweekly') {
        const slotGroup = slot.biweekGroup ?? 0
        if (slotGroup !== biweekGroup) continue
      }

      const dateStr = date.toISOString().slice(0, 10)
      const dayLabel = DAYS[dayOfWeek]
      const monthDay = date.getDate()
      const month = MONTHS[date.getMonth()]
      result.push({
        date: dateStr,
        time: slot.startTime,
        label: `${dayLabel} ${monthDay} ${month} ${slot.startTime}`,
      })
    }
  }

  return result.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
}

function getWeekOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000))
}

/** Obtiene el lunes de la semana que contiene la fecha */
export function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}
