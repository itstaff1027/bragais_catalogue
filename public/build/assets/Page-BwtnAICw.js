import{W as u,j as e}from"./app-DlddDHRF.js";import"./Dropdown-AU8bS9M5.js";import"./AuthenticatedLayout-DNKB0hr8.js";import{P as n}from"./ProductsLayout-DeTsP9k-.js";import{T as j}from"./TextInput-CC6StvOB.js";import{I as i}from"./InputLabel-D8VFXl60.js";import{I as l}from"./InputError-DuX3jXKU.js";import{C as g,S as _,H as p,a as f}from"./CategoriesDropDown-D_JGTDPH.js";import{R as N}from"./RadioButtonStatus-DIIo5_nm.js";import"./transition-Dqu5RDwA.js";import"./ApplicationLogo-CHOwe7hl.js";function P({params:v}){const{data:t,setData:a,post:d,processing:m,errors:o,reset:c}=u({model:"",status:"",color_id:[],size_id:[],heel_height_id:[],category_id:1}),h=s=>{s.preventDefault(),d(route("products_name.create"),{onSuccess:()=>{c("model","status","color_id","size_id","heel_height_id","category_id")}})};return e.jsx(n,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Create Product"}),children:e.jsx("div",{className:"flex flex-col justify-center w-full",children:e.jsxs("form",{onSubmit:h,className:"w-full p-4",children:[e.jsx(i,{htmlFor:"model",value:"Model Name"}),e.jsx(j,{id:"model",type:"text",name:"model",value:t.model,className:"mt-1 block w-1/2",isFocused:!0,onChange:s=>a("model",s.target.value)}),e.jsx(l,{message:o.model,className:"mt-2"}),e.jsx("hr",{}),e.jsx(N,{handleSelectChange:s=>a("status",s),status:t.status}),e.jsx(l,{message:o.status,className:"mt-2"}),e.jsx("hr",{}),e.jsx(i,{htmlFor:"colors",value:"Colors"}),e.jsx("div",{className:"p-4 h-36 overflow-y-auto",children:e.jsx(g.Colors,{handleSelectedColor:(s,x=!1)=>{x?a("color_id",t.color_id.filter(r=>r.id!==s.id)):t.color_id.some(r=>r.id===s.id)||a("color_id",[...t.color_id,s])},colors:t.color_id})}),e.jsx(l,{message:o.color_id,className:"mt-2"}),e.jsx("hr",{}),e.jsx(i,{htmlFor:"sizes",value:"Sizes"}),e.jsxs("div",{className:"p-4",children:[e.jsx(_.CheckBox,{handleSizeCheckBox:s=>a("size_id",s),sizeSelectedId:t.size_id}),e.jsx(l,{message:o.size_id,className:"mt-2"})]}),e.jsx("hr",{}),e.jsx(i,{htmlFor:"heel_heights",value:"Heel Heights"}),e.jsxs("div",{className:"p-4",children:[e.jsx(p.CheckBox,{handleCheckBox:s=>a("heel_height_id",s),heelHeight:t.heel_height_id}),e.jsx(l,{message:o.heel_height_id,className:"mt-2"})]}),e.jsx("hr",{}),e.jsx(i,{htmlFor:"categories",value:"Categories"}),e.jsxs("div",{className:"p-4",children:[e.jsx(f,{handleSelectChange:s=>a("category_id",s.target.value),selectedItemId:t.category_id}),e.jsx(l,{message:o.category_id,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center justify-center w-1/2",children:e.jsx("button",{className:"p-2 text-white bg-emerald-500 rounded-2xl",type:"submit",disabled:m,children:"Submit"})})]})})})}export{P as default};
