// eslint-disable-next-line no-unused-vars
type HeightSetterFunction = (height: number) => void

export default function windowScrollControl(threshold = 70) {
  let previousScrollY = 0;
  const headerThreshold = threshold;

  const onScrollY = (height: number, heightSetterFunction: HeightSetterFunction) => {
    const deltaY = window.scrollY - previousScrollY;
    const smoothHeight = height - deltaY;
    if (window.scrollY <= headerThreshold) {
      heightSetterFunction(-headerThreshold);
      return;
    }
    if (deltaY < 0) {
      if (height < 0) {
        if (smoothHeight <= 0) heightSetterFunction(smoothHeight);
      } else {
        heightSetterFunction(0);
      }
    } else if (height > -headerThreshold && height <= 0) {
      if (smoothHeight <= 0) heightSetterFunction(smoothHeight);
    } else {
      heightSetterFunction(-headerThreshold);
    }
    previousScrollY = window.scrollY;
  };

  return { onScrollY };
}
