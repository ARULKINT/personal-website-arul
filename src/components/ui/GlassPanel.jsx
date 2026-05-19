import React from 'react';

export default function GlassPanel({ as: Tag = 'div', className = '', holo = false, children, ...rest }) {
  return (
    <Tag
      className={`glass rounded-2xl ${holo ? 'holo-border' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
