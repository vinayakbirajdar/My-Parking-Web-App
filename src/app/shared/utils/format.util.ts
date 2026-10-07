/**
 * Simple formatting helpers.
 * Keep display logic out of components (SOLID – Single Responsibility).
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DURATION_LABELS: Record<string, string> = {
  '1': '1 hour',
  '2': '2 hours',
  '4': '4 hours',
  '8': '8 hours',
  full: 'Full day'
};

const DURATION_HOURS: Record<string, number> = {
  '1': 1,
  '2': 2,
  '4': 4,
  '8': 8,
  full: 24
};

/** Returns day suffix: 1st, 2nd, 3rd, 4th… */
function daySuffix(day: number): string {
  if (day === 1 || day === 21 || day === 31) return 'st';
  if (day === 2 || day === 22) return 'nd';
  if (day === 3 || day === 23) return 'rd';
  return 'th';
}

/** Formats ISO date (YYYY-MM-DD) as "12th May 2026" */
export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const day = parseInt(parts[2], 10);
  const month = MONTHS[parseInt(parts[1], 10) - 1] || '';
  const year = parts[0] || '';
  return `${day}${daySuffix(day)} ${month} ${year}`;
}

/** Label for duration key */
export function formatDuration(durationKey?: string): string {
  if (!durationKey) return '—';
  return DURATION_LABELS[durationKey] || durationKey;
}

/** Formats time range from entry time + duration, e.g. "9 Am - 11 Am" */
export function formatTimeRange(entryTime?: string, durationKey?: string): string {
  if (!entryTime) return '—';
  const hour = parseInt(entryTime.split(':')[0], 10) || 9;
  const addHours = DURATION_HOURS[durationKey || '2'] || 2;

  const to12h = (h: number): string => {
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? 'Pm' : 'Am';
    return `${h12} ${ampm}`;
  };

  return `${to12h(hour)} - ${to12h(hour + addHours)}`;
}

/** Masks phone as +91 XXX XXX XXX */
export function formatPhoneMasked(phone?: string): string {
  if (!phone) return '—';
  if (phone.length <= 3) return phone;
  const last9 = phone.slice(-9);
  return '+91 ' + last9.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 XXX');
}

/** Human-readable vehicle label */
export function formatVehicleLabel(vehicleType?: string): string {
  const v = (vehicleType || '').toLowerCase();
  if (v === 'bike') return 'Two Wheeler';
  if (v === 'heavy') return 'Heavy Vehicle';
  return 'Car';
}

/** Extracts digits from slot id for display */
export function formatSlotNumber(slotId?: string | null): string {
  if (!slotId) return '—';
  const match = slotId.match(/\d+/g);
  return match ? match.join('') : slotId;
}
