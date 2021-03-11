console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

function loginUser(email, password, error, callback) {
  setTimeout(() => {
    if (usersDB[email]) {
      console.log("Now we have the of user: " + email);
      callback({ userEmail: email });
    } else {
      error("User not found");
    }
  }, 3000);
}

function getUserVideos(email, error, callback) {
  setTimeout(() => {
    if (usersDB[email].length > 0) {
      callback(usersDB[email]);
    } else {
      error("Videos not found");
    }
  }, 2000);
}

function videoDetails(video, error, callback) {
  setTimeout(() => {
    if (video.title) {
      callback(video.title);
    } else {
      error("Video Title not found!");
    }
  }, 2000);
}

const getPassedUsersFirstVideoTitle = (user) => {
  loginUser(user, "1234", displayError, (user) => {
    console.log("users: ", user);
    getUserVideos(user.userEmail, displayError, (videos) => {
      console.log("videos: ", videos);
      videoDetails(videos[0], displayError, (title) => {
        console.log("title: " + title);
      });
    });
  });
};

function displayError(errorMessage) {
  console.log(new Error(errorMessage));
}

getPassedUsersFirstVideoTitle("user3@hw.js");

console.log("Finish");
