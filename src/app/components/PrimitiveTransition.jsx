import React, { PureComponent } from "react";
import { Spring, animated } from "react-spring";

const SVGContainer = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="1024"
    height="768"
  >
  <rect x="0" y="0" width="1024" height="768" fill="#607153" />
  <g transform="scale(4.000000) translate(0.5 0.5)">{children}</g>
  </svg>
);

export default class PrimitiveTransition extends PureComponent {
  state = { showPrimary: false, primary: null, secondary: null };

  static extractSVG(path) {
    const parser = new DOMParser();

    return fetch(path)
      .then(res => res.text())
      .then(svg => parser.parseFromString(svg, "image/svg+xml"));
  }

  componentWillMount() {
    const { primary, secondary } = this.props;
    PrimitiveTransition.extractSVG(primary).then(svg =>
      this.setState({ primary: svg })
    );
    PrimitiveTransition.extractSVG(secondary).then(svg =>
      this.setState({ secondary: svg })
    );
  }

  render() {
    const {showPrimary, primary, secondary } = this.state;
    if (!primary || !secondary) return null;
    const nodes = [...(showPrimary? primary : secondary).querySelectorAll("polygon")];

    console.log(`${showPrimary? 'tucano' : 'arara'} svg: number of polygons ${nodes.length}`)
    return (
      <div onClick={() => this.setState({showPrimary: !showPrimary})}>
        <SVGContainer>
          {nodes.map((node, idx) => (
            <Spring
              key={idx}
              native
              to={{
                fillOpacity: node.getAttribute("fill-opacity"),
                fill:node.getAttribute("fill"),
                points: node.getAttribute("points")
              }}
            >{styles =>
                <animated.polygon {...styles} />
            }</Spring>
          ))}
        </SVGContainer>
      </div>
    );
  }
}
