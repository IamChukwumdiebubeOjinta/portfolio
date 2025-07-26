# Chukwumdiebube Ojinta - Portfolio

A modern, responsive portfolio website built by Chukwumdiebube Ojinta, showcasing his full-stack engineering projects and AI systems architecture work.

## 🚀 Features

- **Modern Design System**: Custom Chelsea Tech design system with dark/light mode support
- **Responsive Layout**: Optimized for all devices with mobile-first approach
- **Interactive Components**: Smooth animations and transitions using Framer Motion
- **Performance Optimized**: Next.js 14 with App Router for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design tokens

## 🎨 Design System

The portfolio uses a custom Chelsea Tech design system featuring:
- **Primary Color**: Deep Blue (#0346a5)
- **Secondary Color**: Vibrant Yellow (#ffd100)
- **Typography**: Space Grotesk for headings, Inter for body text
- **Gradients**: Custom gradient combinations for visual appeal
- **Animations**: Smooth transitions and hover effects

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Space Grotesk, Inter)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── projects/          # Project showcase pages
│   └── globals.css        # Global styles and design system
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── views/            # Page-specific components
│   └── shared/           # Shared layout components
├── public/               # Static assets
│   └── images/           # Images and logos
└── lib/                  # Utility functions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 🎯 Recent Updates

### Hero Section Improvements
- **Enhanced Profile Image**: Removed "pasted" appearance with integrated design
- **Gradient Overlays**: Added subtle gradient effects for better visual integration
- **Animated Elements**: Floating accent elements with smooth animations
- **Better Depth**: Multiple shadow layers for improved visual hierarchy

### Design System Enhancements
- **Custom CSS Utilities**: Chelsea Tech specific gradients and shadows
- **Typography System**: Optimized font pairing and weights
- **Color Palette**: Consistent color tokens throughout the application

## 📝 Customization

### Colors
Update the color scheme in `app/globals.css`:
```css
:root {
  --primary: 214 96% 33%;    /* Chelsea Blue */
  --secondary: 48 100% 50%;  /* Chelsea Yellow */
}
```

### Profile Image
Replace the profile image at `public/images/profile/ebube-headshot.jpg` with your own photo.

### Content
Update project information, skills, and personal details in the respective component files.

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy with zero configuration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Credits

**Design & Development**: [Ojinta Chukwumdiebube](https://github.com/IamChukwumdiebubeOjinta)  
*From initial design concepts to full-stack development, this portfolio represents a complete end-to-end project showcasing modern web development practices and custom design systems.*

---

Built with ❤️ using Next.js and the Chelsea Tech design system.
