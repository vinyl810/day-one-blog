import React from 'react';
import style from './style.module.css';

export default function NotFound() {
  return (
    <div className={style['not-found']}>
      <h1 className={style['not-found-text']}>
        404!
      </h1>
    </div>
  );
}
