import React from "react";
import PropTypes from "prop-types";

import FlipMove from "react-flip-move";

import Checklist from "./checklist";

class Main extends React.Component {
  static propTypes = {
    checklists: PropTypes.array,
    title: PropTypes.string
  };

  static defaultProps = {
    checklists: []
  };

  state = {
    checklists: this.props.checklists.map(checklist => {
      checklist.isCompleted = false;
      return checklist;
    })
  };

  onChecklistUpdate = ({ isCompleted, id }) => {
    setTimeout(() => {
      this.setState(state => {
        return state.checklists.map(checklist => {
          if (checklist.id === id) {
            checklist.isCompleted = isCompleted;
          }
        });
      });
    }, Checklist.collapseDelay);
  };

  render() {
    return (
      <div className="main">
        <h1>{this.props.title}</h1>

        <FlipMove
          duration={500}
          easing="cubic-bezier(.48,.06,.13,.99)"
          maintainContainerHeight={true}
        >
          {this.state.checklists
            .sort((a, b) => {
              if (!a.isCompleted && b.isCompleted) {
                return -1;
              } else if (a.isCompleted && !b.isCompleted) {
                return 1;
              } else {
                return 0;
              }
            })
            .map(checklist => (
              <Checklist
                key={checklist.id}
                onUpdate={this.onChecklistUpdate}
                {...checklist}
              />
            ))}
        </FlipMove>
          {/*{this.state.checklists
            .map(checklist => (
              <Checklist
                key={checklist.id}
                onUpdate={this.onChecklistUpdate}
                {...checklist}
              />
            ))}*/}
      </div>
    );
  }
}

export default Main;
