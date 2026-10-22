/* =====================================================================
   DATOS DEL SITIO — edita solo este archivo para actualizar las cifras.
   Valores de ejemplo: reemplazar por los datos oficiales del período.
   ===================================================================== */
window.DATOS = {
  servicio: "Servicio Público",
  periodo: "Año t",
  indicadores: [
    { id: 1, nombre: "Porcentaje de ejecución presupuestaria en el año t",
      formula: "(Gasto devengado año t / Presupuesto vigente año t) × 100",
      meta: 95.0, sentido: "mayor" },
    { id: 2, nombre: "Porcentaje de avance del plan anual de capacitación en el año t",
      formula: "(Actividades del plan ejecutadas año t / Actividades programadas año t) × 100",
      meta: 90.0, sentido: "mayor" },
    { id: 3, nombre: "Porcentaje de ausentismo de dotación en el año t",
      formula: "(Días de ausencia año t / Días hábiles de la dotación año t) × 100",
      meta: 4.0, sentido: "menor" }
  ],
  /* nivel: "central" o "regional"; valores: [ind1, ind2, ind3] en % */
  unidades: [
    { id: "direccion-nacional", nombre: "Dirección Nacional", nivel: "central", valores: [87.6, 86.1, 4.3] },
    { id: "unidad-juridica", nombre: "Unidad Jurídica", nivel: "central", valores: [97.6, 74.9, 3.2] },
    { id: "subdireccion-operaciones", nombre: "Subdirección de Operaciones", nivel: "central", valores: [94.1, 87.6, 5.4] },
    { id: "subdireccion-administracion-finanzas", nombre: "Subdirección de Administración y Finanzas", nivel: "central", valores: [93.4, 92.5, 5.3] },
    { id: "subdireccion-estudios-desarrollo", nombre: "Subdirección de Estudios y Desarrollo", nivel: "central", valores: [96.1, 88.4, 3.3] },
    { id: "dr-arica-parinacota", nombre: "Dirección Regional de Arica y Parinacota", nivel: "regional", valores: [94.3, 75.1, 5.5] },
    { id: "dr-tarapaca", nombre: "Dirección Regional de Tarapacá", nivel: "regional", valores: [92.1, 94.8, 5.0] },
    { id: "dr-atacama", nombre: "Dirección Regional de Atacama", nivel: "regional", valores: [95.2, 77.9, 3.4] },
    { id: "dr-coquimbo", nombre: "Dirección Regional de Coquimbo", nivel: "regional", valores: [99.2, 98.0, 5.5] },
    { id: "dr-valparaiso", nombre: "Dirección Regional de Valparaíso", nivel: "regional", valores: [99.5, 86.4, 2.7] },
    { id: "dr-metropolitana", nombre: "Dirección Regional Metropolitana", nivel: "regional", valores: [90.6, 87.6, 3.5] },
    { id: "dr-ohiggins", nombre: "Dirección Regional del Libertador Bernardo O'Higgins", nivel: "regional", valores: [92.2, 96.5, 5.1] },
    { id: "dr-maule", nombre: "Dirección Regional del Maule", nivel: "regional", valores: [93.8, 72.7, 5.1] },
    { id: "dr-biobio", nombre: "Dirección Regional del Biobío", nivel: "regional", valores: [90.9, 83.8, 3.9] },
    { id: "dr-araucania", nombre: "Dirección Regional de La Araucanía", nivel: "regional", valores: [93.9, 86.0, 2.8] },
    { id: "dr-los-rios", nombre: "Dirección Regional de Los Ríos", nivel: "regional", valores: [92.8, 93.0, 4.7] },
    { id: "dr-los-lagos", nombre: "Dirección Regional de Los Lagos", nivel: "regional", valores: [92.6, 97.7, 3.4] },
    { id: "dr-aysen", nombre: "Dirección Regional de Aysén", nivel: "regional", valores: [91.7, 97.9, 4.2] },
    { id: "dr-magallanes", nombre: "Dirección Regional de Magallanes", nivel: "regional", valores: [93.0, 72.7, 3.3] }
  ]
};
