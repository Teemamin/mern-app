const dataFromAPI = 'location';

let person = {
    name: 'susu',
    age: 22,
    job: '',
    [dataFromAPI]: 'Spain'
}
// console.log(person) //{ name: 'susu', age: 22, job: '', location: 'Spain' }

let updateObject = (key,value)=>{
    person[key] = value
}

updateObject('name','Greg')
console.log(person)
updateObject('location','UK')
console.log(person) //{ name: 'Greg', age: 22, job: '', location: 'UK' }
//if you pass key/value that doesnt exisit in the object, it will be added to the object
updateObject('skills',['JavaScript'])
console.log(person)
// {
//     name: 'Greg',
//     age: 22,
//     job: '',
//     location: 'UK',
//     skills: [ 'JavaScript' ]
//   }