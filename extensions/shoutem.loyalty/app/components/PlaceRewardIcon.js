import _ from 'lodash';

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  View,
} from '@shoutem/ui';

import { connectStyle } from '@shoutem/theme';

import { ext } from '../const';

export class PlaceRewardIcon extends Component {

  static propTypes = {
    pointsReached: PropTypes.bool,
    style: PropTypes.object,
  };

  render() {
    const { pointsReached, style } = this.props;
    const externalStyle = _.omit(style, ['reward', 'rewardReached']);

    return (
      <View
        style={{
          ...style.reward,
          ...(pointsReached ? style.rewardReached : {}),
          ...externalStyle,
        }}
      >
        <Icon name="gift" />
      </View>
    );
  }
}

export default connectStyle(ext('PlaceRewardIcon'), {})(PlaceRewardIcon);
