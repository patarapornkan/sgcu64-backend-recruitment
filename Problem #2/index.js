const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const User = require('./models/user');
const Location = require('./models/location');

const connectToDB = async()=> {
    try{
        await mongoose.connect('mongodb://localhost:27017/chulaChana', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    } catch(err){
        console.log("MONGO CONNECT ERROR");
        console.log(err);
    }
}

const checkin= async (phoneNo) => {
    let locations = await Location.find()
    if (!locations.length){
        console.log('no location... Please add a location');
        await addLocation();
        locations = await Location.find();
    }
    for(let i in locations){
        num = parseInt(i)+1
        console.log(`${num}. ${locations[i]['name']}`);
    }
    const selectedLocNo = prompt('Select the place: ');
    const selectedLoc = locations[parseInt(selectedLocNo)-1];
    console.log(`Checking in ${phoneNo} into ${selectedLoc['name']}`);
    const location = await Location.findById(selectedLoc['_id']);

     //check if this user exists
    const existingUser = await User.findOne({phone_no: phoneNo});
    if (existingUser != undefined){ //if user already checked in
        //check if same area
        if (location._id==existingUser.location.toString()){ //if user is already in the selected location
            console.log(`${phoneNo} is already checked in to ${location.name}`);
            return;
        } else { //if user is currently checkin in other location
            await checkout(phoneNo);
        }
    }
    const user = new User({phone_no: phoneNo});
    location.num_user = location.num_user+1;
    user.location = location;
    await location.save();
    await user.save();
    
    console.log(`Successfully checked in ${user.phone_no} to ${location.name}`)
    console.log('__________________________\n');
    showMainMenu();
}

const checkout= async(phoneNoOut)=> {
    const user = await User.findOne({phone_no: phoneNoOut});
    if (user == undefined){
        console.log('This phone number is not checked in anywhere');
    } else {
        const location = await Location.findById(user.location);
        const currentNum = location.num_user
        const updatedNum = currentNum - 1;
        location.num_user = updatedNum;
        await location.save();
        const deletedUser = await User.findByIdAndDelete(user._id);
        console.log(`Successfully checked out ${phoneNoOut}`);
    }
    console.log('__________________________\n');
    showMainMenu();
}

const showCounts= async()=> {
    console.log('show number of users currently in each location')
    const locations = await Location.find()
    if (!locations.length){   //if no location is added
        console.log('no location...');
        return;
    }
    for(let i in locations){
        num = parseInt(i)+1
        console.log(`${num}. ${locations[i]['name']}: ${locations[i]['num_user']}`);
    }
    console.log('__________________________\n');
    showMainMenu();
}

const addLocation= async(locationName)=> {
    const existingLocation = await Location.findOne({name: locationName})
    if (existingLocation!=undefined){
        console.log("this location already exists...");
    } else{
        try{
            const newLocation = await Location.create({name:locationName, num_user: 0});
            console.log(`successfully added ${newLocation.name}`);
        } catch(err){
            console.log(err);
        }
    }
    console.log('__________________________\n');
    showMainMenu();
}

const deleteLocation= async()=> {
    console.log('removing a location');
    let locations = await Location.find()
    if (!locations.length){
        console.log('no location to delete');
    }
    for(let i in locations){
        num = parseInt(i)+1;
        console.log(`${num}. ${locations[i]['name']}`);
    }
    const selectedLocNo = prompt('Select the place: ');
    const selectedLoc = locations[parseInt(selectedLocNo)-1];
    const location = await Location.findByIdAndDelete(selectedLoc['_id']);
    const users = await User.deleteMany({location:location._id});
    console.log(`Successfully deleted ${location.name}`);
    console.log('__________________________\n');
    showMainMenu();
}

const quit=()=> {
    process.exit();
}

const showMainMenu=()=> {
    console.log('Welcome to Chula Chana!!!');
    console.log('Available commands:');
    console.log('1. Check in user');
    console.log('2. Check out user');
    console.log('3. Print people count');
    console.log('4. Add a location');
    console.log('5. Delete a location');
    console.log('6. Quit');
    const chosen_no = prompt('Please input any number: ');

    switch(chosen_no){
        case '1':
            console.log('checking in');
            let phoneNo = prompt('Enter phone number: ');
            checkin(phoneNo);
            break;
        case '2':
            console.log('checking out');
            let phoneNoOut = prompt("Enter phone number: ");
            checkout(phoneNoOut);
            break;
        case '3':
            console.log('Current population');
            showCounts();
            break;
        case '4':
            const locationName = prompt('Specify location name: ');
            addLocation(locationName);
            break;
        case '5':
            deleteLocation();
            break;
        case '6':
            quit();
            break;
        default:
            console.log('invalid input... please select again');
            showMainMenu();
    }
}

//main
connectToDB();
showMainMenu();