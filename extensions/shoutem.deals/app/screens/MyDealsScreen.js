import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Screen,
  Text,
  TouchableOpacity,
  View,
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';
import { connectStyle } from '@shoutem/theme';
import { navigateTo } from '@shoutem/core/navigation';
import { I18n } from 'shoutem.i18n';

import { ext, TRANSLATIONS } from '../const';

import MyDealsList from '../components/MyDeals/MyDealsList';
import FavoriteDealsList from '../components/MyDeals/FavoriteDealsList';

const MY_DEALS_TAB = 'myDealsTab';
const FAVORITE_DEALS_TAB = 'favoriteDealsTab';

function renderTab(options) {
  const { isActive = false } = options;

  return (
    <TouchableOpacity
      onPress={options.onPress}
      styleName="flexible stretch h-center"
    >
      <View styleName="md-gutter stretch h-center">
        <Text styleName={`${isActive ? '' : 'muted'} h-center`}>
          {options.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export class MyDealsScreen extends Component {

  static propTypes = {
    catalogId: PropTypes.string,
    onOpenDealDetails: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.handleActivateTab = this.handleActivateTab.bind(this);
    this.handleActivateMyDealsTab = this.handleActivateMyDealsTab.bind(this);
    this.handleActivateFavoritesTab = this.handleActivateFavoritesTab.bind(this);

    this.state = {
      activeTab: FAVORITE_DEALS_TAB,
    };
  }

  getNavBarProps() {
    const { title } = this.props;

    return {
      title: title || 'MY DEALS',
    };
  }

  handleActivateTab(tabName) {
    this.setState({
      activeTab: tabName,
    });
  }

  handleActivateMyDealsTab() {
    this.handleActivateTab(MY_DEALS_TAB);
  }

  handleActivateFavoritesTab() {
    this.handleActivateTab(FAVORITE_DEALS_TAB);
  }

  render() {
    const { activeTab } = this.state;
    // const { style } = this.props;

    // Tabs activation status
    const myDealsTabActive = (activeTab === MY_DEALS_TAB);
    const favoriteDealsTabActive = (activeTab === FAVORITE_DEALS_TAB);

    return (
      <Screen styleName="full-screen">
        <NavigationBar {...this.getNavBarProps()} />

        <View key="my-deals-tabs" styleName="flexible">
          <View key="my-deals-tabs-controls" styleName="solid horizontal">
            {renderTab({
              isActive: favoriteDealsTabActive,
              onPress: this.handleActivateFavoritesTab,
              text: I18n.t(TRANSLATIONS.FAVORITE_DEALS_TAB_TEXT),
            })}

            {renderTab({
              isActive: myDealsTabActive,
              onPress: this.handleActivateMyDealsTab,
              text: I18n.t(TRANSLATIONS.MY_DEALS_TAB_TEXT),
            })}
          </View>

          {(activeTab === FAVORITE_DEALS_TAB) && (
            <FavoriteDealsList
              catalogId={this.props.catalogId}
              onOpenDealDetails={this.props.onOpenDealDetails}
            />
          )}

          {(activeTab === MY_DEALS_TAB) && (
            <MyDealsList
              catalogId={this.props.catalogId}
              onOpenDealDetails={this.props.onOpenDealDetails}
            />
          )}
        </View>
      </Screen>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(navigateTo(route)),
});

export default connect(null, mapDispatchToProps)(
  connectStyle(ext('MyDealsScreen'), {})(MyDealsScreen),
);
