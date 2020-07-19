import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from 'contexts'
import { TextArea, Button } from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import SETTINGS_MUTATION from 'apollo/mutations/settings'
import {useMutation } from '@apollo/client'

import * as S from './styled'

const Settings = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
  const [notification, setNotification] = useState({
    show: false,
    type: NotificationType.Success
  });

  const [saveSettings, {loading}] = useMutation(
    SETTINGS_MUTATION,
    {
      onCompleted() {
        setNotification({
          show: true,
          type: NotificationType.Success
        });
      }
  });

  useEffect(() => {
    if (user?.message) setMessage(user.message)
  }, [user])

  return (
    <S.Wrapper>
        { notification.show && <Notification type={notification.type} text="Settings was saved" />}
        <S.Title>Settings</S.Title>
        <S.Settings>
          <TextArea
            id="settings-personalMessage"
            label="Message for your followers"
            placeholder="This message will be shown to anyone who opens your invite link. Explain why they should give you email address."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            fluid
            disabled={loading}
            onClick={async () => {
              await saveSettings({
                variables: {
                  influencerID: user.username,
                  settingsData: {
                    message: message
                  }
                }
              })
            }}
            >
              {loading ? 'Loading' : 'Save'}
          </Button>
        </S.Settings>
    </S.Wrapper>
  )
}

export default Settings
