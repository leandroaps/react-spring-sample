import React, { PureComponent } from "react";
import { Spring, animated } from "react-spring";

const SVGContainer = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="1024"
    height="768"
  >
    <g fillOpacity=".502">{children}</g>
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

  static PATH({fill, d}){
    const props = {d};
    if(typeof fill === "string"){
        props.fill = fill;
    }

    return <animated.path {...props} />
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

    const nodes = [...(showPrimary? primary : secondary).querySelectorAll("path")];

    return (
      <div onClick={() => this.setState({showPrimary: !showPrimary})}>
        <SVGContainer>
          {nodes.map((node, idx) => (
            <Spring
              key={idx}
              native
              to={{
                fillOpacity: 0.5,
                fill:node.getAttribute("fill") || "#000",
                d: node.getAttribute("d")
              }}
            >{styles =>
                <animated.path d={styles.d} fill={styles.fill} />
            }</Spring>
          ))}
        </SVGContainer>
      </div>
    );
  }
}
