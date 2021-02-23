import React, { useEffect, useState } from 'react'
import { DeviceView } from './deviceView'
import { Device, useDevicesQuery } from '../lib/devices.graphql'
import { useDeviceUpdatedSubscription } from '../lib/subscriptions.graphql'
import styled from 'styled-components'

const StyledSection = styled.section`
  width: 100%;
`
const StyledUl = styled.ul`
  width: 100%;
  padding: 0;
  text-align: center;
`

const DeviceList: React.FC = () => {
  const { data, loading, error, refetch } = useDevicesQuery()
  const [devices, setDevices] = useState<Device[]>()
  const { data: sData } = useDeviceUpdatedSubscription({ skip: !data })

  useEffect(() => {
    if (data) {
      setDevices(data.devices as Device[])
    }
  }, [data])
  useEffect(() => {
    if (sData && devices) {
      const updatedDevice = sData.deviceUpdated as Device
      const known = devices.findIndex((x) => x.id === updatedDevice.id)
      setDevices(
        known > -1
          ? [
              ...devices.slice(0, known),
              updatedDevice,
              ...devices.slice(known + 1),
            ]
          : [...devices, updatedDevice]
      )
    }
  }, [sData])

  //every 15s we make sync (jen pro jistotu)
  useEffect(() => {
    const h = setInterval(() => {
      console.log('refetching')

      refetch()
    }, 15000)
    return () => clearInterval(h)
  }, [])

  return (
    <>
      {loading && <>Loading....</>}
      {error && <>Error</>}

      {devices && (
        <>
          <StyledSection>
            <StyledUl>
              {devices.map((device) => (
                <DeviceView key={device.id} {...device} />
              ))}
            </StyledUl>
          </StyledSection>
        </>
      )}
    </>
  )
}

export default DeviceList
