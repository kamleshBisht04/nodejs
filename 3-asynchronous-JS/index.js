'using strict';

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

/* 
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
  
  
  */

//  async and await

// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed : ${data}`);

//     const res = await superagent.get(`https://dog.ceo{data}/images/random`);
//     console.log(res.body.message);

//     await writeFilePro('dog-img1.txt', res.body.message);
//     console.log('Random dog image saved to file');

//     return 'Ready to load Dog Pic🐶';
//   } catch (err) {
//     throw err; // Error ko throw karein taaki bahar catch ho sake
//   }
// };

// // Top-level Async Function (Safe and Clean)
// (async () => {
//   try {
//     console.log('1 : will Get Dog pics ...');
//     const res = await getDogPic();
//     console.log(res);
//     console.log('2 : Done getting dog pics!');
//   } catch (err) {
//     console.log('ERROR 💥');
//   }
// })();

// =====================================================

// --- The IIFE (Immediately Invoked Function Expression) ---
// (async () => {
//   try {
//     console.log('1: Starting image fetch...');
//     const result = await getDogPics();
//     console.log(result);
//     console.log('2: All done!');
//   } catch (err) {
//     console.log('ERROR 💥: Something went wrong!');
//   }
// })();

// ==========================================================

// handling the multiple promiss simantiutation

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // console.log(res.body.message);

    await writeFilePro('dog-img1.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');

    return 'Ready to load Dog Pic🐶';
  } catch (err) {
    throw err; // Error ko throw karein taaki bahar catch ho sake
  }
};

getDogPic();
