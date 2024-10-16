import bacteriaAnimation1 from '../assets/anims/Bacteria1-lottie.json';
import bacteriaAnimation2 from '../assets/anims/Bacteria2-lottie.json';
import bacteriaAnimation3 from '../assets/anims/Bacteria3-lottie.json';

export const cardConfig = [
  { id: 'TotalOrganisms', type: 'stat', title: 'Total Organisms', value: 1000, color: 'text-indigo-600' },
  { id: 'AverageFitness', type: 'stat', title: 'Average Fitness', value: 0.75, color: 'text-green-500' },
  { id: 'TotalGenerations', type: 'stat', title: 'Total Generations', value: 25, color: 'text-red-500' },
  { id: 'Cells', type: 'stat', title: 'Cells', value: 0, color: 'text-purple-500' },
  { id: 'Synapses', type: 'stat', title: 'Synapses', value: 0, color: 'text-yellow-500' },
  { id: 'Genes', type: 'stat', title: 'Genes', value: 0, color: 'text-blue-500' },
  { id: 'Neurons', type: 'stat', title: 'Neurons', value: 0, color: 'text-pink-500' },
  { id: 'SimulationStatus', type: 'stat', title: 'Simulation Status', value: 'Running', color: 'text-green-500' },
  {
    id: 'Organism1',
    type: 'organism',
    name: "Blobulus Wigglius Maximus",
    description: "The wiggliest of them all!",
    animationData: bacteriaAnimation1,
    textColor: 'green'
  },
  {
    id: 'Organism2',
    type: 'organism',
    name: "Squigglius Jigglypuff Enormus",
    description: "Master of the squiggle dance",
    animationData: bacteriaAnimation2,
    textColor: 'blue'
  },
  {
    id: 'Organism3',
    type: 'organism',
    name: "Wobbletonium Giganticulus Prime",
    description: "The prime minister of wobbling",
    animationData: bacteriaAnimation3,
    textColor: 'purple'
  },
  // Add the MessageCard to the cardConfig
  {
    id: 'WelcomeMessage',
    type: 'message',
    title: 'Welcome Message'
  }
];
