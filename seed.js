"use strict";

const {
  db,
  models: { User, Workout, Exercise, Set },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "Warren",
      lastName: "Chan",
      email: "warren@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "Jahed",
      lastName: "Prince",
      email: "jahed@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "Sean",
      lastName: "Brown",
      email: "sean@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "Justin",
      lastName: "Suh",
      email: "justin@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "Sean",
      lastName: "Brown",
      email: "sean@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "John",
      lastName: "Smith",
      email: "john@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      password: "123",
    }),
  ]);

  //Creating workouts
  //time in minutes
  //for the date: https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
  const workouts = await Promise.all([
    Workout.create({
      date: new Date().setDate(new Date().getDate() - 1),
      notes: "Workout went well!",
      time: 90,
      name: "Push",
    }),
    Workout.create({
      date: new Date().setDate(new Date().getDate() - 2),
      notes: "Workout went well!",
      time: 60,
      name: "Pull",
    }),
    Workout.create({
      date: new Date().setDate(new Date().getDate() - 3),
      notes: "Workout went well!",
      time: 120,
      name: "Legs",
    }),
  ]);

  //sample exercise
  const exercises = await Promise.all([
    Exercise.create({
      workoutId: 1,
      name: "Bench Press",
      notes: "Couldn't finish all my sets",
      type: "Upper",
      muscle_group: "Chest",
      description: "",
    }),
    Exercise.create({
      workoutId: 2,
      name: "Bicep Curl",
      notes: "Couldn't finish all my sets",
      type: "Upper",
      muscle_group: "Biceps",
      description: "",
    }),
    Exercise.create({
      workoutId: 3,
      name: "Squat",
      notes: "Form might not be correct",
      type: "Lower",
      muscle_group: "Legs",
      description: "",
    }),
  ]);

  //sample sets
  const sets = await Promise.all([
    Set.create({
      exerciseId: 1,
      reps: 8,
      weights: 135,
    }),
    Set.create({
      exerciseId: 2,
      reps: 10,
      weights: 30,
    }),
    Set.create({
      exerciseId: 3,
      reps: 5,
      weights: 135,
    }),
  ]);

  console.log(
    `seeded ${users.length} users, ${workouts.length} workouts, ${exercies.length} exercises, and ${sets.length} sets`
  );
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
