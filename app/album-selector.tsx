import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useNavigate } from "@remix-run/react";
import projects from './project-data.json';
import { Label } from "app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "app/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select"

let movementFactor = 0.05;
let rotationAmount = 0.5;
let centerAlbumZoom = 1.2;

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



function Album({ cover, location, index, targetOffset, setTargetOffset, hovered, setHovered, op }: { cover: any, location: number, index: number, targetOffset: number, setTargetOffset: any, hovered: number, setHovered: any, op: number }) {
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
      <meshStandardMaterial map={cover} toneMapped={false} transparent={true} alphaMap={useLoader(TextureLoader, "/mats/homepage/cover-alpha-map-md.jpg")} opacity={op} />
    </mesh>
  )
}

function Scene({ setCurCenter }: { setCurCenter: any }) {
  const navigate = useNavigate();

  const [targetOffset, setTargetOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [mouseCurPos, setMouseCurPos] = useState(null);
  const [mousePrevPos, setMousePrevPos] = useState(null);
  const [hovered, setHovered] = useState(0)
  let op = useRef(0.0)
  const [renderTrigger, setRenderTrigger] = useState(false);

  function handleKeyPress(e: any) {
    if (window.location.href.includes("projects")) return;
    if (e.key == 'ArrowLeft') setTargetOffset(targetOffset => Math.round(targetOffset + 1));
    else if (e.key == 'ArrowRight') setTargetOffset(targetOffset => Math.round(targetOffset - 1));
    else if (e.key == 'Enter') navigate("./projects/" + projects[mod(-targetOffset, projects.length)].name);
  };

  function handleSwipeStart(e: any) {
    if (window.location.href.includes("projects")) return;
    console.log(document.body.style.cursor)
    if (e.type == "mousedown") setMouseCurPos(e.screenX)
    else setMouseCurPos(e.touches[0].screenX)
  }

  function handleSwipeMove(e: any) {
    if (window.location.href.includes("projects")) return;
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
    else moveAmount /= 60
    setTargetOffset(targetOffset => targetOffset - moveAmount);
  }

  function handleSwipeEnd(e: any) {
    if (window.location.href.includes("projects")) return;
    setMouseCurPos(null);
    setMousePrevPos(null);

    setTargetOffset(targetOffset => Math.round(targetOffset));
  }

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

    let opacityDistance = 1.0 - op.current;
    let opacitySpeed = easeOutSine(opacityDistance);
    op.current += opacitySpeed * 0.04;
    if (op.current > 1.0) op.current = 1.0;
    setRenderTrigger((renderTrigger) => !renderTrigger);
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
          op={op.current}
        />
      ))}
    </>
  )
}

import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { loaded } = useProgress()

  var str = "";
  for (var i = 0; i < projects.length; i++) {
    if (i < loaded) str += "▓";
    else str += "░";
  }


  return (
    <Html center>
      <p className='font-mono'>{str}</p>
    </Html>
  )
}

const AlbumSelector = () => {
  const [curCenter, setCurCenter] = useState(0);
  const [grab, setGrab] = useState(false);

  return (
    <div className={`absolute w-screen h-[85vh] md:h-screen left-0 top-0 animate-fade ${grab ? "cursor-grabbing" : "cursor-grab"}`} onMouseDown={() => setGrab(true)} onMouseUp={() => setGrab(false)}>
      <Canvas
        linear
      >
        <Suspense fallback={<Loader />}>
          <Scene
            setCurCenter={setCurCenter}
          />
          <Html
            center
            zIndexRange={[0, 0]}
          >
            <h1 className='select-none absolute left-1/2 top-[19vh] md:top-[20vh] -translate-x-1/2 text-nowrap'>{projects[curCenter].name}</h1>
            <h2 className='select-none absolute left-1/2 top-[25vh] md:top-[23vh] -translate-x-1/2'>{projects[curCenter].year}</h2>
            <p className='select-none	absolute left-1/2 top-[30vh] md:top-[26vh] -translate-x-1/2 w-80 text-center'><i>Keywords: </i>{projects[curCenter].keywords}</p>
          </Html>
        </Suspense>
      </Canvas>
      {/* <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a category" /> 
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className=''>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="banana">Computational Design</SelectItem>
              <SelectItem value="blueberry">Architecture</SelectItem>
              <SelectItem value="grapes">Digital Fabrication</SelectItem>
              <SelectItem value="software development">Software Development</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </div >
  );
};

export default AlbumSelector