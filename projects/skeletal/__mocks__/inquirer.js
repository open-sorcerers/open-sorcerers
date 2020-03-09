const inquirer = jest.genMockFromModule("inquirer")

inquirer.prompt = ({ name }) =>
  Promise.resolve(name.includes("test") ? {} : { answer: "cool" })

module.exports = inquirer
