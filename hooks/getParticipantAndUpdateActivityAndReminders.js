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

        let text

        // First message ever
        if (!firstUpdate || event.state.session.lastMessages.length === 0) {
          text = `Hei ${name} welcome to My Student Counselor.`
        } else {
          // Do nothing if the last message was less than one hour ago
          const lastUpdateDate = new Date(lastUpdate)
          const now = new Date()
          const diff = now.getTime() - lastUpdateDate.getTime()
          const diffHours = diff / (1000 * 60 * 60)
          if (diffHours < 1) {
            event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
            return
          }

          const { flow } = payload

          switch (flow) {
            case 'i':
              text = 'Allo first visistor'
              break
            default:
              text = `Hei ${name}. Welcome back to My Student counselor.`
          }
        }

        const payloads = await bp.cms.renderElement(
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
        )
        bp.events.replyToEvent(event, payloads)
      }
    }
  }

  return getParticipantAndUpdateActivityAndReminders()