module.exports = {
  Query: {
    pets(_, {input}, {models}) {
      return models.Pet.findMany(input || {})
    },
    pet(_, {cid}, {models}) {
      return models.Pet.findOne({cid})
    },
    user(_, __, {models}) {
      return models.User.findOne()
    }
  },
  Mutation: {
    addPet(_, {input}, {models, user}) {
      const pet = models.Pet.create({...input, user: user.icd})
      return pet
    }
  },
  Pet: {
    owner(pet, _, {models}) {
      return models.User.findOne({cid: pet.user})
    },
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    }
  },
  User: {
    pets(user, _, {models}) {
      return models.Pet.findMany({user: user.cid})
    }
  }
}
