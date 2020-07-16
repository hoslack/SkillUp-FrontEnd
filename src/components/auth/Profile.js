import React from 'react'
import { useSelector } from 'react-redux'
import { PageHeader, Descriptions } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Profile = () => {
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const auth = useSelector(({ firebase: { auth } }) => auth)

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
      {!auth.isEmpty && !profile.isEmpty && (
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={profile.firstName}
          subTitle={profile.lastName}
          extra={[]}>
          <Descriptions size="small" column={3} style={{ marginTop: '30px' }}>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Joined">
              {dayjs().to(Number(auth.createdAt))}
            </Descriptions.Item>
            <Descriptions.Item label="Profession">
              {profile.profession}
            </Descriptions.Item>
            {profile.admin && (
              <Descriptions.Item label="Total Upvotes">
                {profile.votes}
              </Descriptions.Item>
            )}
          </Descriptions>
        </PageHeader>
      )}
    </div>
  )
}
export default Profile
