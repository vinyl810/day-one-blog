// eslint-disable-next-line no-unused-vars
type HeightSetterFunction = (height: number) => void

export default function windowScrollControl(threshold = 70) {
  let previousScrollY = 0;
  const headerThreshold = threshold;

  const onScrollY = (height: number, heightSetterFunction: HeightSetterFunction) => {
    const deltaY = window.scrollY - previousScrollY;
    if (window.scrollY <= headerThreshold) {
      heightSetterFunction(-headerThreshold);
      return;
    }
    if (deltaY < 0) {
      if (height < 0) {
        heightSetterFunction(height - deltaY);
      } else {
        heightSetterFunction(0);
      }
    } else if (height > -headerThreshold && height <= 0) {
      heightSetterFunction(height - deltaY);
    } else {
      heightSetterFunction(-headerThreshold);
    }
    previousScrollY = window.scrollY;
  };

  return { onScrollY };
}
