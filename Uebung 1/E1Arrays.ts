let nums: number[] = Array(1000);
for (let i = 0; i < nums.length; i++) {
    nums[i] = i + 1;
}

const millerRabin = (c: number) => {
    if (2 === c || 3 === c)
        return !0;
    if (c % 2 == 0 || c < 2)
        return !1;
    for (var _ = 0, f = c - 1; (1 & f) == 0;)
        f >>= 1, ++_;
    var n = Math.pow(2, f) % c;
    if (1 == n || n == c - 1)
        return !0;
    for (var e = 1; e <= _; e++)
        if ((n = n * n % c) == c - 1)
            return !0;
    return !1;
};

nums = nums.filter(millerRabin);
console.log(nums);

console.log(nums.slice(1).every(x => x % 2 == 1));

// nums.forEach(e => console.log(e));

let arr1 = [1];
let arr2 = [1];

console.log(arr1 == arr2);
arr2 = [1, 2];
console.log(arr1 == arr2);

console.log(Array(5));
console.log(Array(5, 6));
