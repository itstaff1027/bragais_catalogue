import{W as N,r as m,j as e}from"./app-DlddDHRF.js";import"./Dropdown-AU8bS9M5.js";import"./AuthenticatedLayout-DNKB0hr8.js";import{T as S}from"./ToolsLayout-BxhfKqXV.js";import{T as x}from"./TextInput-CC6StvOB.js";import{I as d}from"./InputLabel-D8VFXl60.js";import{I as p}from"./InputError-DuX3jXKU.js";import"./transition-Dqu5RDwA.js";import"./ApplicationLogo-CHOwe7hl.js";function L({params:C}){const{data:s,setData:l,post:n,processing:i,errors:u,reset:c}=N({id:0,categories_name:"",categories_gender:"male"});m.useState(!1);const[g,h]=m.useState([]),[a,r]=m.useState(""),f=t=>{l("id",t.target.value),r(t.target.value)},j=t=>{t.preventDefault(),n(route("categories_name.create"),{onSuccess:()=>{c("categories_name"),o(),r("")}})},b=t=>{t.preventDefault(),n(route("categories_name.update",{id:s.id}),{onSuccess:()=>{c(),o(),r("")}})},_=t=>{t.preventDefault(),n(route("categories_gender.update",{id:s.id}),{onSuccess:()=>{c(),o(),r("")}})},v=t=>{t.preventDefault(),n(route("categories_name.destroy",{id:s.id}),{onSuccess:()=>{c("id"),o(),r("")}})},o=async()=>{try{const w=await(await fetch(route("product.categories"),{headers:{"Content-Type":"application/json"}})).json();h(w)}catch(t){console.log("Something went Wrong",t)}};return m.useEffect(()=>{o()},[]),e.jsx(S,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Create Categories"}),children:e.jsxs("div",{className:"flex-col sm:flex-row sm:flex justify-center w-full p-4",children:[e.jsxs("form",{onSubmit:j,className:"w-full p-4 border",children:[e.jsx(d,{htmlFor:"categories_name",value:"Categories Name"}),e.jsx(x,{id:"categories_name",type:"text",name:"categories_name",value:s.categories_name,className:"mt-1 block w-full",isFocused:!0,onChange:t=>l("categories_name",t.target.value)}),e.jsx(p,{message:u.categories_name,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-center w-full p-4",children:e.jsx("button",{className:"p-2 text-white bg-emerald-500 rounded-2xl",type:"submit",disabled:i,children:"Submit"})})]}),e.jsxs("div",{className:"flex flex-col border h-auto w-full p-4",children:[e.jsx("h1",{children:"Lists"}),e.jsxs("select",{onChange:f,value:a,children:[e.jsx("option",{value:"",disabled:!0,children:"Select a categories"}),g==null?void 0:g.map(t=>e.jsx("option",{value:t.id,children:t.categories},t.id))]}),a&&e.jsxs(e.Fragment,{children:[e.jsxs("form",{onSubmit:b,className:"mt-1 block w-full",children:[e.jsx(d,{htmlFor:"categories_name",value:"Update Categories Name here..."}),e.jsx(x,{id:"update_categories_name",type:"text",name:"update_categories_name",value:s.categories_name,className:"mt-1 block w-full",isFocused:!0,onChange:t=>l("categories_name",t.target.value)}),e.jsx(p,{message:u.categories_name,className:"mt-2"}),e.jsx("button",{className:"mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full",type:"submit",disabled:i||!a,children:"Update"})]}),e.jsxs("form",{onSubmit:_,className:"mt-1 block w-full",children:[e.jsx(d,{htmlFor:"categories_gender",value:"Update Gender Category..."}),e.jsxs("select",{onChange:t=>l("categories_gender",t.target.value),children:[e.jsx("option",{disabled:!0,children:"Select Gender"}),e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"}),e.jsx("option",{value:"none",children:"None"})]}),e.jsx(p,{message:u.categories_gender,className:"mt-2"}),e.jsx("button",{className:"mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full",type:"submit",disabled:i||!a,children:"Update"})]}),e.jsxs("form",{onSubmit:v,className:"mt-1 block w-full",children:[e.jsx(d,{className:"mt-2",htmlFor:"categories_name",value:"Choose categories to Delete in Dropdowns..."}),e.jsx("button",{className:"w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl",type:"submit",disabled:i||!a,children:"Delete"})]})]})]})]})})}export{L as default};
