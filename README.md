# EvolveSim

![Project Logo](src\assets\Images\petrydish.jpg)

## Description
**EvolveSim** is a 2D simulation game where players design and evolve modular organisms in a dynamic, physics-based environment. The game combines elements of real-time strategy (RTS), rogue-like progression, and emergent behaviors to create an ever-evolving ecosystem where organisms compete for survival, resources, and dominance.

**Live Demo**: [evolvesim.com](https://evolvesim.com)

## Features

### Gameplay Overview
In **EvolveSim**, players embark on a journey of creation and evolution. The game revolves around designing, programming, and evolving modular organisms in a dynamic, physics-based environment. Each organism is a unique creation, composed of various specialized cells and governed by player-programmed behaviors.

Key aspects of the gameplay include:
- Designing organisms using a diverse array of cell types
- Programming organism behaviors through an intuitive visual interface
- Competing in various game modes to test and refine your creations
- Evolving and adapting your organisms to overcome challenges and rivals

The game emphasizes emergent behavior, where complex interactions arise from simple rules, creating an ever-evolving ecosystem where organisms must adapt to survive, thrive, and dominate.

### Core Gameplay Systems

#### Organism Creation
Players design their organisms using a modular, cell-based system:

- **Modular Cells**: Each cell type has unique attributes and functions, allowing for diverse organism designs.
- **Freeform Design**: Organisms are built in a gridless, organic environment, with physics-driven properties.
- **Dynamic Evolution**: Organisms can adapt and mutate over time, responding to environmental pressures.

#### Behavior Programming
At the heart of each organism is its behavior tree, a powerful AI system that players can customize:

- **Visual Programming Interface**: An intuitive, node-based interface for creating complex behaviors.
- **Stimuli Nodes**: Input nodes that detect environmental factors, resources, threats, etc.
- **Synapses**: Connecting rules and conditions that process input and determine responses.
- **Neurons**: Output nodes representing specific behaviors like fleeing, attacking, gathering resources, or searching.

This system allows players to create sophisticated AI behaviors, from simple reactive organisms to complex, decision-making entities.

#### Simulation and Emergent Behavior
Once created and programmed, organisms are placed in a physics-based simulation:

- **Real-time Interaction**: Organisms interact with the environment and each other based on their design and programmed behaviors.
- **Emergent Complexity**: Simple rules combine to create complex, often unexpected behaviors and strategies.
- **Adaptive Challenges**: The environment and competing organisms provide ever-changing challenges, driving evolution and adaptation.

#### Evolution and Adaptation
As organisms face challenges and compete, they evolve:

- **Natural Selection**: Successful traits and behaviors are more likely to be passed on to future generations.
- **Mutation**: Random changes in cell structure or behavior trees can lead to new adaptations.
- **Player-Guided Evolution**: Players can intervene in the evolutionary process, selecting traits to enhance or modify.

These core systems work together to create a rich, dynamic gameplay experience where creativity, strategy, and the principles of evolution combine to produce endless possibilities.

### Game Modes
**EvolveSim** offers a variety of modes to challenge players and their organisms:

- **1v AI**: Test your organism against an AI-controlled opponent in a one-on-one battle.
- **1v1**: Engage in player versus player combat, pitting your creation against another player's organism.
- **Free-for-All (FFA)**: Multiple organisms compete in a chaotic arena where only the strongest survive.
- **Survival**: Face increasingly difficult challenges and environmental hazards in this endurance-based mode.
- **Sandbox**: Freely experiment with organism designs and observe their behaviors in a risk-free environment.
- **Hardcore (Permadeath)**: For the ultimate challenge, compete in a mode where organism death is permanent.

### Progression and Upgrades
**EvolveSim** features a deep progression system that allows players to evolve their organisms and unlock new possibilities:

- **Evolutionary Tree**: Players progress through a branching evolutionary tree, unlocking new cell types, mutations, and abilities.
  - **Cell Types**: Discover and unlock new specialized cells, each with unique functions and attributes.
  - **Mutations**: Acquire beneficial mutations that enhance existing cell properties or introduce new capabilities.
  - **Abilities**: Unlock organism-wide abilities that provide strategic advantages in different game modes.

- **Resource Management**: Collect and manage various resources to fuel your evolutionary progress:
  - **DNA Points**: Earned through gameplay, used to unlock new items in the evolutionary tree.
  - **Biomass**: Gathered during simulations, used for creating and upgrading organisms.
  - **Rare Elements**: Discovered in specific environments, used for advanced upgrades and special abilities.

- **Skill-Based Progression**: Improve your design skills and strategic thinking:
  - **Design Challenges**: Complete specific organism design challenges to unlock new cell arrangements and strategies.
  - **Behavior Programming**: Develop and refine organism behaviors through a visual programming interface, unlocking more complex action possibilities.

- **Environmental Adaptation**: Expose your organisms to different environments to unlock adaptive traits:
  - **Biome Specialization**: Evolve traits specific to different biomes (e.g., heat resistance for desert environments).
  - **Pressure Adaptation**: Unlock deep-sea adaptations by surviving high-pressure environments.

- **Meta-Progression**: Long-term progression that persists across multiple playthroughs:
  - **Species Bank**: Store and manage multiple evolved species, allowing for diverse strategies.
  - **Global Upgrades**: Unlock permanent upgrades that benefit all your future organisms and playthroughs.
  - **Achievements**: Complete specific milestones to unlock cosmetic rewards and bonus content.

This multi-faceted progression system ensures that players always have new goals to strive for and ways to improve their organisms, keeping the gameplay fresh and engaging over long periods.

### Machine Learning Integration

#### ML-Driven Evolution
EvolveSim leverages machine learning to create a dynamic and ever-evolving ecosystem:

- **Genetic Algorithms**: Implement genetic algorithms to simulate natural selection and evolution of organisms over generations.
- **Adaptive AI Opponents**: Create AI-controlled organisms that learn and adapt their strategies based on player interactions.
- **Behavior Optimization**: Use reinforcement learning to optimize organism behaviors in various environments and scenarios.

#### Other ML Applications
Machine learning is integrated into various aspects of the game to enhance gameplay and user experience:

- **Procedural Content Generation**: Generate diverse environments, challenges, and organism variations using ML algorithms.
- **Player Behavior Analysis**: Analyze player strategies and preferences to provide personalized gameplay experiences and challenges.
- **Dynamic Difficulty Adjustment**: Automatically adjust game difficulty based on player performance and learning curves.
- **Anomaly Detection**: Identify and manage unexpected emergent behaviors or potential exploits in the organism ecosystem.

These machine learning integrations ensure that EvolveSim provides a rich, dynamic, and continuously evolving gameplay experience that adapts to each player's style and skill level.

### Planned Features
- Advanced organism customization with a wider range of cell types
- Machine learning integration for evolving AI behaviors
- More complex environments with dynamic hazards
- Leaderboards and achievements for competitive gameplay
- Integration of Godot simulation engine for enhanced physics-based organism interactions and simulation logic

### Features Implemented
- **Authentication**: Secure user authentication system implemented using Firebase Authentication.
- **Database Access**: Integration with Firebase Realtime Database for storing and retrieving user data, organism information, and game progress.
- **Basic UI**: Initial user interface setup with responsive design using React and TailwindCSS.
  - Login and registration pages
  - Basic dashboard layout
  - Navigation menu

### What's Next?
- **Working Organism Page**: Develop a dedicated page for viewing and managing individual organisms.
- **Dynamic Dashboard Widgets**: Create customizable widgets for the dashboard to display relevant game information and statistics.
- **Component Creation**: Implement the system for creating and managing different cell types and components for organisms.
- **Editor Page**: Design and develop the main organism editor interface, allowing users to create and modify their creatures.
- **Gameplay Rules**: Define and implement the core gameplay rules, including organism behavior, resource management, and evolution mechanics.

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
