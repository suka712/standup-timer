import { useState } from "react"

const VolumeButton = () => {
  const [volumeLevel, setVolumeLevel] = useState(0.6);

  // const handleClick = () => {
  //   set
  // }

  return (
    <button style={{borderRadius: '50%', width: 40, height: 40}}>
      {/* No text */}
    </button>
  )
  
}

export default VolumeButton;