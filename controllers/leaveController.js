const LeaveRequest = require('../models/LeaveRequest');

exports.applyLeave = async (req, res) => {
    try {
        const { type, startDate, endDate, reason } = req.body;

        const newRequest = new LeaveRequest({
            employee: req.user.id,
            type,
            startDate,
            endDate,
            reason
        });

        await newRequest.save();
        res.status(201).json({ msg: "Leave request sent", newRequest });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getPendingRequests = async (req, res) => {
    try {
        const requests = await LeaveRequest.find({ status: 'Pending' }).populate('employee', 'name email');
        res.status(200).json(requests);
        
        if (requests.length === 0) {
            return res.status(200).json({ msg: "no pending requests" });
        }

        res.status(200).json({
            count: requests.length,
            requests: requests
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllLeaves = async (req, res) => {
    try {

        const leaves = await LeaveRequest.find().populate('employee', 'name email department');
        res.status(200).json(leaves);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
}
