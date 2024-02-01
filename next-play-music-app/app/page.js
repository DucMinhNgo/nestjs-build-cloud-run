import ReactPlayer from 'react-player';

export default function Home() {
  return (
    <div>
      Dustin
      <ReactPlayer
  url="https://storage.cloud.google.com/dustin-upload-file-function/hls/music-23_02_2024/music-23_02_2024.m3u8?authuser=1"
  controls={true}
  width="100%"
  height="auto"
/>
    </div>
  );
}
