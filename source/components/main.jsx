import React from "react";
import PropTypes from "prop-types";

import FlipMove from "react-flip-move";

import Checklist from "./checklist";
import Search from "./search";

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
    }),
    searchTerm: ""
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

  onSearch = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div className="main">
        <h1>{this.props.title}</h1>
        <Search onSearch={this.onSearch} />

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
            .filter(checklist => {
              return (
                checklist.title
                  .toLowerCase()
                  .search(this.state.searchTerm.toLowerCase()) >= 0
              );
            })
            .map(checklist => (
              <Checklist
                key={checklist.id}
                onUpdate={this.onChecklistUpdate}
                searchTerm={this.state.searchTerm}
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
