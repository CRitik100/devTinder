const validateSignupData = (req) => {
  const { skills } = req.body;
  if (skills && skills.length > 5) {
    throw new Error(`Max 5 Skills can be added..!!`);
  }
};

const validateUserUpdateData = (req) => {
  const data = req.body;
  const allowedUpdate = ["password", "age", "skills", "photo"];

  let check = Object.keys(data).every((k) => allowedUpdate.includes(k));

  if (!check) {
    throw new Error(`allowed updates are ${allowedUpdate.join(", ")}.`);
  } else if (data?.skills && data?.skills.length > 5) {
    throw new Error(`Max 5 Skills can be added..!!`);
  }
};

module.exports = { validateSignupData, validateUserUpdateData };
