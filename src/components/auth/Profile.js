import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import {
  PageHeader,
  Descriptions,
  Button,
  Modal,
  Form,
  InputNumber,
  message
} from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Profile = () => {
  const [visible, setVisible] = useState(false)
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const firestore = useFirestore()
  const superUserEmail = 'h@gmail.com'

  const redeemVotes = ({ amount }) => {
    const billable = profile.votes - (profile.redeemedVotes || 0)
    if (amount < 100) {
      message.error('You cannot redeem less than 100 votes')
    } else if (billable < 100 || billable < amount) {
      message.error(
        `Insufficient votes your, billable votes are ${profile.votes}`
      )
    } else {
      firestore
        .update(`users/${auth.uid}`, {
          redeemedVotes: firestore.FieldValue.increment(amount)
        })
        .then(() => {
          firestore
            .add(`payment`, {
              amount: amount * 0.1,
              paidOut: false,
              received: false,
              processedBy: superUserEmail,
              sentBy: profile.email,
              timestamp: Date.now()
            })
            .then(() => {
              setVisible(false)
              return message.success('Success, your payment will be processed')
            })
            .catch(() => message.error('There was an error, please try again'))
        })
        .catch(() => message.error('There was an error, please try again'))
    }
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
      {!auth.isEmpty && !profile.isEmpty && (
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={profile.firstName}
          subTitle={profile.lastName}
          extra={[
            profile.admin && (
              <Button
                key="modal"
                type="primary"
                onClick={() => setVisible(true)}>
                Redeem Votes
              </Button>
            )
          ]}>
          <Descriptions size="small" column={3} style={{ marginTop: '30px' }}>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Joined">
              {dayjs().to(Number(auth.createdAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Profession">
              {profile.profession}
            </Descriptions.Item>
            {profile.admin && (
              <>
                <Descriptions.Item label="Total Upvotes">
                  {profile.votes}
                </Descriptions.Item>
                <Descriptions.Item label="Redeemed Votes">
                  {profile.redeemedVotes || 0}
                </Descriptions.Item>
                <Descriptions.Item label="Billable Votes">
                  {profile.votes - (profile.redeemedVotes || 0)}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </PageHeader>
      )}
      <Modal
        footer={false}
        title="Redeem points (min 100)"
        visible={visible}
        okText="Submit"
        onCancel={() => setVisible(false)}>
        <Form
          name="customized_form_controls"
          layout="inline"
          onFinish={redeemVotes}
          initialValues={{
            amount: 0
          }}>
          <Form.Item name="amount" required label="Redeem points">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginLeft: '10px' }}
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default Profile
