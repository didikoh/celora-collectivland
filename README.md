# Celora Collectiv Land

An interactive 3D property visualization platform for Collectiv Land development project. This application provides an immersive virtual tour experience, allowing potential buyers and stakeholders to explore the property, view different unit types, and discover available facilities through a real-time 3D rendered environment.

## 🏢 Project Overview

Celora Collectiv Land is a sophisticated real estate marketing tool that showcases a multi-story residential development. The application enables users to:

- **Explore 3D Building Models**: Navigate through a fully rendered 3D model of the entire development
- **View Unit Types**: Filter and visualize different unit types (Type A-E) across multiple floors
- **Check Orientation**: Browse units based on their orientation (North, South, East, West)
- **Discover Facilities**: Explore 18+ facilities including swimming pools, event spaces, gyms, and recreational areas
- **Virtual Location Tour**: Integrated 360° panoramic views of the surrounding area
- **Interactive Navigation**: Real-time 3D controls with pan, zoom, and rotation capabilities

## 🎯 Key Features

### 3D Visualization
- High-fidelity 3D rendering powered by Babylon.js
- Realistic lighting with dynamic shadows and PBR materials
- Custom HDR environment for atmospheric effects
- Smooth camera controls and animations
- Interactive mesh selection for unit details

### Unit Browser
- Filter by unit type (A, B, C, D, E)
- Filter by orientation (North, South, East, West)
- Level-by-level visualization (up to Level 9 + Rooftop)
- Color-coded availability indicators
- Detailed unit information display

### Facilities Showcase
- 18 facility types including:
  - Swimming Pool & Kids' Pool
  - Whirlpool & Water Features
  - Indoor/Outdoor Event Spaces
  - Gourmet Kitchen & Karaoke Room
  - BBQ Area, Sauna & Steam Room
  - Play areas and recreational spaces
- Interactive facility markers
- Facility details with imagery

### User Interface
- Modern, responsive design
- Bottom navigation bar with level controls
- Compass for orientation guidance
- Loading progress indicators
- Project information panel
- Interactive disclaimer system

## 🛠️ Technology Stack

### Core Technologies
- **React 19** - UI framework
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Build tool and dev server
- **Babylon.js 8.7** - 3D rendering engine

### Key Libraries
- **@babylonjs/core** - 3D graphics engine
- **@babylonjs/loaders** - 3D model loading (GLB/GLTF)
- **@babylonjs/inspector** - Development debugging tools
- **axios** - HTTP client for data fetching
- **react-icons** - Icon components

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - Fast Refresh support

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/didikoh/celora-collectivland.git

# Navigate to project directory
cd celora-collectivland

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint
```

## 📁 Project Structure

```
├── public/
│   ├── models/           # 3D GLB/GLTF models
│   ├── textures/         # Environment maps and textures
│   ├── json/             # Facility and configuration data
│   └── location/         # 360° panoramic tour files
├── src/
│   ├── components/       # React components
│   │   ├── MyScene.tsx   # Main 3D scene component
│   │   ├── BottomBar.tsx # Navigation controls
│   │   ├── Compass.tsx   # Orientation indicator
│   │   ├── Detail.tsx    # Unit details display
│   │   └── ...
│   ├── context/          # React context (AppContext)
│   ├── sub_menu/         # Sub-menu components
│   └── App.tsx           # Main application component
└── ...
```

## 🎮 Usage

1. **Navigate the 3D View**: 
   - Left-click and drag to rotate the camera
   - Right-click and drag to pan
   - Scroll to zoom in/out

2. **Browse Units**:
   - Select "Units" from the menu
   - Choose unit type and orientation
   - Adjust level slider to view different floors
   - Click on highlighted units for details

3. **View Facilities**:
   - Select "Facilities" from the menu
   - Choose Level 8 or Rooftop
   - Explore various amenities and facilities

4. **Project Information**:
   - Access project details and specifications
   - View location information and 360° tours

## 🔧 Development Features

- **Inspector Mode**: Press `Ctrl+I` during development to open Babylon.js Inspector for debugging
- **Hot Module Replacement**: Instant updates during development
- **Type Safety**: Full TypeScript support with strict typing
- **Component Modularity**: CSS Modules for scoped styling

## 📝 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For authorized contributors, please follow the standard Git workflow with feature branches and pull requests.

## 📧 Contact

For inquiries about this project, please contact the development team.
