# DIRIWARI Professional Portfolio

An interactive and attractive professional portfolio website showcasing career path, interests, hobbies, goals, publications, and gallery.

## 🌟 Features

### Interactive Design
- **Smooth Animations**: Every section and clickable element features smooth, engaging animations
- **Scroll Effects**: Content animates into view as you scroll
- **Hover Interactions**: Cards and buttons have interactive hover effects
- **Parallax Hero Section**: Eye-catching animated hero section with gradient background

### Key Sections

#### 1. **About Me**
- Personal introduction
- Interests and hobbies
- Goals and vision
- Professional overview

#### 2. **Career Timeline**
- Visual timeline of career milestones
- Education history
- Professional achievements
- Animated timeline dots and cards

#### 3. **Skills & Expertise**
- Interactive skill cards
- Animated progress bars
- Technical and professional competencies
- Visual skill representation

#### 4. **Publications**
- Comprehensive publications list
- **Add/Remove Publications**: Built-in modal for managing publications
- Publication details (title, authors, venue, year)
- Direct links to papers
- Interactive publication cards

#### 5. **Photo Gallery**
- **Upload Photos**: Easy photo upload functionality
- **Filter by Category**: 
  - Conferences
  - Thesis Defense
  - Presentations
  - All Photos
- **Lightbox Viewer**: Full-screen image viewing
- Keyboard navigation (arrow keys, ESC)
- Smooth transitions and animations

#### 6. **Contact Section**
- Contact information cards
- Interactive contact form
- Social media links
- Animated form validation

### Technical Features
- **Responsive Design**: Fully mobile-responsive
- **Modern CSS**: Gradients, shadows, and smooth transitions
- **JavaScript Interactions**: Dynamic content management
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Performance**: Optimized loading and animations
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic text editor (optional, for customization)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IyanuDP/DIRIWARI_Portfolio.git
cd DIRIWARI_Portfolio
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

### Hosting Options

#### GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select branch (usually `main` or `gh-pages`)
4. Click "Save"
5. Your site will be available at `https://yourusername.github.io/DIRIWARI_Portfolio/`

#### Netlify
1. Sign up at [netlify.com](https://www.netlify.com/)
2. Drag and drop your project folder
3. Your site is live!

#### Vercel
1. Sign up at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Deploy with one click

## 📝 Customization Guide

### Personal Information

1. **Edit `index.html`**:
   - Update name in navigation logo
   - Modify hero section text
   - Change about me description
   - Update contact information

2. **Career Timeline**:
   - Edit timeline items with your career history
   - Update dates and descriptions
   - Add/remove timeline entries

3. **Skills Section**:
   - Modify skill cards
   - Adjust skill progress bar percentages
   - Add new skills as needed

### Colors and Theme

Edit `styles.css` CSS variables in the `:root` section:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #7c3aed;    /* Secondary accent */
    --accent-color: #f59e0b;       /* Highlight color */
    --dark-bg: #0f172a;            /* Dark backgrounds */
    --light-bg: #f8fafc;           /* Light backgrounds */
}
```

### Adding Your Photo

Replace the image placeholder in the About section:

```html
<!-- Find this in index.html -->
<div class="image-placeholder">
    <i class="fas fa-user-circle"></i>
</div>

<!-- Replace with: -->
<div class="image-placeholder">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

### Fonts

To change fonts, add your preferred font from Google Fonts:

```html
<!-- Add to <head> in index.html -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update in `styles.css`:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

## 📱 Features Usage

### Adding Publications
1. Click "Add Publication" button
2. Fill in the form:
   - Title
   - Authors
   - Venue (Journal/Conference)
   - Year
   - Description
   - Link (optional)
3. Click "Add Publication"

### Uploading Photos
1. Click "Upload Photos" button in Gallery section
2. Select one or multiple images
3. Photos appear instantly in the gallery
4. Click any photo to view in full-screen lightbox
5. Use arrow keys or on-screen buttons to navigate

### Filtering Gallery
- Click category buttons to filter photos
- Categories: All, Conferences, Thesis Defense, Presentations
- Smooth animation when switching filters

## 🎨 Design Philosophy

This portfolio follows modern web design principles:
- **Clean and Professional**: Minimalist design with focus on content
- **Interactive**: Engaging animations and transitions
- **User-Friendly**: Intuitive navigation and clear structure
- **Accessible**: Proper contrast, readable fonts, semantic HTML
- **Fast**: Optimized performance with CSS animations

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📄 File Structure

```
DIRIWARI_Portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive features and functionality
└── README.md           # Documentation
```

## 🤝 Contributing

Feel free to fork this repository and customize it for your own use!

## 📧 Contact

For questions or feedback, use the contact form on the website or reach out through the social media links provided.

## 📜 License

This project is open source and available for personal use.

## 🎯 Future Enhancements

Potential features to add:
- Blog section
- Project showcase
- Testimonials
- Dark mode toggle
- Multi-language support
- Analytics integration
- Backend for form submissions
- Database for publications

## 💡 Tips for Success

1. **Keep Content Updated**: Regularly update your publications and gallery
2. **Professional Photos**: Use high-quality images in the gallery
3. **Clear Descriptions**: Write concise, impactful descriptions
4. **Test Responsiveness**: Check on different devices
5. **SEO Optimization**: Update meta tags for better discoverability
6. **Regular Backups**: Keep backup of your customizations

---

**Built with ❤️ for showcasing professional excellence**