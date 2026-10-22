(function(){
  const D = window.DATOS;
  const pct = x => x.toFixed(1).replace('.', ',') + '%';
  const cumplimiento = (ind, v) => Math.min(100, ind.sentido === 'menor' ? ind.meta / v * 100 : v / ind.meta * 100);
  const estado = c => c >= 100 ? ['Cumplido','ok'] : c >= 90 ? ['En riesgo','warn'] : ['No cumplido','bad'];
  const promedio = u => D.indicadores.reduce((s, ind, k) => s + cumplimiento(ind, u.valores[k]), 0) / D.indicadores.length;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const unitURL = u => 'unidad.html?id=' + encodeURIComponent(u.id);
  const $ = s => document.querySelector(s);

  // Encabezado y menú comunes
  function header(active){
    const grupos = [['central','Nivel central'],['regional','Direcciones regionales']];
    const items = grupos.map(([n,t]) => `<div class="grp">${t}</div>` +
      D.unidades.filter(u => u.nivel === n).map(u => `<a href="${unitURL(u)}">${esc(u.nombre)}</a>`).join('')).join('');
    $('#top').innerHTML = `<div class="gob"></div><header class="top"><div class="wrap">
      <a class="brand" href="index.html">${esc(D.servicio)}<small>Indicadores de gestión</small></a>
      <nav class="main">
        <a href="index.html" class="${active==='inicio'?'on':''}">Inicio</a>
        <a href="resumen.html" class="${active==='resumen'?'on':''}">Resumen de Unidades</a>
        <div class="dd"><button type="button" aria-expanded="false" class="${active==='unidad'?'on':''}">Unidades ▾</button><div class="dd-menu">${items}</div></div>
      </nav></div></header>`;
    const dd = $('.dd'), btn = dd.querySelector('button');
    btn.addEventListener('click', e => { e.stopPropagation(); dd.classList.toggle('open'); btn.setAttribute('aria-expanded', dd.classList.contains('open')); });
    document.addEventListener('click', () => { dd.classList.remove('open'); btn.setAttribute('aria-expanded','false'); });
    $('#pie').innerHTML = `<footer><div class="wrap">${esc(D.servicio)} · Sistema de seguimiento de indicadores de gestión · ${esc(D.periodo)}. Cifras de ejemplo.</div></footer>`;
  }

  function hero(titulo, bajada, crumbs){
    return `<section class="hero"><div class="wrap">${crumbs?`<div class="crumbs">${crumbs}</div>`:''}<h1>${esc(titulo)}</h1><p>${esc(bajada)}</p></div></section>`;
  }

  const legend = `<div class="legend"><span><span class="b ok">≥ 100%</span>Cumplido</span><span><span class="b warn">90–99,9%</span>En riesgo</span><span><span class="b bad">&lt; 90%</span>No cumplido</span></div>`;

  function inicio(){
    header('inicio');
    const proms = D.unidades.map(promedio);
    const cumplidos = D.unidades.reduce((s,u) => s + D.indicadores.filter((ind,k) => cumplimiento(ind,u.valores[k]) >= 100).length, 0);
    const total = D.unidades.length * D.indicadores.length;
    const central = D.unidades.filter(u=>u.nivel==='central').length;
    $('#app').innerHTML = hero(D.servicio, 'Sistema de Seguimiento de Indicadores de Gestión · ' + D.periodo) +
    `<main><div class="wrap">
      <div class="card"><h2>Presentación</h2><p class="sub">Nivel central y regional</p>
        <p>Este sitio presenta el seguimiento de los indicadores de gestión del Servicio. Las ${D.unidades.length} unidades, ${central} del nivel central y ${D.unidades.length-central} direcciones regionales, comprometen los mismos tres indicadores.</p>
        <div class="stat">
          <div><strong>${D.unidades.length}</strong><span>Unidades</span></div>
          <div><strong>${cumplidos} / ${total}</strong><span>Compromisos cumplidos</span></div>
          <div><strong>${pct(proms.reduce((a,b)=>a+b,0)/proms.length)}</strong><span>Cumplimiento promedio del Servicio</span></div>
        </div></div>
      <div class="card"><h2>Indicadores comprometidos</h2><p class="sub">Comunes a todas las unidades</p><div class="kpis">` +
      D.indicadores.map(ind => `<div class="kpi"><b>Indicador ${ind.id}</b>${esc(ind.nombre)}.<div class="f">${esc(ind.formula)}<br>Meta: ${ind.sentido==='menor'?'≤ ':''}${pct(ind.meta)} · ${ind.sentido==='menor'?'Menor':'Mayor'} es mejor</div></div>`).join('') +
      `</div></div>
      <div class="card"><h2>Unidades</h2><p class="sub">Selecciona una unidad para ver su detalle, o revisa el <a href="resumen.html">Resumen de Unidades</a>.</p>
        <div class="units">${D.unidades.map(u=>`<a href="${unitURL(u)}">${esc(u.nombre)}</a>`).join('')}</div></div>
      <p class="note">Las cifras publicadas son valores de ejemplo y deben reemplazarse por los datos oficiales del período.</p>
    </div></main>`;
  }

  function celda(ind, v){
    const c = cumplimiento(ind, v), [, cls] = estado(c);
    return `<td class="n">${pct(v)}<span class="b ${cls}">${pct(c)}</span></td>`;
  }

  function resumen(){
    header('resumen'); document.title = 'Resumen de Unidades · ' + D.servicio;
    const filas = [['central','Nivel central'],['regional','Direcciones regionales']].map(([n,t]) =>
      `<tr class="grp"><td colspan="5">${t}</td></tr>` +
      D.unidades.filter(u=>u.nivel===n).map(u => `<tr><td><a href="${unitURL(u)}">${esc(u.nombre)}</a></td>${D.indicadores.map((ind,k)=>celda(ind,u.valores[k])).join('')}<td class="n"><b>${pct(promedio(u))}</b></td></tr>`).join('')).join('');
    $('#app').innerHTML = hero('Resumen de Unidades', 'Valor efectivo y porcentaje de cumplimiento respecto de la meta · ' + D.periodo, '<a href="index.html">Inicio</a> › Resumen de Unidades') +
    `<main><div class="wrap"><div class="card"><h2>Resumen de indicadores por unidad</h2><p class="sub">Cada celda muestra el valor efectivo y, en color, el cumplimiento de la meta.</p>
      <div class="tbl"><table><thead><tr><th>Unidad</th>${D.indicadores.map(ind=>`<th class="n">Ind. ${ind.id}<br><span style="font-weight:400;font-size:12px">Meta ${ind.sentido==='menor'?'≤ ':''}${pct(ind.meta)}</span></th>`).join('')}<th class="n">Cumplimiento promedio</th></tr></thead><tbody>${filas}</tbody></table></div>${legend}
      <p class="f" style="margin-top:14px">Ind. 1: ejecución presupuestaria · Ind. 2: avance del plan anual de capacitación · Ind. 3: ausentismo de dotación. Cumplimiento: efectivo/meta (ind. 1 y 2) y meta/efectivo (ind. 3), con tope de 100%.</p></div>
      <p class="note">Valores de ejemplo.</p></div></main>`;
  }

  function unidad(){
    header('unidad');
    const id = new URLSearchParams(location.search).get('id');
    const i = D.unidades.findIndex(u => u.id === id);
    if (i < 0){ $('#app').innerHTML = hero('Unidad no encontrada','Vuelve al resumen para elegir una unidad.') + `<main><div class="wrap"><p><a href="resumen.html">Ir al Resumen de Unidades</a></p></div></main>`; return; }
    const u = D.unidades[i]; document.title = u.nombre + ' · ' + D.servicio;
    const prev = D.unidades[i-1], next = D.unidades[i+1];
    const filas = D.indicadores.map((ind,k) => {
      const v = u.valores[k], c = cumplimiento(ind,v), [txt,cls] = estado(c);
      return `<tr><td><b>Indicador ${ind.id}</b><br>${esc(ind.nombre)}<div class="f">${esc(ind.formula)} · ${ind.sentido==='menor'?'Menor':'Mayor'} es mejor</div><div class="bar"><i style="width:${c}%;background:var(--${cls})"></i></div></td>
        <td class="n">${ind.sentido==='menor'?'≤ ':''}${pct(ind.meta)}</td><td class="n">${pct(v)}</td><td class="n">${pct(c)}</td><td><span class="b ${cls}" style="margin-left:0">${txt}</span></td></tr>`;
    }).join('');
    $('#app').innerHTML = hero(u.nombre, (u.nivel==='central'?'Nivel central':'Dirección regional') + ' · ' + D.periodo, '<a href="index.html">Inicio</a> › <a href="resumen.html">Resumen de Unidades</a> › ' + esc(u.nombre)) +
    `<main><div class="wrap"><div class="card"><h2>Indicadores de gestión</h2><p class="sub">Cumplimiento promedio de la unidad: <b>${pct(promedio(u))}</b></p>
      <div class="tbl"><table><thead><tr><th>Indicador</th><th class="n">Meta</th><th class="n">Valor efectivo</th><th class="n">Cumplimiento</th><th>Estado</th></tr></thead><tbody>${filas}</tbody></table></div>${legend}</div>
      <p style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">${prev?`<a href="${unitURL(prev)}">‹ ${esc(prev.nombre)}</a>`:'<span></span>'}${next?`<a href="${unitURL(next)}">${esc(next.nombre)} ›</a>`:''}</p>
      <p class="note">Valores de ejemplo, reemplazar por datos oficiales.</p></div></main>`;
  }

  ({inicio, resumen, unidad})[document.body.dataset.page]();
})();
