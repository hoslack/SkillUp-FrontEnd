import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Alert } from 'antd'
import prettyBytes from 'pretty-bytes'
import PDFViewer from 'pdf-viewer-reactjs'
import { getBase64 } from '../../utils/helpers'
import { uploadResume } from '../../store/actions/resumeActions'
import Loader from '../common/Loader'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#bfbfbf',
  color: '#595959',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const uploadStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  paddingTop: '20px'
}

const Resume = () => {
  const dispatch = useDispatch()
  const [uploadError, setUploadError] = useState('')
  const profile = useSelector(state => state.firebase.profile)
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
        dispatch(uploadResume(result.split(',')[1]))
      })
      .catch(err => {
        setUploadError(err)
      })
  }

  if (profile.isEmpty) {
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

      <div>
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
      </div>
    </div>
  )
}

export default Resume
