import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46,204,113)", transition: { duration: 10 } },
  //color format has to be numerical not string
};

function App() {
  const x = useMotionValue(0);
  // motion keep watch x's value, but do not re-render.
  // style값으로 이동한 값 계속 추적해서 따올 수 있음.
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  //x값이 두번째 인자의 배열일 때, 세번째 인자의 배열로 바꿔줌.
  // 두번쨰 인자는 인풋, 세번째 인자는 아웃풋. 인풋을 아웃풋값으로 변환해줌
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(155, 202, 240), rgb(78, 85, 215)",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238)",
      "linear-gradient(135deg, rgb(133, 170, 151), rgb(209, 203, 84)",
    ]
  );
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  // useEffect(() => {
  //   //x.onChange(() => console.log(x.get()));
  //   scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  // }, [scrollY, scrollYProgress]);
  return (
    <Wrapper
      style={{
        background: gradient,
      }}
    >
      <Box style={{ x, rotateZ, scale: scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
