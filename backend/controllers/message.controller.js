import Conversation from "../models/conversation.js"
import Message from "../models/messages.model.js"

export const sendMessage = async (req, res) => {
    try {

        const {message} = req.body
        const {id : receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            partcipants: {$all: [senderId, receiverId]},

        })

        if (!conversation) {
            conversation = await Conversation.create({
                partcipants: [senderId, receiverId],
                
            })
        }

        const newMessage = new Message({
            senderId, receiverId, message,
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)
        
        
    } catch (error) {
        res.status(500).json({
            error: "Internal sendMessage controller Error"
        })
    }
}


export const getMessages = async (req, res) => {
    try {
        const {id : userToChatId} = req.params
        const senderId = req.user._id
        console.log(userToChatId, senderId);

        const conversation = await Conversation.findOne({
            partcipants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.messages
        
        res.status(200).json(messages)
        
        
    } catch (error) {
        res.status(500).json({
            error: "Internal getMessages controller Error"
        })
    }
}