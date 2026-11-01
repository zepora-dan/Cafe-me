import { useState, useEffect } from 'react'

const tile = (c, o) => `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" fill="none" stroke="${c}" stroke-opacity="${o}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M30 40h50v28a20 20 0 0 1-20 20h-10a20 20 0 0 1-20-20z M80 48h8a9 9 0 0 1 0 18h-8 M22 96h66 M45 32c-6-7 6-9 0-16M62 32c-6-7 6-9 0-16"/>` +
  `<circle cx="170" cy="62" r="34"/><circle cx="170" cy="62" r="22"/><circle cx="162" cy="58" r="5"/><circle cx="178" cy="64" r="6"/><circle cx="167" cy="72" r="4"/>` +
  `<path d="M30 170h80a40 40 0 0 1-80 0z M55 160c-6-7 6-9 0-16M75 160c-6-7 6-9 0-16M54 214h32 M175 150h34l-6 52h-22z M192 150l10-24"/></svg>`)}")`

const CSS = `
:root{--ink:#16213a;--paper:#f4f6fa;--line:#d5dcd6;--gold:#e0a526;--amber:#c98200;--teal:#0f9d8f;--green:#2f8f5b;--red:#b3392b;
--food:${tile('#1f7a8c', 0.16)};--food-dk:${tile('#cfe9ee', 0.12)};
color-scheme:light;font:16px/1.45 'Segoe UI',system-ui,sans-serif;color:var(--ink);background:var(--paper)}
*{box-sizing:border-box}
body{margin:0}
body::before{content:"";position:fixed;inset:0;background:var(--food);background-size:240px;z-index:-1;pointer-events:none}
#root{width:auto;max-width:none;border:0;text-align:left;min-height:0;display:block}
button,input,select{font:inherit}
button{padding:.45rem .9rem;border:1px solid var(--ink);background:#fff;color:var(--ink);border-radius:6px;cursor:pointer}
button:disabled{opacity:.45;cursor:not-allowed}
button.primary{background:var(--teal);border-color:var(--teal);color:#fff}
:focus-visible{outline:3px solid var(--teal);outline-offset:2px}
input:not([type=checkbox]),select{padding:.5rem .65rem;border:1px solid var(--line);border-radius:6px;min-width:0;background:#fff;color:var(--ink)}
h1,h2,h3{color:var(--ink);letter-spacing:0;font-weight:700}
h1,.brand{font-family:Georgia,'Times New Roman',serif}
h1{font-size:2.2rem;margin:0 0 .3rem}
h2{font-size:1.2rem;margin:.2rem 0 .7rem}
h3{font-size:1.05rem;margin:0}
p{margin:.3rem 0}
.split{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;align-items:start}
@media(max-width:800px){.split{grid-template-columns:1fr}}
.panel,.split>section{background:#fff;border-radius:16px;padding:1.2rem 1.4rem;box-shadow:0 2px 10px rgba(22,33,58,.07)}
fieldset{border:1px solid var(--line);border-radius:8px;padding:.6rem .9rem;display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;background:#fff}
.check{display:inline-flex;gap:.4rem;align-items:center;cursor:pointer}
.check input{width:1.1rem;height:1.1rem;accent-color:var(--teal)}
.menu{list-style:none;padding:0;margin:.5rem 0 1rem;border-top:1px solid var(--line)}
.menu li{display:flex;justify-content:space-between;align-items:center;gap:.8rem;padding:.55rem 0;border-bottom:1px solid var(--line)}
.menu small{display:block;color:#5b6e70}
.menu li.off>span:first-child{color:#8a9799;text-decoration:line-through}
.grp{margin-top:1rem}
.qty{display:inline-flex;align-items:center;gap:.6rem}.qty b{min-width:1.2rem;text-align:center}
.badge{padding:.1rem .55rem;border-radius:99px;font-size:.85rem;background:var(--line)}
.badge.off{background:#f3d9d5;color:var(--red)}
.total{display:flex;justify-content:space-between;align-items:center;margin-top:1rem}
.meta{color:#5b6e70;margin:.15rem 0;font-size:.92rem}
.row{display:flex;gap:.5rem;flex-wrap:wrap}.row input:first-child{flex:1 1 8rem}.row input[type=number]{width:6rem}
.order{background:#fff;border:1px solid var(--line);border-left:5px solid var(--amber);border-radius:8px;padding:.8rem 1rem;margin-bottom:.8rem}
.order header,.order footer{display:flex;justify-content:space-between;align-items:center;gap:.6rem}
.order ul{margin:.4rem 0;padding-left:1.1rem}.order footer{margin-top:.5rem}

.gate{min-height:100vh;display:grid;place-items:center;padding:1.2rem;background:#26160d;color:#f3e6d8}
.auth{width:min(62rem,100%);display:grid;grid-template-columns:1fr 1fr;background:#3a2416;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.aside{padding:2.4rem 2rem;text-align:center;background:var(--food-dk) 0 0/240px repeat,#4a2e1c}
.emblem{width:7.5rem;height:7.5rem;border-radius:50%;border:4px solid #a8742f;background:#2f1c0f;display:grid;place-items:center;margin:0 auto 1rem;font-size:3.4rem}
.script{font-family:'Brush Script MT','Segoe Script','Lucida Handwriting',cursive;font-size:3.2rem;color:var(--gold);line-height:1}
.tag{color:var(--gold);font-style:italic;font-size:1.35rem;margin:1.6rem 0 0}
.feats{list-style:none;padding:0;margin:1.6rem 0 0;text-align:left;display:grid;gap:1rem}
.feats li{display:flex;gap:.9rem;align-items:center}
.feats i{flex:none;width:2.8rem;height:2.8rem;border-radius:50%;background:#f59e0b;display:grid;place-items:center;font-style:normal}
.feats b{display:block}.feats span{color:#b9c2d6}
.formside{padding:2.4rem}
.formside h1{color:var(--gold);text-align:center;font-family:inherit;font-style:normal;font-size:1.9rem}
.lead{text-align:center;color:#d6bfa6}
.modes{display:grid;grid-template-columns:1fr 1fr;margin:1.2rem 0 0;border:1px solid #6a4630;border-radius:10px;overflow:hidden}
.modes button{border:0;border-radius:0;background:transparent;color:#d6bfa6}
.modes .on{background:#f59e0b;color:#1a1200;font-weight:700}
.auth label{display:block;margin:.9rem 0 .3rem;color:#cdb59c}
.auth label.rem{display:flex;gap:.5rem;align-items:center;color:#e8ecf4}
.auth input:not([type=checkbox]),.auth select{width:100%;padding:.8rem 1rem;border-radius:10px;border:1px solid #6a4630;background:#2a180d;color:#fff}
.go{width:100%;margin-top:1.1rem;padding:.85rem;border:0;border-radius:6px;background:linear-gradient(90deg,#c9822b,#8f4f17);color:#fff;font-weight:700}
.err{color:#ff8a80;margin:.7rem 0 0}
@media(max-width:800px){.auth{grid-template-columns:1fr}}
.shell{display:grid;grid-template-columns:260px 1fr;min-height:100vh}
.side{background:#fff;border-right:1px solid var(--line);padding:1rem .8rem;position:sticky;top:0;height:100vh;overflow:auto}
.logo{display:flex;gap:.7rem;align-items:center;padding:.3rem .5rem 1rem;border-bottom:1px solid var(--line);margin-bottom:.6rem}
.logo i{width:2.6rem;height:2.6rem;border-radius:12px;background:var(--teal);display:grid;place-items:center;font-style:normal;font-size:1.3rem}
.logo b{display:block;font-size:1.35rem;color:var(--teal);line-height:1.1}
.logo small{color:#6b7790;letter-spacing:.06em}
.grpt{font-size:.78rem;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:.08em;margin:1.2rem .6rem .4rem}
.nav{display:flex;align-items:center;gap:.7rem;width:100%;text-align:left;border:0;background:transparent;padding:.65rem .7rem;border-radius:10px;font-weight:600}
.nav.on{background:#e3f6f3;color:var(--teal)}
.nav em{margin-left:auto;font-style:normal;font-size:.7rem;font-weight:800;padding:.15rem .55rem;border-radius:99px}
.pos{background:#d9f5e6;color:#177a4a}.barb{background:#ece1fb;color:#7e3fc7}.kit{background:#ffe9d2;color:#c25e00}
.content{min-width:0}
.top{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.6rem;background:#fff;border-bottom:1px solid var(--line)}
.crumb span{color:#6b7790}
.chip{display:flex;gap:.7rem;align-items:center}
.av{width:2.6rem;height:2.6rem;border-radius:50%;background:var(--teal);color:#fff;display:grid;place-items:center;font-weight:700}
main{padding:1.4rem 1.6rem;max-width:1200px;margin:0 auto}
.hero{border-radius:14px;padding:.7rem 1.1rem;color:#fff;background:linear-gradient(120deg,var(--st,#7d5a3c),var(--st2,#d9a566));position:relative;overflow:hidden;margin-bottom:1rem;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.2rem}
.hero::after{content:"";position:absolute;inset:0;background:var(--food-dk);background-size:240px;pointer-events:none}
.hero>*{position:relative;z-index:1}
.hero h1{color:#fff;font-family:inherit;font-style:normal;font-size:1.4rem;margin:0}
.hero p{margin:0;opacity:.92;font-size:.9rem}
.hero .acts{margin-left:auto;align-items:center}
.acts{display:flex;gap:.6rem;flex-wrap:wrap}
.hero button{background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.45);color:#fff;border-radius:10px;padding:.35rem .8rem}
.clock{font-family:ui-monospace,Consolas,monospace}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.4rem}
.stat{background:#fff;border-radius:16px;padding:1.2rem;box-shadow:0 2px 10px rgba(22,33,58,.07)}
.stat small{display:block;color:#6b7790;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-top:.8rem}
.stat b{font-size:1.9rem;display:block}
.ic{width:3rem;height:3rem;border-radius:12px;display:grid;place-items:center;font-size:1.3rem}
.pills{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
.pills button.on{background:var(--ink);color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem}
.pg-cash{--st:#7d5a3c;--st2:#d9a566}.pg-bar{--st:#0fa77a;--st2:#2fd096}.pg-kit{--st:#f2610a;--st2:#fb9a4a}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin:0}
.chips div{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.38);border-radius:10px;padding:.2rem .7rem;min-width:0}
.chips b{display:block;font-size:1.05rem;line-height:1.15}.chips span{font-size:.75rem}
.acting{display:flex;gap:.9rem;align-items:center;background:#e11d48;border-radius:14px;padding:.3rem .7rem;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.acting span{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em}.acting b{display:block;font-size:.95rem;text-transform:none;letter-spacing:0}
.hero .acting button{background:#fff;color:#e11d48;border-color:#fff;padding:.3rem .7rem;border-radius:99px;font-weight:700}
.pg .pills button.on{background:var(--st,var(--ink));border-color:var(--st,var(--ink))}
.order{border-left:1px solid var(--line);border-top:5px solid var(--amber);border-radius:14px}
.order.preparing{border-top-color:var(--teal)}.order.completed{border-top-color:var(--green)}
.order header{display:grid;grid-template-columns:auto 1fr auto;gap:.7rem}
.order footer{border-top:2px dashed var(--line);padding-top:.6rem}
.no{width:2.6rem;height:2.6rem;border-radius:10px;background:var(--st,var(--teal));color:#fff;display:grid;place-items:center;font-weight:800}
 .thumb{width:3.4rem;height:3.4rem;border-radius:12px;object-fit:cover;flex:none;background:#e3f6f3}
.thumb.ph{display:grid;place-items:center;font-size:1.7rem}
.who{display:flex;align-items:center;gap:.75rem;min-width:0}
.rg{display:inline-block;margin-left:.4rem;padding:0 .45rem;border-radius:99px;font-size:.75rem;background:#e3f6f3;color:var(--teal)}
.rg.foreign{background:#ece1fb;color:#7e3fc7}
.menu li.off .thumb{filter:grayscale(1);opacity:.55}
.row input[type=file]{flex:1 1 12rem;padding:.35rem}
.photo{cursor:pointer;padding:.3rem .55rem;border:1px solid var(--line);border-radius:6px;background:#fff}
.tblwrap{overflow-x:auto;margin:.5rem 0 1rem}
.ptable{width:100%;border-collapse:collapse;min-width:44rem}
.ptable th{text-align:left;font-size:.85rem;color:#6b7790;font-weight:700;padding:.5rem .7rem;border-bottom:2px solid var(--line)}
.ptable td{padding:.65rem .7rem;border-bottom:1px solid var(--line);vertical-align:middle}
.ptable .thumb{width:4.4rem;height:4.4rem;border-radius:14px;border:2px solid #e6eaf0;box-shadow:0 2px 8px rgba(22,33,58,.15);font-size:2.2rem}
.ptable td.nm{font-weight:700;font-size:1.02rem;max-width:15rem}
.ptable tr.off .thumb{filter:grayscale(1);opacity:.55}.ptable tr.off td.nm{color:#8a9799}
.tp{padding:.2rem .7rem;border-radius:99px;font-size:.9rem;font-weight:600}
.tp.bar{background:#e4ecff;color:#2a4fd6}.tp.kitchen{background:#fff3c4;color:#9a6a00}
.cat{display:inline-block;padding:.3rem .8rem;border-radius:99px;background:#6b4a33;color:#fff;font-weight:700;font-size:.9rem}
.badge.ok{background:#d9f5e6;color:#177a4a;font-weight:600;padding:.25rem .8rem}
.notice{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;background:#fff7e0;border:1px solid #f0cf7a;border-left:6px solid var(--gold);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:1.2rem}
.notice p{margin:.15rem 0}.notice.ok{background:#e3f6f3;border-color:#9ad8cf;border-left-color:var(--teal)}
.auth .jobs{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;border:0;padding:0;margin:.9rem 0 0;background:transparent}
.auth .jobs legend{color:#cdb59c;padding:0;margin-bottom:.3rem}
.auth .jobs label{margin:0;position:relative}
.auth .jobs input[type=radio]{position:absolute;opacity:0;width:1px;height:1px}
.auth .jobs span{display:block;text-align:center;padding:.7rem .3rem;border:1px solid #6a4630;border-radius:10px;background:#2a180d;color:#e8d9c8;cursor:pointer}
.auth .jobs input:checked+span{background:#f59e0b;border-color:#f59e0b;color:#1a1200;font-weight:700}
.auth .jobs input:focus-visible+span{outline:3px solid var(--gold);outline-offset:2px}
.pos{display:grid;grid-template-columns:minmax(0,1fr) 22rem;gap:1rem;align-items:start}
@media(max-width:1000px){.pos{grid-template-columns:1fr}}
.pos .panel{padding:1rem}
.find{width:100%}
.dishes{display:grid;grid-template-columns:repeat(auto-fill,minmax(10.5rem,1fr));gap:.8rem;margin-top:.9rem}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.card.in{border-color:var(--teal);box-shadow:0 0 0 2px #cdeeea}
.pic{position:relative;display:block;width:100%;padding:0;border:0;border-radius:0;background:#f1f4f2}
.pic:disabled{cursor:not-allowed}
.card .thumb{width:100%;height:7.5rem;border-radius:0;font-size:3rem}
.card.off .thumb{filter:grayscale(1);opacity:.5}
.ctag{position:absolute;left:.4rem;top:.4rem;padding:.1rem .55rem;border-radius:8px;background:#6b4a33;color:#fff;font-size:.75rem;font-weight:700;max-width:85%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.qb{position:absolute;right:.4rem;top:.4rem;min-width:1.5rem;height:1.5rem;border-radius:99px;background:var(--teal);color:#fff;display:grid;place-items:center;font-size:.85rem;padding:0 .3rem}
.card h3{padding:.55rem .7rem 0;font-size:.95rem;line-height:1.25;min-height:2.6rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .meta{padding:0 .7rem}.card .rg{margin-left:0}
.buy{display:flex;justify-content:space-between;align-items:center;gap:.4rem;padding:.4rem .7rem .7rem;margin-top:auto}
.buy b{color:var(--amber)}
.plus{width:2.1rem;height:2.1rem;padding:0;border-radius:50%;background:#f59e0b;border-color:#f59e0b;color:#fff;font-size:1.2rem;line-height:1}
.cartp{position:sticky;top:.8rem;max-height:calc(100vh - 1.6rem);overflow:auto}
.cartp h2{display:flex;justify-content:space-between;align-items:baseline}
.cartp h2 small{color:#6b7790;font-weight:400;font-size:.9rem}
.cartp .menu{margin:.6rem 0}.cartp .menu li{padding:.45rem 0}
.wide{width:100%;margin-top:.7rem;padding:.7rem;font-weight:700}
.empty{text-align:center;padding:2.5rem 1rem;color:#6b7790}.empty span{font-size:3rem;display:block}
.catbar{display:flex;gap:.6rem;overflow-x:auto;padding:.2rem .1rem .7rem;margin-top:.6rem;scrollbar-width:thin}
.catbar button{flex:none;display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .9rem;font-size:.9rem;border-radius:12px;border:1px solid var(--line);background:#fff;font-weight:600;white-space:nowrap}
.catbar button i{font-style:normal}
.catbar button.on{background:#0f1b33;border-color:#0f1b33;color:#fff;font-weight:700}
.typebar{display:flex;align-items:center;gap:.3rem;overflow-x:auto;padding:.2rem .1rem .7rem;border-top:1px solid var(--line);scrollbar-width:thin}
.typebar>b{flex:none;font-size:.75rem;letter-spacing:.1em;color:#6b7790;margin-right:.4rem}
.typebar button{flex:none;border:0;background:transparent;color:#44506b;font-weight:600;border-radius:10px;padding:.3rem .75rem;font-size:.88rem;white-space:nowrap}
.typebar button.on{background:#e3e8f0;color:var(--ink)}
.dishes{grid-template-columns:repeat(auto-fill,minmax(9.5rem,1fr));gap:.8rem}
.card{border-radius:16px;box-shadow:0 2px 10px rgba(22,33,58,.06)}
.card .thumb{height:6.5rem;font-size:2.4rem;display:block}
.card .thumb.ph{display:grid}
.card h3{padding:.6rem .75rem 0;font-size:.95rem;font-weight:800;min-height:2.9rem}
.card .meta{padding:0 .75rem}
.ctag{left:.45rem;top:.45rem;padding:.12rem .5rem;border-radius:8px;background:rgba(74,46,28,.92);color:#ffd777;border:1px solid rgba(255,215,119,.35);font-size:.7rem}
.buy b{color:var(--ink);font-family:ui-monospace,Consolas,monospace;font-size:.85rem}
.plus{width:2rem;height:2rem;border-radius:10px;background:#eef1f7;border-color:#eef1f7;color:var(--ink);font-size:1.15rem}
.card.in{border-color:var(--teal)}
.ptable.sm{min-width:0}
.rbar{height:.6rem;border-radius:99px;background:var(--teal)}
.chosen{margin:.2rem 0 .6rem;font-size:.95rem}
.check small{display:block;color:#6b7790;font-size:.78rem}.check small.busy{color:var(--amber);font-weight:600}
.editbox{display:grid;gap:.4rem;padding:.6rem .75rem}.editbox input{width:100%}.editbox .row{gap:.3rem}.editbox .row button{padding:.3rem .6rem;font-size:.85rem}
.admin{display:grid;grid-template-columns:minmax(0,1fr) 24rem;gap:1.2rem;align-items:start}
@media(max-width:1100px){.admin{grid-template-columns:1fr}}
.admin .cartp{padding:1.2rem 1.4rem}
.cardact{display:flex;justify-content:space-between;align-items:center;gap:.4rem;padding:0 .75rem .7rem;font-size:.85rem}
.card h3{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-height:0;padding:.6rem .75rem 0;-webkit-line-clamp:unset}
.card .desc{margin:.1rem 0 .5rem;padding:0 .75rem;color:#6b7790;font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-height:1.3rem}
.buy{margin:0 .75rem;padding:.5rem 0 .65rem;border-top:1px solid var(--line)}
@media(max-width:900px){.shell{grid-template-columns:1fr}.side{position:static;height:auto}.stats{grid-template-columns:1fr 1fr}}
`

const DAY = 24 * 60 * 60 * 1000
const ROLE = { admin: 'Admin', cashier: 'Cashier', kitchen: 'Kitchen', bar: 'Bar' }
const TABS = { admin: ['Overview', 'Reports', 'Menu', 'Cashier', 'Bar', 'Kitchen', 'Manage'], cashier: ['Cashier'], kitchen: ['Kitchen'], bar: ['Bar'] }
const NAV = { Overview: ['📊', 'Overview'], Reports: ['📈', 'Reports'], Menu: ['📖', 'Menu view'], Cashier: ['🧾', 'Cashier view', 'POS', 'pos'], Bar: ['🍸', 'Bar view', 'BAR', 'barb'],
  Kitchen: ['🍴', 'Kitchen view', 'KITCH', 'kit'], Manage: ['⚙️', 'Menu & staff'] }
const LABEL = { new: 'New', preparing: 'Preparing', completed: 'Completed' }
const REGION = { habesha: 'Habesha', foreign: 'Foreign' }
const ALLMEALS = ['breakfast', 'lunch', 'dinner']
const MEALNAME = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner' }
const KIND = { hot: 'Hot drink', cold: 'Cold drink', juice: 'Juice', traditional: 'Traditional drink' }
const MEALS = [['all', 'All'], ['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['drinks', 'Drinks']]
const KINDS = [['all', 'All drinks'], ['hot', 'Hot'], ['cold', 'Cold'], ['juice', 'Juice'], ['traditional', 'Traditional']]
const tag = m => m.station === 'bar' ? (KIND[m.kind] || 'Drink') : (m.meals || ALLMEALS).map(x => MEALNAME[x]).join(', ')
const MENU = [
  // Every item has a photo path. Drop a photo at public/images/<name>.jpg (or use the camera button in Menu & staff).
  // Until a photo exists, a coloured emoji tile shows instead.
  { id: 1, name: 'Chechebsa', price: 120, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥞', image: '/images/chechebsa.jpg' },
  { id: 2, name: 'Firfir', price: 150, region: 'habesha', station: 'kitchen', meals: ['breakfast', 'lunch'], available: true, emoji: '🍛', image: '/images/firfir.jpg' },
  { id: 3, name: 'Enkulal firfir (egg)', price: 110, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍳', image: '/images/enkulal-firfir-egg.jpg' },
  { id: 4, name: 'Quanta firfir', price: 170, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥩', image: '/images/quanta-firfir.jpg' },
  { id: 5, name: 'Fetira', price: 140, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥞', image: '/images/fetira.jpg' },
  { id: 6, name: 'Ful', price: 90, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🫘', image: '/images/ful.jpg' },
  { id: 7, name: 'Genfo', price: 130, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥣', image: '/images/genfo.jpg' },
  { id: 8, name: 'Kinche', price: 80, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥣', image: '/images/kinche.jpg' },
  { id: 9, name: 'Ambasha with honey', price: 60, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍯', image: '/images/ambasha-with-honey.jpg' },
  { id: 10, name: 'Dabo with butter', price: 50, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍞', image: '/images/dabo-with-butter.jpg' },
  { id: 11, name: 'Ayib with gomen', price: 90, region: 'habesha', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🧀', image: '/images/ayib-with-gomen.jpg' },
  { id: 12, name: 'Dulet', price: 200, region: 'habesha', station: 'kitchen', meals: ['breakfast', 'lunch'], available: true, emoji: '🍖', image: '/images/dulet.jpg' },
  { id: 13, name: 'Doro wat', price: 280, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍗', image: '/images/doro-wat.jpg' },
  { id: 14, name: 'Key wat', price: 260, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥘', image: '/images/key-wat.jpg' },
  { id: 15, name: 'Siga wat', price: 270, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/siga-wat.jpg' },
  { id: 16, name: 'Alicha wat', price: 200, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥘', image: '/images/alicha-wat.jpg' },
  { id: 17, name: 'Misir wat', price: 120, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍲', image: '/images/misir-wat.jpg' },
  { id: 18, name: 'Atkilt wat', price: 110, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥕', image: '/images/atkilt-wat.jpg' },
  { id: 19, name: 'Dinich wat', price: 110, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥔', image: '/images/dinich-wat.jpg' },
  { id: 20, name: 'Fasolia', price: 100, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🫛', image: '/images/fasolia.jpg' },
  { id: 21, name: 'Shiro', price: 120, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍲', image: '/images/shiro.jpg' },
  { id: 22, name: 'Tegabino shiro', price: 150, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍲', image: '/images/tegabino-shiro.jpg' },
  { id: 23, name: 'Bozena shiro', price: 180, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍲', image: '/images/bozena-shiro.jpg' },
  { id: 24, name: 'Beyaynetu (fasting platter)', price: 180, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥗', image: '/images/beyaynetu-fasting-platter.jpg' },
  { id: 25, name: 'Gomen', price: 110, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥬', image: '/images/gomen.jpg' },
  { id: 26, name: 'Tibs', price: 240, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/tibs.jpg' },
  { id: 27, name: 'Doro tibs', price: 260, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍗', image: '/images/doro-tibs.jpg' },
  { id: 28, name: 'Yebeg tibs (lamb)', price: 300, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍖', image: '/images/yebeg-tibs-lamb.jpg' },
  { id: 29, name: 'Zilzil tibs', price: 270, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/zilzil-tibs.jpg' },
  { id: 30, name: 'Shekla tibs', price: 290, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍲', image: '/images/shekla-tibs.jpg' },
  { id: 31, name: 'Kitfo', price: 320, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: false, emoji: '🥩', image: '/images/kitfo.jpg' },
  { id: 32, name: 'Kitfo special', price: 360, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/kitfo-special.jpg' },
  { id: 33, name: 'Gored gored', price: 350, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/gored-gored.jpg' },
  { id: 34, name: 'Asa goulash (fish)', price: 220, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🐟', image: '/images/asa-goulash-fish.jpg' },
  { id: 35, name: 'Asa cutlet (fish)', price: 200, region: 'habesha', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🐟', image: '/images/asa-cutlet-fish.jpg' },
  { id: 36, name: 'Pancakes', price: 140, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥞', image: '/images/pancakes.jpg' },
  { id: 37, name: 'Omelette', price: 120, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍳', image: '/images/omelette.jpg' },
  { id: 38, name: 'Cheese omelette', price: 150, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🧀', image: '/images/cheese-omelette.jpg' },
  { id: 39, name: 'Scrambled eggs on toast', price: 130, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍞', image: '/images/scrambled-eggs-on-toast.jpg' },
  { id: 40, name: 'Fried eggs', price: 100, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍳', image: '/images/fried-eggs.jpg' },
  { id: 41, name: 'French toast', price: 140, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🍞', image: '/images/french-toast.jpg' },
  { id: 42, name: 'Oatmeal porridge', price: 90, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥣', image: '/images/oatmeal-porridge.jpg' },
  { id: 43, name: 'Cornflakes with milk', price: 80, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥣', image: '/images/cornflakes-with-milk.jpg' },
  { id: 44, name: 'Croissant', price: 80, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥐', image: '/images/croissant.jpg' },
  { id: 45, name: 'Avocado toast', price: 160, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥑', image: '/images/avocado-toast.jpg' },
  { id: 46, name: 'Egg sandwich', price: 110, region: 'foreign', station: 'kitchen', meals: ['breakfast'], available: true, emoji: '🥪', image: '/images/egg-sandwich.jpg' },
  { id: 47, name: 'Fruit salad', price: 100, region: 'foreign', station: 'kitchen', meals: ['breakfast', 'lunch'], available: true, emoji: '🍉', image: '/images/fruit-salad.jpg' },
  { id: 48, name: 'Margherita pizza', price: 350, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍕', image: '/images/margherita-pizza.jpg' },
  { id: 49, name: 'Pepperoni pizza', price: 400, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍕', image: '/images/pepperoni-pizza.jpg' },
  { id: 50, name: 'Beef burger', price: 300, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍔', image: '/images/beef-burger.jpg' },
  { id: 51, name: 'Cheeseburger', price: 320, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍔', image: '/images/cheeseburger.jpg' },
  { id: 52, name: 'Chicken burger', price: 280, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍔', image: '/images/chicken-burger.jpg' },
  { id: 53, name: 'Spaghetti bolognese', price: 280, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍝', image: '/images/spaghetti-bolognese.jpg' },
  { id: 54, name: 'Spaghetti carbonara', price: 300, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍝', image: '/images/spaghetti-carbonara.jpg' },
  { id: 55, name: 'Penne arrabbiata', price: 260, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍝', image: '/images/penne-arrabbiata.jpg' },
  { id: 56, name: 'Lasagna', price: 340, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍝', image: '/images/lasagna.jpg' },
  { id: 57, name: 'Chicken shawarma', price: 220, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🌯', image: '/images/chicken-shawarma.jpg' },
  { id: 58, name: 'Beef shawarma', price: 240, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🌯', image: '/images/beef-shawarma.jpg' },
  { id: 59, name: 'Falafel wrap', price: 180, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🧆', image: '/images/falafel-wrap.jpg' },
  { id: 60, name: 'Fried rice', price: 250, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍚', image: '/images/fried-rice.jpg' },
  { id: 61, name: 'Chicken curry with rice', price: 290, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍛', image: '/images/chicken-curry-with-rice.jpg' },
  { id: 62, name: 'Grilled chicken', price: 330, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍗', image: '/images/grilled-chicken.jpg' },
  { id: 63, name: 'Beef steak', price: 450, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥩', image: '/images/beef-steak.jpg' },
  { id: 64, name: 'Fish and chips', price: 320, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🐟', image: '/images/fish-and-chips.jpg' },
  { id: 65, name: 'Tacos', price: 260, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🌮', image: '/images/tacos.jpg' },
  { id: 66, name: 'Quesadilla', price: 250, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🧀', image: '/images/quesadilla.jpg' },
  { id: 67, name: 'Club sandwich', price: 230, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥪', image: '/images/club-sandwich.jpg' },
  { id: 68, name: 'Caesar salad', price: 200, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥗', image: '/images/caesar-salad.jpg' },
  { id: 69, name: 'Greek salad', price: 190, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥗', image: '/images/greek-salad.jpg' },
  { id: 70, name: 'French fries', price: 90, region: 'foreign', station: 'kitchen', meals: ['breakfast', 'lunch', 'dinner'], available: true, emoji: '🍟', image: '/images/french-fries.jpg' },
  { id: 71, name: 'Chicken wings', price: 280, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍗', image: '/images/chicken-wings.jpg' },
  { id: 72, name: 'Soup of the day', price: 100, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍜', image: '/images/soup-of-the-day.jpg' },
  { id: 73, name: 'Vegetable stir fry', price: 210, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🥦', image: '/images/vegetable-stir-fry.jpg' },
  { id: 74, name: 'Sushi roll', price: 400, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🍣', image: '/images/sushi-roll.jpg' },
  { id: 75, name: 'Hot dog', price: 150, region: 'foreign', station: 'kitchen', meals: ['lunch', 'dinner'], available: true, emoji: '🌭', image: '/images/hot-dog.jpg' },
  { id: 76, name: 'Macchiato', price: 40, region: 'habesha', station: 'bar', kind: 'hot', available: true, emoji: '☕', image: '/images/macchiato.jpg' },
  { id: 77, name: 'Buna (coffee)', price: 30, region: 'habesha', station: 'bar', kind: 'hot', available: true, emoji: '☕', image: '/images/buna-coffee.jpg' },
  { id: 78, name: 'Shai (spiced tea)', price: 25, region: 'habesha', station: 'bar', kind: 'hot', available: true, emoji: '🍵', image: '/images/shai-spiced-tea.jpg' },
  { id: 79, name: 'Ginger tea', price: 30, region: 'habesha', station: 'bar', kind: 'hot', available: true, emoji: '🍵', image: '/images/ginger-tea.jpg' },
  { id: 80, name: 'Cinnamon tea', price: 25, region: 'habesha', station: 'bar', kind: 'hot', available: true, emoji: '🍵', image: '/images/cinnamon-tea.jpg' },
  { id: 81, name: 'Espresso', price: 35, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '☕', image: '/images/espresso.jpg' },
  { id: 82, name: 'Americano', price: 45, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '☕', image: '/images/americano.jpg' },
  { id: 83, name: 'Cappuccino', price: 55, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '☕', image: '/images/cappuccino.jpg' },
  { id: 84, name: 'Latte', price: 60, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '🥛', image: '/images/latte.jpg' },
  { id: 85, name: 'Mocha', price: 65, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '🍫', image: '/images/mocha.jpg' },
  { id: 86, name: 'Hot chocolate', price: 70, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '🍫', image: '/images/hot-chocolate.jpg' },
  { id: 87, name: 'Black tea', price: 20, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '🫖', image: '/images/black-tea.jpg' },
  { id: 88, name: 'Green tea', price: 25, region: 'foreign', station: 'bar', kind: 'hot', available: true, emoji: '🍵', image: '/images/green-tea.jpg' },
  { id: 89, name: 'Iced coffee', price: 60, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🧊', image: '/images/iced-coffee.jpg' },
  { id: 90, name: 'Iced latte', price: 70, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🧊', image: '/images/iced-latte.jpg' },
  { id: 91, name: 'Iced tea', price: 45, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🧊', image: '/images/iced-tea.jpg' },
  { id: 92, name: 'Lemonade', price: 40, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🍋', image: '/images/lemonade.jpg' },
  { id: 93, name: 'Coca-Cola', price: 35, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🥤', image: '/images/coca-cola.jpg' },
  { id: 94, name: 'Pepsi', price: 35, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🥤', image: '/images/pepsi.jpg' },
  { id: 95, name: 'Fanta', price: 35, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🍊', image: '/images/fanta.jpg' },
  { id: 96, name: 'Sprite', price: 35, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🥤', image: '/images/sprite.jpg' },
  { id: 97, name: 'Mineral water', price: 20, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '💧', image: '/images/mineral-water.jpg' },
  { id: 98, name: 'Sparkling water', price: 30, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '💧', image: '/images/sparkling-water.jpg' },
  { id: 99, name: 'Vanilla milkshake', price: 100, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🥤', image: '/images/vanilla-milkshake.jpg' },
  { id: 100, name: 'Chocolate milkshake', price: 100, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🥤', image: '/images/chocolate-milkshake.jpg' },
  { id: 101, name: 'Strawberry smoothie', price: 90, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🍓', image: '/images/strawberry-smoothie.jpg' },
  { id: 102, name: 'Banana smoothie', price: 90, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '🍌', image: '/images/banana-smoothie.jpg' },
  { id: 103, name: 'Energy drink', price: 80, region: 'foreign', station: 'bar', kind: 'cold', available: true, emoji: '⚡', image: '/images/energy-drink.jpg' },
  { id: 104, name: 'Avocado juice', price: 70, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🥑', image: '/images/avocado-juice.jpg' },
  { id: 105, name: 'Mango juice', price: 70, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🥭', image: '/images/mango-juice.jpg' },
  { id: 106, name: 'Papaya juice', price: 60, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🍹', image: '/images/papaya-juice.jpg' },
  { id: 107, name: 'Guava juice', price: 65, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🍹', image: '/images/guava-juice.jpg' },
  { id: 108, name: 'Spris (layered juice)', price: 70, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🥭', image: '/images/spris-layered-juice.jpg' },
  { id: 109, name: 'Fresh juice', price: 60, region: 'habesha', station: 'bar', kind: 'juice', available: false, emoji: '🍹', image: '/images/fresh-juice.jpg' },
  { id: 110, name: 'Watermelon juice', price: 60, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🍉', image: '/images/watermelon-juice.jpg' },
  { id: 111, name: 'Carrot juice', price: 55, region: 'habesha', station: 'bar', kind: 'juice', available: true, emoji: '🥕', image: '/images/carrot-juice.jpg' },
  { id: 112, name: 'Orange juice', price: 65, region: 'foreign', station: 'bar', kind: 'juice', available: true, emoji: '🍊', image: '/images/orange-juice.jpg' },
  { id: 113, name: 'Pineapple juice', price: 65, region: 'foreign', station: 'bar', kind: 'juice', available: true, emoji: '🍍', image: '/images/pineapple-juice.jpg' },
  { id: 114, name: 'Apple juice', price: 65, region: 'foreign', station: 'bar', kind: 'juice', available: true, emoji: '🍎', image: '/images/apple-juice.jpg' },
  { id: 115, name: 'Tej (honey wine)', price: 120, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🍯', image: '/images/tej-honey-wine.jpg' },
  { id: 116, name: 'Tella (local beer)', price: 60, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🍺', image: '/images/tella-local-beer.jpg' },
  { id: 117, name: 'Besso', price: 40, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🥛', image: '/images/besso.jpg' },
  { id: 118, name: 'Shamita', price: 40, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🥛', image: '/images/shamita.jpg' },
  { id: 119, name: 'Atmit', price: 40, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🥣', image: '/images/atmit.jpg' },
  { id: 120, name: 'Ergo (yogurt)', price: 45, region: 'habesha', station: 'bar', kind: 'traditional', available: true, emoji: '🥛', image: '/images/ergo-yogurt.jpg' },
]
const upgrade = old => [
  ...MENU.map(d => { const o = old.find(x => x.name === d.name); return o ? { ...d, price: o.price, available: o.available } : d }),
  ...old.filter(x => x.id >= 1e9).map(x => ({ region: 'habesha', ...x })),
]
const WAITERS = [{ id: 'w1', name: 'Hanna' }, { id: 'w2', name: 'Samuel' }, { id: 'w3', name: 'Meron' }]

function useStored(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init } catch { return init }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  useEffect(() => {
    const on = e => { if (e.key === key) setV(e.newValue ? JSON.parse(e.newValue) : init) }
    window.addEventListener('storage', on)
    return () => window.removeEventListener('storage', on)
  }, [key]) // eslint-disable-line
  return [v, setV]
}

function useNow() {
  const [n, setN] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setN(Date.now()), 30000); return () => clearInterval(t) }, [])
  return [n, setN]
}

async function sha(t) {
  if (!crypto.subtle) return btoa(unescape(encodeURIComponent(t)))
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('')
}

const when = t => new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
function ago(t, now) {
  const m = Math.max(0, Math.floor((now - t) / 60000))
  if (m < 1) return 'just now'
  if (m < 60) return `${m} min ago`
  if (m < 1440) return `${Math.floor(m / 60)} h ${m % 60} min ago`
  return `${Math.floor(m / 1440)} d ago`
}

// Each order has one status per station (kitchen / bar); the cashier sees the combined status.
function info(o, station) {
  if (station) { const x = o.st[station]; return { items: o.items.filter(i => i.station === station), s: x.s, at: x.at } }
  const ss = Object.values(o.st), all = ss.every(x => x.s === 'completed')
  return { items: o.items, s: all ? 'completed' : ss.some(x => x.s !== 'new') ? 'preparing' : 'new', at: all ? Math.max(...ss.map(x => x.at)) : undefined }
}
const live = (o, now) => { const { at } = info(o); return !at || now - at < DAY }

function OrderCard({ o, waiters, now, station, action }) {
  const w = waiters.find(x => x.id === o.waiterId), v = info(o, station)
  return (
    <article className={`order ${v.s}`}>
      <header>
        <div className="no">{o.no}</div>
        <div><h3>Order {o.no}</h3><p className="meta">Waiter: {w ? w.name : 'Removed'}</p></div>
        <span className="badge">{LABEL[v.s]}</span>
      </header>
      <ul>{v.items.map(i => <li key={i.id}>{i.qty} × {i.name}</li>)}</ul>
      <p className="meta">Placed {when(o.createdAt)} ({ago(o.createdAt, now)})</p>
      {v.at && <p className="meta">Completed {when(v.at)}</p>}
      {!station && <p className="meta">{Object.entries(o.st).map(([k, x]) => `${ROLE[k]}: ${LABEL[x.s].toLowerCase()}`).join(', ')}</p>}
      <footer>{!station ? <strong>{o.total} birr</strong> : <span />}{action}</footer>
    </article>
  )
}

// ---- Real food photos --------------------------------------------------------------------------
// If an item has no photo of its own, Cafe Me looks one up online (Wikipedia, then TheMealDB for foreign
// food, then Wikimedia Commons) and remembers it in this browser. No match means the emoji tile stays.
const HINT = {
  'Doro wat': 'Doro_wat',
  'Tibs': 'Tibs',
  'Doro tibs': 'Tibs',
  'Yebeg tibs (lamb)': 'Tibs',
  'Zilzil tibs': 'Tibs',
  'Shekla tibs': 'Tibs',
  'Kitfo': 'Kitfo',
  'Kitfo special': 'Kitfo',
  'Shiro': 'Shiro_(food)',
  'Tegabino shiro': 'Shiro_(food)',
  'Bozena shiro': 'Shiro_(food)',
  'Genfo': 'Genfo',
  'Ful': 'Ful_medames',
  'Tej (honey wine)': 'Tej',
  'Macchiato': 'Caffè_macchiato',
  'Buna (coffee)': 'Ethiopian_coffee_ceremony',
  'Ginger tea': 'Ginger_tea',
  'Fresh juice': 'Juice',
  'Pancakes': 'Pancake',
  'Omelette': 'Omelette',
  'French toast': 'French_toast',
  'Oatmeal porridge': 'Oatmeal',
  'Cornflakes with milk': 'Corn_flakes',
  'Croissant': 'Croissant',
  'Avocado toast': 'Avocado_toast',
  'Fruit salad': 'Fruit_salad',
  'Margherita pizza': 'Pizza_Margherita',
  'Beef burger': 'Hamburger',
  'Cheeseburger': 'Cheeseburger',
  'Chicken burger': 'Chicken_sandwich',
  'Spaghetti bolognese': 'Bolognese_sauce',
  'Spaghetti carbonara': 'Carbonara',
  'Lasagna': 'Lasagne',
  'Chicken shawarma': 'Shawarma',
  'Beef shawarma': 'Shawarma',
  'Falafel wrap': 'Falafel',
  'Fried rice': 'Fried_rice',
  'Beef steak': 'Steak',
  'Fish and chips': 'Fish_and_chips',
  'Tacos': 'Taco',
  'Quesadilla': 'Quesadilla',
  'Club sandwich': 'Club_sandwich',
  'Caesar salad': 'Caesar_salad',
  'Greek salad': 'Greek_salad',
  'French fries': 'French_fries',
  'Chicken wings': 'Buffalo_wing',
  'Sushi roll': 'Sushi',
  'Hot dog': 'Hot_dog',
  'Soup of the day': 'Soup',
  'Espresso': 'Espresso',
  'Americano': 'Caffè_Americano',
  'Cappuccino': 'Cappuccino',
  'Latte': 'Caffè_latte',
  'Mocha': 'Caffè_mocha',
  'Hot chocolate': 'Hot_chocolate',
  'Black tea': 'Black_tea',
  'Green tea': 'Green_tea',
  'Iced coffee': 'Iced_coffee',
  'Iced latte': 'Iced_coffee',
  'Iced tea': 'Iced_tea',
  'Lemonade': 'Lemonade',
  'Coca-Cola': 'Coca-Cola',
  'Pepsi': 'Pepsi',
  'Fanta': 'Fanta',
  'Sprite': 'Sprite_(drink)',
  'Mineral water': 'Mineral_water',
  'Sparkling water': 'Carbonated_water',
  'Vanilla milkshake': 'Milkshake',
  'Chocolate milkshake': 'Milkshake',
  'Strawberry smoothie': 'Smoothie',
  'Banana smoothie': 'Smoothie',
  'Energy drink': 'Energy_drink',
  'Orange juice': 'Orange_juice',
  'Pineapple juice': 'Pineapple_juice',
  'Apple juice': 'Apple_juice',
  'Carrot juice': 'Carrot_juice',
}
const PHOTO_KEY = 'cafeme-photos'
const photoMemo = (() => { try { return JSON.parse(localStorage.getItem(PHOTO_KEY)) || {} } catch { return {} } })()
const plain = n => n.replace(/\s*\(.*?\)/g, '').trim()
const getJson = u => fetch(u).then(r => (r.ok ? r.json() : null)).catch(() => null)
async function wikiPhoto(title) {
  const j = await getJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
  const t = j && j.thumbnail && j.thumbnail.source, o = j && j.originalimage && j.originalimage.source
  return t && !/\.svg/i.test(o || t) ? t : null // skip logos and drawings
}
async function mealPhoto(q) {
  const j = await getJson(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`)
  const hit = j && j.meals && j.meals.find(x => x.strMeal.toLowerCase().includes(q.toLowerCase()))
  return hit ? hit.strMealThumb : null
}
async function commonsPhoto(q) {
  const j = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=8&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&prop=imageinfo&iiprop=url|mime&iiurlwidth=320&format=json&origin=*`)
  const key = q.toLowerCase().split(' ').filter(w => w !== 'ethiopian')[0]
  const pages = Object.values((j && j.query && j.query.pages) || {}).sort((a, b) => a.index - b.index)
  const hit = pages.find(p => p.imageinfo && p.imageinfo[0].mime === 'image/jpeg' && p.title.toLowerCase().includes(key))
  return hit ? hit.imageinfo[0].thumburl : null // the file name must contain the dish name, so we never show a random photo
}
let active = 0
const waiting = []
const pump = () => { while (active < 4 && waiting.length) { active++; waiting.shift()() } }
const limited = job => new Promise(done => { waiting.push(() => job().then(done, () => done(null)).finally(() => { active--; pump() })); pump() })
const inflight = {}
function findPhoto(m) {
  if (photoMemo[m.name]) return Promise.resolve(photoMemo[m.name])
  if (!inflight[m.name]) {
    inflight[m.name] = limited(async () => {
      const q = plain(m.name), food = m.station !== 'bar'
      const tries = [
        () => HINT[m.name] && wikiPhoto(HINT[m.name]),
        () => food && m.region === 'foreign' && mealPhoto(q),
        () => commonsPhoto(m.region === 'habesha' ? 'Ethiopian ' + q : q),
      ]
      for (const t of tries) { const u = await t(); if (u) return u }
      return null
    }).then(u => {
      if (u) { photoMemo[m.name] = u; try { localStorage.setItem(PHOTO_KEY, JSON.stringify(photoMemo)) } catch { /* storage unavailable */ } }
      return u
    })
  }
  return inflight[m.name]
}

const hue = t => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7)
function Thumb({ m }) {
  const [own, setOwn] = useState(true) // false once the saved or uploaded photo fails to load
  const [auto, setAuto] = useState(photoMemo[m.name]) // undefined = not looked up yet, '' = nothing found
  const [autoOk, setAutoOk] = useState(true)
  useEffect(() => setOwn(true), [m.image])
  const needAuto = !m.image || !own
  useEffect(() => {
    if (!needAuto || auto !== undefined) return
    let live = true
    findPhoto(m).then(u => { if (live) setAuto(u || '') })
    return () => { live = false }
  }, [needAuto, auto, m.name]) // eslint-disable-line
  const src = m.image && own ? m.image : auto && autoOk ? auto : null
  return src
    ? <img className="thumb" src={src} alt={m.name} loading="lazy" onError={() => (src === m.image ? setOwn(false) : setAutoOk(false))} />
    : <span className="thumb ph" style={{ background: `hsl(${hue(m.name)} 70% 92%)` }} aria-hidden="true">{m.emoji || (m.station === 'bar' ? '🥤' : '🍽️')}</span>
}

// Dish type (shown on the photo tag and in the Types bar) and a short description for every built-in item.
const TYPE_RANGES = {
  'Ethiopian Breakfast': [[1, 12]], 'Wat (Stew)': [[13, 19]], 'Fasting Food': [[20, 20], [24, 25]], 'Shiro': [[21, 23]], 'Tibs': [[26, 30]],
  'Kitfo & Raw': [[31, 33]], 'Fish': [[34, 35]], 'Breakfast': [[36, 36], [41, 45]], 'Eggs': [[37, 40]], 'Sandwich': [[46, 46], [67, 67], [75, 75]],
  'Salad': [[47, 47], [68, 69]], 'Pizza': [[48, 49]], 'Burger': [[50, 52]], 'Pasta': [[53, 56]], 'Wraps': [[57, 59]], 'Rice & Asian': [[60, 61], [73, 74]],
  'Grill': [[62, 64], [71, 71]], 'Mexican': [[65, 66]], 'Fries': [[70, 70]], 'Soup': [[72, 72]],
  'Buna (Coffee)': [[77, 77]], 'Coffee': [[76, 76], [81, 85], [89, 90]], 'Tea': [[78, 80], [87, 88], [91, 91]], 'Hot Chocolate': [[86, 86]],
  'Soft Drink': [[92, 96], [103, 103]], 'Water': [[97, 98]], 'Shake & Smoothie': [[99, 102]], 'Juice': [[104, 114]], 'Traditional Drink': [[115, 120]],
}
const TYPE_BY_ID = {}
Object.entries(TYPE_RANGES).forEach(([t, rs]) => rs.forEach(([a, b]) => { for (let i = a; i <= b; i++) TYPE_BY_ID[i] = t }))
const typeOf = m => m.type || TYPE_BY_ID[m.id] || (m.station === 'bar' ? KIND[m.kind] || 'Drink' : 'Food')
const DESC = {
  1: 'Shredded flatbread tossed in spiced butter, served with honey', 2: 'Torn injera simmered in spicy berbere sauce', 3: 'Firfir scrambled with eggs and green pepper',
  4: 'Firfir with dried, spiced beef', 5: 'Soft layered pancake with honey or butter', 6: 'Stewed fava beans with oil, onion and chili',
  7: 'Thick barley porridge with spiced butter and berbere', 8: 'Cracked wheat porridge with niter kibbeh', 9: 'Sweet spiced bread served with honey',
  10: 'Fresh Ethiopian bread with butter', 11: 'Fresh cottage cheese with collard greens', 12: 'Minced tripe and beef sauteed with chili and spices',
  13: 'Chicken stew in berbere with a boiled egg', 14: 'Spicy beef stew in berbere sauce', 15: 'Rich beef stew with onions and spices', 16: 'Mild turmeric stew, no chili',
  17: 'Red lentil stew in berbere', 18: 'Cabbage, carrot and potato in mild sauce', 19: 'Potatoes and carrots in a gentle stew', 20: 'Green beans and carrots sauteed with garlic',
  21: 'Smooth chickpea stew with garlic and spices', 22: 'Shiro simmered and served bubbling hot', 23: 'Shiro with spiced butter and herbs',
  24: 'Assorted vegetarian dishes served on injera', 25: 'Collard greens cooked with garlic and ginger', 26: 'Sauteed beef cubes with onion and pepper',
  27: 'Chicken sauteed with onion, rosemary and spices', 28: 'Tender lamb pieces sauteed with herbs', 29: 'Strips of beef fried crisp with onion and chili',
  30: 'Beef tibs served sizzling in a clay pot', 31: 'Minced raw beef with mitmita and spiced butter', 32: 'Kitfo with ayib and gomen on the side',
  33: 'Cubes of raw beef with awaze and mitmita', 34: 'Fish stew with tomato, onion and spices', 35: 'Crispy fried fish fillet with a squeeze of lemon',
  36: 'Fluffy stack with syrup and butter', 37: 'Three-egg omelette with onion and tomato', 38: 'Three-egg omelette folded with melted cheese',
  39: 'Creamy scrambled eggs on buttered toast', 40: 'Two sunny-side-up eggs', 41: 'Golden egg-dipped bread with syrup', 42: 'Warm oats with milk and honey',
  43: 'Crunchy cornflakes with cold milk', 44: 'Buttery, flaky French pastry', 45: 'Smashed avocado on toasted bread', 46: 'Fried egg, cheese and lettuce in a bun',
  47: 'Seasonal fresh fruit, chilled', 48: 'Tomato, mozzarella and fresh basil', 49: 'Pepperoni and mozzarella on a stone-baked base',
  50: 'Grilled beef patty with lettuce and tomato', 51: 'Beef patty with melted cheese and pickles', 52: 'Crispy chicken fillet with lettuce and sauce',
  53: 'Spaghetti in slow-cooked meat sauce', 54: 'Creamy sauce with egg, cheese and beef bacon', 55: 'Penne in spicy tomato and garlic sauce',
  56: 'Layers of pasta, meat sauce and cheese', 57: 'Marinated chicken wrapped with garlic sauce', 58: 'Spiced beef wrapped with tahini and pickles',
  59: 'Crispy chickpea falafel with salad in a wrap', 60: 'Wok-fried rice with vegetables and egg', 61: 'Chicken in mild curry sauce on steamed rice',
  62: 'Herb-marinated chicken grilled to order', 63: 'Grilled beef steak with pepper sauce', 64: 'Battered fish fillet with golden fries',
  65: 'Soft tortillas with spiced beef and salsa', 66: 'Grilled tortilla filled with cheese and chicken', 67: 'Toasted triple-decker with chicken and egg',
  68: 'Romaine, parmesan and croutons with dressing', 69: 'Tomato, cucumber, olives and feta', 70: 'Crispy golden fries with salt', 71: 'Crispy wings with a spicy glaze',
  72: 'Fresh homemade soup, ask the waiter', 73: 'Mixed vegetables tossed in a light soy sauce', 74: 'Rice and fresh fillings rolled in seaweed', 75: 'Grilled sausage in a soft bun with mustard',
  76: 'Espresso marked with a spot of steamed milk', 77: 'Traditional Ethiopian coffee, freshly roasted', 78: 'Black tea brewed with cloves and cinnamon', 79: 'Hot tea with fresh ginger',
  80: 'Hot tea with a cinnamon stick', 81: 'Strong single shot of espresso', 82: 'Espresso with hot water', 83: 'Espresso with steamed milk foam', 84: 'Espresso with plenty of steamed milk',
  85: 'Espresso, chocolate and steamed milk', 86: 'Rich cocoa with steamed milk', 87: 'Classic black tea', 88: 'Light and refreshing green tea', 89: 'Chilled coffee over ice',
  90: 'Espresso and cold milk over ice', 91: 'Chilled tea with lemon', 92: 'Fresh lemon, sugar and cold water', 93: 'Ice-cold cola', 94: 'Ice-cold cola', 95: 'Ice-cold orange soda',
  96: 'Ice-cold lemon-lime soda', 97: 'Still bottled water', 98: 'Sparkling bottled water', 99: 'Thick vanilla ice cream shake', 100: 'Thick chocolate ice cream shake',
  101: 'Fresh strawberries blended with milk', 102: 'Fresh bananas blended with milk', 103: 'Chilled energy drink', 104: 'Thick, creamy fresh avocado juice', 105: 'Fresh ripe mango juice',
  106: 'Fresh papaya juice', 107: 'Fresh guava juice', 108: 'Avocado and mango layered in one glass', 109: 'Seasonal fruit juice of the day', 110: 'Fresh pressed watermelon',
  111: 'Fresh carrot juice', 112: 'Freshly squeezed oranges', 113: 'Sweet pineapple juice', 114: 'Fresh pressed apple juice', 115: 'Traditional Ethiopian honey wine',
  116: 'Home-brewed local beer', 117: 'Roasted barley drink, served cold', 118: 'Traditional cereal drink', 119: 'Warm oat and barley drink', 120: 'Thick, cool Ethiopian yogurt',
}
const descOf = m => m.desc || DESC[m.id] || ''

// Shared filters: a scrolling category bar (All / Food / Drinks / Habesha / Foreign) and a scrolling "Types" bar.
const CATS = [['all', 'All Categories', ''], ['food', 'Food', '🍴'], ['drinks', 'Drinks', '🍸'], ['habesha', 'Habesha Food', '🍲'], ['foreign', 'Foreign Food', '🍕']]
const cardIcon = m => (m.station === 'bar' ? '🍸' : '🍴')
function useFilter(menu = []) {
  const [f, setF] = useState({ cat: 'all', type: 'all' })
  const inCat = m => !((f.cat === 'food' && m.station !== 'kitchen') || (f.cat === 'drinks' && m.station !== 'bar')
    || ((f.cat === 'habesha' || f.cat === 'foreign') && m.region !== f.cat))
  const types = [...new Set(menu.filter(inCat).map(typeOf))].sort((x, y) => x.localeCompare(y))
  const pass = m => inCat(m) && (f.type === 'all' || typeOf(m) === f.type)
  const filters = <>
    <div className="catbar">
      {CATS.map(([k, l, ic]) => <button key={k} className={f.cat === k ? 'on' : ''} onClick={() => setF({ cat: k, type: 'all' })}>{ic && <i>{ic}</i>}{l}</button>)}
    </div>
    <div className="typebar">
      <b>TYPES:</b>
      {['all', ...types].map(k => <button key={k} className={f.type === k ? 'on' : ''} onClick={() => setF(x => ({ ...x, type: k }))}>{k === 'all' ? 'All' : k}</button>)}
    </div>
  </>
  return [pass, filters]
}

// Shrinks an uploaded photo so it fits comfortably in localStorage.
const shrink = file => new Promise(done => {
  const r = new FileReader()
  r.onerror = () => done('')
  r.onload = () => {
    const im = new Image()
    im.onerror = () => done('')
    im.onload = () => {
      const k = Math.min(1, 240 / Math.max(im.width, im.height)), c = document.createElement('canvas')
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k)
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height)
      done(c.toDataURL('image/jpeg', 0.75))
    }
    im.src = r.result
  }
  r.readAsDataURL(file)
})

function MenuBoard({ menu }) {
  const [pass, filters] = useFilter(menu)
  const shown = menu.filter(pass)
  return (
    <>
      <div className="hero">
        <div className="ht"><h1>Menu 📖</h1></div>
        <p>{menu.length} items, {menu.filter(m => m.available).length} available right now. Change availability and photos in Menu & staff.</p>
      </div>
      <section className="panel">
        {filters}
        <p className="meta">Photos come from Wikipedia, Wikimedia Commons and TheMealDB. Use the 📷 button in Menu & staff to put your own photo on any item.</p>
        <div className="dishes">
          {shown.length ? shown.map(m => (
            <article key={m.id} className={m.available ? 'card' : 'card off'}>
              <div className="pic">
                <Thumb m={m} />
                <span className="ctag">{cardIcon(m)} {typeOf(m)}</span>
              </div>
              <h3 title={m.name}>{m.name}</h3>
                <p className="desc">{descOf(m)}</p>
              <div className="buy">
                <b>ETB {Number(m.price).toFixed(2)}</b>
                {!m.available && <span className="badge off">Unavailable</span>}
              </div>
            </article>
          )) : <p>No items match.</p>}
        </div>
      </section>
    </>
  )
}

function Hero({ title, emoji, sub, chips, actions, acting, back }) {
  return (
    <div className="hero">
      <div className="ht"><h1>{title} {emoji}</h1><p>{sub}</p></div>
      <div className="chips">{chips.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
      <div className="acts">{actions}{acting && <div className="acting"><span>Admin mode<b>Acting as {title.split(' ')[0]}</b></span><button onClick={back}>← Back</button></div>}</div>
    </div>
  )
}
const today = () => new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

function Auth({ users, setUsers, onIn, signup }) {
  const first = !users.length
  const [mode, setMode] = useState('in')
  const [err, setErr] = useState('')
  const m = first ? 'up' : signup ? mode : 'in'
  const submit = async e => {
    e.preventDefault()
    const f = new FormData(e.target), username = f.get('username').trim().toLowerCase(), password = f.get('password')
    if (!username || password.length < 4) return setErr('Enter your email or username and a password of at least 4 characters.')
    if (m === 'up' && !/^\S{3,}$/.test(username)) return setErr('Use at least 3 characters with no spaces for your email or username.')
    const hash = await sha(username + ':' + password)
    if (m === 'in') {
      const u = users.find(x => x.username === username && x.hash === hash)
      return u ? onIn(u.username) : setErr('Wrong username or password.')
    }
    if (users.some(x => x.username === username)) return setErr('That email or username already has an account.')
    setUsers(us => [...us, { username, hash, name: f.get('name').trim() || username, role: first ? 'admin' : ['cashier', 'kitchen', 'bar'].includes(f.get('role')) ? f.get('role') : 'cashier', ...(first ? {} : { new: true, at: Date.now() }) }])
    onIn(username, !first)
  }
  return (
    <div className="gate">
      <div className="auth">
        <aside className="aside">
          <div className="emblem">☕</div>
          <div className="script">Cafe Me</div>
          <p className="lead">Premium Coffee Experience</p>
          <p className="tag">"Your Daily Dose of Happiness ☕"</p>
        </aside>
        <form className="formside" onSubmit={submit}>
          <h1>{m === 'up' ? 'Register' : 'Secure Login'}</h1>
          <p className="lead">{first ? 'Create your account to get started.' : m === 'up' ? 'Pick your job, add your details and you are in.' : 'Sign in to your page.'}</p>
          {!first && signup && <div className="modes">
            <button type="button" className={m === 'in' ? 'on' : ''} onClick={() => { setMode('in'); setErr('') }}>Sign in</button>
            <button type="button" className={m === 'up' ? 'on' : ''} onClick={() => { setMode('up'); setErr('') }}>Register</button>
          </div>}
          {m === 'up' && <label>Full name<input name="name" autoComplete="name" /></label>}
          <label>Email or username<input name="username" autoComplete="username" placeholder="you@cafe.com" /></label>
          <label>Password<input name="password" type="password" autoComplete={m === 'in' ? 'current-password' : 'new-password'} /></label>
          {m === 'up' && !first && <fieldset className="jobs"><legend>Your job</legend>
            {[['cashier', '🧾 Cashier'], ['kitchen', '🍳 Kitchen'], ['bar', '🍹 Bar']].map(([k, l], i) =>
              <label key={k}><input type="radio" name="role" value={k} defaultChecked={i === 0} /><span>{l}</span></label>)}
          </fieldset>}
          {err && <p className="err" role="alert">{err}</p>}
          <button className="go">{m === 'in' ? '➜ Enter Portal' : 'Register'}</button>
        </form>
      </div>
    </div>
  )
}

function Cashier({ menu, waiters, orders, now, place, acting, back, refresh }) {
  const [waiter, setWaiter] = useState(null)
  const [cart, setCart] = useState({})
  const [q, setQ] = useState('')
  const [pass, filters] = useFilter(menu)
  const lines = menu.filter(m => m.available && cart[m.id]).map(m => ({ id: m.id, name: m.name, price: m.price, station: m.station, qty: cart[m.id] }))
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const bump = (id, d) => setCart(c => {
    const n0 = (c[id] || 0) + d, n = { ...c }
    if (n0 <= 0) delete n[id]; else n[id] = n0
    return n
  })
  const submit = () => { place({ waiterId: waiter, items: lines, total }); setCart({}); setWaiter(null) }
  const sts = orders.map(o => info(o).s)
  const shown = menu.filter(m => pass(m) && m.name.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <>
      <Hero title="Cashier Dashboard" emoji="🧾" sub={today()} acting={acting} back={back} actions={<button onClick={refresh}>↻ Refresh</button>}
        chips={[[orders.length, 'Orders'], [`ETB ${orders.reduce((a, o) => a + o.total, 0).toLocaleString()}`, 'Revenue'], [sts.filter(x => x === 'completed').length, 'Completed'], [sts.filter(x => x !== 'completed').length, 'Pending']]} />
      <div className="pos">
        <section className="panel">
          <input type="search" className="find" placeholder="Search food and drinks..." aria-label="Search the menu" value={q} onChange={e => setQ(e.target.value)} />
          {filters}
          <div className="dishes">
            {shown.map(m => (
              <article key={m.id} className={`card${m.available ? '' : ' off'}${cart[m.id] ? ' in' : ''}`}>
                <div className="pic">
                  <Thumb m={m} />
                  <span className="ctag">{cardIcon(m)} {typeOf(m)}</span>
                  {cart[m.id] > 0 && <b className="qb">{cart[m.id]}</b>}
                </div>
                <h3 title={m.name}>{m.name}</h3>
                <p className="desc">{descOf(m)}</p>
                <div className="buy">
                  <b>ETB {Number(m.price).toFixed(2)}</b>
                  {m.available ? (
                    <span className="qty">
                      {cart[m.id] > 0 && <button onClick={() => bump(m.id, -1)} aria-label={`Remove one ${m.name}`}>−</button>}
                      <button className="plus" onClick={() => bump(m.id, 1)} aria-label={`Add one ${m.name}`}>+</button>
                    </span>
                  ) : <span className="badge off">Unavailable</span>}
                </div>
              </article>
            ))}
          </div>
          {!shown.length && <p className="meta">No items match.</p>}
        </section>
        <aside className="panel cartp">
          <h2>Current order <small>{count} {count === 1 ? 'item' : 'items'}</small></h2>
          <fieldset>
            <legend>Waiter serving (tick one)</legend>
            {waiters.map(w => {
              const busy = orders.filter(o => o.waiterId === w.id && info(o).s !== 'completed').length
              return (
                <label key={w.id} className="check">
                  <input type="checkbox" checked={waiter === w.id} onChange={() => setWaiter(waiter === w.id ? null : w.id)} />
                  <span>{w.name}<small className={busy ? 'busy' : ''}>{busy ? `Serving ${busy} ${busy === 1 ? 'order' : 'orders'} now` : 'Free'}</small></span>
                </label>
              )
            })}
            {!waiters.length && <p className="meta">No waiters yet. Ask the admin to add some.</p>}
          </fieldset>
          <p className="chosen">{waiter ? <>Waiter for this order: <b>{waiters.find(w => w.id === waiter)?.name}</b></> : 'No waiter chosen yet.'}</p>
          {lines.length ? (
            <ul className="menu">
              {lines.map(l => (
                <li key={l.id}>
                  <span>{l.name}<small>{l.price} birr each</small></span>
                  <span className="qty">
                    <button onClick={() => bump(l.id, -1)} aria-label={`Remove one ${l.name}`}>−</button>
                    <b>{l.qty}</b>
                    <button onClick={() => bump(l.id, 1)} aria-label={`Add one ${l.name}`}>+</button>
                  </span>
                  <b>{l.price * l.qty}</b>
                </li>
              ))}
            </ul>
          ) : <div className="empty"><span>🧾</span><p>Order is empty. Press the + sign on a dish to add it.</p></div>}
          <div className="total"><strong>Total {total} birr</strong>
            {lines.length > 0 && <button onClick={() => setCart({})}>Clear all</button>}
          </div>
          <button className="primary wide" disabled={!waiter || !lines.length} onClick={submit}>Place order</button>
          {(!waiter || !lines.length) && <p className="meta">Tick a waiter and add at least one item with the + sign.</p>}
        </aside>
      </div>
      <section className="panel" style={{ marginTop: '1rem' }}>
        <h2>Recent orders</h2>
        <p className="meta">Completed orders disappear after 24 hours.</p>
        {orders.length ? <div className="grid">{orders.map(o => <OrderCard key={o.id} o={o} waiters={waiters} now={now} />)}</div> : <p>No orders yet.</p>}
      </section>
    </>
  )
}

function Station({ station, orders, waiters, now, advance, acting, back, refresh }) {
  const [f, setF] = useState('all')
  const bar = station === 'bar', prep = bar ? 'Preparing' : 'Cooking'
  const mine = orders.filter(o => o.st[station] && (o.st[station].s !== 'completed' || now - o.st[station].at < DAY)).sort((a, b) => a.createdAt - b.createdAt)
  const n = k => k === 'all' ? mine.length : mine.filter(o => o.st[station].s === k).length
  const shown = mine.filter(o => f === 'all' || o.st[station].s === f)
  const btn = o => o.st[station].s === 'completed' ? null : <button className="primary" onClick={() => advance(o.id, station)}>{o.st[station].s === 'new' ? `Start ${bar ? 'preparing' : 'cooking'}` : 'Mark completed'}</button>
  return (
    <>
      <Hero title={bar ? 'Bar Dashboard' : 'Kitchen Dashboard'} emoji={bar ? '🍹' : '👨‍🍳'} sub={`${today()}, ${mine.length} ${bar ? 'drink' : 'food'} orders`} acting={acting} back={back}
        chips={[[n('all'), 'Total'], [n('new'), 'Pending'], [n('preparing'), prep], [n('completed'), 'Completed']]} actions={<button onClick={refresh}>↻ Refresh</button>} />
      <section className="panel">
        <div className="pills">{[['new', 'Pending'], ['preparing', prep], ['completed', 'Completed'], ['all', 'All']].map(([k, l]) =>
          <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l} ({n(k)})</button>)}</div>
        <p className="meta">Completed orders disappear after 24 hours.</p>
        {shown.length ? <div className="grid">{shown.map(o => <OrderCard key={o.id} o={o} station={station} waiters={waiters} now={now} action={btn(o)} />)}</div>
          : <div className="empty"><span>{bar ? '🍹' : '🍽️'}</span><p>No orders here. New ones appear as soon as the cashier places them.</p></div>}
      </section>
    </>
  )
}

function Clock() {
  const [t, setT] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i) }, [])
  return <div className="clock">🕒 {t.toLocaleTimeString()}</div>
}

function Overview({ orders, visible, waiters, now, refresh }) {
  const [f, setF] = useState('all')
  const st = o => info(o).s, sum = l => l.reduce((s, o) => s + o.total, 0)
  const done = orders.filter(o => st(o) === 'completed'), open = orders.filter(o => st(o) !== 'completed')
  const shown = visible.filter(o => f === 'all' || st(o) === f)
  const etb = n => `ETB ${n.toLocaleString()}`
  const exportCsv = () => {
    const q = x => `"${String(x).replace(/"/g, '""')}"`
    const rows = [['Order', 'Placed', 'Status', 'Waiter', 'Items', 'Total (birr)'], ...orders.map(o => [o.no, when(o.createdAt), LABEL[st(o)],
      waiters.find(w => w.id === o.waiterId)?.name ?? '', o.items.map(i => `${i.qty} x ${i.name}`).join('; '), o.total])]
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv' }))
    a.download = 'cafe-me-orders.csv'; a.click()
  }
  const cards = [['📋', '#e4ecff', 'Total revenue', etb(sum(orders)), 'All orders', ''], ['💵', '#d9f5e6', 'Collected', etb(sum(done)), 'Completed orders', '#177a4a'],
    ['⏳', '#fff0d6', 'In progress', etb(sum(open)), 'Not finished yet', '#b86e00'], ['🧾', '#f0e4ff', 'Orders', orders.length, 'Placed in total', '#7e3fc7']]
  return (
    <>
      <div className="hero">
        <div className="ht"><h1>All Orders Overview ☕</h1><p>Every order, with revenue at a glance</p></div>
        <div className="acts">
          <button onClick={refresh}>↻ Refresh</button><button onClick={exportCsv}>⭳ Export</button><button onClick={() => window.print()}>🖨 Print</button>
        </div>
        <Clock />
      </div>
      <div className="stats">
        {cards.map(([ic, bg, t, v, sub, c]) => (
          <div className="stat" key={t}><div className="ic" style={{ background: bg }}>{ic}</div><small>{t}</small><b style={{ color: c || undefined }}>{v}</b><span className="meta">{sub}</span></div>
        ))}
      </div>
      <section className="panel">
        <h2>Filter orders</h2>
        <div className="pills">{[['all', 'All'], ['new', 'New'], ['preparing', 'Preparing'], ['completed', 'Completed']].map(([k, l]) =>
          <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>)}</div>
        <p className="meta">Completed orders leave this list after 24 hours. Revenue totals still count them until you delete them in Menu & staff.</p>
        <div className="grid">{shown.length ? shown.map(o => <OrderCard key={o.id} o={o} waiters={waiters} now={now} />) : <p>No orders in this view.</p>}</div>
      </section>
    </>
  )
}

const ymd = t => { const x = new Date(t); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}` }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Daily / monthly / yearly sales report, including which waiter served each order.
function Reports({ orders, waiters }) {
  const [mode, setMode] = useState('day')
  const [d, setD] = useState(ymd(Date.now()))
  const prefix = mode === 'day' ? d : mode === 'month' ? d.slice(0, 7) : d.slice(0, 4)
  const list = orders.filter(o => ymd(o.createdAt).startsWith(prefix)).sort((a, b) => a.createdAt - b.createdAt)
  const st = o => info(o).s
  const sum = l => l.reduce((t, o) => t + o.total, 0)
  const etb = n => `ETB ${Math.round(n).toLocaleString()}`
  const name = id => waiters.find(w => w.id === id)?.name ?? 'Unknown waiter'
  const group = keyOf => { const m = {}; list.forEach(o => { const k = keyOf(o); (m[k] = m[k] || []).push(o) }); return m }
  const perWaiter = Object.entries(group(o => name(o.waiterId))).map(([n, l]) => [n, l.length, sum(l)]).sort((a, b) => b[2] - a[2])
  const sold = {}
  list.forEach(o => o.items.forEach(i => { const x = sold[i.name] = sold[i.name] || { q: 0, t: 0 }; x.q += i.qty; x.t += i.qty * i.price }))
  const top = Object.entries(sold).sort((a, b) => b[1].q - a[1].q).slice(0, 10)
  const itemCount = Object.values(sold).reduce((t, x) => t + x.q, 0)
  const split = mode === 'day' ? null : Object.entries(group(o => ymd(o.createdAt).slice(0, mode === 'month' ? 10 : 7))).sort(([a], [b]) => a.localeCompare(b))
    .map(([k, l]) => [mode === 'month' ? `${Number(k.slice(8))} ${MONTHS[Number(k.slice(5, 7)) - 1]}` : MONTHS[Number(k.slice(5)) - 1], l.length, sum(l)])
  const peak = split ? Math.max(1, ...split.map(x => x[2])) : 1
  const years = [...new Set([...orders.map(o => new Date(o.createdAt).getFullYear()), new Date().getFullYear()])].sort((a, b) => b - a)
  const title = mode === 'day' ? new Date(d + 'T00:00').toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : mode === 'month' ? `${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}` : d.slice(0, 4)
  const exportCsv = () => {
    const q = x => `"${String(x).replace(/"/g, '""')}"`
    const rows = [['Order', 'Placed', 'Status', 'Waiter', 'Items', 'Total (birr)'], ...list.map(o => [o.no, when(o.createdAt), LABEL[st(o)], name(o.waiterId), o.items.map(i => `${i.qty} x ${i.name}`).join('; '), o.total])]
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv' }))
    a.download = `cafe-me-report-${prefix}.csv`; a.click()
  }
  const cards = [['🧾', '#f0e4ff', 'Orders', list.length], ['💰', '#d9f5e6', 'Revenue', etb(sum(list))],
    ['✅', '#e4ecff', 'Completed', etb(sum(list.filter(o => st(o) === 'completed')))], ['🍽️', '#fff0d6', 'Items sold', itemCount]]
  return (
    <>
      <div className="hero">
        <div className="ht"><h1>Sales Reports 📈</h1><p>{title}</p></div>
        <div className="acts"><button onClick={exportCsv} disabled={!list.length}>⭳ Export</button><button onClick={() => window.print()}>🖨 Print</button></div>
      </div>
      <section className="panel">
        <div className="row" style={{ alignItems: 'center' }}>
          <div className="pills" style={{ margin: 0 }}>
            {[['day', 'Daily'], ['month', 'Monthly'], ['year', 'Yearly']].map(([k, l]) => <button key={k} className={mode === k ? 'on' : ''} onClick={() => setMode(k)}>{l}</button>)}
          </div>
          {mode === 'day' && <input type="date" aria-label="Day" value={d} onChange={e => e.target.value && setD(e.target.value)} />}
          {mode === 'month' && <input type="month" aria-label="Month" value={d.slice(0, 7)} onChange={e => e.target.value && setD(e.target.value + '-01')} />}
          {mode === 'year' && <select aria-label="Year" value={d.slice(0, 4)} onChange={e => setD(e.target.value + '-01-01')}>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>}
        </div>
        <p className="meta">Reports count every order placed in the period. Deleting hidden orders in Menu & staff also removes them from the reports.</p>
      </section>
      <div className="stats" style={{ marginTop: '1rem' }}>
        {cards.map(([ic, bg, t, v]) => <div className="stat" key={t}><div className="ic" style={{ background: bg }}>{ic}</div><small>{t}</small><b>{v}</b></div>)}
      </div>
      {!list.length ? <section className="panel"><div className="empty"><span>📭</span><p>No orders in this period.</p></div></section> : (
        <>
          <div className="split">
            <section>
              <h2>Who served</h2>
              <div className="tblwrap"><table className="ptable sm">
                <thead><tr><th>Waiter</th><th>Orders</th><th>Revenue</th></tr></thead>
                <tbody>{perWaiter.map(([n, c, t]) => <tr key={n}><td className="nm">{n}</td><td>{c}</td><td><b>{etb(t)}</b></td></tr>)}</tbody>
              </table></div>
            </section>
            <section>
              <h2>Best sellers</h2>
              <div className="tblwrap"><table className="ptable sm">
                <thead><tr><th>Item</th><th>Sold</th><th>Revenue</th></tr></thead>
                <tbody>{top.map(([n, x]) => <tr key={n}><td className="nm">{n}</td><td>{x.q}</td><td><b>{etb(x.t)}</b></td></tr>)}</tbody>
              </table></div>
            </section>
          </div>
          {split && (
            <section className="panel" style={{ marginTop: '1rem' }}>
              <h2>{mode === 'month' ? 'Sales by day' : 'Sales by month'}</h2>
              <div className="tblwrap"><table className="ptable sm">
                <thead><tr><th>{mode === 'month' ? 'Day' : 'Month'}</th><th>Orders</th><th>Revenue</th><th style={{ width: '40%' }} /></tr></thead>
                <tbody>{split.map(([k, c, t]) => <tr key={k}><td className="nm">{k}</td><td>{c}</td><td><b>{etb(t)}</b></td><td><div className="rbar" style={{ width: `${Math.max(2, t / peak * 100)}%` }} /></td></tr>)}</tbody>
              </table></div>
            </section>
          )}
          <section className="panel" style={{ marginTop: '1rem' }}>
            <h2>Orders in this period</h2>
            <div className="tblwrap"><table className="ptable">
              <thead><tr><th>Order</th><th>Placed</th><th>Served by</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>{list.map(o => (
                <tr key={o.id}><td className="nm">#{o.no}</td><td>{when(o.createdAt)}</td><td><b>{name(o.waiterId)}</b></td>
                  <td>{o.items.map(i => `${i.qty} x ${i.name}`).join(', ')}</td><td><b>{etb(o.total)}</b></td>
                  <td><span className={st(o) === 'completed' ? 'badge ok' : 'badge'}>{LABEL[st(o)]}</span></td></tr>
              ))}</tbody>
            </table></div>
          </section>
        </>
      )}
    </>
  )
}

function Admin({ me, settings, setSettings, users, setUsers, menu, setMenu, waiters, setWaiters, hidden, clearOld }) {
  const [pass, filters] = useFilter(menu)
  const [staffErr, setStaffErr] = useState('')
  const [edit, setEdit] = useState(null), [draft, setDraft] = useState({ name: '', price: '', desc: '' })
  const [ew, setEw] = useState(null), [ewName, setEwName] = useState('')
  const startEdit = m => { setEdit(m.id); setDraft({ name: m.name, price: String(m.price), desc: descOf(m) }) }
  const saveEdit = () => {
    const name = draft.name.trim(), price = Number(draft.price)
    if (!name || !(price > 0)) return
    setMenu(ms => ms.map(x => x.id === edit ? { ...x, name, price, desc: draft.desc.trim() } : x)); setEdit(null)
  }
  const removeItem = m => { if (window.confirm(`Remove ${m.name} from the menu?`)) { setMenu(ms => ms.filter(x => x.id !== m.id)); setEdit(null) } }
  const saveWaiter = () => {
    const name = ewName.trim()
    if (!name) return
    setWaiters(ws => ws.map(w => w.id === ew ? { ...w, name } : w)); setEw(null)
  }
  const addStaff = async e => {
    e.preventDefault()
    const form = e.target, f = new FormData(form), name = f.get('name').trim(), username = f.get('username').trim().toLowerCase(), password = f.get('password')
    if (!/^\S{3,}$/.test(username)) return setStaffErr('Use at least 3 characters with no spaces for the email or username.')
    if (password.length < 4) return setStaffErr('The password needs at least 4 characters.')
    if (users.some(x => x.username === username)) return setStaffErr('That email or username already has an account.')
    const hash = await sha(username + ':' + password)
    setUsers(us => [...us, { username, hash, name: name || username, role: f.get('role') }])
    setStaffErr(''); form.reset()
  }
  const addItem = async e => {
    e.preventDefault()
    const form = e.target, f = new FormData(form), name = f.get('name').trim(), price = Number(f.get('price'))
    if (!name || !(price > 0)) return
    const file = f.get('file')
    const image = file && file.size ? await shrink(file) : f.get('image').trim()
    const cat = f.get('cat')
    const extra = cat.startsWith('drink-') ? { station: 'bar', kind: cat.slice(6) } : { station: 'kitchen', meals: cat === 'all' ? ALLMEALS : [cat] }
    setMenu(m => [...m, { id: Date.now(), name, price, region: f.get('region'), available: true, image, ...extra }]); form.reset()
  }
  const addWaiter = e => {
    e.preventDefault()
    const name = new FormData(e.target).get('name').trim()
    if (!name) return
    setWaiters(w => [...w, { id: 'w' + Date.now(), name }]); e.target.reset()
  }
  return (
    <div className="admin">
      <section className="panel">
        <h2>Menu items</h2>
        {filters}
        <div className="dishes">
          {menu.filter(pass).map(m => (
            <article key={m.id} className={m.available ? 'card' : 'card off'}>
              <div className="pic">
                <Thumb m={m} />
                <span className="ctag">{cardIcon(m)} {typeOf(m)}</span>
              </div>
              {edit === m.id ? (
                <div className="editbox">
                  <input value={draft.name} onChange={e => setDraft(x => ({ ...x, name: e.target.value }))} placeholder="Name" aria-label="Item name" />
                  <input value={draft.desc} onChange={e => setDraft(x => ({ ...x, desc: e.target.value }))} placeholder="Description" aria-label="Description" />
                  <input type="number" min="1" value={draft.price} onChange={e => setDraft(x => ({ ...x, price: e.target.value }))} placeholder="Price (birr)" aria-label="Price in birr" />
                  <div className="row"><button className="primary" onClick={saveEdit}>Save</button><button onClick={() => setEdit(null)}>Cancel</button><button onClick={() => removeItem(m)}>Remove</button></div>
                </div>
              ) : (
                <>
                  <h3 title={m.name}>{m.name}</h3>
                  <p className="desc">{descOf(m)}</p>
                  <div className="buy">
                    <b>ETB {Number(m.price).toFixed(2)}</b>
                    {!m.available && <span className="badge off">Unavailable</span>}
                  </div>
                </>
              )}
              <div className="cardact">
                <button className="photo" title={`Edit ${m.name}`} aria-label={`Edit ${m.name}`} onClick={() => startEdit(m)}>✏️</button>
                <label className="photo" title={`Change photo of ${m.name}`}>📷
                  <input type="file" accept="image/*" hidden onChange={async e => {
                    const file = e.target.files[0], image = file ? await shrink(file) : ''
                    if (image) setMenu(ms => ms.map(x => x.id === m.id ? { ...x, image } : x))
                    e.target.value = ''
                  }} />
                </label>
                <label className="check">
                  <input type="checkbox" checked={m.available} onChange={() => setMenu(ms => ms.map(x => x.id === m.id ? { ...x, available: !x.available } : x))} />
                  Available
                </label>
              </div>
            </article>
          ))}
        </div>
        {!menu.some(pass) && <p className="meta">No items match these filters.</p>}
        <form onSubmit={addItem} className="row">
          <input name="name" placeholder="Item name" aria-label="Item name" />
          <input name="price" type="number" min="1" placeholder="Price" aria-label="Price in birr" />
          <select name="cat" aria-label="Category"><option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option><option value="all">Food, all day</option>
            <option value="drink-hot">Hot drink</option><option value="drink-cold">Cold drink</option><option value="drink-juice">Juice</option><option value="drink-traditional">Traditional drink</option></select>
          <select name="region" aria-label="Region"><option value="habesha">Habesha</option><option value="foreign">Foreign</option></select>
          <input name="image" placeholder="Image link (optional)" aria-label="Image link" />
          <input name="file" type="file" accept="image/*" aria-label="Upload a photo" />
          <button className="primary">Add item</button>
        </form>
      </section>
      <aside className="panel cartp">
        <h2>Staff accounts</h2>
        <p className="meta">Cashiers, bar and kitchen staff sign in and see only their own page. Create their accounts here, or let them sign up themselves.</p>
        <label className="check" style={{ margin: '.3rem 0 .8rem' }}>
          <input type="checkbox" checked={settings.signup !== false} onChange={() => setSettings(x => ({ ...x, signup: x.signup === false }))} />
          Let staff create their own account on the sign-in page
        </label>
        <ul className="menu">
          {users.map(u => (
            <li key={u.username}>
              <span>{u.name}{u.new && <span className="badge ok" style={{ marginLeft: '.5rem' }}>New</span>}<small>{u.username}</small></span>
              {u.username === me ? <span className="badge">You, {ROLE[u.role]}</span> : (
                <span className="qty">
                  <select value={u.role} aria-label={`Role for ${u.name}`} onChange={e => setUsers(us => us.map(x => x.username === u.username ? { ...x, role: e.target.value } : x))}>
                    {Object.keys(ROLE).map(r => <option key={r} value={r}>{ROLE[r]}</option>)}
                  </select>
                  <button onClick={() => setUsers(us => us.filter(x => x.username !== u.username))}>Remove</button>
                </span>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={addStaff} className="row">
          <input name="name" placeholder="Full name" aria-label="Full name" />
          <input name="username" placeholder="Email or username" aria-label="Email or username" autoComplete="off" />
          <input name="password" type="password" placeholder="Password" aria-label="Password" autoComplete="new-password" />
          <select name="role" aria-label="Job"><option value="cashier">Cashier</option><option value="bar">Bar</option><option value="kitchen">Kitchen</option><option value="admin">Admin</option></select>
          <button className="primary">Register</button>
        </form>
        {staffErr && <p role="alert" style={{ color: 'var(--red)' }}>{staffErr}</p>}
        <h2>Waiters</h2>
        <ul className="menu">
          {waiters.map(w => (
            <li key={w.id}>
              {ew === w.id ? (
                <>
                  <input value={ewName} onChange={e => setEwName(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveWaiter()} aria-label="Waiter name" autoFocus style={{ flex: 1 }} />
                  <span className="qty"><button className="primary" onClick={saveWaiter}>Save</button><button onClick={() => setEw(null)}>Cancel</button></span>
                </>
              ) : (
                <>
                  <span>{w.name}</span>
                  <span className="qty">
                    <button onClick={() => { setEw(w.id); setEwName(w.name) }}>Edit</button>
                    <button onClick={() => setWaiters(ws => ws.filter(x => x.id !== w.id))}>Remove</button>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={addWaiter} className="row">
          <input name="name" placeholder="Waiter name" aria-label="Waiter name" />
          <button className="primary">Add waiter</button>
        </form>
        <h2 className="grp">Old orders</h2>
        <p>{hidden} completed {hidden === 1 ? 'order is' : 'orders are'} hidden (older than 24 hours). Deleting them also removes them from the Reports.</p>
        <button onClick={clearOld} disabled={!hidden}>Delete hidden orders</button>
      </aside>
    </div>
  )
}

export default function App() {
  const [users, setUsers] = useStored('cafeme-users', [])
  const [session, setSession] = useStored('cafeme-session', null)
  const [menu, setMenu] = useStored('cafeme-menu-v2', MENU)
  const [settings, setSettings] = useStored('cafeme-settings', { signup: true })
  const [waiters, setWaiters] = useStored('cafeme-waiters', WAITERS)
  const [orders, setOrders] = useStored('cafeme-orders', [])
  const [tab, setTab] = useState(null)
  const [welcome, setWelcome] = useState(false)
  const [now, setNow] = useNow()
  // An older saved menu (no meal or drink type) is upgraded to the full menu automatically.
  useEffect(() => { if (menu.some(m => m.id < 1e9 && !m.meals && !m.kind)) setMenu(upgrade) }, [menu]) // eslint-disable-line

  const user = users.find(u => u.username === session)
  // Accounts registered by staff themselves are flagged "new" until the admin clicks "Got it".
  const fresh = user && user.role === 'admin' ? users.filter(u => u.new) : []
  const clearNew = () => setUsers(us => us.map(u => u.new ? { ...u, new: false } : u))
  useEffect(() => { document.title = fresh.length ? `(${fresh.length} new) Cafe Me` : 'Cafe Me' }, [fresh.length])
  if (!user) return <><style>{CSS}</style><Auth users={users} setUsers={setUsers} onIn={(u, isNew) => { setSession(u); if (isNew) setWelcome(true) }} signup={settings.signup !== false} /></>

  const allowed = TABS[user.role]
  const page = allowed.includes(tab) ? tab : allowed[0] // a role can never open a page it is not allowed
  const groups = user.role === 'admin' ? [[null, ['Overview', 'Reports', 'Menu']], ['Operate as', ['Cashier', 'Bar', 'Kitchen']], ['Manage', ['Manage']]] : [['My work', allowed]]
  const visible = orders.filter(o => live(o, now)).sort((a, b) => b.createdAt - a.createdAt)
  const place = o => setOrders(os => {
    const st = {}
    o.items.forEach(i => { st[i.station] = { s: 'new' } })
    return [...os, { ...o, st, id: crypto.randomUUID(), no: os.reduce((m, x) => Math.max(m, x.no), 0) + 1, createdAt: Date.now() }]
  })
  const advance = (id, station) => setOrders(os => os.map(o => {
    if (o.id !== id) return o
    const x = o.st[station]
    return { ...o, st: { ...o.st, [station]: x.s === 'new' ? { s: 'preparing' } : { s: 'completed', at: Date.now() } } }
  }))
  const bk = { acting: user.role === 'admin', back: () => setTab('Overview'), refresh: () => setNow(Date.now()) }
  const PG = { Cashier: 'pg-cash', Bar: 'pg-bar', Kitchen: 'pg-kit' }
  const signOut = () => { setSession(null); setTab(null) }

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <aside className="side">
          <div className="logo"><i>☕</i><div><b>Cafe Me</b><small>{ROLE[user.role].toUpperCase()}</small></div></div>
          {groups.map(([g, ts]) => (
            <div key={g || 'top'}>
              {g && <div className="grpt">{g}</div>}
              {ts.map(t => (
                <button key={t} className={t === page ? 'nav on' : 'nav'} onClick={() => setTab(t)}>
                  <span>{NAV[t][0]}</span>{NAV[t][1]}{NAV[t][2] && <em className={NAV[t][3]}>{NAV[t][2]}</em>}{t === 'Manage' && fresh.length > 0 && <em className="kit">{fresh.length} new</em>}
                </button>
              ))}
            </div>
          ))}
          <div className="grpt">Account</div>
          <button className="nav" onClick={signOut}><span>🚪</span>Sign out</button>
        </aside>
        <div className="content">
          <header className="top">
            <div className="crumb">🏠 <span>Home ›</span> <b>{NAV[page][1]} - Cafe Me</b></div>
            <div className="chip"><div className="av">{user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</div>
              <div><b>{user.name}</b><div className="meta">{ROLE[user.role]}</div></div></div>
          </header>
          <main>
          {fresh.length > 0 && (
            <div className="notice" role="status">
              <div>{fresh.map(u => <p key={u.username}>🔔 <b>{u.name}</b> ({u.username}) registered as <b>{ROLE[u.role]}</b>, {ago(u.at, now)}</p>)}</div>
              <div className="row"><button className="primary" onClick={() => setTab('Manage')}>Review staff</button><button onClick={clearNew}>Got it</button></div>
            </div>
          )}
          {welcome && user.role !== 'admin' && (
            <div className="notice ok" role="status"><p>✅ You are registered, {user.name}. The admin has been told.</p><button onClick={() => setWelcome(false)}>OK</button></div>
          )}
          <div className={`pg ${PG[page] || ''}`}>
            {page === 'Overview' && user.role === 'admin' && <Overview orders={orders} visible={visible} waiters={waiters} now={now} refresh={() => setNow(Date.now())} />}
            {page === 'Reports' && user.role === 'admin' && <Reports orders={orders} waiters={waiters} />}
            {page === 'Menu' && user.role === 'admin' && <MenuBoard menu={menu} />}
            {page === 'Cashier' && <Cashier menu={menu} waiters={waiters} orders={visible} now={now} place={place} {...bk} />}
            {page === 'Kitchen' && <Station station="kitchen" orders={orders} waiters={waiters} now={now} advance={advance} {...bk} />}
            {page === 'Bar' && <Station station="bar" orders={orders} waiters={waiters} now={now} advance={advance} {...bk} />}
            {page === 'Manage' && user.role === 'admin' && <Admin me={user.username} settings={settings} setSettings={setSettings} users={users} setUsers={setUsers} menu={menu} setMenu={setMenu}
              waiters={waiters} setWaiters={setWaiters} hidden={orders.length - orders.filter(o => live(o, now)).length}
              clearOld={() => setOrders(os => os.filter(o => live(o, now)))} />}
          </div>
          </main>
        </div>
      </div>
    </>
  )
}
