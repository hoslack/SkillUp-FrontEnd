import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import prettyBytes from 'pretty-bytes'
import PDFViewer from 'pdf-viewer-reactjs'

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

const Resume = props => {
  const [uploadError, setUploadError] = useState('')
  const state = useSelector(state => state)
  const profile = useSelector(state => state.firebase.profile)
  console.log(state)
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
    console.log(file)
    const firebase = props.firebase
    if (file) {
      const storageRef = firebase.storage().ref()
      const uploadTask = storageRef.child('resumes/' + file.name).put(file, {})

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running')
              break
          }
        },
        error => {
          switch (error.code) {
            case 'storage/unauthorized':
              setUploadError('You do not have permission to Upload the File')
              break
            case 'storage/canceled':
              setUploadError('Upload Cancelled')
              break
            case 'storage/unauthenticated':
              setUploadError('Please log in and try again')
              break
            case 'storage/unknown':
              setUploadError(
                'An Internal Error Occurred, Please Contact Support'
              )
              break
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL)
          })
        }
      )
    }
  }

  return (
    <div className="vh-100">
      {profile && !profile.resume && (
        <section>
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
