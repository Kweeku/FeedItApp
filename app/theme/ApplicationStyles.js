import Fonts from './Fonts'
import Metrics from './Metrics'
import color from './color'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: color.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: color.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: color.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: color.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: color.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: color.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: color.coal,
    backgroundColor: color.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: color.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
