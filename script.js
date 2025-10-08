// ===============================================
// Navigation and Scroll Effects
// ===============================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// Scroll Animation Observer
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===============================================
// Publications Modal and Management
// ===============================================

const publicationModal = document.getElementById('publication-modal');
const addPublicationBtn = document.getElementById('add-publication');
const closeModalBtn = publicationModal.querySelector('.close');
const publicationForm = document.getElementById('publication-form');
const publicationsList = document.getElementById('publications-list');

// Open publication modal
addPublicationBtn.addEventListener('click', () => {
    publicationModal.style.display = 'block';
    setTimeout(() => {
        publicationModal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
    }, 10);
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    publicationModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === publicationModal) {
        publicationModal.style.display = 'none';
    }
});

// Handle publication form submission
publicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('pub-title').value;
    const authors = document.getElementById('pub-authors').value;
    const venue = document.getElementById('pub-venue').value;
    const year = document.getElementById('pub-year').value;
    const description = document.getElementById('pub-description').value;
    const link = document.getElementById('pub-link').value;
    
    addPublication(title, authors, venue, year, description, link);
    
    // Reset form and close modal
    publicationForm.reset();
    publicationModal.style.display = 'none';
    
    // Show success message
    showNotification('Publication added successfully!');
});

// Function to add a publication to the list
function addPublication(title, authors, venue, year, description, link) {
    const publicationItem = document.createElement('div');
    publicationItem.className = 'publication-item animate-on-scroll visible';
    
    publicationItem.innerHTML = `
        <div class="publication-icon">
            <i class="fas fa-file-alt"></i>
        </div>
        <div class="publication-content">
            <h3>${title}</h3>
            <p class="publication-authors">${authors}</p>
            <p class="publication-venue">${venue}, ${year}</p>
            <p class="publication-description">${description}</p>
            <div class="publication-links">
                ${link ? `<a href="${link}" target="_blank" class="pub-link"><i class="fas fa-link"></i> View</a>` : ''}
                <a href="#" class="pub-link delete-pub"><i class="fas fa-trash"></i> Delete</a>
            </div>
        </div>
    `;
    
    // Add delete functionality
    const deleteBtn = publicationItem.querySelector('.delete-pub');
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this publication?')) {
            publicationItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => publicationItem.remove(), 300);
            showNotification('Publication deleted');
        }
    });
    
    publicationsList.appendChild(publicationItem);
    observer.observe(publicationItem);
}

// ===============================================
// Gallery Management and Filtering
// ===============================================

const uploadPhotoBtn = document.getElementById('upload-photo');
const photoInput = document.getElementById('photo-input');
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Open file dialog
uploadPhotoBtn.addEventListener('click', () => {
    photoInput.click();
});

// Handle photo upload
photoInput.addEventListener('change', (e) => {
    const files = e.target.files;
    
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    addPhotoToGallery(event.target.result, file.name);
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        showNotification(`${files.length} photo(s) uploaded successfully!`);
        photoInput.value = '';
    }
});

// Function to add a photo to the gallery
function addPhotoToGallery(imageSrc, fileName, category = 'conferences') {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item animate-on-scroll visible';
    galleryItem.setAttribute('data-category', category);
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = fileName;
    
    galleryItem.appendChild(img);
    
    // Add click event to open lightbox
    galleryItem.addEventListener('click', () => {
        openLightbox(imageSrc, fileName);
    });
    
    galleryGrid.appendChild(galleryItem);
    observer.observe(galleryItem);
}

// Gallery filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===============================================
// Lightbox Gallery Viewer
// ===============================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCaption = document.querySelector('.lightbox-caption');

let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(imageSrc, caption) {
    lightbox.style.display = 'block';
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    
    // Update gallery images array
    updateGalleryImages();
    
    // Find current index
    currentImageIndex = galleryImages.findIndex(img => img.src === imageSrc);
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateGalleryImages() {
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden) img');
    galleryImages = Array.from(visibleItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));
}

function showNextImage() {
    updateGalleryImages();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const nextImage = galleryImages[currentImageIndex];
    lightboxImg.src = nextImage.src;
    lightboxCaption.textContent = nextImage.alt;
}

function showPrevImage() {
    updateGalleryImages();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const prevImage = galleryImages[currentImageIndex];
    lightboxImg.src = prevImage.src;
    lightboxCaption.textContent = prevImage.alt;
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// ===============================================
// Contact Form Handler
// ===============================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Simulate form submission
    showNotification('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    
    // In a real application, you would send the data to a server here
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showNotification('Message sent successfully!');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     showNotification('Error sending message. Please try again.', 'error');
    // });
});

// ===============================================
// Notification System
// ===============================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '15px 25px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        fontSize: '1rem',
        fontWeight: '600',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to stylesheet dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// ===============================================
// Skill Progress Animation on Scroll
// ===============================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'fillBar 2s ease-in-out forwards';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===============================================
// Interactive Hover Effects for Cards
// ===============================================

// Add tilt effect to cards on mouse move
const cards = document.querySelectorAll('.skill-card, .detail-card, .contact-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===============================================
// Timeline Animation Enhancement
// ===============================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInFromSide 0.6s ease forwards';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    timelineObserver.observe(item);
    
    // Alternate animation direction
    const animationName = index % 2 === 0 ? 'slideInFromLeft' : 'slideInFromRight';
    item.style.setProperty('--animation-name', animationName);
});

// Add timeline animations dynamically
const timelineStyles = document.createElement('style');
timelineStyles.textContent = `
    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(timelineStyles);

// ===============================================
// Active Navigation Link Highlighting
// ===============================================

const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link style dynamically
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyles);

// ===============================================
// Parallax Effect for Hero Section
// ===============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===============================================
// Loading Animation (Page Load)
// ===============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================================
// Smooth Scroll to Top Button
// ===============================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
Object.assign(scrollTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease'
});

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===============================================
// Console Welcome Message
// ===============================================

console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion and dedication 🚀', 'color: #667eea; font-size: 14px;');

// ===============================================
// Initialize
// ===============================================

console.log('Portfolio initialized successfully!');
