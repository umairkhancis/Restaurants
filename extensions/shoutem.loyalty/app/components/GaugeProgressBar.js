import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Svg, {
  Circle,
} from 'react-native-svg';

import {
  View,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';

import { ext } from '../const';
import {
  getProgressCircleCircumference,
  getFullCircleCircumference,
  getGaugeCircleCircumference,
} from '../shared';

export class GaugeProgressBar extends Component {

  static propTypes = {
    children: PropTypes.object,
    height: PropTypes.number,
    maxValue: PropTypes.number,
    progressValue: PropTypes.number,
    radius: PropTypes.number,
    style: PropTypes.object,
    width: PropTypes.number,

    // Full circle circumference is used to help calculate gauge
    // and progress bar circumference using SVG stroke-dasharray property.
    fullCircleCircumference: PropTypes.number,

    // Visible circumference that represents entire progress gauge.
    gaugeCircleCircumference: PropTypes.number,

    // Represents only completed progress bar gauge circumference
    progressCircleCircumference: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderGauge = this.renderGauge.bind(this);
  }

  renderGauge() {
    const { style } = this.props;

    const {
      fullCircleCircumference,
      gaugeCircleCircumference,
      progressCircleCircumference,
      height,
      width,
      radius,
    } = this.props;

    const cx = width / 2;
    const cy = height / 2;
    const viewBox = `0 0 ${height} ${width}`;
    const gaugeStrokeDasharray = [
      gaugeCircleCircumference,
      fullCircleCircumference,
    ];
    const progressStrokeDasharray = [
      progressCircleCircumference,
      fullCircleCircumference,
    ];

    return (
      <Svg
        style={style.progressContainer}
        viewBox={viewBox}
      >
        <Circle
          cx={cx} cy={cy} r={radius}
          strokeDasharray={gaugeStrokeDasharray} strokeDashoffset={0}
          {...style.progressBar}
        />

        {(progressCircleCircumference > 0) && (
          <Circle
            cx={cx} cy={cy} r={radius}
            strokeDasharray={progressStrokeDasharray} strokeDashoffset={'100%'}
            {...style.progressBarCompleted}
          />
        )}
      </Svg>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View style={style.container} styleName="vertical v-center h-center">
        {this.renderGauge()}
        {this.props.children}
      </View>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const {
    maxValue,
    progressValue,
    radius,
  } = ownProps;

  const fullCircleCircumference = getFullCircleCircumference(radius);
  const gaugeCircleCircumference = getGaugeCircleCircumference(radius);
  const progressCircleCircumference =
    getProgressCircleCircumference(progressValue, maxValue, gaugeCircleCircumference);

  return {
    progressCircleCircumference,
    gaugeCircleCircumference,
    fullCircleCircumference,
  };
};

export default connect(mapStateToProps)(
  connectStyle(ext('GaugeProgressBar', {}))(GaugeProgressBar)
);
