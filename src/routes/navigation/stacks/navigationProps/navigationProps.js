import { colors } from 'theme'

const headerTintColor = 'white'
const fontSize = 18
const headerMode = 'float'

const navigationProps = {
  headerTintColor: headerTintColor,
  headerStyle: {
    backgroundColor: colors.white
  },
  headerTitleStyle: { fontSize: fontSize, color: colors.black },
  headerMode: headerMode,
  headerShadowVisible: false,
}

export { navigationProps }