import mongoose from "mongoose"
import colors from 'colors'

colors.setTheme({
    custom: ['bold', 'underline', 'cyan']
});

const connectToDB = async () => {
    const url = 'mongodb+srv://jainpiyush1450:7NoXNGiPLCbNb92R@cluster0.ck3ffqz.mongodb.net/';
    mongoose.connect(url).then(() => {
        console.log('Connected to database'.custom);
    }).catch(err => {
        console.log('Error connecting to database:'.red, err);
    });
};

export default connectToDB;