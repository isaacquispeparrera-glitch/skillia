document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.querySelector('form');

    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            // Evita que la página se recargue al enviar el formulario
            e.preventDefault();

            // Captura de campos del formulario
            const nombre = registroForm.querySelector('input[type="text"]');
            const email = registroForm.querySelector('input[type="email"]');
            const telefono = registroForm.querySelector('input[type="tel"]');
            const programa = registroForm.querySelector('select');

            let esValido = true;

            // Limpiar alertas previas
            removerAlertas();

            // Validar Nombre
            if (!nombre || nombre.value.trim() === '') {
                mostrarError(nombre, 'Por favor, ingresa tu nombre completo.');
                esValido = false;
            }

            // Validar Correo Electrónico
            if (!email || !validarEmail(email.value.trim())) {
                mostrarError(email, 'Ingresa un correo electrónico válido.');
                esValido = false;
            }

            // Validar Teléfono (mínimo 6 dígitos)
            if (telefono && (telefono.value.trim().length < 6 || isNaN(telefono.value.trim()))) {
                mostrarError(telefono, 'Ingresa un número de teléfono válido.');
                esValido = false;
            }

            // Validar Selección de Programa
            if (programa && (programa.value === '' || programa.value === 'Selecciona una opción')) {
                mostrarError(programa, 'Por favor, selecciona un programa de tu interés.');
                esValido = false;
            }

            // Si pasa todas las validaciones
            if (esValido) {
                mostrarExito(registroForm, `¡Gracias por registrarte, ${nombre.value.trim()}! Nos pondremos en contacto contigo pronto.`);
                registroForm.reset();
            }
        });
    }

    // Función auxiliar para validar correo
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Mostrar mensaje de error debajo del campo correspondiente
    function mostrarError(campo, mensaje) {
        if (!campo) return;
        campo.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback fw-bold text-danger mt-1';
        feedback.innerText = mensaje;
        
        if (campo.parentNode) {
            campo.parentNode.appendChild(feedback);
        }
    }

    // Mostrar mensaje de éxito tras el envío correcto
    function mostrarExito(contenedor, mensaje) {
        const alertaExito = document.createElement('div');
        alertaExito.className = 'alert alert-success mt-3 p-3 text-center fw-bold rounded-3 shadow-sm';
        alertaExito.innerText = mensaje;

        contenedor.appendChild(alertaExito);

        // Desaparecer la alerta a los 5 segundos
        setTimeout(() => {
            alertaExito.remove();
        }, 5000);
    }

    // Limpiar alertas y clases de error activas
    function removerAlertas() {
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
        document.querySelectorAll('.alert-success').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }


    /* ==========================================================================
       2. ANIMACIÓN DE CONTADORES NUMÉRICOS (ESTADÍSTICAS EN CIFRAS)
       ========================================================================== */
    const contadores = document.querySelectorAll('.display-4');
    let animado = false;

    function animarContadores() {
        contadores.forEach(contador => {
            const textoOriginal = contador.innerText.trim();
            // Extraer solo los números del texto (ej. "6500+" -> 6500)
            const valorFinal = parseInt(textoOriginal.replace(/[^0-9]/g, ''), 10);

            if (isNaN(valorFinal)) return;

            let valorActual = 0;
            const incremento = Math.ceil(valorFinal / 80); // Velocidad del conteo

            const timer = setInterval(() => {
                valorActual += incremento;
                if (valorActual >= valorFinal) {
                    valorActual = valorFinal;
                    clearInterval(timer);
                    // Mantener símbolos especiales como "+" si existían en el texto
                    contador.innerText = textoOriginal.includes('+') ? `${valorActual}+` : valorActual;
                } else {
                    contador.innerText = textoOriginal.includes('+') ? `${valorActual}+` : valorActual;
                }
            }, 25);
        });
    }

    // Iniciar animación cuando el usuario hace scroll hasta la sección de estadísticas
    const seccionEstadisticas = document.querySelector('.bg-dark');

    if (seccionEstadisticas && contadores.length > 0) {
        window.addEventListener('scroll', () => {
            const posicionSeccion = seccionEstadisticas.getBoundingClientRect().top;
            const alturaPantalla = window.innerHeight;

            if (posicionSeccion < alturaPantalla - 100 && !animado) {
                animarContadores();
                animado = true; // Previene que vuelva a ejecutarse en cada scroll
            }
        });
    }


    /* ==========================================================================
       3. NAVEGACIÓN Y MENÚ MÓVIL (CIERRE AUTOMÁTICO EN CLIC)
       ========================================================================== */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Si la barra está abierta en móvil, se cierra automáticamente
                const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
                bootstrapCollapse.hide();
            }
        });
    });

});