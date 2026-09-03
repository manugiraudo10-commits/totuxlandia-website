// Funciones principales del sitio

// Cargar regiones
function cargarRegiones() {
    const regionsGrid = document.getElementById('regionsGrid');
    regionsGrid.innerHTML = '';
    
    REGIONES.forEach(region => {
        const regionCard = document.createElement('div');
        regionCard.className = 'region-card';
        regionCard.innerHTML = `
            <h3>${region.simbolo} ${region.nombre}</h3>
            <p>${region.descripcion}</p>
            <p style="margin-top: 1rem; font-weight: bold; color: #3498db;">Población: ${region.poblacion}</p>
        `;
        regionsGrid.appendChild(regionCard);
    });
}

// Cargar cultura
function cargarCultura() {
    const cultureGrid = document.getElementById('cultureGrid');
    cultureGrid.innerHTML = '';
    
    CULTURA.forEach(item => {
        const cultureCard = document.createElement('div');
        cultureCard.className = 'culture-card';
        cultureCard.innerHTML = `
            <div class="culture-card-content">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
            </div>
        `;
        cultureGrid.appendChild(cultureCard);
    });
}

// Cargar información de contacto
function cargarContacto() {
    const contactInfo = document.getElementById('contactInfo');
    contactInfo.innerHTML = '';
    
    INFORMACION_CONTACTO.forEach(info => {
        const infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        infoCard.innerHTML = `
            <h4>${info.icono} ${info.titulo}</h4>
            <p>${info.valor}</p>
        `;
        contactInfo.appendChild(infoCard);
    });
}

// Manejar envío de formulario
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    console.log('Formulario enviado:', { name, email, message });
    alert(`¡Gracias ${name}! Tu mensaje ha sido recibido.\nNos pondremos en contacto en: ${email}`);
    
    // Limpiar formulario
    document.getElementById('contactForm').reset();
}

// Navegación móvil
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Función para hacer scroll suave
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Cerrar menú móvil al hacer clic en un enlace
function closeMenuOnClick() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
            document.getElementById('hamburger').classList.remove('active');
        });
    });
}

// Inicializar el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Cargar contenido
    cargarRegiones();
    cargarCultura();
    cargarContacto();
    
    // Event listeners
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    closeMenuOnClick();
    
    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Log de bienvenida
console.log('🌍 ¡Bienvenido a Totuxlandia! El sitio está cargado correctamente.');