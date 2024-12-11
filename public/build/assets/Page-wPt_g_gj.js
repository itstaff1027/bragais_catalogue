import{W as I,r as c,j as e}from"./app-Bcg6lVfv.js";import"./AuthenticatedLayout-BqB5sKmN.js";import{T}from"./ToolsLayout-CSkxdARl.js";import{T as h,I as z}from"./TextInput-CjSDKzKn.js";import{I as t}from"./InputLabel-b208XWk4.js";import"./ApplicationLogo-CfB3j6k0.js";import"./transition-CLjT16kT.js";function q({params:U}){const{data:a,setData:u,post:n,processing:o,errors:d,reset:r}=I({size_name_id:0,size_name:"",size_value_id:0,size_values:""});c.useState(!1);const[f,_]=c.useState([]),[v,j]=c.useState([]),[l,i]=c.useState(""),[b,S]=c.useState(""),g=s=>{u("size_name_id",s.target.value),i(s.target.value),x(s.target.value)},w=s=>{s.preventDefault(),n(route("size_name.create"),{onSuccess:()=>{r("size_name"),m(),i("")}})},N=s=>{s.preventDefault(),n(route("size_name.update",{id:a.size_name_id}),{onSuccess:()=>{r("size_name_id"),m(),i("")}})},y=s=>{s.preventDefault(),n(route("size_name.destroy",{id:a.size_name_id}),{onSuccess:()=>{r("size_name_id"),m(),i("")}})},m=async()=>{try{const p=await(await fetch(route("product.sizes"),{headers:{"Content-Type":"application/json"}})).json();_(p)}catch(s){console.log("Something went Wrong",s)}},D=s=>{u("size_value_id",s.target.value),S(s.target.value)},x=async s=>{try{const k=await(await fetch(`/auth/api/get-size-values/${s}`,{headers:{"Content-Type":"application/json"}})).json();j(k)}catch(p){console.log("Something went Wrong",p)}},F=s=>{s.preventDefault(),n(route("size_values.create"),{onSuccess:()=>{r("size_values"),x(),i("")}})},C=s=>{s.preventDefault(),n(route("size_values.update",{id:a.size_value_id}),{onSuccess:()=>{r("size_values_id"),x(),i("")}})},V=s=>{s.preventDefault(),n(route("size_values.destroy",{id:a.size_value_id}),{onSuccess:()=>{r("size_values_id"),x(),i("")}})};return c.useEffect(()=>{m()},[]),e.jsx(T,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Create Sizes"}),children:e.jsxs("div",{className:"flex flex-col justify-center w-full p-4",children:[e.jsxs("div",{className:"w-full flex flex-row",children:[e.jsxs("form",{onSubmit:w,className:"w-full p-4 border",children:[e.jsx(t,{htmlFor:"size_name",value:"Size Name"}),e.jsx(h,{id:"size_name",type:"text",name:"size_name",value:a.size_name,className:"mt-1 block w-full",isFocused:!0,onChange:s=>u("size_name",s.target.value)}),e.jsx(z,{message:d.size_name,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-center w-full p-4",children:e.jsx("button",{className:"p-2 text-white bg-emerald-500 rounded-2xl",type:"submit",disabled:o,children:"Submit"})})]}),e.jsxs("div",{className:"flex flex-col border h-auto w-full p-4",children:[e.jsx("h1",{children:"Size Name Lists"}),e.jsxs("select",{onChange:g,value:l,children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Size"}),f==null?void 0:f.map(s=>e.jsx("option",{value:s.id,children:s.sizes},s.id))]}),e.jsx(t,{htmlFor:"size_name_note",value:"To Add size values in particular category, just pick one Size Name"}),l?e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"w-full flex",children:[e.jsxs("form",{onSubmit:N,className:"p-4 block w-full",children:[e.jsx(t,{htmlFor:"size_name",value:"Update Size Name here..."}),e.jsx(h,{id:"update_size_name",type:"text",name:"update_size_name",value:a.size_name,className:"mt-1 block w-full",isFocused:!0,onChange:s=>u("size_name",s.target.value)}),e.jsx(z,{message:d.size_name,className:"mt-2"}),e.jsx("button",{className:"mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full",type:"submit",disabled:o||!l,children:"Update"})]}),e.jsxs("form",{onSubmit:y,className:"p-4 block w-full",children:[e.jsx(t,{className:"mt-2",htmlFor:"size_name",value:"Choose Size to Delete in Dropdowns..."}),e.jsx("button",{className:"w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl",type:"submit",disabled:o||!l,children:"Delete"})]})]}),e.jsx("div",{className:"w-full flex"})]}):""]})]}),e.jsx("div",{className:"flex flex-row w-full ",children:l?e.jsxs(e.Fragment,{children:[e.jsxs("form",{onSubmit:F,className:"w-full p-4 border",children:[e.jsx(t,{htmlFor:"size_value",value:"Size Value"}),e.jsx(h,{id:"size_values",type:"text",name:"size_values",value:a.size_values,className:"mt-1 block w-full",isFocused:!0,onChange:s=>u("size_values",s.target.value)}),e.jsx(t,{htmlFor:"size_value_note",value:"Note: Use ',' (comma) to seperate the sizes if adding multiple sizes. (39,40,41, etc)"}),e.jsx(z,{message:d.size_values,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-center w-full p-4",children:e.jsx("button",{className:"p-2 text-white bg-emerald-500 rounded-2xl",type:"submit",disabled:o,children:"Submit"})})]}),e.jsxs("div",{className:"flex flex-col w-full p-4 border",children:[e.jsx("h1",{children:"Size Values Lists"}),e.jsxs("select",{onChange:D,value:b,children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Size Values"}),v==null?void 0:v.map(s=>e.jsx("option",{value:s.id,children:s.size_values},s.id))]}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"w-full flex",children:[e.jsxs("form",{onSubmit:C,className:"p-4 block w-full",children:[e.jsx(t,{htmlFor:"size_values",value:"Update Size Value here..."}),e.jsx(h,{id:"size_values",type:"text",name:"size_values",value:a.size_values,className:"mt-1 block w-full",isFocused:!0,onChange:s=>u("size_values",s.target.value)}),e.jsx(z,{message:d.size_values,className:"mt-2"}),e.jsx("button",{className:"mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full",type:"submit",disabled:o||!l,children:"Update"})]}),e.jsxs("form",{onSubmit:V,className:"p-4 block w-full",children:[e.jsx(t,{className:"mt-2",htmlFor:"size_values",value:"Choose Size Values to Delete in Dropdowns..."}),e.jsx("button",{className:"w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl",type:"submit",disabled:o||!l,children:"Delete"})]})]})})]})]}):""})]})})}export{q as default};
