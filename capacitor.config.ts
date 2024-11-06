import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ByteBazaar',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample", // Asegúrate de que este icono esté disponible en tu proyecto
      iconColor: "#488AFF",
      sound: "beep.wav", // Asegúrate de que este sonido esté en el directorio adecuado
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "linear-gradient(to bottom,#2F085F, #4425D1, #2F085F);",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
      useDialog: false,
    },
  },
};

export default config;
