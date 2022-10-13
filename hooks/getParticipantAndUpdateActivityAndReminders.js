const axios = require('axios')

async function getParticipantAndUpdateActivityAndReminders() {
  const participantId = event.state.user.webchatCustomId

  if (participantId) {
    let response

    try {
      response = await axios({
        method: 'post',
        url: 'http://chatbots-nodered-node-red:1880/participants/' + encodeURIComponent(participantId) + '/activity',
        timeout: 3000
      })
    } catch (error) {
      console.error(error)
      return
    }

    //console.log(response)
    const { name, lastUpdate, firstUpdate, phoneNumber } = response.data
    if (name) {
      event.state.user.name = name
    }

    // If startup
    if (event.type === 'proactive-trigger') {
      const payload = event.payload.payload.payload || {} // .payloaaaaad.paaayloaaad.paayyloaaaaddd...

      // proactive triggers are custom made
      //event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)

      // In case this change in the future
      let flowname = 'main.flow.json'
      let nodename = 'Start_deltager_initierer'

      // First message ever
      if (!firstUpdate) {
        nodename = 'Interaction_1'
      } else {
        // Do nothing if the last message was less than 15 minutes ago
        /*const lastUpdateDate = new Date(lastUpdate)
        const now = new Date()
        const diff = now.getTime() - lastUpdateDate.getTime()
        const diffHours = diff / (1000 * 60 * 15)
        if (diffHours < 1) {
          event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
          return
        }*/

        const { flow } = payload

        switch (flow) {
          case 'i':
            //nodename = 'Interaction_1'
            // Ignore Interaction_1 if previous messages happened
            break
          case 'm':
            nodename = 'Modul_praktiskinfo_del_2'
            break
          case 'u':
            nodename = 'User_inactive'
            break
          case 'd':
            nodename = 'Maal_for_dagen_forste-samtale'
            break
          case 'e':
            nodename = 'Modul__maal_for_dagen'
            break
          case 'f':
            nodename = 'Modul_maal_for_dagen_oppfolging'
            break
          default:
            nodename = 'Start_deltager_initierer'
        }
      }

      /*const payloads = await bp.cms.renderElement(
        'builtin_text',
        {
          text,
          typing: true
        },
        {
          channel: event.channel,
          target: event.target,
          botId: event.botId,
          threadId: event.threadId
        }
      )*/
      //bp.events.replyToEvent(event, payloads)
      await bp.dialog.jumpTo(event.target, event, flowname, nodename)
      await bp.dialog.processEvent(event.target, event)
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
      event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
    }
  }
}

return getParticipantAndUpdateActivityAndReminders()
