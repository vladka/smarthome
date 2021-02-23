import ewelink, { Device } from 'ewelink-api'
import { Device as QDevice } from '../type-defs.graphqls'
import { PubSub } from 'graphql-subscriptions'

type OnOff = 'on' | 'off'

type SubDeviceProp<K extends string, T> = {
  outlet: number
} & Record<K, T>

/** lepe otypovano */
type XDevice = Omit<Device, 'params'> & { params: any; parentDeviceId?: string }

const deGroup = (device: XDevice): XDevice | XDevice[] => {
  const params = device.params
  const toSubDevice = (psw: SubDeviceProp<'switch', OnOff>): XDevice => {
    return {
      ...device,
      _id: `${device._id}-${psw.outlet}`,
      parentDeviceId: device.deviceid,
      name: `${device.name} - channel ${psw.outlet + 1}`,
      params: { switch: psw.switch, location: device.location },
    }
  }

  return Array.isArray(params.switches)
    ? params.switches.map(toSubDevice)
    : device
}

const toGraphQL = (device: XDevice) => {
  const {
    name,
    _id: id,
    deviceid: deviceId,
    parentDeviceId,
    params,
    brandLogoUrl,
    brandName,
    productModel,
    online,
    offlineTime,
    onlineTime,
  } = device

  const {
    staMac: macAddress,
    battery,
    location,
    switch: pswitch,
  } = params as any

  const parseValue = (params: any, key1: string, key2: string) => {
    const val = params[key1]
    if (val === 'unavailable') return undefined
    if (val !== undefined && val != null) return Number(val)
    const val2 = params[key2]
    if (val2 === 'unavailable') return undefined
    if (val2 !== undefined && val2 != null) return Number(val2) / 100
    return undefined
  }

  const res: QDevice = {
    name,
    id,
    deviceId,
    parentDeviceId,
    status: pswitch,
    battery,
    brandLogoUrl,
    brandName,
    productModel,
    temperature: parseValue(params, 'currentTemperature', 'temperature'),
    humidity: parseValue(params, 'currentHumidity', 'humidity'),
    macAddress,
    location,
    online,
    offlineTime,
    onlineTime,
  }
  return res
}

/** konvertuje do tvaru pro query  */
const toQDevices = (devices: XDevice[]) =>
  devices
    .map(deGroup)
    .flat()
    .map(toGraphQL)
    .filter((x) => x.online)
    .sort((y, x) => (y.temperature ?? 1000) - (x.temperature ?? 1000))

/** device list transformovany do tvaru pro query */
let qdevices: QDevice[]
const pubsub = new PubSub()

const initDevices = async () => {
  const connection = new ewelink({
    email: 'xvladka@gmail.com',
    password: '..',
  })

  /* get all devices */
  let devices = (await connection.getDevices()) as XDevice[]

  // call openWebSocket method with a callback as argument
  await connection.openWebSocket(async (data: any) => {
    // data is the message from eWeLink
    console.log(data)
    if (typeof data !== 'object' || !data.deviceid) {
      //jina data, napriklad PONG
      return
    }
    const changedDevice = devices.find((x) => x.deviceid === data.deviceid)
    if (!changedDevice) {
      //zarizeni neni zatim znamo, nacteme vše
      console.log('unknown device', data)
      devices = (await connection.getDevices()) as XDevice[]
      return
      //todo: updatnou subscribci
    } else {
      if (data.params) {
        changedDevice.params = { ...changedDevice.params, ...data.params }
      }
    }
    console.log('devices is null?', devices == undefined, pubsub)
    qdevices = toQDevices(devices)
    const updatedDevices = qdevices.filter(
      (x) =>
        x.parentDeviceId === changedDevice.deviceid ||
        x.deviceId === changedDevice.deviceid
    )
    const tasks = updatedDevices.map((d) =>
      pubsub.publish('LIKE', { deviceUpdated: d })
    )
    await Promise.all(tasks)
  })

  // process.on('SIGINT', () => {
  //   console.log(' - Caught SIGINT. Exiting in 3 seconds.')
  //   console.log('Closing WebSocket....')
  //   const cls = socket.close()
  //   setTimeout(() => {
  //     process.exit(0)
  //   }, 3000)
  // })
  // socket.close()

  //console.log(devices)
  // console.log(JSON.stringify(devices, null, 6))
  if (!devices) console.warn('no data')
  console.log('. devices is null?', devices == undefined)
  qdevices = toQDevices(devices)
}
/* get specific devide info */
// const device = await connection.getDevice('<your device id>');
// console.log(device);

/* toggle device */
//await connection.toggleDevice('<your device id>');

const ensureInit = async () => {
  if (!qdevices) await initDevices()
}

export const api = {
  devices: async () => {
    await ensureInit()
    return qdevices
  },
  ensureInit,
  pubsub,
}
