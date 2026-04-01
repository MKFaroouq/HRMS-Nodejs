const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, // عايز اربطه ب empid 
        ref: 'User', 
        required: true 
    },

    type: { 
        type: String, 
        enum: ['Annual', 'Sick', 'Casual'], 
        // required: true 
    },

    startDate: { 
        type: Date, 
        required: true 
    },

    endDate: { 
      type: Date, 
      required: true 
    },

    reason: {
     type: String 
    },

    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    requestDate: {
         type: Date, 
         default: Date.now 
        }
        
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);