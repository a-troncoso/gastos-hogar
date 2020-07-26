export function start() {
  console.h1 = (p1, p2) => {
    if (p1 && p2) console.log(`%c[INFO]`, "color: red", p1, p2);
    else console.log(`%c[INFO]`, "color: red", p1);
  };

  console.h2 = (p1, p2) => {
    if (p1 && p2) console.log(`%c[INFO]`, "color: green", p1, p2);
    else console.log(`%c[INFO]`, "color: green", p1);
  };

  console.h3 = (p1, p2) => {
    if (p1 && p2) console.log(`%c[INFO]`, "color: cyan", p1, p2);
    else console.log(`%c[INFO]`, "color: cyan", p1);
  };

  console.err = (p1, p2) => {
    if (p1 && p2)
      console.log(`%c[ERROR]`, "background: red; color: white", p1, p2);
    else console.log(`%c[ERROR]`, "background: red; color: white", p1);
  };
}
