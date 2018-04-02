import _ from 'lodash';

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  getCollection,
  isBusy,
} from '@shoutem/redux-io';

import {
  Button,
  Text,
  Title,
  View,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { I18n } from 'shoutem.i18n';

import { ext } from '../const';
import {
  getMaxRewardPoints,
  getRewardCoordinates,
} from '../shared';
import {
  refreshCardState,
  refreshTransactions,
} from '../services';
import PlaceRewardIcon from './PlaceRewardIcon';
import GaugeProgressBar from './GaugeProgressBar';

export class RewardsGaugeProgressBar extends Component {

  static propTypes = {
    isRefreshingPoints: PropTypes.bool,
    onCollectPoints: PropTypes.func,
    points: PropTypes.number,
    maxRewardPoints: PropTypes.number,
    rewards: PropTypes.array,
    refreshCardState: PropTypes.func,
    refreshTransactions: PropTypes.func,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.getMaxRewardsPoints = this.getMaxRewardsPoints.bind(this);
    this.handleCollectPoints = this.handleCollectPoints.bind(this);
    this.handleRefreshCardState = this.handleRefreshCardState.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderGauge = this.renderGauge.bind(this);
    this.renderGaugeReward = this.renderGaugeReward.bind(this);
    this.renderGaugeRewards = this.renderGaugeRewards.bind(this);
    this.renderPointsLabel = this.renderPointsLabel.bind(this);
  }

  getMaxRewardsPoints() {
    const { rewards } = this.props;
    return getMaxRewardPoints(rewards);
  }

  handleCollectPoints() {
    this.props.onCollectPoints();
  }

  handleRefreshCardState() {
    this.props.refreshCardState();
    this.props.refreshTransactions();
  }

  renderButtons() {
    const { isRefreshingPoints } = this.props;

    return (
      <View styleName="horizontal h-center">
        <Button
          onPress={this.handleCollectPoints}
          styleName="secondary md-gutter-right"
        >
          <Text>{I18n.t(ext('collectPointsButton'))}</Text>
        </Button>

        <Button
          styleName={`${isRefreshingPoints && 'muted'}`}
          onPress={this.handleRefreshCardState}
        >
          <Text>{I18n.t(ext('pointsHistoryButton'))}</Text>
        </Button>
      </View>
    );
  }

  renderGauge() {
    const { points, rewards, style } = this.props;

    const {
      progressRadius: radius,
      progressContainer: {
        height: progressHeight,
        width: progressWidth,
      },
    } = style;

    const maxPoints = this.getMaxRewardsPoints(rewards);

    return (
      <GaugeProgressBar
        height={progressHeight}
        maxValue={maxPoints}
        progressValue={points}
        radius={radius}
        width={progressWidth}
        style={style}
      />
    );
  }

  renderGaugeReward(reward) {
    const { maxRewardPoints, points, style } = this.props;
    const {
      progressRadius: radius,
      progressContainer: {
        width: progressWidth,
      },
    } = style;

    return (
      <PlaceRewardIcon
        key={reward.id}
        pointsReached={(reward.pointsRequired <= points)}
        style={{
          ...getRewardCoordinates(reward, maxRewardPoints, progressWidth, radius),
          ...style.reward,
        }}
      />
    );
  }

  renderGaugeRewards() {
    const { rewards } = this.props;

    if (_.isEmpty(rewards)) {
      return null;
    }

    return (
      <View key="rewards" styleName="fill-parent">
        {_.map(rewards, reward => this.renderGaugeReward(reward))}
      </View>
    );
  }

  renderPointsLabel() {
    const { points, style } = this.props;

    return (
      <View styleName="vertical h-center" style={style.pointsLabel}>
        <Title>{points}</Title>
        <Text>{_.toUpper(I18n.t(ext('pointsLabel')))}</Text>
      </View>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View styleName="vertical">
        <View style={style.container} styleName="vertical v-center h-center">
          {this.renderGauge()}
          {this.renderGaugeRewards()}
          {this.renderPointsLabel()}
        </View>

        <View styleName="horizontal h-center">
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allCardStates } = state[ext()];
  const cardStates = getCollection(allCardStates, state);
  const { rewards } = ownProps;

  return {
    isRefreshingPoints: isBusy(cardStates),
    maxRewardPoints: getMaxRewardPoints(rewards),
  };
};

const mapDispatchToProps = (dispatch) => ({
  refreshCardState: () => dispatch(refreshCardState()),
  refreshTransactions: () => dispatch(refreshTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('RewardsGaugeProgressBar', {}))(RewardsGaugeProgressBar)
);
