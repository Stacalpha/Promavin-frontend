export function navigateInPage(targetType:string, target:string):void {
  switch (targetType) {
    case 'fragment': {
      window.location.hash = target;
      break;
    }

    case 'selector': {
      let elem = document.querySelector(target) as HTMLElement;
      elem.scrollIntoView();
      elem.focus();
      break;
    }

    default:
      return console.error(`Unknown target type ("${targetType}") for in-page navigation.`);
  }
  
  return;
}