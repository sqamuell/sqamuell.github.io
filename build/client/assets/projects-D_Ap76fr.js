import{r as a,j as e}from"./jsx-runtime-BlSqMCxk.js";import{k as n,O as o,L as l}from"./components--iMuTRih.js";function d(){const s=n(),r=t=>{t.key=="Escape"&&s("/")};return a.useEffect(()=>(window.addEventListener("keydown",r),()=>{window.removeEventListener("keydown",r)}),[]),e.jsxs("div",{className:"absolute h-screen w-screen",children:[e.jsx("div",{className:"absolute h-screen w-screen bg-white bg-opacity-50 backdrop-grayscale cursor-alias",onClick:()=>s("/")}),e.jsxs("div",{className:`absolute left-1/2 -translate-x-1/2 rounded-md mt-0 lg:mt-[2.5vh] 
                            h-screen lg:h-[95vh] border-2 border-neutral-250 bg-white 
                            w-screen 3xl:w-[1400px] 2xl:w-[1200px] xl:w-[1000px] lg:w-[800px] md:w-[600px] cursor-default`,children:[e.jsx("div",{className:"bg-white overflow-y-scroll h-full p-10 md:p-8",children:e.jsx(o,{})}),e.jsx("p",{className:"fixed right-3 top-3 md:-right-8 md:top-2 hover:text-yellow-500 cursor-pointer font-bold",children:e.jsx(l,{to:"/",children:"✕"})})]})]})}export{d as default};