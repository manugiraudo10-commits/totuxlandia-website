// Funciones principales del sitio

// Variable global para almacenar la imagen actual
let currentImageFile = null;
let publishedWorksData = [];

// Cargar regiones desde localStorage o usar las predeterminadas
let REGIONES_DINAMICAS = [];

function cargarRegiones() {
    const regionsGrid = document.getElementById('regionsGrid');
    regionsGrid.innerHTML = '';
    
    REGIONES_DINAMICAS.forEach((region, index) => {
        const regionCard = document.createElement('div');
        regionCard.className = 'region-card';
        
        // Si es una región original, mostrar la opción de eliminar solo si hay más de las originales
        const isCustomRegion = index >= REGIONES.length;
        
        regionCard.innerHTML = `
            <h3>${region.simbolo} ${region.nombre}</h3>
            <p>${region.descripcion}</p>
            <p style="margin-top: 1rem; font-weight: bold; color: #3498db;">Población: ${region.poblacion}</p>
            ${isCustomRegion ? `<button type="button" class="region-delete-btn" onclick="eliminarRegion(${index})" title="Eliminar región">×</button>` : ''}
        `;
        regionsGrid.appendChild(regionCard);
    });
}

function inicializarRegiones() {
    const regionesGuardadas = localStorage.getItem('regionesTotuxlandia');
    if (regionesGuardadas) {
        REGIONES_DINAMICAS = JSON.parse(regionesGuardadas);
    } else {
        REGIONES_DINAMICAS = JSON.parse(JSON.stringify(REGIONES));
    }
    cargarRegiones();
}

function agregarRegion(nombre, simbolo, descripcion, poblacion) {
    const nuevaRegion = {
        id: Date.now(),
        nombre: nombre,
        descripcion: descripcion,
        poblacion: poblacion,
        simbolo: simbolo
    };
    
    REGIONES_DINAMICAS.push(nuevaRegion);
    localStorage.setItem('regionesTotuxlandia', JSON.stringify(REGIONES_DINAMICAS));
    cargarRegiones();
}

function eliminarRegion(index) {
    if (confirm('¿Está seguro que desea eliminar esta región?')) {
        REGIONES_DINAMICAS.splice(index, 1);
        localStorage.setItem('regionesTotuxlandia', JSON.stringify(REGIONES_DINAMICAS));
        cargarRegiones();
    }
}

// Manejar envío del formulario de agregar región
function handleAddRegionForm(e) {
    e.preventDefault();
    
    const regionName = document.getElementById('regionName').value;
    const regionSymbol = document.getElementById('regionSymbol').value;
    const regionDescription = document.getElementById('regionDescription').value;
    const regionPopulation = document.getElementById('regionPopulation').value;
    
    agregarRegion(regionName, regionSymbol, regionDescription, regionPopulation);
    
    document.getElementById('regionForm').reset();
    alert('¡Región agregada exitosamente a Totuxlandia! 🌍');
    scrollTo('regiones');
}

// Cargar cultura
function cargarCultura() {
    const cultureGrid = document.getElementById('cultureGrid');
    if (cultureGrid) {
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

// Cargar información de Totuxlandia en el panel lateral
function cargarInformacionTotuxlandia() {
    const infoPanel = document.getElementById('totuxlandiaInfo');
    if (!infoPanel) return;
    
    infoPanel.innerHTML = `
        <div class="info-section">
            <h4>📌 Datos Generales</h4>
            <ul class="info-list">
                <li><strong>Capital:</strong> ${TOTUXLANDIA_INFO.capital}</li>
                <li><strong>Población:</strong> ${TOTUXLANDIA_INFO.poblacion}</li>
                <li><strong>Área:</strong> ${TOTUXLANDIA_INFO.areaSuperficial}</li>
                <li><strong>Idioma:</strong> ${TOTUXLANDIA_INFO.idioma}</li>
                <li><strong>Moneda:</strong> ${TOTUXLANDIA_INFO.moneda}</li>
                <li><strong>Fundación:</strong> ${TOTUXLANDIA_INFO.fundacion}</li>
            </ul>
        </div>

        <div class="info-section">
            <h4>🏛️ Gobierno</h4>
            <p>${TOTUXLANDIA_INFO.gobierno}</p>
        </div>

        <div class="info-section">
            <h4>🌡️ Clima</h4>
            <p>${TOTUXLANDIA_INFO.clima}</p>
        </div>

        <div class="info-section">
            <h4>🏭 Industrias Principales</h4>
            <ul class="info-list">
                ${TOTUXLANDIA_INFO.industrias.map(ind => `<li>• ${ind}</li>`).join('')}
            </ul>
        </div>

        <div class="info-section">
            <h4>🎭 Símbolos Nacionales</h4>
            <ul class="info-list">
                <li><strong>Bandera:</strong> ${TOTUXLANDIA_INFO.simbolos.bandera}</li>
                <li><strong>Himno:</strong> ${TOTUXLANDIA_INFO.simbolos.himno}</li>
                <li><strong>Animal:</strong> ${TOTUXLANDIA_INFO.simbolos.animal}</li>
                <li><strong>Flor:</strong> ${TOTUXLANDIA_INFO.simbolos.flor}</li>
            </ul>
        </div>

        <div class="info-section">
            <h4>✨ Atracciones Turísticas</h4>
            <ul class="info-list">
                ${TOTUXLANDIA_INFO.atracciones.map(atr => `<li>📍 ${atr}</li>`).join('')}
            </ul>
        </div>

        <div class="info-section">
            <h4>🎉 Tradiciones</h4>
            <ul class="info-list">
                ${TOTUXLANDIA_INFO.tradiciones.map(trad => `<li>📅 ${trad}</li>`).join('')}
            </ul>
        </div>
    `;
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
                    <img src="${event.target.result}" alt="Vista previa" class="preview-image">
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
            localStorage.setItem('publishedWorks', JSON.stringify(publishedWorksData));
            displayPublishedWorks();
            document.getElementById('publishForm').reset();
            removeImage();
            alert('¡Obra publicada exitosamente con imagen! 🎉');
        };
        reader.readAsDataURL(currentImageFile);
    } else {
        publishedWorksData.push(newWork);
        localStorage.setItem('publishedWorks', JSON.stringify(publishedWorksData));
        displayPublishedWorks();
        document.getElementById('publishForm').reset();
        alert('¡Obra publicada exitosamente! 🎉 (sin imagen de portada)');
    }
}

// Cargar obras publicadas desde localStorage
function cargarObrasPublicadas() {
    const obrasGuardadas = localStorage.getItem('publishedWorks');
    if (obrasGuardadas) {
        publishedWorksData = JSON.parse(obrasGuardadas);
    }
}

// Mostrar obras publicadas
function displayPublishedWorks() {
    const worksList = document.getElementById('worksList');
    worksList.innerHTML = '';
    
    if (publishedWorksData.length === 0) {
        worksList.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem; grid-column: 1 / -1;">Aún no hay obras publicadas. ¡Sé el primero!</p>';
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
                    <button type="button" class="btn-delete work-delete-btn" onclick="eliminarObra(${work.id})">🗑️ Eliminar</button>
                </div>
            </div>
        `;
        worksList.appendChild(workCard);
    });
}

// Eliminar obra publicada
function eliminarObra(workId) {
    if (confirm('¿Está seguro que desea eliminar esta obra?')) {
        publishedWorksData = publishedWorksData.filter(work => work.id !== workId);
        localStorage.setItem('publishedWorks', JSON.stringify(publishedWorksData));
        displayPublishedWorks();
    }
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
    inicializarRegiones();
    cargarCultura();
    cargarContacto();
    cargarInformacionTotuxlandia();
    cargarObrasPublicadas();
    displayPublishedWorks();
    
    // Event listeners
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    document.getElementById('publishForm').addEventListener('submit', handlePublishForm);
    document.getElementById('regionForm').addEventListener('submit', handleAddRegionForm);
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
console.log('Los datos se guardan localmente en tu navegador.');
