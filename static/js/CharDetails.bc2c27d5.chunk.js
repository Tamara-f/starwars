(this.webpackJsonpstarwars=this.webpackJsonpstarwars||[]).push([[0],{114:function(e,t,r){e.exports={characterDet:"CharDetails_characterDet__KJjOX"}},115:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return g}));var s=r(5),n=r.n(s),c=r(14),a=r(6),i=r(7),o=r(11),l=r(10),h=r(0),j=r(25),p=r(16),u=r.n(p),d=r(112),f=r(36),b=r(23);function O(e,t){if("undefined"===e||void 0===e||!e)return"no results";var r=e.split(",");return"vehicles"===r[0].split("/")[4]?r.map((function(e){return t.vehicles.find((function(t){return t.url===e})).name})).join(", "):"films"===r[0].split("/")[4]?r.map((function(e){return t.films.find((function(t){return t.url===e})).title})).join(", "):void 0}var v=r(114),x=r.n(v),m=r(1),g=function(e){Object(o.a)(r,e);var t=Object(l.a)(r);function r(){var e;Object(a.a)(this,r);for(var s=arguments.length,i=new Array(s),o=0;o<s;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={character:[],vehicles:[],films:[],homeworld:"",isLoading:!0},e.toggleClass=function(){var t=Object(c.a)(n.a.mark((function t(r){var s,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"notLike"===(s=r.currentTarget).className?b.a.setFavorite(e.state):(u()("Character removed from favorites!"),c=b.a.removeFavorite(e.state.character.name),localStorage.setItem("favorites",JSON.stringify(c))),s.classList.toggle("like"),s.classList.toggle("notLike");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(i.a)(r,[{key:"componentDidMount",value:function(){var e=Object(c.a)(n.a.mark((function e(){var t,r=this;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.setState({homeworld:this.props.location.propsHome}),e.next=4,Object(j.a)("vehicles").then((function(e){r.setState({vehicles:e})}));case 4:return e.next=6,Object(j.d)().then((function(e){r.setState({films:e})}));case 6:return t=this.props.location.pathname.split("/")[2],e.next=9,Object(j.c)(t).then((function(e){var t=e[0];r.setState({character:t}),r.setState({isLoading:!1})}));case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"setLike",value:function(){return localStorage.favorites&&b.a.findDoubleFav(this.state.character.name)?"like":"notLike"}},{key:"render",value:function(){var e=this.state.character,t=e.name,r=e.height,s=e.mass,n=e.hair_color,c=e.skin_color,a=e.eye_color,i=e.birth_year,o=e.gender,l=e.vehicles,h=e.films,j=this.state,p=j.isLoading,u=j.homeworld;return Object(m.jsxs)("div",{className:x.a.characterDet,children:[Object(m.jsx)("h2",{children:p?Object(m.jsx)(f.a,{}):"Character Details"}),Object(m.jsx)("p",{className:"".concat(this.setLike()),onClick:this.toggleClass,children:Object(m.jsx)(d.a,{})}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" name: "})," ",t]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" height: "}),r]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" mass: "})," ",s]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" hair color: "})," ",n]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" skin color: "})," ",c]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" eye color: "})," ",a]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" birth year: "})," ",i]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" gender: "})," ",o]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" homeworld: "})," ",u]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" vehicles: "})," ",O("".concat(l),this.state)]}),Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:" films: "})," ",O("".concat(h),this.state)]})]})}}]),r}(h.Component)}}]);
//# sourceMappingURL=CharDetails.bc2c27d5.chunk.js.map