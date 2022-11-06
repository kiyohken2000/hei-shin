import React, { createContext, useState, useEffect } from "react";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [count, setCount] = useState(0)
  const [ref, setRef] = useState('abeshinzo')

  return (
    <GalleryContext.Provider
      value={{
        count, setCount,
        ref, setRef
      }}
    >
      {props.children}
    </GalleryContext.Provider>
  )
}