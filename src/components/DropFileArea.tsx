import CloudUploadTwoTone from '@material-ui/icons/CloudUploadTwoTone'
import React, { useEffect, useState } from 'react'
import { useRepository } from '../hooks/use-repository'

export const DropFileArea: React.FunctionComponent<{
  uploadPath: string
  style?: React.CSSProperties
  uploadsetdata: () => void
  notificationControll: (onoff: boolean) => void
  setDragOver: (onoff: boolean) => void
  isDragOver: boolean
}> = props => {
  const repo = useRepository()
  const [scrollPosition, setScroll] = useState(0)

  useEffect(() => {
    window.onscroll = function() {
      setScroll(window.pageYOffset)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        filter: props.isDragOver ? 'blur(1px)' : undefined,
        opacity: props.isDragOver ? 0.8 : 1,
        transition: 'opacity 300ms',
        ...props.style,
      }}
      onDragEnter={ev => {
        ev.stopPropagation()
        ev.preventDefault()
        props.setDragOver(true)
      }}
      onDragLeave={ev => {
        ev.stopPropagation()
        ev.preventDefault()
        props.setDragOver(false)
      }}
      onDragOver={ev => {
        ev.stopPropagation()
        ev.preventDefault()
        props.setDragOver(true)
      }}
      onDrop={async ev => {
        ev.stopPropagation()
        ev.preventDefault()
        props.setDragOver(false)
        await repo.upload.fromDropEvent({
          event: new DragEvent('drop', { dataTransfer: ev.dataTransfer }),
          binaryPropertyName: 'Binary',
          overwrite: true,
          createFolders: true,
          parentPath: props.uploadPath ? props.uploadPath : '',
          contentTypeName: 'Image',
        })
        props.uploadsetdata()
        props.notificationControll(true)
      }}>
      <div
        style={{
          width: 'auto',
          height: 'auto',
          backgroundColor: 'transparent',
          opacity: props.isDragOver ? 0.5 : 0,
          position: 'relative',
          transition: 'opacity 300ms',
        }}>
        <CloudUploadTwoTone
          style={{ width: '100%', position: 'absolute', marginTop: `${scrollPosition}px`, height: '250px' }}
        />
      </div>
      {props.children}
    </div>
  )
}
