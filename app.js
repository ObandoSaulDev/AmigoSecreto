// Variables globales
let listaAmigos = [];
let amigosSorteados = new Set(); // Usamos un Set para una búsqueda más rápida

// Funciones

// Limpiar caja de texto
function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

// Activar/desactivar botones
function toggleButton(id, disable) {
    document.getElementById(id).disabled = disable;
}

// Agregar nombres a la lista
function agregarAmigo() {
    const nombreIngresado = document.getElementById('amigo').value.trim();
    if (!nombreIngresado) {
        alert('Debe ingresar un nombre, por favor, inténtelo nuevamente.');
        return;
    }
    if (listaAmigos.includes(nombreIngresado)) {
        alert(`¡${nombreIngresado} ya existe! Debes ingresar nombres distintos.`);
        return;
    }

    // Agregar el nombre a la lista
    listaAmigos.push(nombreIngresado);
    limpiarCaja();

    // Actualizar la lista en el DOM
    const listaImprimir = document.getElementById('listaAmigos');
    const li = document.createElement('li');
    li.textContent = nombreIngresado;
    listaImprimir.appendChild(li);

    // Habilitar el botón de sorteo si hay al menos un amigo
    if (listaAmigos.length === 1) {
        toggleButton('sortear', false);
    }
}

// Sorteo aleatorio
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert('Antes de sortear nombres, debes haber añadido los nombres de tus amigos/as en el sistema.');
        return;
    }

    if (amigosSorteados.size === listaAmigos.length) {
        alert('Ya han sido sorteados todos tus amigos/as, ahora cada uno/a tiene su "Amigo Secreto".');
        resetJuego();
        return;
    }

    let indiceAleatorio;
    let amigoSecreto;

    // Buscar un amigo no sorteado sin usar recursión
    do {
        indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
        amigoSecreto = listaAmigos[indiceAleatorio];
    } while (amigosSorteados.has(amigoSecreto));

    // Mostrar el resultado
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Tu amigo/a secreto/a es: ¡${amigoSecreto}!`;

    // Guardar el amigo sorteado
    amigosSorteados.add(amigoSecreto);

    alert('El nombre del amigo/a secreto/a desaparecerá en 5 segundos. ¡Asegúrate de recordarlo!');
    setTimeout(() => {
        resultado.textContent = '';
    }, 5000);
}

// Reiniciar el juego
function resetJuego() {
    const listaBorrar = document.getElementById('listaAmigos');
    listaBorrar.innerHTML = ''; // Limpiar la lista
    document.getElementById('resultado').textContent = ''; // Limpiar el resultado
    listaAmigos = []; // Limpiar la lista de amigos
    amigosSorteados.clear(); // Limpiar el conjunto de amigos sorteados
    toggleButton('agregar', false); // Reactivar el botón de agregar
    toggleButton('sortear', true); // Desactivar el botón de sortear
    document.querySelector('h2').textContent = 'Juego finalizado'; // Actualizar el título
}

// Inicialización
toggleButton('sortear', true); // Desactivar el botón de sortear inicialmente