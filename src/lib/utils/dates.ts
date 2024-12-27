import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns/fp';

export const formatDateShort = format('d MMMM yyyy');

export const timeAgo = (timestamp: string) => formatDistanceToNow(timestamp, { addSuffix: true });
