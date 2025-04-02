import React from 'react';

interface StatusCardProps {
  title: string;
  count: number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  subtitle?: string;
  accentText?: string;
}

export function StatusCard({
  title,
  count,
  icon,
  iconBgColor,
  iconColor,
  subtitle,
  accentText
}: StatusCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{count}</h3>
        </div>
        <div className={`${iconBgColor} p-2 rounded-md`}>
          <i className={`${icon} text-lg ${iconColor}`}></i>
        </div>
      </div>
      <div className="mt-3 text-xs">
        {accentText ? (
          <span className="text-accent">{accentText}</span>
        ) : (
          <span className="text-neutral-500">{subtitle || ''}</span>
        )}
      </div>
    </div>
  );
}
