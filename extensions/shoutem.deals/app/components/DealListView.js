import _ from 'lodash';

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { connectStyle } from '@shoutem/theme';

import {
  Caption,
  Divider,
  Icon,
  Row,
  Subtitle,
  TouchableOpacity,
  Text,
  View,
} from '@shoutem/ui';

import { ext } from '../const';
import {
  dealStatusShape,
  formatPrice,
  getDealActiveCoupon,
  getDealStatus,
} from '../services';
import {
  getDeal,
  getLastDealAction,
  getLastDealTransaction,
  getLastDealStatusTransaction,
} from '../redux';

import DealImage from './DealImage';

export class DealListView extends Component {

  static propTypes = {
    activeCoupon: PropTypes.object,
    deal: PropTypes.object,
    dealStatus: dealStatusShape,
    onPress: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    onPress: () => { },
  };

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.onPress(this.props.deal);
  }

  renderClaimedIcon() {
    return (
      <Icon name="checkbox-on" styleName="disclosure" />
    );
  }

  render() {
    const { deal, dealStatus, style } = this.props;
    const { couponRedeemed, dealRedeemed } = dealStatus;

    return (
      <TouchableOpacity
        disabled={!_.isFunction(this.props.onPress)}
        key={deal.id}
        onPress={this.handlePress}
        style={style}
      >
        <Row>
          <DealImage
            styleName="small rounded-corners"
            deal={deal}
            dealStatus={dealStatus}
            renderTimer={false}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle styleName="">{deal.title}</Subtitle>
            <View styleName="flexible horizontal v-center">
              <Text styleName="md-gutter-right">
                {formatPrice(deal.discountPrice, deal.currency)}
              </Text>
              <Caption styleName="line-through">
                {formatPrice(deal.regularPrice, deal.currency)}
              </Caption>
            </View>
          </View>

          {(couponRedeemed || dealRedeemed) && this.renderClaimedIcon()}
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { deal } = ownProps;
  const lastDealTransaction = getLastDealTransaction(state, deal.id);
  const lastDealStatusTransaction = getLastDealStatusTransaction(state, deal.id);
  const lastDealAction = getLastDealAction(state, deal.id);
  const activeCoupon = getDealActiveCoupon(lastDealStatusTransaction);

  return {
    activeCoupon,
    deal: getDeal(state, deal.id),
    lastDealAction,
    lastDealTransaction,
    lastDealStatusTransaction,
    dealStatus: getDealStatus(deal, lastDealStatusTransaction),
  };
};

export default connect(mapStateToProps)(
  connectStyle(ext('DealListView'), {})(DealListView),
);
