// Vista - Actualización de la interfaz de usuario
function mostrarTabla(memoria, referencias, fallos, reemplazos) {
    const tabla = document.getElementById("tabla-resultado");
    tabla.innerHTML = "";
    const encabezado = document.createElement("tr");
    encabezado.classList.add("fade");
    encabezado.innerHTML = `<th>Marco</th>` + referencias.map(ref => `<th>${ref}</th>`).join("");
    tabla.appendChild(encabezado);
  
    memoria.forEach((fila, f) => {
      const tr = document.createElement("tr");
      tr.classList.add("fade");
      tr.innerHTML = `<th>${f}</th>` + fila.map(val => `<td>${val !== -1 ? val : " "}</td>`).join("");
      tabla.appendChild(tr);
    });
  
    const info = `<p><strong>Fallos:</strong> ${fallos} | <strong>Reemplazos:</strong> ${reemplazos}</p>`;
    document.getElementById("resultado").innerHTML = info;
  }
  