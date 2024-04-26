import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, useNavigate, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => setIsVisible(!isVisible);
  return /* @__PURE__ */ jsxs("div", { className: "bg-opacity-80 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed left-3 top-3 text-2xl w-2", children: /* @__PURE__ */ jsx("p", { className: `hover:text-yellow-500 cursor-pointer ${isVisible ? "hidden" : "show"}`, onClick: handleClick, children: "☰" }) }),
    /* @__PURE__ */ jsxs("div", { className: `transform top-0 p-4 left-0 w-auto bg-white fixed h-[97vh] m-4 mt-[1.5vh] border-2 border-neutral-250 rounded-md ease-in-out transition-all duration-300 z-30 ${isVisible ? "translate-x-0" : "-translate-x-[200%]"}`, onClick: handleClick, children: [
      /* @__PURE__ */ jsxs("ul", { className: "hover:*:*:text-yellow-500", children: [
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2024" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/wax-flamingos", children: "Wax Flamingos**" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2023" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/honeycomb", children: "Honeycomb**" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/water-qwop", children: "Water-QWOP" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/horse-and-chariot", children: "Horse & Chariot*" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/hyper-hydration", children: "Hyper-hydration" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2022" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/sprawl-and-resilience", children: "Sprawl & Resilience*" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2021" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/cybernetic-field", children: "Cybernetic Field" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/bubble-gan", children: "Bubble-GAN" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2020" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/elc-carrick", children: "ELC: Carrick" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/placeholder", children: "15-112: placeHolder**" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/collaborative-winding", children: "Collaborative Winding" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2019" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/flood-museum", children: "Flood Museum" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/design-fabrication", children: "Design Fabrication*" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/spring-garden-hostel", children: "Spring Garden Hostel*" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/modular-garden", children: "Modular Garden" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/bathhouse", children: "Bathhouse" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-sm italic pt-3", children: "2018" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/hoophouse", children: "Hoophouse" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "./projects/misc", children: "Misc" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "absolute top-4 -right-7 hover:text-yellow-500 cursor-pointer font-bold", onClick: handleClick, children: "✕" })
    ] })
  ] });
}
const projects = [
  {
    name: "wax-flamingos",
    year: "2024",
    keywords: "Behavioral Robotics, Additive Manufacturing, Material Indeterminancy"
  },
  {
    name: "droplets",
    year: "2024",
    keywords: "p5.js, Agent-Based Modeling, Phenomena Modeling"
  },
  {
    name: "honeycomb",
    year: "2023",
    keywords: "Symmetry Groups, Parametric Design, Grasshopper Development"
  },
  {
    name: "water-qwop",
    year: "2023",
    keywords: "Reinforcement Learning, Unity Modeling, Game Agent Design"
  },
  {
    name: "horse-and-chariot",
    year: "2023",
    keywords: "Arduino Programming, Mobile Robotics, Data Transmission"
  },
  {
    name: "hyper-hydration",
    year: "2023",
    keywords: "Machine Learning, Optimization, Product Design"
  },
  {
    name: "cloud-sketch",
    year: "2022",
    keywords: "p5.js, Phenomena Modeling, Generative Art"
  },
  {
    name: "sprawl-and-resilience",
    year: "2022",
    keywords: "Landscape Ecology, Board Game Design, Urban Planning"
  },
  {
    name: "cybernetic-field",
    year: "2021",
    keywords: "Cybernetics, Agent-Based Modeling, Human-Computer Interaction"
  },
  {
    name: "bubble-gan",
    year: "2021",
    keywords: "Machine Learning, Generative Adversarial Network, Architectural AI"
  },
  {
    name: "elc-carrick",
    year: "2020",
    keywords: "Educational Architecture, Materials and Assembly, Pittsburgh"
  },
  {
    name: "placeholder",
    year: "2020",
    keywords: "Photogrammetry, Python Programming, Software Design"
  },
  {
    name: "collaborative-winding",
    year: "2020",
    keywords: "Architectural Robotics, Dual-Robot, Digital Fabrication"
  },
  {
    name: "flood-museum",
    year: "2019",
    keywords: "Cultural Architecture, Combined Sewer System, Pittsburgh"
  },
  {
    name: "design-fabrication",
    year: "2019",
    keywords: "Digital Fabrication, Computer-Aided-Design, Spatial Extrapolation"
  },
  {
    name: "spring-garden-hostel",
    year: "2019",
    keywords: "Residential Architecture, Adaptive Reuse, Pittsburgh"
  },
  {
    name: "modular-garden",
    year: "2019",
    keywords: "Digital Fabrication, CNC Milling, Parametric Design"
  },
  {
    name: "bathhouse",
    year: "2019",
    keywords: "Recreational Archtiecture, Architectural Sequencing, White Mountains"
  },
  {
    name: "hoophouse",
    year: "2018",
    keywords: "Residential (for plants), Design & Build, Phipps Conservatory"
  },
  {
    name: "drawings",
    year: "2017",
    keywords: "Charcoal, Pastel"
  }
];
let movementFactor = 0.08;
let rotationAmount = 0.5;
let centerAlbumZoom = 1;
function mod(d, n) {
  return (d % n + n) % n;
}
function easeInOutSine(x) {
  if (x >= 0)
    return (Math.cos(Math.PI * x) - 1) / 2;
  else
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
function easeOutSine(x) {
  return Math.sin(x * Math.PI / 2);
}
function Album({ cover, location, index, targetOffset, setTargetOffset, hovered, setHovered }) {
  const meshRef = useRef();
  const navigate = useNavigate();
  const openLink = () => {
    if (meshRef.current.position.x > -0.5 && meshRef.current.position.x < 0.5) {
      navigate("./projects/" + projects[index].name);
    } else
      setTargetOffset(Math.round(targetOffset - meshRef.current.position.x));
  };
  useEffect(() => {
    if (meshRef.current) {
      if (location > projects.length / 2)
        meshRef.current.position.x = location - projects.length;
      else if (location < -projects.length / 2)
        meshRef.current.position.x = location + projects.length;
      else
        meshRef.current.position.x = location;
    }
  }, [location]);
  useFrame(() => {
    if (meshRef.current) {
      if (meshRef.current.position.x >= 1) {
        meshRef.current.rotation.y = -rotationAmount;
        meshRef.current.position.z = 0;
      } else if (meshRef.current.position.x <= -1) {
        meshRef.current.rotation.y = rotationAmount;
        meshRef.current.position.z = 0;
      } else {
        meshRef.current.rotation.y = easeInOutSine(meshRef.current.position.x) * rotationAmount;
        meshRef.current.position.z = (easeInOutSine(Math.abs(meshRef.current.position.x)) + 1) * centerAlbumZoom;
      }
    }
  });
  return /* @__PURE__ */ jsxs(
    "mesh",
    {
      ref: meshRef,
      onClick: (e) => {
        openLink();
        e.stopPropagation();
      },
      onPointerEnter: (e) => {
        setHovered(hovered + 1);
      },
      onPointerOut: (e) => {
        setHovered(hovered - 1);
      },
      children: [
        /* @__PURE__ */ jsx("planeGeometry", { args: [2, 2] }),
        /* @__PURE__ */ jsx("meshStandardMaterial", { map: cover, toneMapped: false })
      ]
    }
  );
}
function Scene({ setCurCenter }) {
  const navigate = useNavigate();
  const [targetOffset, setTargetOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [mouseCurPos, setMouseCurPos] = useState(null);
  const [mousePrevPos, setMousePrevPos] = useState(null);
  const [hovered, setHovered] = useState(0);
  function handleKeyPress(e) {
    if (window.location.href.includes("projects"))
      return;
    if (e.key == "ArrowLeft")
      setTargetOffset((targetOffset2) => Math.round(targetOffset2 + 1));
    else if (e.key == "ArrowRight")
      setTargetOffset((targetOffset2) => Math.round(targetOffset2 - 1));
    else if (e.key == "Enter")
      navigate("./projects/" + projects[mod(-targetOffset, projects.length)].name);
  }
  function handleSwipeStart(e) {
    if (window.location.href.includes("projects"))
      return;
    console.log(document.body.style.cursor);
    if (e.type == "mousedown")
      setMouseCurPos(e.screenX);
    else
      setMouseCurPos(e.touches[0].screenX);
  }
  function handleSwipeMove(e) {
    if (window.location.href.includes("projects"))
      return;
    if (mouseCurPos == null)
      return;
    let moveAmount = null;
    setMousePrevPos(mouseCurPos);
    if (e.type == "mousemove")
      setMouseCurPos(e.screenX);
    else
      setMouseCurPos(e.touches[0].screenX);
    if (mouseCurPos == null || mousePrevPos == null)
      return;
    moveAmount = mousePrevPos - mouseCurPos;
    if (moveAmount == null)
      return;
    if (e.type == "mousemove")
      moveAmount /= 250;
    else
      moveAmount /= 60;
    setTargetOffset((targetOffset2) => targetOffset2 - moveAmount);
  }
  function handleSwipeEnd(e) {
    if (window.location.href.includes("projects"))
      return;
    setMouseCurPos(null);
    setMousePrevPos(null);
    setTargetOffset((targetOffset2) => Math.round(targetOffset2));
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleSwipeStart);
    document.addEventListener("mousemove", handleSwipeMove);
    document.addEventListener("mouseup", handleSwipeEnd);
    document.addEventListener("touchstart", handleSwipeStart);
    document.addEventListener("touchmove", handleSwipeMove);
    document.addEventListener("touchend", handleSwipeEnd);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleSwipeStart);
      document.removeEventListener("mousemove", handleSwipeMove);
      document.removeEventListener("mouseup", handleSwipeEnd);
      document.removeEventListener("touchstart", handleSwipeStart);
      document.removeEventListener("touchmove", handleSwipeMove);
      document.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [targetOffset, mouseCurPos, mousePrevPos]);
  useFrame(() => {
    let movementDistance = targetOffset - currentOffset;
    let movementSpeed = easeOutSine(movementDistance * movementFactor);
    setCurrentOffset(currentOffset + movementSpeed);
    let curCenter = mod(Math.round(-currentOffset), projects.length);
    setCurCenter(curCenter);
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: 3.1 }),
    projects.map((project, index) => /* @__PURE__ */ jsx(
      Album,
      {
        cover: useLoader(TextureLoader, "/mats/homepage/cover-" + project.name + ".jpg"),
        location: mod(index + currentOffset, projects.length),
        index,
        targetOffset,
        setTargetOffset,
        hovered,
        setHovered
      },
      index
    ))
  ] });
}
const AlbumSelector = () => {
  const [curCenter, setCurCenter] = useState(0);
  const [grab, setGrab] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `absolute w-screen h-[85vh] md:h-screen left-0 top-0 ${grab ? "cursor-grabbing" : "cursor-grab"}`, onMouseDown: () => setGrab(true), onMouseUp: () => setGrab(false), children: [
    /* @__PURE__ */ jsx(
      Canvas,
      {
        linear: true,
        children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
          Scene,
          {
            setCurCenter
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "absolute left-1/2 top-[69%] md:top-[70%] -translate-x-1/2 text-nowrap", children: projects[curCenter].name }),
    /* @__PURE__ */ jsx("h2", { className: "absolute left-1/2 top-[75%] md:top-[73%] -translate-x-1/2", children: projects[curCenter].year }),
    /* @__PURE__ */ jsxs("p", { className: "absolute left-1/2 top-[80%] md:top-[76%] -translate-x-1/2 w-80 text-center", children: [
      /* @__PURE__ */ jsx("i", { children: "Keywords: " }),
      projects[curCenter].keywords
    ] })
  ] });
};
const AlbumSelector$1 = AlbumSelector;
const stylesheet = "/assets/tailwind-CII8-Pk1.css";
const links = () => [
  { rel: "stylesheet", href: stylesheet }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Samuel Losi is a student of Computational Design. He is attending the University of Stuttgart's ITECH Program to study intimate processes of digital making." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "architect, computational design, student, architecture portfolio, carnegie mellon university, school of architecture, institue of compoutational design, university of stuttgart, design, architecture, ITECH, soa, sam losi, samuel losi, losi, undergraduate student, graduate student, computation, robotics, architectural robotics" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon//favicon-16x16.png" }),
      /* @__PURE__ */ jsx("link", { rel: "manifest", href: "/favicon//site.webmanifest" }),
      /* @__PURE__ */ jsx("link", { rel: "mask-icon", href: "/favicon//safari-pinned-tab.svg", color: "#5bbad5" }),
      /* @__PURE__ */ jsx("meta", { name: "msapplication-TileColor", content: "#da532c" }),
      /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#ffffff" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-screen", children: [
    /* @__PURE__ */ jsx(AlbumSelector$1, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(NavBar, {})
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function CollaborativeWinding() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Collaborative Winding: Robotic Collaboration (2020)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Collabrative Winding is a robotic research/ fabrication project that proposes a system that utilizes robotic weaving based on an object. This project was a collaboration with Nick Coppula." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/collaborative_weaving/robots.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This process required collaboration between two robots and was written in RAPID and HAL for grasshopper. The ABB 4400 robot moves the material to a position inside the frame and the ABB 6640 robot loops the material onto a fastening system on the exterior of the frame. This robotic collaboration enables the internal complexity of weaving while maintaining a regular external frame geometry, which is then expressed by repeatedly bringing numerous strands back to a set of fixed positions." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/collaborative_weaving/hook_Proc.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The project's form has a complex, spatial interior rather than a regulated exterior. This makes it distinct from many precedent projects which heavily rely on robotically woven structures aptly described as “shells”. The collaborators proposed a system of weaving that is adaptable and builds upon the existing formal language surrounding robotically woven structures. Inverted weaving was the development of an inside-out approach to weaving where the basic frame becomes external and the complexity becomes internal." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/collaborative_weaving/tool.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/collaborative_weaving/logic.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "5",
        src: "/mats/collaborative_weaving/responsibilities.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/collaborative_weaving/rapidtogh.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("video", { width: "100%", height: "auto", controls: true, children: [
      /* @__PURE__ */ jsx(
        "source",
        {
          src: "/mats/collaborative_weaving/weaving.mp4",
          type: "video/mp4"
        }
      ),
      "Your browser does not support the video tag."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/collaborative_weaving/axon.jpg" })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CollaborativeWinding
}, Symbol.toStringTag, { value: "Module" }));
function SprawlResilience() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Sprawl & Resilience (Undergraduate Thesis, 2022)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "“News of a human developer surveying the area has shaken the woodland creatures and native plant life. The forest has destabilized and there is chaos among its residents. Can the Woodland Creatures work together in order to combat the impending development?”" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/sprawl_resilience/teaser.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This project looks to generate a critique of the suburb within the minds of its residents, challenging the attitude of growth that enables suburban sprawl and giving a voice to non-human residents of pre-developed land. The suburban landscape is vast and growing; a single spatial intervention would not impact a significant amount of suburbanites. Thus, the project materializes itself as a living room board game where players work together and compete to restrain suburban development over the board. Transforming their mindset in the span of a few hours is impossible, so this project positions itself as a platform to catalyze the imagination of collective thoughts." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The board game takes place in a soon-to-be developed land on the outskirts of American Suburbia. The game's gameplay is asymmetrical, meaning that each team has differing gameplay styles that begin to determine their power, action, and strategy." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "BACKGROUND" }),
    /* @__PURE__ */ jsx("p", { children: "This thesis was born out of my own life experience. My childhood took place in the suburbs south of Cleveland, Ohio, USA and it was there that I gained first-hand experiences of this urban form. But I, much like the majority of people living there, was clueless to the troubles I was inadvertently a part of. It should be noted that no single person is responsible for any of the problems of suburbia. Placing blame on individuals (aside from those who have great power and money) is unhelpful and irrelevant. These problems are something of a wicked nature, where change must be made collectively." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "2",
        src: "/mats/sprawl_resilience/arial_of_hickory_ridge.png"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "While the image of suburbia as we know it began in the late 1940s, its roots can be traced much earlier, namely to the Palace of Versailles. French King Louis XIV's magnificent show of wealth determined, more than anything else, the quality of the suburban landscape. Versailles' vast and well-kept lawns, and those at the end of a cul-de-sac may be very different in scale, but both ultimately are a physical manifestation of wealth. The lawn is a visage into American culture and belief. Diller + Scofidio's The American Lawn: Surface of Everyday Life(1998) “reveals the lawn as a domestic symbol, civic showplace, economic force, and national icon.” The showcasing of lawn-keeping machinery, various types of turf, and reverent depictions of lawn archetypes, a revelation of both respect and irony are created. The curated showmanship of an individual's lawn lets you understand a lot about them and, on a larger scale, becomes representative of many dimensions of American life." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/sprawl_resilience/10050axon.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "4",
          src: "/mats/sprawl_resilience/figure_ground.png"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The lawn is the driving force of spatial use in the suburban landscape. A lawn more curated than its neighbors shows who's the wealthiest on the street. It's a social game that requires a massive amount of space where playing is the only option. Suburbanites' desires for their own personal Garden of Versailles maintains the market for this extremely sparse living, and demand continues to grow. Suburban homes, such as those I grew up in, are isolated from one another. With an average of 2,300 square feet (213 square meters) in 2020, American homes are big for the average of 2.6 people that reside in them. Villas, such as these, are found across the entire suburban landscape. I speculate that this separation of individuals and families leads to psychological issues that have arisen in the past decades. Micro-cultures form within family units and emotional-social-support systems are often not present in children and adolescents' lives. While this has not yet been examined academically, the lack of cooperative and social lives is astounding." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/sprawl_resilience/dolores_hayden.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Soon-to-be felled forests make way for enormous infrastructure projects, housing developments, and retail districts shaping the foundations of mine and other suburbanites' behaviors. Reliance on automobiles and lack of proper walkable places, even towards the urban center of Cleveland is assumed and not interrogated for many, well-documented reasons. Firstly, automobiles, their quality, and the individual's upkeep of them are a sign of wealth. Automobiles, like lawns and many other things, are a part of the cultural theatrics that Americans take part in. Secondly, there is a lack of extensive, reliable public transportation. This is partly due to the previously mentioned question of wealth: public transportation in many parts of the country is seen as welfare. See below for the Strongsville, Ohio mall and the size of the parking lot that services it." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/sprawl_resilience/mall.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "To me, suburbanites' connections to the natural world is the only real amenity that one may not find as accessible anywhere else. Where present, parks and nature reserves serve as a quiet respite from busy life. But even this comes at the cost of the natural world's commodification; in the eyes of Mother Nature, it is a selfish act to divide forests with innumerable roads and trails for human enjoyment. Forests and lakes, previously undisturbed places, become spots of recreation for those who can afford to make the trip to them and infrastructure facilitating transportation and recreation are quickly created to take advantage of their capital gain. The human landscape is now dominating the natural landscape so much that nature, as we conceptualize it, is now manmade." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/sprawl_resilience/levittown.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "As someone who grew up in the suburbs and has experienced less resource-intensive ways of living since, I have begun to understand both the advantages and disadvantages, costs and privileges that come with living in an American suburb. From experience and further research, this thesis became an attempt to reveal underlying socio-political tensions of the suburban landscape and to remind suburbanites that our friends in the natural world exist, even as we seek to conform their habitats to our own." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "SYNTHESIS" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The problems discussed above are not easy to solve. Habits are grounded in cultural belief and foundational understanding and quick changes to such things across so many people is impossible. Change must come slowly and as a collective. The vastness of the suburban landscape poses an interesting problem for an architecture student: how could a single structure conveying these ideals reach a target audience spread across thousands of miles? Architecture is typically built in one place and serves the community surrounding it. A static structure is clearly not the correct choice. The medium must be something that could travel place to place. A mobile medium that reaches those who might not encounter these ideas otherwise. A direct description might appear as a method of challenging beliefs rather than simply sharing alternative beliefs. Thus, the thesis becomes a board game. Mechanics and rules of board games act as a platform for players to role-play, embody and learn together." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/sprawl_resilience/equality.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This thesis chose to focus on the issues regarding the devaluation of the natural world. Suburban development continues to expand outwards, covering forests, fields, and other habitats with single-family homes and asphalt. In light of the ever-increasing issues of climate change and biodiversity loss, suburban development and its lifestyle are becoming increasingly negative. The protagonists of the game are the Woodland Creatures of the natural world. In light of their habitat destruction, they must face evil and work together in order to come out alive." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "In any good narrative, a well-rounded villain and antagonist is absolutely necessary to drive a conflict. The thesis's villain is the Developer: a wealthy individual in the suburbs that represents and embodies the issues of suburbia. The Developer and the Woodland Creatures struggle for territory on the board, and power dynamics and imbalances between the two parties arise." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/sprawl_resilience/reality.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The mechanics of the game give far more power to the Developer than to the Woodland Creatures. It is intended that as players sit around a table together, a social dynamic arises where the few (the Developer) have the majority of the power in changing the board state and the many (the Woodland Creatures) must rapidly adapt their actions to combat impending decisions and strategies." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/sprawl_resilience/jeff1.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/sprawl_resilience/jeff2.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "12", src: "/mats/sprawl_resilience/jeff3.jpg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Fortunately, the step of creating a dynamic board grounded in reality had unexpected historical precedent the thesis could draw from. In 1785 and to circumvent issues of change in the natural world, Thomas Jefferson proposed that sale and surveying of land in the United States, despite most natural boundaries, be fit to a grid. Jefferson's method is still in use and these square mile plots of land are clearly visible from an aerial view. The grid's disregard for the boundaries, habitats, and wildlife of the land set a standard for American living that is still evident in midsets today. The Jefferson Grid, well-documented by artist and photographer Shabtai Panchevshy, serves as a tile system from which the board game thesis took advantage of. The board became a 14in by 14in square, poised for a possible 16 square mile tiles of development." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "OUTCOME" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This thesis manifests itself as an asymmetrical board game where the Woodland Creatures and the Developer have a power struggle over a portion of land. The Woodland Creatures, consisting of up to 5 players, fill the roles of native flora and fauna and are powerless on their own. Only through collaboration, communication, and synergizing of character-specific abilities, can begin to have real impact on the board. The Developer, a one player team, makes broad strokes through the process of development. Her gameplay, known as engine building, consists of a positive feedback loop between capital investments and income." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "13",
        src: "/mats/sprawl_resilience/woodland_creatures.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "On the board, the Woodland Creatures are represented as figurines, open and readily affected by changes in the board state. The Woodland Creatures work together in order to halt the impending development and make the forests resilient. Their gameplay style is all about adapting to change as a team, making decisions together that best fits their collective win-condition. The Developer, on the other hand, is not represented on the board. The player embodies the Developer character, physically representing the idea of the top-down vision of a suburban developer. The Developer works solo, making decisions based on his or her current and projected income, trying to maximize profit while working around the cooperative efforts of the Woodland Creatures. She spends time each turn awarding his or herself capital income, making moves to develop, laughing maniacally, and bathing in her power." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The actions and relationships between players constructs tensions between the Developer and the Woodland Residents. The constructed dynamic that arises from one player with lots of power vs many with not small amounts becomes contradictory to the physical presence the players have when seated when around the table. This designed experience highlights the inequalities that arise from classes, power struggles, and erasure. The Woodland Creatures are influenced to use practices of commoning to combat the imbalances they face from the other side of the board." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "17",
        src: "/mats/sprawl_resilience/exhibition_plans.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("video", { width: "100%", height: "auto", controls: true, children: [
      /* @__PURE__ */ jsx(
        "source",
        {
          src: "/mats/sprawl_resilience/timelapse.mp4",
          type: "video/mp4"
        }
      ),
      "Your browser does not support the video tag."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The thesis and board game were fortunate enough to be exhibited in the 2022 Carnegie Mellon University School of Architecture Symposium, where many took part in learning the rules and playing. The social dynamic between teams did arise. It was exciting to discuss and learn from this experience as problems regarding replayability of the board game were brought to light. I learned that if the game was to become a widespread, accessible critique of the suburbs, some changes would need to be made." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "15", src: "/mats/sprawl_resilience/playing_game.jpg" })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SprawlResilience
}, Symbol.toStringTag, { value: "Module" }));
function SpringGardenHostel() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Spring Garden Hostel (2019)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The brick shell of a long-deserted shoe factory and a parcel of land adjacent to a heavy intersection served as the site for urban hostel. The two-story brick facades became the cornerstone of design throughout the adaptive reuse project and supported the play of interstitial space, manipulating the experiences of inside and out." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/spring_garden_hostel/section.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "To maintain the experience of solidarity within the existing shell, the hostel's private resident rooms are placed on higher floors of the adjacent parcel. The interior of the brick shell serves predominately as a courtyard and is flanked by a multitude of transparent semiprivate spaces." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/spring_garden_hostel/floor3.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/spring_garden_hostel/floor2.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/spring_garden_hostel/floor1.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The hostel's public space is located on the first floor of the additional parcel of land, drawing in foot traffic and granting glimpses of the interior of the brick facades." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/spring_garden_hostel/model.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/spring_garden_hostel/render.jpg" })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SpringGardenHostel
}, Symbol.toStringTag, { value: "Module" }));
function DesignFabrication() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Design Fabrication: From 2D to 3D (2019)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Ariane Et Pasiphae(below) was painted in 1935 by an artist and architect Le Corbusier. It is denoted by simple shapes void of detail and strong colors that imply the subject through composition. Purist paintings, such as this, tend to read as very flat; space is not clearly visible but is rather implied through color and proportion." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "1",
        src: "/mats/design_fabrication/ariane_et_pasiphae.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The investigation of the painting began with a series of analytical steps in order to break down the composition. Proportion and color were analyzed in order to find the implied spatial qualities of the painting. These served as the baseline for interpreting the spacial qualities that were explored through the following series of models and drawings." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/design_fabrication/planar_model.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/design_fabrication/planar_drawing.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "4",
        src: "/mats/design_fabrication/section_acrylic2.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/design_fabrication/planar_drawing2.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "6",
          src: "/mats/design_fabrication/frontfacadecardboard.jpg"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "7",
          src: "/mats/design_fabrication/backfacadecardboard.jpg"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "8",
        src: "/mats/design_fabrication/chipboard1_drawing.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/design_fabrication/chip101.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/design_fabrication/chip100.JPG" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/design_fabrication/invert_drawing.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "12", src: "/mats/design_fabrication/chip200.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "13", src: "/mats/design_fabrication/chip201.jpg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "14", src: "/mats/design_fabrication/chip202.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "15", src: "/mats/design_fabrication/chip203.jpg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "16",
        src: "/mats/design_fabrication/sections_drawing.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "17", src: "/mats/design_fabrication/plywood.jpg" })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DesignFabrication
}, Symbol.toStringTag, { value: "Module" }));
function HorseChariot() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Horse & Chariot (2023)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Through audio transmission, touch input, drawing ability, audio reception and motor power, this Arduino project takes a satirical stance on the creation of useful devices in order to explore capabilities of physical computing. It consists of two robots, the Horse and the Chariot, who must work together in order to draw a user-defined path. Conceptually, this project takes a single robot with a path-planning drawing function and, for no useful reason, decides to separate it into two different robots that are connected via a string and sound. This project was developed as part of the Computational Design and Digital Fabrication seminar at ITECH master´s program in collaboration with Cornelius Carl and Paula Castel. All the code for this project can be found on ",
      /* @__PURE__ */ jsx(Link, { className: "underline hover:text-yellow-500", to: "https://github.com/sqamuell/horse-carriage", rel: "noopener noreferrer", target: "_blank", children: "GitHub" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/horse_chariot/render_above.png" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "2",
          src: "/mats/horse_chariot/persp_view_real_3.png"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The Chariot is the brains of the operation, it receives a drawing from the user via a touchpad. It rationalizes a path into a set of movement commands then encodes it into a series of floating point numbers. One by one, the Chariot transmits the commands as audio (one approximately every 3 seconds) to the Horse. The Horse is the wheels of the operation. Using a microphone, it receives the floating point number over audio from the Chariot and decodes it into a movement command, which it promptly executes. The Horse pulls the Chariot along with it via a string and together they traverse the path. All the while, the Chariot drags chalk to mark out the users’ drawing." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/horse_chariot/organization.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "With the objective of drawing a user input picture, the robots' process is organized into a series of steps that directly relate to hardware organization." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsx("li", { children: "1. User defines path" }),
      /* @__PURE__ */ jsx("li", { children: "2. Path converted to audio movement commands" }),
      /* @__PURE__ */ jsx("li", { children: "3. Transmit (1) audio" }),
      /* @__PURE__ */ jsx("li", { children: "4. Decode audio movement command" }),
      /* @__PURE__ */ jsx("li", { children: "5. Execute movement & draw!" })
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "We will now examine these steps in greater detail in order to build a rounded picture of the system complexity." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "1. User defines path" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/horse_chariot/drawing.png" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/horse_chariot/drawing_live.gif" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The process of drawing is initated by drawing a custom path on the Chariot's touchscreen. It records the drawing from the moment of contact until you release your finger. Internally, the path is divided into segments." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "2. Path converted to audio movement commands" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/horse_chariot/encoding.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Next, the path segemtns are converted into vectors, orient via the previous direction. These values are encoded as numbers between 0.000 and 0.999, where 0.000 is left and 0.999 is right. Each value is converted into a series of five frequencies that are stored in a list." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "3. Transmit (1) audio" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/horse_chariot/transmission.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Once every two seconds, the Chariot transmits the series of five frequencies via audio to the Horse." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "4. Decode audio movement command" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/horse_chariot/decoding.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Upon recieveing audio, the Horse decodes the direction, virtually reverse engineering the encoding steps to determine the direction vector. The Horse then changes the speed of each wheel in relation to the movement direction." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "5. Execute movement & draw!" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/horse_chariot/horse_chariot.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Once all steps are combined together, the Horse and the Chariot begin to draw! An observer can watch and listen as the robot moves around and then evaluate if the movement path is similar to that of what they had drawn on the touch screen.",
      " ",
      /* @__PURE__ */ jsx("i", { children: "*Above is a previous iteration of the robot body design." })
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "Assembly:" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("b", { children: "Electronics" }) }),
        /* @__PURE__ */ jsx("li", { children: "(1) Arduino Nano 33 BLE" }),
        /* @__PURE__ */ jsx("li", { children: "(1) Arduino Nano 33 BLE Sense" }),
        /* @__PURE__ */ jsx("li", { children: "(1) Breadboard" }),
        /* @__PURE__ */ jsx("li", { children: "(1-2) Piezo Speaker" }),
        /* @__PURE__ */ jsx("li", { children: "(1) 1k Ohm Resistor" }),
        /* @__PURE__ */ jsx("li", { children: "(1) 3.5” IPS Capacitive Touchscreen" }),
        /* @__PURE__ */ jsx("li", { children: "(2) DC motor" }),
        /* @__PURE__ */ jsx("li", { children: "(2) Matching wheel" }),
        /* @__PURE__ */ jsx("li", { children: "(1) Arduino Shield L298N" }),
        /* @__PURE__ */ jsx("li", { children: "(2) Battery Pack (9V + 12V)" }),
        /* @__PURE__ */ jsx("li", { children: "(1) Handful of Wires" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("b", { children: "Materials" }) }),
        /* @__PURE__ */ jsx("li", { children: "(1) Stick of Chalk" }),
        /* @__PURE__ */ jsx("li", { children: "(700g) PLA" }),
        /* @__PURE__ */ jsx("li", { children: "(200g) Rectangular Weight" }),
        /* @__PURE__ */ jsx("li", { children: "(5) Castor Wheels" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("b", { children: "Tools" }) }),
        /* @__PURE__ */ jsx("li", { children: "3D Printer" }),
        /* @__PURE__ */ jsx("li", { children: "Soldering Iron" }),
        /* @__PURE__ */ jsx("li", { children: "Wire Stripper" }),
        /* @__PURE__ */ jsx("li", { children: "Screwdriver" }),
        /* @__PURE__ */ jsx("li", { children: "Drill" }),
        /* @__PURE__ */ jsx("li", { children: "Caliper or ruler" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Above is the list of items needed to build this project. We found that the motor driver is not optimal for the task, but [",
      /* @__PURE__ */ jsx("i", { children: "for the most part" }),
      "] it worked. The two robots also require a 3D-printed body, that is fully customizable."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/horse_chariot/exploded_back.gif" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/horse_chariot/fritzing_back.png" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Assembly of the Chariot requires most of the hardware and software. It requires a 9V battery to operate." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "12",
          src: "/mats/horse_chariot/exploded_front.gif"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "13",
          src: "/mats/horse_chariot/fritzing_front.png"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Assembly of the Horse is more delicate, as the motors must be fine tuned in relation to the incoming audio. It requires a 12V battery to operate." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "14", src: "/mats/horse_chariot/top_view_real.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Errors in wiring during the project resulted in the destruction of (2) Arduino Nano BLE Senses. This was quite frustrating and mildly costly. If one is to attempt to recreate this project based on what is shown here, a newer model of a motor driver is recommended." })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HorseChariot
}, Symbol.toStringTag, { value: "Module" }));
function CyberneticField() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Cybernetic Field: Responsive Algorithm (2021)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This project considers W. Ross Ashby's model for cybernetic architecture and seeks to create a homeostatic machine through Processing and the use of projection mapping. Cybernetic Field was completed incollaboration with Joshua Cao. Cybernetic field begins with a scene of randomly-generated points that are influenced by an underlying vector field. They gradually find a dynamic stable loop or orbit within the field, collectively reaching homeostatsis. Then, flattening the depth image of a three-dimensional space to the projector plane with a Kinect, the algorithm captures objects and actors in the scene. From these environment elements, contour information is extracted and used to recalculate vector directions and amplitudes within the field. The points are then affected by the change in vectors, reaching many states of disorder in the process of restabilizing themselves. Balance will always restore itself and the system will return to stability, always in a new fashion. Throughout the entire process, human actors are motivated to interact with the system, affect the pattern in the vector field, and have agency to be creative with a series of experimental different movements." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("video", { width: "100%", height: "auto", controls: true, children: [
      /* @__PURE__ */ jsx(
        "source",
        {
          src: "/mats/cybernetic_field/mouse_interaction.mp4",
          type: "video/mp4"
        }
      ),
      "Your browser does not support the video tag."
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CyberneticField
}, Symbol.toStringTag, { value: "Module" }));
function HyperHydration$2() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Water Sports: ",
      /* @__PURE__ */ jsx("i", { children: "Hyper Hydration" }),
      " (2023)"
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("i", { children: "Water Sports: Hyper Hydration" }),
      " is a foray into machine learning involving optimization algorithms. It places a tubular geometry, representing a water bottle at the center of the inquiry. Firstly, single objective optimization for the 3D profile that empties itself the fastest and then mulit-objective optimization by balancing emptying speed and surface area. This project was developed as part of the Computational Explorations seminar at ITECH master's program in collaboration with Chris Kang, Markus Renner, and Cornerlius Carl. The code and studies for this project can be found on ",
      /* @__PURE__ */ jsx(Link, { className: "underline hover:text-yellow-500", to: "https://github.com/sqamuell/hyper-hydration", rel: "noopener noreferrer", target: "_blank", children: "GitHub" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/water_sports/hh_cover.jpg", className: "lg:w-2/4" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The project's initial phase involved implementing various algorithms encompassing both single and multi-objective optimization techniques to efficiently optimize the shape of a water bottle. The project aimed to develop a water bottle model with fixed top and bottom sizes while allowing for a variable profile along the entire circumference. The primary objective was identifying optimal parameters for efficient water release, minimizing the time required for water to exit." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/water_sports/hh_aim.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The single-objective optimization focused on maximizing water expulsion speed from the bottle. The multi-objective optimization strategy introduced an additional factor - the size of the exit cap. The aim was to strike a balance between water release speed and minimizing the cap size, a challenge due to the conflicting nature of these two objectives." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The workflow utilized a Python library to generate NURBS surfaces exported as STL files. These were processed by a Blender script to combine static bodies representing the cap and water storage. An alternative Python library was later used to address seam issues. Post mesh generation, FluidX3d, a modified CFD simulation, used STL files as input. Adjustments were made to the simulation's source code using C++ for dynamic data exchange. A Python script managed the process, leveraging algorithms to trigger simulation runs." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/water_sports/hh_sim_setup.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The bottle's design utilized 5 circles with 6 control points each, totaling 30 parameters. Control points allowed flexible shape creation along a line between the central point and a radius of 1. Static bodies were consistently incorporated at both ends of the bottle, serving distinct purposes. The first housed water storage, while the final acted as the cap for controlled water release." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/water_sports/hh_sim1.gif" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/water_sports/hh_sim2.gif" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/water_sports/hh_sim3.gif" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/water_sports/hh_sim4.gif" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Initial observations from single-objective optimization were inconclusive regarding curvature patterns. Throughout experimentation, the rbfopt algorithm outperformed others in speed and robustness, demonstrating advantages in optimization efficiency. Optimized single-objective designs aimed to enhance drainage efficiency through vortex creation, achieving an 11% improvement compared to a simple cylinder. Further analysis was needed to understand these improvements." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Single-Objective Convergence & Robustness" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/water_sports/hh_single.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "In the context of multi-objective optimization, it was observed that both NSGA2 and NSGA3 yielded similar outputs. However, NSGA2 outperformed other algorithms in terms of convergence and objective achievement. Unfortunately, the extensive simulation time of approximately 12 hours per run posed a challenge in evaluating algorithm robustness." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Multi-Objective Convergence & Robustness" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/water_sports/hh_multi.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "In contrast to single-objective optimization results, the outcomes of multi-objective optimization displayed distinct differences in optimized objectives and overall bottle shape. Unlike single-objective optimization, which focused on specific improvements, multi-objective optimization considered multiple objectives simultaneously." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Clustering" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/water_sports/hh_clustering.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The optimization process explores a broader range of design possibilities and objectives, leading to a greater diversity in the optimized bottle shapes and objectives achieved. The multi-objective optimization aims to strike a balance between conflicting objectives, such as maximizing drainage efficiency while minimizing simulation steps or achieving an optimal shape while considering stability or other factors." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Results (in simulation steps)" }) }),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "12", src: "/mats/water_sports/hh_normal.gif" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "13", src: "/mats/water_sports/hh_rbf_opt.gif" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "14", src: "/mats/water_sports/hh_cmaes.gif" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "15", src: "/mats/water_sports/hh_random.gif" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: "Unoptimized: 17,396" }),
        /* @__PURE__ */ jsx("td", { children: "RBFOpt: 15,849" }),
        /* @__PURE__ */ jsx("td", { children: "CMAE-S: 15,863" }),
        /* @__PURE__ */ jsx("td", { children: "Random: 16,004" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The diverse objectives and inherent trade-offs in multi-objective optimization generated a broader spectrum of optimized bottle shapes and objectives. This diversity allowed for a comprehensive exploration of the design space, enabling decision-makers to select solutions aligned with their specific needs and priorities" })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HyperHydration$2
}, Symbol.toStringTag, { value: "Module" }));
function ModularGarden() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Modular Garden: An Expanding Pattern (2019)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The proposal of a hanging garden installation prompted this computationally-driven exploration. Iteration on a simple formal logic through digitally fabricated models led to an assembly of asymmetrical modules. This project was completed in CMU soa's Introduction to Computational Design seminar in collaboration with Jasmine Lee, Vivian Teng, and Adam He." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/aggregation/matrix.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Contrasting squares and circles begin to speak to one another through careful play of negative space and light. Introduction of a smaller module to deviate from the regularity of the standard grid allowed for the differentiated aggregation of modules and variation in all directions." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/aggregation/iterations.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The module design led to the discovery of a secondary circular element, as shown in the cut sheet below. The interior portion of the main module was adapted into another element to the tessellating design. There was a missed opportunity for the main modules to be rotated to produce an additional circular element, a mistake the team learned from. This process-driven conceptualization allowed the project to save on material waste, a common obstacle in CNC manufacturing." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/aggregation/cutsheet.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/aggregation/assembly.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/aggregation/fin2.jpg" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/aggregation/fin3.jpg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/aggregation/fin.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/aggregation/section_elevation.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/aggregation/render_below.jpg" })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ModularGarden
}, Symbol.toStringTag, { value: "Module" }));
function WaxFlamingos() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Wax Flamingos (2024)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/wax_flamingos/coming_soon.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Using a found-object with an off-balance supporting location, a method was devised to incrementally add wax with the aim of positioning the object’s Center Of Mass (COM) above a support location and bring the object into balance." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "COMING SOON" })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WaxFlamingos
}, Symbol.toStringTag, { value: "Module" }));
function HyperHydration$1() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Cloud Sketch (2022)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Aenean at suscipit massa. In at diam feugiat, feugiat elit eu, maximus enim. Nulla consequat eleifend iaculis. Mauris viverra tempus augue. Donec vitae suscipit orci. Phasellus vehicula ipsum vel nisl egestas ullamcorper. Maecenas ac leo eu eros elementum porta." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/cloud-sketch/clouds.gif" })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HyperHydration$1
}, Symbol.toStringTag, { value: "Module" }));
function FloodMuseum() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Flood Museum: Weathering Infrastructure (2019)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Six-mile island, an island on the Allegheny River, is extremely prone to flooding. Its ecosystem and topography elegantly reflect and rely on the river's natural cycles of flood and regrowth." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/six_mile_island/section_long.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The museum of weather project seeks to amplify visitors' understanding of the Allegheny's variable water level. Through the shaping of space of board-form concrete, the terracing of program, and the exposure of subsurface plants, the museum formally represents its objective." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/six_mile_island/render_above.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/six_mile_island/plan.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Visitors are invited drop below the island's ground level on entry, reflect on water's role in shaping the process, and observe the current's effect on debris floating through the water." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "4",
        src: "/mats/six_mile_island/render_amphitheater.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "As the structure ages, dirt and grime will collect on the cavernous walls and the museum will take a position on its aging material and structure." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/six_mile_island/section_short.jpg" })
  ] });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FloodMuseum
}, Symbol.toStringTag, { value: "Module" }));
function ELCCarrick() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "ELC: Carrick (2020)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The Carrick Environmental Learning Center (ELC) project, located in Phillips Park is a synthesis of spatial and architectural knowledge completed during the third year of undergraduate architecture school. The program strongly mimics that of the Existing Frick Environmental Center (FEC). A building, located in Pittsburgh's Frick Park, at a net-zero energy usage, and elegantly tuned to both the landscape and visitors. Much like the FEC, the Carrick ELC derives its form from the drastic slope that it resides within." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "1",
        src: "/mats/environmental_learning_center/section_elevation.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The front-facing elevation frames views of one of Pittsburgh's numerous creek valleys. Its vistas cause one to think beyond themselves, towards the larger systems of human and nature they find themselves within. The back-facing elevation of this building is minimal. Aside from a scaled entryway, the building meets the street at ground level, the roof of which becomes a wildflower garden, home to native plants, butterflies, and insects, something the adjacent High School could take advantage of." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "2",
        src: "/mats/environmental_learning_center/plans.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "In order to facilitate this change in elevation and create a central design theme for the building, a brick-clad retaining wall was conceptualized. The circulation of the building parallels this wall, emphasized by a small double height space and daylight pouring in through a long skylight. This combination of design decisions allows for intimate, meditative spatial boundaries between the exterior of the building and the learning spaces within." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "2",
          src: "/mats/environmental_learning_center/section_short.jpg"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "2",
          src: "/mats/environmental_learning_center/ortho.jpg"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "3",
        src: "/mats/environmental_learning_center/render_hall.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "4",
        src: "/mats/environmental_learning_center/render_classroom.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "",
        id: "5",
        src: "/mats/environmental_learning_center/render_lobby.jpg"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Phillips Park's dense summer tree canopies throw dappled light throughout the warmer months of the year and allow for a lessened heating load. In the winter, the canopy opens up, allowing for natural heating from the sun's radiation." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "6",
            src: "/mats/environmental_learning_center/sims/01.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "7",
            src: "/mats/environmental_learning_center/sims/03.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "8",
            src: "/mats/environmental_learning_center/sims/05.jpg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "9",
            src: "/mats/environmental_learning_center/sims/02.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "10",
            src: "/mats/environmental_learning_center/sims/04.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "11",
            src: "/mats/environmental_learning_center/sims/06.jpg"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This project was individual, but the site's survey and observation was completed in a team. This project's design process drew heavily from the FEC, a precedent I find remarkably inspiring. Conceptual sketches were my driving method of thinking during this process (some samples below), elevating my respect towards analog tools of design. This project was completed during remote schooling." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "12",
            src: "/mats/environmental_learning_center/sketches/sketch01.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "13",
            src: "/mats/environmental_learning_center/sketches/sketch02.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "14",
            src: "/mats/environmental_learning_center/sketches/sketch04.jpg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "15",
            src: "/mats/environmental_learning_center/sketches/sketch03.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "16",
            src: "/mats/environmental_learning_center/sketches/sketch05.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "17",
            src: "/mats/environmental_learning_center/sketches/sketch06.jpg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "18",
            src: "/mats/environmental_learning_center/sketches/sketch07.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "19",
            src: "/mats/environmental_learning_center/sketches/sketch08.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "20",
            src: "/mats/environmental_learning_center/sketches/sketch09.jpg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "21",
            src: "/mats/environmental_learning_center/sketches/sketch10.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "22",
            src: "/mats/environmental_learning_center/sketches/sketch11.jpg"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "",
            id: "5",
            src: "/mats/environmental_learning_center/sketches/sketch01.jpg"
          }
        ) })
      ] })
    ] }) })
  ] });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ELCCarrick
}, Symbol.toStringTag, { value: "Module" }));
function Placeholder() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "15-112: placeHolder (2020)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "A wide variety of 3D scanning technology exists today that use a series of images to construct a form based on the content of the images. This project situates itself on an edge of those, allowing the user to generate a 3D model from 360-degree images through online databases. Much other software including Autodesk Recap, Multi-view environment, and Meshroom all serve to generate geometry from image distances. In fact, human’s perception of space uses the same underlying logic as all these programs. The slight differences in images sent to our brain from our eyes tells us what is near and what is far." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("video", { width: "100%", height: "auto", controls: true, children: [
      /* @__PURE__ */ jsx("source", { src: "/mats/place_holder/tutorial.mp4", type: "video/mp4" }),
      "Your browser does not support the video tag."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The project, titled placeMaker, was an exploration of photogrammetric techniques written from-scratch with Python. It is an inquiry into quick generation of site geometry (buildings, roads, etc.) for use in site mapping and architectural design. First, the user selects two 360-degree panoramic images either from google maps or elsewhere. Then, placeMaker interprets the selected images and detects edges. Finally, the program cross-references the images to place them in 3D space and allows the user to fly through and examine the projected geometry." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/place_holder/workflow.jpg" })
  ] });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Placeholder
}, Symbol.toStringTag, { value: "Module" }));
function BubbleGAN() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "BubblesToFloors (2021)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The Bubble2Floor is an implementation of the Pix2Pix GAN-model, and is a tool for spatial prototyping of built spaces. This project was completed in collaboration with Twisha Raja. It works in three main steps-" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/bubbles_floors/workflow.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The objective of the bubble2floor Generator the design of housing units. The workflow is includes the use of a few different softwares that are popularly employed in design circles." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/bubbles_floors/animation.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Bubble-diagrams generated from the Rhino-Grasshopper workspace are pushed through a pytorch model trained on bubble-diagram and floor plan pairs.This model is utilized to generate a series of floor plan representations of the bubble-diagram, which then creates approximated room geometries using openCV on these images." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/bubbles_floors/data.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The generated floor plan image is then passed through openCV to define the locations of walls. Finally, the walls are extruded with Rhino & Grasshopper, then tweaked to the designers’ liking." })
  ] });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BubbleGAN
}, Symbol.toStringTag, { value: "Module" }));
function WaterQWOP() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Water Sports: ",
      /* @__PURE__ */ jsx("i", { children: "Water QWOP" }),
      " (2023)"
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("i", { children: "Water Sports: Water QWOP" }),
      " is a foray into machine learning involving reinforcement learning. Conceptually, it is quite similar to the flash game ",
      /* @__PURE__ */ jsx("i", { children: "QWOP" }),
      ". This project was developed as part of the Computational Explorations seminar at ITECH master´s program in collaboration with Chris Kang, Markus Renner, and Cornerlius Carl."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/water_sports/qwop_agent_begin.gif", className: "md:w-2/4" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Drawing inspiration from the extensively studied game QWOP, the team aimed to develop their own version of the game. In this iteration, the primary objective was to optimize the distance water could be thrown, striving for maximum range." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "16", src: "/mats/water_sports/qwop_concept.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "To establish a reward system, water droplets were programmed to propel themselves before freezing upon floor contact. Measurements were taken from the bucket's position to the landing spot, determining a reward based on average distance per throw. This reward calculation evaluated the agent's performance in maximizing throwing distance." }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "17", src: "/mats/water_sports/qwop_measurement.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The Unity-based agent featured elongated arms with hinge joints, connected at the base, and equipped with a bucket. Water spheres within the bucket simulated throwing." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "18", src: "/mats/water_sports/qwop_agent.png" }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          id: "19",
          src: "/mats/water_sports/qwop_agent_begin.gif"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The agent's arms are composed of four distinct sections, each equipped with five hinge joints. Among these joints, four are driven by motors that respond to specific key presses, enabling controlled articulation of the arms. The bucket, on the other hand, accommodates ten individual spheres that represent the water. These spheres possess the ability to move freely and are propelled in accordance with the velocity and movement of the bucket, simulating the throwing action." }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "20", src: "/mats/water_sports/qwop_controls.png" }),
    /* @__PURE__ */ jsx("p", { children: "The actuation of the right shoulder is assigned to the key Q, the right elbow to the key W, the left elbow to the key O, the right elbow to the key P, and the forward and backward rotation of the bucket at the wrists is controlled by the keys A and S, respectively." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "21", src: "/mats/water_sports/qwop_agent_array.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "With the environment now configured, a prefab was generated to streamline the setup process. This prefab served as a template for creating multiple agents that could undergo simultaneous training. By employing this approach, the training process could be efficiently conducted across numerous instances of the agent, allowing for parallel training and enhanced optimization." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Run 1: Reward & Episode Length" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "22", src: "/mats/water_sports/qwop_run1.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "In the initial run, rewards were exclusively based on the speed of the bucket, neglecting other factors. Agents were limited to observing the position, rotation, and velocity of the bucket. Their actions were determined by discrete key presses, with a total of six available controls. The corresponding configuration file (.yaml) can be found in the config folder of the Unity setup. Notably, the agent demonstrated visible improvement within this setup, indicating progress in achieving optimal performance." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "23", src: "/mats/water_sports/qwop_agent_shakey.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: `Upon conducting a more thorough analysis, it became apparent that due to a bug affecting the rewards attributed to the water being tossed and the subsequent average calculation, the agent's behavior became excessively reliant on the speed of the bucket. This unintended outcome manifested as the observed "shaky-shakey" behavior. Consequently, it was necessary to fine-tune both the observation inputs and reward system in order to correct this issue and achieve the desired behavior from the agent.` }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Runs 2-4: Reward & Episode Length" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "24", src: "/mats/water_sports/qwop_run2-4.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Subsequent training runs (2-4) primarily focused on refining the code, identifying and rectifying bugs to enhance the agent's behavior. Unfortunately, these iterations did not yield significant progress in terms of training outcomes beyond bug fixing. The primary objective during this phase was to troubleshoot and resolve issues that were impeding the optimization of the agent's performance." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "25", src: "/mats/water_sports/qwop_rewards.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "After persistent efforts, the bug that hindered the agent from receiving rewards was successfully resolved. Additionally, the maximum length of steps before resetting the episode was extended to 10,000, granting the agent more opportunities for exploration and learning. Notably, a significant improvement was made by allowing the agent to access the position information of all geometric elements within the scene. This expanded observation capability provided the agent with a more comprehensive understanding of its environment, which would likely contribute to enhanced performance and more sophisticated decision-making." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "26", src: "/mats/water_sports/qwop_agent_begin.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Under the revised constraints and expanded capabilities, the agent underwent an extensive training process, encompassing approximately 18 million steps. Throughout this training period, the agent demonstrated a gradual improvement in its ability to throw water over a distance. It is worth noting that while the agent's performance falls short of that of a skilled human, with an average of 2.5 meter throws, the observed trend reveals promising signs of continual progress and learning over time. This incremental improvement suggests that with further iterations and refinement, the agent's performance has the potential to approach or even surpass human proficiency in the task." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Run 5: Reward & Episode Length" }) }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "27", src: "/mats/water_sports/qwop_run5.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The observed behavior of the agent, as described above, indicates a tendency to swing the bucket back and forth before dumping the geometry out. It is hypothesized that additional training runs and further fine-tuning of parameters are necessary to achieve the desired outcome and refine the model's behavior. This iterative process of experimentation, adjustment, and evaluation is often required to optimize the training of machine learning models and align their actions more closely with the intended objectives. By conducting additional runs and carefully tweaking the parameters, it is expected that the agent's performance can be further improved and the undesired swinging behavior can be mitigated." })
  ] });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WaterQWOP
}, Symbol.toStringTag, { value: "Module" }));
function Bathhouse() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Saco Lake Bathhouse (2019)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This bathhouse is an exploration of experiential sequences a visitor takes throughout a structure's parti. Its structure is a reflection on the verticality of the New Hampshire forest where it resides. The entryway, changing rooms, and three baths (quite unrealistically) nestle inside the forest of pillars, floating above the forest floor and causing the internal relationships of the structure to become truly three-dimensional." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/bathhouse/hi_plan.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/bathhouse/mi_plan.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/bathhouse/lo_plan.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The structure's partitioning of interior and exterior spaces and bath's encourages the pairing of hot and cold during the extreme seasons. A visit in the summer grants the patron an ice-cold refresh from the heat and humidity of the outside. In the winter, the bathhouse's hot pool gives a respite from the chill and the snow. During temperate months, the bathhouse offers a more mellowed experience. Though the seasons affect the sequential experience of the baths the structure frames the surrounding forest year-round." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/bathhouse/sec1.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/bathhouse/sec2.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The final structure of the bathhouse was born from a series of exploratory models that, early on, took an affinity towards vertical columns and the grid. The interplay of light and shadow within these models revealed the opportunity to attune to the seasons and greatly influenced the placement and orientation of programmatic elements. Adding the third dimension to the grid and relating the final design to the slope allowed for an array of framed views out into the forest and valley beyond." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/bathhouse/models/01.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/bathhouse/models/02.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/bathhouse/models/03.jpg" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/bathhouse/models/04.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/bathhouse/models/05.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/bathhouse/models/06.jpg" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "12", src: "/mats/bathhouse/models/07.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "13", src: "/mats/bathhouse/models/08.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "14", src: "/mats/bathhouse/models/09.jpg" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "15", src: "/mats/bathhouse/models/10.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "16", src: "/mats/bathhouse/models/11.jpg" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "17", src: "/mats/bathhouse/models/12.jpg" }) })
      ] })
    ] }) })
  ] });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bathhouse
}, Symbol.toStringTag, { value: "Module" }));
function Honeycomb() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Honeycomb: a Grasshopper Plugin (2023)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "Honeycomb Logo",
        className: "h-20 m-4 max-h-full float-left",
        id: "1",
        src: "/mats/honeycomb/Honeycomb.png"
      }
    ),
    /* @__PURE__ */ jsx("p", { children: "Honeycomb, a pattern generating grasshopper plugin, enables the creation of 2D and 3D patterns through symmetric transformations, each derived from the 17 wallpaper groups. Users can choose any of the wallpaper groups to create tilings based on Voronoi Domains and custom topological interlocking blocks. This project was completed in collaboration with Tom Görtzen and Reymond Akpanya from the RWTH Aachen University and Sebastian Wiesenhütter from the Technische Universität Dresden." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Any feedback would be greatly appreciated and please share anything interesting that you create! Download the plugin from the ",
      /* @__PURE__ */ jsx(Link, { className: "underline hover:text-yellow-500", to: "https://www.food4rhino.com/en/app/honeycomb", rel: "noopener noreferrer", target: "_blank", children: "Food4Rhino Forum" }),
      " and try it out. The code for this project is on ",
      /* @__PURE__ */ jsx(Link, { className: "underline hover:text-yellow-500", to: "https://github.com/TomGoertzen/Honeycomb/", rel: "noopener noreferrer", target: "_blank", children: "GitHub" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 1", id: "2", src: "/mats/honeycomb/lines01.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 2", id: "3", src: "/mats/honeycomb/lines02.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 3", id: "4", src: "/mats/honeycomb/lines03.png" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 4", id: "5", src: "/mats/honeycomb/lines04.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 5", id: "6", src: "/mats/honeycomb/lines05.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "Pattern 6", id: "7", src: "/mats/honeycomb/lines06.png" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("table", { className: "hidden", children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "2", src: "/mats/honeycomb/lines01.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "5", src: "/mats/honeycomb/lines04.png" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "3", src: "/mats/honeycomb/lines02.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "6", src: "/mats/honeycomb/lines05.png" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "4", src: "/mats/honeycomb/lines03.png" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "7", src: "/mats/honeycomb/lines05.png" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The plugin consists of ten components, which work together to generate, manipulate and array the smallest unit of a repeating symmetrical pattern, named fundamental domains. Simply by changing a few parameters in the below script, all six tilings shown above can be created." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "Associated Pattern Script",
        id: "8",
        src: "/mats/honeycomb/line_script.png"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Each symmetry group has an infinite amount of fundamental domains, so the number of patterns that can be quickly created is quite large. Historically, Dutch Graphic Artist M. C. Escher employed the use of the",
      " ",
      /* @__PURE__ */ jsx("i", { children: "pg" }),
      "wallpaper group. Honeycomb enables users to make generate similar imagery."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("video", { controls: true, children: [
      /* @__PURE__ */ jsx(
        "source",
        {
          src: "/mats/honeycomb/interlocking_vid_desktop.mp4",
          type: "video/mp4"
        }
      ),
      "Your browser does not support the video tag."
    ] }),
    /* @__PURE__ */ jsxs("video", { className: "hidden", controls: true, children: [
      /* @__PURE__ */ jsx(
        "source",
        {
          src: "/mats/honeycomb/interlocking_vid_mobile.mp4",
          type: "video/mp4"
        }
      ),
      "Your browser does not support the video tag."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The below script is responsible for the creation of the abovce animation. It did require some post-processing in blender, but the entire generation of interlocking blocks and their movement was enabled by Honeycomb." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "placeholder", id: "9", src: "/mats/honeycomb/block_script.png" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "Users also have the option to draw their own geometry and repeat it via the logic of the wallpaper group. Whether it is an iterlocking geometry (created via one of the ",
      /* @__PURE__ */ jsx("i", { children: "Make Interlocking Block" }),
      " components) or a geometry created within Rhino-space, the grasshopper tool quickly allows for a repeating transformation."
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Interlocking 3D Print Front",
          id: "10",
          src: "/mats/honeycomb/print_front.png"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Interlocking 3D Print Back",
          id: "11",
          src: "/mats/honeycomb/print_back.png"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The software has potentials to move into the physical space and become 3D. 3D printed geometry is quick to output with a few addtional rhino or grasshopper commands to make a printable solid. If you, the reader, uses Honeycomb and creates something interesting and beautiful, please share it!" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Voronoi",
          id: "12",
          src: "/mats/honeycomb/voronoi_big.gif"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Voronoi",
          id: "12",
          src: "/mats/honeycomb/voronoi_big.gif"
        }
      ) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "Voronoi",
          id: "12",
          src: "/mats/honeycomb/voronoi_big.gif"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This project was funded by the Deutsche Forschungsgemeinschaft (DFG, German Research Foundation)-SFB/TRR 280. Projekt-ID: 417002380. Tom Goertzen was partially supported by the FY2022 JSPS Postdoctoral Fellowship for Research in Japan (Short-term), ID PE22747." }),
    /* @__PURE__ */ jsx("br", {})
  ] });
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Honeycomb
}, Symbol.toStringTag, { value: "Module" }));
function Hoophouse() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Hoop House (2018)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Hoop House is a design/fabrication project in partnership with Phipps Conservatory. A hoop house is a structure created with the intent to maintain warmth in a space throughout cold winter months. It emulates a small-scale greenhouse and is often made of a tightly stretched plastic paired with a rigid structural material, but should still be light enough to move. Designed by a team of five: Joanne Chui, Yingying Yan, Ammar Hassonjee, Taisei Manheim, and Samuel Losi, this hoop house plays on the dueling aesthetics of amoeba-esque rope joints and an ordered Y-shaped structure." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "8", src: "/mats/hoop_house/photo_joint.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "A few notable things came from researching precedents of hoop houses. Firstly, the method of inner access was always the dealbreaker for functioning as a warmth-containing enclosure. The final design’s zipper opening is rationalized by its ease of access, and air-tightness. And secondly, each hoop house we found used the aluminum-conduit skeleton as “drive-curves,” where the plastic, once pulled taught around the structure, was defined by sweeping curves." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "2", src: "/mats/hoop_house/joints01.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "3", src: "/mats/hoop_house/joints02.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "4", src: "/mats/hoop_house/joints03.jpg" }),
    /* @__PURE__ */ jsx("img", { alt: "", id: "5", src: "/mats/hoop_house/joints04.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "This take on the hoop-house design uses a series of “drive-points” to determine the shape of the plastic. We concocted a joint that consists of two washers adhered together and held it by tensioned rope to the skeleton. The surrounding Y-structure provides an extra layer of structure for Pittsburgh’s heavy snowfall." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "6", src: "/mats/hoop_house/photo_between.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Fabrication went smoothly. In the making process, our team divided up the work and all contributed their all. Diligent planning paid off as we budgeted, bought, and assembled the hoop house with ease. We then celebrated as we transported the hoop house to the conservatory and fixed it to the ground with aluminum-conduit stakes attached to the overall structure." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "7", src: "/mats/hoop_house/assembly.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { alt: "", id: "1", src: "/mats/hoop_house/photo_elevation.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "The process of designing this hoop house was rocky. Our team disagreed a fair amount on the design aesthetic, but worked through it in numerous quarter-inch scale models. Though the contrasting aesthetics of this project stayed with this project from start to end, we can confidently say we had a working design; plants were healthy throughout the winter." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "9", src: "/mats/hoop_house/models/01.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "10", src: "/mats/hoop_house/models/02.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "11", src: "/mats/hoop_house/models/03.JPG" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "12", src: "/mats/hoop_house/models/04.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "13", src: "/mats/hoop_house/models/05.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "14", src: "/mats/hoop_house/models/06.JPG" }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "15", src: "/mats/hoop_house/models/07.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "16", src: "/mats/hoop_house/models/08.JPG" }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("img", { alt: "", id: "17", src: "/mats/hoop_house/models/09.JPG" }) })
      ] })
    ] }) })
  ] });
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hoophouse
}, Symbol.toStringTag, { value: "Module" }));
function Misc() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Drawings (2017)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "These are some nice drawings that I did during my first year drawing class in architecture school. Please enjoy." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/misc/drawing2.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/misc/drawing0.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/misc/drawing1.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/misc/drawing3.jpg" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/misc/drawing4.jpg" })
  ] });
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Misc
}, Symbol.toStringTag, { value: "Module" }));
function HyperHydration() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Droplets (2024)" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Donec sed tincidunt dolor. Praesent laoreet mattis vehicula. Quisque suscipit diam in nisi laoreet fermentum. Curabitur sollicitudin eleifend lorem vel consectetur. Quisque porta nec tellus et elementum. Cras eget turpis eget leo ornare congue et et nibh. Sed non eros a odio facilisis facilisis. Curabitur sollicitudin at ipsum et pretium. Curabitur vestibulum mi justo, eu iaculis arcu cursus non. Phasellus pellentesque euismod ligula nec suscipit. Aliquam scelerisque nec lectus sed placerat." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/droplets/figure-ground.gif" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Aenean at suscipit massa. In at diam feugiat, feugiat elit eu, maximus enim. Nulla consequat eleifend iaculis. Mauris viverra tempus augue. Donec vitae suscipit orci. Phasellus vehicula ipsum vel nisl egestas ullamcorper. Maecenas ac leo eu eros elementum porta." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("img", { className: "m-auto md:w-7/12", src: "/mats/droplets/marble.gif" })
  ] });
}
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HyperHydration
}, Symbol.toStringTag, { value: "Module" }));
function Container() {
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.key == "Escape")
      navigate("/");
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "absolute h-screen w-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute h-screen w-screen bg-white bg-opacity-50 backdrop-grayscale cursor-alias", onClick: () => navigate("/") }),
    /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 rounded-md mt-0 lg:mt-[2.5vh] \n                            h-screen lg:h-[95vh] border-2 border-neutral-250 bg-white \n                            w-screen 3xl:w-[1400px] 2xl:w-[1200px] xl:w-[1000px] lg:w-[800px] md:w-[600px] cursor-default", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-y-scroll h-full p-10 md:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx("p", { className: "fixed right-3 top-3 md:-right-8 md:top-2 hover:text-yellow-500 cursor-pointer font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "✕" }) })
    ] })
  ] });
}
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Container
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Samuel Losi: a Website Portfolio" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx("div", {});
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-PtWL7kzs.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DoMptL-T.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes/projects.collaborative-winding": { "id": "routes/projects.collaborative-winding", "parentId": "routes/projects", "path": "collaborative-winding", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.collaborative-winding-CDz1Ar3I.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.sprawl-and-resilience": { "id": "routes/projects.sprawl-and-resilience", "parentId": "routes/projects", "path": "sprawl-and-resilience", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.sprawl-and-resilience-BF7n52pP.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.spring-garden-hostel": { "id": "routes/projects.spring-garden-hostel", "parentId": "routes/projects", "path": "spring-garden-hostel", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.spring-garden-hostel-CnKmWgD2.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.design-fabrication": { "id": "routes/projects.design-fabrication", "parentId": "routes/projects", "path": "design-fabrication", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.design-fabrication-CtyZZ11g.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.horse-and-chariot": { "id": "routes/projects.horse-and-chariot", "parentId": "routes/projects", "path": "horse-and-chariot", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.horse-and-chariot-CJIWECXx.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes/projects.cybernetic-field": { "id": "routes/projects.cybernetic-field", "parentId": "routes/projects", "path": "cybernetic-field", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.cybernetic-field-CowNYCBo.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.hyper-hydration": { "id": "routes/projects.hyper-hydration", "parentId": "routes/projects", "path": "hyper-hydration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.hyper-hydration-Cb0gyWiF.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes/projects.modular-garden": { "id": "routes/projects.modular-garden", "parentId": "routes/projects", "path": "modular-garden", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.modular-garden-QgkWHi9y.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.wax-flamingos": { "id": "routes/projects.wax-flamingos", "parentId": "routes/projects", "path": "wax-flamingos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.wax-flamingos-B_RhDs8M.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.cloud-sketch": { "id": "routes/projects.cloud-sketch", "parentId": "routes/projects", "path": "cloud-sketch", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.cloud-sketch-B2jbmWDK.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.flood-museum": { "id": "routes/projects.flood-museum", "parentId": "routes/projects", "path": "flood-museum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.flood-museum-DWfQNAoK.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.elc-carrick": { "id": "routes/projects.elc-carrick", "parentId": "routes/projects", "path": "elc-carrick", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.elc-carrick-CtrbhzZC.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.placeholder": { "id": "routes/projects.placeholder", "parentId": "routes/projects", "path": "placeholder", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.placeholder-9pLeG0_i.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.bubble-gan": { "id": "routes/projects.bubble-gan", "parentId": "routes/projects", "path": "bubble-gan", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.bubble-gan-DuYNToKq.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.water-qwop": { "id": "routes/projects.water-qwop", "parentId": "routes/projects", "path": "water-qwop", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.water-qwop-DuB-U_FY.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.bathhouse": { "id": "routes/projects.bathhouse", "parentId": "routes/projects", "path": "bathhouse", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.bathhouse-DvrRVe2-.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.honeycomb": { "id": "routes/projects.honeycomb", "parentId": "routes/projects", "path": "honeycomb", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.honeycomb-CBFmTj5Q.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes/projects.hoophouse": { "id": "routes/projects.hoophouse", "parentId": "routes/projects", "path": "hoophouse", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.hoophouse-CIbPlylj.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.drawings": { "id": "routes/projects.drawings", "parentId": "routes/projects", "path": "drawings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.drawings-Dl6z0fqY.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects.droplets": { "id": "routes/projects.droplets", "parentId": "routes/projects", "path": "droplets", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects.droplets-BcRSCfr4.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/projects-D_Ap76fr.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components--iMuTRih.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BYSTAgK1.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] } }, "url": "/assets/manifest-7d2077b8.js", "version": "7d2077b8" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/projects.collaborative-winding": {
    id: "routes/projects.collaborative-winding",
    parentId: "routes/projects",
    path: "collaborative-winding",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/projects.sprawl-and-resilience": {
    id: "routes/projects.sprawl-and-resilience",
    parentId: "routes/projects",
    path: "sprawl-and-resilience",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/projects.spring-garden-hostel": {
    id: "routes/projects.spring-garden-hostel",
    parentId: "routes/projects",
    path: "spring-garden-hostel",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/projects.design-fabrication": {
    id: "routes/projects.design-fabrication",
    parentId: "routes/projects",
    path: "design-fabrication",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/projects.horse-and-chariot": {
    id: "routes/projects.horse-and-chariot",
    parentId: "routes/projects",
    path: "horse-and-chariot",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/projects.cybernetic-field": {
    id: "routes/projects.cybernetic-field",
    parentId: "routes/projects",
    path: "cybernetic-field",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/projects.hyper-hydration": {
    id: "routes/projects.hyper-hydration",
    parentId: "routes/projects",
    path: "hyper-hydration",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/projects.modular-garden": {
    id: "routes/projects.modular-garden",
    parentId: "routes/projects",
    path: "modular-garden",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/projects.wax-flamingos": {
    id: "routes/projects.wax-flamingos",
    parentId: "routes/projects",
    path: "wax-flamingos",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/projects.cloud-sketch": {
    id: "routes/projects.cloud-sketch",
    parentId: "routes/projects",
    path: "cloud-sketch",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/projects.flood-museum": {
    id: "routes/projects.flood-museum",
    parentId: "routes/projects",
    path: "flood-museum",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/projects.elc-carrick": {
    id: "routes/projects.elc-carrick",
    parentId: "routes/projects",
    path: "elc-carrick",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/projects.placeholder": {
    id: "routes/projects.placeholder",
    parentId: "routes/projects",
    path: "placeholder",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/projects.bubble-gan": {
    id: "routes/projects.bubble-gan",
    parentId: "routes/projects",
    path: "bubble-gan",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/projects.water-qwop": {
    id: "routes/projects.water-qwop",
    parentId: "routes/projects",
    path: "water-qwop",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/projects.bathhouse": {
    id: "routes/projects.bathhouse",
    parentId: "routes/projects",
    path: "bathhouse",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/projects.honeycomb": {
    id: "routes/projects.honeycomb",
    parentId: "routes/projects",
    path: "honeycomb",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/projects.hoophouse": {
    id: "routes/projects.hoophouse",
    parentId: "routes/projects",
    path: "hoophouse",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/projects.drawings": {
    id: "routes/projects.drawings",
    parentId: "routes/projects",
    path: "drawings",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/projects.droplets": {
    id: "routes/projects.droplets",
    parentId: "routes/projects",
    path: "droplets",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route22
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
