import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { connectStyle } from '@shoutem/theme';

import {
  Text,
  View,
} from '@shoutem/ui';

import { ext } from '../const';

export class DealFeaturedView extends Component {

  static propTypes = {
    deal: PropTypes.object,
    onPress: PropTypes.func,
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

  render() {
    const { deal } = this.props;

    return (
      <View>
        <Text>{deal.title}</Text>
      </View>
    );
  }
}

export default connectStyle(ext('DealFeaturedView'), {})(DealFeaturedView);
