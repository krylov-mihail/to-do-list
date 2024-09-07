import { Provider } from "react-redux";
import { store } from "@/lib/store";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import Main from "@/components/Main";

import {
  ThemeProvider,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

/* translation for date picker */
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#006874",
    surfaceTint: "#006874",
    onPrimary: "#FFFFFF",
    primaryContainer: "#9EEFFD",
    onPrimaryContainer: "#001F24",
    secondary: "#4A6267",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#CDE7EC",
    onSecondaryContainer: "#051F23",
    tertiary: "#525E7D",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#DAE2FF",
    onTertiaryContainer: "#0E1B37",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F5FAFB",
    onBackground: "#171D1E",
    surface: "#F5FAFB",
    onSurface: "#171D1E",
    surfaceVariant: "#DBE4E6",
    onSurfaceVariant: "#3F484A",
    outline: "#6F797A",
    outlineVariant: "#BFC8CA",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2B3133",
    inverseOnSurface: "#ECF2F3",
    inversePrimary: "#82D3E0",
    primaryFixed: "#9EEFFD",
    onPrimaryFixed: "#001F24",
    primaryFixedDim: "#82D3E0",
    onPrimaryFixedVariant: "#004F58",
    secondaryFixed: "#CDE7EC",
    onSecondaryFixed: "#051F23",
    secondaryFixedDim: "#B1CBD0",
    onSecondaryFixedVariant: "#334B4F",
    tertiaryFixed: "#DAE2FF",
    onTertiaryFixed: "#0E1B37",
    tertiaryFixedDim: "#BAC6EA",
    onTertiaryFixedVariant: "#3B4664",
    surfaceDim: "#D5DBDC",
    surfaceBright: "#F5FAFB",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#EFF5F6",
    surfaceContainer: "#E9EFF0",
    surfaceContainerHigh: "#E3E9EA",
    surfaceContainerHighest: "#DEE3E5",
  },
};
import { adaptNavigationTheme } from "react-native-paper";

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ThemeProvider value={LightTheme}>
          <Main />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}
