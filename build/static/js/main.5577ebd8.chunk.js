(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},21:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),u=t.n(r),a=t(14),i=t.n(a),o=(t(20),t(3)),s=function(e){var n=e.change;return Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{onChange:n})]})},d=function(e){var n=e.add,t=e.nameChange,r=e.numberChange,u=e.newName,a=e.newNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{onChange:t,value:u})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{onChange:r,value:a})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},f=function(e){var n=e.persons,t=e.filter,r=e.deletePerson;return Object(c.jsx)("div",{children:n.filter((function(e){return e.name.match(new RegExp(t,"i"))})).sort((function(e,n){return e.id-n.id})).map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:[e.name," ",e.number]}),Object(c.jsx)("button",{onClick:function(){return r(e)},children:"Delete"})]},e.id)}))})},b=(t(21),function(e){var n=e.message,t=e.err;return""===n?null:Object(c.jsx)("div",{className:t?"error":"success",children:n})}),j=t(4),m=t.n(j),l="/api/persons",h=function(){var e=Object(r.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],a=Object(r.useState)(""),i=Object(o.a)(a,2),j=i[0],h=i[1],O=Object(r.useState)(""),v=Object(o.a)(O,2),p=v[0],x=v[1],g=Object(r.useState)(""),w=Object(o.a)(g,2),C=w[0],S=w[1],y=Object(r.useState)(""),N=Object(o.a)(y,2),T=N[0],k=N[1],D=Object(r.useState)(!1),E=Object(o.a)(D,2),P=E[0],A=E[1];Object(r.useEffect)((function(){m.a.get(l).then((function(e){return e.data})).then((function(e){u(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)(b,{message:T,err:P}),Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(s,{change:function(e){S(e.target.value)}}),Object(c.jsx)("h3",{children:"Add a new number"}),Object(c.jsx)(d,{add:function(e){if(e.preventDefault(),""===j||""===p)A(!0),k("You must submit both a name and a phonenumber"),setTimeout((function(){k(""),A(!1)}),5e3);else if(t.some((function(e){return e.name===j}))){if(window.confirm("".concat(j," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===j})),c={name:n.name,number:p};(function(e,n){var t=l.concat("/".concat(e));return m.a.put(t,n).then((function(e){return e.data}))})(n.id,c).then((function(e){var n=t.filter((function(n){return n.id!==e.id}));u(n.concat(e)),k("Updated ".concat(e.name)),setTimeout((function(){k("")}),5e3)})).catch((function(e){A(!0),k("Information of ".concat(c.name," has already been removed from the server")),setTimeout((function(){k(""),A(!1)}),5e3),u(t.filter((function(e){return e.id!==n.id})))}))}}else{(r={name:j,number:p},m.a.post(l,r).then((function(e){return 200===e.status?e.data:e.status}))).then((function(e){"number"!==typeof e?(u(t.concat(e)),x(""),h(""),k("Added ".concat(e.name)),setTimeout((function(){k("")}),5e3)):(A(!0),k("Wrong return from server"),setTimeout((function(){k(""),A(!1)}),5e3))}))}var r},nameChange:function(e){h(e.target.value)},numberChange:function(e){x(e.target.value)},newName:j,newNumber:p}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(f,{persons:t,filter:C,deletePerson:function(e){window.confirm("Do you really want to delete ".concat(e.name))&&function(e){var n=l.concat("/".concat(e));return m.a.delete(n).then((function(e){return e.status}))}(e.id).then((function(n){204===n&&(u(t.filter((function(n){return n.id!==e.id}))),k("Deleted ".concat(e.name)),setTimeout((function(){k("")}),5e3))}))}})]})};i.a.render(Object(c.jsx)(u.a.StrictMode,{children:Object(c.jsx)(h,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.5577ebd8.chunk.js.map