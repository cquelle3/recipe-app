(this["webpackJsonprecipe-app"]=this["webpackJsonprecipe-app"]||[]).push([[0],{49:function(e,t,a){},50:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(35),s=a.n(r),i=(a(49),a(6)),j=(a(50),a(27)),o=a(16),l=a(70),b=a(74),u=a(72),O=a(73),d=a(71),h=a(28),x=a(36),m=a.n(x),p=a(1);function g(e){var t,a=e.recipe,c=e.index,n=e.recipeNumber;return Object(p.jsx)("div",{className:"recipe-result",style:{animation:(t=c,t>=n&&(t%=n),"fadeIn ".concat(500,"ms ease-out ").concat(100*(t+1),"ms forwards"))},children:Object(p.jsxs)(o.a,{className:"recipe-card",children:[Object(p.jsx)(o.a.Header,{children:a.title}),Object(p.jsx)(o.a.Img,{src:a.image}),Object(p.jsxs)(o.a.Body,{children:[Object(p.jsx)(o.a.Text,{dangerouslySetInnerHTML:{__html:m.a.sanitize(a.summary)}}),Object(p.jsx)("a",{href:a.sourceUrl,target:"_blank",rel:"noreferrer",children:Object(p.jsxs)(j.a,{variant:"primary",children:["Recipe ",Object(p.jsx)(h.b,{})]})})]})]})})}function f(e){var t=e.recipeData,a=e.recipeNumber,c=[];return t.forEach((function(e,t){c.push(Object(p.jsx)(g,{recipe:e,index:t,recipeNumber:a},e.title))})),Object(p.jsx)("div",{className:"recipe-results-container",children:Object(p.jsx)("div",{className:"recipe-results",children:c})})}function N(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)([]),s=Object(i.a)(r,2),o=s[0],x=s[1],m=Object(c.useState)(25),g=Object(i.a)(m,2),N=g[0],v=g[1],C=Object(c.useState)(0),y=Object(i.a)(C,2),S=y[0],F=y[1],I=Object(c.useState)(0),L=Object(i.a)(I,2),M=L[0],T=L[1],R=Object(c.useState)(0),G=Object(i.a)(R,2),P=G[0],B=G[1],E=Object(c.useState)(!1),k=Object(i.a)(E,2),w=k[0],K=k[1],q=Object(c.useState)(!1),D=Object(i.a)(q,2),H=D[0],_=D[1],J=Object(c.useState)(NaN),U=Object(i.a)(J,2),z=U[0],A=U[1],Q=Object(c.useState)(NaN),V=Object(i.a)(Q,2),W=V[0],X=V[1],Y=Object(c.useState)(NaN),Z=Object(i.a)(Y,2),$=Z[0],ee=Z[1],te=Object(c.useState)(NaN),ae=Object(i.a)(te,2),ce=ae[0],ne=ae[1],re=Object(c.useState)(NaN),se=Object(i.a)(re,2),ie=se[0],je=se[1],oe=Object(c.useState)(NaN),le=Object(i.a)(oe,2),be=le[0],ue=le[1],Oe=Object(c.useState)(NaN),de=Object(i.a)(Oe,2),he=de[0],xe=de[1],me=Object(c.useState)(NaN),pe=Object(i.a)(me,2),ge=pe[0],fe=pe[1],Ne=Object(c.useState)(""),ve=Object(i.a)(Ne,2),Ce=ve[0],ye=ve[1],Se=Object(c.useState)(!1),Fe=Object(i.a)(Se,2),Ie=Fe[0],Le=Fe[1],Me=!0;function Te(){Le(!0),x([]),K(!1);var e="";isNaN(z)||(e+="&minCalories="+z),isNaN(W)||(e+="&maxCalories="+W),isNaN($)||(e+="&minCarbs="+$),isNaN(ce)||(e+="&maxCarbs="+ce),isNaN(ie)||(e+="&minProtein="+ie),isNaN(be)||(e+="&maxProtein="+be),isNaN(he)||(e+="&minFat="+he),isNaN(ge)||(e+="&maxFat="+ge),ye(e),fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=".concat("943dbaebed0b4e34b6e70ebf3284efbb","&query=").concat(a,"&addRecipeInformation=").concat(Me,"&number=").concat(N).concat(e)).then((function(e){return e.json()})).then((function(e){402!==e.code?(x(e.results),v(e.number),F(e.totalResults),T(a),_(!1),e.results.length<e.totalResults&&K(!0)):_(!0),Le(!1)})).catch((function(e){console.log(e),console.log("error getting recipe data"),Le(!1)}))}var Re=null;w&&!Ie?Re=Object(p.jsxs)("div",{className:"more-results",children:[Object(p.jsxs)("p",{children:[o.length," of ",S]}),Object(p.jsxs)(j.a,{className:"more-results-button",variant:"light",onClick:function(){Le(!0);var e=N*(P+1),t=N;S-o.length<N&&(t=S-o.length),fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=".concat("943dbaebed0b4e34b6e70ebf3284efbb","&query=").concat(M,"&addRecipeInformation=").concat(Me,"&number=").concat(t,"&offset=").concat(e).concat(Ce)).then((function(e){return e.json()})).then((function(e){if(console.log(e),402!==e.code){var t=o.concat(e.results);x(t),T(a),_(!1),B(P+1),t.length<S?K(!0):K(!1)}else _(!0);Le(!1)})).catch((function(e){console.log(e),console.log("error getting recipe data"),Le(!1)}))},children:["More results ",Object(p.jsx)(h.a,{})]})]}):!w&&o.length>0&&(Re=Object(p.jsx)("div",{className:"more-results",children:Object(p.jsxs)("p",{children:[o.length," of ",S]})}));var Ge=null;Ie&&(Ge=Object(p.jsx)("div",{className:"load-spinner",children:Object(p.jsx)(l.a,{animation:"border",variant:"primary"})}));return Object(c.useEffect)((function(){var e=document.getElementById("header"),t=document.getElementById("title");new IntersectionObserver((function(t){var a=Object(i.a)(t,1)[0];e.classList.toggle("active",!a.isIntersecting)})).observe(t)})),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"title-container",id:"title",children:Object(p.jsx)("h1",{className:"app-title",children:"Recipe Search"})}),Object(p.jsxs)("div",{className:"search-bar-container",id:"header",children:[Object(p.jsx)("div",{className:"search-bar",children:Object(p.jsxs)(b.a,{className:"search",children:[Object(p.jsx)(u.a.Control,{placeholder:"Recipe Search","aria-label":"Recipe Search",onChange:function(e){n(e.target.value)},onKeyUp:function(e){return function(e){"Enter"===e.code&&Te()}(e)}}),Object(p.jsxs)(j.a,{variant:"outline-primary",onClick:Te,children:[Object(p.jsx)(h.c,{})," Search"]})]})}),Object(p.jsx)("div",{className:"options",children:Object(p.jsx)(O.a,{className:"options-accordion",children:Object(p.jsxs)(O.a.Item,{eventKey:"0",children:[Object(p.jsx)(O.a.Header,{children:"Options"}),Object(p.jsx)(O.a.Body,{children:Object(p.jsxs)(u.a,{children:[Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Minimum Calories"}),Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){A(parseFloat(e.target.value))}})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Maximum Calories"}),Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){X(parseFloat(e.target.value))}})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Minimum Carbs"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){ee(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Maximum Carbs"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){ne(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Minimum Protein"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){je(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Maximum Protein"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){ue(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Minimum Fat"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){xe(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]}),Object(p.jsxs)(u.a.Group,{children:[Object(p.jsx)(u.a.Label,{children:"Maximum Fat"}),Object(p.jsxs)(b.a,{children:[Object(p.jsx)(u.a.Control,{type:"number",onChange:function(e){fe(parseFloat(e.target.value))}}),Object(p.jsx)(b.a.Text,{children:"grams"})]})]})]})})]})})}),Object(p.jsx)("div",{className:"api-alert",children:Object(p.jsx)(d.a,{variant:"primary",show:H,children:"The Recipe API has exceeded it's maximum number of requests today. Sorry!"})})]}),Object(p.jsx)(f,{recipeData:o,recipeNumber:N}),Ge,Re]})}var v=function(){return Object(p.jsx)(N,{})},C=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,75)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),c(e),n(e),r(e),s(e)}))};a(66);s.a.createRoot(document.getElementById("root")).render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(v,{})})),C()}},[[67,1,2]]]);
//# sourceMappingURL=main.25f9e5e8.chunk.js.map