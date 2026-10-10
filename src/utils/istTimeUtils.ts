/**
 * Indian Standard Time (IST) Date & Time Utilities
 * Time Zone: Asia/Kolkata (UTC +05:30)
 * Accurately converts CET/CEST (Europe/Madrid) and UTC ISO timestamps to IST
 * for live fixtures, historical calendar schedules, and telemetry clocks.
 */

/**
 * Determines whether a given date string (YYYY-MM-DD) falls in CEST (Daylight Saving, UTC+2)
 * or CET (Standard Time, UTC+1) in Spain (Europe/Madrid).
 */
export function getMadridOffsetHours(dateStr: string): number {
  if (!dateStr) return 1;
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0])) return 1;
  const [year, month, day] = parts;

  try {
    const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const tf = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Madrid',
      timeZoneName: 'shortOffset',
    });
    const tzName = tf.formatToParts(probe).find((p) => p.type === 'timeZoneName')?.value || 'GMT+2';
    return tzName.includes('+2') ? 2 : 1;
  } catch {
    // Summer months roughly April (4) to October (10)
    return month >= 4 && month <= 10 ? 2 : 1;
  }
}

export interface ISTConvertedResult {
  istDate: string; // YYYY-MM-DD
  istFormattedDate: string; // DD.MM.YYYY
  istTime: string; // HH:MM (24-hr) or HH:MM AM/PM
  istTime24: string; // HH:MM 24-hr format (e.g. 00:30, 17:30)
  istTime12: string; // e.g. 12:30 AM, 5:30 PM
  istTimeWithLabel: string; // e.g. 00:30 IST
  originalTime: string;
}

/**
 * Converts any time string (12-hour "12:30 AM", "5:30 PM" or 24-hour "00:30", "17:30")
 * to strict 24-hour format: "00:30", "17:30", "22:00".
 */
export function formatTo24Hour(timeStr: string): string {
  if (!timeStr) return '';
  const trimmed = timeStr.trim();
  // Check if already in 24-hour HH:MM format
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
    const [h, m] = trimmed.split(':');
    return `${h.padStart(2, '0')}:${m}`;
  }
  // Check for 12-hour format e.g. "12:30 AM", "5:30 PM"
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return trimmed;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

/**
 * Converts any time string to 12-hour AM/PM format (e.g. "12:30 AM", "5:30 PM").
 */
export function formatTo12Hour(timeStr: string): string {
  if (!timeStr) return '';
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return trimmed;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  let meridiem = match[3]?.toUpperCase();

  if (!meridiem) {
    meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }
  return `${hours}:${minutes} ${meridiem}`;
}

/**
 * Formats a time string in IST according to 24-hr or 12-hr preference with optional IST label.
 */
export function formatDisplayISTTime(timeStr: string, use24Hour: boolean = true, includeLabel: boolean = true): string {
  if (!timeStr) return '';
  const time = use24Hour ? formatTo24Hour(timeStr) : formatTo12Hour(timeStr);
  return includeLabel ? `${time} IST` : time;
}

/**
 * Converts Spanish local kick-off time (CET/CEST) to Indian Standard Time (IST).
 * Accounts for cross-midnight day rollover (e.g., 21:00 CEST -> 00:30 IST next day).
 */
export function convertMadridTimeToIST(dateStr: string, timeStr: string): ISTConvertedResult {
  if (!dateStr || !timeStr) {
    return {
      istDate: dateStr || '',
      istFormattedDate: dateStr || '',
      istTime: timeStr || '',
      istTime24: timeStr || '',
      istTime12: timeStr || '',
      istTimeWithLabel: `${timeStr || ''} IST`,
      originalTime: timeStr || '',
    };
  }

  const dateParts = dateStr.split('-').map(Number);
  const timeParts = timeStr.split(':').map(Number);

  if (dateParts.length !== 3 || timeParts.length < 2) {
    return {
      istDate: dateStr,
      istFormattedDate: dateStr,
      istTime: timeStr,
      istTime24: timeStr,
      istTime12: timeStr,
      istTimeWithLabel: `${timeStr} IST`,
      originalTime: timeStr,
    };
  }

  const [year, month, day] = dateParts;
  const [hour, min] = timeParts;
  const madridOffset = getMadridOffsetHours(dateStr);

  // Derive exact UTC millisecond timestamp
  const utcMillis = Date.UTC(year, month - 1, day, hour - madridOffset, min, 0);
  const matchInstant = new Date(utcMillis);

  const rawIstTime = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(matchInstant);
  const istTime = rawIstTime.toUpperCase();

  const istFormattedDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(matchInstant)
    .replace(/\//g, '.');

  const istYear = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(matchInstant);
  const istMonth = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', month: '2-digit' }).format(matchInstant);
  const istDay = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit' }).format(matchInstant);
  const istDate = `${istYear}-${istMonth}-${istDay}`;

  const istTime24 = formatTo24Hour(istTime);
  const istTime12 = formatTo12Hour(istTime);

  return {
    istDate,
    istFormattedDate,
    istTime: istTime24,
    istTime24,
    istTime12,
    istTimeWithLabel: `${istTime24} IST`,
    originalTime: `${timeStr} CET`,
  };
}

/**
 * Converts a UTC ISO string (e.g. from API-Football `2024-05-18T19:00:00+00:00`) to IST.
 */
export function convertUtcIsoToIST(utcIsoStr: string): ISTConvertedResult {
  if (!utcIsoStr) {
    return {
      istDate: '',
      istFormattedDate: '',
      istTime: '',
      istTime24: '',
      istTime12: '',
      istTimeWithLabel: 'IST',
      originalTime: '',
    };
  }

  const matchInstant = new Date(utcIsoStr);
  if (isNaN(matchInstant.getTime())) {
    return {
      istDate: utcIsoStr,
      istFormattedDate: utcIsoStr,
      istTime: '',
      istTime24: '',
      istTime12: '',
      istTimeWithLabel: 'IST',
      originalTime: utcIsoStr,
    };
  }

  const rawIstTime = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(matchInstant);
  const istTime = rawIstTime.toUpperCase();

  const istFormattedDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(matchInstant)
    .replace(/\//g, '.');

  const istYear = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(matchInstant);
  const istMonth = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', month: '2-digit' }).format(matchInstant);
  const istDay = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit' }).format(matchInstant);
  const istDate = `${istYear}-${istMonth}-${istDay}`;

  const istTime24 = formatTo24Hour(istTime);
  const istTime12 = formatTo12Hour(istTime);

  return {
    istDate,
    istFormattedDate,
    istTime: istTime24,
    istTime24,
    istTime12,
    istTimeWithLabel: `${istTime24} IST`,
    originalTime: utcIsoStr,
  };
}

/**
 * Returns current date string in Asia/Kolkata timezone (YYYY-MM-DD).
 */
export function getCurrentISTDate(): string {
  const now = new Date();
  const year = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(now);
  const month = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', month: '2-digit' }).format(now);
  const day = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit' }).format(now);
  return `${year}-${month}-${day}`;
}

/**
 * Returns current time string in Asia/Kolkata timezone (HH:MM:SS or HH:MM).
 */
export function getCurrentISTTime(includeSeconds: boolean = false): string {
  const now = new Date();
  const raw = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    ...(includeSeconds ? { second: '2-digit' } : {}),
    hour12: true,
  }).format(now);
  return raw.toUpperCase();
}

/**
 * Formats a date for human-readable Indian Standard Time display:
 * e.g. "Sunday, 16 August 2026"
 */
export function formatISTDisplayDate(dateObjOrIso?: Date | string): string {
  const d = dateObjOrIso ? (typeof dateObjOrIso === 'string' ? new Date(dateObjOrIso) : dateObjOrIso) : new Date();
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}
