package com.shoutemapp;

import android.support.multidex.MultiDexApplication;

import com.actionsheet.ActionSheetPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import com.reactnativeshopify.RNShopifyPackage;
import com.shoutem.places.ShoutemPlacesExtensionPackage;
import com.horcrux.svg.SvgPackage;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import com.shoutem.flurry.ShoutemFlurryExtensionPackage;
import com.shoutem.cms.ShoutemCmsExtensionPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.shoutem.camera.ShoutemCameraExtensionPackage;
import com.shoutem.calendar.CalendarManagerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.shoutem.application.ShoutemApplicationExtensionPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.imagepicker.ImagePickerPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.shoutem.uiaddons.UiAddonsExtensionPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNShopifyPackage(),
            new ShoutemPlacesExtensionPackage(),
            new SvgPackage(),
            new FlurryAnalyticsPackage(),
            new ShoutemFlurryExtensionPackage(),
            new ShoutemCmsExtensionPackage(),
            new RCTCameraPackage(),
            new ShoutemCameraExtensionPackage(),
            new CalendarManagerPackage(),
            new RNDeviceInfo(),
            new ShoutemApplicationExtensionPackage(),
            new ActionSheetPackage(),
            new ImagePickerPackage(),
            new LinearGradientPackage(),
            new PhotoViewPackage(),
            new ReactNativeRestartPackage(),
            new ReactVideoPackage(),
            new SplashScreenReactPackage(),
            new UiAddonsExtensionPackage(),
            new VectorIconsPackage(),
          new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
          new MapsPackage(),
          new GoogleAnalyticsBridgePackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
  };

  // @Override
  protected String getJSMainModuleName() {
    return "index";
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
}
