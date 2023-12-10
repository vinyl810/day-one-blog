import React from 'react';
import style from './style.module.css';

export default function LoadingComponent() {
  return (
    <div className={style.loading}>
      <h1 className={style['loading-text']}>
        Loading
      </h1>
    </div>
  );
}
