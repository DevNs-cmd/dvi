# Devaashi Institute Website Specification

## 1. Project Overview
- **Project Name**: Devaashi Institute
- **Type**: Responsive Website (Single Page)
- **Core Functionality**: A professional computer institute website showcasing courses, online programs, and payment integration
- **Target Users**: Students, professionals seeking IT training, parents looking for quality computer education

## 2. UI/UX Specification

### Layout Structure
- **Header**: Fixed navigation with logo, menu links, and CTA button
- **Hero Section**: Full-width introduction with headline, subtext, and call-to-action
- **About Section**: Brief about the institute
- **Courses Section**: Grid of classroom courses with details
- **Online Courses Section**: Grid of online/self-paced courses
- **Why Choose Us**: Features/benefits section
- **Payment Section**: Payment button for course enrollment
- **Footer**: Contact info, social links, copyright

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette (Light Theme with Purple)
- **Primary Purple**: #7C3AED (Vibrant purple)
- **Primary Purple Dark**: #5B21B6
- **Primary Purple Light**: #A78BFA
- **Background**: #FFFFFF
- **Background Alt**: #F8F7FF (Light purple tint)
- **Text Primary**: #1F2937
- **Text Secondary**: #6B7280
- **Accent**: #F59E0B (Amber for highlights)
- **Success**: #10B981

#### Typography
- **Heading Font**: 'Playfair Display', serif (Elegant, professional - NOT AI vibe)
- **Body Font**: 'Source Sans Pro', sans-serif (Clean, readable)
- **Hero Title**: 56px desktop, 36px mobile
- **Section Title**: 40px desktop, 28px mobile
- **Body Text**: 16px

#### Spacing System
- Section padding: 80px vertical desktop, 50px mobile
- Container max-width: 1200px
- Card gap: 30px
- Element spacing: 16px, 24px, 32px

#### Visual Effects
- Subtle box shadows: 0 4px 20px rgba(124, 58, 237, 0.1)
- Smooth hover transitions: 0.3s ease
- Card hover lift effect
- Gradient accents on buttons
- Elegant scroll animations

### Components

#### Navigation
- Logo with institute name
- Menu: Home, About, Courses, Online Courses, Contact
- "Enroll Now" purple button
- Mobile hamburger menu

#### Hero Section (NOT AI vibe, NOT gamified)
- Clean professional design
- Headline: "Empower Your Future in Technology"
- Subtext: Brief description of institute
- Two buttons: "Explore Courses" (primary), "View Online Programs" (outline)
- Decorative subtle geometric pattern (not robot/AI graphics)

#### Course Cards
- Course icon/image
- Course title
- Duration
- Description
- "Know More" button
- Hover: subtle lift and shadow increase

#### Online Course Cards
- Thumbnail image placeholder
- Course title
- Instructor name
- Price
- Rating stars
- "Enroll Now" button

#### Payment Button
- Prominent "Pay Now" button
- Opens payment modal/section

## 3. Functionality Specification

### Core Features
1. **Responsive Navigation**: Mobile hamburger menu toggle
2. **Smooth Scroll**: Anchor links scroll smoothly
3. **Course Filtering**: Not required (simple display)
4. **Payment Button**: Links to payment section/modal
5. **Animations**: Fade-in on scroll for sections
6. **Contact Form**: Basic form with validation (frontend only)

### User Interactions
- Click navigation → smooth scroll to section
- Hover on cards → lift effect
- Click hamburger → mobile menu toggle
- Click payment button → scroll to payment section or show modal

### Data (Static)
- 6 Classroom Courses
- 4 Online Courses

## 4. Course Content

### Classroom Courses
1. **Computer Fundamentals** - 3 months
2. **Web Development** - 6 months
3. **Python Programming** - 4 months
4. **Data Science** - 6 months
5. **Graphic Design** - 4 months
6. **Hardware & Networking** - 5 months

### Online Courses
1. **Complete Web Development Bootcamp** - $99
2. **Python for Data Science** - $79
3. **Full Stack Development** - $149
4. **Digital Marketing Mastery** - $69

## 5. Acceptance Criteria

- [ ] Website loads without errors
- [ ] All sections visible and properly styled
- [ ] Navigation works on all devices
- [ ] Mobile menu functions correctly
- [ ] All course cards display properly
- [ ] Purple color theme consistently applied
- [ ] Light theme with proper contrast
- [ ] Payment button visible and functional
- [ ] Hero section is professional (not AI/gamified)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Smooth scroll navigation works
- [ ] Hover effects on interactive elements
