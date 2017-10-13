import React from "react";
import PropTypes from "prop-types";

import emoji from "emoji.json";
import FlipMove from "react-flip-move";

import Checklist from "./checklist";

const getEmoji = () => {
  let emojis = emoji.slice(0, 107); // Remove all the boring ones
  emojis = emojis.filter(emoji => emoji.name.indexOf("⊛") === -1); // Filter out weird ones
  const index = Math.floor(Math.random() * emojis.length);

  return emojis[index].char;
};

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
      checklist.emoji = getEmoji();
      checklist.isCompleted = false;
      checklist.items = checklist.items.map(item => {
        item.emoji = getEmoji();
        return item;
      });
      return checklist;
    })
  };

  onChecklistUpdate = ({ isCompleted, id }) => {
    this.setState(state => {
      return state.checklists.map(checklist => {
        if (checklist.id === id) {
          checklist.isCompleted = isCompleted;
        }
      });
    });
  };

  render() {
    return (
      <div className="main">
        <h1>{this.props.title}</h1>

        <FlipMove
          duration={500}
          delay={1000}
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
      </div>
    );
  }
}

export default Main;
