import React from "react";
import PrimitiveTransition from "./PrimitiveTransition";

import tucano from "assets/tucano.primitive.svg";
import arara from "assets/arara.primitive.svg";

export default () =>
  <section className="section">
    <div className="container">
      <h1 className="title">Progressive Image Loading examples</h1>
    </div>

    <div className="container">
      <PrimitiveTransition primary={tucano} secondary={arara}/>
    </div>
  </section>