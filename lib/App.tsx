import Joyride from 'react-joyride';
import React from "react";

export class App extends React.Component {
  state = {
    steps: [
      {
        target: '.my-first-step',
        content: 'This is my awesome feature!',
      },
      {
        target: '.my-other-step',
        content: 'This another awesome feature!',
      }
    ]
  };

  render () {
    const { steps } = this.state;

    return (
      <div className="app">
        <Joyride
          steps={steps}
          />
        ...
      </div>
    );
  }
}