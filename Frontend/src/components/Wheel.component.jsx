import React, { useState, useEffect } from "react";
import "../styles/wheel.css";

export default function Wheel(props) {
  const { facade, player, game, wheelId, wheel } = props;

  //   const defaultWheel = {
  //     wheelName: "",
  //     fields: [],
  //     players: [],
  //     company: {
  //       companyName: "",
  //     },
  //     spins: [],
  //   };
  //   const defaultPrizeList = [];

  //   const [wheel, setWheel] = useState({ ...defaultWheel });
  //   const [prizeList, setPrizeList] = useState([...defaultPrizeList]);
  //   const [theWheel, setTheWheel] = useState({...wheel})

  const defaultSpin = {
    id: -1,
    fieldNumbers: 0,
    arcSize: 0,
    top: 0,
    offSet: 0,
    rotate: 0,
    resultNumber: 0,
    resultName: "",
    resultValue: 0,
    player: {
      id: -1,
      playerName: "",
      email: "",
    },
    wheel: {
      id: -1,
      wheelName: "",
      fields: [],
      company: {
        id: -1,
        companyName: "",
      },
      spins: [],
    },
    date: {
      year: 0,
      month: 0,
      day: 0,
    },
  };

  const [theSpin, setTheSpin] = useState({ ...defaultSpin });
  const [easeOut, setEaseOut] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [radius] = useState(75);

  const defaultState = {
    list: [
      { value: 100, id: 1 },
      { value: 200, id: 2 },
      { value: 300, id: 3 },
      { value: 400, id: 4 },
      { value: 500, id: 5 },
    ],
    // list: [
    //     "$100",
    //     "$500",
    //     "$9,999",
    //     "$1",
    //     "$60",
    //     "$1,000",
    //     "$4.44",
    //     "$0",
    //     "$333"
    // ],
    // list: ["$100", "$500", "$9,999", "$1", "$60", "$1,000", "$4.44"],
    // list: ["$100","$500","$9,999","$1","$60"],
    radius: 75, // PIXELS
    rotate: 0, // DEGREES
    easeOut: 0, // SECONDS
    angle: 0, // RADIANS
    top: null, // INDEX
    offset: null, // RADIANS
    net: null, // RADIANS
    result: null, // INDEX
    spinning: false,
  };

  const [state, setState] = useState({ ...defaultState });
  const [bomp, setBomp] = useState(0);
  const [prize, setPrize] = useState("");

  //   useEffect(() => {
  //     facade.getWheelById(wheelId, (selectedWheel) => {
  //       setWheel({ ...selectedWheel });
  //       renderWheel();
  //     });
  //   }, [wheelId]);

  //   useEffect(() => {
  //     facade.getWheelById(wheelId, (selectedWheel) => {
  //       setWheel({ ...selectedWheel });
  //       renderWheel();
  //     });
  //   }, []);

  useEffect(() => {
    renderWheel();
    // setTheSpin({ ...defaultSpin });
    //   renderWheel();
  }, []);

  useEffect(() => {
    reset() 
    renderWheel();
    //   renderWheel();
  }, [wheel]);

  useEffect(() => {
    if (theSpin.rotate > 0) {
      setBomp(theSpin.rotate - 60); // -60
    }
  }, [theSpin]);

  useEffect(() => {
    if (bomp > 0) {
      setEaseOut(1);
    } else {
      setEaseOut(0);
    }
  }, [bomp]);

  useEffect(() => {
    if (easeOut === 0) {
      setSpinning(false);
    } else {
        setTimeout(() => {
            //   console.log("Random Spin: ", state.rotate);
            // getResult(randomSpin);
            setSpinning(true);
            console.log("Prize here: ", theSpin.resultName);
            //   setPrize(theSpin.resultName)
          }, 1600);
    }
  }, [easeOut]);

  // const componentDidMount = () => {
  //     // generate canvas wheel on load
  //     this.renderWheel();
  // }

  const resetCanvas = () => {
    const canvas = document.getElementById("wheel");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.save();
    // ctx.clear(true)
    // Use the identity matrix while clearing the canvas
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.beginPath();

    // Restore the transform
    // ctx.restore();
    // ctx.restore()
  };

  const renderWheel = () => {
    resetCanvas();
    // determine number/size of sectors that need to created
    let numOptions = wheel.fields.length;
    console.log(numOptions);
    let arcSize = (2 * Math.PI) / numOptions;

    // state.angle = arcSize;
    // setState({ ...state });

    // get index of starting position of selector
    topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = wheel.fields[i].prizeName;
      renderSector(i + 1, text, angle, arcSize, getColor());
      angle += arcSize;
    }
  };

  const topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    // state.top = topSpot - 1;
    // state.offset = degreesOff;
    // setState({ ...state });
  };

  const renderSector = (index, text, start, arc, color) => {
    // create canvas arc for each list element

    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    // let radius = state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const getColor = () => {
    // randomly generate rbg values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  };

  const spin = () => {
    // setEaseOut(2);
    facade.createSpin(player, wheel.id, (createdSpin) => {
      console.log(createdSpin);
      setTheSpin({ ...createdSpin });
      //   setBomp(theSpin.rotate - 60); // -60
      //   console.log(theSpin.rotate)
      //   showRotator();
      //   console.log(bomp)
      //   setSpinning(true);
    });

    // set random spin degree and ease out time
    // set state variables to initiate animation
    // let randomSpin = Math.floor(Math.random() * 900) + 500;
    // console.log(randomSpin);

    // state.rotate = randomSpin;
    // state.easeOut = 2;
    // state.spinning = true;

    // calcalute result after wheel stops spinning
    // setTimeout(() => {
    //   //   console.log("Random Spin: ", state.rotate);
    //   // getResult(randomSpin);
    //   setSpinning(false);
    //   console.log("Prize here: ", theSpin.resultName);
    //   //   setPrize(theSpin.resultName)
    // }, 2000);
  };

  const getResult = (spin) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const { angle, top, offset, list } = state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    console.log("NetRotate: ", netRotation);
    let travel = netRotation + offset;
    console.log("Travel1: ", travel);
    let count = top + 1;
    while (travel > 0) {
      console.log("Angle: ", angle);
      travel = travel - angle;
      console.log("Travel2: ", travel);
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
      console.log("result 1: ", result);
    } else {
      // console.log('Length: ', list.length)
      // console.log(list)
      result = wheel.fields.length + count;
      console.log("result 1: ", result);
    }

    // set state variable to display result
    // const newState = {...state}
    state.net = netRotation;
    state.result = result;
    setState({ ...state });
    // setState({
    //     net: netRotation,
    //     result: result
    // });
  };

  const reset = () => {
    // reset wheel and result
    // const newState = {...state}
    // state.rotate = 0;
    // state.easeOut = 0;
    // state.result = null;
    // state.spinning = null;
    // setState({ ...state });
    setEaseOut(0);
    setBomp(0);
    setSpinning(false);
    // renderWheel();
  };

  const showResult = () => {
    return setTimeout(() => {
      console.log("Result", theSpin.resultName);
      if (theSpin.resultName === "") {
        return "";
      } else {
        return theSpin.resultName;
      }
    }, 2000);
    // if (state.result === null) {
    //   return "";
    // } else {
    //   return wheel.fields[state.result].prizeName;
    // }
  };

  return (
    <div>
      {/* {console.log(player)} */}
      {/* {console.log(game)} */}
      {/* {console.log(wheelId)} */}
      {/* {console.log(props.wheel)} */}
      {/* {console.log("Wheel fields length: ", props.wheel.fields.length)} */}
      {console.log("Rorator: ", theSpin.rotate)}
      {console.log("Bomp er: ", bomp)}
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="App">
              {/* {console.log(state)} */}
              <h1>
                Prøv Lykken og Vind med "{wheel.wheelName}" &#129337;&#127996;
              </h1>
              {/* <p>
                <span id="selector">&#9660;</span>
              </p> */}
              <p style={{ textAlign: "center", fontSize: "50px" }}>
                <span>&#128071;&#127995;</span>
                <span style={{ color: "white" }}></span>
              </p>
              <canvas
                id="wheel"
                width="500"
                height="500"
                style={{
                  WebkitTransform: `rotate(${bomp}deg)`,
                  WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
                  marginTop: "-100px",
                }}
              />

              {/* {state.spinning ? (
                <button type="button" id="reset" onClick={reset}>
                  reset
                </button>
              ) : (
                <button type="button" id="spin" onClick={spin}>
                  spin
                </button>
              )} */}
              <div>
                {spinning === true ? (
                  <div style={{ marginBottom: "80px" }}>
                    <div className="display">
                      <span id="readout">
                        DU VANDT:{"  "}
                        <span id="result">{theSpin.resultName}</span>
                        {/*{console.log(state.list[state.result].value)}*/}
                        {/*<span id="result">{state.list[state.result]}</span>*/}
                        {/* {state.result === null ? ( */}
                        {/* <span id="result"></span> */}
                        {/* ) : ( */}
                        {/* <span id="result"> */}
                        {/* {state.list[state.result].value} */}
                        {/* </span> */}
                        {/* )} */}
                      </span>
                    </div>
                    <button type="button" id="reset" onClick={reset}>
                      Reset
                    </button>
                  </div>
                ) : (
                  <div>
                    <button type="button" id="spin" onClick={spin}>
                      Spin
                    </button>
                  </div>
                )}
              </div>
              {/* <div className="display">
                <span id="readout">
                  YOU WON:{"  "}
                  {console.log(state.list[state.result].value)}
                  <span id="result">{state.list[state.result]}</span>
                  {state.result === null ? (
                    <span id="result"></span>
                  ) : (
                    <span id="result">{state.list[state.result].value}</span>
                  )}
                </span>
              </div> */}
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
