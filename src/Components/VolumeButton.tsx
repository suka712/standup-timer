import { useRef } from "react";

type VolumeButtonProps = {
  volumeLevel: number;
  setVolumeLevel: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeButton = ({volumeLevel, setVolumeLevel}: VolumeButtonProps) => {
  const volumeAudio = useRef(new Audio('/volume-adjust.mp3'));
  const handleClick = () => {
    const newVolumeLevel = volumeLevel + 0.2 <= 1.1 ? volumeLevel + 0.2 : 0;
    volumeAudio.current.volume = newVolumeLevel;
    volumeAudio.current.currentTime = 0;
    volumeAudio.current.play();
    console.log(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
  }

  return (
    <button style={{position: 'fixed', bottom: 30, left: 30, zIndex: 1, borderRadius: '50%', width: 40, height: 40}} onClick={handleClick}>
      {/* No text */}
    </button>
  )
  
}

export default VolumeButton;