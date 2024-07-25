import React from 'react'

import styles from './Main.module.css'
import Swap from './Swap'
import Previous from './Previous'

const Main = () => {
  return (
    <div className={styles.main}>
        <Swap />
        <Previous />
    </div>
  )
}

export default Main