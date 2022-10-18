import React, { useContext, useEffect, useState } from 'react'
import Main from './Main'

export default function Home() {
  const [parentKey, setParentKey] = useState(0)

  const incrementKey = () => {
    setParentKey(prev => prev + 1)
  }

  return (
    <Main
      key={parentKey}
      incrementKey={incrementKey}
    />
  )
}
