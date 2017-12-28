import { Observable, Observer } from "rxjs";

const numbers: Array<number> = [1, 2, 3, 4];

const source = Observable.from(numbers);

class MyObserver implements Observer<number> {

  next(value: any) {
    console.log(`value: ${value}`);
  }

  error(e: any) {
    console.log(`error: ${e}`);
  }

  complete() {
    console.log("complete");
  }
}

source.subscribe(new MyObserver());
source.subscribe(new MyObserver());