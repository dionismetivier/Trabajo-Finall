// script.js

document.addEventListener('DOMContentLoaded', () => {
    const btnAcceso = document.getElementById('btn-acceso');
    const sections = document.querySelectorAll('main section:not(.hero)');
    const carruselContenedor = document.querySelector('.carrusel-contenedor');
    const carruselPrev = document.querySelector('.carrusel-btn.prev');
    const carruselNext = document.querySelector('.carrusel-btn.next');

    let currentSlide = 0;

    // 1. Lógica de revelación de contenido (El elemento "sorpresa" y original)
    // Las secciones solo aparecen después de un "acceso" simulado.
    btnAcceso.addEventListener('click', () => {
        // Deshabilita el botón temporalmente
        btnAcceso.disabled = true;
        btnAcceso.textContent = 'Acceso Denegado... Reintentando...';
        
        // Simular un proceso de "carga/desencriptación"
        setTimeout(() => {
            btnAcceso.textContent = '||| ARCHIVO DESBLOQUEADO |||';
            
            // Revelar todas las secciones ocultas
            sections.forEach(section => {
                section.classList.add('visible');
            });

            // Desplazarse suavemente a la primera sección revelada
            document.getElementById('archivo').scrollIntoView({ behavior: 'smooth' });

            // Inicializar el carrusel
            initCarrusel();

        }, 2000); // 2 segundos de "carga" para la sorpresa

    });


    // 2. Lógica del Carrusel (Sección Archivo)
    const initCarrusel = () => {
        const items = carruselContenedor.querySelectorAll('.carrusel-item');
        if (items.length === 0) return;

        // Función para mostrar un slide específico
        const showSlide = (index) => {
            // Asegurarse de que el índice esté dentro de los límites
            currentSlide = (index + items.length) % items.length;

            items.forEach((item, i) => {
                // Ocultar todos los slides
                item.classList.remove('active');
            });
            
            // Mostrar solo el slide activo
            items[currentSlide].classList.add('active');
        };

        // Mostrar el primer slide al iniciar
        showSlide(currentSlide);

        // Event listener para el botón 'Siguiente'
        carruselNext.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Event listener para el botón 'Anterior'
        carruselPrev.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        // Agregar más contenido dinámico para hacerlo más robusto
        // Esto es un ejemplo, en la realidad el contenido vendría de un array de datos
        const newArt = document.createElement('div');
        newArt.className = 'carrusel-item';
        newArt.innerHTML = `
            <h3>El Sello de Cíclope</h3>
            <p>Obra: Escultura de realidad aumentada.</p>
            <p>Descripción: Solo se ve su forma correcta bajo una luz UV específica...</p>
            <p class="nota">(Ejemplo de contenido dinámico con JS)</p>
            
        `;
        carruselContenedor.appendChild(newArt);
    };

    // 3. Scroll Spy/Animación de Revelación (Alternativa a la revelación por botón)
    // Implementar un Intersection Observer para revelar secciones al hacer scroll
    const observerOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.1 // Revelar cuando el 10% de la sección sea visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Solo actuar si la sección está siendo intersectada (visible)
            if (entry.isIntersecting) {
                // Si la sección no es la hero, y no se ha revelado con el botón, la revelamos
                if (!entry.target.classList.contains('hero')) {
                    entry.target.classList.add('visible');
                    // Dejar de observar una vez revelada
                    observer.unobserve(entry.target); 
                }
            }
        });
    }, observerOptions);

    // Observar las secciones para que se revelen al hacer scroll, si el usuario decide ignorar el botón
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});