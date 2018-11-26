'use strict'

const db = require('../server/db')
const {User, Leaderboard} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const leaderboards = await Promise.all([
    Leaderboard.create({
      name: 'Paola',
      score: 5100,
      difficulty: 'chaos!',
      song: 'Dancing Queen',
      rank: 1
    }),
    Leaderboard.create({
      name: 'Jimmy',
      score: 4800,
      difficulty: 'chaos!',
      song: 'Beat It',
      rank: 2
    }),
    Leaderboard.create({
      name: 'Sean',
      score: 4600,
      difficulty: 'medium',
      song: 'Dancing Queen',
      rank: 3
    }),
    Leaderboard.create({
      name: 'Joe',
      score: 4400,
      difficulty: 'chaos!',
      song: 'Dancing Queen',
      rank: 4
    }),
    Leaderboard.create({
      name: 'John',
      score: 4200,
      difficulty: 'medium',
      song: 'Beat It',
      rank: 5
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
