// Controlador - Manejo de interacciones
document.addEventListener("DOMContentLoaded", () => {
    // Cargar los algoritmos disponibles en el select
    const selectAlgorithm = document.getElementById("algorithm");
    const algoritmos = [
      { value: "optimo", label: "Óptimo" },
      { value: "fifo", label: "FIFO" },
      { value: "lru", label: "LRU" },
      { value: "segunda", label: "Segunda Oportunidad" },
      { value: "reloj", label: "Reloj" },
      { value: "fifoplus", label: "FIFO+" }
    ];
  
    algoritmos.forEach(alg => {
      const option = document.createElement("option");
      option.value = alg.value;
      option.textContent = alg.label;
      selectAlgorithm.appendChild(option);
    });
  
    // Manejo del evento de ejecución del algoritmo
    document.getElementById("run-button").addEventListener("click", () => {
      // Obtener el algoritmo seleccionado
      const algoritmoSeleccionado = selectAlgorithm.value;
  
      // Obtener los valores de los campos
      const frames = parseInt(document.getElementById("frames").value);
      const referencias = document.getElementById("reference").value.trim().split(" ").map(Number);
  
      // Validar que los marcos sean un número positivo
      if (frames <= 0) {
        alert("El número de marcos debe ser mayor que 0.");
        return;
      }
  
      // Crear una instancia del algoritmo seleccionado
      let algoritmo;
  
      switch (algoritmoSeleccionado) {
        case "optimo":
          algoritmo = new Optimo(frames, referencias);
          break;
        case "fifo":
          algoritmo = new FIFO(frames, referencias);
          break;
        case "lru":
          algoritmo = new LRU(frames, referencias);
          break;
        case "segunda":
          algoritmo = new SegundaOportunidad(frames, referencias);
          break;
        case "reloj":
          algoritmo = new Reloj(frames, referencias);
          break;
        case "fifoplus":
          algoritmo = new FIFOPlus(frames, referencias);
          break;
        default:
          alert("Algoritmo no implementado");
          return;
      }
  
      // Ejecutar el algoritmo
      const [memoria, fallos, reemplazos] = algoritmo.ejecutar();
  
      // Mostrar los resultados en la vista
      mostrarTabla(memoria, referencias, fallos, reemplazos);
    });
  });
  