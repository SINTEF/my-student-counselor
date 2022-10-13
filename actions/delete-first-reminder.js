const axios = require('axios')

/**
 * Delete the first reminder.
 * @title Delete First Reminder
 * @category Custom
 * @author Antoine
 */
const deleteFirstReminder = async () => {
  const participantId = user.webchatCustomId
  try {
    await axios({
      method: 'delete',
      url:
        'http://chatbots-nodered-node-red:1880/participants/' +
        encodeURIComponent(participantId) +
        '/reminder/first',
      timeout: 3000
    })
  } catch (error) {
    console.error(error)
    return
  }
}

return deleteFirstReminder()