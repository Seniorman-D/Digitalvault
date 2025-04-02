import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: Date;
  isLast?: boolean;
}

export function ActivityItem({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  timestamp,
  isLast = false
}: ActivityItemProps) {
  // Format the timestamp as "X days/hours/minutes ago"
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: false });
  
  return (
    <div className={`flex items-start py-2 ${!isLast ? 'border-b border-neutral-200' : ''}`}>
      <div className={`${iconBg} p-2 rounded-md mr-3`}>
        <i className={`${icon} ${iconColor}`}></i>
      </div>
      <div className="flex-1">
        <p className="text-neutral-700 font-medium">{title}</p>
        <p className="text-neutral-500 text-sm">{description}</p>
      </div>
      <div className="text-right">
        <span className="text-neutral-400 text-xs">{timeAgo} ago</span>
      </div>
    </div>
  );
}
