# Chelsea Tech Design System

## Overview
Chelsea Tech is a dark mode first design system featuring smooth gradients, subtle animations, and crisp typography. The color palette uses blue as primary and yellow as secondary, applied intentionally without being overly saturated.

## Color Palette

| Role                 | Color (Hex) | Usage                                     |
| -------------------- | ----------- | ----------------------------------------- |
| **Primary Blue**     | `#0346a5`   | Buttons, links, active highlights         |
| **Secondary Yellow** | `#ffd100`   | Accents, highlights, call-to-action hover |
| **Dark Background**  | `#0a0a0a`   | Page background                           |
| **Surface**          | `#1a1a1a`   | Cards, headers                            |
| **Text (Light)**     | `#f9f9f9`   | Body text                                 |
| **Text (Muted)**     | `#a3a3a3`   | Secondary/label text                      |
| **Border**           | `#2e2e2e`   | Dividers, input borders                   |

## CSS Variables
The design system uses CSS custom properties that automatically adapt to light/dark modes:

```css
/* Dark mode (default) */
--primary: 214 96% 33%; /* #0346a5 */
--secondary: 48 100% 50%; /* #ffd100 */
--background: 0 0% 4%; /* #0a0a0a */
--foreground: 0 0% 98%; /* #f9f9f9 */
--card: 0 0% 10%; /* #1a1a1a */
--muted-foreground: 0 0% 64%; /* #a3a3a3 */
--border: 0 0% 18%; /* #2e2e2e */
```

## Utility Classes

### Gradients
- `.bg-chelsea-gradient` - Primary blue to dark background gradient
- `.bg-chelsea-gradient-reverse` - Dark background to primary blue gradient
- `.bg-chelsea-accent-gradient` - Secondary yellow to primary blue gradient

### Colors
- `.text-chelsea-primary` - Primary blue text
- `.text-chelsea-secondary` - Secondary yellow text
- `.border-chelsea-primary` - Primary blue border
- `.border-chelsea-secondary` - Secondary yellow border

### Shadows
- `.shadow-chelsea` - Blue-tinted shadow
- `.shadow-chelsea-accent` - Yellow-tinted shadow

### Animations
- `.transition-chelsea` - Smooth 0.3s transition
- `.hover-lift` - Subtle upward movement on hover
- `.hover-glow` - Glowing shadow effect on hover

## Usage Examples

### Buttons
```jsx
// Primary button with gradient
<Button className="bg-chelsea-gradient hover:bg-chelsea-gradient-reverse transition-chelsea hover-lift hover-glow">
  Get Started
</Button>

// Outline button with primary border
<Button variant="outline" className="border-chelsea-primary text-primary hover:bg-primary hover:text-primary-foreground transition-chelsea">
  Learn More
</Button>
```

### Text Gradients
```jsx
// Name with gradient
<span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
  Ebube Ojinta
</span>
```

### Cards
```jsx
// Card with Chelsea Tech styling
<div className="bg-card border border-border rounded-lg p-6 shadow-chelsea hover:shadow-chelsea-accent transition-chelsea hover-lift">
  <h3 className="text-foreground font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Navigation
```jsx
// Navigation link with underline animation
<a className="text-muted-foreground hover:text-primary transition-chelsea relative group">
  Home
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
</a>
```

## Best Practices

1. **Dark Mode First**: The design system is optimized for dark mode
2. **Smooth Transitions**: Always use `.transition-chelsea` for state changes
3. **Intentional Color Use**: Use primary blue for main actions, secondary yellow for accents
4. **Subtle Animations**: Use `.hover-lift` and `.hover-glow` sparingly for enhanced UX
5. **Gradient Combinations**: Combine primary and secondary colors in gradients for visual interest

## Theme Configuration
The design system is configured in `app/globals.css` and uses Next.js theme provider with dark mode as default:

```jsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
  {/* Your app */}
</ThemeProvider>
``` 