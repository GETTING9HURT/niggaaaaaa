"use client";

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';

export const TimeAgo = ({ date }: { date: string | Date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (date) {
      setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
    }
  }, [date]);

  if (!timeAgo) {
    return null; // Render nothing on the server to prevent mismatch
  }

  return (
    <div className="flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {timeAgo}
    </div>
  );
};
