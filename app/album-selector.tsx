import React, { useRef, useEffect, useState, Suspense, createContext } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Plane, RoundedBox, Stats, Text } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useNavigate } from "@remix-run/react";
import { roundedRectShape } from './round-rectangle';
import projects from './project-data.json';

let movementFactor = 0.08;
let rotationAmount = 0.5;
let centerAlbumZoom = 1.0;

function mod(d: number, n: number) {
  return ((d % n) + n) % n;
}

function easeInOutSine(x: number): number {

  if (x >= 0) return (Math.cos(Math.PI * x) - 1) / 2;
  else return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

function Album({ cover, location, index, targetOffset, setTargetOffset, hovered, setHovered }) {
  const meshRef = useRef();
  const navigate = useNavigate();

  const openLink = () => {
    if (meshRef.current.position.x > -0.5 && meshRef.current.position.x < 0.5) { navigate("./projects/" + projects[index].name); }
    else setTargetOffset(Math.round(targetOffset - meshRef.current.position.x))
  }

  useEffect(() => {
    if (meshRef.current) {
      if (location > projects.length / 2) meshRef.current.position.x = location - projects.length;
      else if (location < -projects.length / 2) meshRef.current.position.x = location + projects.length;
      else meshRef.current.position.x = location;
    }
  }, [location]);

  useFrame(() => {
    if (meshRef.current) {


      if (meshRef.current.position.x >= 1) {
        meshRef.current.rotation.y = -rotationAmount;
        meshRef.current.position.z = 0;
      }
      else if (meshRef.current.position.x <= -1) {
        meshRef.current.rotation.y = rotationAmount;
        meshRef.current.position.z = 0;
      }
      else {
        meshRef.current.rotation.y = easeInOutSine(meshRef.current.position.x) * rotationAmount;
        meshRef.current.position.z = (easeInOutSine(Math.abs(meshRef.current.position.x)) + 1) * centerAlbumZoom;
      }

    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => { openLink(); e.stopPropagation() }}
      // Onpo
      onPointerEnter={(e) => { setHovered(hovered + 1); }}
      onPointerOut={(e) => { setHovered(hovered - 1); }}
    >
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={cover} toneMapped={false} />
    </mesh>
  )
}

function Scene({ setCurCenter }) {
  const navigate = useNavigate();

  const [targetOffset, setTargetOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [mouseCurPos, setMouseCurPos] = useState(null);
  const [mousePrevPos, setMousePrevPos] = useState(null);
  const [hovered, setHovered] = useState(0)

  function handleKeyPress(e: any) {
    if (e.key == 'ArrowLeft') setTargetOffset(targetOffset => Math.round(targetOffset + 1));
    else if (e.key == 'ArrowRight') setTargetOffset(targetOffset => Math.round(targetOffset - 1));
    else if (e.key == 'Enter') navigate("./projects/" + projects[mod(-targetOffset, projects.length)].name);
  };

  function handleSwipeStart(e: any) {
    if (e.type == "mousedown") setMouseCurPos(e.screenX)
    else setMouseCurPos(e.touches[0].screenX)
  }

  function handleSwipeMove(e: any) {
    // if (e.target === document.body) {
    //   console.log('fire');
    // }
    console.log
    if (mouseCurPos == null) return;


    let moveAmount = null;
    setMousePrevPos(mouseCurPos)
    if (e.type == "mousemove") setMouseCurPos(e.screenX)
    else setMouseCurPos(e.touches[0].screenX)


    if (mouseCurPos == null || mousePrevPos == null) return;

    moveAmount = mousePrevPos - mouseCurPos;
    if (moveAmount == null) return;

    if (e.type == "mousemove") moveAmount /= 250
    else moveAmount /= 100
    setTargetOffset(targetOffset => targetOffset - moveAmount);
  }

  function handleSwipeEnd(e: any) {
    setMouseCurPos(null);
    setMousePrevPos(null);

    setTargetOffset(targetOffset => Math.round(targetOffset));
  }

  useEffect(() => {
    document.body.style.cursor = (hovered > 0) ? 'pointer' : 'auto'
  }, [hovered])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('mousedown', handleSwipeStart)
    document.addEventListener('mousemove', handleSwipeMove)
    document.addEventListener('mouseup', handleSwipeEnd)
    document.addEventListener("touchstart", handleSwipeStart)
    document.addEventListener("touchmove", handleSwipeMove)
    document.addEventListener("touchend", handleSwipeEnd)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('mousedown', handleSwipeStart)
      document.removeEventListener('mousemove', handleSwipeMove)
      document.removeEventListener('mouseup', handleSwipeEnd)
      document.removeEventListener("touchstart", handleSwipeStart)
      document.removeEventListener("touchmove", handleSwipeMove)
      document.removeEventListener("touchend", handleSwipeEnd)
    }
  }, [targetOffset, mouseCurPos, mousePrevPos])

  useFrame(() => {
    let movementDistance = targetOffset - currentOffset
    let movementSpeed = easeOutSine(movementDistance * movementFactor)
    setCurrentOffset(currentOffset + movementSpeed)

    let curCenter = mod(Math.round(-currentOffset), projects.length)
    setCurCenter(curCenter)

  })

  return (
    <>
      <ambientLight intensity={3.1} />
      {projects.map((project, index) => (
        <Album
          key={index}
          cover={useLoader(TextureLoader, '/mats/homepage/cover-' + project.name + '.jpg')}
          location={mod(index + currentOffset, projects.length)}
          index={index}
          targetOffset={targetOffset}
          setTargetOffset={setTargetOffset}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  )
}

const AlbumSelector = () => {
  const [curCenter, setCurCenter] = useState(0);

  return (
    <div className='absolute w-screen h-screen left-0 top-0'>
      <Canvas
        linear
      >
        <Suspense fallback={null}>
          <Scene
            setCurCenter={setCurCenter}
          />
        </Suspense>
      </Canvas>
      <h1 className='absolute left-1/2 top-[68%] md:top-[70%] -translate-x-1/2 text-nowrap'>{projects[curCenter].name}</h1>
      <h2 className='absolute left-1/2 top-[73%] -translate-x-1/2'>{projects[curCenter].year}</h2>
      <p className='absolute left-1/2 top-[77%] md:top-[76%] -translate-x-1/2 w-80 text-center'><i>Keywords: </i>{projects[curCenter].keywords}</p>
    </div >
  );
};

export default AlbumSelector