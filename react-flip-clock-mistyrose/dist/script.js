// function component
const AnimatedCard = ({ animation, digit }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: `flipCard ${animation}` }, /*#__PURE__*/
    React.createElement("span", null, digit)));


};

// function component
const StaticCard = ({ position, digit }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: position }, /*#__PURE__*/
    React.createElement("span", null, digit)));


};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {

  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit - 1;

  // to prevent a negative value
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ?
    59 :
    previousDigit;
  } else {
    previousDigit = previousDigit === -1 ?
    23 :
    previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ?
  previousDigit :
  currentDigit;
  const digit2 = !shuffle ?
  previousDigit :
  currentDigit;

  // shuffle animations
  const animation1 = shuffle ?
  'fold' :
  'unfold';
  const animation2 = !shuffle ?
  'fold' :
  'unfold';

   //if (unit='seconds') {return null;}
    return /*#__PURE__*/(
    React.createElement("div", { className: 'flipUnitContainer' }, /*#__PURE__*/
    React.createElement(StaticCard, {
      position: 'upperCard',
      digit: currentDigit }), /*#__PURE__*/

    React.createElement(StaticCard, {
      position: 'lowerCard',
      digit: previousDigit }), /*#__PURE__*/

    React.createElement(AnimatedCard, {
      digit: digit1,
      animation: animation1 }), /*#__PURE__*/

    React.createElement(AnimatedCard, {
      digit: digit2,
      animation: animation2 })));



};

// class component
class FlipClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true };

  }

  componentDidMount() {
    this.timerID = setInterval(
    () => this.updateTime(),
    50);

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    // get new date
    const time = new Date();
    // set time units
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle });

    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle });

    }
    // on second chanage, update seconds and shuffle state
  if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
     this.setState({
      seconds,
        secondsShuffle });

    }
  }

  render() {

    // state object destructuring
    const {
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle } =
    this.state;

    return /*#__PURE__*/(
      React.createElement("div", { className: 'flipClock' }, /*#__PURE__*/
      React.createElement(FlipUnitContainer, {
        unit: 'hours',
        digit: hours,
        shuffle: hoursShuffle }), /*#__PURE__*/

      React.createElement(FlipUnitContainer, {
        unit: 'minutes',
        digit: minutes,
        shuffle: minutesShuffle })));

//      React.createElement(FlipUnitContainer, {
//        unit: 'seconds',
//        digit: seconds,
//        shuffle: secondsShuffle })));



  }}


// function component
const Header = () => {
  return (
    React.createElement("header", null, /*#__PURE__*/
    React.createElement("h1", null, "React Flip Clock")));


};

// function component
const App = () => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
//    React.createElement(Header, null), /*#__PURE__*/
    React.createElement(FlipClock, null)));


};

ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.querySelector('#app'));
