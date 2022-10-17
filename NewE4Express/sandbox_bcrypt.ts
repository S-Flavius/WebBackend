import bcrypt from 'bcrypt';

let p = 'password';

bcrypt.hash(p, 10, (err, hash) => {
    console.log(hash);
    bcrypt.compare(p, hash, (err, result) => {
        console.log(result);
    });
});
