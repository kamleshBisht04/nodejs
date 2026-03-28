// callback hell in async code

const fs = require('fs');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed :  ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       //  agian call back write

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file!');
//       });
//     });
// });

// solved by the promiss

/* 

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed  : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      //  writing the file
      fs.writeFile('dog-img1.txt', res.body.message, (err) => {
        console.log('Random dog image saved to file.');
      });
    })
    .catch((err) => console.log(err.message));
}); 


*/

// how to build the promiss

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file⭐');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😀');
      resolve('success');
    });
  });
};

// bulid promiss now use it // chaining the promiss 

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed :  ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img1.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file.');
  })
  .catch((err) => {
    console.log(err.message);
  });
