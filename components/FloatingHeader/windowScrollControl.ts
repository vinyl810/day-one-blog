// eslint-disable-next-line no-unused-vars
type HandlerFunction = (height: number) => void

export default function windowScrollControl(threshold = 70) {
  let previousScrollY = 0;
  const headerThreshold = threshold;

  const onScrollY = (height: number, heightHandlerFunction: HandlerFunction) => {
    const deltaY = window.scrollY - previousScrollY;
    if (window.scrollY <= headerThreshold) {
      heightHandlerFunction(-headerThreshold);
      return;
    }
    if (deltaY < 0) {
      if (height < 0) {
        heightHandlerFunction(height - deltaY);
      } else {
        heightHandlerFunction(0);
      }
    } else if (height > -headerThreshold) {
      heightHandlerFunction(height - deltaY);
    } else {
      heightHandlerFunction(-headerThreshold);
    }
    previousScrollY = window.scrollY;
  };

  return { onScrollY };
}
