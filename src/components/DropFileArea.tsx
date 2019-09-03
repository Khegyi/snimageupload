import CloudUploadTwoTone from '@material-ui/icons/CloudUploadTwoTone'
import React, { useState } from 'react'
//import { UploadProgressInfo } from '@sensenet/client-core'
//import { ObservableValue } from '@sensenet/client-utils'
import { /* useInjector,*/ useRepository } from '../hooks/use-repository'

export const DropFileArea: React.FunctionComponent<{
  uploadPath: string
  style?: React.CSSProperties
  uploadsetdata: () => void
  notificationControll: () => void
  setDragOver: (onoff: boolean) => void
  isDragOver: boolean
}> = props => {
  //const injector = useInjector()
  const repo = useRepository()
  /* const [progressObservable] = useState(new ObservableValue<UploadProgressInfo>())

  useEffect(() => {
    const subscription = progressObservable.subscribe(p =>
      injector.getInstance(UploadTracker).onUploadProgress.setValue({ progress: p, repo }),
    )
    return () => subscription.dispose()
  }, [injector, progressObservable, repo])
*/
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
        console.log('onDragEnter')
        props.setDragOver(true)
      }}
      onDragLeave={ev => {
        ev.stopPropagation()
        ev.preventDefault()
        console.log('onDragLeave')
        props.setDragOver(false)
      }}
      onDragOver={ev => {
        ev.stopPropagation()
        ev.preventDefault()
        console.log('onDragOver')
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
        props.notificationControll()
        console.log('draganddrop')
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
          style={{ width: '100%', position: 'absolute', transform: 'translateY(-20%)', height: 'auto' }}
        />
      </div>
      {props.children}
    </div>
  )
}
