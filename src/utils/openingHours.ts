interface OpeningHours {
  [key: string]: { opens: string; closes: string };
}

interface GroupedHours {
  days: string[];
  opens: string;
  closes: string;
  isClosed: boolean;
}

const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export function groupOpeningHours(hours: OpeningHours): GroupedHours[] {
  const grouped: GroupedHours[] = [];
  
  daysOrder.forEach((day, index) => {
    const dayHours = hours[day];
    const isClosed = dayHours.opens === '00:00' && dayHours.closes === '00:00';
    
    const lastGroup = grouped[grouped.length - 1];
    
    // Check if this day can be grouped with the previous day
    if (
      lastGroup &&
      lastGroup.opens === dayHours.opens &&
      lastGroup.closes === dayHours.closes &&
      lastGroup.isClosed === isClosed
    ) {
      lastGroup.days.push(day.charAt(0).toUpperCase() + day.slice(1));
    } else {
      grouped.push({
        days: [day.charAt(0).toUpperCase() + day.slice(1)],
        opens: dayHours.opens,
        closes: dayHours.closes,
        isClosed
      });
    }
  });
  
  return grouped;
}

export function formatHoursDisplay(grouped: GroupedHours[]): string {
  return grouped.map(group => {
    const daysDisplay = group.days.length === 1 
      ? group.days[0]
      : group.days.length === 2
      ? group.days.join(' & ')
      : `${group.days[0]} - ${group.days[group.days.length - 1]}`;
    
    const hoursDisplay = group.isClosed 
      ? 'Closed'
      : `${group.opens} - ${group.closes}`;
    
    return `${daysDisplay}: ${hoursDisplay}`;
  }).join('\n');
}