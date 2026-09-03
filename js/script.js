// Funciones principales del sitio

// Variable global para almacenar la imagen actual
let currentImageFile = null;
let publishedWorksData = [];

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

// Manejar la selección de imagen
function handleImageUpload(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen no debe superar 5MB');
            return;
        }

        // Guardar el archivo
        currentImageFile = file;

        // Mostrar preview
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.innerHTML = `
                <div class="preview-container">
                    <img src="${event.target.result}" alt="Vista previa">
                    <button type="button" class="btn-remove-image" onclick="removeImage()">✕ Remover imagen</button>
                </div>
            `;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Remover imagen seleccionada
function removeImage() {
    currentImageFile = null;
    document.getElementById('workImage').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('imagePreview').style.display = 'none';
}

// Manejar envío del formulario de publicación
function handlePublishForm(e) {
    e.preventDefault();
    
    const authorName = document.getElementById('authorName').value;
    const workTitle = document.getElementById('workTitle').value;
    const workDescription = document.getElementById('workDescription').value;
    const workGenre = document.getElementById('workGenre').value;
    
    // Crear objeto de la obra
    const newWork = {
        id: Date.now(),
        author: authorName,
        title: workTitle,
        description: workDescription,
        genre: workGenre,
        image: null,
        date: new Date().toLocaleDateString('es-ES')
    };

    // Si hay imagen, convertirla a base64
    if (currentImageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newWork.image = event.target.result;
            publishedWorksData.push(newWork);
            displayPublishedWorks();
            document.getElementById('publishForm').reset();
            removeImage();
            alert('¡Obra publicada exitosamente! 🎉');
        };
        reader.readAsDataURL(currentImageFile);
    } else {
        publishedWorksData.push(newWork);
        displayPublishedWorks();
        document.getElementById('publishForm').reset();
        alert('¡Obra publicada exitosamente! 🎉 (sin imagen de portada)');
    }
}

// Mostrar obras publicadas
function displayPublishedWorks() {
    const worksList = document.getElementById('worksList');
    worksList.innerHTML = '';
    
    if (publishedWorksData.length === 0) {
        worksList.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Aún no hay obras publicadas. ¡Sé el primero!</p>';
        return;
    }

    publishedWorksData.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        
        let imageHTML = '';
        if (work.image) {
            imageHTML = `<img src="${work.image}" alt="Portada de ${work.title}" class="work-image">`;
        } else {
            imageHTML = '<div class="work-image-placeholder">📚</div>';
        }

        workCard.innerHTML = `
            <div class="work-card-content">
                ${imageHTML}
                <div class="work-info">
                    <h4>${work.title}</h4>
                    <p class="work-author">por <strong>${work.author}</strong></p>
                    <p class="work-genre">Género: ${work.genre}</p>
                    <p class="work-description">${work.description}</p>
                    <p class="work-date">Publicado: ${work.date}</p>
                </div>
            </div>
        `;
        worksList.appendChild(workCard);
    });
}

// Manejar envío de formulario de contacto
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
    displayPublishedWorks();
    
    // Event listeners
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    document.getElementById('publishForm').addEventListener('submit', handlePublishForm);
    document.getElementById('workImage').addEventListener('change', handleImageUpload);
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
