const axios = require('axios')

/**
 * Reload participant data.
 * @title Reload participant data
 * @category Custom
 * @author Antoine
 */
const reloadParticipant = async () => {
  const participantId = event.state.user.webchatCustomId

  if (!participantId) {
    return
  }

  let response

  try {
    response = await axios({
      method: 'get',
      url: 'http://chatbots-nodered-node-red:1880/participants/' + encodeURIComponent(participantId),
      timeout: 3000
    })
  } catch (error) {
    console.error(error)
    return
  }

  //console.log(response)
  const { name, dagligeTriggered } = response.data
  event.state.user.name = name
  event.state.user.dagligeTriggered = dagligeTriggered
}

return reloadParticipant()
