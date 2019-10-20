// let name = "Ivan",
//   age = 30,
//   mail = "vasya@pupkin.com";
//
// document.write(`Пользователю ${name} ${age} лет. Почта: ${mail}`);
//
// function makeArray() {
//   var items = [];
//
//   for (let i = 0; i < 10; i++) {
//     var item = function() {
//       console.log(i);
//     };
//     items.push(item);
//   }
//
//   return items;
// }
//
// var arr = makeArray();
//
// // console.log(arr);
//
// arr[1]();
// arr[3]();
// arr[7]();

let video = ["youtube", "vimeo", "rutube"],
  blogs = ["wordpress", "livejournal", "blogger"],
  internet = [...video, ...blogs, "vk", "facebook"];

console.log(internet);
