import { colors } from 'theme'
import HeaderLeftButton from '../headerComponents/HeaderLeftButton'
import HeaderRightButton from '../headerComponents/HeaderRightButton'

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

const rootStackOptions = {
  reviewMode: {
    title: '早く質問しろよ',
    headerShown: true,
    headerRight: () => <HeaderRightButton />,
  },
  productionMode: {
    title: '早く質問しろよ',
    headerShown: true,
    headerRight: () => <HeaderRightButton />,
    headerLeft: () => <HeaderLeftButton />,
  }
}

export { navigationProps, rootStackOptions }