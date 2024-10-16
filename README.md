# EvolveSim

![Project Logo](src\assets\Images\petrydish.jpg)

## Description
**EvolveSim** is a 2D simulation game where players design and evolve modular organisms in a dynamic, physics-based environment. The game combines elements of real-time strategy (RTS), rogue-like progression, and emergent behaviors to create an ever-evolving ecosystem where organisms compete for survival, resources, and dominance.

**Live Demo**: [evolvesim.com](https://evolvesim.com)

## Features

### Gameplay Overview
In **EvolveSim**, players can create, modify, and manage organisms using a modular cell-based system. Organisms are composed of different cells, each with unique attributes and behaviors. These organisms interact in an open environment where they must adapt to resource scarcity, changing conditions, and competitive threats.

The primary focus of the game is on emergent behavior, where organisms evolve, display complex interactions, and adapt over time. Players progress by unlocking new cell types and behaviors, improving their organisms, and testing them in various game modes.

### Core Gameplay Systems

#### Organism Creation
Players design organisms using modular cells, each representing a specific function (e.g., muscle cells, sensory cells, energy cells). The organisms are freely arranged in a gridless, freeform environment, with cell connections forming skin-like boundaries that evolve naturally.

- **Modular Cells**: Different cell types allow for a wide variety of organism designs.
- **Freeform Design**: No grid constraints—cells are placed in an organic manner with physics-driven properties.
- **Procedural Growth**: As organisms evolve, they adapt and mutate dynamically.

#### Simulation and Emergent Behavior
Once created, organisms are placed in an evolving, physics-based simulation where they must compete for resources and survival. The simulation focuses on:

- **Emergent Behaviors**: Organisms display unpredictable behaviors based on their design, environment, and interactions.
- **Physics-Based Movement**: Organisms' interactions and movement are driven by physics, making every action feel dynamic and responsive.

### Game Modes
**EvolveSim** offers a variety of modes, including:

- **Survival Mode**: Organisms must adapt to a changing environment and scarce resources while fending off enemies.
- **Combat Mode**: Player-created organisms engage in real-time battles with enemy organisms in various arenas.
- **Sandbox Mode**: Players can freely experiment with organism designs and observe their behaviors in a risk-free environment.

### Progression and Upgrades
Players unlock new cell types, abilities, and traits through progression, allowing them to gradually improve their organisms.

- **Rogue-Like Progression**: Every run in the game is different, but players maintain long-term progression through unlocks and organism enhancements.
- **Cell Upgrades**: New cell types and mutations are unlocked as players evolve their organisms.

### Multiplayer and AI
Compete against AI-controlled organisms or other players:

- **AI Opponents**: Fight against adaptive AI that evolves to challenge your organisms.
- **PvP**: Battle other players' organisms in real-time, strategic matches.

## Technical Overview
The project is built as a web-based app leveraging modern web technologies, with Firebase as the backend for managing user data, organism stats, and progression.

### Technologies Used:
- **Frontend**: React, Redux, TailwindCSS, Styled Components
- **Backend**: Firebase for storing simulation results, user progression, and organism data
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **UI Components**: Headless UI, React Icons, Lucide React
- **Animations**: Framer Motion, Lottie
- **Data Handling**: Axios for API requests, Day.js for date manipulation
- **Drag and Drop**: React Beautiful DnD, React DnD
- **Layout**: React Grid Layout, React Resizable, React Resizable Panels
- **Machine Learning**: TensorFlow.js, Synaptic
- **Notifications**: React Toastify
- **Build Tools**: React Scripts, Babel, PostCSS, Autoprefixer

### Planned Features
- Advanced organism customization with a wider range of cell types
- Machine learning integration for evolving AI behaviors
- More complex environments with dynamic hazards
- Leaderboards and achievements for competitive gameplay
- Integration of Godot simulation engine for enhanced physics-based organism interactions and simulation logic

## Installation
To get started with this project, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/MostSinister/EvolveSim.git
   ```
2. Navigate to the project directory:
   ```bash
   cd EvolveSim
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Usage
After installation, you can run the project with the following command:
```bash
npm start
```

## Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- **Email**: gfbujold@sinisterarts.io
- **GitHub**: [MostSinister](https://github.com/MostSinister)
