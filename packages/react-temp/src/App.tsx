import React from 'react';
import styles from './app.module.less'

type Props = {}

export default function App({}: Props) {
  return (
    <>
    <h1 className='title'>react-temp App hello world</h1>
    <h2 className={styles.modtitle}>react-temp App Module Css </h2>
    <h2 className="bg-red-500">react-temp App tailwindcss </h2>
    <div style={{
      fontSize: '24px',
      color: process.env.PRIMARY
    }}>
      start:prod 脚本环境变量  process.env.PRIMARY
    </div>
    </>
  )
}