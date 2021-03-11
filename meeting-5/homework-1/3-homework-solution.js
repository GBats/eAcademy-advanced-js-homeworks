console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usersDB[email]) {
        console.log("Now we have the of user: " + email);
        resolve({ userEmail: email });
      } else {
        reject("User not found");
      }
    }, 3000);
  });
}

function getUserVideos(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usersDB[email].length > 0) {
        resolve(usersDB[email]);
      } else {
        reject("Videos not found");
      }
    }, 2000);
  });
}

function videoDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (video.title) {
        resolve(video.title);
      } else {
        reject("Video Title not found!");
      }
    }, 2000);
  });
}

const getPassedUsersFirstVideoTitle = (user) => {
  loginUser(user, 1234)
    .then((res) => {
      console.log("user: ", res);
      getUserVideos(res.userEmail)
        .then((videos) => {
          console.log("videos: ", videos);
          videoDetails(videos[0])
            .then((title) => {
              console.log("title: " + title);
            })
            .catch((err) => {
              displayError(err);
            });
        })
        .catch((err) => {
          displayError(err);
        });
    })
    .catch((err) => {
      displayError(err);
    });
};

function displayError(errorMessage) {
  console.log(new Error(errorMessage));
}

getPassedUsersFirstVideoTitle("user1@hw.js");

console.log("Finish");
