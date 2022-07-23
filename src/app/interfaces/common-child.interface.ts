import { Subject } from "rxjs";

export interface CommonChild {
  add();
}

let subscription: any;

export function eventSubscriber(
  action: Subject<any>,
  handler: () => void,
  off: boolean = false
) {
  if (off && subscription) {
    subscription.unsubscribe();
  } else {
    subscription = action.subscribe(() => handler());
  }
}
