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
  },
};

export default config;
