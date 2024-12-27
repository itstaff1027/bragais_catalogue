import{W as u,j as e,Y as p,a as x}from"./app-C6tpQrQf.js";import{T as o,I as m}from"./TextInput-Cufyv0bx.js";import{I as i}from"./InputLabel-IRRb6COH.js";import{P as f}from"./PrimaryButton-DVwZ5vhw.js";import{A as h}from"./AuthenticatedLayout-BvYwJ_Ly.js";import"./ApplicationLogo-msha1_0N.js";import"./transition-RZe3l1-p.js";function b(){const{data:a,setData:r,post:l,processing:n,errors:t,reset:d}=u({name:"",email:"",password:"",password_confirmation:""}),c=s=>{s.preventDefault(),l(route("registers"),{onFinish:()=>d("password","password_confirmation")})};return e.jsxs(h,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Create User"}),children:[e.jsx(p,{title:"Create Users"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"p-6 text-gray-900",children:e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"name",value:"Name"}),e.jsx(o,{id:"name",name:"name",value:a.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:s=>r("name",s.target.value),required:!0}),e.jsx(m,{message:t.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"email",value:"Email"}),e.jsx(o,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>r("email",s.target.value),required:!0}),e.jsx(m,{message:t.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password",value:"Password"}),e.jsx(o,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password",s.target.value),required:!0}),e.jsx(m,{message:t.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password_confirmation",value:"Confirm Password"}),e.jsx(o,{id:"password_confirmation",type:"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password_confirmation",s.target.value),required:!0}),e.jsx(m,{message:t.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4 flex items-center justify-end",children:[e.jsx(x,{href:route("login"),className:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Already registered?"}),e.jsx(f,{className:"ms-4",disabled:n,children:"Register"})]})]})})})})})]})}export{b as default};