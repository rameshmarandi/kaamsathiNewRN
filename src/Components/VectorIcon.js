import React from 'react';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { getFontSize } from '../utility/responsive/index';

const VectorIcon = props => {
  const { size, type } = props;
  props.size = 23
  // getFontSize(size);
  return (
    <>
      {/* {type == 'FontAwesome5Brands' && <FontAwesome5Brands {...props} />} */}
      {type == 'AntDesign' && <AntDesign {...props} />}
      {type == 'Entypo' && <Entypo {...props} />}
      {type == 'EvilIcons' && <EvilIcons {...props} />}
      {type == 'Feather' && <Feather {...props} />}
      {type == 'FontAwesome' && <FontAwesome {...props} />}
      {type == 'FontAwesome5' && <FontAwesome5 {...props} />}
      {type == 'Fontisto' && <Fontisto {...props} />}
      {type == 'Foundation' && <Foundation {...props} />}
      {type == 'Ionicons' && <Ionicons {...props} />}
      {type == 'Zocial' && <Zocial {...props} />}
      {type == 'MaterialCommunityIcons' && <MaterialCommunityIcons {...props} />}
      {type == 'MaterialIcons' && <MaterialIcons {...props} />}
      {type == 'Octicons' && <Octicons {...props} />}
      {type == 'SimpleLineIcons' && <SimpleLineIcons {...props} />}
    </>
  );
};

VectorIcon.propTypes = {
  type: PropTypes.oneOf([
    'AntDesign',
    'Entypo',
    'EvilIcons',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Ionicons',
    'MaterialCommunityIcons',
    'MaterialIcons',
    'Octicons',
    'SimpleLineIcons',
    'Zocial',
  ]),
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.any,
  solid: PropTypes.any,
};
VectorIcon.defaultProps = {
  color: 'black',
};

const VectorButton = props => {
  const { type } = props;
  const { title, textProps } = props;
  const TextComponent = () => {
    return <Text {...textProps}>{title}</Text>;
  };
  return (
    <>
      {type == 'AntDesign' && (
        <AntDesign.Button {...props}>{title && title != '' && <TextComponent />}</AntDesign.Button>
      )}
      {type == 'Entypo' && <Entypo.Button {...props}>{title && title != '' && <TextComponent />}</Entypo.Button>}
      {type == 'EvilIcons' && (
        <EvilIcons.Button {...props}>{title && title != '' && <TextComponent />}</EvilIcons.Button>
      )}
      {type == 'Feather' && <Feather.Button {...props}>{title && title != '' && <TextComponent />}</Feather.Button>}
      {type == 'FontAwesome' && (
        <FontAwesome.Button {...props}>{title && title != '' && <TextComponent />}</FontAwesome.Button>
      )}
      {type == 'FontAwesome5' && (
        <FontAwesome5.Button {...props}>{title && title != '' && <TextComponent />}</FontAwesome5.Button>
      )}
      {type == 'Fontisto' && <Fontisto.Button {...props}>{title && title != '' && <TextComponent />}</Fontisto.Button>}
      {type == 'Foundation' && (
        <Foundation.Button {...props}>{title && title != '' && <TextComponent />}</Foundation.Button>
      )}
      {type == 'Ionicons' && <Ionicons.Button {...props}>{title && title != '' && <TextComponent />}</Ionicons.Button>}
      {type == 'Zocial' && <Zocial.Button {...props}>{title && title != '' && <TextComponent />}</Zocial.Button>}
      {type == 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons.Button {...props}>
          {title && title != '' && <TextComponent />}
        </MaterialCommunityIcons.Button>
      )}
      {type == 'MaterialIcons' && (
        <MaterialIcons.Button {...props}>{title && title != '' && <TextComponent />}</MaterialIcons.Button>
      )}
      {type == 'Octicons' && <Octicons.Button {...props}>{title && title != '' && <TextComponent />}</Octicons.Button>}
      {type == 'SimpleLineIcons' && (
        <SimpleLineIcons.Button {...props}>{title && title != '' && <TextComponent />}</SimpleLineIcons.Button>
      )}
    </>
  );
};
VectorButton.propTypes = {
  type: PropTypes.oneOf([
    'AntDesign',
    'Entypo',
    'EvilIcons',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Ionicons',
    'MaterialCommunityIcons',
    'MaterialIcons',
    'Octicons',
    'SimpleLineIcons',
    'Zocial',
  ]),
  iconStyle: PropTypes.any,
  name: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  borderRadius: PropTypes.number,
  title: PropTypes.string,
  style: PropTypes.any,
  textProps: PropTypes.any,
};

export { VectorIcon, VectorButton };
