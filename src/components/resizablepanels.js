import React from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

const ResizablePanels = ({ children, isDarkMode }) => (
  <PanelGroup direction="horizontal">
    {children.map((panel, index) => (
      <Panel key={index} defaultSize={panel.defaultSize} minSize={panel.minSize}>
        <div className={`h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
          {panel.component}
        </div>
        {index < children.length - 1 && <PanelResizeHandle className="w-2 bg-gray-300 hover:bg-gray-400 transition-colors" />}
      </Panel>
    ))}
  </PanelGroup>
);

export default ResizablePanels;
