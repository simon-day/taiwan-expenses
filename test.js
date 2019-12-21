// var longest_Palindrome=function(s){
//   if (!s) return 0;
//   for (let c = s.length; c > 0; c--) {
//     for (let i = 0; i <= s.length - c; i++) {
//       var check = s.substr(i, c);
//       if (check === check.split("").reverse().join("")) return c;
//     }
//   }
// }

longestPalindrome = function(s) {
  //your code here
  if (!s) return 0;

  for (let c = s.length; c > 0; c--) {
    for (let j = 0; j <= s.length - c; j++) {
      let check = s.substr(j, c);
      if (
        check ===
        check
          .split('')
          .reverse()
          .join('')
      ) {
        return c;
      }
    }
  }
};

console.log(longestPalindrome('aab')); // 6
