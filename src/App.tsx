import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useProgress, Html, Stats } from '@react-three/drei'
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import './App.css';
import { Model } from './House'
import TWEEN from '@tweenjs/tween.js'
import annotations from './annotations.json'

const Annotations = (props: {controls: React.MutableRefObject<OrbitControlsImpl>}) => {
  const { camera } = useThree()
  const [selected, setSelected] = useState(-1)

  return (
    <>{annotations.map((value, idx) => {
        return(
          <Html key={idx} position={[value.lookAt.x, value.lookAt.y, value.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
              <circle cx="17" cy="17" r="16" stroke="white" strokeWidth="2" fill="rgba(0,0,0,.66)"
                onPointerDown={() => {
                  setSelected(idx)
                  // change target
                  new TWEEN.Tween(props.controls.current.target)
                    .to({x: value.lookAt.x, y: value.lookAt.y,z: value.lookAt.z }, 1000 )
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()
                  // change camera position
                  new TWEEN.Tween(camera.position)
                    .to({x: value.camPos.x, y: value.camPos.y, z: value.camPos.z }, 1000)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start()
                }} />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {idx + 1}
              </text>
            </svg>
            {value.description && idx === selected &&
              (<div id={'desc_' + idx} className="annotationDescription"
                    dangerouslySetInnerHTML={{ __html: value.description }} />
              )
            }
          </Html>
        )
      })
    }</>
  )
}

const Tween = () => {
  useFrame(() => {
    TWEEN.update()
  })
  return(<></>)
 }

const Loader = () => {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const App = () => {
  const ref = useRef<OrbitControlsImpl>(null!)

  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <Canvas camera={{ position: [8, 2, 12] }}>
        <OrbitControls ref={ref} target={[8, 2, 3]} />
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" background blur={0.75} />
          <Model />
          <Annotations controls={ref} />
          <Tween />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
