import {useRef, useState, useEffect} from 'react';
import {Animated} from 'react-native';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const prevScrollY = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value > prevScrollY._value) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      prevScrollY.setValue(value);
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY, prevScrollY]);

  return {scrollY, scrollDirection};
};

export default useScrollDirection;
