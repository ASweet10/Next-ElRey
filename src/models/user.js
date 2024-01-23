import { Schema, model, models } from "mongoose"
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: true,
        validate: pw => {
            if( !pw?.length || pw.length < 8 ) {
                new Error('Password must be at least 8 characters')
                return false;
            }

            return pw
        }
    }
}, {timestamps: true})

UserSchema.post('validate', function (user) {
    const unHashedPW = user.password
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(unHashedPW, salt)
})

export const User = models?.User || model('User', UserSchema)