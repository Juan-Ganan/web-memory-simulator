// Modelo - Algoritmos de Reemplazo de Página

// Clase base para los algoritmos de reemplazo
class AlgoritmoReemplazo {
    constructor(frames, referencias) {
      this.frames = Array(frames).fill(-1); // Inicializar los marcos de la memoria
      this.referencias = referencias; // Cadena de referencias
      this.memoria = Array.from({ length: frames }, () => []); // Memoria de cada marco
      this.fallos = 0; // Contador de fallos
      this.reemplazos = 0; // Contador de reemplazos
    }
  
    // Método a implementar en cada algoritmo
    ejecutar() {
      throw new Error("El método ejecutar() debe ser implementado en la clase hija.");
    }
  }
  
  class Optimo extends AlgoritmoReemplazo {
    ejecutar() {
      for (let i = 0; i < this.referencias.length; i++) {
        const actual = this.referencias[i];
  
        // Si la página YA está en memoria, no hay fallo ni reemplazo
        if (this.frames.includes(actual)) {
          // Solo guardar el estado de la memoria
          this.frames.forEach((val, idx) => this.memoria[idx].push(val));
          continue;
        }
  
        // Si NO está en memoria, es un fallo
        this.fallos++;
  
        // Hay espacio libre (-1 representa espacio vacío)
        if (this.frames.includes(-1)) {
          const indexLibre = this.frames.indexOf(-1);
          this.frames[indexLibre] = actual;
        } else {
          // Elegir a quién reemplazar mirando hacia el futuro
          const futuros = this.frames.map(p => {
            const idx = this.referencias.slice(i + 1).indexOf(p);
            return idx === -1 ? Infinity : idx;
          });
          const reemplazoIndex = futuros.indexOf(Math.max(...futuros));
          this.frames[reemplazoIndex] = actual;
          this.reemplazos++;
        }
  
        // Guardar estado de la memoria
        this.frames.forEach((val, idx) => this.memoria[idx].push(val));
      }
  
      return [this.memoria, this.fallos, this.reemplazos];
    }
  }
  
  
  
  // Algoritmo FIFO
  class FIFO extends AlgoritmoReemplazo {
    constructor(frames, referencias) {
      super(frames, referencias);
      this.cola = [];
    }
  
    ejecutar() {
      for (let actual of this.referencias) {
        if (!this.frames.includes(actual)) {
          this.fallos++;
          if (this.frames.includes(-1)) {
            const index = this.frames.indexOf(-1);
            this.frames[index] = actual;
            this.cola.push(index);
          } else {
            const index = this.cola.shift();
            this.frames[index] = actual;
            this.cola.push(index);
            this.reemplazos++;
          }
        }
        this.frames.forEach((val, idx) => this.memoria[idx].push(val));
      }
      return [this.memoria, this.fallos, this.reemplazos];
    }
  }
  
  // Algoritmo LRU
  class LRU extends AlgoritmoReemplazo {
    constructor(frames, referencias) {
      super(frames, referencias);
      this.stack = [];
    }
  
    ejecutar() {
      for (let actual of this.referencias) {
        if (!this.frames.includes(actual)) {
          this.fallos++;
          if (this.frames.includes(-1)) {
            const index = this.frames.indexOf(-1);
            this.frames[index] = actual;
          } else {
            const lru = this.stack.shift();
            const index = this.frames.indexOf(lru);
            this.frames[index] = actual;
            this.reemplazos++;
          }
        } else {
          this.stack.splice(this.stack.indexOf(actual), 1);
        }
        this.stack.push(actual);
        this.frames.forEach((val, idx) => this.memoria[idx].push(val));
      }
      return [this.memoria, this.fallos, this.reemplazos];
    }
  }
  
  // Algoritmo Segunda Oportunidad
  class SegundaOportunidad extends AlgoritmoReemplazo {
    constructor(frames, referencias) {
      super(frames, referencias);
      this.bits = Array(frames).fill(0);
      this.pointer = 0;
    }
  
    ejecutar() {
      for (let actual of this.referencias) {
        let idx = this.frames.indexOf(actual);
        if (idx !== -1) {
          this.bits[idx] = 1;
        } else {
          this.fallos++;
          while (true) {
            if (this.bits[this.pointer] === 0) {
              if (this.frames[this.pointer] !== -1) this.reemplazos++;
              this.frames[this.pointer] = actual;
              this.bits[this.pointer] = 1;
              this.pointer = (this.pointer + 1) % this.frames.length;
              break;
            } else {
              this.bits[this.pointer] = 0;
              this.pointer = (this.pointer + 1) % this.frames.length;
            }
          }
        }
        this.frames.forEach((val, idx) => this.memoria[idx].push(val));
      }
      return [this.memoria, this.fallos, this.reemplazos];
    }
  }
  
  // Algoritmo Reloj (similar a Segunda Oportunidad)
  class Reloj extends SegundaOportunidad {
    constructor(frames, referencias) {
      super(frames, referencias);
    }
  }
  
  // Algoritmo FIFO+ (similar a Segunda Oportunidad)
  class FIFOPlus extends SegundaOportunidad {
    constructor(frames, referencias) {
      super(frames, referencias);
    }
  }
  