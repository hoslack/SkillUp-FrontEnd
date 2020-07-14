import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useDropzone } from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Alert, Col, Row, message } from 'antd'
import prettyBytes from 'pretty-bytes'
import PDFViewer from 'pdf-viewer-reactjs'
import { getBase64 } from '../../utils/helpers'
import {
  baseStyle,
  uploadStyle,
  acceptStyle,
  activeStyle,
  rejectStyle
} from '../../utils/dropZoneStyles'
import Loader from '../common/Loader'
import Reviews from './Reviews'

const Resume = () => {
  const usersQuery = {
    collection: 'users'
  }

  useFirestoreConnect(() => [usersQuery])
  const firestore = useFirestore()
  const [uploadError, setUploadError] = useState('')
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const auth = useSelector(({ firebase: { auth } }) => auth)

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ multiple: false, accept: '.pdf' })
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  )

  const onUpload = () => {
    const file =
      Array.isArray(acceptedFiles) &&
      acceptedFiles.length > 0 &&
      acceptedFiles[0]
    getBase64(file)
      .then(result => {
        firestore
          .update(`users/${auth.uid}`, { resume: result.split(',')[1] })
          .then(() => message.success('Resume uploaded successfully'))
          .catch(error => message.error(error.message))
      })
      .catch(err => {
        setUploadError(err)
      })
  }

  const deleteResume = () => {
    firestore
      .update(`users/${auth.uid}`, { resume: '' })
      .then(() => message.success('Resume deleted successfully'))
      .catch(error => message.error(error.message))
  }

  if (profile.isEmpty || !profile.isLoaded) {
    return <Loader />
  }

  return (
    <div className="vh-100">
      {profile && !profile.resume && (
        <section>
          {uploadError && (
            <Alert
              style={{ marginBottom: '20px' }}
              message="Error"
              description={uploadError}
              type="error"
              showIcon
            />
          )}
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>
              Drag 'n' drop your file here, or click to select a file (PDF Only)
            </p>
          </div>
          {acceptedFiles[0] && (
            <div style={uploadStyle}>
              <ul style={{ marginBottom: '10px' }}>
                <li key={acceptedFiles[0].path}>
                  {acceptedFiles[0].path} - {prettyBytes(acceptedFiles[0].size)}
                </li>
              </ul>
              <Button type="primary" onClick={onUpload}>
                <UploadOutlined /> Upload
              </Button>
            </div>
          )}
        </section>
      )}

      <Row>
        <Col span={18}>
          <div className="fl w-70">
            {profile && profile.resume && (
              <PDFViewer
                css={{ padding: '1px', width: '300px' }}
                hideNavbar
                canvasCss={{}}
                navbarOnTop
                hideRotation
                page={1}
                scale={1.4}
                scaleStep={0.1}
                maxScale={1.5}
                minScale={1}
                document={{
                  base64: profile.resume
                }}
              />
            )}
          </div>
        </Col>
        {profile && profile.resume && (
          <Col span={6}>
            <Button
              onClick={() => deleteResume()}
              style={{ marginBottom: '30px' }}
              type="primary"
              danger>
              Delete Resume
            </Button>
            <Reviews uid={auth.uid} />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Resume
