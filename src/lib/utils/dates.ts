import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns/fp';

export const formatDateShort = format('d MMMM yyyy');
export const formatDate = format('Pp');
export const formatLong = format('PPpp');

export const timeAgo = (timestamp: string) => formatDistanceToNow(timestamp, { addSuffix: true });
