import{q as i,r as d,j as e,Y as o}from"./app-DlddDHRF.js";import"./Dropdown-AU8bS9M5.js";import{A as c,R as x}from"./AuthenticatedLayout-DNKB0hr8.js";function h({header:r,children:a}){i().props.auth.user,d.useState(!1);const s=[{id:"0",name:"Products",route:"products"},{id:"1",name:"Create Product",route:"create-product"}];return e.jsxs(c,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Products"}),children:[e.jsx(o,{title:"Products"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx("div",{className:"flex w-1/2 p-4 justify-between",children:s==null?void 0:s.map((t,l)=>e.jsx("div",{children:e.jsx(x,{subNavLinks:!0,href:route(`${t.route}`),active:route().current(`${t.route}`),children:t.name})}))}),r&&e.jsx("header",{className:"bg-white shadow",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",children:r})}),e.jsx("main",{children:a})]})})})})]})}export{h as P};
