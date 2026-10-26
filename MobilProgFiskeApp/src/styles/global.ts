import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FFFFFF',
  header: '#E0FBFC',
  surface: '#98C1D9',
  primary: '#E0FBFC',
  text: '#ffffff',
  textSecondary: '#757575',
  alert: '#ff5252',
  darkBackground: '#293241',
  darkSurface: '#3D5A80',
  highlight: '#EE6C4D',
  iconTeal: '#16B3AA',
  iconBlue: '#288CF7',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  }
});