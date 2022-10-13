const axios = require('axios')

/**
 * Notify that DageligeMal has been triggered
 * @title DageligeMal triggered
 * @category Custom
 * @author Antoine
 */
const dagligeMalTriggered = async () => {
  const participantId = user.webchatCustomId
  try {
    await axios({
      method: 'post',
      url:
        'http://chatbots-nodered-node-red:1880/participants/' +
        encodeURIComponent(participantId) +
        '/daglige-mal-triggered',
      timeout: 3000
    })
  } catch (error) {
    console.error(error)
    return
  }
}

return dagligeMalTriggered()