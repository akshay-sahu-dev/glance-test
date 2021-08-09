import { FunctionComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";


import { css, keyframes } from "goober";
import endCTA from '../../lotties/endCTA.json';
import lottie from 'lottie-web';
import { updateCategorySubscriptions, sendCustomAnalytics, glanceMoveToNext } from "../../scripts/glanceJsBridge";



const rotate = keyframes`
  from {
    transform: rotate(-10deg) translateX(-20%) scale(1.2);
  }

  to {
    transform: rotate(0deg) translateX(0%) scale(1);
  }
`

const bgImage = css`
    width: 100vw;
    opacity: 0.6;
    animation: ${rotate} 0.3s linear;
    
  `;

const bgImageHidden = css`
  opacity: 0;
  transition: 0.4s ease-out;
`;

const catg_container_item = css`
    position: relative;
    & .catgs {
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & p {
        width: 200px;
        font-size: 18px;
        margin: 8px 0;
        letter-spacing: 0.5px;
        text-align: center;
        @media (min-width: 450px) {
          
          width: 200px;
          font-size: 20px;
          margin: 10px 0;
          text-align: center;
          
        }
      }

      & button {
        border: none;
        background-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        padding: 7px 10px;
        border-radius: 50px;
        font-size: 85%;
        width: 85px;
        & span {
          display: inline-block;
          padding-right: 3px;
        }
        @media (min-width: 450px) {
          border: none;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 10px 15px;
          border-radius: 50px;
          font-size: 90%;
          width: 95px;
        }
      }
    }
  `;

const lottiePlayer = css`
  width:100%;
  position: absolute;
  height: 30%;
`;

const lotties = css`
  width: 200%;
  height: 26vh;
  position: absolute;
  top: 3.5%;
  left: -50%;
`;

interface Props {
  bgImg: string;
  bgColor: string,
  isSelected: boolean;
  catg: string;
  depth: string;
  setCategories: Function;
  name: string;
  categories: {
    '#daily_digest': boolean,
    '#entertainment': boolean,
    '#food': boolean,
    '#national_new\'s': boolean,
    '#sports': boolean,
  }

};

const CategoryChoices: FunctionComponent<Props> = ({ bgImg, bgColor, isSelected, catg, depth, setCategories, name, categories }) => {

  let startTime: number;

  useEffect(() => {
    startTime = Date.now();
  }, [])

  const catg_container = css`
    height: 78vh;
    width: 200vw;
    display: flex;
    justify-content: center;
    background-color: ${bgColor};
    border-radius: 100% 100% 0 0;
    transform: translateX(-25%);
    position: absolute;
    bottom: ${depth};
    left: 0;
    overflow-x: hidden;
    overflow-y: hidden;
`
  const playerRef = useRef(null);
  const lottieRef = useRef(null);

  const [following, setFollowing] = useState(isSelected);
  useEffect(() => {
    if (playerRef.current) {
      lottieRef.current = lottie.loadAnimation({
        container: playerRef.current,
        loop: true,
        autoplay: true,
        renderer: 'svg',
        animationData: endCTA,
      })
    };
  });

  const eventType: string = 'category_webpeek';
  const actions: {
    sub: string;
    unSub: string;
    time_spent: string,
  } = {
    sub: 'category_subscribed',
    unSub: 'category_unsubscribed',
    time_spent: `time_spent_on_category_summary_page`,
  };

  const handleClick = () => {
    setFollowing(!following);
    let data = Object.assign({}, categories);
    data[catg] = !data[catg];
    setCategories({ ...data });
    console.log(data);

    updateCategorySubscriptions(JSON.stringify(data));  // updating subscription status
    if (!following) {
      console.log("Subscribed");
      var extras = { action: actions.sub, category: catg }
    } else {
      console.log("UnSubscribed")
      extras = { action: actions.unSub, category: catg }
    };
    sendCustomAnalytics({ eventType, extras });

  };

  const handleLottieClick = () => {
    const endTime = Date.now() - startTime;
    const extras = { action: actions.time_spent, total_time: `${endTime} ms` };
    sendCustomAnalytics({ eventType, extras });
    glanceMoveToNext();
  };

  return <div className={catg_container}>
    <div className={catg_container_item}>
      {
        following ? <img src={bgImg} alt="category image" className={bgImage} /> : <img src={bgImg} alt="category image" className={bgImageHidden}
      }
      <div className="catgs">
        <p>{name}</p>
        {bgImg !== "" && <button type='button' onClick={handleClick}>{following ? 'Following' : <div> <span>{"+"}</span> Follow</div>}</button>}
      </div>
      {bgImg === "" ? <div ref={lottieRef} className={lotties}>
        <div onClick={handleLottieClick} ref={playerRef} className={lottiePlayer}></div>
      </div> : null}
    </div>
  </div>
};

export default CategoryChoices;