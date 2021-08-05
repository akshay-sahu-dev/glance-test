import { FunctionComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import Lottie from 'lottie-web';
import confetti from '../../lotties/confetti.json';
import { css } from 'goober';
import { route } from 'preact-router';

const lottiePlayer = css`
  width:100vw;
  height: 100vh;
  background-color: black;
`;

const lotties = css`
  width: 100%;
  height: 100%;
`;

const Confetti: FunctionComponent = () => {
  const playerRef = useRef(null);
  const lottieRef = useRef(null);

  const onCompleteEvent = () => {
    setTimeout(() => {
      route('/selected')
    }, 200);
  };

  useEffect(() => {
    if (playerRef.current) {
      lottieRef.current = Lottie.loadAnimation({
        container: playerRef.current,
        loop: false,
        autoplay: true,
        renderer: 'svg',
        animationData: confetti,
      }).addEventListener('complete', onCompleteEvent)
    }
  });

  return <div ref={lottieRef} className={lotties}>
    <div ref={playerRef} className={lottiePlayer}></div>
  </div>
}

export default Confetti;